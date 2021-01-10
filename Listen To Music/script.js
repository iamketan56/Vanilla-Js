const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('prograss');
const progressContainer = document.getElementById('prograss-container') 
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Titles
const songs = ['badboy', 'funny','amitsaini'];

// Keep Track
let songindex = 0;

loadsong(songs[songindex]);

function loadsong(song)
{
    title.innerText = song;
    audio.src = `${song}.mp3`;
    cover.src = `${song}.jpg`;
}

function playSong()
{
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong()
{
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function prevSong()
{
    songindex--;
    if (songindex < 0)
    {
        songindex = songs.length - 1;

    }
    loadsong(songs[songindex]);
    playSong();
}


function nextSong()
{
    songindex++;
    if (songindex == songs.length)
    {
        songindex = 0;

    }
    loadsong(songs[songindex]);
    playSong();
    
}

function updateprogress(e)
{
    const { duration, currentTime } = e.srcElement;
    const progressPErcent = (currentTime / duration) * 100;
    progress.style.width = `${progressPErcent}%`;
}
function setprogress(e)
{
    const width = this.clientWidth;
    const clickx = e.offsetX;
    const duration = audio.duration;
    console.log(clickx);

    audio.currentTime = (clickx / width) * duration;
}
playBtn.addEventListener('click', () => {

    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying)
    {
        pauseSong();
    }
    else
    {
        playSong();
        }
});


prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateprogress);

progressContainer.addEventListener('click', setprogress);

audio.addEventListener('ended', nextSong);