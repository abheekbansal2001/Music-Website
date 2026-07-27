console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems= Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Dhundala - Talwinder", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Bargad - Arpit Bala", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Haseen - Talwinder", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Tu - Talwinder", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Tv Off - Kendrick Lamar", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Iss Tarah - Chaar Diwari", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Zindagi Pyaar Ka Geet Hai", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Let me Love You", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Let me Love You", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Let me Love You", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },

]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName



})
//Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
    }
});
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {

        let clickedIndex = parseInt(e.target.id);

        // Same song is already playing -> Pause it
        if (songIndex === clickedIndex && !audioElement.paused) {

            audioElement.pause();

            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');

            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');

            gif.style.opacity = 0;
        }

        // Same song is paused -> Resume it
        else if (songIndex === clickedIndex && audioElement.paused) {

            audioElement.play();

            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');

            gif.style.opacity = 1;
        }

        // Different song selected
        else {

            makeAllPlays();

            songIndex = clickedIndex;

            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();

            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');

            gif.style.opacity = 1;
        }
    });
});
        




