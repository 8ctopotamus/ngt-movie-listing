import React from 'react'

const FilmList = (props) => {
  console.log(props.films)
  console.log(props.days)

  return (
    <div>
      <h1>Films</h1>
      {
        props.films.map(film => <p>hey</p>)
      }
    </div>
  )
}

export default FilmList
