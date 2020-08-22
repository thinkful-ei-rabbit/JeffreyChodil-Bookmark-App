// https://thinkful-list-api.herokuapp.com/endpoints/bookmarks

'use strict';
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jeffrey/bookmarks';

const apiFetchWrapper = function(...args) {
  let error;
  return fetch(...args)
    // filters for json responses
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
        if (!res.headers.get('Content-Type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }      
      return data;      
    });
};

const getBookmarks = function() {
  return apiFetchWrapper(BASE_URL);
}

const createBookmark = function(data) {
  const newBookmark = JSON.stringify({data}); 
  //   {"title": "facebook", 
  //   "url": "http://www.facebook.com", 
  //   "desc": "The lives of the not-so-rich and not-so-famous", 
  //   "rating": "3"}
  return apiFetchWrapper(`${BASE_URL}`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: newBookmark
  });
};

const deleteItem = function(id) {
  return apiFetchWrapper(`${BASE_URL}/${id}`, {
    METHOD: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  });
}

export default {
  getBookmarks,
  createBookmark,
  deleteItem
}