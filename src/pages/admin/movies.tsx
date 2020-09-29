import { Button, Input, Modal, Popconfirm, Select, Table } from "antd"
import React, { useState } from "react"
import { AdminLayout } from "../../components/AdminLayout"
import { callSQL } from "../../components/callSQL"
import SEO from "../../components/seo"
import { useMovies } from "../../hooks"
const { Option } = Select
export default function Movies() {
  const { movies, fetchMoviesFromDb } = useMovies()

  const dataSource = [
    {
      key: "1",
      moviecode: "S1",
      movie: "Ready Player One",
      rating: "7.2",
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
      rating: "9",
      language: "English",
      edit: <a>Edit</a>,
      delete: <a>Delete</a>,
    },
  ]

  const handleDelete = (movieName: string) => async () => {
    try {
      await callSQL(
        ` Delete from Screen_Movie where Movie_Code =( select Movie_Code  from Movie where Movie_Name= "${movieName}") ;`
      )
      await callSQL(`Delete from Movie where Movie_Code = ( select Movie_Code  from Movie where Movie_Name= "${movieName}") ;
      `)
      fetchMoviesFromDb()
    } catch (e) {
      Modal.error({ title: "An Error Occured. Please Try Again" })
    }
  }

  const newSource: typeof dataSource = movies.map((item, i) => {
    return {
      rating: item.Rating,
      key: i.toString(),
      language: item.Language,
      movie: item.Movie_Name,
      moviecode: item.Movie_Code.toString(),
      edit: (
        <a
          className="btn btn-link"
          onClick={handleEdit(item.Movie_Code.toString())}
        >
          Edit
        </a>
      ),
      delete: (
        <Popconfirm
          title="Are you sure？This Will Delete All Shows Well"
          onConfirm={handleDelete(item.Movie_Name)}
          okText="Yes"
          cancelText="No"
        >
          <a className="btn btn-link">Delete</a>
        </Popconfirm>
      ),
    }
  })

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

  const [state, setState] = useState({
    movieCode: undefined,
    movieName: undefined,
    rating: undefined,
    language: undefined,
  })
  const [isEdit, setEdit] = useState(false)

  function handleEdit(movieCode: string) {
    return () => {
      const index = movies.findIndex(
        item => item.Movie_Code.toString() === movieCode
      )
      if (index > -1) {
        const movie = movies[index]
        setState({
          movieCode: movie.Movie_Code,
          language: movie.Language,
          movieName: movie.Movie_Name,
          rating: movie.Rating,
        })
        setEdit(true)
      }
    }
  }

  const handleChange = (key: keyof typeof state) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value
    setState(old => ({ ...old, [key]: val }))
  }

  const addOREdit = async () => {
    if (!isEdit) {
      if (state.language && state.movieName && state.rating) {
        const LastCode = movies[movies.length - 1].Movie_Code
        const newCode = LastCode + 1
        try {
          await callSQL(`Insert into Movie values(${newCode}, "${state.movieName}","${state.rating}","${state.language}");
          `)
          fetchMoviesFromDb()
          setState({
            movieName: undefined,
            rating: undefined,
            language: undefined,
            movieCode: undefined,
          })
        } catch (e) {
          console.log(e)
          Modal.error({ title: "An Error Occured. Please Try Again" })
        }
      }
    } else {
      if (state.language && state.movieName && state.rating) {
        try {
          await callSQL(
            `Update Movie set Movie_Name = "${state.movieName}" , Rating = "${state.rating}" , Language = "${state.language}" where Movie_Code=${state.movieCode};`
          )
          fetchMoviesFromDb()
          setState({
            movieName: undefined,
            rating: undefined,
            language: undefined,
            movieCode: undefined,
          })
          setEdit(false)
        } catch (e) {
          console.log(e)
          Modal.error({ title: "An Error Occured. Please Try Again" })
        }
      }
    }
  }

  return (
    <AdminLayout title="Movies">
      <SEO title="Manage Movies" />
      <Table dataSource={newSource} columns={columns} />
      <div className="py-3 px-4 bg-white">
        <h4>{isEdit ? "Editing" : "Add a New Movie"}</h4>
        <div className="row">
          <div className="col-md-3">
            Movie Name
            <Input
              value={state.movieName}
              onChange={handleChange("movieName")}
              placeholder="Movie Name"
            />
          </div>
          <div className="col-md-3">
            Rating
            <Input
              value={state.rating}
              onChange={handleChange("rating")}
              placeholder="Rating"
            />
          </div>
          <div className="col-md-3">
            Language
            <Select
              showSearch
              onChange={val => setState(old => ({ ...old, language: val }))}
              value={state.language}
              className="w-100"
              placeholder="Select a Language"
              aria-autocomplete="none"
              optionFilterProp="children"
            >
              {["EN", "FR", "PB", "HI"].map(lang => {
                return <Option value={lang}>{lang}</Option>
              })}
            </Select>
          </div>
          <div className="col-md-3 d-flex pt-3">
            <Button onClick={addOREdit} className="w-100" type="primary">
              {isEdit ? "Update" : "Add Movie"}
            </Button>
            {isEdit && (
              <Button
                onClick={() => {
                  setEdit(false)
                  setState({
                    movieName: undefined,
                    rating: undefined,
                    language: undefined,
                    movieCode: undefined,
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
