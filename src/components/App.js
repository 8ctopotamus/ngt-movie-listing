import React, { Component } from 'react'
import FilmList from './FilmList'
import 'whatwg-fetch'

class App extends Component {
  constructor() {
    super()
    this.state = {
      xmlDoc: '',
      xmlError: false,
      usingIE: false
    }
  }

  componentWillMount() {
    // if not using IE, get on with the actual work
    const siteUrl = window.location.href

    // Each on of the sites has its own ID on the XML filename
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
      .catch(err => {
        console.log(err)
        this.setState({xmlError: true})
      })
  }

  render() {
    if (this.state.xmlError) return <span>Error loading Omniweb XML.</span>

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
