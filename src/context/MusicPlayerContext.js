import { createContext, useReducer } from 'react';
import LostChameleon from '../assets/LostChameleon.mp3';
import Rock from '../assets/TheHipsta.mp3';
import Tobu from '../assets/Tobu.mp3';

export const MusicPlayerContext = createContext([{}, () => {}]);

export default function MusicPlayerContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    return (
        <MusicPlayerContext.Provider value={[state, dispatch]}>
            { children }
        </MusicPlayerContext.Provider>
    )
}

function reducer(state, action) {
    let newState = {...state};

    switch(action.type) {
        case 'togglePlay':
            newState.isPlay = !newState.isPlay;
            break;

        case 'playPreviousTrack':
            // If current track is first of the list, change it to the last of the list
            // else change it to the previous track of the list
            if (0 === newState.currentTrackIndex) {
                newState.currentTrackIndex = (newState.tracks.length - 1);
            } else {
                newState.currentTrackIndex--;
            }

            newState.audio = new Audio(newState.tracks[newState.currentTrackIndex].file);

            // Always play when put previous track on
            newState.isPlay = true;
            break;

        case 'playNextTrack':
            // If current track is last of the list, change it to the first of the list
            // else change it to the next track of the list
            if ((newState.tracks.length - 1) === newState.currentTrackIndex) {
                newState.currentTrackIndex = 0;
            } else {
                newState.currentTrackIndex++;
            }

            newState.audio = new Audio(newState.tracks[newState.currentTrackIndex].file);

            // Always play when put next track on
            newState.isPlay = true;
            break;

        case 'changeTrack':
            newState.currentTrackIndex = action.newTrackId;

            newState.audio = new Audio(newState.tracks[newState.currentTrackIndex].file);

            // Always play when change track
            newState.isPlay = true;
            break;

        default:
            throw Error('Action does not exist');
    }

    return newState;
}

const initialState = {
    audio: null,
    isPlay: false,
    currentTrackIndex: 2,
    tracks: [
        {
            name: 'Lost Chameleon - Genesis',
            file: LostChameleon,
        },
        {
            name: 'The Hipsta - Shaken Soda',
            file: Rock,
        },
        {
            name: 'Tobu - Such Fun',
            file: Tobu,
        }
    ],
}

function init(initialState) {
    initialState.audio = new Audio(initialState.tracks[initialState.currentTrackIndex]);

    return initialState;
}
