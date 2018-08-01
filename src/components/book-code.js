/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
// https://github.com/leMaik/barcode-scanner/blob/master/barcode-scanner.html
// https://github.com/sin-tanaka/vue-quagga/blob/master/src/Scanner.vue
// https://github.com/serratus/quagga-react-example/blob/master/src/components/Scanner.js
// target: this.shadowRoot.querySelector('#barcode-scanner')  

import { html, LitElement } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { navigate, updateLocationURL, updateOffline, updateLayout, showSnackbar, updateDrawerState } from '../actions/app.js';

class BookCode extends connect(store)(LitElement) {
  _render({}) {
    return html`
      <style>
        #interactive canvas {
          position: relative;
          top: -307px;
        }
      </style>
      <div id="interactive" class="viewport">
          <video id="video" autoplay="true" preload="auto"></video>
      </div>
    `;
  }

  static get properties() { return {
      _counts: Object,
      _last_result: Array,
      scan: Function
  }}

  _stateChanged(state) {
  }

  _didRender() {
  }

  scan() {
    if(!Quagga.initialized) {
      Quagga.onDetected(e => this._onDetected(e));
      Quagga.onProcessed(this._onProcessed);
    }
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        constraints: {
          width: 570,
          height: 300,
          facingMode: "environment",
          },
        target: this.shadowRoot.querySelector('#interactive'),
      },
      locator: {
        patchSize: 'medium',
        halfSample: true
      },
      numOfWorkers: navigator.hardwareConcurrency,
      frequency: 30,
      decoder: {
        readers: [{
          format: 'ean_reader',
          config: {}
        }]
      },
      locate: true
    }, function(err) {
      if (err) { console.log(err); return; }
      Quagga.initialized = true;
      Quagga.start();
    });
  }
  
  _order_by_occurrence() {
    this._last_result.forEach((value) => {
        if(!this._counts[value]) {
            this._counts[value] = 0;
        }
        this._counts[value]++;
    });
  
    return Object.keys(this._counts).sort((curKey,nextKey) => {
        return this._counts[curKey] < this._counts[nextKey];
    });
  }
  
  _onDetected(e) {
    if(!this._counts) this._counts = {};
    if(!this._last_result) this._last_result = [];
    const last_code = e.codeResult.code;
    this._last_result.push(last_code);

    if (this._last_result.length > 20) {
      const code = this._order_by_occurrence()[0];
      let el = this.shadowRoot.querySelector('.drawingBuffer');
      let br = this.shadowRoot.querySelector('br');
      if (el) {
        el.remove();
        br.remove();
      }
      this._last_result = [];
      this._counts = {};
      Quagga.stop();
      store.dispatch(updateLocationURL(`/explore?q=${code}`));
      this.dispatchEvent(new CustomEvent('hideBookCode', {
        bubbles: true, composed: true
      }));
    }
  }

  _onProcessed(result) {
    let drawingCtx = Quagga.canvas.ctx.overlay,
      drawingCanvas = Quagga.canvas.dom.overlay;
    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
        result.boxes.filter(function (box) {
          return box !== result.box;
        }).forEach(function (box) {
          Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
        });
      }
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
      }
      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
      }
    }
  }
}

window.customElements.define('book-code', BookCode);
