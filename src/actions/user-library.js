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

export const RECEIVE_USER_LIBRARY = 'RECEIVE_USER_LIBRARY';
export const FILTER_USER_LIBRARY = 'FILTER_USER_LIBRARY';
export const SEARCH_USER_LIBRARY_LIST = 'SEARCH_USER_LIBRARY_LIST';

export const searchUserLibrary = (searchStr) => dispatch => {
  let _itemChangeDebouncer = {};
  _itemChangeDebouncer = Debouncer.debounce(_itemChangeDebouncer,
    microTask, () => {
      dispatch({
        type: 'SEARCH_USER_LIBRARY_LIST',
        searchStr
      });
  });
}

export const filterUserLibrary = (category) => (dispatch, getState) => {
  dispatch({
    type: 'FILTER_USER_LIBRARY',
    category
  });  
  return;
}

let init = false;
export const fetchUserLibrary = () => (dispatch, getState) => {
  if (init) return;
  init = true;
  const userID = getState().auth.user.uid;
  firebase.database().ref('user-books/' + userID).on('value', snapshot => {
    const items = snapshot.val() === null ? {} : snapshot.val();
    dispatch({
      type: 'RECEIVE_USER_LIBRARY',
      items
    });
  });
}
