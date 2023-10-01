"use client";

import axios from "axios";
import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe"); // Send GET request to /api/stripe endpoint using axios library
      window.location.href = response.data.url; // Redirect user to Stripe checkout page
    } catch (error) {
        toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Render Button component with appropriate props and text/icon based on isPro prop
  return (
    <Button
      disabled={loading} // Disable button if loading state is true
      onClick={onClick}
      variant={isPro ? "default" : "premium"}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
