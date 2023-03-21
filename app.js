const music = document.querySelector('audio'),
      prevBtn = document.querySelector('#prev'),
      playBtn = document.querySelector('#play'),
      nextBtn = document.querySelector('#next'),
      img = document.querySelector('img'),
      title = document.querySelector('#title'),
      artist = document.querySelector('#artist'),
      progressContainer = document.querySelector('#progress-container'),
      progress = document.querySelector('#progress'),
      currentTimeOfMusic = document.querySelector('#current-time'),
      durationOfMusic  = document.querySelector('#duration');




// Music Array
const songs =[
    {
        id:'music-1',
        name:'pic-1',
        displayName: 'Alapatra',
        artist:'Yabesh Thapa',
    },
    {
        id:'music-2',
        name:'pic-2',
        displayName: 'Kurakani',
        artist:'Sajan Raj Vaidya',
    },
    {
        id:'music-3',
        name:'pic-3',
        displayName: 'Maili',
        artist:'Ankita Pun',
    },
    {
        id:'music-4',
        name:'pic-4',
        displayName: ' Those Eyes',
        artist:'New West',
    },
    {
        id:'music-5',
        name:'pic-5',
        displayName: 'Ranga',
        artist:'Rock Heads',
    }
]

// Check if Playing
let isPlaying = false;

// Play
const playSong =()=>{
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.setAttribute('title','Pause')
    music.play()
}

// Pause 
const pauseSong =() =>{
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title','Play')
    music.pause()
}

// play or Pause
playBtn.addEventListener('click',()=> isPlaying ? pauseSong(): playSong())

// Update DOM
const loadSong =(song)=>{
    title.textContent =song.displayName;
    artist.textContent = song.artist;
    music.src = `Music/${song.id}.mp3`
    img.src = `img/${song.name}.jpg`
}
// Current Song 
let songIndex = 0
// Previous Song
const prevSong =()=>{
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex])
    playSong()
}
// Next Song
const nextSong =()=>{
    songIndex++
    if(songIndex > songs.length - 1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
// OnLoad First Song
loadSong(songs[songIndex]);


// Update Progress Bar and time
const updateProgressBar =(e)=>{
    if(isPlaying){
        const {duration,currentTime} = e.srcElement
        // Progress Percenatge
        const progressBar = (currentTime / duration)*100;
        // progress Update on DOM
        progress.style.width = `${progressBar}%`

        // Calcuate Duration Times in Min
        const durationTime = Math.floor(duration / 60);
        // Calculate Remaing Seconds For Durtation
        let durationSec = Math.floor(duration%60);
        // Check if Duration Time is Less than 10 Second or not
        if(durationSec <10 ){
            // If less then 10 add '0' in the fornt
            durationSec = `0${durationSec}`
        }
        // Delay Switching duration to avoid NaN
        if(durationSec){
            // DOM Manuplation for duration
            durationOfMusic.textContent = `${durationTime}:${durationSec}`;
        }

          // Calcuate Duration Times in Min
          const currentMin = Math.floor(currentTime / 60);
          // Calculate Remaing Seconds For Durtation
          let currentSec = Math.floor(currentTime%60);
          // Check if Duration Time is Less than 10 Second or not
          if(currentSec <10 ){
              // If less then 10 add '0' in the fornt
              currentSec = `0${currentSec}`
          }
        // Delay Switching duration to avoid NaN
        if(currentSec){
            // DOM Manuplation for duration
            currentTimeOfMusic.textContent = `${currentMin}:${currentSec}`;
        }
  


    }
}
// 

// Event Lsitner
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click',nextSong)
music.addEventListener('timeupdate',updateProgressBar)
progressContainer.addEventListener('click',setProgressBar)