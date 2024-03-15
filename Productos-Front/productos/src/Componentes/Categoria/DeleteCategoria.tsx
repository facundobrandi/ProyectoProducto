import React, { useEffect, useTransition } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import FormCheck from 'react-bootstrap/FormCheck'

const categoryDTO = 
{
    CategoryDescription : "",
    IsActive : true,
    idCategoria : 0
}

function DeleteCategoria(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Categoria,setCategoria] = useState(categoryDTO);

  const actualizarCategoria = (e) => 
  {
    if(e.target.name === "IsActive")
    {
        setCategoria({
            ...Categoria,
            [e.target.name] : e.target.checked
        })
        console.log(e.target.name + " : " + e.target.checked)
        return
    }
    console.log(e.target.name + " : " + e.target.value)
    setCategoria({
        ...Categoria,
        [e.target.name] : e.target.value
    })
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

  const Change = async (Id) =>
  {
    const index = Id.target.selectedIndex;
    const el = Id.target.childNodes[index]
    const option =  el.getAttribute('id');
    const responce = await fetch(`http://localhost:10013/Categoria/GetCategoriaById?idCategoria=${option}`);
    if(responce.ok){
      const Cate = await responce.json();
      
      setCategoria({
        CategoryDescription : Cate.data.description,
        IsActive : Cate.data.isActive,
        idCategoria : option
    })

    console.log(Cate.data.isActive)
    }else
    {
      console.log("Error") 
    }
  }
  

const Delete = async()=>
{
    const responce = await 
    fetch(`http://localhost:10013/Categoria/DeleteCategoria?idCategoria=${Categoria.idCategoria}`);
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
        <Form.Select onChange={Change}>
          <option>Por favor elige una categoria</option>
          <Lista data={Categorias}></Lista>
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

export default DeleteCategoria;

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