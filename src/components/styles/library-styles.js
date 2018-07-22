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

export const LibraryStyle = html`
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

.lib-button {
  width: 32px;
  height: 32px;
  padding: 2px;
  margin: 0;
  border: 2px solid;
  background: transparent;
  -webkit-appearance: none;
  cursor: pointer;
}

.lib-button > svg {
  width: 24px;
  height: 24px;
}

.libary-empty {
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
`;