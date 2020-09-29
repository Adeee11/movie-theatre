import { AdminLayout } from "../../components/AdminLayout"
import React, { useEffect, useRef, useState } from "react"
import SEO from "../../components/seo"
import { Button, Input, Modal, Popconfirm, Select, Table } from "antd"
import { callSQL } from "../../components/callSQL"
import { useMovies, useScreens } from "../../hooks"
import { DeleteOutlined } from "@ant-design/icons"
const { Option } = Select

const InitialState = {
  selectedMovie: undefined,
  selectedShow: undefined,
  selectedScreen: undefined,
}
export default function SiderDemo() {
  const [dataSource, setDataSource] = useState([
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
  ])

  const fetchShows = async () => {
    const example = {
      Availability: 149,
      Movie_Name: "avatar",
      Screen_No: 2,
      Movie_Code: 2,
      show_time: "03:00",
    }
    const data: typeof example[] = await callSQL(`Select Screen_Movie.Screen_No , Movie.Movie_Name , Screen_Movie.Availability ,  Screen_Movie.Show_Time, Movie.Movie_Code From 
      (Screen_Movie inner join  Movie on Screen_Movie.Movie_Code = Movie.Movie_Code);`)
    setDataSource(
      data.map((item, i) => {
        return {
          key: i.toString(),
          delete: (
            <Popconfirm
              title="Are you sure？"
              onConfirm={handleDelete(
                item.Screen_No,
                item.show_time,
                item.Movie_Code
              )}
              okText="Yes"
              cancelText="No"
            >
              <a className="btn btn-link">Delete</a>
            </Popconfirm>
          ),
          edit: (
            <a
              className="btn btn-link"
              onClick={handleEdit(
                item.Screen_No,
                item.show_time,
                item.Movie_Name
              )}
            >
              Edit
            </a>
          ),
          movie: item.Movie_Name,
          screen: item.Screen_No.toString(),
          show: item.show_time,
          seats: item.Availability,
        }
      })
    )
  }
  const handleDelete = (
    screenNo: number,
    show: string,
    movieCode: number
  ) => async () => {
    console.log(screenNo, show, movieCode)
    try {
      await callSQL(
        `Delete FROM Screen_Movie where Show_Time="${show}" and Screen_No=${screenNo} and Movie_Code =${movieCode};`
      )
      await fetchShows()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchShows()
  }, [])
  const columns = [
    {
      title: "Screen No.",
      dataIndex: "screen",
      key: "screen",
    },
    {
      title: "Movie",
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
  const [isEdit, setIsEdit] = useState(false)
  const [state, setState] = useState({
    selectedMovie: undefined,
    selectedShow: undefined,
    selectedScreen: undefined,
  })

  const oldDataRef = useRef(InitialState)
  const handleAddition = async () => {
    if (isEdit) {
      if (state.selectedMovie && state.selectedScreen && state.selectedShow) {
        const index = dataSource.findIndex(item => {
          return (
            item.show === state.selectedShow &&
            item.screen === state.selectedScreen.toString()
          )
        })
        console.log(index, "index")
        if (index === -1) {
          await callSQL(
            `Update Screen_Movie set Movie_Code= ( select Movie_Code  from Movie where Movie_Name= "${state.selectedMovie}"), Show_Time= "${state.selectedShow}" where Screen_No=${oldDataRef.current.selectedScreen} and Movie_Code =( select Movie_Code  from Movie where Movie_Name= "${oldDataRef.current.selectedMovie}") and Show_Time= "${oldDataRef.current.selectedShow}";`
          )
          await fetchShows()
          setState(InitialState)
          oldDataRef.current = InitialState
          setIsEdit(false)
        } else {
          console.log("called")
          Modal.error({
            title: "A Movie with That show time and screen already exits",
          })
        }
      }
    } else {
      if (state.selectedMovie && state.selectedScreen && state.selectedShow) {
        const index = dataSource.findIndex(item => {
          return (
            item.show === state.selectedShow &&
            item.screen === state.selectedScreen.toString()
          )
        })
        if (index === -1) {
          await callSQL(
            `Insert into Screen_Movie values(  ( select Movie_Code  from Movie where Movie_Name= "${state.selectedMovie}") ,${state.selectedScreen}, "${state.selectedShow}", 150);`
          )
          setState({
            selectedMovie: undefined,
            selectedShow: undefined,
            selectedScreen: undefined,
          })
          await fetchShows()
        } else {
          Modal.error({
            title: "A Movie with That show time and screen already exits",
          })
        }
      }
    }
  }

  function handleEdit(screenNo: number, show: string, movie: string) {
    return () => {
      setIsEdit(true)
      const data = {
        selectedMovie: movie,
        selectedScreen: screenNo,
        selectedShow: show,
      }
      setState({
        selectedMovie: movie,
        selectedScreen: screenNo,
        selectedShow: show,
      })
      oldDataRef.current = data
    }
  }
  const { movies } = useMovies()
  const { screens } = useScreens()
  return (
    <AdminLayout title="Shows">
      <SEO title="Manage Shows" />
      <Table dataSource={dataSource} columns={columns} />
      <div className="py-3 px-4 bg-white">
        <h4>{isEdit ? "Editing Show" : "Add a New Show"} </h4>
        <div className="row">
          <div className="col-md-3">
            Screen No
            <Select
              showSearch
              className="w-100 "
              placeholder="Select a Screen"
              aria-autocomplete="none"
              disabled={isEdit}
              value={state.selectedScreen}
              onChange={val =>
                setState(old => ({ ...old, selectedScreen: val }))
              }
              optionFilterProp="children"
            >
              {screens.map(item => {
                return (
                  <Option key={item.Screen_No} value={item.Screen_No}>
                    {item.Screen_No}
                  </Option>
                )
              })}
            </Select>
          </div>
          <div className="col-md-3">
            Shows
            <Select
              showSearch
              className="w-100 "
              value={state.selectedShow}
              onChange={val => setState(old => ({ ...old, selectedShow: val }))}
              placeholder="Select a Show"
              aria-autocomplete="none"
              optionFilterProp="children"
            >
              {[
                "9:00AM",
                "11:00AM",
                "1:00PM",
                "3:00PM",
                "5:00PM",
                "6:00PM",
                "9:00PM",
                "11:00PM",
              ].map(show => {
                return (
                  <Option key={show} value={show}>
                    {show}
                  </Option>
                )
              })}
            </Select>
          </div>
          <div className="col-md-3">
            Movies
            <Select
              showSearch
              className="w-100"
              value={state.selectedMovie}
              onChange={val =>
                setState(old => ({ ...old, selectedMovie: val }))
              }
              placeholder="Select a Movie"
              aria-autocomplete="none"
              optionFilterProp="children"
            >
              {movies.map(item => {
                return (
                  <Option key={item.Movie_Name} value={item.Movie_Name}>
                    {item.Movie_Name}
                  </Option>
                )
              })}
            </Select>
          </div>
          <div className="col-md-3 d-flex">
            <Button onClick={handleAddition} className="w-100" type="primary">
              {isEdit ? "Update" : "Add Show"}
            </Button>
            {isEdit && (
              <Button
                onClick={() => {
                  setIsEdit(false)
                  setState({
                    selectedMovie: undefined,
                    selectedShow: undefined,
                    selectedScreen: undefined,
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
