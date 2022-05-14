import React, { useState, useEffect } from "react";
import { getUsersCount } from "src/utils/network";

const useStatistics = () => {
  const HOUR = 60 * 60000;
  const DAY = 24 * HOUR;
  const since = new Date(Date.now()).getTime() - new Date(2022, 1, 1).getTime();
  const runningDays = since / DAY;
  // const runningMonths = Math.floor(since / DAY / 30);
  // const runningDaysThisMonth = Math.floor(runningDays - runningMonths * 30);
  const [users, setUsers] = useState(0);
  const capitalization = 5200000 + runningDays * 342;

  useEffect(() => {
    const fetchUsersCount = async () => {
      const usersCount = await getUsersCount();

      setUsers(parseInt(usersCount.data));
    };

    fetchUsersCount();
  }, []);

  return { users, capitalization, runningDays };
};

export default useStatistics;
