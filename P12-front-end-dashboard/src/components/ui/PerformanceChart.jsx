import styles from "@/styles/components/PerformanceChart.module.scss";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const PerformanceChart = ({ data }) => {
  return (
    <div className={styles.performanceChartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="55%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#FFF" radialLines={false} />
          <PolarAngleAxis
            dataKey="domain"
            stroke="#FFF"
            tick={{ fill: "#FFF", className: styles.radarLabel }}
            tickLine={false}
            tickSize={15}
          />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="#FF0101"
            fill="#FF0101"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
