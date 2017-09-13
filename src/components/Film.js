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

    // if date is already saved, add showtime to that date
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

  console.log(formattedPerformances)

  return (
    <div className="film">
      <div>
        <img src={`${window.location.href.replace('test', '')}images/posters/webcontent/poster/${poster}`} alt={title} />
      </div>
      <div>
        <h2>{title}</h2>
        <p className="film-details">{`${genre} | ${rating} | ${runtime}m`}</p>
        <p>{ synopsis }</p>
        <table>
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
            { formattedPerformances.map((perfData, i) => <Performance data={perfData} key={i} />) }
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
          font-size: 2em;
          font-weight: bold;
          margin-bottom: 12px;
        }
        p {
          margin-bottom: 10px;
        }
        .film-details {
          font-weight: bold;
        }
        .th {
          padding: 6px !important;
          font-weight: bold;
        }
        .film {
          display: flex
          margin: 30px 0 70px;
        }
        .film > div {
          margin-right: 20px;
        }
        .film img { width: 250px; }
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
