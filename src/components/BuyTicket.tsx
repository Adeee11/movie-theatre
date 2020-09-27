import produce from "immer"
import React, { useMemo, useState } from "react"
import { Provider } from "react-redux"

const createArrFromCount = (num: number) => {
  const arr: number[] = []
  for (let i = 1; i <= num; i++) {
    arr.push(i)
  }
  return arr
}

const pricePerTicker = 10
export default function BuyTicket() {
  const [selectedMovie, setSelectedMovie] = useState("")
  const [selectedShow, setSelectedShow] = useState("")
  const [tickets, setTickets] = useState(0)
  const [viewerName, setViewerName] = useState("")
  const [contact, setContact] = useState("")
  const state = {
    movies: [
      {
        name: "Movie One",
        showTimes: [
          { time: "3:00pm", tickets: 15 },
          { time: "4:00pm", tickets: 10 },
        ],
      },
      {
        name: "Movie two",
        showTimes: [
          { time: "3:00pm", tickets: 5 },
          { time: "4:00pm", tickets: 10 },
        ],
      },
    ],
  }
  const getSelectedMovie = (name: string) => {
    const index = state.movies.findIndex(item => item.name === name)
    if (index > -1) {
      return state.movies[index]
    }
    return null
  }
  const getSelectedShow = (time: string) => {
    const moview = getSelectedMovie(selectedMovie)
    if (moview) {
      const showIndex = moview.showTimes.findIndex(item => item.time == time)
      if (showIndex > -1) {
        return moview.showTimes[showIndex]
      }
    }
    return null
  }

  const availableShowTimes = useMemo(() => {
    const shows: { time: string; tickets: number }[] = []
    const selectedMoview = getSelectedMovie(selectedMovie)
    if (selectedMoview) {
      shows.push(...selectedMoview.showTimes)
    }
    return shows
  }, [selectedMovie])

  const availableTickets = useMemo(() => {
    const show = getSelectedShow(selectedShow)
    if (show) {
      return show.tickets
    }
    return 0
  }, [selectedShow])

  return (
    <>
      <div className="container">
        <h1>Buy Tickets</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Pick A Movie</label>
              <select
                onChange={e => {
                  setSelectedMovie(e.target.value)
                  setSelectedShow("")
                  setTickets(0);
                }}
                className="form-control"
              >
                <option selected={!selectedMovie}>Choose...</option>
                {state.movies.map(item => {
                  return (
                    <option
                      selected={selectedMovie === item.name}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Pick a Show Time</label>
              <select
                onChange={e => {
                  setSelectedShow(e.target.value)
                }}
                className="form-control"
              >
                <option selected>Choose...</option>
                {availableShowTimes.map(show => {
                  return (
                    <option
                      selected={selectedShow === show.time}
                      value={show.time}
                    >
                      {show.time}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>
                Enter Tickets{" "}
                {availableTickets > 0 && `Max(${availableTickets})`}
              </label>
              <input
                className="form-control"
                min={1}
                onBlur={() => {
                  if(tickets > availableTickets){
                    setTickets(availableTickets);
                  }
                }}
                onChange={e => setTickets(parseInt(e.target.value))}
                type="number"
                disabled={availableTickets === 0}
                value={tickets}
                max={availableTickets}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Viewer Name</label>
              <input
                className="form-control"
                placeholder={"Enter Your name"}
                onChange={e => setViewerName(e.target.value)}
                type="text"
                value={viewerName}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Contact</label>
              <input
                placeholder={"+1234567890"}
                className="form-control"
                onChange={e => setContact(e.target.value)}
                type="text"
                value={contact}
              />
            </div>
          </div>

          <div className="col-md-4">
            {tickets > 0 && (
              <div className="d-flex align-items-center justify-content-between">
                <div className="form-group">
                  <label>Total Amount</label>
                  <p>${tickets * pricePerTicker} </p>
                </div>
                <button className="btn btn-success">Buy Now</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
