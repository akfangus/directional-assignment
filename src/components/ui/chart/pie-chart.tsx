/**
 * 파이/도넛 차트 컴포넌트
 */

import { Card } from "antd";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import { useChartLegend } from "@/shared/hooks/use-chart-legend";
import { ChartLegend } from "./common/chart-legend";
import { CHART_DEFAULTS } from "@/theme/chart-config";

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  title?: string;
  height?: number;
  innerRadius?: number; // 0이면 파이, >0이면 도넛
  initialColors?: string[];
}

export function PieChart({
  data,
  title,
  height = CHART_DEFAULTS.height,
  innerRadius = 60,
  initialColors,
}: PieChartProps) {
  const dataKeys = useMemo(() => data.map((d) => d.name), [data]);

  const { colors, hiddenKeys, handleToggle, handleColorChange } =
    useChartLegend({ dataKeys, initialColors });

  // 보이는 데이터만 필터링
  const visibleData = useMemo(
    () => data.filter((item) => !hiddenKeys.has(item.name)),
    [data, hiddenKeys]
  );

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={visibleData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={innerRadius}
          >
            {visibleData.map((entry) => (
              <Cell key={entry.name} fill={colors[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
        </RechartsPieChart>
      </ResponsiveContainer>

      <ChartLegend
        dataKeys={dataKeys}
        colors={colors}
        hiddenKeys={hiddenKeys}
        onToggle={handleToggle}
        onColorChange={handleColorChange}
      />
    </Card>
  );
}
