/**
 * 라인 차트 컴포넌트
 */

import { Card } from "antd";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useChartLegend } from "@/shared/hooks/use-chart-legend";
import { ChartLegend } from "./common/chart-legend";
import { CHART_DEFAULTS } from "@/theme/chart-config";

interface LineChartProps {
  data: Array<Record<string, any>>;
  dataKeys: string[];
  xAxisKey: string;
  labels?: Record<string, string>;
  title?: string;
  height?: number;
  initialColors?: string[];
}

export function LineChart({
  data,
  dataKeys,
  xAxisKey,
  labels,
  title,
  height = CHART_DEFAULTS.height,
  initialColors,
}: LineChartProps) {
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
        <RechartsLineChart data={data} margin={CHART_DEFAULTS.margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          {visibleDataKeys.map((key) => (
            <Line
              key={key}
              dataKey={key}
              stroke={colors[key]}
              type="monotone"
              strokeWidth={2}
            />
          ))}
        </RechartsLineChart>
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
