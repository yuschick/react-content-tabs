import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../styles/theme';

const propTypes = {
  tabFor: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  activeTab: PropTypes.string,
  tabs: PropTypes.shape({
    animation: PropTypes.oneOf(['slide', 'blur', 'none']),
    placement: PropTypes.oneOf(['start', 'end', 'center', 'fill']),
    styles: PropTypes.shape({}),
  }),
  theme: PropTypes.shape({}),
  isActive: PropTypes.bool,
  setActiveTab: PropTypes.func,
  addTab: PropTypes.func,
};

const defaultProps = {
  activeTab: '',
  tabs: {
    animation: 'slide',
    placement: 'start',
    styles: {},
  },
  theme: null,
  isActive: false,
  addTab: () => false,
  setActiveTab: () => false,
};

class Tab extends PureComponent {
  componentDidMount() {
    const { isActive, setActiveTab, tabFor, addTab } = this.props;
    addTab(this);

    if (isActive) {
      setActiveTab(tabFor);
    }
  }

  render() {
    const {
      activeTab,
      tabFor,
      tabs,
      setActiveTab,
      theme,
      children,
    } = this.props;

    return (
      <TabButton
        role="tab"
        aria-selected={activeTab === tabFor}
        aria-controls={`${tabFor}-content`}
        id={`tab-${tabFor}`}
        data-title={`tab-${tabFor}`}
        placement={tabs.placement}
        onClick={() => {
          setActiveTab(tabFor);
        }}
        styles={tabs.styles}
        theme={theme}
      >
        {children}
      </TabButton>
    );
  }
}

const TabButton = styled.button`
  background: none;
  border: none;
  border-bottom: 4px solid transparent;
  box-sizing: border-box;
  color: ${props =>
    props.theme ? props.theme.inactive : baseTheme.colors.inactive};
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  margin-right: 1rem;
  min-height: 48px;
  padding: 0;
  text-align: center;
  ${props => props.styles};

  ${props =>
    props.placement === 'fill' &&
    css`
      flex: 1;
    `};

  &:last-child {
    margin-right: 0;
  }

  &:focus {
    outline-color: ${props =>
      props.theme ? props.theme.secondary : baseTheme.colors.secondary};
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

  &[aria-selected='true'] {
    color: ${props => (props.theme ? props.theme.base : baseTheme.colors.base)};
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

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;

export default Tab;
