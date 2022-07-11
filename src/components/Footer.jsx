import React from 'react'
import '../stylesheet/footer.css'
import CurrentTrack from './CurrentTrack'
import PlayerControl from './PlayerControl'

export default function Footer() {
  return (
    <div className='container-fluid footer-container text-white'>
      <CurrentTrack />
      <PlayerControl />
    </div>
  )
}
