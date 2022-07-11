import React from 'react'
import '../stylesheet/playercontrol.css'
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from 'react-icons/bs'
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { FiRepeat } from 'react-icons/fi'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'

export default function PlayerControl() {
    const [{ token, playerState }, dispatch] = useStateProvider()
    const changeTrack = async(type) => {
        await axios.post(`https://api.spotify.com/v1/me/player/${type}`, {}, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        })
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
        } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null })   
        }
    }

  return (
    <div className='container-fluid player-control'>
        <div className="shuffle">
            <BsShuffle />
        </div>
        <div className="previous">
            <CgPlayTrackPrev onClick={(() => changeTrack("previous"))} />
        </div>
        <div className="state">
            {playerState ? <BsFillPauseCircleFill/> : <BsFillPlayCircleFill />}
        </div>
        <div className="next">
            <CgPlayTrackNext onClick={(() => changeTrack("next"))} />
        </div>
        <div className="repeat">
            <FiRepeat />
        </div>
    </div>
  )
}
