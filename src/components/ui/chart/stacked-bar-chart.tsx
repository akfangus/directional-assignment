/**
 * 스택형 바 차트 컴포넌트
 */

import { Card } from "antd";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useChartLegend } from "@/shared/hooks/use-chart-legend";
import { ChartLegend } from "./common/chart-legend";
import { CHART_DEFAULTS } from "@/theme/chart-config";

interface StackedBarChartProps {
  data: Array<Record<string, any>>;
  dataKeys: string[];
  xAxisKey: string;
  labels?: Record<string, string>;
  title?: string;
  height?: number;
  initialColors?: string[];
}

export function StackedBarChart({
  data,
  dataKeys,
  xAxisKey,
  labels,
  title,
  height = CHART_DEFAULTS.height,
  initialColors,
}: StackedBarChartProps) {
  const {
    colors,
    hiddenKeys,
    visibleDataKeys,
    handleToggle,
    handleColorChange,
  } = useChartLegend({ dataKeys, initialColors });

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={CHART_DEFAULTS.margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          {visibleDataKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[key]}
              stackId="stack" // 모든 Bar를 하나의 스택으로 묶음
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>

      <ChartLegend
        dataKeys={dataKeys}
        labels={labels}
        colors={colors}
        hiddenKeys={hiddenKeys}
        onToggle={handleToggle}
        onColorChange={handleColorChange}
      />
    </Card>
  );
}
