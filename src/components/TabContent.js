import React from 'react';
import PropTypes from 'prop-types';

const TabContent = ({ activeTab }) => (
  <main>
    <article
      role="tabpanel"
      id={`tab-${activeTab.id}-content`}
      aria-labelledby={`tab-${activeTab.id}`}
    >
      {activeTab.content()}
    </article>
  </main>
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
