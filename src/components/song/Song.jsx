import s from './Song.module.scss';
import AudioController from '../../utils/AudioController';

const Song = ({data}) => {
    console.log(data);
    return (
        <div className={s.song} onClick={() => {
            AudioController.updateSong(data.preview)
        }}>
            <img src={data.album.cover_small} alt="" />
            <span className={s.title}>{data.title}</span>
        </div>
    )
};

export default Song;