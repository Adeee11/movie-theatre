import React from "react"
import { useTable } from "react-table"

export function AvailableShows() {
  const data = React.useMemo(
    () => [
      {
        col1: "A movie",
        col2: "2:00 pm, 8:00pm",
      },
      {
        col1: "Movie 2",
        col2: "1:00 pm",
      },
      {
        col1: "Movie 3",
        col2: "3:00 pm",
      },
    ],
    []
  )

  const columns: any = React.useMemo(
    () => [
      {
        Header: "Movie",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Show Times",
        accessor: "col2",
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()} >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
