import React, { Component } from 'react';
import ContentTabs from 'react-content-tabs';

class App extends Component {
  render() {
    return (
      <ContentTabs
        tabs={[
          {
            id: 'upcoming',
            title: 'Upcoming',
            content: () => {
              return (
                <p>
                  Upcoming Bookings Content
          </p>
              );
            },
          },
          {
            id: 'completed',
            title: 'Completed ',
            content: () => {
              return (
                <p>
                  Completed Bookings Content
          </p>
              );
            },
          },
          {
            id: 'calendar',
            title: 'Calendar',
            content: () => {
              return (
                <p>
                  Calendar Content
          </p>
              );
            },
          },
        ]}
        m={1}
      />
    );
  }
}

export default App;
