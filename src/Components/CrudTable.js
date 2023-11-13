import React from "react";
import { Link } from "react-router-dom";
import "./style/button.css";

// cols son los encabezados de cada columna de la tabla
// list Son el listado devuelto por la api y contiene los valores de cada fila
// controlador es el nombre que se utilizara en las urls de los botones Link
function Tabla({ cols, list, controlador }) {
  console.log("cols", cols);
  console.log("list", list);
  console.log("controlador", controlador);

  return (
    <div className="">
      <table className="table tabla-dark table-striped">
        <thead>
          <tr>
            {
              // Recorre cada posicion del array cols que es el que contiene los encabezados de las columnas
              cols.map((value, index) => {
                return <th key={index}>{value}</th>;
              })
            }
            <th>
              {/* Boton de nuevo registro ADD*/}
              <Link className="btn btn-success" to={`/${controlador}/add`}>
                <i className="fa-solid fa-file"></i> Nuevo
              </Link>
            </th>
          </tr>
        </thead>
        
        <tbody>
          {
            // El que recorre cada fila devuelta por la API, que es lo recibido en la prop list
            list.map((item, index) => {
              return (
                <tr key={index}>
                  {
                    // Genera cada celda de la fila que contiene los datos
                    // Object values convierte el objeto a array
                    Object.values(item).map((value, index2) => {
                      return <td key={index2}>{value}</td>;
                    })
                  }
                                    <td>
                    {/*Crea la celda de los botones de editar y eliminar*/}
                    <Link
                      to={`/${controlador}/edit/${Object.values(item)[0]}`}
                      className="btn btn-primary"
                      style={{ margin: "5px" }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i> Editar
                    </Link>
                    <Link
                      to={`/${controlador}/delete/${Object.values(item)[0]}`}
                      className="btn btn-danger"
                      style={{ margin: "px" }}
                    >
                      <i className="fa-solid fa-trash"></i> Eliminar
                    </Link>
                  </td>
                </tr>
              );
            })
            }
        </tbody>
        <tfoot>
          <tr>

            {cols.map((value, index) => {
              return <th key={index}>{value}</th>;
            })}
                        <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Tabla;
