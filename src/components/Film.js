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
  poster = poster.replace(' ', '%20').replace('.jpg', '.png')
  const thumb = props.data.getElementsByTagName("thumbnail")[0].childNodes[0].nodeValue
  const performances = Array.prototype.slice.call(props.data.getElementsByTagName('performance'))
  let datesArray = []

  const consolidatePerformanceDates = () => {
    return performances.map((performance, i) => {
      const url = performance.getElementsByTagName("omniweb_url")[0].childNodes[0].nodeValue
      const date = url.match(/\d{4}([.\-/ ])\d{2}\1\d{2}/)[0]

      if (datesArray.includes(date)) return

      // find showtime
      const showtimes = Array.prototype.slice.call(props.data.getElementsByTagName('showtime'))
      let showtimesArr = []

      showtimes.forEach((showtime) => {
        if (showtimesArr.includes(showtime.childNodes[0].nodeValue)) return
        showtimesArr.push(showtime.childNodes[0].nodeValue)
      })

      datesArray.push(date)
      return <Performance data={performance} showtimes={showtimesArr} key={i} />
    })
  }

  return (
    <div className="film">
      <div>
        <img src="//placehold.it/200x300" />
        {/* <img src={`https://omniwebticketing.com/files-theatre-avalon/images/posters/${poster}`} alt={title} /> */}
      </div>
      <div>
        <h2>{title}</h2>
        <strong>{`${genre} | ${rating} | ${runtime}`}</strong>
        <p>{ synopsis }</p>
        <table>
          <thead>
            <tr>
              <td>
                date
              </td>
              <td>
                Buy Tickets
              </td>
            </tr>
          </thead>
          <tbody>
            { consolidatePerformanceDates() }
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .film { display: flex }
        .film > div {margin-right: 20px;}
      `}</style>
    </div>
  )
}

export default Film
