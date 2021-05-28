import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import FilmRatedItem from './RatedFilmItem';

class Rated extends React.Component {

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.ratedFilms}
        keyExtractor={(item) => item.film.id.toString()}
        renderItem={({item}) => (
          <FilmRatedItem
            film={item.film}
            note={item.rate}
            displayDetailForFilm={this._displayDetailForFilm}
          />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    ratedFilms: state.toggleRated.ratedFilms
  }
}

export default connect(mapStateToProps)(Rated)
