import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import TabBarMount from "./components/TabBarMount";
import TabContentMount from "./components/TabContentMount";

class ContentTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null,
      isAnimating: false
    };
    this.updateActiveTab = this.updateActiveTab.bind(this);
    this.endAnimation = this.endAnimation.bind(this);
  }

  componentDidMount() {
    const { tabs, activeTab } = this.props;
    this.updateActiveTab(tabs[activeTab] ? tabs[activeTab] : tabs[0]);
  }

  updateActiveTab(activeTab, cb = () => false) {
    this.setState({ activeTab, isAnimating: true }, () => {
      cb();
    });
  }

  endAnimation() {
    this.setState({ isAnimating: false });
  }

  render() {
    const {
      mountTo,
      contentMount,
      tabs,
      variant,
      navStyles,
      tabPlacement,
      animation
    } = this.props;
    const { activeTab, isAnimating } = this.state;
    return (
      <Fragment>
        {activeTab && (
          <TabBarMount
            mountTo={mountTo}
            tabs={tabs}
            variant={variant}
            tabPlacement={tabPlacement}
            styles={navStyles}
            isAnimating={isAnimating}
            animation={animation}
            updateActiveTab={this.updateActiveTab}
            endAnimation={this.endAnimation}
            activeTab={activeTab}
          />
        )}
        {activeTab && (
          <TabContentMount
            activeTab={activeTab}
            mountTo={contentMount || mountTo}
          />
        )}
      </Fragment>
    );
  }
}

ContentTabs.propTypes = {
  mountTo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  contentMount: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      content: PropTypes.func.isRequired
    })
  ).isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  activeTab: PropTypes.number,
  navStyles: PropTypes.shape({}),
  tabPlacement: PropTypes.oneOf(["start", "end", "center", "fill"]),
  animation: PropTypes.oneOf(["slide", "blur", "none"])
};

ContentTabs.defaultProps = {
  mountTo: "",
  contentMount: "",
  variant: "primary",
  activeTab: 0,
  navStyles: {},
  tabPlacement: "start",
  animation: "blur"
};

export default ContentTabs;
