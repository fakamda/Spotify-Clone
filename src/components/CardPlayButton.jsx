import { Pause, Play } from "./Player"
import { usePlayerStore } from "../store/playerStore" //ESTADO GLOBAL DE ZUSTAND

export function CardPlayButton ({ id, size = 'small' }) {
    const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)

    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id //si esta reproduciendo y esta reproduciendo el id de la musica se muestra
    
    const handleClick = () => {
        if(isPlayingPlaylist) {
            setIsPlaying(false)
            return
        }
        fetch(`/api/get-info-playlist.json?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const { songs, playlist } = data
            setIsPlaying(true)
            setCurrentMusic({ songs, playlist, song: songs[0] })
        })
    }

const iconClassname = size === 'small' ? 'w-4 h-4' : 'w-6 h-6'

    return (
        <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400 ">
            {isPlayingPlaylist ? <Pause className={iconClassname} /> : <Play className={iconClassname} />}
        </button>
    )
}