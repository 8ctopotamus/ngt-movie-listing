import React from 'react'
import Performance from './Performance'
import ModalVideo from 'react-modal-video'

import '../../node_modules/react-modal-video/scss/modal-video.scss'

class Film extends React.Component {
  constructor() {
    super()
    this.state = { isOpen: false }
    this.openModal = this.openModal.bind(this)
  }

  openModal() {
    this.setState({isOpen: !this.state.isOpen})
  }

  // if an XML tag is empty, the script crashes
  getXMLTagValue(tag) {
    if (this.props.data.getElementsByTagName(tag)[0].hasChildNodes()) {
      return this.props.data.getElementsByTagName(tag)[0].childNodes[0].nodeValue
    } else {
      console.warn(tag + ' is not defined')
      return ''
    }
  }

  render() {
    const id = this.getXMLTagValue('titlecode')
    const title = this.getXMLTagValue('titlename')
    const rating = this.getXMLTagValue('rating')
    const genre = this.getXMLTagValue('genre')
    const runtime = this.getXMLTagValue('runtime')
    const synopsis = this.getXMLTagValue('synopsis')
    let poster = this.getXMLTagValue('poster')
    poster = poster.replace(' ', '%20')

    // trailer URLs
    const trailerTag = this.props.data.getElementsByTagName("trailer_url")[0]
    let trailerURL
    let trailerChannel
    if (trailerTag.hasChildNodes()) {
      if (trailerTag.childNodes[0].nodeValue.includes('youtube.com')) { // is youtube URL
        trailerChannel = 'youtube'
        trailerURL = trailerTag.childNodes[0].nodeValue.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i)[1]
      } else if (trailerTag.childNodes[0].nodeValue.includes('vimeo')) { // is vimeo URL
        trailerChannel = 'vimeo'
        trailerURL = trailerTag.childNodes[0].nodeValue.split('vimeo.com/')[1]
      } else {
        throw Error ('Video link is neither a Youtube nor Vimeo URL')
      }
    } else {
      trailerURL = null
    }

    // performances
    const performances = Array.prototype.slice.call(this.props.data.getElementsByTagName('performance'))

    // Take collected performance dates and combine times and generate a table
    let datesArray = [] // for duplicate checking
    let formattedPerformances = []

    performances.forEach((performance, i) => {
      const id = performance.getElementsByTagName("performanceid")[0].childNodes[0].nodeValue
      const url = performance.getElementsByTagName("omniweb_url")[0].childNodes[0].nodeValue
      const date = url.match(/\d{4}([.\-/ ])\d{2}\1\d{2}/)[0]
      const showtime = performance.getElementsByTagName('showtime')[0].childNodes[0].nodeValue

      // if date is already saved, add showtime
      if (datesArray.includes(date)) {
        const targetObj = formattedPerformances.find(obj => {
          return obj.date === date
        })
        // add showtime to showtimes array
        targetObj.showtimes.push({showtime, url})
        // exit
        return
      }

      // otherwise, create a new item in the array
      datesArray.push(date)
      formattedPerformances.push({id, date, showtimes: [{showtime, url}]})
    })

    // determine font color as per designer's request.
    const siteUrl = window.location.href
    let textColor
    if (siteUrl.indexOf('avalonmke') !== -1){
      textColor = '#C7B299'
    } else {
      textColor = 'rgb(229, 229, 229)'
    }

    // Julie, the designer, wants to be able to link her menu to each film.
    // here we create an ID she can use for her links.
    const linkableID = title.trim()
                            .replace(/[^\w ]+/g,'')
                            .replace(/ +/g,'-')
                            .toLowerCase()

    return (
      <div id={linkableID} className="film">
        <div>
          <img src={`${window.location.href.replace('test', '')}images/posters/webcontent/poster/${poster}`} alt={title} />
        </div>
        <div>
          {
            /* the trailer modal */
            trailerURL && <ModalVideo channel={trailerChannel} isOpen={this.state.isOpen} videoId={trailerURL} onClose={() => this.setState({isOpen: false})} />
          }

          <h2 className="film-title" style={{color: textColor}}>{title}</h2>
          <p className="film-details" style={{color: textColor}}>{`${genre} | ${rating} | ${runtime}m`}</p>

          {
            trailerURL && (
              <button
                className="trailer-button"
                onClick={this.openModal}
                style={{
                  color: textColor,
                  borderColor: textColor
                }}
              >
                View Trailer
              </button>
            )
          }

          <p style={{color: textColor}}>{ synopsis }</p>
          <table style={{color: textColor}}>
            <thead>
              <tr>
                <th className="th">
                  Date
                </th>
                <th className="th">
                  Buy Tickets
                </th>
              </tr>
            </thead>
            <tbody>
              { formattedPerformances.map((perfData, i) => <Performance data={perfData} color={textColor} key={i} />) }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Film
