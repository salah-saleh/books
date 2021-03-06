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

export const changeRentalInfo = (item, type = 'Sale', price = 5, condition = "Good") => (dispatch, getState) => {
  let updates = {};
  const userID = getState().auth.user.uid;
  const info = {
    type,
    price, 
    condition
  }
  const key = '/category-books/All/' + item.id + '/owners/' + userID;
  const newItemKey = firebase.database().ref().child(key).push().key;
  updates[key + '/' + newItemKey] = info;
  updates[key + '/' + newItemKey] = info;

  firebase.database().ref().update(updates);
}

export const saveBookToLibrary = (item, isRemove) => (dispatch) => {
  dispatch(isRemove ? removeBook(item) : addBook(item));
}

const addBook = (item) => (dispatch, getState) => {
  let updates = {};
  const userID = getState().auth.user.uid;
  item.volumeInfo.categories[0] += ' / All';
  item.volumeInfo.categories.forEach(element => {
    element.split(' / ').forEach(subElement => {
      updates['/categories/' + subElement] = true;
      updates['/category-books/' + subElement + '/' + item.id] = item;
    });
  });
  updates['/book-index/' + item.id] = item.volumeInfo.title;
  updates['/user-books/' + userID + '/' + item.id] = item;
  firebase.database().ref().update(updates);
}

const removeBook = (item) => (dispatch, getState) => {
  let updates = {};
  const userID = getState().auth.user.uid;
  item.volumeInfo.categories[0] += ' / All';
  item.volumeInfo.categories.forEach(element => {
    element.split(' / ').forEach(subElement => {
      // don't remove '/categories/' + subElement
      updates['/category-books/' + subElement + '/' + item.id] = null;
    });
  });
  updates['/book-index/' + item.id] = null;
  updates['/user-books/' + userID + '/' + item.id] = null;
  firebase.database().ref().update(updates);   
}