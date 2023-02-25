import { useContext } from 'react';
import { MusicPlayerContext } from '../context/MusicPlayerContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

export default function Playlist() {
    const [state, dispatch] = useContext(MusicPlayerContext);

    function handleClick(event) {
        const id = Number(event.currentTarget.id);

        if (id === state.currentTrackIndex) {
            dispatch({type: 'togglePlay'});
        } else {
            dispatch({type: 'changeTrack', newTrackId: id});
        }
    };

    return (
        <ul className='block'>
            {state.tracks.map((track, i) => {
                return (
                    <li key={i} className='box'>
                        <button
                            className='button'
                            id={i}
                            onClick={handleClick}
                        >
                            <FontAwesomeIcon
                                icon={((i === state.currentTrackIndex) && state.isPlay) ? faPause : faPlay}
                            />
                        </button>
                        <p className='song-title'>{track.name}</p>
                    </li>
                )
            })}
        </ul>
    )
}