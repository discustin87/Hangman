const wordEL = document.getElementById('word');
const wrongLettersEL = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programing', 'interface', 'wizard', 'adobe', 'microsoft', 'development',];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// show hidden word
function displayWord() {
   wordEL.innerHTML =  `
      ${selectedWord
          .split('')
          .map(letter => `
             <span class="letter">
               ${correctLetters.includes(letter) ? letter : ''}
             </span>
          `).join('')}
   `;
   const innerWord = wordEL.innerText.replace(/\n/g, '');     
   
   if (innerWord === selectedWord) {
       finalMessage.innerText = '🎉 Congratulations! you won! 😎'
       popup.style.display = 'flex';
   } else {
       
   }
}

// update wrong letters
function updateWrongLettersEl() {
    // display wrong letters
    wrongLettersEL.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = `😢 YOU SUCK LOSER 😫`;

        popup.style.display = 'flex';
    } else {
        
    }
}

// show notification 
function showNotification() {
    notification.classList.add('show')

    setTimeout(() => {
       notification.classList.remove('show')
    }, 2000);
}

// keydown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    } 
});

// restart game and play again 
playAgainBtn.addEventListener('click', () => {
    // empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();