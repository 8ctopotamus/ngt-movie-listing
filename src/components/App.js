import React, { Component } from 'react'
import FilmList from './FilmList'
import 'whatwg-fetch' // fetch polyfill for legacy browsers

import './app.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      xmlDoc: '',
      xmlError: false,
      fourOhFourError: false,
      usingIE: false
    }
  }

  componentWillMount() {
    const siteUrl = window.location.href

    // Each on of the sites has its own ID on the XML filename.
    // Eg: OnlineSchedule_XXXXX
    let fileId
    if (siteUrl.indexOf('avalonmke') !== -1){
      fileId = '26203'
    } else if (siteUrl.indexOf('timescinema') !== -1) {
      fileId = '26202'
    } else if (siteUrl.indexOf('rosebudcinema') !== -1) {
      fileId = '26201'
    } else if (siteUrl.indexOf('localhost') !== -1) {
      fileId = 'test'
    }

    const XMLFileURL = `${siteUrl.replace('test', '')}/OnlineSchedule_${fileId}.xml`

    fetch(XMLFileURL)
      .then(res => {
        if (res.status == 404) {
          this.setState({fourOhFourError: true})
          return
        }

        return res.text()
      })
      .then(xmlString => {
        const parser = new DOMParser()
        // We first need to clean omniwebticketing XML string.
        // We need to find ampersands in XML that are not followed by the substrings: apos | quot | [gl]t | amp
        // I found this was necessary to parse the type string into XML.
        const safeString = xmlString.replace(/&(?!(?:apos|quot|[gl]t|amp)|#)/g, '&amp')
        // parse the string to XML
        return parser.parseFromString(safeString, "application/xml")
      })
      .then(data =>{ this.setState({xmlDoc: data})})
      .catch(err => {
        console.log(err)
        this.setState({xmlError: true})
      })
  }

  render() {
    if (this.state.fourOhFourError)
      return <span style={{color: 'red'}}>XML file not found.</span>

    if (this.state.xmlError)
      return <span style={{color: 'red'}}>Error loading schedule XML.</span>

    if (this.state.xmlDoc === '') {
      return <span style={{color: 'lightgrey'}}>Loading movie data...</span>}

    const films = Array.prototype.slice.call(this.state.xmlDoc.getElementsByTagName('film'))
    const days = Array.prototype.slice.call(this.state.xmlDoc.getElementsByTagName('schedule_day'))

    return (
      <FilmList className="films-list" films={films} days={days} />
    )
  }
}

export default App
