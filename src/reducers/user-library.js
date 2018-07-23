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
import { RECEIVE_USER_LIBRARY, SEARCH_USER_LIBRARY_LIST, FILTER_USER_LIBRARY } from '../actions/user-library.js';

export const userLibrary = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_USER_LIBRARY_LIST:
      let allFilteredOut = true;
      let items = {...state.items};
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
      items: items,
      allFilteredOut
    };
    case RECEIVE_USER_LIBRARY:
      return {
        ...state,
        items: action.items,
        failure: false,
        isFetching: false,
        allFilteredOut: false
      };
    case FILTER_USER_LIBRARY:
      let nItems = {...state.items};
      let allFilteredOut = true;
      for (let key in nItems) {
        if (action.category === 'All') {
          nItems[key].hidden = false;
          allFilteredOut = false;
        } else {
          if (nItems[key].platformInfo && nItems[key].platformInfo.category === action.category) {
            nItems[key].hidden = false
            allFilteredOut = false;
          } else {
            nItems[key].hidden = true;
          }
        }
      }
      return {
        ...state,
        items: nItems,
        allFilteredOut
      };   
    default:
      return state;
  }
}

export const userLibrarySelector = state => state.userLibrary && state.userLibrary.items;

export const userLibraryListSelector = createSelector(
  userLibrarySelector,
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
