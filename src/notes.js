import {
    uuid
} from 'uuidv4'
import moment from 'moment'

let notes = []

//Read existing data from local storage
const loadNotes = () => {
    const localDataJSON = localStorage.getItem('notes');
    try {
        return localDataJSON ? JSON.parse(localDataJSON) : [];
    } catch (e) {
        return [];
    }
}

//Save notes to local storage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//expose notes from module
const getNotes = () => notes

const createNote = () => {
    const noteID = uuid();
    const timestamp = moment().valueOf();

    notes.push({
        id: noteID,
        title: "",
        body: "",
        createdAt: timestamp,
        updatedAt: timestamp,
    });

    saveNotes()

    return noteID
}

//remove note
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        saveNotes()
    }
}

//Sort your notes by one of three ways
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return notes;
    }
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return
    }

    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()

    return note
}


notes = loadNotes()

export {
    getNotes,
    createNote,
    removeNote,
    sortNotes,
    updateNote
}