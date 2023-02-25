import { useContext, useEffect } from 'react';
import { MusicPlayerContext } from '../context/MusicPlayerContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";

export default function PlayerControls() {
    const [state, dispatch] = useContext(MusicPlayerContext);
    const track = state.tracks[state.currentTrackIndex];

    // Play or pause track
    useEffect(() => {
        if (state.isPlay) {
            state.audio.play();
        } else {
            state.audio.pause();
        }

        // Always pause before updating
        return (() => state.audio.pause())
    }, [state]);

    return (
        <div className='box controls has-background-grey has-text-white'>
            <div className='current-track'>
                <p className='marquee'>{track.name}</p>
            </div>
            <div>
                <button
                    className='button has-background-grey has-text-white'
                    onClick={() => dispatch({type: 'playPreviousTrack'})}
                >
                    <FontAwesomeIcon icon={faStepBackward} />
                </button>
                <button
                    className='button has-background-grey has-text-white'
                    onClick={() => dispatch({type: 'togglePlay'})}
                >
                    <FontAwesomeIcon icon={state.isPlay ? faPause : faPlay} />
                </button>
                <button
                    className='button has-background-grey has-text-white'
                    onClick={() => dispatch({type: 'playNextTrack'})}
                >
                    <FontAwesomeIcon icon={faStepForward} />
                </button>
            </div>
        </div>
    )
}