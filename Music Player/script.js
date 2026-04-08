console.log("Spotify Clone Running...");

let currentSong = new Audio();
let songs = [];
let currFolder = "";
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

async function getSongs(folder) {
    currFolder = folder;

    let res = await fetch(`${folder}`);
    let text = await res.text();

    let div = document.createElement("div");
    div.innerHTML = text;

    let links = div.getElementsByTagName("a");

    songs = [];

    for (let link of links) {
        if (link.href.endsWith(".mp3")) {
            songs.push(link.href.split(`${folder}/`)[1]);
        }
    }

    loadSongs();
    return songs;
}

function loadSongs() {
    let songUL = document.querySelector(".songlist ul");
    songUL.innerHTML = "";

    songs.forEach((song, index) => {
        songUL.innerHTML += `
        <li data-index="${index}">
            <img class="invert" width="34" src="images/music.svg">
            <div class="info">
                <div>${song.replaceAll("%20", " ").replace(".mp3", "")}</div>
                <div>${currFolder}</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert playicon" src="images/play.svg">
            </div>
        </li>`;
    });

    document.querySelectorAll(".songlist li").forEach(li => {
        li.addEventListener("click", () => {
            let index = li.getAttribute("data-index");
            playMusic(index);
        });
    });

    updatePlayIcons();
}

function updatePlayIcons() {
    document.querySelectorAll(".songlist li").forEach((li, index) => {
        let icon = li.querySelector(".playicon");

        if (index == currIndex && !currentSong.paused) {
            icon.src = "images/pause.svg";
        } else {
            icon.src = "images/play.svg";
        }
    });
}

function playMusic(index, pause = false) {
    currIndex = index;
    currentSong.src = `${currFolder}/` + songs[index];

    if (!pause) {
        currentSong.play();
        play.src = "images/pause.svg";
    }

    document.querySelector(".songinfo").innerText =
        songs[index]?.replaceAll("%20", " ") || "";

    updatePlayIcons();
}

play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play();
        play.src = "images/pause.svg";
    } else {
        currentSong.pause();
        play.src = "images/play.svg";
    }

    updatePlayIcons();
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

currentSong.addEventListener("ended", () => {
    updatePlayIcons();
});

document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = e.offsetX / e.target.clientWidth;
    currentSong.currentTime = percent * currentSong.duration;
});

document.querySelector(".range").addEventListener("input", (e) => {
    currentSong.volume = e.target.value / 100;
});

document.querySelector(".volume img").addEventListener("click", (e) => {
    if (currentSong.volume > 0) {
        currentSong.volume = 0;
        e.target.src = "images/mute.svg";
        document.querySelector(".range").value = 0;
    } else {
        currentSong.volume = 0.5;
        e.target.src = "images/volume.svg";
        document.querySelector(".range").value = 50;
    }
});

document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
});

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
});

async function displayAlbums() {
    let res = await fetch("songs/albums.json");
    let data = await res.json();

    let cardContainer = document.querySelector(".cardcontainer");
    cardContainer.innerHTML = "";

    data.albums.forEach(album => {
        cardContainer.innerHTML += `
        <div class="card" data-folder="songs/${album.folder}">
            <div class="play">▶</div>
            <img src="songs/${album.folder}/${album.cover}" alt="">
            <h2>${album.title}</h2>
            <p>${album.description}</p>
        </div>`;
    });

    attachCardEvents();
}

function attachCardEvents() {
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", async () => {
            let folder = card.dataset.folder;

            songs = await getSongs(folder);

            if (songs.length > 0) {
                playMusic(0, true);
            }
        });
    });
}

async function main() {
    await displayAlbums();
    await getSongs("songs/");
}

main();