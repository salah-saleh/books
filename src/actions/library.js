/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import firebase from '@firebase/app';
import '@firebase/database';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { microTask } from '@polymer/polymer/lib/utils/async.js';

export const RECEIVE_LIBRARY = 'RECEIVE_LIBRARY';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SEARCH_LIBRARY_LIST = 'SEARCH_LIBRARY_LIST';

export const searchLibrary = (searchStr) => dispatch => {
  let _itemChangeDebouncer = {};
  _itemChangeDebouncer = Debouncer.debounce(_itemChangeDebouncer,
    microTask, () => {
      dispatch({
        type: 'SEARCH_LIBRARY_LIST',
        searchStr
      });
  });
}

export const fetchCategories = () => dispatch => {
  firebase.database().ref('categories').on('value', snapshot => {
    const categories = snapshot.val() === null ? {} : snapshot.val();
    dispatch({
      type: 'RECEIVE_CATEGORIES',
      categories
    });
  });
}

export const fetchLibrary = (category = 'All') => dispatch => {
  firebase.database().ref('category-books/' + category).on('value', snapshot => {
    const items = snapshot.val() === null ? {} : snapshot.val();
    dispatch({
      type: 'RECEIVE_LIBRARY',
      items
    });
  });
}
