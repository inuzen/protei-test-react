import React, {useReducer} from 'react';
import JsonContext from './jsonContext';
import JsonReducer from './jsonReducer';
import {
  GET_DATA,
  SORT_ENTRIES,
  SEARCH_PUBLICATIONS,
  SET_LOADING,
  APPLY_FILTERS,
  SET_SELECT_FILTER
} from '../types';

const JsonState = (props) => {
  const initialState = {
    headers: [{
      title: 'Username',
      uniqueName: 'name',
      isSorted: null,
      filter: {
        type: 'select',
        value: null
      }
    },{
      title: 'City',
      uniqueName: 'city',
      isSorted: null,
      filter: {
        type: 'select',
        value: null
      }
    },{
      title: 'Publication title',
      uniqueName: 'postTitle',
      isSorted: null,
      filter: {
        type: 'search',
        value: null
      }
    },{
      title: 'Comments',
      uniqueName: 'commentAmount',
      isSorted: null,
      filter: {
        type: 'none',
        value: null
      }
    }],
    data_cache: null,
    data: null,
    loading: false,
  }
  const [state, dispatch] = useReducer(JsonReducer, initialState);

  //Load data from api
  const getData = async () => {
    setLoading();
    try {

      const resUsers = await fetch("/users");
      const users = await resUsers.json();

      //map to object to use userid as key instead of array id
      const userObj = users.reduce((acc, user) => {
        return {...acc, [user.id]: user}
      },{});

      const resPosts = await fetch(`/posts`);
      const posts = await resPosts.json();

      const resComments = await fetch(`/comments`);
      const comments = await resComments.json();


      const postsWithComments = posts.map(post=>{
        return {
          ...post,
          comments: comments.filter(c => c.postId === post.id)
        }
      });

      const data = postsWithComments.reduce((acc, currPost) => {
        const {userId, title, body, comments, id} = currPost;
        return [...acc, {
          name: userObj[userId].name,
          city: userObj[userId].address.city,
          postTitle: title,
          postBody: body,
          commentAmount: comments.length,
          postComments: comments,
          postId: id
        }]
      }, []);

      dispatch({type: GET_DATA, payload: data});
    } catch (e) {
      console.error(e.response.statusText);
    }

  };

  //filter data
  const sortDataByColumn = sortParams =>{
    setLoading();
    //sortBy must be a key in data object
    dispatch({type: SORT_ENTRIES, payload: sortParams});
  }

  const setSelectFilters = filterParams => {

    dispatch({type: SET_SELECT_FILTER, payload: filterParams})
    filterData();
  }
  //filter column by
  const filterData = () => {
    setLoading();
    dispatch({type: APPLY_FILTERS})
  }

  const searchTextFilter = (text) => {
    setLoading();
    filterData()
    dispatch({type: SEARCH_PUBLICATIONS, payload: text})
  }
  //Set Loading
  const setLoading = () => {
    dispatch({type: SET_LOADING});
  }

  return (<JsonContext.Provider value={{
      data: state.data,
      loading: state.loading,
      headers: state.headers,
      //data_cache: state.data_cache,
      getData, sortDataByColumn, filterData, searchTextFilter, setSelectFilters
    }}>

    {props.children}
  </JsonContext.Provider>)

}

export default JsonState
