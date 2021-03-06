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
import './book-library-item.js';
import './book-offline.js';

// This element is connected to the redux store.
import { store } from '../store.js';

import { refreshPage } from '../actions/app.js';
import { saveBookToLibrary } from '../actions/detail.js';
import { fetchCategories, fetchLibrary } from '../actions/library.js';
import { library, libraryListSelector } from '../reducers/library.js';

// We are lazy loading its reducer.
store.addReducers({
  library
});

class BookLibrary extends connect(store)(PageViewElement) {
  _render({ _items, _categories, _user, _showOffline, _allFiltered }) {
    updateMetadata({
      title: 'Library - Books',
      description: 'Rent & Buy Books'
    });

    return html`
      ${BookButtonStyle}
      ${LibraryStyle}

      <section hidden?="${_showOffline}">
        <div class="library-section">
          <div class="pickers books">
            <book-select hidden?="${!_items}">
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
          <div class="library-empty" hidden?="${_items && !_allFiltered}">
            <h3>No Books Available.</h3>
          </div>
          <ul class="books">
            ${_items && repeat(_items, (item) => html`
              <li hidden?="${item.hidden}">
                <book-library-item item="${item}">
                  <button class="lib-button" hidden?="${!_user || !item.owners || !(_user.uid in item.owners)}" title="Remove book" on-click="${(e) => this._removeBook(e, item)}">${closeIcon}</button>
                </book-library-item>
              </li>
            `)}
          </ul>
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
    store.dispatch(fetchCategories());
    store.dispatch(fetchLibrary());
  }

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._items = libraryListSelector(state);
    this._categories = state.library.categories;
    this._user = state.auth.user;
    this._showOffline = state.app.offline && state.library.failure;
    this._allFiltered = state.library.allFilteredOut;
  }

  _selectCategory() {
    const newCat = this.shadowRoot.getElementById('selectCategory').value;
    store.dispatch(fetchLibrary(newCat));
  }

  _removeBook(e, item) {
    e.preventDefault();
    store.dispatch(saveBookToLibrary(item, true));
  }
}

window.customElements.define('book-library', BookLibrary);
