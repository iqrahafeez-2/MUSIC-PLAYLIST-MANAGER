let songList = [];
let songQueue = [];
let songHistory = [];
let songCount = 1; // Track song number for display

// Function to add song to playlist
function addSong() {
    const title = document.getElementById('songTitle').value;
    const artist = document.getElementById('songArtist').value;
    const filePath = document.getElementById('songPath').value;

    if (title && artist && filePath) {
        const song = { title, artist, filePath };
        songList.push(song);
        displayPlaylist();
        alert("Song added successfully!");
    } else {
        alert("Please provide all the details.");
    }

    // Clear input fields
    document.getElementById('songTitle').value = '';
    document.getElementById('songArtist').value = '';
    document.getElementById('songPath').value = '';
}

// Function to display playlist
function displayPlaylist() {
    const songListElement = document.getElementById('songList');
    songListElement.innerHTML = '';
    songList.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${song.title} by ${song.artist} 
            <button onclick="addToQueue(${index})">Add to Queue</button>
            <button onclick="deleteSong(${index})">Delete</button>`;
        songListElement.appendChild(li);
    });
}

// Function to delete song from playlist
function deleteSong(index) {
    songList.splice(index, 1);
    displayPlaylist();
}

// Function to add song to queue
function addToQueue(index) {
    const song = songList[index];
    songQueue.push(song);
    displayQueue();
}

// Function to display queue
function displayQueue() {
    const queueElement = document.getElementById('songQueue');
    queueElement.innerHTML = '';
    songQueue.forEach((song) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} by ${song.artist}`;
        queueElement.appendChild(li);
    });
}

// Function to play next song in the queue
function playNext() {
    if (songQueue.length > 0) {
        const song = songQueue.shift();  // Get the first song in the queue
        songHistory.push(song);  // Add it to history
        displayQueue();  // Refresh queue display
        displayHistory();  // Refresh history display

        // Display the current song number and name
        const songElement = document.createElement('div');
        songElement.innerHTML = `<h3>Now Playing: Song ${songCount}: ${song.title}</h3>`;
        document.getElementById('songs').innerHTML = '';  // Clear previous song display
        document.getElementById('songs').appendChild(songElement);

        // Create audio element and play the song
        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        const source = document.createElement('source');
        source.src = song.filePath;
        source.type = 'audio/mpeg';
        audioPlayer.appendChild(source);

        audioPlayer.play()
            .then(() => {
                console.log(`Now playing: ${song.title}`);
            })
            .catch((error) => {
                console.error("Error playing the file. Ensure the file path is correct.");
            });

        // Increment song count for next song
        songCount++;
    } else {
        alert("Queue is empty.");
    }
}

// Function to display play history
function displayHistory() {
    const historyElement = document.getElementById('historyList');
    historyElement.innerHTML = '';
    songHistory.forEach((song) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} by ${song.artist}`;
        historyElement.appendChild(li);
    });
}

// Function to search song
function searchSong() {
    const searchTerm = prompt("Enter song title to search:");
    const results = songList.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const searchListElement = document.getElementById('searchList');
    searchListElement.innerHTML = '';
    if (results.length > 0) {
        results.forEach((song) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} by ${song.artist}`;
            searchListElement.appendChild(li);
        });
    } else {
        alert("No songs found.");
    }
}

// Event listeners for buttons
document.getElementById('addSongBtn').addEventListener('click', addSong);
document.getElementById('playBtn').addEventListener('click', playNext);
document.getElementById('historyBtn').addEventListener('click', displayHistory);
document.getElementById('searchSongBtn').addEventListener('click', searchSong);
