import logo from './assets/logo.svg';
import './App.css';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

const apiToken =
  'BQCdpSbedTDbUbwTTFmyAdOej1RiQVeCgPgrezAH5zh4QCn7eDzndRlTvyjzFAmXmKQNEW07NQZnnV-GMT44So1Mp5HpaAD4Mh7yiG6oZRbE2JN498dryqZvaiutVy1LBZ01GJkxMohPLfifT1CCul_8pFGgABeIF53rLj7N1aJGpu6txngmQYdvfsgc12EOHpxVdwQlGUZObuTapTNc_JJ8NXZynQGalKK9-st0-p7FPUXadEhvgoosd42b0e0MU72aeP8ADt3ADyRvwKmw6fkvhhKzBnN8ot5HDA9nQ-k03-bOELsYLbVkjXXi5Bm5oXWFO62A3b7-oVRHXAeKYTRnvThvLoIYYZ-N-ltxpURsVihMYIXD3ivTeW0JelfuIof_E_m98OXGPdy6jhD_Kdu1IX0';

const fetchTracks = async () => {
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  const data = (await response.json()) as { items: any[] };

  return data.items;
};

const pickRandomTrack = (tracks: any[]) => {
  return tracks[Math.floor(Math.random() * tracks.length)]!;
};

const shuffleArray = (tracks: any[]) => {
  return tracks.sort(() => Math.random() - 0.5);
};

const AlbumCover = ({ track }: { track: any }) => {
  return (
    <img
      src={track.album.images?.[0]?.url ?? ''}
      style={{ width: 200, height: 200 }}
    />
  );
};

const TrackButton = ({
  track,
  onClick,
}: {
  track: any;
  onClick: () => void;
}) => {
  return (
    <div className="App-track-button">
      <AlbumCover track={track.track} />
      <button onClick={onClick}>{track.track?.name}</button>
    </div>
  );
};

const App = () => {
  const {
    data: tracks,
    isSuccess,
    isLoading,
  } = useQuery({ queryKey: ['tracks'], queryFn: fetchTracks });

  const [currentTrack, setCurrentTrack] = useState<any | undefined>(
    undefined,
  );
  const [trackChoices, setTrackChoices] = useState<any[]>([]);

  useEffect(() => {
    if (!tracks) {
      return;
    }

    const rightTrack = pickRandomTrack(tracks);
    setCurrentTrack(rightTrack);

    const wrongTracks = [pickRandomTrack(tracks), pickRandomTrack(tracks)];
    const choices = shuffleArray([rightTrack, ...wrongTracks]);
    setTrackChoices(choices);
  }, [tracks]);

  const checkAnswer = (track: any) => {
    if (track.track?.id == currentTrack?.track?.id) {
      swal('Bravo !', "C'est la bonne réponse", 'success');
    } else {
      swal('Dommage !', "Ce n'est pas la bonne réponse", 'error');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bienvenue sur le blind test</h1>
      </header>
      <div className="App-images">
        {isLoading || !isSuccess ? (
          'Loading...'
        ) : (
          <div>
            <div>
              <audio
                src={currentTrack?.track?.preview_url ?? ''}
                controls
                autoPlay
              />
            </div>
          </div>
        )}
      </div>
      <div className="App-buttons">
        {trackChoices.map(track => (
          <TrackButton track={track} onClick={() => checkAnswer(track)} />
        ))}
      </div>
    </div>
  );
};

export default App;
