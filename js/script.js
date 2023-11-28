//navbar
const stickyTop = document.querySelector(".sticky-top");
const offcanvas = document.querySelector(".offcanvas");

offcanvas.addEventListener("shown.bs.offcanvas", function () {
  stickyTop.style.overflow = "visible";
});

offcanvas.addEventListener("hide.bs.offcanvas", function () {
  stickyTop.style.overflow = "hidden";
});

//audio
const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const song = document.querySelector("#song");
let isPlaying = false;

function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  playAudio();
  //localStorage.setItem('opened', 'true');
}
function playAudio() {
  // song.volume = 0.1;
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlaying = true;
}

audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
  }
  isPlaying = !isPlaying;
};
// if (!localStorage.getItem('opened')) {
//   disableScroll();
// }
disableScroll();

//form
window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  const urlParams = new URLSearchParams(window.location.search);
  const nama = urlParams.get("n") || "";
  const pronoun = urlParams.get("p") || "Bapak, Ibu, Saudara/i";
  const namaContainer = document.querySelector(".hero h4 span");
  namaContainer.innerText = `${pronoun} ${nama},`.replace(/ ,$/, ",");

  document.querySelector("#nama").value = nama;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Konfirmasi Kehadiran Berhasil Terkirim!");
    });
  });
});
