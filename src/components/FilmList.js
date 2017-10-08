import React, { Component } from 'react'
import Film from './Film'

class FilmList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      films: [],
      loading: true
    }
  }

  componentWillMount() {
    // we need to show one instance of each film
    let filmsArr = []
    let filmsIDArr = [] // probaby a better way to do this, but for easy checking
    this.props.films.forEach((film, i) => {
      const id = film.getElementsByTagName("titlecode")[0].childNodes[0].nodeValue
      const performances = Array.prototype.slice.call(film.getElementsByTagName('performance'))

      // add performances to film in state
      if (filmsIDArr.includes(id)) {
        // find film with same id in filmsArr
        const targetFilm = filmsArr.filter((f) => {
          const fId = f.getElementsByTagName('titlecode')[0].childNodes[0].nodeValue
          return id === fId
        })[0]
        // add current film's performances to it
        performances.forEach(perf => {
          targetFilm.getElementsByTagName('performances')[0].appendChild(perf)
        })
        // do not add film to array if one with same title is already added
        return
      }

      filmsIDArr.push(id)
      filmsArr.push(film)
    })

    this.setState({
      films: filmsArr,
      loading: false
    })
  }

  render() {
    if (this.state.loading) return <p>Loading films list...</p>

    return (
      <div className="film-list">
        {
          this.state.films.map((film, i) => <Film data={film} key={i} />)
        }
      </div>
    )
  }
}

export default FilmList
