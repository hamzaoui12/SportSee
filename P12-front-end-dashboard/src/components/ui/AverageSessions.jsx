import { useState } from "react";
import styles from "@/styles/components/AverageSessions.module.scss";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AverageSessionsCustomTooltip from "./AverageSessionsCustomTooltip";

const AverageSessions = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const formattedData = data.map((item, index) => ({
    day: days[index],
    sessionLength: item.sessionLength,
  }));

  const handleMouseMove = (e) => {
    if (e.isTooltipActive) {
      setActiveIndex(e.activeTooltipIndex);
    } else {
      setActiveIndex(0);
    }
  };

  return (
    <div
      className={styles.averageSessionsContainer}
      style={{
        background: `linear-gradient(90deg, #ff0000 ${
          (activeIndex / (data.length - 1)) * 100
        }%, #e60000 ${(activeIndex / (data.length - 1)) * 100}%)`,
      }}
    >
      <h3 className={styles.title}>Durée moyenne des sessions</h3>
      <ResponsiveContainer width="100%" height="70%">
        <LineChart data={formattedData} onMouseMove={handleMouseMove}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255, 255, 255, 0.6)", dy: 15 }}
          />
          <YAxis hide />
          <Tooltip content={<AverageSessionsCustomTooltip />} cursor={false} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FFF"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 8,
              stroke: "rgba(255, 255, 255, 0.3)",
              strokeWidth: 10,
              fill: "#FFF",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSessions;
