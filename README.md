## Table of Contents
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props](#props)

## Installation

Use npm to install the package:

```bash
npm install @fatqianqian/cabbage-package
```

And make sure ChakraProvider is set up in your app:

```jsx
import { ChakraProvider } from '@chakra-ui/react';

const App = () => (
  <ChakraProvider>
    {/* ... */}
  </ChakraProvider>
);
```

## Basic Usage

Here's how to use the `DataTable` component in a React component:

```jsx
import { DataTable } from '@fatqianqian/cabbage-package';

const App = () => {
  const columns = [
    { header: 'Code', accessorKey: 'code' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Action', accessorKey: 'action', render: (rowData) => (<Button>{rowData.action}</Button>)}
    // ... more columns
  ];

  const data = [
    { id: 1, code: 'A1', name: 'Apple', action: 'Button 1' },
    { id: 2, code: 'B1', name: 'Banana', action: 'Button 2' },
    // ... more data
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
};
```

## Props

### `columns` (required)

An array of column objects specifying the header label and the key for data accessor.
If you want to render a custom component in the column, you can also provide a `render` function that takes the row data as the argument and returns the component to be rendered.

- Type: `Array`
- Example:

  ```jsx
  const columns = [
    { header: 'Code', accessorKey: 'code' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Action', accessorKey: 'action', render: (rowData) => (<Button>{rowData.action}</Button>)}
  ];
  ```

### `data` (required)

An array of objects to be displayed in the table. Each object should have the same keys as the accessor keys specified in the `columns` prop.


- Type: `Array`
- Example:

  ```jsx
  const data = [
    { id: 1, code: 'A1', name: 'Apple', action: 'Button 1' },
    { id: 2, code: 'B1', name: 'Banana', action: 'Button 2' },
  ];
  ```

### `hasCaption`

A boolean flag that enables or disables the table caption.

- Type: `Boolean`
- Default: `false`

### `caption`

A string that is used as the table caption if `hasCaption` is set to `true`.

- Type: `String`
- Default: `''`

### `tableStyle`

Allows you to provide additional styles for the table.

- Type: `Object`
- Default: 
    ```jsx 
    {
        textAlign: "center",
        size: "sm",
        border: "1px",
        borderColor: "blackAlpha.900",
    }
    ```

- Type: `Object`

### `enablePagination`

A boolean flag that enables or disables pagination for the table.

- Type: `Boolean`
- Default: `false`

### `enableRowDoubleClick`

A boolean flag that enables or disables double click for the table row, if enabled, if enabled, rowDoubleClickHandler will be called when double click on the row.

- Type: `Boolean`
- Default: `false`

### `rowDoubleClickHandler(rowData)`

Double click handler for the table row, if enableRowDoubleClick is set to true, this handler will be called when double click on the row.

- Type: `Function`
- Default: `() => {}`
- Usage: 
    ```jsx
    <DataTable
      ...
      rowDoubleClickHandler = (row) => {alert(`Double Clicked Row ${row.id}`)},
      ...
    />
    ```

### `enableFilter`

A boolean flag that enables or disables filter for the table.

- Type: `Boolean`
- Default: `false`

### `enableMultiSelect`

A boolean flag that enables or disables multi select for the table.

- Type: `Boolean`
- Default: `false`

### `onSelectedRowsChange`

A function that will be called when the selected rows change, must be used with enableMultiSelect set to true.

- Type: `Function`
- Default: `() => {}`
- Usage: 
    ```jsx
    <DataTable
      ...
      enableMultiSelect = {true}
      onSelectedRowsChange = (selectedRows) => {console.log(selectedRows)},
      ...
    />
    ```

### `enableFixedHeader`

A boolean flag that enables or disables fixed header for the table. maxH will be set to 100% if enableFixedHeader is set to true.

- Type: `Boolean`
- Default: `false`

## Example Usage with All Props

```jsx
<DataTable
  columns={columns}
  data={data}
  hasCaption={true}
  caption="Sample Caption"
  tableStyle={{ textAlign: 'center' }}
  renderRowSubComponents={[
    (rowData) => (<Button>Button 1</Button>),
    (rowData) => (<Link>Link</Link>)
  ]}
  customHeaders={['Button', 'Link']}
  enablePagination={true}
  enableRowDoubleClick={true}
  rowDoubleClickHandler={(row) => { console.log(row) }}
/>
```