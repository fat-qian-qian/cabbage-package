import React from 'react';
import PropTypes from 'prop-types';

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
    tableStyle,
    thStyle,
    tdStyle,
    enableMultiSelect,
    onSelectedRowsChange,
    enablePagination,
    enableCaption,
    enableFilter,
    enableRowDoubleClick,
    enableFixedHeader,
    rowDoubleClickHandler,
    caption,
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

    const handleRowDoubleClick = React.useCallback((row) => {
        if (enableRowDoubleClick) {
            rowDoubleClickHandler(row);
        }
    }, [enableRowDoubleClick, rowDoubleClickHandler]);

    const [selectedRows, setSelectedRows] = React.useState([]); // Will hold the IDs of selected rows.
    const [selectAll, setSelectAll] = React.useState(false);   // For 'select all' functionality.

    const toggleRowSelect = React.useCallback(rowId => {
        setSelectedRows(prevRows => {
            let newSelectedRows;
            if (prevRows.includes(rowId)) {
                newSelectedRows = prevRows.filter(id => id !== rowId);
            } else {
                newSelectedRows = [...prevRows, rowId];
            }
            // Notify parent about the change
            onSelectedRowsChange && onSelectedRowsChange(newSelectedRows);
            return newSelectedRows;
        });
    }, [onSelectedRowsChange]);

    const toggleSelectAll = React.useCallback(() => {
        if (selectAll) {
            setSelectedRows([]);
            onSelectedRowsChange && onSelectedRowsChange([]);
        } else {
            const allRowIds = displayedRows.map(row => row.id);
            setSelectedRows(allRowIds);
            onSelectedRowsChange && onSelectedRowsChange(allRowIds);
        }
        setSelectAll(prev => !prev);
    }, [selectAll, displayedRows, onSelectedRowsChange]);

    const renderTableHeader = () => {
        return table.getHeaderGroups().map((headerGroup) => (
            <Tr
                key={headerGroup.id}
            >
                {enableMultiSelect && (
                    <Th
                        {...thStyle}
                        cursor={'pointer'}
                        onClick={toggleSelectAll}
                    >
                        <Flex
                            alignItems={'center'}
                            justifyContent={'center'}
                            position="relative"
                        >
                            <input
                                type="checkbox"
                                checked={selectAll}
                                readOnly
                            />
                        </Flex>
                    </Th>
                )}


                {headerGroup.headers.map((header) =>
                (<Th
                    {...thStyle}
                    key={header.id}
                    cursor={'pointer'}
                >

                    <Flex
                        alignItems={'center'}
                        justifyContent={'center'}
                        position="relative"
                    >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {!header.column.columnDef.render && enableFilter && (
                            <IconButton
                                aria-label="Sort"
                                icon={{
                                    desc: <ArrowDownIcon />,
                                    asc: <ArrowUpIcon />,
                                    false: <ArrowUpIcon opacity={0.5} />,
                                }[header.column.getIsSorted()]}
                                onClick={header.column.getToggleSortingHandler()}
                                size="xs"
                                colorScheme="black"
                                position="absolute"
                                right="0"
                            />
                        )}
                    </Flex>
                    {enableFilter && header.column.getCanFilter() && !header.column.columnDef.render ? (
                        <div>
                            <Filter column={header.column} table={table} />
                        </div>
                    ) : null}

                </Th>)
                )}
            </Tr>
        ))
    }

    return (
        <TableContainer
            maxH={'100%'}
            overflowY={'auto'}
        >
            <Table
                {...tableStyle}
            >
                {enableCaption && <Caption caption={caption} />}
                <Thead
                    position={enableFixedHeader ? "sticky" : "static"}
                    top="0"
                    zIndex="1"  // ensures the header stays above other rows
                >
                    {renderTableHeader()}
                </Thead>
                <Tbody>
                    {displayedRows.map((row) => (
                        <Tr
                            key={row.id}
                            _hover={{ bg: "gray.100" }}
                            onDoubleClick={() => handleRowDoubleClick(row)}
                        >
                            {enableMultiSelect && (
                                <Td
                                    {...tdStyle}
                                    cursor={'pointer'}
                                    onClick={() => toggleRowSelect(row.id)}
                                >
                                    <Flex
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        position="relative"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(row.id)}
                                            readOnly
                                        />
                                    </Flex>
                                </Td>
                            )}

                            {/* {row.getVisibleCells().map((cell) => (
                                <Td
                                    {...tdStyle}
                                    key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))} */}
                            {row.getVisibleCells().map((cell) => (
                                <Td {...tdStyle} key={cell.id}>
                                    {cell.column.columnDef.render
                                        ? cell.column.columnDef.render(data[row.id])
                                        : flexRender(cell.column.columnDef.cell, cell.getContext())
                                    }
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {enablePagination && <Pagination table={table} />}
        </TableContainer>
    );
};

const Caption = ({ caption }) => (
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
)

const Pagination = ({ table }) => (
    <Flex
        mt={4}
        textAlign={'center'}
        alignItems={'center'}
        justifyContent={'space-evenly'}
    >
        <PageShowSelector table={table} />
        <PageNavButtonGroup table={table} />
    </Flex>
)

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

DataTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    tableStyle: PropTypes.object,
    thStyle: PropTypes.object,
    tdStyle: PropTypes.object,
    enableMultiSelect: PropTypes.bool,
    onSelectedRowsChange: PropTypes.func,
    enablePagination: PropTypes.bool,
    enableCaption: PropTypes.bool,
    enableFilter: PropTypes.bool,
    enableRowDoubleClick: PropTypes.bool,
    rowDoubleClickHandler: PropTypes.func,
    caption: PropTypes.string,
    enableFixedHeader: PropTypes.bool,
};

DataTable.defaultProps = {
    tableStyle: {
        textAlign: "center",
        size: "sm",
        border: "1px",
        borderColor: "blackAlpha.900",
    },
    thStyle: {
        border: "1px",
        textAlign: "center",
        borderColor: "blackAlpha.900",
        bg: 'teal.400',
        color: 'white',
        fontSize: 'md',
    },
    tdStyle: {
        border: "1px",
        borderColor: "blackAlpha.900",
        textAlign: "center",
    },
    enableMultiSelect: false,
    enablePagination: false,
    enableCaption: false,
    enableFilter: false,
    enableRowDoubleClick: false,
    rowDoubleClickHandler: (row) => { alert(`Double Clicked Row ${row.id}`) },
    caption: "",
    enableFixedHeader: false,
};