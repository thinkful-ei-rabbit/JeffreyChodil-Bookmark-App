'use strict';

let items = [];
let newBookmarkToggle = false;
const error = null;
let filter = 0;

const findById = function(id) {
  return this.items.find(currentItem => currentItem.id === id);
};

const addBookmark = function(item) {
  item['expand']=true;
  // item['edit']=false;
  items.push(item);
  console.log(items);
};

// const toggleCheckedExpand = function() {
//   console.log(expandView);
//   this.expandView = !this.expandView;
//   console.log("Expand setting toggled!");
//   console.log(expandView);
// }

const findAndDelete = function(id) {
  this.items = this.items.filter(currentItem => currentItem.id !== id);
};

const setError = function(error) {
  this.error = error;
};

export default {
  items,
  error,
  filter,
  newBookmarkToggle,
  findById,
  addBookmark,  
  findAndDelete,
  setError
}