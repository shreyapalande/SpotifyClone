import React from 'react'
import '../stylesheet/spotify.css'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Content from './Content'
import Footer from './Footer'
import { useEffect, useRef, useState } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'

function Spotify() {
  const [{ token }, dispatch] = useStateProvider()
  const bodyRef = useRef()
  const [navBackground, setNavBackground] = useState(false)
  const [headerBackground, setHeaderBackground] = useState(false)

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false)
    bodyRef.current.scrollTop >= 190 ? setHeaderBackground(true) : setHeaderBackground(false)
  }

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
      })
      const userInfo = {
        userId: res.data.id,
        userName: res.data.display_name,
      }
      // console.log(userInfo)
      dispatch({ type: reducerCases.SET_USERS, userInfo })
    }
    getUserInfo()
  }, [dispatch, token])

  return (
    <div className='spotify-container'>
      <div className='spotify-body'>
        <Sidebar />
        <div className='spotify-main' ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground} />
          <div className='spotify-content'>
            <Content headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className='spotify-footer'>
        <Footer />
      </div>
    </div>
  )
}

export default Spotify