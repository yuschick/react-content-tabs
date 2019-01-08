import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import TabsWrapper from './TabBar';

const propTypes = {
  mountTo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  styles: PropTypes.shape({}),
  tabs: PropTypes.shape({
    animation: PropTypes.oneOf(['slide', 'blur', 'none']),
    placement: PropTypes.oneOf(['start', 'end', 'center', 'fill']),
    styles: PropTypes.shape({}),
  }),
  theme: PropTypes.shape({}),
  line: PropTypes.shape({}),
  isAnimating: PropTypes.bool,
  endAnimation: PropTypes.func,
  addTab: PropTypes.func,
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.string,
};

const defaultProps = {
  mountTo: null,
  styles: {},
  tabs: {
    animation: 'slide',
    placement: 'start',
    styles: {},
  },
  activeTab: '',
  theme: {},
  line: {},
  isAnimating: false,
  addTab: () => false,
  setActiveTab: () => false,
  endAnimation: () => false,
};

const TabBarMount = ({
  mountTo,
  styles,
  tabs,
  theme,
  line,
  addTab,
  isAnimating,
  endAnimation,
  setActiveTab,
  activeTab,
  children,
}) => {
  const TabBarComponent = (
    <TabsWrapper
      styles={styles}
      tabs={tabs}
      addTab={addTab}
      setActiveTab={setActiveTab}
      activeTab={activeTab}
      theme={theme}
      line={line}
      isAnimating={isAnimating}
      endAnimation={endAnimation}
    >
      {children}
    </TabsWrapper>
  );

  return mountTo
    ? ReactDOM.createPortal(
        TabBarComponent,
        typeof mountTo === 'string' ? document.getElementById(mountTo) : mountTo
      )
    : TabBarComponent;
};

TabBarMount.propTypes = propTypes;
TabBarMount.defaultProps = defaultProps;

export default TabBarMount;
