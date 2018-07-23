/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { createSelector } from 'reselect';
import { RECEIVE_LIBRARY, SEARCH_LIBRARY_LIST, RECEIVE_CATEGORIES } from '../actions/library.js';

export const library = (state = {}, action) => {
  let allFilteredOut = true;
  let items = {...state.items};
  switch (action.type) {
    case SEARCH_LIBRARY_LIST:
      for (let key in items) {
        if (items[key].volumeInfo.title.toLocaleLowerCase().indexOf(action.searchStr.toLocaleLowerCase()) < 0) {
          items[key].hidden = true;
        } else {
          items[key].hidden = false;
          allFilteredOut = false;
        }
      };
      return {
        ...state,
        items,
        allFilteredOut
      };
    case RECEIVE_LIBRARY:
      return {
        ...state,
        items: action.items,
        failure: false,
        isFetching: false,
        allFilteredOut: false
      };
    case RECEIVE_CATEGORIES:
    return {
      ...state,
      categories: Object.keys(action.categories)
    };  
    default:
      return state;
  }
}

export const librarySelector = state => state.library && state.library.items;

export const libraryListSelector = createSelector(
  librarySelector,
  (items) => {
    if (!items) {
      return;
    }
    const itemList = Object.keys(items).map(key => items[key]);
    itemList.sort((a, b) => {
      return a.userInfo && b.userInfo && (a.userInfo.updated > b.userInfo.updated);
    });
    return itemList;
  }
);
