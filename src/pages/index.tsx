import { Button, Input, Layout, Select, Table } from "antd"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import SEO from "../components/seo"

const { Header, Content } = Layout
const { Option } = Select
function IndexPage() {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      movie: "Ready Player One",
      show: "3:30px",
      language: "English",
      tickets: 10,
    },
    {
      key: "2",
      show: "5:00pm",
      movie: "Fantastic Four",
      tickets: 9,
      language: "English",
    },
  ])

  const columns = [
    {
      title: "Movie Name",
      dataIndex: "movie",
      key: "movie",
    },

    {
      title: "Show Time",
      dataIndex: "show",
      key: "show",
    },
    {
      title: "AvailableTickets",
      dataIndex: "tickets",
      key: "tickets",
    },
    { title: "Language", dataIndex: "language", key: "language" },
  ]

  const [movies, setMovies] = useState<any []>([])

  const fetchMoviesFromDb = () => {
    const db = window.openDatabase("mydb", "1.0", "Test DB", 4 * 1024 * 1024)
    db.transaction(tx => {
      tx.executeSql("Select Movie_Name from Movie;", [], (tx, results) => {
        setDataSource(Object.values(results.rows) as any)
      })
    })
  }

  useEffect(() => {
    fetchMoviesFromDb();
  }, [])
  console.log(movies, "moveies")
  // useEffect(() => {
  //   const db = window.openDatabase("mydb", "1.0", "Test DB", 4 * 1024 * 1024)
  //   db.transaction(
  //     tx => {
  //       // tx.executeSql(
  //       //   "CREATE TABLE IF NOT EXISTS movie (movie_code unique, Movie_name,rating,Language)"
  //       // )
  //       // tx.executeSql(
  //       //   'INSERT INTO movie (movie_code, Movie_name,rating,Language) VALUES (3, "avengers","U","EN")'
  //       // )
  //       // tx.executeSql(
  //       //   'INSERT INTO movie (movie_code, Movie_name,rating,Language) VALUES (4, "avatar","U/A","EN")'
  //       // )
  //       // tx.executeSql(
  //       //   "CREATE TABLE IF NOT EXISTS screen (screen_number unique, capacity,screen_size,Screen_type)"
  //       // )
  //       // tx.executeSql(
  //       //   'INSERT INTO screen (screen_number, capacity,screen_size,Screen_type) VALUES (1, 150,"70*50","2D")'
  //       // )
  //       // tx.executeSql(
  //       //   'INSERT INTO screen (screen_number, capacity,screen_size,Screen_type) VALUES (2, 150,"70*50","2D")'
  //       // )
  //       tx.executeSql(
  //         "CREATE TABLE IF NOT EXISTS screen_movie (movie_code , screen_number ,show_time)"
  //       )
  //       tx.executeSql(
  //         'INSERT INTO screen_movie (movie_code, screen_number ,show_time) VALUES (1,1, "02:00")'
  //       )
  //       tx.executeSql(
  //         'INSERT INTO screen_movie (movie_code, screen_number ,show_time) VALUES (1,1, "06:00")'
  //       )
  //       tx.executeSql(
  //         'INSERT INTO screen_movie (movie_code, screen_number ,show_time) VALUES (2,2, "03:00")'
  //       )
  //       tx.executeSql(
  //         'INSERT INTO screen_movie (movie_code, screen_number ,show_time) VALUES (2,2, "07:00")'
  //       )
  //       tx.executeSql(
  //         "Select movie.Movie_Name as movie_name, Screen_movie.Screen_number as Screen_number , Screen_movie.show_time as show_time From (movie INNER JOIN Screen_movie on movie.Movie_Code = Screen_movie.Screen_number)",
  //         [],
  //         function (tx, results) {
  //           //  msg = "<p>Found rows: " + len + "</p>";
  //           //  document.querySelector('#status').innerHTML +=  msg;

  //           console.log(results)
  //         },
  //         null
  //       )
  //       // tx.executeSql(
  //       //   'INSERT INTO movie (movie_code, Movie_name,rating,Language) VALUES (1, "avatar”,”U/A”,”EN")'
  //       // )
  //     },
  //     er => {
  //       console.log(er)
  //     }
  //   )
  // }, [])
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SEO title="Moview Theatre" />
      <Helmet>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossOrigin="anonymous"
        />
      </Helmet>
      <Layout className="site-layout">
        <Header
          style={{ background: "#001529" }}
          className="site-layout-background d-flex align-items-center"
        >
          <h3 className="text-white">Movie Theatre</h3>
        </Header>
        <Content>
          <div className="container mt-3">
            <div className="row">
              <div className="col-12">
                <Table columns={columns} dataSource={dataSource}></Table>
              </div>
            </div>
            <div className="row py-4 bg-white">
              <div className="col-md-3">
                <Select
                  showSearch
                  className="w-100"
                  placeholder="Pick a Movie"
                  aria-autocomplete="none"
                  optionFilterProp="children"
                >
                  {movies &&
                    movies.map(item => {
                      return (
                        <Option value={item.Movie_name}>
                          {item.Movie_name}
                        </Option>
                      )
                    })}
                </Select>
                <Input className="mt-3" placeholder="Viewer Name" />
              </div>
              <div className="col-md-3">
                <Select
                  showSearch
                  className="w-100"
                  placeholder="Pick a Show"
                  aria-autocomplete="none"
                  optionFilterProp="children"
                >
                  <Option value="jack">2:00 pm</Option>
                  <Option value="lucy">3:00 pm</Option>
                </Select>
                <Input className="mt-3" placeholder="Contact" />
              </div>
              <div className="col-md-3">Amount</div>
              <div className="col-md-3">
                <Button className="w-100" type="primary">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default IndexPage
