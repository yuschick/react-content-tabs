import React from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';

import TabContent from './TabContent';

const TabContentMount = ({ activeTab, mountTo }) =>
  mountTo ? (
    ReactDOM.createPortal(
      <TabContent activeTab={activeTab} />,
      typeof mountTo === 'string' ? document.getElementById(mountTo) : mountTo
    )
  ) : (
    <TabContent activeTab={activeTab} />
  );

TabContentMount.propTypes = {
  mountTo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  activeTab: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.shape({}),
  ]),
};

TabContentMount.defaultProps = {
  mountTo: '',
  activeTab: null,
};

export default TabContentMount;
