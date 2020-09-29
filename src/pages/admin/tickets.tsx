import { Button, Input, Select, Table } from "antd"
import React from "react"
import { AdminLayout } from "../../components/AdminLayout"
import { callSQL } from "../../components/callSQL"
import SEO from "../../components/seo"
const { Option } = Select
export default function Movies() {

  const fetchTickets = async () => {
    await callSQL(`Select Movie.Movie_Name, (((Select count(Movie_Code) from Screen_Movie where 
    Movie_Code=(select Movie_Code  from Movie where Movie_Name= "avatar") group by Movie_Code )*150)) - (Select sum(Availability) from Screen_Movie where 
    Movie_Code=(select Movie_Code  from Movie where Movie_Name= "avatar") group by Movie_code) ,  ((((Select count(Movie_Code) from Screen_Movie where 
    Movie_Code=(select Movie_Code  from Movie where Movie_Name= "avatar") group by Movie_Code )*150)) - (Select sum(Availability) from Screen_Movie where 
    Movie_Code=(select Movie_Code  from Movie where Movie_Name= "avatar") group by Movie_code) )* 150 from Movie;`)
  }

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
