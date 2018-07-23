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
import { updateMetadata } from 'pwa-helpers/metadata.js';

class BookAbout extends PageViewElement {
  _render() {
    updateMetadata({
      title: 'About - Books',
      description: 'About page'
    });

    return html`
      <style>
        :host {
          padding: 16px;
          text-align: center;
          line-height: 1.5;
        }
      </style>

      <p>Rent and Sell Books</p>
    `;
  }
}

window.customElements.define('book-about', BookAbout);
