'use client'

import React, {ReactNode} from 'react';
import {Session} from "next-auth";
import {SessionProvider} from 'next-auth/react'

interface IProviderProps {
    session: Session
    children: ReactNode
}

const Provider = ({children, session}: IProviderProps) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
};

export default Provider;