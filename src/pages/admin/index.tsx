import { AdminLayout } from "../../components/AdminLayout"
import React from "react"
import SEO from "../../components/seo"
import { Button, Input, Select, Table } from "antd"
const { Option } = Select
export default function SiderDemo() {
  const dataSource = [
    {
      key: "1",
      screen: "S1",
      movie: "Ready Player One",
      seats: 10,
      show: "8:00pm",
      edit: (
        <a
          onClick={() => {
            alert("hello")
          }}
        >
          Edit
        </a>
      ),
      delete: <a>Delete</a>,
    },
    {
      key: "2",
      screen: "S2",
      movie: "Fantastic Four",
      seats: 30,
      show: "2:00pm",
      edit: <a>Edit</a>,
      delete: <a>Delete</a>,
    },
  ]

  const columns = [
    {
      title: "Screen No.",
      dataIndex: "screen",
      key: "screen",
    },
    {
      title: "Moview",
      dataIndex: "movie",
      key: "movie",
    },
    {
      title: "Seats Left",
      dataIndex: "seats",
      key: "seats",
    },
    {
      title: "Show Time",
      dataIndex: "show",
      key: "show",
    },

    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
    },
  ]

  return (
    <AdminLayout title="Screens">
      <SEO title="Manage Screens" />
      <Table dataSource={dataSource} columns={columns} />
      <div className="py-3 px-4 bg-white">
        <h4>Add a New Screen</h4>
        <div className="row">
          <div className="col-md-3">
            <Input placeholder="Screen Name" />
            <Input className="mt-3" placeholder="Capacity" />
          </div>
          <div className="col-md-3">
            <Input placeholder="Show Time" />
            <Input className="mt-3" placeholder="Size" />
          </div>
          <div className="col-md-3">
            <Input placeholder="Type" />
            <Select
                
              showSearch
              className="w-100 mt-3"
              placeholder="Select a Movie"
              aria-autocomplete="none"
              optionFilterProp="children"
            >
              <Option value="jack">Fantastic Four</Option>
              <Option value="lucy">Ready Player one</Option>

            </Select>
          </div>
          <div className="col-md-3">
            <Button className="w-100" type="primary">Add Screen</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
