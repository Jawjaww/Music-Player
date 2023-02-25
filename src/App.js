import MusicPlayerContextProvider from './context/MusicPlayerContext';
import Playlist from './components/Playlist';
import PlayerControls from './components/PlayerControls';

export default function App() {
    return (
        <MusicPlayerContextProvider>
            <div className='container'>
                <Playlist />
                <PlayerControls />
            </div>
        </MusicPlayerContextProvider>
    );
}