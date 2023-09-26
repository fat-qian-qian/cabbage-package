import React from 'react';
import { Button, Flex, Icon, Input, NumberInput, NumberInputField } from "@chakra-ui/react"
import { MdSkipNext, MdSkipPrevious, MdNavigateNext, MdNavigateBefore } from 'react-icons/md'


export const PageNavButtonGroup = ({ table }) => {
    console.log(table.getCanNextPage())
    console.log(table.getCanPreviousPage())
    return (
        <Flex
            gap={0}
            w={'60%'}
            >
            <Button
                rounded={'full'}
                roundedRight={'none'}
                colorScheme={table.getCanPreviousPage() ? 'teal' : 'gray'}
                onClick={() => table.setPageIndex(0)}
                isDisabled={!table.getCanPreviousPage()}>
                <Icon as={MdSkipPrevious} />
            </Button>
            <Button
                rounded={'none'}
                colorScheme={table.getCanPreviousPage() ? 'teal' : 'gray'}
                onClick={() => {if (table.getCanPreviousPage()) table.previousPage()}}
                isDisabled={!table.getCanPreviousPage()}>
                <Icon as={MdNavigateBefore} />
            </Button>
            <NumberInput
                w={'5vw'}
                value={table.getState().pagination.pageIndex + 1}
                min={1}
                max={table.getPageCount()}
                onChange={(value) => table.setPageIndex(Number(value) - 1)}
            >
                <NumberInputField
                    w={'100%'}
                    borderRadius={'none'}
                    textAlign={'center'}
                    padding={0}
                    margin={0}
                />
            </NumberInput>
            <Input
                w={'5vw'}
                borderRadius={'none'}
                textAlign={'center'}
                value={` / ${table.getPageCount()} 頁`}
                isReadOnly
                bg={'gray.100'}
            />
        
            {/* <Select
                w={'auto'}
                onChange={(e) => table.setPageIndex(Number(e.target.value))}
            >
                {[...Array(table.getPageCount()).keys()].map((pageIndex) => (
                    <option key={pageIndex} value={pageIndex}>
                        {pageIndex + 1} / {table.getPageCount()} 頁
                    </option>
                ))}
            </Select> */}
            <Button
                rounded={'none'}
                colorScheme={table.getCanNextPage() ? 'teal' : 'gray'}
                onClick={() => {if (table.getCanNextPage()) table.nextPage()}}
                isDisabled={!table.getCanNextPage()}>
                <Icon as={MdNavigateNext} />
            </Button>
            <Button
                rounded={'full'}
                roundedLeft={'none'}
                colorScheme={table.getCanNextPage() ? 'teal' : 'gray'}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                isDisabled={!table.getCanNextPage()}>
                <Icon as={MdSkipNext} />
            </Button>
        </Flex>
    )
}