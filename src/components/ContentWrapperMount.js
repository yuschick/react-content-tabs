import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ContentWrapper from './ContentWrapper';

const propTypes = {
  mountTo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  activeTab: PropTypes.string,
};

const defaultProps = {
  mountTo: null,
  activeTab: '',
};

const ContentWrapperMount = ({ mountTo, activeTab, children }) => {
  const ContentWrapperComponent = (
    <ContentWrapper activeTab={activeTab}>{children}</ContentWrapper>
  );

  return mountTo
    ? ReactDOM.createPortal(
        ContentWrapperComponent,
        typeof mountTo === 'string' ? document.getElementById(mountTo) : mountTo
      )
    : ContentWrapperComponent;
};

ContentWrapperMount.propTypes = propTypes;
ContentWrapperMount.defaultProps = defaultProps;

export default ContentWrapperMount;
