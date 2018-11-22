import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from '../styles/theme';

const ContentContainer = styled.main`
  border-top: 3px solid ${colors.secondary};
`;

const TabContent = ({ activeTab }) => (
  <ContentContainer>
    <article
      role="tabpanel"
      id={`tab-${activeTab.id}-content`}
      aria-labelledby={`tab-${activeTab.id}`}
    >
      {activeTab.content()}
    </article>
  </ContentContainer>
);

TabContent.propTypes = {
  activeTab: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.shape({}),
  ]),
};

TabContent.defaultProps = {
  activeTab: null,
};

export default TabContent;
