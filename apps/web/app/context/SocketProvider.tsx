'use client'

import React, { useCallback, useEffect } from "react";
import { io } from "socket.io-client";

interface SocketProviderProps{
    children?: React.ReactNode
}

interface SocketContextInterface {
    sendMessage: (msg:string) => any;
}

const SocketContext = React.createContext<SocketContextInterface| null> (null);

export const SocketProvider: React.FC<SocketProviderProps> = ({children}) =>{

    const sendMessage: SocketContextInterface['sendMessage'] = useCallback((msg: string)=>{
        console.log("Send Message", msg)
    },[]);

    useEffect(()=>{
        const _socket = io('http://localhost:8000');

        return () =>{
            _socket.disconnect();
        }
    }, []);

    return (
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    )
}