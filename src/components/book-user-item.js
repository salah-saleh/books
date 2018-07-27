/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';

import './book-image.js';
import './book-rating.js';
import {ItemStyle} from './styles/item-styles.js';

class BookUserItem extends LitElement {
  _render({ item }) {
    const info = item && item.volumeInfo;
    const id = item ? item.id : '';
    const title = info ? info.title : '';
    const author = info ? info.authors && info.authors.join(', ') : '';
    const thumbnail = info ? info.imageLinks.thumbnail.replace('http', 'https').replace('&edge=curl', '') : null;
    const date = info ? new Date(info.publishedDate).getFullYear() : '';
    const rating = info && info.averageRating;
    const desc = info ? unsafeHTML(info.description || info.subtitle || '<i>No descriptions.</i>') : '';

    return html`
      ${ItemStyle}

      <a href="/user-detail/${id}">
        <div class="info">
          <book-image src="${thumbnail}" alt="${title}"></book-image>
          <div class="info-section">
            <div class="title-container">
              <h2 class="title">${title}</h2><slot></slot>
            </div>
            <div class="author info-item" hidden?="${!author}">${author} - ${date}</div>
            <div class="info-item" hidden?="${!info}">
              <book-rating rating="${rating}"></book-rating>
            </div>
          </div>
        </div>
        <div class="desc">${desc}</div>
      </a>

      <div class="placeholder" fadeout?="${info}">
        <div class="placeholder-info">
          <div class="placeholder-info-inner-1"></div>
          <div class="placeholder-info-inner-2"></div>
        </div>
        <div class="placeholder-desc"></div>
      </div>
    `;
  }

  static get properties() { return {
    item: Object
  }}
}

window.customElements.define('book-user-item', BookUserItem);
