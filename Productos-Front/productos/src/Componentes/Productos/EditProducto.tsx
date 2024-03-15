import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


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



function EditProducto(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Producto,SetProducto] = useState(CreateProdcutDTO)

  const ActualizarProducto = (e) => 
  {
    if(e.target.name === "IsActive" || e.target.name === "Discount")
    {
      SetProducto({
            ...Producto,
            [e.target.name] : e.target.checked
        })
        console.log(e.target.name + " : " + e.target.checked)
        return
    }
    console.log(e.target.name + " : " + e.target.value)
    SetProducto({
        ...Producto,
        [e.target.name] : e.target.value
    })
  }

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

  const guardarProducto = async () => 
  {
    const responce = await 
    fetch("http://localhost:10013/Producto/EditProduct?" , 
    {method : "POST" , headers : 
    {
        "Content-Type": "application/json;charset=utf-8"
    },
    body:JSON.stringify(Producto)})

    if(responce.ok)
    {
        const data = await responce.json()
        alert(data.message)
    }else
    {   const data = await responce.json()
        alert(data.message)}
  }

  const Change = async (Id) =>
  {
    const index = Id.target.selectedIndex;
    const el = Id.target.childNodes[index]
    const option =  el.getAttribute('id');
    const responce = await fetch(`http://localhost:10013/Categoria/GetCategoriaById?idCategoria=${option}`);
    if(responce.ok){
      const Cate = await responce.json();
      
      SetProducto({
        ...Producto,
        CategoryId : option
    })
    }else
    {
      console.log("Error") 
    }
  }

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


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.name}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Producto</Modal.Title>
          <Form.Select onChange={ChangeProduct}>
              <option>Por favor elige una categoria</option>
              <ListaProducto data={Productos}></ListaProducto>
            </Form.Select>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Id Producto</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Id"
                autoFocus
                name = "ProductId"
                onChange={(e) => ActualizarProducto(e)} value={Producto.ProductId}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripcion</Form.Label>
              <Form.Control as="textarea" rows={3} name = "Description"
              onChange={(e) => ActualizarProducto(e)} value={Producto.Description} />
            </Form.Group>
            <Form.Label>Categoria</Form.Label>
            <Form.Select onChange={Change}>
              <option>Por favor elige una categoria</option>
              <Lista data={Categorias}></Lista>
            </Form.Select>
            <Form.Group>
            <Form.Label>Descuento</Form.Label>
            <Form.Check type='switch'name='Discount'
            onChange={(e) => ActualizarProducto(e)} ></Form.Check>
            <Form.Label>Esta Activo?</Form.Label>
            <Form.Check type='switch'name='IsActive'
            onChange={(e) => ActualizarProducto(e)}></Form.Check>
            </Form.Group>
            <Form.Label>Stock</Form.Label>
              <Form.Control type='number' name='stock' onChange={(e) => ActualizarProducto(e)} value={Producto.stock} />
            <Form.Label>Precio</Form.Label>
              <Form.Control type='number' name='price' onChange={(e) => ActualizarProducto(e)} value={Producto.price} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => guardarProducto()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProducto;

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
                        <option key={item.Id} id={item.id}>{item.description}</option>
                    </>
                ))
            )}
        </>
    );
}

const ListaProducto = ({data}) =>
{   return(
        <>
            {(data.lenght < 1 ) ? 
            (
                <option>Sin Registros</option>
            ):
            (
                data.map((item) => (
                    <>
                        <option id={item.id}>{item.id}</option>
                    </>
                ))
            )}
        </>
    );
}