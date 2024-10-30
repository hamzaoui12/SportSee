import styles from "@/styles/pages/Dashboard.module.scss";

import AverageSessions from "@/components/ui/AverageSessions";
import DailyActivityChart from "@/components/ui/DailyActivityChart";
import PerformanceChart from "@/components/ui/PerformanceChart";
import { getUserActivity } from "@/web/services/getUserActivity";
import { getUserAverageSessions } from "@/web/services/getUserAverageSessions";
import { getUserInfo } from "@/web/services/getUserInfo";
import { useEffect, useState } from "react";
import { getUserPerformance } from "@/web/services/getUserPerformance";
import ScoreChart from "@/components/ui/ScoreChart";
import CountCard from "@/components/ui/CountCard";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [keyData, setKeyData] = useState(null);
  const [score, setScore] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const { data } = await getUserInfo();
      setUser(data.userInfos);
      setKeyData(data.keyData);
      setScore(data.todayScore);
    } catch (error) {
      setError(error);
    }
  };

  const fetchUserActivity = async () => {
    try {
      const { data } = await getUserActivity();
      setUserActivity(data.sessions);
    } catch (error) {
      setError(error);
    }
  };

  const fetchUserAverageSessions = async () => {
    try {
      const { data } = await getUserAverageSessions();
      setUserAverageSessions(data.sessions);
    } catch (error) {
      setError(error);
    }
  };

  const fetchUserPerformance = async () => {
    try {
      const { data } = await getUserPerformance();

      let transformedData = data.data.map((item) => ({
        domain:
          data.kind[item.kind].charAt(0).toUpperCase() +
          data.kind[item.kind].slice(1),
        value: item.value,
      }));

      transformedData.sort((a, b) => b.domain.length - a.domain.length);

      const orderedData = [];
      orderedData.push(transformedData.find((d) => d.domain === "Endurance"));
      orderedData.push(transformedData.find((d) => d.domain === "Strength"));
      orderedData.push(transformedData.find((d) => d.domain === "Energy"));
      orderedData.push(transformedData.find((d) => d.domain === "Intensity"));
      orderedData.push(transformedData.find((d) => d.domain === "Cardio"));
      orderedData.push(transformedData.find((d) => d.domain === "Speed"));

      setUserPerformance(orderedData);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUserActivity();
    fetchUserAverageSessions();
    fetchUserPerformance();
  });

  if (!user || !keyData) {
    return <div>{error}</div>;
  }

  const formattedKeyData = [
    {
      title: "Calories",
      count: keyData.calorieCount,
      unit: "kCal",
      icon: "/images/kcal.png",
      color: "red",
    },
    {
      title: "Protéines",
      count: keyData.proteinCount,
      unit: "g",
      icon: "/images/prots.png",
      color: "blue",
    },
    {
      title: "Glucides",
      count: keyData.carbohydrateCount,
      unit: "g",
      icon: "/images/carbs.png",
      color: "yellow",
    },
    {
      title: "Lipides",
      count: keyData.lipidCount,
      unit: "g",
      icon: "/images/lipids.png",
      color: "pink",
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.user}>
        <div className={styles.hello}>
          <span>Bonjour</span>
          <span className={styles.firstName}>{user.firstName}</span>
        </div>
        <span className={styles.congrats}>
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </span>
      </div>
      <div className={styles.data}>
        <div className={styles.charts}>
          <div className={styles.activity}>
            <DailyActivityChart data={userActivity} />
          </div>
          <div className={styles.subCharts}>
            <AverageSessions data={userAverageSessions} />
            <PerformanceChart data={userPerformance} />
            <ScoreChart data={score} />
          </div>
        </div>
        <div className={styles.counts}>
          {formattedKeyData.map((item) => (
            <CountCard
              key={item.title}
              title={item.title}
              count={item.count}
              unit={item.unit}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
