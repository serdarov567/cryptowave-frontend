import { useEffect, useState } from "react";
import { getWithdrawHistoryOfUser } from "src/utils/network";

const useWithdraw = () => {
  const [withdraws, setWithdraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        const result = await getWithdrawHistoryOfUser(email, token);

        if (result.data !== undefined) {
          setWithdraws(result.data);
        }
      } catch (error) {
        //console.log(error);
      }
    };

    fetchData();
    setLoading(false);
  }, [update]);

  const refresh = () => {
    setUpdate(!update);
  }

  return { loading, withdraws, refresh };
};

export default useWithdraw;
