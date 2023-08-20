var fs = require("fs");
var absPath = process.env.ABS_PATH;
let abshost = process.env.BASE_URL;

let encodedURL = (string) => {
  string = string.replaceAll("%", "%25");
  string = string.replaceAll(" ", "%20");
  string = string.replaceAll("#", "%23");
  string = string.replaceAll("&", "%26");
  string = string.replaceAll('"', "%22");
  string = string.replaceAll("(", "%28");
  string = string.replaceAll(")", "%29");
  return string;
};

let decodeURL = (secPath) => {
  secPath = secPath.replaceAll("%20", " ");
  secPath = secPath.replaceAll("%23", "#");
  secPath = secPath.replaceAll("%26", "&");
  secPath = secPath.replaceAll("%25", "%");
  secPath = secPath.replaceAll("%22", '"');
  secPath = secPath.replaceAll("%28", "(");
  secPath = secPath.replaceAll("%29", ")");
  return secPath;
};

const FileSystem = (req, res) => {
  // console.log(auth())
  let secPath = req.url.toString();
  console.log(req.url);
  console.log(typeof req.url);
  secPath = decodeURL(secPath);
  // secPath = secPath.replaceAll("%20", " ");
  // secPath = secPath.replaceAll("%23", "#");
  // secPath = secPath.replaceAll("%26", "&");
  // secPath = secPath.replaceAll("%25", "%");
  // secPath = secPath.replaceAll("%22", '"');
  // secPath = secPath.replaceAll("%28", "(");
  // secPath = secPath.replaceAll("%29", ")");
  let fullpath = absPath + secPath;
  let image = "unknown.jpg";
  let folder = "folder.jpg";

  if (fs.existsSync(absPath + secPath)) {
    if (fs.lstatSync(absPath + secPath).isFile()) {
      let ext = secPath.split(".")[1];

      if (ext == "html") {
        res.writeHead(200, { "Content-Type": "text/html" });
        image = "unknown.jpg";
      } else if (ext == "css") {
        res.writeHead(200, { "Content-Type": "text/css" });
        image = "unknown.jpg";
      } else if (ext == "jpg") {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        image = "unknown.jpg";
      } else if (ext == "js") {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        image = "unknown.jpg";
      } else if (ext == "pdf") {
        image = "pdf.jpg";
      } else if (ext == "txt") {
        image = "txt.jpg";
      }

      res.write(fs.readFileSync(absPath + secPath));
      res.end();
    } else {
      let arrayOfFiles = fs.readdirSync(absPath + secPath);
      // res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(
        '<div style="display:flex;flex-wrap:nowrap;align-items:center;">' +
          '<h3 style="margin-left:15px">Index of ' +
          secPath +
          "</h3>" +
          '<button id="createButton" style="margin-left:20px;" data-path="' +
          fullpath +
          '" data-url="' +
          abshost +
          req.url +
          '" onclick="newFolder()">Create New Folder</button>' +
          '<form method="POST" action="/Upload?url=' +
          fullpath +
          "&path=" +
          abshost +
          req.url +
          '" enctype="multipart/form-data" style="margin:0;margin-left:20px;">' +
          '<input type="file" name="files" multiple/>' +
          '<button type="submit">Upload</button>' +
          "</form>" +
          "</div>"
      );
      // res.write(
      //     '<head' +
      //     '<link rel="shortcut icon" href="' + abshost + '/Bauereg/Share/images/logo.jpg" />' +
      //     '<link rel="stylesheet" href="' + abshost + '/Bauereg/Share/css/bootstrap.css">' +
      //     '<link rel="stylesheet" href="' + abshost + '/Bauereg/Share/css/all.min.css">' +
      //     '<link rel="stylesheet" href="' + abshost + '/Bauereg/Share/css/fontawesome.min.css">' +
      //     '<link rel="stylesheet" href="' + abshost + '/Bauereg/Share/css/normalize.css">' +
      //     '</head>'
      // )
      arrayOfFiles.forEach((file) => {
        encodedFile = encodedURL(file);
        if (fs.lstatSync(absPath + secPath + "/" + file).isFile()) {
          let ext = file.split(".")[1];

          if (ext == "html") {
            image = "unknown.jpg";
          } else if (ext == "css") {
            image = "unknown.jpg";
          } else if (ext == "jpg") {
            image = "image.jpg";
          } else if (ext == "js") {
            image = "unknown.jpg";
          } else if (ext == "pdf") {
            image = "pdf.jpg";
          } else if (ext == "txt") {
            image = "txt.jpg";
          } else if (ext == "xlsx") {
            image = "excel.jpg";
          } else {
            image = "unknown.jpg";
          }
          res.write(
            '<div style="display:flex;padding-left:15px;font-size:20px;margin-bottom:5px;width:45%;justify-content:space-between;">' +
              '<div style="display:flex;align-items:center;justify-content:flex-start;">' +
              '<img src="' +
              abshost +
              "/Bauereg/Share/images/" +
              image +
              '"style="margin-right:5px;width:20px;height:20px;"/>' +
              // '<i class="fa-solid fa-file" style="margin-right:5px;font-size:20px;color: white;-webkit-text-stroke: 0.4px black;width:20px;"></i>' +
              '<a href="' +
              abshost +
              secPath +
              "/" +
              encodedFile +
              '"style="display:inline-block;color:blue;margin-left:5px;margin-bottom:5px;font-size:12px;display:flex;justify-content: center;align-items: center;font-family:Arial;font-weight:700;margin-bottom: 0;text-decoration: none;">' +
              file +
              "</a>" +
              "</div>" +
              '<div style="display:flex;align-items:center;">' +
              '<button class="rename" style="margin-left:20px;" data-oldpath="' +
              fullpath +
              "/" +
              encodedFile +
              '" data-path="' +
              fullpath +
              '" data-url="' +
              abshost +
              req.url +
              '" data-oldFilename="' +
              file +
              '">Rename</button>' +
              '<button class="delete" style="margin-left:20px;" data-oldpath="' +
              fullpath +
              "/" +
              encodedFile +
              '" data-url="' +
              abshost +
              req.url +
              '" >Delete</button>' +
              "</div>" +
              "</div>"
          );
        } else {
          res.write(
            '<div style="display:flex;padding-left:15px;font-size:20px;margin-bottom:5px;width:45%;justify-content:space-between;">' +
              '<div style="display:flex;align-items:center;justify-content:flex-start;">' +
              '<img src="' +
              abshost +
              "/Bauereg/Share/images/" +
              folder +
              '"style="margin-right:5px;width:20px;height:20px;"/>' +
              // '<i class="fa-solid fa-folder" style="margin-right:5px;font-size:20px;color: #d7d738;-webkit-text-stroke: 0.4px black;width:20px;"></i>' +
              '<a href="' +
              abshost +
              secPath +
              "/" +
              encodedFile +
              '"style="display:inline-block;color:black;margin-left:5px;font-size:12px;display:flex;justify-content: center;align-items: center;font-family:Arial;font-weight:700;margin-bottom: 0;text-decoration: none;">' +
              file +
              "</a>" +
              "</div>" +
              '<div style="display:flex;align-items:center;">' +
              '<button class="rename" style="margin-left:20px;" data-oldpath="' +
              fullpath +
              "/" +
              encodedFile +
              '" data-path="' +
              fullpath +
              '" data-url="' +
              abshost +
              req.url +
              '" data-oldfilename="' +
              file +
              '" >Rename</button>' +
              '<button class="delete" style="margin-left:20px;" data-oldpath="' +
              fullpath +
              "/" +
              encodedFile +
              '" data-url="' +
              abshost +
              req.url +
              '" >Delete</button>' +
              "</div>" +
              "</div>"
          );
        }
      });
      res.write(
        '<script src="' +
          abshost +
          "/bauereg/share/" +
          'js/apiMain.js"></script>'
        //     '<script>' +
        //     'let selectedBtn;' +
        //     'let btn = document.querySelectorAll(".rename").forEach(element => {' +
        //         'element.addEventListener("click", (e) => {' +
        //             'console.log(e.target);' +
        //             'selectedBtn = e.target;' +
        //         '});' +
        //     '});' +
        //     '</script>'
      );
      res.end();
    }
  } else {
    res.write("404 Not Found Or not a File");
    res.end();
  }
};

// function newFolder() {
//     console.log('new folder');
// }

module.exports = FileSystem;
