import $ from 'jquery';
import '../index.css';

import store from './store';
import bookmarkList from './bookmark-list';
import api from './api';

const main = function() {
  console.log("Ia1. [index.js] DEBUG from main()");
  api.getBookmarks()
  .then((items) => {
    items.forEach((item) => store.addBookmark(item));
    bookmarkList.render();
  }); 
  console.log("Ib1. [index.js] DEBUG event listener from main()");
  bookmarkList.bindEventListeners();  
};

$(main);