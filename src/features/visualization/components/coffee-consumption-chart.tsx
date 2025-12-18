/**
 * Coffee Consumption 듀얼 Y축 멀티라인 차트
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { ChartQueries } from "@/modules/queries/chart-queries";
import { DualAxisLineChart } from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";

export function CoffeeConsumptionChart() {
  const { data, isLoading } = useQuery(ChartQueries.queryCoffeeConsumption());

  if (isLoading) return <Spinner />;
  if (!data) return null;

  return (
    <DualAxisLineChart
      data={data}
      title="☕ Coffee Consumption vs Bugs & Productivity"
      xAxisKey="cups"
      leftMetric="bugs"
      rightMetric="productivity"
      leftLabel="Bugs"
      rightLabel="Productivity"
      height={500}
    />
  );
}
