// Components/Search.js

import React from 'react';
import { StyleSheet, View, TextInput, Button, ActivityIndicator, SafeAreaView } from 'react-native';
import FilmList from './FilmList';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import { connect } from 'react-redux';

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.state = {
      films: [],
      isLoading: false
    },
    this._loadFilms = this._loadFilms.bind(this)
  }

  _loadFilms() {
    console.log(this);
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          const filmFiltered = [ ...this.state.films, ...data.results ].filter( (value ,index , array) => array.findIndex(val => (val.id === value.id)) === index );
          // attention c'est async
          this.setState({
            films: filmFiltered,
            isLoading: false
          })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text 
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {
        this._loadFilms()
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail", {idFilm});
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <View style={styles.main_container}>
          <TextInput
            style={styles.textinput}
            placeholder='Titre du film'
            onChangeText={(text) => this._searchTextInputChanged(text)}
            onSubmitEditing={() => this._searchFilms()}
          />
          <Button title='Rechercher' onPress={() => this._searchFilms()}/>
          <FilmList
            films={this.state.films}
            navigation={this.props.navigation} 
            loadFilms={this._loadFilms} 
            page={this.page}
            totalPages={this.totalPages}
            favoriteList={false} 
          />
          {this._displayLoading()}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },

  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Search);