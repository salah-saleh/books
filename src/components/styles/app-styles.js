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

export const AppStyle = html`
  <style>
    :host {
      display: block;

      --app-drawer-width: 256px;
      --app-header-height: 128px;
      --app-footer-height: 104px;
      /* The 1px is to make the scrollbar appears all the time */
      --app-main-content-min-height: calc(100vh - var(--app-header-height) - var(--app-footer-height) + 1px);

      /* Default theme */
      --app-primary-color: #202020;
      --app-secondary-color: #757575;
      --app-accent-color: #172C50;
      --paper-button-ink-color: var(--app-accent-color);
      --paper-icon-button-ink-color: var(--app-accent-color);
      --paper-spinner-color: var(--app-accent-color);
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      color: var(--app-primary-color);

      --app-dark-text-color: var(--app-primary-color);
      --app-background-color: #fafafa;

      --app-drawer-background-color: var(--app-background-color);
      --app-drawer-text-color: var(--app-dark-text-color);
      --app-drawer-selected-color: var(--app-dark-text-color);
    }

    app-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      background-color: var(--app-background-color);
      z-index: 1;
    }

    .toolbar-top {
      padding: 0 8px 0 8px;
    }

    .toolbar-bottom {
      justify-content: center;
      background-color: var(--app-background-color);
    }

    [main-title] > a {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.1em;
      text-decoration: none;
      text-transform: uppercase;
      color: inherit;
      pointer-events: auto;
      /* required for IE 11, so this <a> can receive pointer events */
      display: inline-block;
    }

    .subtitle {
      font-size: 18px;
      font-weight: normal;
    }

    book-input-decorator {
      max-width: 460px;
      transform: translate3d(0, 374px, 0);
    }

    book-input-decorator[top] {
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
      transform: translate3d(0, 0, 0);
    }

    .menu-btn,
    .back-btn,
    .signin-btn {
      display: inline-block;
      width: 40px;
      height: 40px;
      padding: 8px;
      box-sizing: border-box;
      background: none;
      border: none;
      fill: var(--app-header-text-color);
      cursor: pointer;
      text-decoration: none;
    }

    .signin-btn {
      padding: 2px;
      visibility: hidden;
    }

    .signin-btn[visible] {
      visibility: visible;
    }

    .signin-btn > img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    app-drawer {
      z-index: 2;
    }

    .drawer-list {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 24px;
      background: var(--app-drawer-background-color);
      position: relative;
    }

    .drawer-list > a {
      display: block;
      text-decoration: none;
      color: var(--app-drawer-text-color);
      line-height: 40px;
      padding: 0 24px;
    }

    .drawer-list > a[selected] {
      color: var(--app-drawer-selected-color);
      font-weight: bold;
    }

    main {
      display: block;
    }

    .main-content {
      padding-top: var(--app-header-height);
      min-height: var(--app-main-content-min-height);
    }

    ._page {
      display: none;
    }

    ._page[active] {
      display: block;
    }

    book-viewer {
      height: var(--app-main-content-min-height);
    }

    footer {
      height: var(--app-footer-height);
      padding: 24px;
      box-sizing: border-box;
      text-align: center;
    }

    [hidden] {
      display: none !important;
    }
  </style>
`;