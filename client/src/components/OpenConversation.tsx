import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";

export default function OpenConversation() {
    const [text, setText] = useState("");
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ behavior: "smooth" });
        }
    }, [])
    const { sendMessage, selectedConversation } = useConversations()

    const handleSubmit = (event) => {
        event.preventDefault();
        
        sendMessage(
            selectedConversation.recipients.map(recipient => recipient.id),
            text, 
        );

        setText("")
    }

    const myTextStyle = {
        backgroundColor: "rgb(124 58 237 / var(--tw-bg-opacity))",
    }

    const contactTextStyle = {
        backgroundColor: 'green'
    }

    return (
    <div className="flex flex-col flex-1 bg-zinc-900">
        <div className="flex-1 overflow-auto">
            <div className="flex flex-col items-start justify-end px-3">
                {
                    selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        return (
                            <div
                                //@ts-ignore
                                ref={lastMessage ? setRef : null} 
                                key={index}
                                className='my-1 flex flex-col'
                                style={ message.fromMe ? {alignSelf: 'end'} : {} }
                            >
                                <span className="text-white rounded px-3 py-2" style={ message.fromMe ? myTextStyle : contactTextStyle }>
                                    {message.text}
                                </span>
                                <span className="text-white" style={ message.fromMe ? {textAlign: 'right'} : {} }>
                                    {message.fromMe ? 'You' : message.senderName}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <InputGroup className="px-3 py-2">
                <Form.Control
                    as='textarea'
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='h-16 resize-none text-white bg-transparent'
                />

                <Button 
                    type="submit"
                    style={{backgroundColor: "rgb(124 58 237 / var(--tw-bg-opacity))", borderColor: "white"}}
                >
                    Send
                </Button>
            </InputGroup>
        </Form.Group>
        </Form>
    </div>
    )
}
