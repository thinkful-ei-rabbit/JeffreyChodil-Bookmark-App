import $ from 'jquery';
import '../index.css';

import store from './store';
import bookmarkList from './bookmark-list';
import api from './api';

const main = function() {  
  api.getBookmarks()
  .then((items) => {
    items.forEach((item) => store.addBookmark(item));
    bookmarkList.render();
  }); 
  
  bookmarkList.bindEventListeners();  
};

$(main);