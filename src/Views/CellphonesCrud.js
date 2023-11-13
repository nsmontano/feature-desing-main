import React, {useState, useEffect} from "react";
import Tabla from "../Components/CrudTable";
import axios from "axios";
import "../Components/style/button.css";
import PreLoader1 from "../Components/PreLoader1";
import { useThemeContext } from '../Components/context/ThemeContext';


// api: donde voy a recibir la URL de la api de la entidad cellphone
function CelularCRUD({api}){
    const {contextTheme} = useThemeContext()  
    // El estado donde vamos a alojar los datos de todos los cellphone
    const[celular, setcelular] = useState()
    

    // Solo se ejecuta una vez cuando el componente es montado
    useEffect(() =>{
        cargarcelular()// Invoca la solicitud del metodo que devuelve los cellphones
    }, [])

    // Esta funcion es la encargada de hacer la solicitud GET a la API sobre los cellphones
    async function cargarcelular(){
        try{
            let res = await axios(api)// Solicitud de tipo GET hacia cellphones
            let data = await res.data// Convertimos el resultado en un array de objetos de tipo autor

            //console.log(data)
            setcelular(data)// El listado de los cellphones se envia al estado llamado cellphones
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    

    return(
        <div>
            <h1 style={{ marginTop: '40px', marginBottom: '25px' }}>Celulares</h1>
            {
                celular === undefined ?
                    <div className="App">
                    <header className="App-header">
                    <h1>Cargando...</h1>
                      <PreLoader1 />
                    </header>
                  </div>
                :
                <Tabla controlador={"cellphones"} list={celular} cols={["Celular Id", "Marca", "Modelo", "Color", "Precio", "Descripción", "Operadora"]} />
            }
            
        </div>
    )
}

export default CelularCRUD



