import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// api: la url de endpoint de celular
// del: Contiene si el formulario se ha cargado para eliminar
function JuegoForm({api, api2, del}){
    console.log("api",api)
    console.log("del", del)
    console.log("api", api2)

    // Son estados asociados a los campos del formulario
    const[CelId, setCelId] = useState("")
    const[titulo, settitulo] = useState("")
    const[descripcion, setdescripcion] = useState("")
    const[plataforma, setplataforma] = useState("")
    const[precio, setprecio] = useState("")
    const[categoria, setcategoria] = useState("")

    // id: el parametro id recibido desde el CRUD
    const {id} = useParams()
    console.log("id", id)

    // navigate es el CelId con el cual voy a invocar a la funcion que haga la redirección
    const navigate = useNavigate()

    useEffect(() =>{
        console.log("termino el render")
        // Este if sirve para verificar si se deben cargar los datos en el fomrulario
        if(id !== undefined){
            cargarJuegos()// Invoca a la funcion cargar autor
        }
    }, [])

    // La funcion encargada de cargar los datos del autor para los casos de editar y eliminar
    async function cargarJuegos(){
        try{
            let res = await axios(`${api}/${id}`)// Solicitud GET con parametro ID
            let data = await res.data // Convierte el resultado a objeto 

            //console.log(data)

            // Los datos devueltos por la API se asignan a los respectivos estados
            // Para que en el formulario se carguen dichos datos
            setCelId(data.CelId)
            settitulo(data.titulo)
            setdescripcion(data.descripcion)
            setplataforma(data.plataforma)
            setprecio(data.precio)
            setcategoria(data.categoria)
        }
        catch(error){
            console.log(error)

            // Verifica si el error es 404 lo que significa que el id del autor no existe
            if(error.response.status === 404){
                alert("El registro no existe")
                navigate("/juegos")
            }
            else{
                alert(error)
                console.log(error)
            }
        }
    }

        // Funciona que invoca los autores desde la API

    // Funcion asincrona para guardar un nuevo registro
    async function guardar(){
        try{
            // Creación del objeto autor el cual posteriormente se le enviara a la API
            let autor = {
                juegoId: CelId,
                titulo: titulo,
                descripcion: descripcion,
                plataforma: plataforma,
                precio: precio,
                categoria: categoria,
            }

            // Solicitud POST hacia la API
            let res = await axios.post(api, autor)
            let data = await res.data// Convierte el resultado en objeto

            // Verifica si la API respondio en status con el valor de 1
            if(data.status === 1){
                Swal.fire({
                    title: "¡Guardado Exitosamente!",
                    icon: "success"
                  });
                navigate("/juegos")// Redirecciona al componente donde se muestra la tabla de celular
            }
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    // Funcion encargada de editar el autor
    async function editar(){
        try{
            let autor = {
                juegoId: id,
                titulo: titulo,
                descripcion: descripcion,
                plataforma: plataforma,
                precio: precio,
                categoria: categoria,
            }
            
            // Se realiza una solicitud a la API de tipo PUT
            let res = await axios.put(api, autor)
            let data = await res.data// Convertimos la respuesta a objeto

            // Verificamos si la APi devolvio status 1
            if(data.status === 1){
                Swal.fire({
                    title: "¡Modificación Exitosa!",
                    text: "Los datos han sido modificados correctamente",
                    icon: "success"
                  });
                navigate("/juegos")// Redireccionamos a la tabla celular
            }
        }
        catch(error){
            // Verificamos si la api respondio que no existe
            if(error.response.status === 500){
                alert("El registro ya no existe")
                navigate("/juegos")
            }
            else{
                // Si es otro tipo de error mostramos el detalle
                alert(error)
                console.log(error)
            }
        }
    }

    // Funcion se encarga de hacer la peticion de tipo DELETe hacia la API
    async function eliminar(){
        try{
            let res = await axios.delete(api+"?id="+id)// Se solicita DELETE
            let data = await res.data// Convertimos el resultado de la API en un objeto


            // Verificamos si la API a devuelto el estado de que fue eliminado
            if(data.status === 1){
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "Los datos del videojuego han sido eliminados exitosamente",
                    icon: "success"
                  });// Mostramos el mensaje devuelto por la API
                navigate("/juegos")// Redireccionamos hacia la tabla principal de celular
            }

        }
        catch(error){
            // Verificamos si no existe el id a eliminar
            if(error.response.status === 404){
                alert("El autor ya no existe")// Mostramos mensaje de que no existe
                navigate("/juegos")// Redireccionamos hacia la tabla principal de celular
            }
            else{
                // Si es otro tipo de error ingresa aqui
                alert(error)
                console.log(error)
            }
        }
    }

    // Esta funciones es invocada por el boton guardar, editar o eliminar
    function enviar(e){

        // Detiene la propagacion del evento submit generada por defacto en el button dado que este se encuentra dentro de un formulario
        e.preventDefault()
        e.stopPropagation()

        // Seleccionamos el formulario el cual tiene la clase needs-validation
        let form = document.querySelector(".needs-validation")

        // Verificamos si el formulario es invalido
        if (!form.checkValidity()){
            // Si es invalido agregamos el estilo de la validacion (invalid-feedback)
            form.classList.add('was-validated')
        }
        else{
            // Significa que el formulario tiene todos los campos completos
            // Por  lo cual procedemos a ejecutar la acción (guardar, editar, eliminar)
            if(id === undefined)// Si el id es undefined significa que es un nuevo registro
                guardar()// Invoca a la funcion guardar
            else if(del === undefined)// Si del es undefined significa que se desea editar
                editar()
            else{// Se desea eliminar
                Swal.fire({
                    title: "Estas seguro de querer eliminar este artículo?",
                    text: "No podrás revertir la acción posteriormente",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, eliminar artículo!",
                    cancelButtonText: "Cancelar"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      eliminar()// Si la respuesta es true entonces invocamos a eliminar
                    }
                  });
            }
        }
        

    }

    return(
        <div>
            <form className="needs-validation" noValidate>

                {
                    // Se verifica que el id sea diferente de undefined
                    // Si esto es cierto significa que se va editar o eliminar el registro
                    // Por  lo cual mostrar el campor autor id
                    id !== undefined ?
                        <div className="form-group mt-3">
                            <label className="form-label">VideoJuego ID:</label>
                            <input className="form-control form-control-lg text-center" type="text" value={id} readOnly disabled />
                        </div>
                    :
                        ""
                }
{/* 
                <div className="form-group mt-3">
                    <label className="form-label">Celular Id:</label>
                    <input type="text" className="form-control form-control-lg text-center" value={juegoId} onChange={(e) => setCelId(e.target.value)} disabled={del===undefined ? false : true} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div> */}
                <div className="form-group mt-3">
                    <label className="form-label">Título:</label>
                    <input type="text" className="form-control form-control-lg text-center" onChange={(e) => settitulo(e.target.value)} value={titulo} disabled={del===true ? true: false} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Descripción:</label>
                    <input type="text" className="form-control form-control-lg text-center" value={descripcion} onChange={(e) => setdescripcion(e.target.value)} disabled={del === true ? true : false} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>


                <div className="form-group mt-3">
                    <label className="form-label">Plataforma:</label>
                    <input type="text" className="form-control form-control-lg text-center" value={plataforma} onChange={(e) => setplataforma(e.target.value)} disabled={del===undefined ? false : true} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Precio:</label>
                    <input type="number" className="form-control form-control-lg text-center" onChange={(e) => setprecio(e.target.value)} value={precio} disabled={del===true ? true: false} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Categoría:</label>
                    <input type="text" className="form-control form-control-lg text-center" value={categoria} onChange={(e) => setcategoria(e.target.value)} disabled={del === true ? true : false} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>


                <button className={`btn btn-${(id === undefined ? "success" : del===undefined ? "primary" : "danger")}`} onClick={(e) => enviar(e)} style={{ margin: '30px' }}><i className={id === undefined ? "fa-solid fa-floppy-disk" : del===true ? "fa-solid fa-trash" : "fa-solid fa-pen-to-square"} ></i> {id === undefined ? "Guardar" : del === undefined ? "Editar" : "Eliminar"}</button>
                <button className="btn btn-warning" onClick={() => navigate("/juegos")} style={{ margin: '30px' }}><i className="fa-solid fa-xmark" ></i> Cancelar</button>
            </form>
        </div>
    )
}

export default JuegoForm