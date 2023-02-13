import { useRef } from "react";
import { Form, Modal } from "react-bootstrap"
// @ts-ignore
import { useContacts } from "../context/ContactsProvider";


interface INewContactModal {
    closeModal: Function
}

export default function NewContactModal({
    closeModal
} :INewContactModal) {
    const idRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const { createContact } = useContacts();

    const handleSubmit = (event) => {
        event.preventDefault()

        createContact(idRef.current!.value, nameRef.current!.value)
        closeModal()
    }

  return (
    <>
      <Modal.Header closeButton className="bg-black text-white">
        Create Contact
      </Modal.Header>
      <Modal.Body className="bg-black"> 
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label className="text-white">Id</Form.Label>
                <Form.Control type="text" placeholder="Id" ref={idRef}/>
            </Form.Group>
            <Form.Group>
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control type="text" placeholder="Name" ref={nameRef}/>
            </Form.Group>
            <button 
                type='submit'
                className="w-full flex justify-center items-center px-3 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-400 mt-3"
            >
                Create
            </button>
        </Form>
      </Modal.Body>
    </>
  )
}
