import styles from "@/styles/components/AverageSessionsCustomTooltip.module.scss";

const AverageSessionsCustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltipContainer}>
        <p>{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

export default AverageSessionsCustomTooltip;
