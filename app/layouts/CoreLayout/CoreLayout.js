import React from 'react';
import T from 'prop-types';

import { connect } from 'react-redux';

import { compose } from 'redux';

import { createSelector } from 'utils/reselect';

import * as selectors from 'redux/reducers/app/selectors';

import messages from './messages';

import { intlShape, injectIntl } from 'react-intl';

import Title from 'components/Title';

import { APP_NAME } from 'vars';

import style from 'styles/core.scss';

import cx from 'classnames';

import Loading from 'components/Loading';

class CoreLayout extends React.Component {
  static propTypes = {
    children: T.element.isRequired,
    intl: intlShape.isRequired,
  };

  render() {
    const { intl, children } = this.props;

    return [
      /* <Notification />, */

      <div className={style.root}>
        <Title
          title={intl.formatMessage(messages.title, { appName: APP_NAME })}
        />
        {children}
      </div>,
    ];
  }
}

export default compose(injectIntl)(CoreLayout);
