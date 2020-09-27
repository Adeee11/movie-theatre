import { AdminLayout } from "../../components/AdminLayout"
import React from "react"
import SEO from "../../components/seo"
import { Button, Input, Select, Table } from "antd"
const { Option } = Select
export default function SiderDemo() {
  const dataSource = [
    {
      key: "1",
      staffid: "1",
      staffname: "John Doe",
      department: "Tickets",
      designation: "Designation",
      shift: "9:00am-6:00pm",
      salary: "$25000",
      contact: "+1234567890",
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
      staffid: "2",
      staffname: "John Doe2 ",
      department: "Tickets",
      designation: "Designation",
      shift: "9:00am-6:00pm",
      salary: "$5000",
      contact: "+1234567890",
      edit: <a>Edit</a>,
      delete: <a>Delete</a>,
    },
  ]

  const columns = [
    {
      title: "Staff Id",
      dataIndex: "staffid",
      key: "staffid",
    },
    {
      title: "Staff Name",
      dataIndex: "staffname",
      key: "staffname",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },

    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
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
    <AdminLayout title="Staff">
      <SEO title="Manage Staff" />
      <Table dataSource={dataSource} columns={columns} />
      <div className="py-3 px-4 bg-white">
        <h4>Add New Staff</h4>
        <div className="row">
          <div className="col-md-3">
            <Input placeholder="Staff Name" />
            <Input className="mt-3" placeholder="Department" />
          </div>
          <div className="col-md-3">
            <Input placeholder="Designation" />
            <Input className="mt-3" placeholder="Salary" />
          </div>
          <div className="col-md-3">
            <Input placeholder="Contact" />
            <Select
              showSearch
              className="w-100 mt-3"
              placeholder="Select a Shift"
              aria-autocomplete="none"
              optionFilterProp="children"
            >
              <Option value="jack">Day Shift</Option>
              <Option value="lucy">Night Shift</Option>
            </Select>
          </div>
          <div className="col-md-3">
            <Button className="w-100" type="primary">
              Add Staff
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
