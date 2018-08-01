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
import '@polymer/iron-flex-layout/iron-flex-layout-classes';

export const BookButtonStyle = html`
<style>
  .center-justified {
    @apply --layout-horizontal;
    @apply(--layout-center-justified);
    margin: 0 10px 32px 10px;
    padding: 0;
    list-style: none;
  }

  .book-button {
    display: inline-block;
    min-width: 157px;
    margin-right: 8px;
    padding: 8px 44px;
    border: 2px solid var(--app-dark-text-color);
    box-sizing: border-box;
    background-color: transparent;
    color: var(--app-dark-text-color);
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
  }

  .book-button:active {
    background-color: var(--app-dark-text-color);
    color: #FFF;
  }

  book-select {
    display: inline-block;
    position: relative;
    /* create a layer to avoid invalidation from other controls*/
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  book-select > book-md-decorator {
    display: block;
    border-top: 1px solid #ccc;
    height: 1px;
    speak: none;
  }
  book-select > book-md-decorator::after {
    content: '\\25BC';
    display: block;
    position: absolute;
    bottom: calc(50% - 0.75em);
    right: 8px;
    speak: none;
    -webkit-transform: scaleY(.6);
    transform: scaleY(.6);
    color: var(--app-secondary-color);
    pointer-events: none;
  }
  book-select > select {
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 8px 24px 8px 0px;
    border: none;
    background-color: transparent;
    border-radius: 0;
    font-size: 16px;
    font-weight: 300;
    color: var(--app-primary-color);
    overflow: hidden;
    margin: 0;
    outline: none;
  }
  book-select > select::-ms-expand {
    display: none;
  }
  book-select > book-md-decorator > book-underline {
    display: block;
    background-color: var(--app-accent-color);
    height: 2px;
    position: relative;
    top: -1px;
    width: 100%;
    margin: auto;
    -webkit-transform: scale3d(0, 1, 1);
    transform: scale3d(0, 1, 1);
    transition: -webkit-transform 0.2s ease-in;
    transition: transform 0.2s ease-in;
  }
  book-select > select:focus + book-md-decorator > book-underline {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    transition: -webkit-transform 0.2s ease-out;
    transition: transform 0.2s ease-out;
  }
  book-select > select:focus + book-md-decorator::before,
  book-select > select:focus + book-md-decorator::after,
  book-select > select:focus {
    color: var(--app-dark-text-color);
  }
  /* hide the focus ring in firefox */
  book-select > select:focus:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
  book-select > [prefix] {
    position: absolute;
    left: 0px;
    top: calc(50% - 8px);
    line-height: 16px;
    color: var(--app-secondary-color);
    pointer-events: none;
  }

  book-input {
    display: inline-block;
    <!-- margin: 20px 0; -->
  }
  book-input > input::-webkit-input-placeholder {
    color: transparent;
  }
  book-input > input::-moz-placeholder {
    color: transparent;
  }
  book-input > input:-ms-input-placeholder {
    color: transparent;
  }
  book-input > input::-ms-input-placeholder {
    color: transparent;
  }
  book-input > input {
    font-size: 1em;
    font-weight: 300;
    color: var(--app-primary-color);
    border: none;
    padding: 8px 0;
    width: 100%;
    outline: none;
  }
  book-input > input:invalid {
    /* reset the default style in FF */
    box-shadow: none;
  }
  book-input > book-md-decorator {
    display: block;
    height: 1px;
    width: 100%;
    margin: auto;
    border-top: 1px solid #ccc;
    position: relative;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  book-input book-underline {
    display: block;
    height: 2px;
    width: 100%;
    margin: auto;
    background-color: var(--app-accent-color);
    position: absolute;
    top: -1px;
    left: 0;
    -webkit-transform: scale3d(0, 1, 1);
    transform: scale3d(0, 1, 1);
    transition: -webkit-transform 0.2s ease-in;
    transition: transform 0.2s ease-in;
  }
  /* input label */
  book-input > book-md-decorator > label {
    display: block;
    pointer-events: none;
    opacity: 0.5;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    transition-property: opacity, -webkit-transform;
    transition-property: opacity, transform;
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    will-change: transform;
    -webkit-transform: translate3d(0px, -1.9em, 0px);
    transform: translate3d(0px, -1.9em, 0px);
  }
  /* Error message */
  book-input > book-md-decorator::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    font-size: 0.65em;
    color: #dd2c00;
    content: attr(error-message);
    display: none;
    white-space: nowrap;
  }
  book-input > input:focus + book-md-decorator > book-underline {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    transition: -webkit-transform 0.2s ease-out;
    transition: transform 0.2s ease-out;
  }
  /* Label: valid state */
  book-input > input:focus + book-md-decorator > label {
    -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    opacity: 1;
  }
  book-input > input:optional:not(:placeholder-shown) + book-md-decorator > label {
    -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    opacity: 1;
  }
  _:-ms-lang(x), book-input > input + book-md-decorator > label {
    -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    opacity: 1;
  }
  book-input > input:optional:-moz-ui-valid + book-md-decorator > label {
    -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    opacity: 1;
  }
  /* Underline */
  book-input > input:not(:focus):not(:placeholder-shown):invalid + book-md-decorator > book-underline {
    background-color: #dd2c00;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    transition: -webkit-transform 0.2s ease-out;
    transition: transform 0.2s ease-out;
  }
  book-input > input:not(:focus):-moz-ui-invalid:invalid + book-md-decorator > book-underline {
    background-color: #dd2c00;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    transition: -webkit-transform 0.2s ease-out;
    transition: transform 0.2s ease-out;
  }
  book-input > input[aria-invalid='true']:not(:valid) + book-md-decorator > book-underline {
    background-color: #dd2c00;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    transition: -webkit-transform 0.2s ease-out;
    transition: transform 0.2s ease-out;
  }
  /* Error message */
  book-input > input:not(:focus):not(:placeholder-shown):invalid + book-md-decorator::after {
    display: block;
  }
  book-input > input:not(:focus):-moz-ui-invalid:invalid + book-md-decorator::after {
    display: block;
  }
  book-input > input[aria-invalid='true']:not(:valid) + book-md-decorator::after {
    display: block;
  }
  /* Error label */
  book-input > input:not(:focus):not(:placeholder-shown):invalid + book-md-decorator > label {
    -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    opacity: 1;
    color: #dd2c00;
  }
  book-input > input:not(:focus):-moz-ui-invalid:invalid + book-md-decorator > label {
    -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    opacity: 1;
    color: #dd2c00;
  }
  book-input > input[aria-invalid='true']:not(:valid) + book-md-decorator > label {
    -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    opacity: 1;
    color: #dd2c00;
  }
  /* Valid label */
  book-input > input:not(:focus):required:valid + book-md-decorator > label {
    -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
    opacity: 1;
  }

  book-input, book-select {
    font-size: 16px;
  }
  
</style>
`;