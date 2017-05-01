import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()
navigator.requestMIDIAccess({sysex: false}).then(MIDISuccess, MIDIError)

function MIDISuccess (midiAccess) {
  ReactDOM.render((
    <MuiThemeProvider>
      <Main midiAccess={midiAccess}/>
    </MuiThemeProvider>
  ), document.getElementById('root'))
}

function MIDIError (e) {
  alert(e)
}

