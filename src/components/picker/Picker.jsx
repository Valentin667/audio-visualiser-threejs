import s from './Picker.module.scss';
import Scene from "../../webgl/Scene"

const Picker = () => {
    const pickVisualiser = (index) => {
        Scene.changeVisualiser(index);
    };

    return(
        <div className={s.picker}>
            <div onClick={() => pickVisualiser(0)}>Torus</div>
            <div onClick={() => pickVisualiser(1)}>Line</div>
            <div onClick={() => pickVisualiser(2)}>Logo IUT</div>
            {/* <div onClick={() => pickVisualiser(3)}>Sphere</div> */}
            <div onClick={() => pickVisualiser(4)}>Board</div>
        </div>
    )
};

export default Picker;