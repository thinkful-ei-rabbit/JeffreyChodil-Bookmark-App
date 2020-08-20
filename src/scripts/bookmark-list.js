import $ from 'jquery';

import api from './api';
import store from './store';

// { "title": "Google", "url": "http://www.google.com", "desc": "Popular search engine", "rating": 3}


const generateTopMenu = function(){
  // If no bookmark list items are expanded, generate default menu
  const topDefaultMenu = `
  <div id="top-menu"><button type="button" id="toggle-new-bookmark">New <i class="far fa-bookmark"></i></button>
  <label for="filter">FilterBy</label>
  <select name="filter" id="filter">
  <option value="none" selected disabled hidden>Select</option>
  <option value=0>View All</option>
  <option value=1>1 Star</option>
  <option value=2>2+ Star</option>
  <option value=3>3+ Star</option>
  <option value=4>4+ Star</option>
  <option value=5>5 Stars</option>
  </select>
  </div>
  `;
  return topDefaultMenu;
};

const generateBookmarkElement = function (item) {
  return `
  <li class="js-bookmark-element" data-item-id="${item.id}">
  <span id="bookmark-title">${item.title}</span>
  <span id="rating">${item.rating}</span>
  </li>
  `;
};

const generateBookmarkList = function(bookmarkList){
  const items = bookmarkList.map((item) => generateBookmarkElement(item));
  return items.join('');
  // Callback function to populate bookmark list items
  // let bookmarkList =
  // `<ul><li class="js-bookmark-element"><span id="bookmark-title">Bookmark Title 1</span><span id="rating"><i class="far fa-star"></i><i class="far fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span></li></ul>`;
  // return bookmarkList;
};

const render = function() {  
  let items =[...store.items];
  const html = generateTopMenu()
  const listHtml = generateBookmarkList(items);
  console.log(`Rendering ${store.items}`);
  // insert HTML into the DOM    
  $('.container').html(html);
  $('.js-bookmark-list').html(listHtml);
  api.createBookmark();
};


// function toggleBookmarkExpand(id) {
//   const bookmark = this.findById(id);
//   bookmark.expanded = !bookmark.expanded
// }


export default {
  render
};