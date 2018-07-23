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

import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import { menuIcon, backIcon, accountIcon } from './book-icons.js';
import './snack-bar.js';
import './book-input-decorator.js';
import './speech-mic.js';
import './book-library.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';

import { AppStyle } from './styles/app-styles.js';
import { store } from '../store.js';
import { navigate, updateLocationURL, updateOffline, updateLayout, showSnackbar, updateDrawerState } from '../actions/app.js';
import { signIn, signOut, initFirebaseApp } from '../actions/auth.js';
import { searchLibrary } from '../actions/library.js';
import { searchUserLibrary } from '../actions/user-library.js';

class BookApp extends connect(store)(LitElement) {
  _render({
    appTitle,
    _page,
    _lazyResourcesLoaded,
    _subTitle,
    _lastVisitedListPage,
    _offline,
    _wideLayout,
    _drawerOpened,
    _snackbarOpened,
    _authInitialized,
    _user,
    _query,
    _bookId
  }) {

  // Anything that's related to rendering should be done in here.

  // True to hide the menu button and show the back button.
  const hideMenuBtn = _page === 'detail' || _page === 'viewer';
  // True to hide the input.
  const hideInput = !_page || _page === 'favorites' || _page === 'about' || _page === '404' || (_page === 'user' && !_user);
  // True to make the search input aligns at the top inside the header instead of inside the main content.
  const inputAtTop = ('ontouchstart' in window || !_wideLayout) || (_page === 'explore' && _query) || _page === 'detail' || _page === 'viewer' || _page === 'library';
  // back button href
  const backHref = _page === 'detail' ?
      (_lastVisitedListPage === 'user' ? '/user' : 
      (_lastVisitedListPage === 'library' ? '/library' : 
      (_lastVisitedListPage === '' ? `/library`: `/explore?q=${_query}`))) : `/detail/${_bookId}`;
  // query
  const query = _page === 'library' ? '' : _query;

  return html`
    ${AppStyle}

    <!-- Header -->
    <app-header condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
        <button class="menu-btn" aria-label="Menu" hidden?="${hideMenuBtn}"
            on-click="${() => store.dispatch(updateDrawerState(true))}">${menuIcon}</button>
        <a class="back-btn" aria-label="Go back" hidden?="${!hideMenuBtn}" href="${backHref}">${backIcon}</a>
        <div main-title><a href="/">${appTitle}</a></div>
        <button class="signin-btn" aria-label="Sign In" visible?="${_authInitialized}"
            on-click="${() =>  store.dispatch(_user && _user.photoURL ? signOut() : signIn())}">
          ${_user && _user.photoURL ? html`<img src="${_user.photoURL}">` : accountIcon}
        </button>
      </app-toolbar>
      <app-toolbar class="toolbar-bottom" sticky>
        <book-input-decorator top?="${inputAtTop}" hidden?="${hideInput}">
          <input slot="input" id="input" aria-label="Search Books" autofocus type="search" value="${query}"
              on-change="${(e) => (_page !=='library' && _page !=='user') ? store.dispatch(updateLocationURL(`/explore?q=${e.target.value}`)) : ''}"
              on-keyup="${(e) => _page ==='library' ? store.dispatch(searchLibrary(this._input.value)) :
                                  (_page ==='user' ? store.dispatch(searchUserLibrary(this._input.value)) : '')}"
              on-search="${(e) => _page ==='library' ? (e.target.value === '' ? store.dispatch(searchLibrary('')) : '') :
                                  (_page ==='user' ? (e.target.value === '' ? store.dispatch(searchUserLibrary('')) : '') : 
                                  store.dispatch(updateLocationURL("/explore?q=")))}">
          <speech-mic slot="button" continuous interimResults on-result="${(e) => this._micResult(e)}"></speech-mic>
        </book-input-decorator>
        <h4 class="subtitle" hidden?="${!hideInput}">${_subTitle}</h4>
      </app-toolbar>
    </app-header>

    <!-- Drawer content -->
    <app-drawer opened="${_drawerOpened}" hidden?="${!_lazyResourcesLoaded}"
        on-opened-changed="${e => store.dispatch(updateDrawerState(e.target.opened))}">
      <nav class="drawer-list" on-click="${e => store.dispatch(updateDrawerState(false))}">
        <a selected?="${_page === 'library'}" href="/library">Library</a>
        <a selected?="${_page === 'explore'}" href="/explore?q=${query}">Add Your Books</a>
        <a selected?="${_page === 'user'}" href="/user">Your Books</a>
        <a selected?="${_page === 'about'}" href="/about">About</a>
      </nav>
    </app-drawer>

    <!-- Main content -->
    <main role="main" class="main-content">
      <book-library class="_page" active?="${_page === 'library'}"></book-library>
      <book-explore class="_page" active?="${_page === 'explore'}"></book-explore>
      <book-detail class="_page" active?="${_page === 'detail'}"></book-detail>
      <book-viewer class="_page" active?="${_page === 'viewer'}"></book-viewer>
      <book-user-library class="_page" active?="${_page === 'user'}"></book-user-library>
      <book-about class="_page" active?="${_page === 'about'}"></book-about>
      <book-404 class="_page" active?="${_page === '404'}"></book-404>
    </main>

    <footer>
      <p></p>
    </footer>

    <snack-bar active?="${_snackbarOpened}">
        You are now ${_offline ? 'offline' : 'online'}.</snack-bar>
    `;
  }

  static get properties() {
    return {
      appTitle: String,
      _page: String,
      _lazyResourcesLoaded: Boolean,
      _subTitle: String,
      _lastVisitedListPage: Boolean,
      _offline: Boolean,
      _wideLayout: Boolean,
      _drawerOpened: Boolean,
      _snackbarOpened: Boolean,
      _authInitialized: Boolean,
      _user: Object,
      _query: String,
      _bookId: String
    }
  }

  _didRender(props, changed) {
    if ('_page' in changed) {
      window.scrollTo(0, 0);
    }
  }

  _firstRendered() {
    installRouter((location) => store.dispatch(navigate(location)));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 648px) and (min-height: 648px)`,
        (matches) => store.dispatch(updateLayout(matches)));
    this.removeAttribute('unresolved');
    this._input = this.shadowRoot.getElementById('input');
    // init irebase and get authenticated user if exist
    store.dispatch(initFirebaseApp());
}

  _stateChanged(state) {
    this._page = state.app.page;
    this._lazyResourcesLoaded = state.app.lazyResourcesLoaded;
    this._subTitle = state.app.subTitle;
    this._lastVisitedListPage = state.app.lastVisitedListPage;
    this._offline = state.app.offline;
    this._wideLayout = state.app.wideLayout;
    this._drawerOpened = state.app.drawerOpened;
    this._snackbarOpened = state.app.snackbarOpened;
    this._authInitialized = state.auth.initialized;
    this._user = state.auth.user;
    this._query = state.books && state.books.query || '';
    this._bookId = state.book && state.book.id;
  }

  _micResult(e) {
    const d = e.detail;
    const value = d.completeTranscript;
    this._input.value = value;
    if (d.isFinal) {
      this._page ==='library' ? 
      store.dispatch(searchLibrary(this._input.value)) :
      store.dispatch(updateLocationURL(`/explore?q=${value}`));
    }
  }
}

window.customElements.define('book-app', BookApp);
