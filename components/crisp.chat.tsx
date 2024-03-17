"use client"

import {Crisp} from "crisp-sdk-web"
import { useEffect } from "react"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("daaae6d1-7cdc-4311-bc4e-0d92a96a0d71");
    }, []);
    return null;
}