import styles from "@/styles/components/CountCard.module.scss";

const CountCard = ({ title, color, count, unit, icon }) => {
  const colorPicker = (color) => {
    switch (color) {
      case "pink":
        return styles.pink;
      case "blue":
        return styles.blue;
      case "red":
        return styles.red;
      case "yellow":
        return styles.yellow;
    }
  };

  return (
    <div className={styles.countCardContainer}>
      <div
        className={`
        ${colorPicker(color)} ${styles.iconContainer}
        `}
      >
        <img src={icon} alt="icon" />
      </div>
      <div className={styles.text}>
        <span className={styles.count}>
          {count} {""} {unit}
        </span>
        <span className={styles.unit}>{title}</span>
      </div>
    </div>
  );
};

export default CountCard;
