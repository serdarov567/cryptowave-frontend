import React, { useEffect, useState } from "react";

interface Plan {
  title: String;
  levels: Array<Number>;
  days: Number;
  percentage: Array<Number>;
  reward: Array<Number>;
  color: String;
  borderColor: String;
}

const usePlans = () => {
  const initial: Array<Plan> = [
    {
      title: "Starter",
      levels: [250, 500, 750],
      days: 45,
      percentage: [50, 50, 52],
      reward: [375, 750, 1140],
      color: "#062518",
      borderColor: "#1F553E",
    },
    {
      title: "Wave",
      levels: [1000, 2500],
      days: 40,
      percentage: [55, 55],
      reward: [1550, 3875],
      color: "#1A0524",
      borderColor: "#5B2F71",
    },
    {
      title: "Tsunami",
      levels: [5000, 10000],
      days: 35,
      percentage: [57, 60],
      reward: [7850, 16000],
      color: "#251E06",
      borderColor: "#64521B",
    },
  ];

  const [plans: Array<Plan>, setPlans] = useState(initial);

  useEffect(() => {
    setPlans(initial);
  }, []);

  return { plans };
};

export default usePlans;
