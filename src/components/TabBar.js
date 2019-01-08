import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import baseTheme from '../styles/theme';

const propTypes = {
  addTab: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  endAnimation: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  styles: PropTypes.shape({}),
  tabs: PropTypes.shape({
    animation: PropTypes.oneOf(['slide', 'blur', 'none']),
    placement: PropTypes.oneOf(['start', 'end', 'center', 'fill']),
    styles: PropTypes.shape({}),
  }),
  theme: PropTypes.shape({}),
  line: PropTypes.shape({}).isRequired,
  isAnimating: PropTypes.bool.isRequired,
  activeTab: PropTypes.string,
};

const defaultProps = {
  theme: null,
  styles: {},
  tabs: {
    animation: 'slide',
    placement: 'start',
    styles: {},
  },
  activeTab: '',
};

class TabBar extends Component {
  componentDidMount() {
    const { endAnimation } = this.props;

    this.tabBar.addEventListener('animationend', endAnimation);
  }

  renderTabs() {
    const {
      tabs,
      theme,
      addTab,
      setActiveTab,
      activeTab,
      children,
    } = this.props;

    return React.Children.map(children, child =>
      React.cloneElement(child, {
        tabs,
        theme,
        setActiveTab,
        activeTab,
        addTab,
      })
    );
  }

  render() {
    const { styles, tabs, line, theme, isAnimating } = this.props;
    return (
      <TabBarNav
        role="tablist"
        styles={styles}
        theme={theme}
        tabs={tabs}
        animation={tabs.animation}
        ref={el => {
          this.tabBar = el;
        }}
        underlineLeft={line.lineLeft}
        underlineWidth={line.lineWidth}
        underlineDiff={line.leftDiff}
        className={isAnimating ? 'animating' : ''}
      >
        {this.renderTabs()}
      </TabBarNav>
    );
  }
}

const tabPlacementMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  fill: 'center',
};

const MotionBlur = keyframes`
  50% {
    filter: brightness(1.5);
    opacity: .75;
  }
`;

const OpacityFade = keyframes`
  50% {
    opacity: .75;
  }
`;

const TabBarNav = styled.nav`
  align-items: center;
  background: ${props =>
    props.theme ? props.theme.primary : baseTheme.colors.primary};
  display: flex;
  justify-content: ${props => tabPlacementMap[props.tabs.placement]};
  position: relative;

  ${props => props.styles};

  &:after,
  :before {
    background: ${props =>
      props.theme ? props.theme.base : baseTheme.colors.base};
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

TabBar.propTypes = propTypes;
TabBar.defaultProps = defaultProps;

export default TabBar;
