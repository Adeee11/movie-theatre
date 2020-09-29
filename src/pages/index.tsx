import { Button, Input, Layout, Modal, notification, Select, Table } from "antd"
import { Link } from "gatsby"
import React, { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet"
import { callSQL } from "../components/callSQL"
import SEO from "../components/seo"
import { useMovies } from "../hooks"

const { Header, Content } = Layout
const { Option } = Select

const initializeData = () => {
  return new Promise((res, rej) => {
    if (!localStorage.getItem("theatre")) {
      localStorage.setItem("theatre", "initialized")
      const db = window.openDatabase("mydb", "1.0", "Test DB", 4 * 1024 * 1024)
      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Movie (Movie_Code not null primary key, Movie_Name,Rating,Language);"
        )
        tx.executeSql(
          'INSERT INTO Movie (Movie_Code, Movie_Name,Rating,Language) VALUES (1, "avengers","U","EN");'
        )
        tx.executeSql(
          'INSERT INTO Movie (Movie_Code, Movie_Name,Rating,Language) VALUES (2, "avatar","U/A","EN");'
        )
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Staff (Staff_ID  int(10) not null primary key,Salary int(15)  ,Department char(15) ,Staff_Name char(30) not null,Designation varchar(30) not null,Contact varchar(15) not null,Shift varchar(15) );"
        )
        tx.executeSql(
          'INSERT INTO Staff (Staff_ID,Salary,Department,Staff_Name,Designation,Contact,Shift) values(121,10000,"Ticket", "AAA","distributor","9876543210","First");'
        )
        tx.executeSql(
          "CREATE TABLE Screen (Screen_No int(15) not null primary key, Capacity int(4) not null, Screen_Size int(15) not null, Screen_Type ENUM(10),  Price int(5), Class ENUM(2), Staff_ID int(10));"
        )
        tx.executeSql(
          'INSERT INTO Screen (Screen_No, capacity,screen_size,Screen_type,Price,Class,Staff_ID) VALUES (1, 150,"70*50","2D",150,"First",121);'
        )
        tx.executeSql(
          'INSERT INTO Screen (Screen_No, capacity,screen_size,Screen_type,Price,Class,Staff_ID) VALUES (2, 150,"70*50","2D",150,"First",121);'
        )
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Screen_Movie (Movie_Code , Screen_No ,show_time,Availability , primary key (Movie_Code , Screen_No ,show_time)) ;"
        )
        tx.executeSql(
          'INSERT INTO Screen_Movie (Movie_Code, Screen_No ,show_time,Availability) VALUES (1,1, "02:00pm",149);'
        )
        tx.executeSql(
          'INSERT INTO Screen_Movie (Movie_Code, Screen_No ,show_time,Availability) VALUES (1,1, "06:00pm",149);'
        )
        tx.executeSql(
          'INSERT INTO Screen_Movie (Movie_Code, Screen_No ,show_time,Availability) VALUES (2,2, "03:00pm",149);'
        )
        tx.executeSql(
          'INSERT INTO Screen_Movie (Movie_Code, Screen_No ,show_time,Availability) VALUES (2,2, "07:00pm",149);'
        )
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Ticket ( Ticket_ID int(10) not null primary key,Seat_No varchar(15) not null,Count int(10),Movie_Code int(15) not null, Staff_ID int(10) not null,Screen_No int(10) not null);"
        )
        tx.executeSql('INSERT INTO Ticket values(1,"1",1,1,121,1);')
        tx.executeSql(
          "CREATE TABLE Viewers (Viewer_SNO int(10) not null primary key, Name char(20) not null, Contact int(15) not null, Ticket_ID int(10) not null );"
        )
        tx.executeSql(
          "create Table Ticket_Movie_Staff_Viewer(Ticket_ID , Movie_Code, Staff_ID, Viewer_SNO);"
        )
        tx.executeSql(
          "insert into Ticket_Movie_Staff_Viewer Values(1,1,121,1);"
        )
        tx.executeSql(
          "insert into Ticket_Movie_Staff_Viewer Values(2,1,121,2);"
        )
        tx.executeSql("create Table Screen_Staff(Screen_No,Staff_ID);")
        tx.executeSql("insert into Screen_Staff values(1,122);")
        tx.executeSql('INSERT INTO Movie (Movie_Code, Movie_Name,Rating,Language) VALUES (3,"Captain Marvel","U/A","EN");')
        tx.executeSql("INSERT INTO Movie (Movie_Code, Movie_Name,Rating,Language) VALUES (4, 'Dead Pool','U/A','EN');")
        tx.executeSql("INSERT INTO Movie (Movie_Code, Movie_Name,Rating,Language) VALUES (5, 'Black Panther','U/A','EN');")
        tx.executeSql("INSERT INTO Screen_Movie (Movie_Code, Screen_No ,show_time,Availability) VALUES (3,2, '09:00PM',149);")
        tx.executeSql("INSERT INTO Screen_Movie (Movie_Code, Screen_No ,show_time,Availability) VALUES (3,3, '01:00PM',149);")
        tx.executeSql("INSERT INTO Screen_Movie (Movie_Code, Screen_No ,show_time,Availability) VALUES (4,4, '03:00PM',149);")
        tx.executeSql("INSERT INTO Screen_Movie (Movie_Code, Screen_No ,show_time,Availability) VALUES (4,4, '09:00PM',149);")
        tx.executeSql("INSERT INTO Screen_Movie (Movie_Code, Screen_No ,show_time,Availability) VALUES (5,5, '11:00AM',149);")
        tx.executeSql("INSERT INTO Screen_Movie (Movie_Code, Screen_No ,show_time,Availability) VALUES (5,5, '07:00PM',149);")
        tx.executeSql("INSERT INTO Screen (Screen_No, capacity,screen_size,Screen_type,Price,Class,Staff_ID) VALUES (3, 150,'70*50','3D',150,'First',121);")
        tx.executeSql("INSERT INTO Screen (Screen_No, capacity,screen_size,Screen_type,Price,Class,Staff_ID) VALUES (4, 150,'70*50','3D',150,'First',121);")
        tx.executeSql("INSERT INTO Screen (Screen_No, capacity,screen_size,Screen_type,Price,Class,Staff_ID) VALUES (5, 150,'70*50','2D',150,'First',121);")
        res()
      }, rej)
    } else {
      res()
    }
  })
}

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
 
  const fetchAvailableMovies = async () => {
    const example = {
      Movie_Name: "avengers",
      show_time: "02:00",
      Availability: 149,
      Language: "EN",
    }
    const results: typeof example[] = await callSQL(
      "select Movie.Movie_Name,Screen_Movie.show_time,Screen_Movie.Availability,Movie.Language from (Movie INNER JOIN screen_movie ON Movie.Movie_Code=Screen_Movie.Movie_Code);"
    )
    setDataSource(
      results.map((item, i) => {
        return {
          key: i.toFixed(),
          language: item.Language,
          movie: item.Movie_Name,
          show: item.show_time,
          tickets: item.Availability,
        }
      })
    )
  }

  const [showTimes, setShowTimes] = useState<{ show_time: string }[]>([])
  const [availableTickets, setAvailableTickets] = useState(0)

  const fetchShowTimes = async (movieName: string) => {
    const data = await callSQL(
      `Select Show_Time from Screen_Movie where Movie_Code  = (select Movie_Code  from Movie where  Movie_Name = "${movieName}");`
    )

    setShowTimes(data)
  }
  const fetchAvailableTickets = async (movieName: string, show: string) => {
    const data = await callSQL(
      `select Availability from Screen_Movie where Movie_Code = (select Movie_Code from Movie where  Movie_Name = "${movieName}") and Show_Time = "${show}";`
    )
    if (data[0]) {
      setAvailableTickets(data[0].Availability)
    }
  }
  const [
    { contact, selectedMove, selectedShowTime, viewerName, tickets },
    setState,
  ] = useState({
    selectedMove: "",
    selectedShowTime: "",
    viewerName: "",
    contact: "",
    tickets: 0,
  })
  useEffect(() => {
    // initializeData()
    initializeData().then(() => {
      fetchAvailableMovies()
    })
  }, [])
  useEffect(() => {
    if (selectedMove && selectedShowTime) {
      fetchAvailableTickets(selectedMove, selectedShowTime)
    }
  }, [selectedMove, selectedShowTime])
  const { movies, fetchMoviesFromDb } = useMovies()
  const handleReservation = async () => {
    try {
      const result = await callSQL(
        "SELECT Viewer_SNO  FROM Viewers ORDER BY Viewer_SNO DESC LIMIT 1;"
      )
      console.log(result)
      let viewerId = 0
      if (result[0]) {
        viewerId = result[0].Viewer_SNO
      }
      const ticketRes = await callSQL(
        "Select Ticket_ID From Ticket ORDER BY Ticket_ID DESC LIMIT 1;"
      )

      let ticketId = 0
      if (result[0]) {
        ticketId = ticketRes[0].Ticket_ID
      }
      const newViewId = viewerId + 1
      const newticketId = ticketId + 1
      console.log(newViewId, viewerName, contact, newticketId)
      await callSQL(
        `Insert into Viewers values (${newViewId},"${viewerName}","${contact}", ${newticketId});`
      )
      await callSQL(
        `Insert into Ticket values (${newticketId}, ${newticketId}, ${tickets} ,(select Movie_Code from Movie where  Movie_Name = "${selectedMove}"), 1 ,(select Screen_No from Screen_Movie  where Movie_Code = (select Movie_Code  from Movie where  Movie_Name = "${selectedMove}") and Show_Time = "${selectedShowTime}")); `
      )
      await callSQL(`
      Update Screen_Movie set Availability = ((select Availability from Screen_Movie where Movie_Code = (select Movie_Code from Movie where  Movie_Name = "${selectedMove}") 
      and Show_Time = "${selectedShowTime}")- ${tickets}) where 
      Movie_Code = (select Movie_Code from Movie where  Movie_Name = "${selectedMove}") and 
      Show_Time = "${selectedShowTime}" ;
      `)
      await callSQL(`
      Insert into Ticket_Movie_Staff_Viewer values (${newticketId},(select Movie_Code  from Movie where  Movie_Name = "${selectedMove}"),1, ${newViewId})
      `)
      await fetchMoviesFromDb()
      await fetchAvailableMovies()
      Modal.success({
        title: "Reservation Successfull",
        content: (
          <p>We have sent the reservation info on your contact {contact}</p>
        ),
      })

      setState({
        contact: "",
        selectedMove: "",
        selectedShowTime: "",
        tickets: 0,
        viewerName: "",
      })
      setAvailableTickets(0)
    } catch (e) {
      Modal.error({
        title: "Reservation Failed",
        content: <p>Something Went Wront. Try again later</p>,
      })
      console.log(e)
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SEO title="Multiplex Management System" />
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
          className="site-layout-background d-flex justify-content-between align-items-center"
        >
          <h3 className="text-white">Multiplex Management System</h3>
          <Link className="text-white" to="/admin">
            Admin
          </Link>
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
                  value={selectedMove}
                  aria-autocomplete="none"
                  onChange={val => {
                    fetchShowTimes(val.toString())
                    setState(old => ({ ...old, selectedMove: val.toString() }))
                  }}
                  optionFilterProp="children"
                >
                  {movies &&
                    movies.map(item => {
                      return (
                        <Option key={item.Movie_Name} value={item.Movie_Name}>
                          {item.Movie_Name}
                        </Option>
                      )
                    })}
                </Select>
                <Input
                  className="mt-3"
                  onChange={e => {
                    const val = e.target.value
                    setState(old => ({ ...old, viewerName: val }))
                  }}
                  value={viewerName}
                  placeholder="Viewer Name"
                />
              </div>
              <div className="col-md-3">
                <Select
                  showSearch
                  className="w-100"
                  placeholder="Pick a Show"
                  aria-autocomplete="none"
                  value={selectedShowTime}
                  onChange={val => {
                    setState(old => ({
                      ...old,
                      selectedShowTime: val.toString(),
                    }))
                  }}
                  optionFilterProp="children"
                >
                  {showTimes.map((item, i) => {
                    return (
                      <Option key={i} value={item.show_time}>
                        {item.show_time}
                      </Option>
                    )
                  })}
                </Select>
                <Input
                  className="mt-3"
                  type="tel"
                  value={contact}
                  onChange={e => {
                    const val = e.target.value
                    setState(old => ({ ...old, contact: val }))
                  }}
                  placeholder="Contact"
                />
              </div>
              <div className="col-md-3">
                <div>
                  <Input
                    placeholder="Number of Ticker"
                    value={tickets}
                    onBlur={() => {
                      if (tickets > availableTickets) {
                        setState(old => ({ ...old, tickets: availableTickets }))
                      }
                    }}
                    max={availableTickets}
                    onChange={e => {
                      const val = e.target.value
                      setState(old => ({ ...old, tickets: parseInt(val) }))
                    }}
                    type="number"
                  />
                  {availableTickets > 0 &&
                    `Only ${availableTickets} tickets available`}
                </div>
                {tickets > 0 && <div>Amount Rs{tickets * 150}</div>}
              </div>
              <div className="col-md-3">
                <Button
                  onClick={handleReservation}
                  className="w-100"
                  type="primary"
                >
                  Reserve
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
