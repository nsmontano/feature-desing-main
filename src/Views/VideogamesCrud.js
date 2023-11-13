import React, {useState, useEffect} from "react";
import Tabla from "../Components/CrudTable";
import axios from "axios";
import "../Components/style/button.css";
import PreLoader1 from "../Components/PreLoader1";
import { useThemeContext } from '../Components/context/ThemeContext';


// api: donde voy a recibir la URL de la api de la entidad Videojuegos
function VideogamesCrud({api}){
    const {contextTheme} = useThemeContext()  
    // El estado donde vamos a alojar los datos de todos los juegos
    const[Videojuegos, setVideojuegos] = useState()
    

    // Solo se ejecuta una vez cuando el componente es montado
    useEffect(() =>{
        cargarVideojuegos()// Invoca la solicitud del metodo que devuelve los Videojuegos
    }, [])

    // Esta funcion es la encargada de hacer la solicitud GET a la API sobre los Videojuegos
    async function cargarVideojuegos(){
        try{
            let res = await axios(api)// Solicitud de tipo GET hacia Videojuegos
            let data = await res.data// Convertimos el resultado en un array de objetos de tipo autor

            //console.log(data)
            setVideojuegos(data)// El listado de los Videojuegos se envia al estado llamado Videojuegos
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    

    return(
        <div>
            <h1 style={{ marginTop: '40px', marginBottom: '25px' }}>Videojuegos </h1>
            {
                Videojuegos === undefined ?
                    // <div>
                    //     <div className="spinner-border" role="status">
                    //         <span className="visually-hidden">Loading...</span>
                            
                    //     </div>
                    //     <h1>Cargando</h1>
                    // </div>
                    <div className="App">
                    <header className="App-header">
                    <h1>Cargando...</h1>
                      <PreLoader1 />
                    </header>
                  </div>
                :
                <Tabla controlador={"juegos"} list={Videojuegos} cols={["Juego Id", "Título", "Descripción", "Plataforma", "Precio", "Categoría"]} />
            }
            
        </div>
    )
}

export default VideogamesCrud


