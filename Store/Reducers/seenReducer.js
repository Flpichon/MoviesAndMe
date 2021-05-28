const initialState = { seenFilms: [] }

function toggleSeen(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'TOGGLE_SEEN':
      const seenFilmIndex = state.seenFilms.findIndex(item => item.id === action.value.id)
      if (seenFilmIndex !== -1) {
        //supression
        nextState = {
          ...state,
          seenFilms: state.seenFilms.filter( (item, index) => index !== seenFilmIndex)
        }
      }
      else {
        // ajouter
        nextState = {
          ...state,
          seenFilms: [ ...state.seenFilms, action.value ]
        }
      }
      return nextState || state
    default:
      return state
  }
}

export default toggleSeen
