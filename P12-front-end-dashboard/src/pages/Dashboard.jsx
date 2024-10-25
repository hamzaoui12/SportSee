import styles from "@/styles/pages/Dashboard.module.scss";
import DailyActivityChart from "@/components/ui/DailyActivityChart";

import { getUserActivity } from "@/web/services/getUserActivity";
import { getUserInfo } from "@/web/services/getUserInfo";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [keyData, setKeyData] = useState(null);
  const [error, setError] = useState(null);
  const [userActivity, setUserActivity] = useState(null);


  const fetchUserInfo = async () => {
    try {
      const { data } = await getUserInfo();
      setUser(data.userInfos);
      setKeyData(data.keyData);
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

  useEffect(() => {
    fetchUserInfo();
    fetchUserActivity();
    });

    
  if (!user || !keyData) {
    return <div>{error}</div>;
  }


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
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
