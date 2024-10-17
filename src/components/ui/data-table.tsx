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
import { PlusCircleIcon } from "@heroicons/react/24/solid"

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
                const isTopLevelHeader = header.depth == 1;
                const isLastColumn = index === headerGroup.headers.length - 1;
                const isEndingColumn = isTopLevelHeader || (header.depth == 2 && header.id.endsWith("dilution"));

                var className = "";

                // Add vertical diver between column groups
                if (!isLastColumn && isEndingColumn) {
                  className += borderClass;
                }

                // Add top-level header background
                // if (isTopLevelHeader) {
                //   className += ` bg-[hsl(var(--bg-secondary))] bg-slate-100`;
                // }
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={className}
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
                  return (
                    <TableCell key={cell.id} className={(!isLastColumn && cell.id.endsWith("dilution")) ? borderClass : ''}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div >
  )
}
