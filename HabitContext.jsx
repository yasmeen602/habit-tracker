import { useEffect, useState , useCallback } from "react";
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import { toast } from 'react-toastify'
import axios from 'axios'

import { HabitContext } from './HabitContextContext'

const HabitContextProvider = ({ children }) => {


    const navigate = useNavigate()

    const [token, setToken] = useState(!!cookie.get("token"))
    const [habitData, setHabitData] = useState([])

    const BackendUrl = 'http://localhost:3000'

    const getAuthToken = () => cookie.get("token")

    // import { useCallback } from "react";

    const fetchHabits = useCallback(async () => {
        try {
            const { data } = await axios.get(`${BackendUrl}/api/user/habits`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            })
            if (data.success) {
                setHabitData(data.data)
            }
        } catch (error) {
            console.log(error)
            toast.error("failed to fetch habits")
        }
    }, [BackendUrl])

    const handleRegister = async (name, email, password) => {
      try {
         const { data } = await axios.post(
            `${BackendUrl}/api/user/register`,
            { name, email, password },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        )

            if( data.success) {
                cookie.set("token", data.token, { expires: 7 })
                setToken(true)
                setHabitData(data.data)
                toast.success(data.message || "Registration successful")
                navigate('/Habits')
            }

      } catch (error) {
        console.log(error)
            toast.error("Register failed")
      }
    }

const handlelogin = async ( email, password) => {
      try {
         const { data } = await axios.post(
            `${BackendUrl}/api/user/login`,
            { email, password },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        )

            if( data.success) {
                cookie.set("token", data.token, { expires: 7 })
                setToken(true)
                setHabitData(data.data)
                toast.success(data.message || "login successful")
                navigate('/Habits')
            }

      } catch (error) {
        console.log(error)
            toast.error("Register failed")
      }
    }

    const addHabit = async (name, description, frequency) => {
      try {
         const { data } = await axios.post(`${BackendUrl}/api/user/add-habits`, {name, description, frequency}, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            })
             if( data.success) {
               
                toast.success(data.message || "Habit added successful")
                fetchHabits()
                navigate('/Habits')
            }
      } catch (error) {
         console.log(error)
            toast.error("failed to add habit")
            }
      }
    

    const deleteHabit = async (id) => {
        try {
            const { data } = await axios.delete(`${BackendUrl}/api/user/habits/${id}`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            })
            if (data.success) {
                toast.success(data.message || "Habit deleted successfully")
                fetchHabits()
            }
        } catch (error) {
            console.log(error)
            toast.error("failed to delete habit")
        }
    }

    const markCompleted = async (id) => {
         try {
            const { data } = await axios.put(`${BackendUrl}/api/user/habits/complete/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            })
            if (data.success) {
              
                fetchHabits()
            }
        } catch (error) {
            console.log(error)
            toast.error("failed to delete habit")
        }
    }

    useEffect(() => {
        if (token) {
            fetchHabits()
        }
    }, [fetchHabits, token])

    const values = {
       fetchHabits,
       BackendUrl,
       habitData,
       setHabitData,
       handleRegister,
       handlelogin,
       addHabit,
       deleteHabit,
         markCompleted,
         token,
        setToken,
    }
    return (
        <HabitContext.Provider value={values}>
            {children}
        </HabitContext.Provider>
    )
}

export default HabitContextProvider