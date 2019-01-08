![React Content Tabs](https://github.com/yuschick/react-content-tabs/blob/master/public/react-content-tabs.gif?raw=truee)

## Documentation [![npm version](https://badge.fury.io/js/react-content-tabs.svg)](https://badge.fury.io/js/react-content-tabs)

### Installation

**React Content Tabs** can be installed by running either of the following commands in your terminal:

```
npm install react-content-tabs --D
```

```
yarn add react-content-tabs
```

With the package installed, it can be imported into a React project.

```js
import ReactContentTabs from 'react-content-tabs';
```

Once imported, the component can be used by adding it into the JSX with the required props and any additional options.

```js
render() {
  return (
    <Tabs.Tabs>
      <Tabs.TabBar>
        <Tabs.Tab tabFor="upcoming">Upcoming</Tabs.Tab>
        <Tabs.Tab tabFor="completed">Completed</Tabs.Tab>
        <Tabs.Tab tabFor="calendar">Calendar</Tabs.Tab>
      </Tabs.TabBar>

      <Tabs.ContentWrapper>
        <Tabs.Content id="upcoming">Upcoming content.</Tabs.Content>
        <Tabs.Content id="completed">Completed content.</Tabs.Content>
        <Tabs.Content id="calendar">Calendar content.</Tabs.Content>
      </Tabs.ContentWrapper>
    </Tabs.Tabs>
  );
}
```

### Options

| Tabs.Tabs |          |             |                                                                                                                |     |
| --------- | -------- | ----------- | -------------------------------------------------------------------------------------------------------------- | --- |
| **Prop**  | **Type** | **Default** | **Desc**                                                                                                       |
| theme     | object   | {}          | The `theme` prop allows the passing of an object of CSS colors to override the default theme of the component. |

```js
theme={{
  base: '#fff',
  disabled: '#939393',
  inactive: '#000',
  primary: '#e92525',
  secondary: '#C8C8C8',
  tertiary: '#9fabb8',
}}
```

| Tabs.TabBar    |                                           |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------- | ----------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prop**       | **Type**                                  | **Default** | **Desc**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| mountTo        | string or node                            | null        | The `mountTo` prop allows the Content Tabs to optionally take advantage of React Portals. There are times when the tab bar should be displayed in a separate container than the content itself and the `mountTo` prop enables that. Pass in either a string of a DOM `id` or a React node (such as a container created with `React.createRef()`) into which the Content Tabs should be inserted. If this is left blank, the Content Tabs will be rendered in their native DOM order.<br><br>Learn more about [React Portals](https://reactjs.org/docs/portals.html) |
| styles         | object                                    | {}          | The `styles` prop allows the passing of an object of CSS properties to style the `TabBar` to fit a specific theme.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| tabs           | object                                    | {}          | The `tabs` prop allows the passing of an object to customize the behavior of the `Tabs`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| tabs.animation | string ("blur", "slide", "none")          | slide       | The `animation` property customizes how to underline moves from tab to tab.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| tabs.placement | string ("start", "end", "center", "fill") | start       | The `placement` prop allows the positioning of the tabs horizontally within the `TabBar` container.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| tabs.styles    | object                                    | {}          | The `styles` prop allows the passing of an object of CSS properties to style the `Tabs` themselves to fit a specific theme.                                                                                                                                                                                                                                                                                                                                                                                                                                         |

| Tabs.Tab |          |             |                                                                                                                                                                            |
| -------- | -------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prop** | **Type** | **Default** | **Desc**                                                                                                                                                                   |
| tabFor   | string   | required    | The `tabFor` prop is a string that associates the tab with the `id` of the content section. This functions similarly to the HTML `for` attribute when working with labels. |
| isActive | bool     | false       | The `isActive` controls the display state of the `Tab`. This can be beneficial when needing a specific tab to be displayed on a corresponding URL.                         |

| Tabs.ContentWrapper |                |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------- | -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prop**            | **Type**       | **Default** | **Desc**                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| mountTo             | string or node | null        | Similar to `mountTo` property on the `TabBar` component, the `mountTo` prop on the `ContentWrapper` accepts a string of a DOM `id` or React node to define where the content of the tabs should be rendered. This enables the ability to place the `TabBar` and `ContentWraper` in separate containers. If left blank, the `ContentWrapper` will be rendered in its native DOM order.<br><br>Learn more about [React Portals](https://reactjs.org/docs/portals.html) |

| Tabs.Content |          |             |                                                                                                                   |
| ------------ | -------- | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| **Prop**     | **Type** | **Default** | **Desc**                                                                                                          |
| id           | string   | required    | The `id` property applies an `id` to the content section which allows it to be associated with the correct `Tab`. |

### Contact

[@Yuschick on Twitter](https://www.twitter.com/yuschick)

### Sponsors

[![Freska](https://github.com/yuschick/react-content-tabs/blob/master/public/freska-logo.jpg?raw=true)](https://www.freska.fi/)
