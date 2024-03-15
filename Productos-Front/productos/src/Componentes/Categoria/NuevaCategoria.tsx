import React, { useTransition } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import FormCheck from 'react-bootstrap/FormCheck'

const categoryDTO = 
{
    CategoryDescription : "",
    IsActive : true,
}

function NuevaCategoria(props) {
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
  const guardarCategoria = async () => 
  {
    const responce = await 
    fetch("http://localhost:10013/Categoria/CreateCategoria?" , 
    {method : "POST" , headers : 
    {
        "Content-Type": "application/json;charset=utf-8"
    },
    body:JSON.stringify(Categoria)})

    if(responce.ok)
    {
        const data = await responce.json()
        alert(data.message)
    }else
    {   const data = await responce.json()
        alert(data.message)}
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.name}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Categoria">
              <Form.Label>Descripcion de Categoria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripcion"
                autoFocus
                name='CategoryDescription'
                onChange={(e) => actualizarCategoria(e)} value={Categoria.CategoryDescription}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="Check"
            >
                <Form.Check
                type='switch'
                name='IsActive'
                onChange={(e) => actualizarCategoria(e)}
                ></Form.Check>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() =>guardarCategoria()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NuevaCategoria;