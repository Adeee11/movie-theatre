import { Button, Input, Select, Table } from "antd"
import React from "react"
import { AdminLayout } from "../../components/AdminLayout"
import SEO from "../../components/seo"
const {Option} = Select;
export default function Movies() {
  const dataSource = [
    {
      key: "1",
      moviecode: "S1",
      movie: "Ready Player One",
      rating: 7.2,
      language: "English",
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
      moviecode: "S2",
      movie: "Fantastic Four",
      rating: 9,
      language: "English",
      edit: <a>Edit</a>,
      delete: <a>Delete</a>,
    },
  ]

  const columns = [
    {
      title: "Movie Code",
      dataIndex: "moviecode",
      key: "moviecode",
    },
    {
      title: "Movie Name",
      dataIndex: "movie",
      key: "movie",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
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
    <AdminLayout title="Movies">
      <SEO title="Manage Movies" />
      <Table dataSource={dataSource} columns={columns} />
      <div className="py-3 px-4 bg-white">
        <h4>Add a New Movie</h4>
        <div className="row">
          <div className="col-md-3">
            <Input placeholder="Movie Name" />
            <Input className="mt-2" placeholder="Movie Code" />
          </div>
          <div className="col-md-3">
            <Input placeholder="Rating" />
           
          </div>
          <div className="col-md-3">
            {/* <Input placeholder="Type" /> */}
            <Select
              showSearch
              className="w-100"
              placeholder="Select a Language"
              aria-autocomplete="none"
              optionFilterProp="children"
            >
              <Option value="English">English</Option>
              <Option value="Punjabi">Punjabi</Option>
            </Select>
          </div>
          <div className="col-md-3">
            <Button className="w-100" type="primary">
              Add Screen
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
