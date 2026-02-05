import { thanks } from "./txt.js";

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".formClass")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      alert(thanks);
    });
});
