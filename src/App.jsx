import Canvas from "./components/canvas/Canvas";
import Search from "./components/search/Search";
import s from "./App.module.scss";
import Song from "./components/song/Song";
import useCustomStore from "./customStore";
import Picker from "./components/picker/Picker";

function App() {
  const songs = useCustomStore((state) => state.songs);

  return (
    <div className="App">
      <div className={s.songs}>
        {songs.map((song, key) => {
          return <Song key={key} data={song} />;
        })}
      </div>
      <Search />
      <Picker />
      <Canvas />
    </div>
  );
}

export default App;
