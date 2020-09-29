import { AdminLayout } from "../../components/AdminLayout"
import React, { useState } from "react"
import SEO from "../../components/seo"
import { Button, Input, Popconfirm, Select, Table, Modal } from "antd"
import { useStaff } from "../../hooks"
import { callSQL } from "../../components/callSQL"

const { Option } = Select
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

export default function SiderDemo() {
  const { staff, fetchstaffFromDb } = useStaff()

  const dataSource = [
    {
      key: "1",
      staffid: 1,
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
      staffid: 2,
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
  const newSource: typeof dataSource = staff.map((item, i) => {
    return {
      contact: item.Contact,
      department: item.Department,
      designation: item.Designation,
      salary: "$" + item.Salary,
      shift: item.Shift,
      key: i.toString(),
      staffid: item.Staff_ID,
      staffname: item.Staff_Name,
      edit: (
        <a className="btn btn-link" onClick={handleEdit(item.Staff_ID)}>
          Edit
        </a>
      ),
      delete: (
        <Popconfirm
          title="Are you sure?"
          onConfirm={handleDelete(item.Staff_ID)}
          okText="Yes"
          cancelText="No"
        >
          <a className="btn btn-link">Delete</a>
        </Popconfirm>
      ),
    }
  })

  const [isEdit, setIsEdit] = useState(false)

  function handleDelete(staffId: number) {
    return async () => {
      await callSQL(`Delete From staff where Staff_ID=${staffId};`)
      await fetchstaffFromDb()
    }
  }
  const [state, setState] = useState({
    staffId: undefined,
    name: undefined,
    department: undefined,
    salary: undefined,
    contact: undefined,
    shift: undefined,
    designation: undefined,
  })
  function handleEdit(staffId: number) {
    return () => {
      setIsEdit(true)
      const staffIndex = staff.findIndex(item => item.Staff_ID === staffId)
      if (staffIndex > -1) {
        const staffPerson = staff[staffIndex]
        setState({
          staffId: staffId,
          contact: staffPerson.Contact,
          department: staffPerson.Department,
          designation: staffPerson.Designation,
          name: staffPerson.Staff_Name,
          salary: staffPerson.Salary,
          shift: staffPerson.Shift,
        })
      }
    }
  }
  const handleChange = (key: keyof typeof state) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value
    setState(old => ({ ...old, [key]: val }))
  }
  const addorEdit = async () => {
    if (!isEdit) {
      if (
        state.contact &&
        state.department &&
        state.designation &&
        state.name &&
        state.salary &&
        state.shift
      ) {
        const LastCode = staff[staff.length - 1].Staff_ID
        const newCode = LastCode + 1
        try {
          await callSQL(
            `Insert into Staff values(${newCode},${parseInt(state.salary)},"${
              state.department
            }","${state.name}","${state.designation}",${parseInt(
              state.contact
            )},"${state.shift}");`
          )
          fetchstaffFromDb()
          setState({
            staffId: undefined,
            name: undefined,
            department: undefined,
            salary: undefined,
            contact: undefined,
            shift: undefined,
            designation: undefined,
          })
        } catch (e) {
          console.log(e)
          Modal.error({ title: "An Error Occured. Please Try Again" })
        }
      }
    } else {
      if (
        state.contact &&
        state.department &&
        state.designation &&
        state.name &&
        state.salary &&
        state.shift
      ) {
        try {
          await callSQL(
            `Update Staff set Staff_Name= "${state.name}", Department="${
              state.department
            }",Designation="${state.designation}",Salary=${parseInt(
              state.salary
            )}, Shift="${state.shift}", Contact=${parseInt(
              state.contact
            )} where Staff_ID=${state.staffId};
            `
          )
          fetchstaffFromDb()
          setState({
            staffId: undefined,
            name: undefined,
            department: undefined,
            salary: undefined,
            contact: undefined,
            shift: undefined,
            designation: undefined,
          })
          setIsEdit(false)
        } catch (e) {
          console.log(e)
          Modal.error({ title: "An Error Occured. Please Try Again" })
        }
      }
    }
  }

  return (
    <AdminLayout title="Staff">
      <SEO title="Manage Staff" />
      <Table dataSource={newSource} columns={columns} />
      <div className="py-3 px-4 bg-white">
        <h4>{isEdit ? "Editing" : "Add New Staff"}</h4>
        <div className="row">
          <div className="col-md-3">
            <Input
              value={state.name}
              onChange={handleChange("name")}
              placeholder="Staff Name"
            />
            <Input
              value={state.department}
              onChange={handleChange("department")}
              className="mt-3"
              placeholder="Department"
            />
          </div>
          <div className="col-md-3">
            <Input
              value={state.designation}
              onChange={handleChange("designation")}
              placeholder="Designation"
            />
            <Input
              value={state.salary}
              onChange={handleChange("salary")}
              className="mt-3"
              placeholder="Salary"
            />
          </div>
          <div className="col-md-3">
            <Input
              value={state.contact}
              onChange={handleChange("contact")}
              placeholder="Contact"
            />
            <Select
              showSearch
              value={state.shift}
              onChange={val => {
                setState(old => ({ ...old, shift: val }))
              }}
              className="w-100 mt-3"
              placeholder="Select a Shift"
              aria-autocomplete="none"
              optionFilterProp="children"
            >
              <Option value="Day">Day Shift</Option>
              <Option value="Night">Night Shift</Option>
            </Select>
          </div>
          <div className="col-md-3">
            <Button onClick={addorEdit} className="w-100" type="primary">
              {isEdit ? "Update" : "Add Staff"}
            </Button>
            {isEdit && (
              <Button
                onClick={() => {
                  setIsEdit(false)
                  setState({
                    staffId: undefined,
                    name: undefined,
                    department: undefined,
                    salary: undefined,
                    contact: undefined,
                    shift: undefined,
                    designation: undefined,
                  })
                }}
                className="w-100"
                type="primary"
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
