import React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import TabBar from './TabBar';

const TabBarMount = ({
  mountTo,
  variant,
  tabPlacement,
  styles,
  isAnimating,
  updateActiveTab,
  activeTab,
  animation,
  tabs,
  endAnimation,
}) =>
  mountTo ? (
    ReactDOM.createPortal(
      <TabBar
        tabs={tabs}
        variant={variant}
        tabPlacement={tabPlacement}
        styles={styles}
        isAnimating={isAnimating}
        animation={animation}
        updateActiveTab={updateActiveTab}
        endAnimation={endAnimation}
        activeTab={activeTab}
      />,
      typeof mountTo === 'string' ? document.getElementById(mountTo) : mountTo
    )
  ) : (
      <TabBar
        tabs={tabs}
        variant={variant}
        tabPlacement={tabPlacement}
        styles={styles}
        isAnimating={isAnimating}
        animation={animation}
        updateActiveTab={updateActiveTab}
        endAnimation={endAnimation}
        activeTab={activeTab}
      />
    );

TabBarMount.propTypes = {
  mountTo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      content: PropTypes.func.isRequired,
    })
  ).isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  tabPlacement: PropTypes.oneOf(['start', 'end', 'center', 'fill']),
  styles: PropTypes.shape({}),
  isAnimating: PropTypes.bool.isRequired,
  updateActiveTab: PropTypes.func.isRequired,
  endAnimation: PropTypes.func.isRequired,
  activeTab: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.shape({}),
  ]),
  animation: PropTypes.oneOf(['slide', 'blur', 'none']),
};

TabBarMount.defaultProps = {
  mountTo: '',
  activeTab: null,
  variant: 'primary',
  tabPlacement: 'start',
  animation: 'blur',
  styles: {},
};

export default TabBarMount;
