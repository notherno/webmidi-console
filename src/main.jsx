import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main';

navigator.requestMIDIAccess({sysex: false}).then(MIDISuccess, MIDIError)

function MIDISuccess (midiAccess) {
  ReactDOM.render(<Main midiAccess={midiAccess}/>, document.getElementById('root'))
}

function MIDIError (e) {
  alert(e)
}

