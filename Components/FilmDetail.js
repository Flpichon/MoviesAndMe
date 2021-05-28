// Components/FilmDetail.js

import React from 'react';
import { Share, StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, Platform, TouchableOpacity, ListView, FlatList } from 'react-native';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import EnlargeShrink from '../Animations/EnlargeShrink';

class FilmDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    if (params.film != undefined && Platform.OS === 'ios') {
      return {
          headerRight: <TouchableOpacity
                          style={styles.share_touchable_headerrightbutton}
                          onPress={() => params.shareFilm()}>
                          <Image
                            style={styles.share_image}
                            source={require('../Images/ios.png')} />
                        </TouchableOpacity>
      }
    }
}
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
    this._toggleFavorite = this._toggleFavorite.bind(this)
    this._toggleRated = this._toggleRated.bind(this)
    this._shareFilm = this._shareFilm.bind(this)
  }

  
  _shareFilm() {
    const { film } = this.state;
    Share.share({ title: film.title, message: film.overview });
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film
    })
  }

  _displayFloatingActionButton() {
    const { film } = this.state
    if (film != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../Images/android.png')} />
        </TouchableOpacity>
      )
    }
  };

  componentDidMount() {
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    if (favoriteFilmIndex !== -1) { 
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      }, () => { this._updateNavigationParams() })
      return
    }

    this.setState({ isLoading: true })
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      }, () => { this._updateNavigationParams() })
    })
  }

  _displayRatedButtons() {
    let views = [];
    let note = 0;
    const filmRated = this.props.ratedFilms.find(value => value.film.id === this.state.film.id);
    if (!!filmRated) {
      note = filmRated.rate;
    }
    let source; let style;
    for (let i = 0; i < 5; i++) {
      if (!!filmRated && i < note) {
        source = require('../Images/star.png');
        style = styles.star;
      } else {
        source = require('../Images/void-star.png');
        style = styles.starvoid;
      }
      views.push(<View
        key={i}
      >
        <TouchableOpacity
          onPress={() => this._toggleRated(i + 1)}>
          <Image
            style={style}
            source={source}
          />
        </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={[{flexDirection: "row"}, {alignSelf: 'center'}]}>
        {views}
      </View>
    );
  }

  _displaySeenButton() {
    if (this.props.seenFilms.findIndex(item => item.id === this.state.film.id) !== -1) {
      return (
        <Button
          title='Non vu'
          onPress={() => this._toggleSeen()}/>
      )
    }
    return (
      <Button
        title='Marquer comme vu'
        onPress={() => this._toggleSeen()}/>
    )
  }

  _displayFavoriteImage() {
    let sourceImage = require('../Images/non-fav.png')
    let shouldEnlarge = false;
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      sourceImage = require('../Images/fav.png')
      shouldEnlarge = true
    }
    return (
      <EnlargeShrink
        shouldEnlarge={shouldEnlarge}>
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      </EnlargeShrink>
    )
  };

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  };

  _toggleRated(index) {
    const action = { type: "TOGGLE_RATED", value: {film: this.state.film, rate: index}};
    this.props.dispatch(action);
    console.log("🚀 ~ file: FilmDetail.js ~ line 165 ~ FilmDetail ~ _toggleRated ~ action", action)
    console.log('over', this);
  };

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
    this.props.dispatch(action);
  };

  _toggleSeen() {
    const action = { type: "TOGGLE_SEEN", value: this.state.film }
    this.props.dispatch(action)
  };

  _displayFilm() {
    const { film } = this.state
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          {this._displayRatedButtons()}
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>
          {this._displaySeenButton()}
        </ScrollView>
      )
    }
  };

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFloatingActionButton()}
      </View>
    );
  };
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },
  favorite_image:{
    flex: 1,
    width: null,
    height: null
  },
  favorite_container: {
    alignItems: 'center',
  },
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  },
  star: {
    width: 49,
    height: 49,
    margin: 6
  },
  starvoid: {
    width: 49,
    height: 44,
    margin: 6
  },
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
    seenFilms: state.toggleSeen.seenFilms,
    ratedFilms: state.toggleRated.ratedFilms
  };
};

export default connect(mapStateToProps)(FilmDetail);