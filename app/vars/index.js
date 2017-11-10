import keyOf from 'fbjs/lib/keyOf';

export const VERSION = require('../package.json').version;

export const DEBUG = process.env.DEBUG_PROD;

// Use this constant to initialize reducers
export const INIT = keyOf({ INIT: null });

export const APP_NAME = require('../package.json').productName;

export const LANG = 'fr';

