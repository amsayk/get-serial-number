import React from 'react';
import T from 'prop-types';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { configureStore, history } from 'redux/configureStore';

import { Provider } from 'react-redux';

import IntlProvider from 'IntlProvider';

import { createSelector } from 'utils/reselect';

import formats from 'intl-formats';

import { updateIntl } from 'redux/reducers/intl/actions';

import { LANG, DEBUG } from 'vars';

const APP_MOUNT_NODE = document.querySelector('main');

const store = configureStore();

let render = function() {
  const Root = require('./containers/Root'); // eslint-disable-line global-require

  const locale = LANG;

  // Update messages for locale
  store.dispatch(
    updateIntl({
      locale,
      messages: {},
      formats,
    }),
  );

  const intlSelector = createSelector(
    state => ({
      defaultLocale: state.getIn(['intl', 'defaultLocale']),
      locale: state.getIn(['intl', 'locale']),
      messages: state.getIn(['intl', 'messages']),
      formats: state.getIn(['intl', 'formats']),
    }),
    intl => intl,
  );

  class Application extends React.Component {
    render() {
      const { routerProps } = this.props;
      return (
        <Provider store={store}>
          <IntlProvider intlSelector={intlSelector}>
            <Root {...routerProps} />
          </IntlProvider>
        </Provider>
      );
    }
  }

  ReactDOM.render(
    <AppContainer>
      <Application routerProps={{ history, store }} />
    </AppContainer>,
    APP_MOUNT_NODE,
    () => {},
  );
};

if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = error => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, APP_MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./containers/Root', () => {
      // ReactDOM.unmountComponentAtNode(APP_MOUNT_NODE);
      render();
    });
  }
}

if (__DEV__ || DEBUG) {
  // Show all debug messages.
  localStorage.debug = 'app:*';
}

// ========================================================
// Go!
// ========================================================
render();

// Check mac address in production
if (!__DEV__) {
}
