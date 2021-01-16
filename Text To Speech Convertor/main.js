const main = document.querySelector('main');
const voiceselect = document.getElementById('voices'); 
const textarea = document.getElementById('text'); 
const readbtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle'); 
const closeBtn = document.getElementById('close'); 

const data = [
    {
        image: 'thirsty.jpeg',
        text: "I'm Thirsty"
    },
    {
        image: 'hungry.jpg',
        text: "I'm Hungry"
    },
    {
        image: 'alone.jpeg',
        text: "I'm alone"
    },
    {
        image: 'hurry.jpeg',
        text: "Hurry"
    },
    {
        image: 'happy.jpeg',
        text: "I'm happy"
    },
    {
        image: 'party.jpeg',
        text: "In a Party"
    },
    {
        image: 'justchill.jpeg',
        text: "Just chilling"
    },
    {
        image: 'coder.jpeg',
        text: "I'm a Coder"
    },
    {
        image: 'think.jpeg',
        text: "I'm Thiking"
    },
    
    {
        image: 'angry.jpeg',
        text: "I'm angry"
    },
    
    {
        image: 'eating.jpeg',
        text: "I'm eating"
    },
    
    {
        image: 'travelling.jpeg',
        text: "traveling"
    },
];
data.forEach(createBox);

function createBox(item)
{
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');
    box.innerHTML = `
    <img src = "${image}" alt = ${text}/>
    <p class = "info">${text}</p>
     `;
    
    //speak event
    box.addEventListener('click', () =>
    {
        setTextMessage(text);
        speakText();

        //add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'),800);
    })
    
    main.appendChild(box);
}

//init speech synthesis
const message = new SpeechSynthesisUtterance();


let voices = [];
function getvoices()
{
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voiceselect.appendChild(option);
    });
}

//set text
function setTextMessage(text)
{
    message.text = text;
}

//speak text
function speakText()
{
    speechSynthesis.speak(message); 
}

function setVoice(e)
{
    message.voice = voices.find(voice => voice.name === e.target.value)
}
speechSynthesis.addEventListener('voiceschanged', getvoices);

toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

closeBtn.addEventListener('click', oncloseBtn);

function oncloseBtn()
{
    document.getElementById('text-box').classList.remove('show');
    textarea.value = "";
}

//change voice
voiceselect.addEventListener('change', setVoice);

//read text button
readbtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
}
);
getvoices();