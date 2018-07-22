[![Built with pwa–starter–kit](https://img.shields.io/badge/built_with-pwa–starter–kit_-blue.svg)](https://github.com/Polymer/pwa-starter-kit "Built with pwa–starter–kit")

# Books PWA

Rent and Sell Books
## Setup
```bash
$ npm i
$ npm start # or similar that serve index.html for all routes
```

## Build and deploy
```bash
$ npm run build:prpl-server
```
Download the [Google App Engine SDK](https://cloud.google.com/appengine/downloads) and follow the instructions to install and create a new project. This app uses the Python SDK.
```bash
$ gcloud app deploy server/app.yaml --project <project>
```
