import React, { useEffect, useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  GroupingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = useState(data)
  const [grouping, setGrouping] = React.useState<GroupingState>([])

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getCoreRowModel: getCoreRowModel(),
  })

  const borderClass = `border-r border-solid border-[hsl(var(--border))]`

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                const isLastColumn = index === headerGroup.headers.length - 1;
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={
                      !isLastColumn && (header.depth == 1 || (header.depth == 2 && header.id.endsWith("funding-rounds")))
                        ? borderClass
                        : ""
                    }
                  >
                    {
                      header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                    }
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, index) => {
                  const isLastColumn = index === row.getVisibleCells().length - 1;
                  console.log('cell', cell)
                  return (
                    <TableCell key={cell.id} className={(!isLastColumn && cell.id.endsWith("funding-rounds")) ? borderClass : ''}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div >
  )
}
