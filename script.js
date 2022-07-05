const playBtn = document.querySelector(".player__playBtn");
const volumeIcon = document.querySelector(".player__volumeIcon");
const changeVolume = document.querySelector(".changeVolume");
const timer = document.querySelector(".player__time");
const fullscreen = document.querySelector(".player__fullscreen");
const video = document.querySelector("video");
const progressVideo = document.querySelector(".player__progressStatus");

// video.volume = changeVolume.value;
let progression;
let currentTime = document.querySelector(".player__currentTime");
let fullTime = document.querySelector(".player__fullTime");
const playerBar = document.querySelector(".player__progress");
const player = document.querySelector(".videoPlayer");
const lastVolume = [];

//Play video;
function tooglePlay() {
  if (video.paused) {
    video.play();
    progress();
    progression = window.setInterval(progress, 150);
    playBtn.style.backgroundImage = `url(assets/svg/pause.svg)`;
  } else {
    video.pause();
    playBtn.style.backgroundImage = `url(assets/svg/play.svg)`;
    clearInterval(progression);
  }
}
//volume off/onn
function videoVolume() {
  if (video.volume) {
    lastVolume.push(changeVolume.value);
    changeVolume.value = 0;
    volume.bind(changeVolume)();
    volumeIcon.style.backgroundImage = `url(assets/svg/mute.svg)`;
  } else {
    changeVolume.value = lastVolume.pop();
    volume.bind(changeVolume)();
    volumeIcon.style.backgroundImage = `url(assets/svg/volume.svg)`;
  }
}
// set volumeValue, volumeProgressBar style;
function volume() {
  video.volume = changeVolume.value;
  changeVolume.style.background = `linear-gradient(
        to right,
        #b72bd3 0%,
        #b72bd3 ${this.value * 100}%,
        #fff 40%,
        #fff 100%)`;
  if (video.volume)
    volumeIcon.style.backgroundImage = `url(assets/svg/volume.svg)`;
}

//video progressBar
function progress() {
  let currentProgress = video.currentTime / video.duration;
  progressVideo.style.flexBasis = Math.floor(currentProgress * 1000) / 10 + "%";
  if (video.currentTime == video.duration) {
    video.currentTime = 0;
    video.play();
    playBtn.click();
  }
}
//update progressBar
function updateProgress(e) {
  let newProgress = (e.clientX - player.offsetLeft) / player.clientWidth;
  progressVideo.style.flexBasis = Math.floor(newProgress * 1000) / 10 + "%";
  video.currentTime = newProgress * video.duration;
}
//update videoTime
function updateTime() {
  currentTime.innerHTML = `${displayTime(video.currentTime)} /`;
  fullTime.innerHTML = `${displayTime(video.duration)}`;
}

//format videoTime
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

//fullscreen
function videoFullscreen() {
  video.requestFullscreen();
}

video.addEventListener("click", tooglePlay);
playBtn.addEventListener("click", tooglePlay);
playerBar.addEventListener("click", updateProgress);
video.addEventListener("timeupdate", updateTime);
video.addEventListener("canplay", updateTime);
player.addEventListener("click", playBtn.click);
changeVolume.addEventListener("input", volume);
volumeIcon.addEventListener("click", videoVolume);
fullscreen.addEventListener("click", videoFullscreen);
