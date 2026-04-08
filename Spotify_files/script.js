console.log("Spotify Clone Running...");

let currentSong = new Audio();
let songs = [
    "songs/Boney M. - Rasputin (Official Audio).mp3",
    "songs/Jaiye Sajana (Audio) Dhurandhar The Revenge Shashwat Sachdev Jasmine Sandlas, Satinder Sartaaj.mp3",
    "songs/Michael Jackson - Man In The Mirror (Official Video).mp3",
    "songs/Sean Paul ft. Dua Lipa - No Lie (Live At Capitals Summertime Ball 2017).mp3",
    "songs/Tamma Tamma(Audio) Dhurandhar The Revenge Ranveer Singh Bappi Lahiri, Anuradha Paudwal, Indeevar.mp3"
];

let currIndex = 0;

let play = document.querySelector(".songbuttons img:nth-child(2)");
let previous = document.querySelector(".songbuttons img:nth-child(1)");
let next = document.querySelector(".songbuttons img:nth-child(3)");

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds)) return "00:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
}

function loadSongs() {
    let songUL = document.querySelector(".songlist ul");
    songUL.innerHTML = "";

    songs.forEach((song, index) => {
        songUL.innerHTML += `
        <li data-index="${index}">
            <img class="invert" width="34" src="images/music.svg">
            <div class="info">
                <div>${song.replace("songs/", "").replace(".mp3", "")}</div>
                <div>Unknown Artist</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="images/play.svg">
            </div>
        </li>`;
    });

    document.querySelectorAll(".songlist li").forEach(li => {
        li.addEventListener("click", () => {
            let index = li.getAttribute("data-index");
            playMusic(index);
        });
    });
}

function playMusic(index) {
    currIndex = index;
    currentSong.src = songs[index];
    currentSong.play();

    document.querySelector(".songinfo").innerText = songs[index].replace("songs/", "");
    play.src = "images/pause.svg";
}

play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play();
        play.src = "images/pause.svg";
    } else {
        currentSong.pause();
        play.src = "images/play.svg";
    }
});

previous.addEventListener("click", () => {
    currIndex = (currIndex - 1 + songs.length) % songs.length;
    playMusic(currIndex);
});

next.addEventListener("click", () => {
    currIndex = (currIndex + 1) % songs.length;
    playMusic(currIndex);
});

currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerText =
        `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;

    document.querySelector(".circle").style.left =
        (currentSong.currentTime / currentSong.duration) * 100 + "%";
});

document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = e.offsetX / e.target.clientWidth;
    currentSong.currentTime = percent * currentSong.duration;
});

document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
});

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
});

// previous.addEventListener("click", () => {
//     console.log("Previous Clicked")
//     console.log(currentSong)

//     let index = songs.indexOf(currentSong.src.split("/".slice(-1))[0])
//     if ((index + 1) >= 0) {
//         playMusic(songs[index + 1])
//     }
// })

// next.addEventListener("click", () => {
//     console.log("Previous Clicked")

//     let index = songs.indexOf(currentSong.src.split("/".slice(-1))[0])
//     if ((index + 1) < songs.length) {
//         playMusic(songs[index + 1])
//     }
// })




// document.querySelector(".range input").addEventListener("input", (e) => {
//     currentSong.volume = e.target.value / 100;
// });

// document.querySelector(".volume img").addEventListener("click", (e) => {
//     if (currentSong.volume > 0) {
//         currentSong.volume = 0;
//         e.target.src = "images/mute.svg";
//         document.querySelector(".range input").value = 0;
//     } else {
//         currentSong.volume = 0.5;
//         e.target.src = "images/volume.svg";
//         document.querySelector(".range input").value = 50;
//     }
// });




// loadSongs();