import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import TabBarMount from "./components/TabBarMount";
import TabContentMount from "./components/TabContentMount";

class ReactContentTabs extends Component {
  state = {
    activeTab: null,
    isAnimating: false
  };

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
            navStyles={navStyles}
            tabStyles={tabStyles}
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
  tabPlacement: PropTypes.oneOf(["start", "end", "center", "fill"]),
  animation: PropTypes.oneOf(["slide", "blur", "none"])
  navStyles: PropTypes.shape({}),
  tabStyles: PropTypes.shape({}),
};

ReactContentTabs.defaultProps = {
  mountTo: "",
  contentMount: "",
  activeTab: 0,
  navStyles: {},
  tabPlacement: "start",
  animation: "blur"
};

export default ReactContentTabs;
