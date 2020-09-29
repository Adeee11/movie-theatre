import { Button, Input, Select, Table } from "antd"
import React, { useState } from "react"
import { AdminLayout } from "../../components/AdminLayout"
import { callSQL } from "../../components/callSQL"
import SEO from "../../components/seo"
const { Option } = Select
export default function Movies() {
  const [tickets, setTickets] = useState([])
  const fetchTickets = async () => {
    const data = await callSQL(`Select Movie.Movie_Name, (count(Screen_Movie.Availability)*150 - sum(Screen_Movie.Availability) ) ,(count(Screen_Movie.Availability)*150 - sum(Screen_Movie.Availability) )*150
    from (Movie inner join Screen_Movie on Movie.Movie_Code=Screen_Movie.Movie_Code) group by Movie.Movie_Code;`)
    setTickets(tickets)
  }

  const dataSource = [
    {
      key: "1",

      movie: "Ready Player One",
      tickets: 100,
      revenue: "$" + 100 * 15,
    },
    {
      key: "1",

      movie: "Fantastic Four",
      tickets: 20,
      revenue: "$" + 20 * 15,
    },
  ]

  const columns = [
    {
      title: "Movie Name",
      dataIndex: "movie",
      key: "movie",
    },
    {
      title: "Tickets Sold",
      dataIndex: "tickets",
      key: "tickets",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
    },
  ]

  return (
    <AdminLayout title="Tickets">
      <SEO title="Tickets Overview" />
      <Table dataSource={dataSource} columns={columns} />
    </AdminLayout>
  )
}
