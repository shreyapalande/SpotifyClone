import React, { useEffect } from 'react'
import '../stylesheet/currenttrack.css'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'

export default function CurrentTrack() {
    const [{ token, currentlyPlaying }, dispatch] = useStateProvider()
    useEffect(() => {
        const getCurrentTrack = async() => {
            const res = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            })
            if(res.data !== "") {
                const { item } = res.data
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url,
                }
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying })
            } 
        }
        getCurrentTrack()
    }, [token, dispatch])

    return (
        <div>
            {
                currentlyPlaying && (
                    <div className="track">
                        <div className="track-image">
                            <img src={currentlyPlaying.image} alt="currently playing" />
                        </div>
                        <div className="track-info">
                            <h4>{currentlyPlaying.name}</h4>
                            <h6>{currentlyPlaying.artists.join(", ")}</h6>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
