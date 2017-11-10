// @flow

import React from 'react';
import T from 'prop-types';

import { connect } from 'react-redux';
import compose from 'redux/lib/compose';
import bindActionCreators from 'redux/lib/bindActionCreators';

import { withStyles } from 'material-ui/styles';

import { injectIntl } from 'react-intl';

import Loading from 'components/Loading';

import style from 'routes/Landing/styles';

import cx from 'classnames';

import { calcSerialNumber } from 'redux/reducers/app/actions';

import selector from './selector';

const styles = theme => ({});

class PageBody extends React.Component {
  componentDidMount() {
    if (!this.props.serialnumber) {
      this.props.actions.calcSerialNumber();
    }
  }
  render() {
    const { intl, serialnumber, classes, business } = this.props;

    return (
      <div className={cx(style.pageBody, style.pageBodyContainer)}>
        {serialnumber ? (
          <div className={style.serialnumber}>{serialnumber}</div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return selector(state, props);
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ calcSerialNumber }, dispatch) };
}

const Connect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withStyles(styles), Connect)(PageBody);
