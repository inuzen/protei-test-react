import {
  GET_DATA,
  SORT_ENTRIES,
  CLEAR_CURRENT_SORT,
  SEARCH_PUBLICATIONS,
  SET_LOADING,
  APPLY_FILTERS,
  SET_SELECT_FILTER
} from '../types';

export default(state, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data_cache: action.payload,
        data: action.payload,
        loading: false
      }

    case SORT_ENTRIES:
      const {sortBy, direction} = action.payload;
      return {
        ...state,
        data: state.data.sort(
            (a, b) =>
            (a[sortBy] >= b[sortBy])
            ? 1
            : (direction === 'asc')
              ? 1
              : -1),
        headers: state.headers.map(header => (
              header.uniqueName === sortBy
              ? {...header, isSorted: true}
              : {...header, isSorted: false}
            )
          ),
        loading: false
      }
    case SET_SELECT_FILTER:

      return {
        ...state,
        headers: state.headers.map( header => {
          if (header.uniqueName === action.payload.uniqueName) {
            header.filter.value = action.payload.value
          }
          return header;
        }),
        loading: false

      }
    case APPLY_FILTERS:
      return {
        ...state,
        data: state.data_cache.filter(row => {

          return state.headers.every(col=> {
              if (col.filter.value === null) return true;
            return row[col.uniqueName] === col.filter.value})
        }),
        loading: false
      }
    case CLEAR_CURRENT_SORT:
      return {
        ...state,
        data: action.payload,
        headers: state.headers.map(header => ({...header, isSorted: false})),
        loading: false
      }

      case SEARCH_PUBLICATIONS:
      return{
        ...state,
        data: state.data.filter(row => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return row.postTitle.match(regex) || row.postBody.match(regex);
        }),
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
