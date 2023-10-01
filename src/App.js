import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import { DataTable } from './DataTable';
import { Flex, Center } from "@chakra-ui/react"

function App() {
  const columns = [
    { header: 'Code', accessorKey: 'code' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Number', accessorKey: 'num' },
    // ... more columns
  ];

  const data = [
    { id: 1, code: 'A1', name: 'Apple', num: 1 },
    { id: 2, code: 'B1', name: 'Banana', num: 2 },
    { id: 3, code: 'C1', name: 'Cherry', num: 3 },
    { id: 4, code: 'D1', name: 'Durian', num: 4},
    { id: 5, code: 'E1', name: 'Elderberry', num: 5},
    { id: 6, code: 'F1', name: 'Fig', num: 6},
    { id: 7, code: 'G1', name: 'Grape', num: 7},
    { id: 8, code: 'H1', name: 'Honeydew melon', num: 8},
    { id: 9, code: 'I1', name: 'Ice cream Bean', num: 9},
    { id: 10, code: 'J1', name: 'Jackfruit', num: 10},
    { id: 11, code: 'K1', name: 'Kiwi', num: 11},
    { id: 12, code: 'L1', name: 'Lemon', num: 12},
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
            } }
        />
        </Flex>
        </Center>
    </ChakraProvider>
  )
}

export default App