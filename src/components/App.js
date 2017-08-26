import React, { Component } from 'react'
import FilmList from './FilmList'

class App extends Component {
  constructor() {
    super()
    this.state = { xmlDoc: '' }
  }

  componentWillMount() {
    console.log(window.location.href)
    const XMLFileURL = `${window.location.href.replace('test', '')}/OnlineSchedule_26203.xml`

    fetch(XMLFileURL)
      .then(res => res.text())
      .then(xmlString => {
        const parser = new DOMParser()
        // first need to clean omniwebticketing XML string
        // need to find ampersands in XML that are not followed by apos | quot | [gl]t | amp
        // found this was necessary to parse the string into XML
        const safeString = xmlString.replace(/&(?!(?:apos|quot|[gl]t|amp)|#)/g, '&amp')
        // parse the string to XML
        return parser.parseFromString(safeString, "application/xml")
      })
      .then(data => this.setState({xmlDoc: data}))
      .catch(err => console.log(err))
  }

  render() {
    if (this.state.xmlDoc === '') {
        return <span>Loading...</span>}

    const films = Array.prototype.slice.call(this.state.xmlDoc.getElementsByTagName('film'))
    const days = Array.prototype.slice.call(this.state.xmlDoc.getElementsByTagName('schedule_day'))

    return (
      <FilmList films={films} days={days} />
    )
  }
}

export default App
