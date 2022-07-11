import React from 'react'
import '../stylesheet/navbar.css'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { useStateProvider } from '../utils/StateProvider'

export default function Navbar({ navBackground }) {
  const [{ userInfo }] = useStateProvider()

  const styleBackground = () => {
    return navBackground ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0)"
  }

  return (
    <div className='container-fluid navbar-container' style={{backgroundColor: styleBackground()}}>
      <div className='search-bar'>
        <FaSearch />
        <input type='text' placeholder='Artists, songs or podcasts' />
      </div>
      <div className='avatar'>
        <a href='#'>
          <CgProfile />
          <span> { userInfo?.userName } </span>
        </a>
      </div>
    </div>
  )
}
