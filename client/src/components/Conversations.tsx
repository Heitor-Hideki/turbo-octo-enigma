import { ListGroup } from "react-bootstrap";
import { useConversations } from "./ConversationsProvider";

export default function Conversations() {
    const { conversations, selectConversationIndex } = useConversations();

  return (
    <div className="flex h-full">
        <ListGroup variant='flush' className="text-white">
            {
                conversations.map((conversation, index) => (
                    <ListGroup.Item 
                        key={index} 
                        className='bg-transparent text-white capitalize'
                        action
                        onClick={() => selectConversationIndex(index)}
                        active={conversation.selected}
                    >
                        {
                            conversation.recipients.map(recipient => recipient.name).join(', ')
                        }
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    </div>
  )
}
