/**
 * Snack Impact 듀얼 Y축 멀티라인 차트
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { ChartQueries } from "@/modules/queries/chart-queries";
import { DualAxisLineChart } from "@/components/ui/chart";

export function SnackImpactChart() {
  const { data } = useQuery(ChartQueries.querySnackImpact());

  if (!data) return null;

  return (
    <DualAxisLineChart
      data={data}
      title="🍪 Snack Impact vs Meetings Missed & Morale"
      xAxisKey="snacks"
      leftMetric="meetingsMissed"
      rightMetric="morale"
      leftLabel="Meetings Missed"
      rightLabel="Morale"
      height={500}
    />
  );
}
