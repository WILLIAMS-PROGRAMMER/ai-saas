"use client"

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({isPro}: SubscriptionButtonProps) => {

    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            const response = axios.get("/api/stripe");
            window.location.href = (await response).data.url;
        } catch (error) {
            console.log("[BILLING_ERROR]",error);
            toast.error("Error while processing the request");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button
          variant={isPro ? "default" : "premium"}
          onClick={onClick}
          disabled={loading}
        >
            {isPro ? "Manage Subscription" : "Upgrade to Pro"}
            {!isPro && <Zap className="w-4 h-4 ml-2" />}
        </Button>
    );
}