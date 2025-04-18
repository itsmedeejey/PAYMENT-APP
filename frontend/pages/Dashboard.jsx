import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Users } from "../components/Users";
import { Balance } from "../components/Balance";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBalance(response.data.balance.toFixed(2));
      } catch (err) {
        console.error("Error fetching balance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div > 
      <Appbar  />
      <div className="m-8">
        <Balance value={loading ? "Loading..." : balance ?? "N/A"} />
        <Users />
      </div>
    </div>
  );
};
