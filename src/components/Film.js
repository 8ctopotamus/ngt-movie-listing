import React from 'react'
import Performance from './Performance'

const Film = (props) => {
  const id = props.data.getElementsByTagName("titlecode")[0].childNodes[0].nodeValue
  const title = props.data.getElementsByTagName("titlename")[0].childNodes[0].nodeValue
  const rating = props.data.getElementsByTagName("rating")[0].childNodes[0].nodeValue
  const genre = props.data.getElementsByTagName("genre")[0].childNodes[0].nodeValue
  const runtime = props.data.getElementsByTagName("runtime")[0].childNodes[0].nodeValue
  const synopsis = props.data.getElementsByTagName("synopsis")[0].childNodes[0].nodeValue
  let poster = props.data.getElementsByTagName("poster")[0].childNodes[0].nodeValue
  poster = poster.replace(' ', '%20')
  const performances = Array.prototype.slice.call(props.data.getElementsByTagName('performance'))

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
        <h2>{title}</h2>
        <p className="film-details" style={{color: textColor}}>{`${genre} | ${rating} | ${runtime}m`}</p>
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
        }
      `}</style>
    </div>
  )
}

export default Film
