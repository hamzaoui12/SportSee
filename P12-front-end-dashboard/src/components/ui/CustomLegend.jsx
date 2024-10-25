import styles from "@/styles/components/CustomLegend.module.scss";

const CustomLegend = ({ payload }) => {
  return (
    <ul className={styles.legendContainer}>
      {payload.map((entry, index) => (
        <li key={`legend-${index}`} className={styles.legendItem}>
          <div
            className={styles.icon}
            style={{
              backgroundColor: entry.color,
            }}
          ></div>
          <span
            style={{ color: "#9C9EAC", fontSize: "16px" }}
            className={styles.value}
          >
            {entry.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CustomLegend;
