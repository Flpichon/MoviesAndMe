// Components/FilmSeenItem.js

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { getImageFromApi } from '../API/TMDBApi';

class FilmSeenItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      displayReleaseDate: false
    }
  }

  _displayReleaseDate() {
    this.setState({
      displayReleaseDate: !this.state.displayReleaseDate
    })
  }

  _displayText() {
    if (this.state.displayReleaseDate) {
      return (
        <Text style={styles.text}>Sorti le {moment(new Date(this.props.film.release_date)).format('DD/MM/YYYY')}</Text>
      )
    }
    else {
      return (
        <Text style={styles.text}>{this.props.film.title}</Text>
      )
    }
  }

  render() {
    const { film, displayDetailForFilm } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForFilm(film.id)}
        onLongPress={() => this._displayReleaseDate()}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(film.poster_path)}}
        />
        <View style={styles.content_container}>
          {this._displayText()}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 100,
    flexDirection: 'row'
  },
  image: {
    height: 80,
    width: 80,
    margin: 10,
    borderRadius: 40
  },
  content_container: {
    flex: 1,
    justifyContent: 'center',
    margin: 10
  },
  text: {
    fontSize: 20
  }
})

export default FilmSeenItem
