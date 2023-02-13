import { useState } from "react"
import { Form, Modal } from "react-bootstrap"
import { useContacts } from "../context/ContactsProvider"
import { useConversations } from "./ConversationsProvider"

interface INewConversationModal {
    closeModal: Function
}

export default function NewConversationModal({
    closeModal
} :INewConversationModal) {
    const [selectedContactIds, setSelectedContactIds] = useState<string[]>([])
    const { contacts } = useContacts()
    const { createConversation } = useConversations()

    const handleCheckboxChange = (contactId) => {
        if (selectedContactIds.includes(contactId)) {
            setSelectedContactIds(prevState => prevState.filter(id => id !== contactId))
        } else {
            setSelectedContactIds(prevState => [...prevState, contactId])
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        createConversation(selectedContactIds)
        closeModal()
    }

    return (
    <>
        <Modal.Header closeButton className="bg-black text-white">
        Create Conversation
        </Modal.Header>
        <Modal.Body className="bg-black"> 
        <Form onSubmit={handleSubmit}>
            {
                contacts.map((contact) => (
                    <Form.Group key={contact.id} controlId={contact.id}>
                        <Form.Check 
                            type='checkbox'
                            // @ts-ignore
                            value={selectedContactIds.includes(contact.id)}
                            label={contact.name}
                            onChange={() => handleCheckboxChange(contact.id)}
                            className='text-white capitalize'
                        />
                    </Form.Group>
                ))
            }
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
