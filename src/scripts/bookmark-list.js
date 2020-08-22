import $ from 'jquery';

import api from './api';
import store from './store';

const generateStars = function(item) {
  let starRating = `<div class="stars">`;
  for (let i = 0; i < item.rating; i++) {
    starRating += `<i class='fas fa-star'></i>`;
  }
  starRating += `</span></div>`;
  return starRating;
}

const generateStarRatingRadio = function() {
  let starRatingRadio = `
  <input type="radio" id="star1" name="rate" value=1 required>
  <label for="star1">1</label>`;
  for (let i = 2; i < 6; i++) {
    starRatingRadio += `
    <input type="radio" id="star${i}" name="rate" value=${i} required>
    <label for="star${i}">${i}</label>`;
  }
  return starRatingRadio
};

const generateTopMenu = function() {
  if (store.newBookmarkToggle === true) {
    const topDefaultMenu = `
        <form id="js-new-bookmark-form">
        <div class="error-container"></div>
        <label for="new-bookmark-entry">Add New Bookmark:</label>
        <br>
        <input type="text" name="title" class="js-new-bookmark-name" placeholder="Bookmark Name" required>
        <br>
        <input type="url" name="url" class="js-new-bookmark-url"
          placeholder="http://newBookmarkAddress.com" required>
        <br>        
        <div class="rate">
        <label for="rating" name="rating" id="new-bookmark-rating">Rating; </label>
        ${generateStarRatingRadio()}
        </div>        
        <label for="description"></label>
        <textarea id="new-bookmark-description" name="desc" rows="4" cols="50" placeholder="Add a description (optional)"></textarea>
        <br>
        <button type="submit" class="submit-new">Create</button>
        <button type="reset" value="cancel" id="return-default">Cancel</button>
      </form>
      `;
    return topDefaultMenu;
  } else
    // If no bookmark list items are expanded, generate default menu
    if (store.newBookmarkToggle === false) {
  console.log("Ia3. [bookmark-list.js] DEBUG from generateTopMenu()");
      const topDefaultMenu = `
      <div class="error-container"></div>
      <div class="top-menu"><button type="button" id="toggle-new-bookmark">New <i class="far fa-bookmark"></i></button>
    <label for="filter"></label>
    <select name="filter" id="filter">
    <option value="none" selected disabled hidden>Filter</option>
    <option value=5>View All</option>  
    <option value=2>2+ Star</option>
    <option value=3>3+ Star</option>
    <option value=4>4+ Star</option>
    <option value=5>5 Stars</option>
    </select>
    </div>
    `;
      return topDefaultMenu;
    }
};

const generateBookmarkElement = function(item) {
  if (item.rating >= store.filter) {
    if (item.expand === true) {
      return `
      <li class="js-bookmark-element" data-item-id=${item.id} id="expanded">
      <span id="bookmark-title">${item.title}</span>
      <span id="rating">${generateStars(item)}</span>
      <div class="expanded-buttons">
      <a href = "${item.url}" target="_blank"><button type="button">Visit Site</button></a>
      <button type="button" id="erase-bookmark">Erase <i class="fas fa-eraser"></i></button></div>
      <p class="description">${item.desc}</p>
      </li>      
      `
    }
    return `
  <li class="js-bookmark-element" data-item-id="${item.id}">
  <span class="bookmark-title">${item.title}</span>
  <span id="rating">${generateStars(item)}</span>
  </li>
  `;
  }
};

const generateBookmarkList = function(bookmarkList) {
  const items = bookmarkList.map((item) => generateBookmarkElement(item));
  return items.join('');
};

const generateError = function(message) {
  return `
  <section class="error-message">
  <button id="close-error">Close</button>
  <p>${message}</p>
  </section>`;
};

const renderError = function() {
  if (store.error) {
    const errorHtml = generateError(store.error);
    $('.error-container').html(errorHtml);
  } else {
    $('.error-container').empty();
  }  
};

const handleCloseError = function() {
  $('.error-container').on('click', '#close-error', () => {
    store.setError(null);
    renderError();
  });
  render();
};

const render = function() {
  console.log("Ia2. [bookmark-list.js] DEBUG from render()");
  renderError();
  let items = [...store.items];
  const html = generateTopMenu();
  const listHtml = generateBookmarkList(items);
  console.log("Ia4. [bookmark-list.js] DEBUG from render() display top menu");
  $('.container').html(html);
  console.log("Ia5. [bookmark-list.js] COMPLETE render top menu");
  if (store.newBookmarkToggle === false) {
    $('.js-bookmark-list').html(listHtml);
  }  
};

const getItemIdFromElement = (item) => {
  return $(item)
    .closest('.js-bookmark-element')
    .data('#data-item-id');
}

const handleNewBookmarkSubmit = function() {
  $('#js-new-bookmark-form').submit(event => {
    console.log("handleNewBookmarkSubmit!");
    event.preventDefault();    
    const newBookmark = $('#js-new-bookmark-form').serialize();
    api.createBookmark(newBookmark)
      .then((newEntry) => {
        store.addBookmark(newEntry);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

const handleToggleCreateNew = function() {
  console.log("handleToggleCreateNew is listening");
  console.log("Ib3. [bookmark-list.js] DEBUG event listener from handleToggleCreateNew()");
  $('#toggle-new-bookmark, #return-default').click(() => {
    event.preventDefault();
    console.log("Ib3a. [bookmark-list.js] DEBUG Click heard from .#toggle-new-bookmark");
    store.newBookmarkToggle = !store.newBookmarkToggle;
    console.log("Ic1. [bookmark-list.js] Toggle new bookmark form");
    console.log(store.newBookmarkToggle);
    render();
  })
  $('.return-default, #toggle-new-bookmark').on('click', event => {
    event.preventDefault();
    console.log("handleToggleCreateNew!");    
    store.newBookmarkToggle = !store.newBookmarkToggle;    
    render();
  });
};

const handleToggleExpandView = function() {
  $('li').on('click', event => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    let item = store.findById(id);
    item.expand = !item.expand;
    render();
  });
};

const handleDropdownSelect = function() {
  console.log("handleDropdownSelect is listening!");
  $('#filter').on('change', event => {
    event.preventDefault();
    $(this).closest('form').submit();
    filter = $('#filter :selected').val();
    console.log("Filtered!");
    console.log(filter);
    render();
  });
};

const handleDeleteItemClicked = function() {
  $('.js-bookmark-list').click('#erase-bookmark', event => {
    const id = getItemIdFromElement(event.currentTarget);
    api.deleteItem(id)
    .then(() => {
      store.findAndDelete(id);
      render();
    })
    .catch((error) => {
      store.setError(error.message);
      renderError();
    });
  });
};

const bindEventListeners = function() {
  console.log("Ib2. [bookmark-list.js] DEBUG event listener from bindEventListeners()");
  handleToggleCreateNew();
  handleDropdownSelect();  
  handleNewBookmarkSubmit();
  handleCloseError();
  handleDeleteItemClicked();
  handleToggleExpandView();
};


export default {
  render,
  bindEventListeners
};