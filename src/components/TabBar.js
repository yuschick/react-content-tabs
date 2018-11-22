import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { colors } from '../styles/theme';
import { MotionBlur, OpacityFade } from '../styles/animation';
import { TabPlacementMap } from '../constants/index';

const TabBarNav = styled.nav`
  align-items: center;
  background: ${colors.white};
  display: flex;
  justify-content: ${props => TabPlacementMap[props.tabPlacement]};
  position: relative;
  ${props => props.navStyles};

  &:after,
  :before {
    background: ${colors.primary};
    bottom: 0;
    content: '';
    display: block;
    height: 2px;
    left: 0;
    position: absolute;
    transform: translateX(${props => (props ? props.underlineLeft : 0)}px);
    transition: all
      ${props =>
        props.underlineDiff ? Math.abs(props.underlineDiff) / 1000 : 0.25}s
      cubic-bezier(0.15, 0.41, 0.48, 1.11);
    width: ${props => (props ? props.underlineWidth : 0)}px;
  }

  &:before {
    bottom: 2px;
    filter: blur(1.25px);
    height: 2px;
    opacity: 0;
  }

  &.animating:after {
    animation: ${MotionBlur}
      ${props =>
        props.underlineDiff ? Math.abs(props.underlineDiff) / 1000 : 0.25}s
      ease;
  }

  &.animating:before {
    animation: ${OpacityFade}
      ${props =>
        props.underlineDiff ? Math.abs(props.underlineDiff) / 1000 : 0.25}s
      ease;
  }

  ${props =>
    props.animation === 'slide' &&
    css`
      &.animating:before,
      &.animating:after {
        animation: none;
      }
    `};

  ${props =>
    props.animation === 'none' &&
    css`
      &:before,
      &:after {
        transition: none;
      }

      &.animating:before,
      &.animating:after {
        animation: none;
      }
    `};
`;

const TabButton = styled.button`
  background: none;
  border: none;
  border-bottom: 4px solid transparent;
  box-sizing: border-box;
  color: ${colors.tertiary};
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  margin-right: 1rem;
  min-height: 48px;
  padding: 0;
  text-align: center;
  ${props => props.tabStyles};

  ${props =>
    props.tabPlacement === "fill" &&
    css`
      flex: 1;
    `};

  &:last-child {
    margin-right: 0;
  }

  &:focus {
    outline-color: ${colors.outline};
  }

  &:after {
    display: block;
    content: attr(data-title);
    font-size: 16px;
    font-weight: 500;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  &[aria-selected="true"] {
    color: ${colors.primary};
    font-size: 16px;
  }

  a,
  a:visited,
  a:active,
  a:hover,
  a:link {
    color: inherit;
    display: block;
    padding: 1rem 1rem calc(1rem - 4px);
    text-decoration: none;
  }

  > span {
    display: block;
    padding: 1rem 1rem calc(1rem - 4px);
  }
`;

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      lineLeft: 0,
      lineWidth: 0,
      leftDiff: 0,
    };
    this.updateActiveUnderline = this.updateActiveUnderline.bind(this);
  }

  componentDidMount() {
    const { tabs, activeTab, endAnimation } = this.props;

    this.setState({ tabs }, () => {
      this.updateActiveUnderline(tabs[activeTab]);
    });

    this.tabBar.addEventListener('animationend', endAnimation);
    window.addEventListener('resize', this.updateActiveUnderline);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateActiveUnderline);
  }

  updateActiveUnderline() {
    const { lineLeft } = this.state;
    const { activeTab } = this.props;
    const tab = this[`tab_${activeTab.id}`];

    if (tab) {
      const diff = lineLeft - tab.offsetLeft;
      this.setState({
        lineLeft: tab.offsetLeft,
        leftDiff: diff,
        lineWidth: tab.getBoundingClientRect().width,
      });
    }
  }

  render() {
    const {
      tabPlacement,
      navStyles,
      tabStyles,
      isAnimating,
      updateActiveTab,
      activeTab,
      animation,
    } = this.props;
    const { tabs, lineLeft, lineWidth, leftDiff } = this.state;

    return (
      <TabBarNav
        role="tablist"
        ref={el => {
          this.tabBar = el;
        }}
        underlineLeft={lineLeft}
        underlineWidth={lineWidth}
        underlineDiff={leftDiff}
        className={isAnimating ? 'animating' : ''}
        navStyles={navStyles}
        animation={animation}
        tabPlacement={tabPlacement}
      >
        {tabs.map(tab => (
          <TabButton
            count={tabs.length}
            tabPlacement={tabPlacement}
            tabStyles={tabStyles}
            key={`tab-${tab.id}`}
            ref={el => {
              this[`tab_${tab.id}`] = el;
            }}
            role="tab"
            aria-selected={activeTab.id === tab.id}
            aria-controls={`tab-${tab.id}-content`}
            id={`tab-${tab.id}`}
            data-title={tab.id}
            onClick={() => updateActiveTab(tab, this.updateActiveUnderline)}
          >
            {typeof tab.title === 'string' ? (
              <span>{tab.title}</span>
            ) : (
                tab.title
              )}
          </TabButton>
        ))}
      </TabBarNav>
    );
  }
}

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      content: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  tabPlacement: PropTypes.oneOf(['start', 'end', 'center', 'fill']),
  animation: PropTypes.oneOf(['slide', 'blur', 'none']),
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
};

TabBar.defaultProps = {
  activeTab: null,
  tabPlacement: 'start',
  animation: 'blur',
  navStyles: {},
  tabStyles: {},
};

export default TabBar;
