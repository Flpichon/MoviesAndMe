import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi';

class FilmRatedItem extends React.Component {

  constructor(props) {
    super(props);
  }

  _displayText() {
    console.log('rated', this.props);
      return (
        <View>
          <Text style={styles.text}>{this.props.film.title}</Text>
          <Text style={styles.text}>{this.props.note} / 5</Text>
        </View>
      )
  }
  render() {
    console.log('render rated item')
    const { film, displayDetailForFilm } = this.props;
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForFilm(film.id)}
        >
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

export default FilmRatedItem;
