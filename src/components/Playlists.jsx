import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constants'
import '../stylesheet/playlists.css'

export default function Playlists() {
    const [{ token, playlists }, dispatch] = useStateProvider()
    useEffect(() => {
        const getPlaylistData = async() => {
            const res = await axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            })
            const { items } = res.data
            const playlists = items.map(({name, id}) => {
                return {name, id}
            })
            // console.log(playlists)
            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists })
        }
        getPlaylistData()
    }, [token, dispatch])

  return (
    <div className='container-fluid playlists-container'>
        <ul className='playlists-ul'>
            {
                playlists.map(({ name, id }) => {
                    return(
                        <li className='playlists-li' key={id}>{name}</li>
                    )
                })
            }
            {
                playlists.map(({ name, id }) => {
                    return(
                        <li className='playlists-li' key={id}>{name}</li>
                    )
                })
            }
            {
                playlists.map(({ name, id }) => {
                    return(
                        <li className='playlists-li' key={id}>{name}</li>
                    )
                })
            }
        </ul>
    </div>
  )
}
