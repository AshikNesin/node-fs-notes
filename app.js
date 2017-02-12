const fs = require('fs')
const os = require('os')
const yargs = require('yargs')
const notes = require('./notes')

const titleOptions = {
    		describe:'Title of note',
    		demand:true,
    		alias:'t'
    	}
const bodyOptions = {
				describe:'Body of note',
    		demand:true,
    		alias:'b'
}
const argv = yargs
    .command('add','Add a note',{title:titleOptions,body:bodyOptions})
    .command('remove','Remove a note',{title:titleOptions})
    .command('read','Read a note',{title:titleOptions})
    .command('list','List all notes')
    .help()
    .argv

const { title, body, _ } = argv
const command = _[0]


const add = () => {
    const note = notes.add(title, body)
    if (note) {
        console.log('Note created');
        console.log('------------');
        console.log(`Title : ${title}`);
        console.log(`Body : ${body}`);
    } else {
        console.log('Note title exists');
    }
}

const remove = () => {
    const noteRemoved = notes.remove(title)
    const message = (noteRemoved) ? 'Note has been removed' : 'No notes found'
    console.log(message);
}

const list = () => {
    const allNotes = notes.fetchNotes()
    if (allNotes.length > 0) {
        console.log(allNotes);
    } else {
        console.log('No notes exists');
    }
}
const read = () => {
    const note = notes.get(title)
    if (note.length > 0) {
        const { title, body } = note[0]
        console.log('Note');
        console.log('------------');
        console.log(`Title : ${title}`);
        console.log(`Body : ${body}`);
    } else {
        console.log('Note title deoes not exists');
    }
}
const actionHandler = {
    add,
    remove,
    read,
    list,
}

const availableCommands = ['add', 'remove', 'list', 'read']
if (availableCommands.includes(command)) {
    actionHandler[command]()
} else {
    console.log('Command not found');
}
