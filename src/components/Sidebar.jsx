import React from 'react'
import '../stylesheet/sidebar.css'
import { IoLibrary } from 'react-icons/io5'
import { MdHomeFilled, MdSearch } from 'react-icons/md'
import Playlists from './Playlists'

export default function Sidebar() {
  return (
    <div className='container-fluid sidebar-container'>
      <div className='sidebar-links'>
        <div className='sidebar-logo'>
          <img 
            src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png'
            alt='spotify'
          />
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your library</span>
          </li>
        </ul>
      </div>
      <Playlists />
    </div>
  )
}
