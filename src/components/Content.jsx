import React from 'react'
import '../stylesheet/content.css'
import { AiFillClockCircle } from 'react-icons/ai' 
import { useStateProvider } from '../utils/StateProvider'
import { useEffect } from 'react'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'

export default function Content({ headerBackground }) {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider()

  const styleBackground = () => {
    return headerBackground ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0)"
  }

  const changeTime = (ms) => {
    const min = Math.floor(ms/60000)
    const sec = ((ms%60000)/1000).toFixed(0)
    return min + ":" + (sec < 10 ? "0" : "") + sec
  }

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const res = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      const selectedPlaylist = {
        id: res.data.id,
        name: res.data.name,
        description: res.data.description.startsWith("<a") ? "" : res.data.description,
        image: res.data.images[0].url,
        tracks: res.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      }
      // console.log(selectedPlaylist)
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist })
    }
    getInitialPlaylist()
  }, [token, dispatch, selectedPlaylistId])

  return (
    <div className='content-container'>
      {
        selectedPlaylist && (
          <div className='container-fluid'>
            <div className='content-playlist'>
              <div className='content-image'>
                <img src={selectedPlaylist.image} alt="selected playlist" />
              </div> 
              <div className='content-details'>
                <span className='content-type'>Playlist</span>
                <h1 className='content-title'>{ selectedPlaylist.name }</h1>
                <p className='content-description'>{ selectedPlaylist.description }</p>
              </div>
            </div>  
            <div className='content-list'>
              <div className='content-header row' style={{backgroundColor: styleBackground()}}>
                <div className='content-col col-sm-1'>
                  <span>#</span>
                </div>
                <div className='content-col col-sm-7'>
                  <span>Title</span>
                </div>
                <div className='content-col col-sm-3'>
                  <span>Album</span>
                </div>
                <div className='content-col col-sm-1'>
                  <span><AiFillClockCircle /></span>
                </div>
              </div>
              <div className='content-tracks'>
                {selectedPlaylist.tracks.map(({
                  id,
                  name,
                  artists,
                  image,
                  duration,
                  album,
                  context_uri,
                  track_number,
                }, index) => {
                  return (
                    <div className='table-hover'>
                      <div className='row content-row text-white' key={id}>
                        <div className='content-col col-sm-1'>
                          <span>{ index+1 }</span>
                        </div>
                        <div className='content-col content-detail col-sm-7'>
                          <div className="content-image">
                            <img src={image} alt="track" />
                          </div>
                          <div className="content-info">
                            <span className="name">{ name }</span>
                            <span>{ artists }</span>
                          </div>
                        </div>
                        <div className='content-col col-sm-3'>
                          <span>{ album }</span>
                        </div>
                        <div className='content-col col-sm-1'>
                          <span>{ changeTime(duration) }</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
