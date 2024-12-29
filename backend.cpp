 #include <iostream>
#include <fstream>
#include <string>
#include <queue>
#include <stack>
using namespace std;

struct Song {
    string title;
    string artist;
    string filePath;
    Song* next;
};

class Playlist {
private:
    Song* head;

public:
    Playlist() : head(nullptr) {}

    void addSong(const string& title, const string& artist, const string& filePath) {
        Song* newSong = new Song{ title, artist, filePath, nullptr };
        if (!head) {
            head = newSong;
        }
        else {
            Song* temp = head;
            while (temp->next) {
                temp = temp->next;
            }
            temp->next = newSong;
        }
        cout << "Song added to playlist: " << title << endl;
    }

    void displayPlaylist() {
        Song* temp = head;
        while (temp) {
            cout << temp->title << " by " << temp->artist << endl;
            temp = temp->next;
        }
    }

    void deleteSong(const string& title) {
        Song* temp = head;
        Song* prev = nullptr;
        while (temp && temp->title != title) {
            prev = temp;
            temp = temp->next;
        }
        if (temp) {
            if (prev) {
                prev->next = temp->next;
            }
            else {
                head = temp->next;
            }
            delete temp;
            cout << "Song deleted from playlist: " << title << endl;
        }
    }

    ~Playlist() {
        Song* temp = head;
        while (temp) {
            Song* toDelete = temp;
            temp = temp->next;
            delete toDelete;
        }
    }
};

class SongQueue {
private:
    queue<Song> songQueue;

public:
    void addSongToQueue(const Song& song) {
        songQueue.push(song);
        cout << "Song added to queue: " << song.title << endl;
    }

    void playNextSong() {
        if (!songQueue.empty()) {
            Song song = songQueue.front();
            songQueue.pop();
            cout << "Now playing: " << song.title << endl;
        }
        else {
            cout << "No more songs in queue.\n";
        }
    }
};

class SongHistory {
private:
    stack<Song> songHistory;

public:
    void addSongToHistory(const Song& song) {
        songHistory.push(song);
        cout << "Song added to history: " << song.title << endl;
    }

    void displayHistory() {
        stack<Song> tempHistory = songHistory;
        while (!tempHistory.empty()) {
            Song song = tempHistory.top();
            cout << song.title << endl;
            tempHistory.pop();
        }
    }
};

int main() {
    Playlist playlist;
    SongQueue songQueue;
    SongHistory songHistory;

    playlist.addSong("Song 1", "Artist 1", "C:/Music/song1.mp3");
    playlist.addSong("Song 2", "Artist 2", "C:/Music/song2.mp3");

    songQueue.addSongToQueue({ "Song 1", "Artist 1", "C:/Music/song1.mp3" });
    songHistory.addSongToHistory({ "Song 1", "Artist 1", "C:/Music/song1.mp3" });

    playlist.displayPlaylist();
    songQueue.playNextSong();
    songHistory.displayHistory();

    return 0;
}
