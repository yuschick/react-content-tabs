import React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import TabBar from './TabBar';

const TabBarMount = ({
  mountTo,
  tabPlacement,
  navStyles,
  tabStyles,
  isAnimating,
  updateActiveTab,
  activeTab,
  animation,
  tabs,
  theme,
  endAnimation,
}) =>
  mountTo ? (
    ReactDOM.createPortal(
      <TabBar
        tabs={tabs}
        tabPlacement={tabPlacement}
        navStyles={navStyles}
        tabStyles={tabStyles}
        isAnimating={isAnimating}
        animation={animation}
        updateActiveTab={updateActiveTab}
        endAnimation={endAnimation}
        activeTab={activeTab}
        theme={theme}
      />,
      typeof mountTo === 'string' ? document.getElementById(mountTo) : mountTo
    )
  ) : (
    <TabBar
      tabs={tabs}
      tabPlacement={tabPlacement}
      navStyles={navStyles}
      tabStyles={tabStyles}
      isAnimating={isAnimating}
      animation={animation}
      updateActiveTab={updateActiveTab}
      endAnimation={endAnimation}
      activeTab={activeTab}
      theme={theme}
    />
  );

TabBarMount.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      content: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  mountTo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  tabPlacement: PropTypes.oneOf(['start', 'end', 'center', 'fill']),
  navStyles: PropTypes.shape({}),
  tabStyles: PropTypes.shape({}),
  isAnimating: PropTypes.bool.isRequired,
  updateActiveTab: PropTypes.func.isRequired,
  endAnimation: PropTypes.func.isRequired,
  activeTab: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.shape({}),
  ]),
  animation: PropTypes.oneOf(['slide', 'blur', 'none']),
  theme: PropTypes.shape({
    base: PropTypes.string,
    primary: PropTypes.string,
    secondary: PropTypes.string,
    tertiary: PropTypes.string,
    disabled: PropTypes.string,
  }),
};

TabBarMount.defaultProps = {
  mountTo: '',
  activeTab: null,
  tabPlacement: 'start',
  animation: 'blur',
  navStyles: {},
  tabStyles: {},
  theme: {},
};

export default TabBarMount;
