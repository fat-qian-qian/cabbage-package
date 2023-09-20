import React from 'react';
import { Flex, Select, Text } from "@chakra-ui/react"


export const PageShowSelector = ({ table }) => {
    return (
        <Flex
            alignItems={'center'}
        >
            <Text mr={4}>每頁顯示</Text>
            <Select
                w={'auto'}
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        {pageSize}
                    </option>
                ))}
            </Select>
        </Flex>
    )
}