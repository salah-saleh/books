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

export const DetailStyle = html`
  <style>
    :host {
      display: block;
      padding: 24px 16px;
    }

    section {
      max-width: 748px;
      box-sizing: border-box;
      font-weight: 300;
    }

    .info {
      display: flex;
      padding-bottom: 16px;
      border-bottom: 1px solid #c5c5c5;
    }

    .cover {
      position: relative;
    }

    .cover::after {
      content: '';
      display: block;
      padding-top: 160%;
      width: 100px;
    }

    .cover > book-image {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      margin: 0 auto;
    }

    .info-desc {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-left: 16px;
      font-size: 14px;
    }

    .flex {
      flex: 1;
    }

    .title {
      margin: 0 0 4px;
      font-size: 20px;
      font-weight: 500;
      line-height: 1.2;
    }

    .info-item {
      padding-top: 8px;
    }

    .desc {
      padding: 8px 0;
      font-size: 15px;
      line-height: 1.8;
    }

    .desc > h3 {
      font-size: 15px;
      font-weight: 500;
    }

    .desc > ul {
      margin-bottom: 0;
    }

    book-rating {
      margin-right: 6px;
    }

    .rating-container {
      display: flex;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #c5c5c5;
      font-size: 14px;
    }

    .fav-btn-container,
    .preview-btn-container {
      padding-top: 16px;
    }

    .fav-btn-container {
      height: 32px;
    }

    .fav-button {
      display: flex;
      align-items: center;
      width: 156px;
      margin: 0 8px 0 0;
      padding: 0;
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      font-size: 12px;
      cursor: pointer;
    }

    .fav-button > svg {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }

    [hidden] {
      display: none !important;
    }

    .row {
      @apply --layout-horizontal;
      @apply --layout-end;
    }
    .column {
      @apply --layout-vertical;
    }
    .row > .flex,
    .input-row > * {
      @apply --layout-flex;
    }
    .input-row > *:not(:first-child) {
      margin-left: 8px;
    }      

    /* desktop screen */
    @media (min-width: 648px) {
      :host {
        padding: 48px 24px 24px;
      }

      section {
        margin: 0 auto;
      }

      .info {
        padding-bottom: 24px;
      }

      .cover::after {
        width: 128px;
      }

      .info-desc {
        margin-left: 24px;
      }

      .title {
        margin-bottom: 8px;
        font-size: 24px;
        line-height: 1.3;
      }

      .fav-btn-container,
      .preview-btn-container {
        display: flex;
        justify-content: flex-end;
      }

      .preview-btn-container {
        padding-bottom: 24px;
      }

      .rating-container {
        padding: 24px 0;
      }

      .desc {
        padding: 16px 0;
      }
    }
  </style>
`;