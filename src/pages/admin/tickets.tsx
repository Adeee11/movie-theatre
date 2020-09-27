import { Button, Input, Select, Table } from "antd"
import React from "react"
import { AdminLayout } from "../../components/AdminLayout"
import SEO from "../../components/seo"
const { Option } = Select
export default function Movies() {
  const dataSource = [
    {
      key: "1",

      movie: "Ready Player One",
      tickets: 100,
      revenue: "$"+ 100 * 15,
    },
    {
      key: "1",

      movie: "Fantastic Four",
      tickets: 20,
      revenue: "$" +20 * 15,
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
