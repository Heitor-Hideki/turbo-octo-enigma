import { useState } from "react";
import { Nav, Tab, Modal } from "react-bootstrap";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

interface ISidebar {
    id: string;
}

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar ({
    id
}: ISidebar){
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY); 
    const [modalOpen, setModalOpen] = useState(false);
    const conversationOpen = activeKey === CONVERSATIONS_KEY;

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className="w-64 flex flex-col bg-black">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey as any}>
                <Nav variant="tabs" className="justify-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY} className='bg-black border-0'>
                            Conversations
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY} className='bg-black border-0'>
                            Contacts
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-r border-white overflow-auto flex-1">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <span className="p-2 border-t border-r text-white text-sm">
                    Your id: {id}
                </span>
                <div className="w-full px-3  py-2 flex justify-center items-center border-r">
                    <button 
                        onClick={() => setModalOpen(true)}
                        className="w-full flex justify-center items-center px-3 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-400"
                    >
                        New {conversationOpen ? 'conversation' : 'contact'}
                    </button>
                </div>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {
                    conversationOpen ? (
                        <NewConversationModal closeModal={closeModal}/>
                    ) : (
                        <NewContactModal closeModal={closeModal}/>
                    )
                }
            </Modal>
        </div>
    )
}