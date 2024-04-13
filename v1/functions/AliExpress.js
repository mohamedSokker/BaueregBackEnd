// const rp = require("request-promise");
// const cheerio = require("cheerio");

// const AliexScrape = (productId) => {
//   const data = {};
//   return (
//     rp(`https://www.aliexpress.com/item/xxx/${productId}.html`)
//       .then((response) => {
//         const $ = cheerio.load(response);
//         // productId
//         data.productId = productId;
//         // productTitle
//         data.productTitle = /itemprop="name">(.*)</.exec(response)[1];
//         // attributes
//         data.attributes = [];
//         $(response)
//           .find("#j-product-info-sku")
//           .children()
//           .each((i, child) => {
//             const attributeData = {};
//             attributeData.title = $(child)
//               .find(".p-item-title")
//               .text()
//               .replace(":", "");
//             attributeData.options = [];
//             $(child)
//               .find("ul")
//               .children()
//               .each((i, li) => {
//                 const optionTag = $(li).find("a").children()[0];
//                 if (optionTag.name === "img") {
//                   attributeData.options.push({
//                     optionId: `${$(child)
//                       .find("ul")
//                       .attr("data-sku-prop-id")}:${$(li)
//                       .find("a")
//                       .attr("data-sku-id")}`,
//                     src: optionTag.attribs.src.replace(/.jpg(.*).jpg/, ".jpg"),
//                     text: optionTag.attribs.title,
//                   });
//                 } else if (optionTag.name === "span") {
//                   attributeData.options.push({
//                     optionId: `${$(child)
//                       .find("ul")
//                       .attr("data-sku-prop-id")}:${$(li)
//                       .find("a")
//                       .attr("data-sku-id")}`,
//                     text: $(optionTag).text(),
//                   });
//                 }
//               });
//             data.attributes.push(attributeData);
//           });
//         // seller/store data
//         data.store = {
//           name: $(response).find("span.shop-name").find("a").text(),
//           id: $(response)
//             .find("span.shop-name")
//             .find("a")
//             .attr("href")
//             .match(/(\d+)/)[0],
//         };
//         // pics
//         data.pics = [];
//         $(response)
//           .find(".image-thumb-list")
//           .children()
//           .each((i, li) => {
//             data.pics.push(
//               $(li)
//                 .find("img")
//                 .attr("src")
//                 .replace(/.jpg(.*).jpg/, ".jpg")
//             );
//           });
//         // variations
//         data.variations = [];
//         const variationsJSON = /var.skuProducts=(.*);/.exec(response)[1];
//         const rawVariations = JSON.parse(variationsJSON);
//         rawVariations.map((variation) => {
//           const pricingData = {
//             skuAttr: variation.skuAttr,
//             pricing: variation.skuVal.skuCalPrice,
//             discount: variation.skuVal.actSkuCalPrice,
//           };
//           if (variation.skuAttr) {
//             pricingData.combinedAttributes = variation.skuAttr.match(
//               /[0-9]{1,20}:[0-9]{1,20}/g
//             );
//           }
//           data.variations.push(pricingData);
//         });
//         // freight, get real-time here => https://freight.aliexpress.com/ajaxFreightCalculateService.htm?productid=32830803458&count=1&currencyCode=USD&country=TH
//         // properties
//         data.properties = [];
//         $(response)
//           .find("ul.product-property-list.util-clearfix > li")
//           .each((i, li) => {
//             data.properties.push({
//               propertyTitle: $(li)
//                 .find("span.propery-title")
//                 .text()
//                 .replace(":", ""),
//               propertyDescription: $(li).find("span.propery-des").text(),
//             });
//           });
//         // description
//         const descriptionSource = /window.runParams.detailDesc="(.*)";/.exec(
//           response
//         )[1];
//         return rp(descriptionSource);
//       })
//       // description
//       .then((response) => {
//         const $ = cheerio.load(response);
//         const wrapped = $(`<div>${response}</div>`);
//         wrapped.find("kse\\:widget").remove(); // remove <kse:widget> tag
//         wrapped.find("link").remove(); // remove <link> tag
//         wrapped.find("style").remove(); // remove <style> tag
//         wrapped.find("div:has(div:has(div:has(div:has(div:has(a)))))").remove(); // remove related products widgets like 32831471018
//         data.description = wrapped
//           .html()
//           .replace(
//             /(https?:\/\/+[a-z0-9A-Z-.]+aliexpress\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/g,
//             "#"
//           ); // replace all existing aliexpress urls in description to #
//         return JSON.stringify(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   );
// };

// module.exports = AliexScrape;

const axios = require("axios");
const { JSDOM } = require("jsdom");
const { CookieJar } = require("tough-cookie");

/**
 * إرجاع معلومات عن المنتج مثل الإسم والسعر والوصف الخ...
 * by rn0x
 * @param {string|number} input
 * @param {"en"|"ar"|"fr"|"it"|"de"|"es"|"tr"|"vi"|"he"|"th"|"pl"|"nl"|"ko"|"ja"|"pt"} language
 * @returns
 */

const aliExpress = async (input, language) => {
  if (isAaliExpress(input) || isNumber(input)) {
    let cookieJar = new CookieJar();
    let lang = language === "en" ? "www" : language;
    let productId = isLink(input) ? extractNumber(input) : input;
    let url = `https://${lang?.toLowerCase()}.aliexpress.com/item/${productId}.html`;
    let options = {};
    options.headers = {
      "User-Agent": "PostmanRuntime/7.35.0", // تحديد رأس User-Agent
      "Accept-Language": "ar,en-US;q=0.7,en;q=0.3",
      // Cookie: cookieJar?.getCookieStringSync(url),
    };
    options.follow = 10;
    let response = await fetch(url, options);
    // let setCookieHeaders = response?.headers?.raw()?.["set-cookie"];
    // setCookieHeaders?.forEach((setCookieHeader) => {
    //   cookieJar?.setCookieSync(setCookieHeader, url);
    // });
    let body = await response?.text();

    if (response?.status === 200 && body) {
      // إنشاء كائن DOM باستخدام JSDOM وتمكين تشغيل النص البرمجي بشكل خطير

      let dom = new JSDOM(body, { runScripts: "dangerously" });
      let dataValue = dom.window?.runParams?.data;
      let title = dataValue?.metaDataComponent?.title
        ? dataValue?.metaDataComponent?.title
        : dataValue?.extraComponent?.seoTitle;

      if (title) {
        let Obj = {
          title: dataValue?.metaDataComponent?.title
            ? dataValue?.metaDataComponent?.title
            : dataValue?.extraComponent?.seoTitle,
          description: dataValue?.metaDataComponent?.description,
          keywords: dataValue?.metaDataComponent?.keywords,
          categoryUrl: dataValue?.categoryComponent?.categoryUrl,
          categoryName: dataValue?.categoryComponent?.categoryName,
          productId: dataValue?.productInfoComponent?.id,
          tradeCount: dataValue?.tradeComponent?.formatTradeCount,
          storeInfo: {
            name: dataValue?.sellerComponent?.storeName,
            companyId: dataValue?.sellerComponent?.companyId,
            storeNumber: dataValue?.sellerComponent?.storeNum,
            storeURL: dataValue?.sellerComponent?.storeURL,
            storeLogo: dataValue?.sellerComponent?.storeLogo,
          },
          images: dataValue?.imageComponent,
          salePrice: {
            actCurrencyFormatPrice:
              dataValue?.priceComponent?.discountPrice?.actCurrencyFormatPrice,
            minActivityAmount:
              dataValue?.priceComponent?.discountPrice?.minActivityAmount,
            maxActivityAmount:
              dataValue?.priceComponent?.discountPrice?.maxActivityAmount,
          },
          origPrice: {
            minAmount: dataValue?.priceComponent?.origPrice?.minAmount,
            maxAmount: dataValue?.priceComponent?.origPrice?.maxAmount,
          },
        };

        return Obj;
      } else if (dataValue?.redirectModule?.bigBossBanTip) {
        return {
          error: dataValue?.redirectModule?.bigBossBanTip,
        };
      } else {
        return {
          error:
            "لايوجد معلومات عن المنتج !!\n\nهل قمت بإدخال معرف المنتج او الرابط بشكل صحيح ؟",
        };
      }
    } else {
      return {
        error: response?.status,
      };
    }
  } else {
    return {
      error: "لقد قمت بإدخال معرف المنتج او الرابط بشكل غير صحيح صحيح !!",
    };
  }
};

function extractNumber(input) {
  let regex = /\d+/;
  let match = input.match(regex);
  if (match) {
    return match[0];
  } else {
    return null;
  }
}

function isLink(text) {
  if (typeof text !== "string") {
    return false;
  } else {
    let pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(text);
  }
}

function isAaliExpress(text) {
  return text?.includes("aliexpress.com/item");
}

function isNumber(input) {
  return !isNaN(input);
}

module.exports = { aliExpress };
