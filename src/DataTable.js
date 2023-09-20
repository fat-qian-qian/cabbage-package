import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    TableCaption,
    Flex,
    Input,
    IconButton
} from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { PageShowSelector } from './components/PageShowSelector';
import { PageNavButtonGroup } from './components/PageNavButtonGroup';



export const DataTable = ({
    columns,
    data,
    tableStyle = {
        textAlign: "center",
        size: "sm",
        border: "1px",
        borderColor: "blackAlpha.900",
    },
    thStyle = {
        border: "1px",
        textAlign: "center",
        borderColor: "blackAlpha.900",
        bg: 'teal.400',
        color: 'white',
        fontSize: 'md',
    },
    tdStyle = {
        border: "1px",
        borderColor: "blackAlpha.900",
        textAlign: "center",
    },
    renderRowSubComponents = [],
    customHeaders = [],
    enablePagination = false,
    enableCaption = false,
    enableFilter = false,
    enableRowDoubleClick = false,
    rowDoubleClickHandler = (row) => { alert(`Double Clicked Row ${row.id}`) },
    caption = "",
}) => {
    const [sorting, setSorting] = React.useState([]); // { columnId: 'asc' | 'desc' }
    const table = useReactTable({
        columns,
        data,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    const displayedRows = enablePagination ? table.getPaginationRowModel().rows : table.getCoreRowModel().rows;

    return (
        <TableContainer>
            <Table
                {...tableStyle}
            >
                {enableCaption && (
                    <TableCaption
                        placement="top"
                        bg={"blackAlpha.900"}
                        color={"white"}
                        fontSize={"md"}
                        p={3}
                        mt={0}
                    >
                        {caption}
                    </TableCaption>
                )}
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr>
                            {headerGroup.headers.map((header) =>
                            (<Th
                                {...thStyle}
                                key={header.id}
                                cursor={'pointer'}
                                onClick={header.column.getToggleSortingHandler()}
                            >

                                <Flex
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    position="relative"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    <IconButton
                                        aria-label="Sort"
                                        icon={
                                            {
                                                desc: <ArrowDownIcon />,
                                                asc: <ArrowUpIcon />,
                                                false: <ArrowUpIcon opacity={0.5} />,
                                            }[header.column.getIsSorted()]
                                        }
                                        size="xs"
                                        colorScheme="black"
                                        position="absolute"
                                        right="0"   // or adjust as needed to position the button
                                    />
                                </Flex>
                                {enableFilter && header.column.getCanFilter() ? (
                                    <div>
                                        <Filter column={header.column} table={table} />
                                    </div>
                                ) : null}

                            </Th>)
                            )}



                            {customHeaders.map((header, index) => (
                                <Th {...thStyle} key={`custom-header-${index}`}>{header}</Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {displayedRows.map((row) => (
                        <Tr
                            key={row.id}
                            _hover={{ bg: "gray.100" }}
                            onDoubleClick={() => {
                                if (enableRowDoubleClick) {
                                    rowDoubleClickHandler(row);
                                }
                            }}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <Td
                                    {...tdStyle}
                                    key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))}
                            {renderRowSubComponents.map((renderRowSubComponent) => (
                                <Td
                                    {...tdStyle}
                                >{renderRowSubComponent(row)}</Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {enablePagination && (
                <Flex
                    mt={4}
                    textAlign={'center'}
                    alignItems={'center'}
                    justifyContent={'space-evenly'}
                >
                    <PageShowSelector table={table} />
                    <PageNavButtonGroup table={table} />
                </Flex>
            )}
        </TableContainer>
    );
};

function Filter({
    column,
    table,
}) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    return typeof firstValue === 'number' ? (
        <Flex
            w={'100%'}
        >
            <Input
                size="sm"
                mt={2}
                focusBorderColor={'#0044BB'}
                textAlign={'center'}
                bg={'white'}
                textColor={'black'}
                p={0}
                value={column.getFilterValue()?.[0] ?? ''}
                onChange={e => {
                    column.setFilterValue((old) => [e.target.value, old?.[1]])
                    column.setFilterValue((old) => [old?.[0], e.target.value])
                }
                }
                placeholder={`最小值`}
            />
        </Flex>
    ) : (
        <Input
            size="sm"
            mt={2}
            focusBorderColor={'#0044BB'}
            textAlign={'center'}
            bg={'white'}
            textColor={'black'}
            p={0}
            value={(column.getFilterValue() ?? '')}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`輸入以查詢`}
        />
    )
}
