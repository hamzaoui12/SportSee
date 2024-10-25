import styles from "@/styles/components/DailyActivityChart.module.scss";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DailyActivityCustomTooltip from "./DailyActivityCustomTooltip";
import CustomLegend from "./CustomLegend";

const DailyActivityChart = ({ data }) => {
  return (
    <div className={styles.dailyActivityContainer}>
      <h3 className={styles.title}>Activité quotidienne</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 50, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9C9EAC", fontSize: 14, dy: 10 }}
          />
          <YAxis
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9C9EAC", fontSize: 14, dx: 10 }}
          />
          <Tooltip content={<DailyActivityCustomTooltip />} />
          <Legend
            content={<CustomLegend />}
            verticalAlign="top"
            align="right"
          />
          <Bar
            dataKey="kilogram"
            fill="#282d30"
            name="Poids (kg)"
            barSize={15}
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="calories"
            fill="#e60001"
            name="Calories brûlées (kcal)"
            barSize={15}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyActivityChart;
