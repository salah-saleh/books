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
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import { BookButtonStyle } from './shared-styles.js';
import { DetailStyle } from './styles/detail-styles.js';
import './book-rating.js';
import './book-offline.js';
import './book-image.js';

// This element is connected to the redux store.
import { store } from '../store.js';

import { refreshPage } from '../actions/app.js';
import { fetchBook } from '../actions/book.js';
import { changeRentalInfo, saveBookToLibrary } from '../actions/detail.js';
import { book, bookSelector } from '../reducers/book.js';
import { library } from '../reducers/library.js';

// We are lazy loading its reducer.
store.addReducers({
  book,
  library
});

class BookExploreDetail extends connect(store)(PageViewElement) {
  _render({_item, _library, _lastVisitedListPage, _showOffline, _isSignedIn, _rentalType, 
    _rentalPrice}) {
    // Don't render if there is no item.
    if (!_item) {
      return;
    }

    const info = _item.volumeInfo;
    const accessInfo = _item.accessInfo;
    const title = info.title;
    const author = info.authors && info.authors.join(', ');
    const date = (new Date(info.publishedDate)).getFullYear();
    const pageCount = info.pageCount;
    const rating = info.averageRating;
    const ratingsCount = info.ratingsCount;
    const publisher = info.publisher;
    const thumbnail = info.imageLinks.thumbnail.replace('http', 'https').replace('&edge=curl', '');
    const poster = thumbnail.replace('&zoom=1', '');
    const categories = info.categories || [];
    const identifiers = info.industryIdentifiers || [];
    const isFavorite = _library && !!_library[_item.id];

    updateMetadata({
      title: `${title} - Books`,
      description: info.description,
      image: thumbnail
    });

    return html`
      ${BookButtonStyle}
      ${DetailStyle}

      <section hidden?="${_showOffline}">
        <div class="info">
          <div class="cover" hero>
            <book-image src="${thumbnail}" alt="${title}"></book-image>
          </div>
          <div class="info-desc">
            <h2 class="title">${title}</h2>
            <div class="info-item" hidden?="${!author}">${author} - ${date}</div>
            <div class="info-item" hidden?="${!pageCount}" desktop>${pageCount} pages</div>
            <div class="info-item" hidden?="${!publisher}" desktop>${publisher} - publisher</div>
            <div class="flex"></div>
            <div class="preview-btn-container">
              <a class="book-button" style="width:169px" hidden?="${!accessInfo.embeddable}">For Rent</a>
            </div>
            <div class="preview-btn-container">
              <a href="/viewer/${_item.id}" class="book-button" style="width:169px" hidden?="${!accessInfo.embeddable}">PREVIEW</a>
            </div>
          </div>
        </div>
        <div class="rating-container">
          <book-rating rating="${rating}"></book-rating>
          <span>(${ratingsCount || 0} ${ratingsCount == 1 ? 'review' : 'reviews'})</span>
        </div>
        <div class="desc">
          <h3>Description</h3>
          ${unsafeHTML(info.description || info.subtitle || 'None')}
        </div>
        <div class="desc" hidden?="${categories.length === 0}">
          <h3>Categories</h3>
          <ul>
            ${repeat(categories, (item) => html`
              <li>${item}</li>
            `)}
          </ul>
        </div>
        <div class="desc" hidden?="${identifiers.length === 0}">
          <h3>ISBN</h3>
          <ul>
            ${repeat(identifiers, (item) => html`
              <li>${item.type}: ${item.identifier}</li>
            `)}
          </ul>
        </div>
        <div class="desc">
          <h3>Additional Info</h3>
          <ul>
            <li>Country: ${accessInfo.country}</li>
            <li>Viewability: ${accessInfo.viewability}</li>
          </ul>
        </div>
      </section>

      <book-offline hidden?="${!_showOffline}" on-refresh="${() => store.dispatch(refreshPage())}"></book-offline>
    `;
  }

  static get properties() { return {
    _item: Object,
    _library: Object,
    _lastVisitedListPage: Boolean,
    _showOffline: Boolean,
    _isSignedIn: Boolean,
    _rentalType: String,
    _rentalPrice: String
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._item = bookSelector(state);
    this._library = state.library && state.library.items;
    this._lastVisitedListPage = state.app.lastVisitedListPage;
    this._showOffline = state.app.offline && state.book.failure;
    this._isSignedIn = !!state.auth.user;
    this._rentalType = this._item && this._item.rentalType;
    this._rentalPrice = this._item && this._item.rentalPrice;
  }
}

window.customElements.define('book-explore-detail', BookExploreDetail);

export { fetchBook };
