import React, { useEffect, useState } from "react";
import NuevoProducto from "./NuevoProducto.tsx";
import Table from "react-bootstrap/esm/Table";
import EditCategoria from "../Categoria/EditCategoria.tsx";
import EditProducto from "./EditProducto.tsx";
import DeleteProducto from "./DeleteProducto.tsx";

export default function ListProductos() {

    const[Productos,setProductos] = useState([])

    const mostrarCategorias = async () =>{
      const responce = await fetch("http://localhost:10013/Producto/GetProduct");
      if(responce.ok){
        const Cate = await responce.json();
        setProductos(Cate.data)
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
            <NuevoProducto name = "Nuevo"></NuevoProducto>
            <EditProducto name = "Editar"></EditProducto>
            <DeleteProducto name = "Eliminar"></DeleteProducto>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Producto Id</th>
                        <th>Categoria</th>
                        <th>Descripcion</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>Esta Activo</th>
                    </tr>
                </thead>
                <tbody>
                    <Lista data={Productos}></Lista>
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
                            <th >{item.id}</th>
                            <th>{item.category}</th>
                            <th >{item.description}</th>
                            <th >{item.stock}</th>
                            <th >{item.price}</th>
                            <th >{String(item.discount)}</th>
                            <th >{String(item.isActive)}</th>

                        </tr>
                    </>
                ))
            )}
        </>
    );
}