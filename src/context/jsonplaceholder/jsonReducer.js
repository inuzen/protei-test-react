import {
  GET_DATA,
  SORT_ENTRIES,
  CLEAR_CURRENT_SORT,
  SEARCH_PUBLICATIONS,
  SET_LOADING,
  ERROR
} from '../types';

export default(state, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false
      }
      
    case SORT_ENTRIES:

      const {sortBy, direction} = action.payload;

      return {
        ...state,
        data: state.data.sort(
            (a, b) => (a[sortBy] >= b[sortBy])
            ? 1
            : (direction === 'asc')
              ? 1
              : -1),
        headers: state
          .headers
          .map(header => (
              header.uniqueName === sortBy
              ? {...header, isSorted: true}
              : {...header, isSorted: false}
            )
          ),
        loading: false
      }
    case CLEAR_CURRENT_SORT:
      return {
        ...state,
        data: action.payload,
        headers: state.headers.map(header => ({...header, isSorted: false})),
        loading: false
      }

    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;

  }
}
