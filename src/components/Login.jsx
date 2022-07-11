import React from 'react'
import '../stylesheet/login.css'

const handleClick = () => {
    const clientId = "a918baf3c09f4ac7a7008eb4f3fb19b4"
    const redirectUrl = "http://localhost:3000/"
    const apiUrl = "https://accounts.spotify.com/authorize"
    const scope = [
      'user-read-email', 
      'user-read-private',
      'user-modify-playback-state',
      'user-read-playback-state',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-read-playback-position',
      'user-top-read'
    ]
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`
}

export default function Login() {
  return (
    <div className='login-container'>
        <img 
          className='login-img'
          src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png'
          alt='spotify'
        />
        <button className='login-btn' onClick={handleClick}>Connect Spotify</button>
    </div> 
  )
}


