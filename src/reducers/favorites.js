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
import { RECEIVE_FAVORITES, SEARCH_BOOK_LIST } from '../actions/favorites.js';

export const favorites = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_BOOK_LIST:
      let items = {...state.items};
      for (let key in items) {
        items[key].volumeInfo.title.toLocaleLowerCase().indexOf(action.searchStr.toLocaleLowerCase()) < 0 ? 
          items[key].hidden = true : items[key].hidden = false;
      };
      return {
        ...state,
        items: items
      };
    case RECEIVE_FAVORITES:
      return {
        ...state,
        items: action.items,
        failure: false,
        isFetching: false
      };
    default:
      return state;
  }
}

export const favoritesSelector = state => state.favorites && state.favorites.items;

export const favoriteListSelector = createSelector(
  favoritesSelector,
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
