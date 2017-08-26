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

  // TODO: test if images load
  function testImage(url) {
    // Define the promise
    const imgPromise = new Promise(function(resolve, reject) {
      // Create the image
      const imgElement = new Image()
      // When image is loaded, resolve the promise
      imgElement.addEventListener('load', function imgOnLoad() {
          resolve(this)
      })
      // When there's an error during load, reject the promise
      imgElement.addEventListener('error', function imgOnError() {
          reject()
      })
      // Assign URL
      imgElement.src = url
    })
    return imgPromise
  }

  testImage(`https://omniwebticketing.com/files-theatre-avalon/images/posters/${poster}`)
    .then(
      function fulfilled(img) {
        console.log('That image is found and loaded', img)
        return img
      },
      function rejected() {
        console.log('That image was not found')
        return <img src="//placehold.it/200x300" />
      }
  )


  const consolidatePerformanceDates = () => {
    return performances.map((performance, i) => {
      const url = performance.getElementsByTagName("omniweb_url")[0].childNodes[0].nodeValue
      const date = url.match(/\d{4}([.\-/ ])\d{2}\1\d{2}/)[0]

      if ( datesArray.includes(date) ) return

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
        <img src={`https://omniwebticketing.com/files-theatre-avalon/images/posters/${poster}`} alt={title} />
      </div>
      <div>
        <h2>{title}</h2>
        <strong>{`${genre} | ${rating} | ${runtime}`}</strong>
        <p>{ synopsis }</p>
        <table>
          <thead>
            <tr>
              <th>
                Date
              </th>
              <th>
                Buy Tickets
              </th>
            </tr>
          </thead>
          <tbody>
            { consolidatePerformanceDates() }
          </tbody>
        </table>
      </div>

      <style jsx>{`
        h2,
        p,
        strong,
        table {
          color: #D8D3D3;
        }

        .film {
          display: flex
          margin: 30px 0 70px;
        }
        .film > div {
          margin-right: 20px;
        }
        @media screen and (max-width: 47.938em) {
          .film {flex-direction: column}
          .film > div {margin-right: 0;}
        }
      `}</style>
    </div>
  )
}

export default Film
