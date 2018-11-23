import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TabBarMount from './components/TabBarMount';
import TabContentMount from './components/TabContentMount';

class ReactContentTabs extends Component {
  state = {
    activeTab: null,
    isAnimating: false,
  };

  componentDidMount() {
    const { tabs, activeTab } = this.props;
    this.updateActiveTab(tabs[activeTab] ? tabs[activeTab] : tabs[0]);
  }

  updateActiveTab = (activeTab, cb = () => false) => {
    this.setState({ activeTab, isAnimating: true }, () => {
      cb();
    });
  };

  endAnimation = () => {
    this.setState({ isAnimating: false });
  };

  render() {
    const {
      mountTo,
      contentMount,
      tabs,
      navStyles,
      tabStyles,
      tabPlacement,
      animation,
      theme,
    } = this.props;
    const { activeTab, isAnimating } = this.state;
    return (
      activeTab && (
        <Fragment>
          <TabBarMount
            mountTo={mountTo}
            tabs={tabs}
            tabPlacement={tabPlacement}
            navStyles={navStyles}
            tabStyles={tabStyles}
            isAnimating={isAnimating}
            animation={animation}
            updateActiveTab={this.updateActiveTab}
            endAnimation={this.endAnimation}
            activeTab={activeTab}
            theme={theme}
          />

          <TabContentMount
            activeTab={activeTab}
            mountTo={contentMount || mountTo}
          />
        </Fragment>
      )
    );
  }
}

ReactContentTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      content: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  mountTo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  contentMount: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  activeTab: PropTypes.number,
  tabPlacement: PropTypes.oneOf(['start', 'end', 'center', 'fill']),
  animation: PropTypes.oneOf(['slide', 'blur', 'none']),
  navStyles: PropTypes.shape({}),
  tabStyles: PropTypes.shape({}),
  theme: PropTypes.shape({
    base: PropTypes.string,
    primary: PropTypes.string,
    secondary: PropTypes.string,
    tertiary: PropTypes.string,
    disabled: PropTypes.string,
  }),
};

ReactContentTabs.defaultProps = {
  mountTo: '',
  contentMount: '',
  activeTab: 0,
  navStyles: {},
  tabStyles: {},
  tabPlacement: 'start',
  animation: 'blur',
  theme: {},
};

export default ReactContentTabs;
