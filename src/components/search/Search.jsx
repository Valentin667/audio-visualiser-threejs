import { useEffect, useState } from "react";
import s from "./Search.module.scss";
import fetchJsonp from "fetch-jsonp";
import useCustomStore from "../../customStore";
import AudioController from "../../utils/AudioController";

const Search = () => {
    const [artist, setArtist] = useState("");
    const setSongs = useCustomStore(state => state.setSongs);

    useEffect(() => {
        AudioController.setup();
    },[]);

    const onKeyDown = (e) => {
        if (e.keyCode === 13 && e.target.value !== "" ) {
            getSongs();
        }
    }

    const getSongs = async () => {
        let response = await fetchJsonp(
          `https://api.deezer.com/search?q=${artist}&output=jsonp`
        );
            
        response = await response.json();

        const data = response.data.slice(0, 10);
        AudioController.ctx.resume();
        setSongs(data);
        setArtist("");
      };

    return ( 
        <div className={s.searchWrapper}>
            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} onKeyDown={onKeyDown}></input>
        </div>
    );
};

export default Search;