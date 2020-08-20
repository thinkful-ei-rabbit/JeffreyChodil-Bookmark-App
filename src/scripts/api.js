// https://thinkful-list-api.herokuapp.com/endpoints/bookmarks

'use strict';
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jeffrey/bookmarks';

const apiFetchWrapper = function (...args) {
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

const createBookmark = function() {
  const newBookmark = JSON.stringify({ "title": "Amazon", "url": "http://www.amazon.com", "desc": "For everything you didnt know you need", "rating": "4"});
  return apiFetchWrapper(`${BASE_URL}`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: newBookmark
  });
};

export default {
  getBookmarks,
  createBookmark
}