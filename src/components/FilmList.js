import React from 'react'
import Film from './Film'

const FilmList = (props) => {
  // console.log(props.films)
  // console.log(props.days)

  // get perfomances for each film
  props.days.forEach(day => console.log(day))

  // show one instance of each film
  // add performances to each film
  const filmsArr = []
  const filteredFilms = props.films.filter((film, i) => {
    const id = film.getElementsByTagName("titlecode")[0].childNodes[0].nodeValue
    if (filmsArr.includes(id)) return
    filmsArr.push(id)
    return film
  })

  return (
    <div className="film-list">
      {
        filteredFilms.map((film, i) => <Film data={film} key={i} />)
      }
    </div>
  )
}

export default FilmList
