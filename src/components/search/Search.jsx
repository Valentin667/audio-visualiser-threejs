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
      artist: {
        name: "Local",
      },
      preview: src,
    };

    setSongs([audioObject]);
    // setSelectedSong(audioObject);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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

    // console.log(response);

    const data = response.data.slice(0, 6);

    AudioController.ctx.resume();
    setSongs(data);
  };

  console.log(isDragActive);

  return (
    <div>
      <input
        type="text"
        placeholder="Type a song or an artist name"
        className={s.search}
        spellCheck="false"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        onKeyDown={onKeyDown}
      ></input>
      <div className={s.drop_zone} {...getRootProps()}>
        <input type="submit" value="Drop song" {...getInputProps} />
      </div>
      {isDragActive && <input {...getInputProps} />}
    </div>
  );
};

export default Search;
