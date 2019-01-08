import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Tab from './components/Tab';
import TabBarMount from './components/TabBarMount';
import ContentWrapperMount from './components/ContentWrapperMount';
import Content from './components/Content';

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export class Tabs extends Component {
  state = {
    tabs: [],
    activeTab: null,
    line: {
      lineLeft: 0,
      lineWidth: 0,
      leftDiff: 0,
    },
    isAnimating: false,
  };

  componentDidMount() {
    const { tabs } = this.state;
    const test = tabs.filter(tab => tab.props.isActive);

    if (!test.length) {
      this.setActiveTab(tabs[0].props.tabFor);
    }

    window.addEventListener('resize', this.updateActiveUnderline);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateActiveUnderline);
  }

  addTab = tab => {
    const { tabs } = this.state;
    tabs.push(tab);
    this.setState({ tabs });
  };

  setActiveTab = tab => {
    this.setState({ activeTab: tab, isAnimating: true }, () =>
      this.updateActiveUnderline()
    );
  };

  updateActiveUnderline = () => {
    const { activeTab, line } = this.state;
    const tab = document.getElementById(`tab-${activeTab}`);

    if (tab) {
      const diff = line.lineLeft - tab.offsetLeft;
      this.setState({
        line: {
          lineLeft: tab.offsetLeft,
          leftDiff: diff,
          lineWidth: tab.getBoundingClientRect().width,
        },
      });
    }
  };

  endAnimation = () => {
    this.setState({ isAnimating: false });
  };

  renderChildren = () => {
    const { children } = this.props;
    const { activeTab, line, isAnimating } = this.state;

    return React.Children.map(children, child =>
      React.cloneElement(child, {
        addTab: this.addTab,
        setActiveTab: this.setActiveTab,
        activeTab,
        line,
        isAnimating,
        endAnimation: this.endAnimation,
      })
    );
  };

  render() {
    return <Fragment>{this.renderChildren()}</Fragment>;
  }
}

Tabs.propTypes = propTypes;

export default {
  Tabs,
  Tab,
  TabBar: TabBarMount,
  ContentWrapper: ContentWrapperMount,
  Content,
};
