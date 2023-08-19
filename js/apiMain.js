/*global $ , alert , console , confirm */
// const fs = require('fs');
var absPath = process.env.ABS_PATH;
function newFolder() {
  let folderName = prompt("Enter Folder Name", "New Folder");
  if (folderName === null) {
    return;
  }
  let btn = document.getElementById("createButton");
  let fullpath = btn.dataset.path + "/" + folderName;
  let dataurl = btn.dataset.url;
  // console.log(btn.dataset.path + '/' + folderName);

  var myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.body.innerHTML = this.responseText;
    }
  };
  myRequest.open(
    "GET",
    "/CreateFolder?fullpath=" + fullpath + "&url=" + dataurl,
    false
  );
  myRequest.send();
  // window.location.reload();
}

let oldpath = "";
let dataurl = "";
let fullpath = "";
document.querySelectorAll(".rename").forEach((element) => {
  element.addEventListener("click", (e) => {
    // console.log(e.target);
    // console.log(e.target.dataset.oldpath);
    oldpath = e.target.dataset.oldpath;
    dataurl = e.target.dataset.url;
    let folderName = prompt("Enter New Folder Name", "New Folder");
    if (folderName === null) {
      return;
    }
    fullpath = e.target.dataset.path + "/" + folderName;
    rename();
  });
});

function rename() {
  console.log(oldpath);
  console.log(dataurl);
  console.log(fullpath);
  // document.querySelectorAll('.rename').forEach(element => {
  //     element.addEventListener('click', handlerenameClick);
  //     // console.log(element.contains(e.target));
  // });
  // let folderName = prompt("Enter New Folder Name", "New Folder");
  // if (folderName === null) {
  //     return;
  // }
  // let fullpath = e.target.dataset.path + '/' + folderName;
  var myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.body.innerHTML = this.responseText;
    }
  };
  myRequest.open(
    "GET",
    "/RenameFolder?newpath=" +
      fullpath +
      "&oldpath=" +
      oldpath +
      "&url=" +
      dataurl,
    false
  );
  myRequest.send();
  // document.querySelectorAll('.rename').forEach(element => {
  //     element.addEventListener('click', (e) => {
  //         console.log(e.target);
  //         console.log(e.target.dataset.oldpath);
  //         let oldpath = e.target.dataset.oldpath;
  //         let dataurl = e.target.dataset.url;
  //         let folderName = prompt("Enter New Folder Name", "New Folder");
  //         if (folderName === null) {
  //             return;
  //         }
  //         let fullpath = e.target.dataset.path + '/' + folderName;
  //         rename();
  //     })
  // });
}

function handlerenameClick(e) {
  console.log(e.target);
  // console.log(e.target.dataset.oldpath);
  oldpath = e.target.dataset.oldpath;
  dataurl = e.target.dataset.url;
  let folderName = prompt("Enter New Folder Name", "New Folder");
  if (folderName === null) {
    return;
  }
  fullpath = e.target.dataset.path + "/" + folderName;
  console.log("beforeremocve");
  e.target.removeEventListener("click", handlerenameClick);
  console.log("afterremocve");
}
