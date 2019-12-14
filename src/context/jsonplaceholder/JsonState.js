import React, {useReducer} from 'react';
import JsonContext from './jsonContext';
import JsonReducer from './jsonReducer';
import {
  GET_DATA,
  SORT_ENTRIES,
  SEARCH_PUBLICATIONS,
  SET_LOADING,
  ERROR
} from '../types';

const JsonState = (props) => {
  const initialState = {
    data: null,
    headers: [{
      title: 'Username',
      uniqueName: 'name',
      isSorted: null
    },{
      title: 'City',
      uniqueName: 'city',
      isSorted: null
    },{
      title: 'Publication title',
      uniqueName: 'postTitle',
      isSorted: null
    },{
      title: 'Number of comments',
      uniqueName: 'postComments',
      isSorted: null
    }],
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
          postComments: comments,
          postId: id
        }]
      }, []);

      dispatch({type: GET_DATA, payload: data});
    } catch (e) {
      console.error(e.response.statusText);
      dispatch({type: ERROR, payload: e.response.statusText})
    }

  };

  //filter data
  const filterDataByColumn = sortParams =>{
    setLoading();
    //sortBy must be a key in data object
    dispatch({type: SORT_ENTRIES, payload: sortParams});
  }

  //Set Loading
  const setLoading = () => {
    dispatch({type: SET_LOADING});
  }

  return (<JsonContext.Provider value={{
      data: state.data,
      loading: state.loading,
      headers: state.headers,
      getData, filterDataByColumn
    }}>

    {props.children}
  </JsonContext.Provider>)

}

export default JsonState
