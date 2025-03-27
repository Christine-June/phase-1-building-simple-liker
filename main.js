// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
// Add .hidden class to the error modal in HTML (already done in the provided HTML)

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const errorModal = document.getElementById('modal');
  const errorMessage = document.getElementById('modal-message');
  const hearts = document.querySelectorAll('.like-glyph');

  // Add click event to each heart
  hearts.forEach(heart => {
    heart.addEventListener('click', () => {
      if (heart.classList.contains('activated-heart')) {
        // Unlike if already liked
        heart.classList.remove('activated-heart');
        heart.textContent = '♡';
      } else {
        // Try to like
        mimicServerCall()
          .then(() => {
            // Success
            heart.classList.add('activated-heart');
            heart.textContent = '♥';
          })
          .catch(error => {
            // Failure
            errorModal.classList.remove('hidden');
            errorMessage.textContent = error;
            setTimeout(() => {
              errorModal.classList.add('hidden');
            }, 3000);
          });
      }
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
