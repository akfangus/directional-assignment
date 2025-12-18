/**
 * 면적 차트 컴포넌트
 */

import { Card } from "antd";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useChartLegend } from "@/shared/hooks/use-chart-legend";
import { ChartLegend } from "./common/chart-legend";
import { CHART_DEFAULTS } from "@/theme/chart-config";

interface AreaChartProps {
  data: Array<Record<string, any>>;
  dataKeys: string[];
  xAxisKey: string;
  labels?: Record<string, string>;
  title?: string;
  height?: number;
  stacked?: boolean; // 스택형 면적 차트 여부
  initialColors?: string[];
}

export function AreaChart({
  data,
  dataKeys,
  xAxisKey,
  labels,
  title,
  height = CHART_DEFAULTS.height,
  stacked = false,
  initialColors,
}: AreaChartProps) {
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
        <RechartsAreaChart data={data} margin={CHART_DEFAULTS.margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          {visibleDataKeys.map((key) => (
            <Area
              key={key}
              dataKey={key}
              stroke={colors[key]}
              fill={colors[key]}
              type="monotone"
              stackId={stacked ? "stack" : undefined}
              fillOpacity={0.6}
            />
          ))}
        </RechartsAreaChart>
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
