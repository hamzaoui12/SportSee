import styles from "@/styles/components/ScoreChart.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

const ScoreChart = ({ data }) => {
  const [y, setY] = useState("45%");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 1200) {
        setY("40%");
      } else {
        setY("45%");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dataReformated = [
    {
      name: "Progress",
      value: data * 100,
      fill: "#FF0000",
    },
  ];

  return (
    <div className={styles.scoreChartContainer}>
      <h3 className={styles.title}>Score</h3>
      <ResponsiveContainer width="100%" height="80%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="90%"
          outerRadius="90%"
          barSize={10}
          data={dataReformated}
          startAngle={90}
          endAngle={450}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
            cornerRadius={10}
          />
          <text
            x="50%"
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className={styles.label}
          >
            <tspan
              className={styles.scoreValue}
            >{`${dataReformated[0].value}%`}</tspan>
            <tspan className={styles.scoreText} x="50%" dy="2em">
              de votre
            </tspan>
            <tspan className={styles.scoreText} x="50%" dy="1em">
              objectif
            </tspan>
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
