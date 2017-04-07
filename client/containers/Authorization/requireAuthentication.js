import _ from 'lodash';
import React from 'react';
import { compose, withPropsOnChange, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

const SIGN_IN_PATH = '/sign-in';

const isAuthorization = (authorization, roles) => {
  if (!authorization.token) {
    return false;
  }
  if (authorization.user &&
      (_.includes(roles, '*') || _.includes(authorization.user.roles, 'admin'))) {
    return true;
  }
  if (!(authorization.user && roles.find(role =>
        _.includes(authorization.user.roles, role)))) {
    return false;
  }
  return true;
};

/**
 * Provide authorization for routers
 *
 * @param {object} React Component
 * @param {Array} allowed roles
 * @param {Sting || Object} path to redirect or React Component
 *
 * @example
 *  import auth from '..../requireAuthentication';
 *  <Route path="sign-in" component={auth(SignInd, ['*'])} />
 *  <Route path="invite" component={auth(Invite, ['owner'], '/sign-in')} />
 *
 **/

export default (Component, roles, pathOrComponent) => {
  const AuthenticatedComponent =
    ({ authorization }) => isAuthorization(authorization, roles) && <div>{<Component />}</div> ||
      (!_.isString(pathOrComponent) && <div>{<pathOrComponent />}</div> || null);
  const enhance = compose(
    connect(state => ({
      authorization: state.authorization,
    })),
    withState('isLoaded', 'setIsLoaded', false),
    lifecycle({
      componentDidMount() {
        this.props.setIsLoaded(() => true);
        if (!isAuthorization(this.props.authorization, roles) && !_.isObject(pathOrComponent)) {
          browserHistory.push(pathOrComponent || SIGN_IN_PATH);
        }
      },
    }),
    withPropsOnChange(
      ['authorization', 'isAllow'],
      (props) => {
        if (props.isLoaded &&
             (!isAuthorization(props.authorization, roles) && !_.isObject(pathOrComponent))) {
          browserHistory.push(pathOrComponent || SIGN_IN_PATH);
        }
        return props;
      },
    ),
  );
  return enhance(AuthenticatedComponent);
};
