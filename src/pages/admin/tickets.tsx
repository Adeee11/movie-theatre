import { Button, Input, Select, Table } from "antd"
import React, { useEffect, useState } from "react"
import { AdminLayout } from "../../components/AdminLayout"
import { callSQL } from "../../components/callSQL"
import SEO from "../../components/seo"
const { Option } = Select
export default function Movies() {
  const [tickets, setTickets] = useState<
    { Count: number; Movie_Name: string; Revenue: number }[
    ]
  >([])
  const fetchTickets = async () => {
    const data = await callSQL(`Select Movie.Movie_Name, (count(Screen_Movie.Availability)*150 - sum(Screen_Movie.Availability) ) as Count ,(count(Screen_Movie.Availability)*150 - sum(Screen_Movie.Availability) )*150 as Revenue
    from (Movie inner join Screen_Movie on Movie.Movie_Code=Screen_Movie.Movie_Code) group by Movie.Movie_Code;`)

    setTickets(data)
  }
  useEffect(() => {
    fetchTickets()
  }, [])

 

  const columns = [
    {
      title: "Movie Name",
      dataIndex: "Movie_Name",
      key: "Movie_Name",
    },
    {
      title: "Tickets Sold",
      dataIndex: "Count",
      key: "Count",
    },
    {
      title: "Revenue",
      dataIndex: "Revenue",
      key: "Revenue",
    },
  ]

  return (
    <AdminLayout title="Tickets">
      <SEO title="Tickets Overview" />
      <Table dataSource={tickets.map(item => ({...item,Revenue: "Rs"+ item.Revenue}))} columns={columns} />
    </AdminLayout>
  )
}
