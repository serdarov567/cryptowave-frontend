import React, { useState, useEffect } from "react";
import {
  getPlans,
  getBalance,
  getReferalsOfUser,
  readReferals,
} from "src/utils/network";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const useCountdown = (targetDate) => {
  let countDownDate = new Date(targetDate).getTime();
  const [update, setUpdate] = useState(false);

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    setCountDown(countDownDate - new Date().getTime());
    const interval = setInterval(() => {
      setUpdate(!update);
    }, MINUTE);

    return () => clearInterval(interval);
  }, [countDownDate, update]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, raw: countDown };
};

const useUserDashboard = () => {
  const [plans, setPlans] = useState([]);
  const [referals, setReferals] = useState([]);
  const [balance, setBalance] = useState(0);
  const [earnings, setEarnings] = useState();
  const [networkError, setError] = useState("");
  const [networkLoading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [updateTimer, setUpdateTimer] = useState(false);
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const [isReferalsRead, setReferalsRead] = useState([]);
  const [updateReferals, setUpdateReferals] = useState(false);

  const fetchUserPlans = async () => {
    try {
      const plansResult = await getPlans(email, token);

      if (plansResult.data !== undefined) {
        setPlans(
          plansResult.data.sort(
            (a, b) => new Date(b.dateOfPurchase) - new Date(a.dateOfPurchase)
          )
        );
      }

      const balanceResult = await getBalance(email, token);

      if (balanceResult.status === 200) {
        setBalance(parseInt(balanceResult.data));
      }
    } catch (error) {
      setError("Network error!");
    }
    setLoading(false);
  };

  const fetchReferals = async () => {
    try {
      const referalsResult = await getReferalsOfUser(email, token);

      if (referalsResult !== undefined) {
        setReferals(referalsResult.data);
      }
    } catch (error) {
      setError("Network error!");
    }
  };

  const readAll = async (ids) => {
    await readReferals(email, token, ids);
  };

  useEffect(() => {
    if (isReferalsRead.length > 0) {
      //read all
      let ids = [];

      for (const referal of isReferalsRead) {
        ids.push(referal._id);
      }

      readAll(ids);

      setReferalsRead([]);
      setUpdateReferals(true);
    }
  }, [isReferalsRead]);

  useEffect(() => {
    fetchReferals();
  }, [updateReferals]);

  useEffect(() => {
    fetchUserPlans();

    const interval = setInterval(() => {
      setUpdate(!update);
    }, MINUTE);
    return () => {
      clearInterval(interval);
    };
  }, [update]);

  useEffect(() => {
    let earningsOfPlan = [];

    let earning,
      fullTime,
      timeLeft,
      index = 0;
    for (const plan of plans) {
      earning = 0;
      if (plan.status === "Active") {
        fullTime = plan.period * DAY;
        timeLeft = new Date(plan.dateOfExpiration) - Date.now();
        if (timeLeft > 0) {
          earning = Math.round(
            (plan.reward / fullTime) * (fullTime - timeLeft)
          );
        } else {
          earning = plan.reward;
        }
      }

      earningsOfPlan[index] = earning;
      index += 1;
    }

    setEarnings([0]);
    setEarnings(earningsOfPlan);

    const interval = setInterval(() => {
      setUpdateTimer(!updateTimer);
    }, SECOND);
    return () => {
      clearInterval(interval);
    };
  }, [plans, updateTimer]);

  const refresh = () => {
    setUpdate(!update);
  };

  const refreshEarnings = () => {
    setUpdateTimer(!updateTimer);
  };

  return {
    plans,
    referals,
    networkError,
    networkLoading,
    refresh,
    balance,
    earnings,
    useCountdown,
    refreshEarnings,
    setReferalsRead,
  };
};

export default useUserDashboard;

export { useCountdown };
