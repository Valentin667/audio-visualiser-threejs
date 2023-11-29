import { useEffect, useState } from "react";
import fetchJsonp from "fetch-jsonp";
import useCustomStore from "../../customStore";
import AudioController from "../../utils/AudioController";
import { useDropzone } from "react-dropzone";
import s from "./Search.module.scss";

const Search = () => {
  const [artist, setArtist] = useState("");
  const setSongs = useCustomStore((state) => state.setSongs);

  const onDrop = (audio) => {
    const src = URL.createObjectURL(audio[0]);
    const audioObject = {
      title: audio[0].name,
      album: {
        cover_small: "",
      },
      preview: src,
    };

    setSongs([audioObject]);
    // setSelectedSong(audioObject);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "audio/mpeg": [".mp3"],
    },
  });

  useEffect(() => {
    AudioController.setup();
  }, []);

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      getSongs();
    }
  };

  const getSongs = async () => {
    let response = await fetchJsonp(
      `https://api.deezer.com/search?q=${artist}&output=jsonp`
    );

    response = await response.json();

    const data = response.data.slice(0, 6);
    AudioController.ctx.resume();
    setSongs(data);
    setArtist("");
  };

  console.log(isDragActive);

  return (
    <div className={s.searchWrapper} {...getRootProps()}>
      <input
        type="text"
        placeholder="Type a song"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        onKeyDown={onKeyDown}
      ></input>

      {isDragActive && <input {...getInputProps} />}
    </div>
  );
};

export default Search;
