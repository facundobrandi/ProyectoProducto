import React, { useEffect, useState } from "react";
import NuevaCategoria from "./NuevaCategoria.tsx";
import Table from 'react-bootstrap/Table';
import EditCategoria from "./EditCategoria.tsx";
import DeleteCategoria from "./DeleteCategoria.tsx";

export default function ListCategoria() {

    const[Categorias,setCategorias] = useState([])

    const mostrarCategorias = async () =>{
      const responce = await fetch("http://localhost:10013/Categoria/GetCategoria");
      if(responce.ok){
        const Cate = await responce.json();
        setCategorias(Cate.data)
      }else
      {
        console.log("Error") 
      }
    }
    useEffect(()=>{mostrarCategorias()},[])

    return (
        <>
            <div>
                Listado de Categorias
            </div>
            <div>
                <NuevaCategoria name = "Nuevo"></NuevaCategoria>
                <EditCategoria name = "Editar"></EditCategoria>
                <DeleteCategoria name = "Eliminar"></DeleteCategoria>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Is Active</th>
                    </tr>
                </thead>
                <tbody>
                    <Lista data={Categorias}></Lista>
                </tbody>
            </Table>
        </>
    );
}

const Lista = ({data}) =>
{
    return(
        <>
            {(data.lenght < 1 ) ? 
            (
                <th>Sin Registros</th>
            ):
            (
                data.map((item) => (
                    <>
                        <tr key={item.Id}>    
                            <th >{item.description}</th>
                            <th>{String(item.isActive)}</th>
                        </tr>
                    </>
                ))
            )}
        </>
    );
}
