import './style/button.css';
import { useRef, useEffect} from "react";

function App(){

    const buttonRef = useRef();
    
    useEffect(() =>{
        const applyContainerProperties = () => {
            buttonRef.current.classList.add("effect-container");
        };


        const onClick = () => {
            buttonRef.current.classList.Add("active");
        };

        applyContainerProperties();

        buttonRef.current.addEventListener("mouseup", onClick);

        const cleanupRef = buttonRef.current;

    });

    return (
        <div className = "button">
            <div className = "button-container" ref = {buttonRef}>
                <button>My Button</button>
            </div>
        </div>
    );
}

export default App;