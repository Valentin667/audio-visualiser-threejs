import React, { useRef } from "react";
import style from "./Song.module.scss";
import AudioController from "../../utils/AudioController";
import Scene from "../../webgl/Scene";

const Song = ({ data }) => {
  const activeRef = useRef(null);

  const pickSong = () => {
    AudioController.updateSong(data.preview);
    Scene.cover.updateCover(data.album.cover);

    // Retirer la classe active de l'ancien élément
    const activeSong = document.querySelector(`.${style.active}`);
    if (activeSong) {
      activeSong.classList.remove(style.active);
    }

    // Ajouter la classe active au nouvel élément
    activeRef.current.classList.add(style.active);

    // Mettez à jour le titre de la page
    document.title = `${data.title} - ${data.artist.name}`;
  };

  return (
    <div className={`${style.song}`} onClick={pickSong} ref={activeRef}>
      <img src={data.album.cover} alt={data.title} />
      <span className={style.title}>{data.title}</span>
    </div>
  );
};

export default Song;
