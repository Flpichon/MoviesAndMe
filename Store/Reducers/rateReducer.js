const initialState = { ratedFilms: [] }

function toggleRated(state = initialState, action) {
  let nextState;
  switch(action.type) {
    case 'TOGGLE_RATED':
      const ratedFilm  = state.ratedFilms.find(value => value.film.id === action.value.film.id);
      if (!!ratedFilm) {
        nextState = {
          ...state,
          ratedFilms: state.ratedFilms.map(value => {
            if (value.film.id === ratedFilm.film.id) {
              value.rate = action.value.rate
            };
            return value;
          })
        };
      }
      else {
        nextState = {
          ...state,
          ratedFilms: [ ...state.ratedFilms, {film: action.value.film, rate: action.value.rate} ]
        };
      };
      return nextState || state;
    default:
      return state;
  }
}

export default toggleRated
