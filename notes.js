const fs = require('fs')
const fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json')
        notes = JSON.parse(notesString)
        return notes
    } catch (e) {
        return []
    }
}

const saveNotes = (notesObj) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notesObj))
}
const add = (title, body) => {
    let notes = fetchNotes()
    const note = {
        title,
        body
    }

    let duplicateNotes = notes.filter((note) => note.title === title)
    if (duplicateNotes.length === 0) {
        notes.push(note)
        saveNotes(notes)
        return note
    }
}

const get = (title) => {
    let notes = fetchNotes()
    return notes.filter((note) => note.title === title)
}
const remove = (title) => {
    let notes = fetchNotes()
    let filteredNotes = notes.filter((note)=>note.title !== title)
    saveNotes(filteredNotes)
    return notes.length !== filteredNotes.length
}

module.exports = {
    add,
    get,
    remove,
    fetchNotes,
}