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
import { repeat } from 'lit-html/lib/repeat.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import { BookButtonStyle } from './shared-styles.js';
import { closeIcon } from './book-icons.js';
import './book-item.js';
import './book-offline.js';

// This element is connected to the redux store.
import { store } from '../store.js';

import { refreshPage } from '../actions/app.js';
import { saveFavorite, fetchCategories, fetchFavorites } from '../actions/favorites.js';
import { favorites, favoriteListSelector } from '../reducers/favorites.js';

// We are lazy loading its reducer.
store.addReducers({
  favorites
});

class BookLibrary extends connect(store)(PageViewElement) {
  _render({ _items, _categories, _user, _showOffline }) {
    updateMetadata({
      title: 'Library - Books',
      description: 'Rent & Buy Books'
    });

    return html`
      ${BookButtonStyle}
      <style>
        :host {
          display: block;
        }

        .books {
          max-width: 432px;
          margin: 0 auto;
          padding: 8px;
          box-sizing: border-box;
          /* remove margin between inline-block nodes */
          font-size: 0;
        }

        book-select > select {
          font-size: 16px;
          padding: 16px 24px 16px 70px;
        }

        label {
          font-size: 13px;
        }

        .pickers {
          width: 90%;
          max-width: 407px;
          @apply --layout-vertical;
        }

        li {
          display: inline-block;
          position: relative;
          width: calc(100% - 16px);
          max-width: 400px;
          min-height: 240px;
          margin: 8px;
          font-size: 14px;
          vertical-align: top;
          background: #fff;
          border-radius: 2px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                      0 1px 5px 0 rgba(0, 0, 0, 0.12),
                      0 3px 1px -2px rgba(0, 0, 0, 0.2);
          list-style: none;
        }

        li::after {
          content: '';
          display: block;
          padding-top: 65%;
        }

        h3 {
          text-align: center;
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 0;
        }

        .signin-section {
          text-align: center;
        }

        .fav-button {
          width: 32px;
          height: 32px;
          padding: 2px;
          margin: 0;
          border: 2px solid;
          background: transparent;
          -webkit-appearance: none;
          cursor: pointer;
        }

        .fav-button > svg {
          width: 24px;
          height: 24px;
        }

        .favorites-empty {
          text-align: center;
        }

        [hidden] {
          display: none !important;
        }

        /* Wide Layout */
        @media (min-width: 648px) {
          li {
            height: 364px;
          }
        }

        /* Wider layout: 2 columns */
        @media (min-width: 872px) {
          .books {
            width: 832px;
            max-width: none;
            padding: 16px 0;
          }
        }
      </style>

      <section hidden?="${_showOffline}">
        <div class="favorites-section">
          <div class="pickers books">
            <book-select>
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
          <div class="favorites-empty" hidden?="${!_items || _items.length}">
            <h3>No Books Available.</h3>
          </div>
          <ul class="books">
            ${_items && repeat(_items, (item) => html`
              <li hidden?="${item.hidden}">
                <book-item item="${item}">
                  <button class="fav-button" hidden?="${!_user || !item.owners || !(_user.uid in item.owners)}" title="Remove book" on-click="${(e) => this._removeFavorite(e, item)}">${closeIcon}</button>
                </book-item>
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
    _showOffline: Boolean
  }}

  _firstRendered() {
    store.dispatch(fetchCategories());
    store.dispatch(fetchFavorites());
  }

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._items = favoriteListSelector(state);
    this._categories = state.favorites.categories;
    this._user = state.auth.user;
    this._showOffline = state.app.offline && state.favorites.failure;
  }

  _selectCategory() {
    const newCat = this.shadowRoot.getElementById('selectCategory').value;
    store.dispatch(fetchFavorites(newCat));
  }

  _removeFavorite(e, item) {
    e.preventDefault();
    store.dispatch(saveFavorite(item, true));
  }
}

window.customElements.define('book-library', BookLibrary);
