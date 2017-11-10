/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, Menu, screen, BrowserWindow } from 'electron';

import path from 'path';

import { APP_NAME } from './vars';

require('electron-context-menu')({
  labels: {
    copy: 'Copier la selection',
  },
  prepend: (params, browserWindow) => [],
});

import debug from './utils/log';

const log = debug('app:main');

let win = null;

if (process.env.NODE_ENV === 'production' || process.env.DEBUG_PROD === 'true') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const {
    default: installExtension,
    REACT_PERF,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
  } = require('electron-devtools-installer');

  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  try {
    const name = await installExtension(
      [REACT_DEVELOPER_TOOLS, REACT_PERF, REDUX_DEVTOOLS],
      forceDownload,
    );

    log(`${name} installed.`);
  } catch (e) {
    log.error(e);
  }
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const isSecondInstance = app.makeSingleInstance(
  (commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  },
);

if (isSecondInstance) {
  app.quit();
}

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const screenSize = screen.getPrimaryDisplay().workAreaSize;

  const bounds = {
    width: Math.min(800, screenSize.width),
    height: Math.min(200, screenSize.height),
  };

  win = new BrowserWindow({
    show: false,
    ...bounds,
    resizable: false,
    title: APP_NAME,
  });

  const url = require('url').format({
    protocol: 'file',
    slashes: true,
    pathname: path.resolve(__dirname, 'app.html'),
    hash: '/',
  });

  win.loadURL(url);

  win.once('ready-to-show', () => {
    if (!win) {
      throw new Error(`'win' is not defined`);
    }
    win.show();
    win.focus();
  });

  win.on('closed', () => {
    win = null;
  });

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    win.openDevTools({ mode: 'undocked' });
  }
});
