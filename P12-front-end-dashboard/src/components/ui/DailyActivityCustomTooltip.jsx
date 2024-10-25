import styles from "@/styles/components/DailyActivityCustomTooltip.module.scss";

const DailyActivityCustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className={styles.tooltipContainer}>
        <span className={styles.weight}>{payload[0].value}kg</span>
        <span className={styles.kCal}>{payload[1].value}kCal</span>
      </div>
    );
  }
};

export default DailyActivityCustomTooltip;
