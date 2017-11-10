import React from 'react';
import T from 'prop-types';

import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import style from 'routes/Landing/styles';

import selector from './selector';

import { injectIntl } from 'react-intl';

import Page from './Page';

export class HomeContainer extends React.Component {
  render() {
    return (
      <div className={style.root}>
        <Page />
      </div>
    );
  }
}

HomeContainer.propTypes = {};

function mapStateToProps(state, props) {
  return selector(state, props);
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({}, dispatch) };
}

const Connect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, Connect)(HomeContainer);
