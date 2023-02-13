import { ListGroup } from "react-bootstrap"
import { useContacts } from "../context/ContactsProvider"

export default function Contacts() {
    const { contacts } = useContacts()

    return (
        <ListGroup variant='flush'>
            {
                contacts.map(contact => (
                    <ListGroup.Item key={contact.id} className='bg-transparent text-white capitalize'>
                        {contact.name}
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}
