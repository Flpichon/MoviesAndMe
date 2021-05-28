// Navigation/Navigation.js
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import  { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Search from '../Components/Search';
import Favorites from '../Components/Favorites';
import FilmDetail from '../Components/FilmDetail';
import News from '../Components/News';
import Seen from '../Components/Seen';
import Rated from '../Components/Rated';

const SearchStackNavigator = createStackNavigator({

  Search: { 
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {  
    screen: FilmDetail
  }
});

const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
});

const NewsStackNavigator = createStackNavigator({
  News: {
    screen: News,
    navigationOptions: {
      title: 'Les Derniers Films',
    },
  },
  FilmDetail: {
    screen: FilmDetail,
  }
});

const SeenStackNavigator = createStackNavigator({
  Seen: {
    screen: Seen,
    navigationOptions: {
      title: 'Mes Films Vus',
    },
  },
  FilmDetail: {
    screen: FilmDetail,
  }
});
console.log("🚀 ~ file: Navigation.js ~ line 63 ~ Seen", Seen)
const RatedStackNavigator = createStackNavigator({
  Rated: {
    screen: Rated,
    navigationOptions: {
      title: 'Mes Films Notés',
    },
  },
  FilmDetail: {
    screen: FilmDetail,
  }
});

console.log(Rated);

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
        source={require('../Images/search.png')}
        style={styles.icon}/>
      }
    }
  },
  Favorites: {
    screen: FavoritesStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
        source={require('../Images/fav.png')}
        style={styles.icon}/>
      }
    }
  },
  News: {
    screen: NewsStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/new.png')}
          style={styles.icon}/>
      }
    }
  },
  Seen: {
    screen: SeenStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/check.png')}
          style={styles.icon}/>
      }
    }
  },
  Rated: {
    screen: RatedStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/star.png')}
          style={styles.icon}/>
      }
    }
  }
},
{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true 
  }
});

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
});

export default createAppContainer(MoviesTabNavigator);