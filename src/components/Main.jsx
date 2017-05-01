import React from 'react'
import PropTypes from 'proptypes'

class Main extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    return <div>
      <select><option value="aa">Hey</option></select>
    </div>
  }
}

Main.propTypes = {
  midiAccess: PropTypes.object.isRequired
}

export default Main
