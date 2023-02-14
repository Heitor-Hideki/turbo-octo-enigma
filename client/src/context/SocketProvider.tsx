import React, { useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"

interface ISocketContext {
    messages: {
        senderName: string,
        text: string,
        fromMe: boolean,
    }[]
    recipients: {
        id: string,
        name: string
    }[],
    emit: Function,
    on: Function,
    off: Function,
    removeAllListeners: Function,
  }

const SocketContext = React.createContext<ISocketContext | undefined>(undefined)

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({id, children}) {
    const [socket, setSocket] = useState<any>()

    //@ts-ignore
    useEffect(() => {
        const newSocket = io('http://localhost:5000', 
        {
            query: {id}
        })
        setSocket(newSocket)

        return () => newSocket.close()
    }, [id])

    return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
    )
}
