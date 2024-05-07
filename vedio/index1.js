// Accessing video and audio elements
const videoElement = document.getElementById('videoElement');
const speechOutput = document.getElementById('speechOutput');
const videoButton = document.getElementById('videoButton');
const audioButton = document.getElementById('audioButton');
const fixedBottom = document.createElement('div');
fixedBottom.className = 'fixed-bottom';
let videoStream; // Variable to store the video stream
let recognition;
let isSpeechActive = false;
let recognitionEnded = true; 

// Function to toggle video
function toggleVideo() {
    if (!videoStream) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(stream => {
                videoStream = stream; // Assign the stream to videoStream variable
                videoElement.srcObject = stream; // Set the video stream as srcObject of the video element
                videoElement.style.display = 'block';
                videoButton.innerText = 'Stop Video';
            })
            .catch(error => {
                console.error('Error accessing webcam:', error);
            });
    } else {
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
        videoElement.srcObject = null;
        videoElement.style.display = 'none';
        videoButton.innerText = 'Start Video';
    }
}

// Function to toggle speech recognition
function toggleSpeech() {
    if (!recognition) {
        recognition = new webkitSpeechRecognition() || SpeechRecognition(); 
        recognition.lang = 'en-US';
        recognition.interimResults = true; 

        recognition.onresult = function(event) {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    transcript += event.results[i][0].transcript;
                } else {
                    transcript += event.results[i][0].transcript + ' ';
                }
            }
            speechOutput.value = transcript; 
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = function() {
            console.log('Speech recognition ended');
            recognitionEnded = true;
        };
    }

    if (!isSpeechActive) {
        // Start recognition if it's not active
        recognition.start();
        isSpeechActive = true;
        audioButton.innerText = 'Stop Speech'; // Change button text to "Stop Speech" when recognition starts
        speechOutput.style.display = 'block'; // Show the speech output textarea
    } else {
        // Stop recognition if it's active
        recognition.stop();
        isSpeechActive = false;
        audioButton.innerText = 'Start Speech'; // Change button text to "Start Speech" when recognition stops
        speechOutput.style.display = 'none'; // Hide the speech output textarea
    }
}

// Append buttons to fixedBottom div
fixedBottom.appendChild(videoButton);
fixedBottom.appendChild(audioButton);

// Append fixedBottom to body
document.body.appendChild(fixedBottom);
