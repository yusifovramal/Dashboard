
const menuBtn = document.getElementById("menu-btn");
const mainAside = document.querySelector(".main-aside")
const mainContent = document.querySelector(".main-content")
const closeAsideBtn = document.querySelector(".close-aside-btn")

// match media
function myFunc(){
  if (window.matchMedia("(max-width: 1399.98px)").matches) {
    mainAside.classList.add("main-aside-responsive")
    closeAsideBtn.onclick = function () {
      mainAside.classList.add("hide")
      mainAside.classList.remove("main-aside-responsive")
    }
    menuBtn.onclick = function () {
      mainAside.classList.remove("hide")
      mainAside.classList.remove("main-aside-responsive-hide")
      mainAside.classList.add("main-aside-responsive")
    }
  } else {
    mainAside.classList.remove("main-aside-responsive")
    menuBtn.onclick = function () {
      if (mainAside.classList.contains("hide")) {
        mainAside.classList.remove("hide")
        mainContent.classList.remove("fullscreen");
      } else {
        mainAside.classList.add("hide")
        mainContent.classList.add("fullscreen");
      }
    }
  }
  
}
// toggle btns
const toggleBtns = document.querySelectorAll(".toggle-btn")
toggleBtns.forEach((btn) => {
  btn.onclick = function () {
    btn.classList.toggle("active")
  }
})
window.addEventListener("change",myFunc())
