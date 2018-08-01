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

export const ExploreStyle = html`
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

    .books-bg {
      height: 300px;
      max-width: 570px;
      margin: 0 auto;
    }

    .books-desc {
      padding: 24px 16px 0;
      text-align: center;
    }

    [hidden] {
      display: none !important;
    }

    .center-justified.scan {
      margin-top: 20px;
      min-width: 300px;
    }

    /* Wide Layout */
    @media (min-width: 648px) {
      li {
        height: 364px;
      }

      .books-desc {
        padding: 96px 16px 0;
      }

      .center-justified.scan {
        margin-top: 85px;
      }
    }

    /* Wider layout: 2 columns */
    @media (min-width: 872px) {
      .books {
        width: 832px;
        max-width: none;
        padding: 16px 0;
      }
      .center-justified.scan {
        margin-top: 85px;

      }
    }
  </style>
`;