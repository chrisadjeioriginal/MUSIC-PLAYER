const pause_button_path = "images/pause_button-modified.png";
const play_button_path = "images/play_button-modified.png";
const next_button = document.getElementById("next").children[0];
const previous_button = document.getElementById("previous").children[0];
const audio = document.createElement("audio");
const path_to_first_song = "songs/lost_time.mp3";
const imageDiv = document.getElementById("screen").children[0];
const windowDiv = document.getElementById("window");
const htmlDiv = document.querySelector("html");
const lyricsBox = document.getElementById("lyric-box");

// 'SONG INDEX' IS USED TO MOVE TO THE NEXT SONG IN THE QUEUE

let songIndex = 0;

// THE SONG_LIBRARY STORES THE INFORMATION OF PATH OF THE SONG
// IT ALSO STORES OTHER INFORMATION LIKE THE COLOUR OF MUSIC PLAYER
// AND THE PATH OF A SONG'S COVER ARTS

song_library = {
  0: {
    song_name: "LOST TIME",
    songPath: "songs/lost_time.mp3",
    coverPath: "images/lost_time_cover.jpg",
    windowBGC: "rgba(245, 155, 155, 0.974)",
    pageBGC: "rgba(230, 124, 124, 0.974)",
    lyrics: "lost_time_lyrics.txt",
  },
  1: {
    song_name: "SEE YOU",
    songPath: "songs/see_you.mp3",
    coverPath: "images/see_you_cover.jpg",
    windowBGC: "rgba(254, 219, 176, 0.89)",
    pageBGC: "rgba(223, 189, 147, 0.97)",
  },
  2: {
    song_name: "SPECIAL",
    songPath: "songs/special.mp3",
    coverPath: "images/special_cover.JPG",
    windowBGC: "rgba(12, 60, 165, 0.83)",
    pageBGC: " rgba(11, 42, 111, 0.9)",
  },
};

audio.src = song_library[0].songPath;

// FUNCTION TO PLAY THE SONG

function playSong() {
  audio.play();
}

// FUNCTION TO PAUSE THE SONG

function pauseSong() {
  audio.pause();
}

const song_library_length = Object.keys(song_library).length;
let data;

// FUNCTION TO PLAY THE NEXT SONG IN THE QUEUE

function next() {
  songIndex += 1;
  if (songIndex > song_library_length - 1) {
    songIndex = 0;
  }
  data = song_library[songIndex];
  imageDiv.src = data.coverPath;
  windowDiv.style.backgroundColor = data.windowBGC;
  document.body.style.backgroundColor = data.pageBGC;
  htmlDiv.style.backgroundColor = data.pageBGC;
  audio.src = data.songPath;
  if (!pause_button.src.includes(pause_button_path)) {
    playSong();
  }
}

// FUNCTION TO PLAY THE PREVIOUS SONG

function previous() {
  songIndex -= 1;
  if (songIndex < 0) {
    songIndex = song_library_length - 1;
  }
  data = song_library[songIndex];
  imageDiv.src = data.coverPath;
  windowDiv.style.backgroundColor = data.windowBGC;
  document.body.style.backgroundColor = data.pageBGC;
  htmlDiv.style.backgroundColor = data.pageBGC;
  audio.src = data.songPath;
  if (!pause_button.src.includes(pause_button_path)) {
    playSong();
  }
}

// FUNCTION TO CHANGE THE IMAGE OF THE PAUSE AND PLAY BUTTON
// AS WELL AS PAUSE OR PLAY THE SONG

function pause_and_play(e) {
  if (e.target.src.includes(pause_button_path)) {
    e.target.src = play_button_path;
    playSong();
  } else {
    e.target.src = pause_button_path;
    pauseSong();
  }
}

const pause_button = document.getElementById("pause");

// THESE LINES OF CODE ADD FUNCTIONALITY TO THE BUTTONS
pause_button.addEventListener("click", pause_and_play);
next_button.addEventListener("click", next);
previous_button.addEventListener("click", previous);

// THIS TELLS THE PROGRAMME TO MOVE TO THE NEXT SONG IN THE QUEUE (AUTOPLAY)

audio.addEventListener("ended", next);

console.log("here you go", song_library[songIndex]["lyrics"]);

let lyric_holder;
async function getLyrics() {
  try {
    const res = await fetch(
      `/lyrics?song=${song_library[songIndex]["lyrics"]}`
    );
    const text = await res.text();
    return text;
  } catch (err) {
    console.log("made it here");
    console.log("Error fetching lyrics:", err);
  }
}

getLyrics().then((words) => {
  const lyricBox = document.getElementById("box");
  lyricBox.textContent = words;
});
