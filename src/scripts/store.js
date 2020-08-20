'use strict';

const items = [];


const addBookmark = function (item) {
  this.items.push(item);
  console.log(items);
};

export default {
  items,
  addBookmark
}