import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  activeTab: PropTypes.string,
};

const defaultProps = {
  activeTab: '',
};

const Content = ({ id, activeTab, children }) => (
  <ContentArticle
    role="tabpanel"
    id={`${id}-content`}
    aria-labelledby={`tab-${id}`}
    aria-hidden={activeTab !== id}
  >
    {children}
  </ContentArticle>
);

const ContentArticle = styled.article`
  &[aria-hidden='true'] {
    display: none;
  }
`;

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
