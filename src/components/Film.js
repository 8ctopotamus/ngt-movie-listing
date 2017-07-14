import React from 'react'

const Film = (props) => {
  const id = props.data.getElementsByTagName("titlecode")[0].childNodes[0].nodeValue
  const title = props.data.getElementsByTagName("titlename")[0].childNodes[0].nodeValue
  const rating = props.data.getElementsByTagName("rating")[0].childNodes[0].nodeValue
  const genre = props.data.getElementsByTagName("genre")[0].childNodes[0].nodeValue
  const runtime = props.data.getElementsByTagName("runtime")[0].childNodes[0].nodeValue
  const synopsis = props.data.getElementsByTagName("synopsis")[0].childNodes[0].nodeValue
  let poster = props.data.getElementsByTagName("poster")[0].childNodes[0].nodeValue
  poster = poster.replace(' ', '%20')
  poster = poster.replace('.jpg', '.png')
  const thumb = props.data.getElementsByTagName("thumbnail")[0].childNodes[0].nodeValue

  return (
    <div className="film">
      <div>
        <img src="//placehold.it/200x300" />
        {/* <img src={`https://omniwebticketing.com/files-theatre-avalon/images/posters/${poster}`} alt={title} /> */}
      </div>
      <div>
        {id}
        <h2>{title}</h2>
        <strong>{`${genre} | ${rating} | ${runtime}`}</strong>
        <p>{ synopsis }</p>
        <a href="#" className="button">BUY TICKETS</a>
      </div>

      <style jsx>{`
        .film { display: flex }
        .film > div {margin-right: 20px;}
      `}</style>
    </div>
  )
}

export default Film
