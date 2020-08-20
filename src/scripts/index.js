import $ from 'jquery';
import '../index.css';

import bookmarkList from './bookmark-list';
import api from './api';
import store from './store';

const main = function() {  
  api.getBookmarks()
  .then((items) => {
    items.forEach((item) => store.addBookmark(item));
    bookmarkList.render();
  });
};

$(main);