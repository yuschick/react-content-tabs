# React Content Tabs

[Screen gif coming soon!]

## Documentation

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
    <ReactContentTabs [options] />
  );
}
```

### Props

#### Required

| Prop | Type  | Default  | Desc                                                                                                                                                                                                                                 |
| ---- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tabs | array | required | The `tabs` prop is an array of individual `tab` objects. The `tab` objects currently support an `content`, `disabled`, `id`, and `title` property. This object defines the tab as it will appear and associates it with its content. |

```jsx
<ReactContentTabs
  tabs={[
    {
      content: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
      id: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    },
  ]}
/>
```

| Prop     | Type           | Default  | Desc                                                                                                                                                                                                                            |
| -------- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content  | func           | required | The `content` prop contains a function that returns the content that will be displayed whenever that tab is active.                                                                                                             |
| disabled | bool           | false    | The `disabled` prop will deactivate the specific tab from being triggered and viewed.                                                                                                                                           |
| id       | string         | required | The `id` prop is a required string value that will serve as the `tab` id in the rendered element attributes. The `id` is needed to ensure accessibility                                                                         |
| title    | string or node | required | The `title` prop contains the content that will be displayed in the tab itself. Whether this is a string or a React Node, such as a `<Link>` component from `react-router`. This would allow associations between tabs and URLs |

#### Optional

The following props are optional to allow customization of the Content Tabs.

| Prop         | Type                                      | Default | Desc                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------ | ----------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| activeTab    | number                                    | 0       | The `activeTab` prop supports a number of a tab, based on its index value in the `tabs` array, to set as visible. This can be beneficial when needing a specific tab to be displayed on a corresponding URL.                                                                                                                                                                                                                                                                                                                                                        |
| animation    | string ("blur", "slide", "none")          | blur    | The `animation` prop defines the way the underline moves from one active tab to the next.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| contentMount | string or node                            | ''      | Similar to `mountTo` the `contentMount` prop accepts a string of a DOM `id` or React node to define where the content of the tabs (`tab.content`) should be rendered. This enables the ability to place the TabBar and TabContent in separate containers. If left blank, the TabContent will be rendered directly under the TabBar in its native DOM order.<br><br>Learn more about [React Portals](https://reactjs.org/docs/portals.html)                                                                                                                          |
| mountTo      | string or node                            | ''      | The `mountTo` prop allows the Content Tabs to optionally take advantage of React Portals. There are times when the tab bar should be displayed in a separate container than the content itself and the `mountTo` prop enables that. Pass in either a string of a DOM `id` or a React node (such as a container created with `React.createRef()`) into which the Content Tabs should be inserted. If this is left blank, the Content Tabs will be rendered in their native DOM order.<br><br>Learn more about [React Portals](https://reactjs.org/docs/portals.html) |
| navStyles    | object                                    | {}      | The `navStyles` prop allows the passing of an object of CSS properties to style the TabBar to fit a specific theme.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| tabPlacement | string ("start", "end", "center", "fill") | start   | The `tabPlacement` prop allows the positioning of the tabs horizontally within the TabBar container.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| tabStyles    | object                                    | {}      | The `tabStyles` prop allows the passing of an object of CSS properties to style the Tabs to fit a specific theme.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| theme        | object                                    | {}      | The `theme` prop allows the passing of an object of CSS colors to override the default theme of the component.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

```jsx
<ReactContentTabs
  ...
  theme={{
    base: '#fff',
    primary: '#e92525',
    secondary: '#C8C8C8',
    tertiary: '#9fabb8',
    disabled: '#939393',
  }}
/>
```

### Contact

[@Yuschick on Twitter](https://www.twitter.com/yuschick)

### Sponsors

[![Freska](https://github.com/yuschick/react-content-tabs/blob/master/public/freska-logo.jpg?raw=true)](https://www.freska.fi/)
