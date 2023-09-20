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
import { DataTable } from './DataTable';

const App = () => {
  const columns = [
    { header: 'Code', accessorKey: 'code' },
    { header: 'Name', accessorKey: 'name' },
    // ... more columns
  ];

  const data = [
    { id: 1, code: 'A1', name: 'Apple' },
    { id: 2, code: 'B1', name: 'Banana' },
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

- Type: `Array`
- Example:

  ```jsx
  const columns = [
    { header: 'Code', accessorKey: 'code' },
    { header: 'Name', accessorKey: 'name' },
  ];
  ```

### `data` (required)

An array of objects to be displayed in the table.

- Type: `Array`
- Example:

  ```jsx
  const data = [
    { id: 1, code: 'A1', name: 'Apple' },
    { id: 2, code: 'B1', name: 'Banana' },
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

### `renderRowSubComponents`

An array of functions that return React elements to be rendered in extra columns. Each function receives the row data as a parameter.

- Type: `Array<Function>`

### `customHeaders`

An array of strings that are used as headers for the extra columns created by `renderRowSubComponents`.

- Type: `Array<String>`

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

## Example Usage with All Props

```jsx
<DataTable
  columns={columns}
  data={data}
  selectionMode={true}
  selection={selectedProducts}
  onSelectionChange={(ids) => setSelectedProducts(ids.map((id) => products[id]))}
  dataKey="id"
  tableStyle={{ textAlign: 'center' }}
  renderRowSubComponents={[
    (props) => (<Button>Button 1</Button>),
    (props) => (<Link>Link</Link>)
  ]}
  customHeaders={['Button', 'Link']}
  enablePagination={true}
/>
```