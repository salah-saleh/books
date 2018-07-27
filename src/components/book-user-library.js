/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { repeat } from 'lit-html/lib/repeat';
import { connect } from 'pwa-helpers/connect-mixin';
import { updateMetadata } from 'pwa-helpers/metadata';

import { BookButtonStyle } from './shared-styles.js';
import { LibraryStyle } from './styles/library-styles.js';

import { closeIcon } from './book-icons.js';
import './book-user-item.js';
import './book-offline.js';

// This element is connected to the redux store.
import { store } from '../store.js';

import { refreshPage } from '../actions/app.js';
import { saveBookToLibrary } from '../actions/detail.js';
import { fetchUserLibrary, filterUserLibrary } from '../actions/user-library.js';
import { signIn } from '../actions/auth.js';
import { userLibrary, userLibraryListSelector } from '../reducers/user-library.js';

// We are lazy loading its reducer.
store.addReducers({
  userLibrary
});

class BookUserLibrary extends connect(store)(PageViewElement) {
  _render({ _items, _categories, _user, _showOffline, _allFiltered }) {
    updateMetadata({
      title: 'User Library - Books',
      description: 'Rent & Buy Books'
    });

    return html`
      ${BookButtonStyle}
      ${LibraryStyle}

      <section hidden?="${_showOffline}">
        <div class="library-section">
          <div class="pickers books">
            <book-select hidden?="${!_user ||!_items}">
              <label id="categoryLabel" prefix="">Category</label>
              <select id="selectCategory" name="category"
                    aria-label="Category"  on-change="${() => this._selectCategory()}">
                ${_categories && repeat(_categories, (category) => html`
                  <option value="${category}">${category}</option>
                `)}    
              </select>
              <book-md-decorator aria-hidden="true">
                <book-underline></book-underline>
              </book-md-decorator>
            </book-select>
          </div>
          <div class="library-empty" hidden?="${!_user || (_user && _items && !_allFiltered)}">
            <h3>No Books Available.</h3>
          </div>
          <ul class="books">
            ${_items && repeat(_items, (item) => html`
              <li hidden?="${item.hidden}">
                <book-user-item item="${item}">
                  <button class="lib-button" hidden?="${!_user || !item.owners || !(_user.uid in item.owners)}" title="Remove book" on-click="${(e) => this._removeBook(e, item)}">${closeIcon}</button>
                </book-user-item>
              </li>
            `)}
          </ul>
        </div>
        <div class="signin-section" hidden?="${_user}">
          <p>Please sign in to see your books.</p>
          <button class="book-button" on-click="${() => store.dispatch(signIn())}">Sign in</button>
        </div>
      </section>

      <book-offline hidden?="${!_showOffline}" on-refresh="${() => store.dispatch(refreshPage())}"></book-offline>
    `;
  }

  static get properties() { return {
    _items: Array,
    _categories: Array,
    _user: Object,
    _showOffline: Boolean,
    _allFiltered: Boolean
  }}

  _firstRendered() {
    this._categories = [ "All", "For Sale", "For Rent", "Sold", "Rented", "Bought", "Borrowed"];
  }

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._items = userLibraryListSelector(state);
    // fetchUserLibrary only once the user is signed in
    if (!this._user && state.auth.user) store.dispatch(fetchUserLibrary());
    this._user = state.auth.user;
    if (!this._user) this._items = [];
    this._showOffline = state.app.offline && state.userLibrary.failure;
    this._allFiltered = state.userLibrary.allFilteredOut;
  }

  _selectCategory() {
    const newCat = this.shadowRoot.getElementById('selectCategory').value;
    store.dispatch(filterUserLibrary(newCat));
  }

  _removeBook(e, item) {
    e.preventDefault();
    store.dispatch(saveBookToLibrary(item, true));
  }
}

window.customElements.define('book-user-library', BookUserLibrary);
