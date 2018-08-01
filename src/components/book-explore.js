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

import './book-image.js';
import './book-explore-item.js';
import './book-offline.js';
import './book-code.js';

import { BookButtonStyle } from './shared-styles.js';
import { ExploreStyle } from './styles/explore-styles.js';

// This element is connected to the redux store.
import { store } from '../store.js';

import { searchBooks } from '../actions/books.js';
import { refreshPage } from '../actions/app.js';
import { books, itemListSelector } from '../reducers/books.js';

// We are lazy loading its reducer.
store.addReducers({
  books
});

class BookExplore extends connect(store)(PageViewElement) {
  _render({ _query, _items, _showOffline, _page }) {
    updateMetadata({
      title: `${_query ? `${_query} - ` : ''}Books`,
      description: 'Search for books'
    });
    
    return html`
      ${BookButtonStyle}
      ${ExploreStyle}

      <section hidden?="${_showOffline}">
        <ul class="books" hidden?="${!_query}">
          ${repeat(_items, (item) => html`
            <li>
              <book-explore-item item="${item}"></book-explore-item>
            </li>
          `)}
        </ul>

        <book-image id="img" class="books-bg" alt="Books Home" center src="images/books-bg.jpg" hidden?="${_query}" placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAAI0lEQVR4AWPw2v7Wfe1Dj7X3/Pd8YPDf+Uqva79x38GQvW8Bu0sOexptskUAAAAASUVORK5CYII="></book-image>
        <div class="center-justified scan" id="scan">
          <div class="preview-btn-container" hidden?="${_query}">
            <a on-click="${() => this._toggleImg()}" class="book-button" >Scan Barcode</a>
          </div>
        </div>
        <div class="center-justified">
          <book-code class="books-bg"  on-hideBookCode="${() => this._hideCodeReader()}" id="bar" hidden></book-code>
        </div>
      </section>

      <book-offline hidden?="${!_showOffline}" on-refresh="${() => store.dispatch(refreshPage())}"></book-offline>
    `;
  }

  static get properties() { return {
    _query: String,
    _items: Array,
    _showOffline: Boolean,
    _page: String
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._query = state.books.query;
    this._items = itemListSelector(state);
    this._showOffline = state.app.offline && state.books.failure;
    this._page = state.app.page;
    // if page changed before a scan is complete -> clean up
    if(this.shadowRoot && this._page && this.shadowRoot.getElementById('bar') && !this.shadowRoot.getElementById('bar').hidden && this._page.indexOf('explore') < 0) {
      this._hideCodeReader();
       Quagga.stop();
    }
  }

  _hideCodeReader()  {
    let bar = this.shadowRoot.getElementById('bar');
    let scan = this.shadowRoot.getElementById('scan');
    if(bar) {
      let el = bar.shadowRoot.querySelector('.drawingBuffer');
      let br = bar.shadowRoot.querySelector('br');
      if (el) {
        el.remove();
        br.remove();
      }
      scan.hidden = false;
      bar.hidden = true;
    }
  }

  _toggleImg()  {
    let img = this.shadowRoot.getElementById('img');
    let bar = this.shadowRoot.getElementById('bar');
    let scan = this.shadowRoot.getElementById('scan');
    img.hidden = true;
    bar.hidden = false;
    scan.hidden = true;
    bar.scan();
  }
}

window.customElements.define('book-explore', BookExplore);

export { searchBooks, refreshPage };
