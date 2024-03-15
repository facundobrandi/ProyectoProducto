import React, { useEffect, useTransition } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import FormCheck from 'react-bootstrap/FormCheck'

const CreateProdcutDTO =
{
   ProductId : "",
   CategoryId :0,
   Description : "",
   stock  :0,
   price  :0,
   Discount  :false,
   isActive :false,
}


function DeleteProducto(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Producto,SetProducto] = useState(CreateProdcutDTO)

  const[Productos,setProductos] = useState([])
  const mostrarProductos = async () =>{
    const responce = await fetch("http://localhost:10013/Producto/GetProduct");
    if(responce.ok){
      const Cate = await responce.json();
      setProductos(Cate.data)
    }else
    {
      console.log("Error") 
    }
  }
  useEffect(()=>{mostrarProductos()},[])

  const ChangeProduct = async (Id) =>
  {
    const index = Id.target.selectedIndex;
    const el = Id.target.childNodes[index]
    const option =  el.getAttribute('id');
    const responce = await fetch(`http://localhost:10013/Producto/GetProductById?ProductId=${option}`);
    if(responce.ok){
      const Cate = await responce.json();
      SetProducto({
        CategoryId : Cate.data.CategoryId,
        ProductId : Cate.data.productId,
        stock : Cate.data.stock,
        price : Cate.data.price,
        Discount : Cate.data.haveEcdiscount,
        isActive : Cate.data.isActive,
        Description : Cate.data.productDescription,
    })
    }else
    {
      console.log("Error") 
    }
  }
  

const Delete = async()=>
{
    const responce = await 
    fetch(`http://localhost:10013/Producto/DeleteProduct?ProductId=${Producto.ProductId}`);
    if(responce.ok){
      const Cate = await responce.json();
      alert(Cate.message)
    }else
    {
      console.log("Error") 
    }
}


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.name}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Categoria</Modal.Title>
        <Form.Select onChange={ChangeProduct}>
          <option>Por favor elige una categoria</option>
          <Lista data={Productos}></Lista>
        </Form.Select>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() =>Delete()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteProducto;

const Lista = ({data}) =>
{
    return(
        <>
            {(data.lenght < 1 ) ? 
            (
                <option>Sin Registros</option>
            ):
            (
                data.map((item) => (
                    <>
                        <option key={item.Id} id={item.id}>{item.id}</option>
                    </>
                ))
            )}
        </>
    );
}