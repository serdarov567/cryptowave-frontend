import React, { useState, useEffect } from "react";
import { getWallets } from "src/utils/network";

interface Wallet {
  title: String;
  type: "Meta Mask" | "Binance";
  address: String;
}

const useWallets = () => {
  const [walletsLoading, setWalletsLoading] = useState(true);
  const [wallets, setWallets] = useState([]);
  const [update, setUpdate] = useState(false);
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data: Array<Wallet> = await (await getWallets(email, token)).data;
        if (data !== undefined) {
          setWallets(data);
          setWalletsLoading(false);
        }
      } catch (error) {
        setWalletsLoading(false);
      }
    };

    fetchWallets();
  }, [update]);

  const refresh = () => {
    setUpdate(!update);
  };

  return {
    wallets,
    walletsLoading,
    refresh,
  };
};

export default useWallets;
