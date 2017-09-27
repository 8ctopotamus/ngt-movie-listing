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

  render() {
    const id = this.props.data.getElementsByTagName("titlecode")[0].childNodes[0].nodeValue
    const title = this.props.data.getElementsByTagName("titlename")[0].childNodes[0].nodeValue
    const rating = this.props.data.getElementsByTagName("rating")[0].childNodes[0].nodeValue
    const genre = this.props.data.getElementsByTagName("genre")[0].childNodes[0].nodeValue
    const runtime = this.props.data.getElementsByTagName("runtime")[0].childNodes[0].nodeValue
    const synopsis = this.props.data.getElementsByTagName("synopsis")[0].childNodes[0].nodeValue
    let poster = this.props.data.getElementsByTagName("poster")[0].childNodes[0].nodeValue
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
    let datesArray = [] // for dup. checking
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

    // Julie wants to be able to link her menu to each film
    // here we create an ID she can use for her links
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
          { /* the trailer modal */
            trailerURL && <ModalVideo channel={trailerChannel} isOpen={this.state.isOpen} videoId={trailerURL} onClose={() => this.setState({isOpen: false})} />
          }

          <h2>{title}</h2>
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

        <style jsx>{`
          h2,
          p,
          strong,
          table {
            color: #C7B299;
          }
          h2 {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 12px;
            color: white;
            text-transform: uppercase;
          }
          p {
            font-size: 10.5pt;
            margin-bottom: 10px;
          }
          .film-details {
            font-weight: bold;
            text-transform: uppercase;
          }
          .th {
            padding: 6px !important;
            font-weight: bold;
          }
          .film {
            display: flex
            margin: 30px 0 70px;
            font-family: "Trebuchet MS", sans-serif;
          }
          .film > div {
            margin-right: 20px;
          }
          .film img {
            width: 250px;
            height: 380px;
          }
          .film .trailer-button {
            background: transparent;
            border-width: 2px;
            border-style: solid;
            padding: 10px 23px;
            margin-bottom: 10px;
          }
          .film .trailer-button:hover {
            cursor: pointer;
            opacity: .8;
          }
          @media screen and (max-width: 47.938em) {
            .film {
              flex-direction: column;
            }
            .film > div { margin-right: 0; }
            .film > div:first-child {
              width: 100%;
              display: flex;
              justify-content: center;
            }
            .film img {
              margin-bottom: 25px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Film
