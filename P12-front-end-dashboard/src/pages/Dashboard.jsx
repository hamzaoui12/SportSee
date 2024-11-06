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
  const [error, setError] = useState({
    userInfo: null,
    userActivity: null,
    userAverageSessions: null,
    userPerformance: null,
  });

  const fetchUserInfo = async () => {
    const { data, error } = await getUserInfo();

    if (error) {
      setError((prev) => ({
        ...prev,
        userInfo: error,
      }));
      return;
    }

    if (data) {
      setUser(data.data.userInfos);
      setKeyData(data.data.keyData);
      setScore(data.data.score);
    }
  };

  const fetchUserActivity = async () => {
    const { data, error } = await getUserActivity();

    if (error) {
      setError((prev) => ({
        ...prev,
        userActivity: error,
      }));
      return;
    }

    if (data) {
      setUserActivity(data.data.sessions);
    }
  };

  const fetchUserAverageSessions = async () => {
    const { data, error } = await getUserAverageSessions();

    if (error) {
      setError((prev) => ({
        ...prev,
        userAverageSessions: error,
      }));
      return;
    }

    if (data) {
      setUserAverageSessions(data.data.sessions);
    }
  };

  const fetchUserPerformance = async () => {
    const { data, error } = await getUserPerformance();

    if (error) {
      setError((prev) => ({
        ...prev,
        userPerformance: error,
      }));
      return;
    }

    if (data) {
      let transformedData = data.data.data.map((item) => ({
        domain:
          data.data.kind[item.kind].charAt(0).toUpperCase() +
          data.data.kind[item.kind].slice(1),
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
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUserActivity();
    fetchUserAverageSessions();
    fetchUserPerformance();
  }, []);

  if (
    error.userInfo ||
    error.userActivity ||
    error.userAverageSessions ||
    error.userPerformance
  ) {
    return (
      <div className={styles.error}>
        <h1>Une erreur est survenue lors de la récupération des données !</h1>
      </div>
    );
  }

  if (!user || !keyData) {
    return <div>Chargement des données...</div>;
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
