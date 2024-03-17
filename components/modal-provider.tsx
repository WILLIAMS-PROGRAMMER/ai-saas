"use client"

import { useEffect, useState } from "react";
import { ProModal } from "./pro-modal";

export const ModalProvider = () => {
    const [isMOunted,setIsMpunted] = useState(false);

    useEffect(() => {
        setIsMpunted(true);
    }, []);

    if(!isMOunted) {
        return null;
    }

    return (
        <>
            <ProModal />
        </>
    )
}