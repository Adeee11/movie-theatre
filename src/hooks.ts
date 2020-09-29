import { useEffect, useState } from "react"
import { callSQL } from "./components/callSQL"

export const useMovies = () => {
    const [movies, setMovies] = useState<{
        Language: string
        Movie_Code: number
        Movie_Name: string
        Rating: string
    }[]>([])
    const fetchMoviesFromDb = async () => {
        const data = await callSQL("SELECT * from Movie;")
        setMovies(data)
    }
    useEffect(() => {
        fetchMoviesFromDb()
    }, [])
    return { movies, fetchMoviesFromDb }
}


export const useScreens = () => {
    const [screens, setscreens] = useState<{ Screen_No: string }[]>([])
    const fetchscreensFromDb = async () => {
        const data = await callSQL("Select Screen_No from Screen;")
        setscreens(data)
    }
    useEffect(() => {
        fetchscreensFromDb()
    }, [])
    return { screens, fetchscreensFromDb }
}


const exampleStaff = {
    Contact: "9876543210",
    Department: "Ticket",
    Designation: "distributor",
    Salary: 10000,
    Shift: "First",
    Staff_ID: 121,
    Staff_Name: "AAA"
};

export const useStaff = () => {
    const [staff, setstaff] = useState<typeof exampleStaff[]>([])
    const fetchstaffFromDb = async () => {
        const data = await callSQL("Select Staff_ID,Staff_Name, Department, Designation, Salary, Shift, Contact from Staff;")
        setstaff(data)
    }
    useEffect(() => {
        fetchstaffFromDb()
    }, [])
    return { staff, fetchstaffFromDb }
}