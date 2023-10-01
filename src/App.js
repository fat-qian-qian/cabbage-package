import * as React from 'react'

// 1. import `ChakraProvider` component
import { Button, ChakraProvider } from '@chakra-ui/react'
import { DataTable } from './DataTable';
import { Flex, Center } from "@chakra-ui/react"

function App() {
  const columns = [
    { header: 'Code', accessorKey: 'code' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Number', accessorKey: 'num' },
    {
      header: 'Action',
      accessorKey: 'action',
      render: (rowData) => <Button
        onClick={() => {
          alert(`Editing ${rowData.name}!`)
        }}
      >{rowData.action}</Button>
    },
    // ... more columns
  ];

  const data = [
    { id: 1, code: 'A1', name: 'Apple', num: 1, action: 'Edit' },
    { id: 2, code: 'B1', name: 'Banana', num: 2, action: 'Edit' },
    { id: 3, code: 'C1', name: 'Cherry', num: 3, action: 'Edit' },
    { id: 4, code: 'D1', name: 'Durian', num: 4, action: 'Edit' },
    { id: 5, code: 'E1', name: 'Elderberry', num: 5, action: 'Edit' },
    { id: 6, code: 'F1', name: 'Fig', num: 6, action: 'Edit' },
    { id: 7, code: 'G1', name: 'Grape', num: 7, action: 'Edit' },
    { id: 8, code: 'H1', name: 'Honeydew melon', num: 8, action: 'Edit' },
    { id: 9, code: 'I1', name: 'Ice cream Bean', num: 9, action: 'Edit' },
    { id: 10, code: 'J1', name: 'Jackfruit', num: 10, action: 'Edit' },
    { id: 11, code: 'K1', name: 'Kiwi', num: 11, action: 'Edit' },
    { id: 12, code: 'L1', name: 'Lemon', num: 12, action: 'Edit' },
  ];

  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Center>
        <Flex>
          <DataTable
            columns={columns}
            data={data}
            enablePagination={true}
            enableFilter={true}
            enableRowDoubleClick={true}
            enableMultiSelect={true}
            onSelectedRowsChange={(selectedRows) => {
              console.log(selectedRows);
            }}
          />
        </Flex>
      </Center>
    </ChakraProvider>
  )
}

export default App