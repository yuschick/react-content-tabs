import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  activeTab: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

const defaultProps = {
  activeTab: '',
};

const renderTabs = (children, activeTab) =>
  React.Children.map(children, child =>
    React.cloneElement(child, {
      activeTab,
    })
  );

const ContentWrapper = ({ activeTab, children }) => (
  <main>{renderTabs(children, activeTab)}</main>
);

ContentWrapper.propTypes = propTypes;
ContentWrapper.defaultProps = defaultProps;

export default ContentWrapper;
