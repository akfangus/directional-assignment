/**
 * 멀티라인 차트 페이지
 * (3) 듀얼 Y축 멀티라인 차트
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import { ChartQueries } from "@/modules/queries/chart-queries";
import { DualAxisLineChart } from "@/components/ui/chart";

const { Title } = Typography;

export default function MultilineChartPage(): React.ReactElement {
  const { data: coffeeData } = useQuery(ChartQueries.queryCoffeeConsumption());
  const { data: snackData } = useQuery(ChartQueries.querySnackImpact());

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>📊 멀티라인 차트 (듀얼 Y축)</Title>

      {/* coffee-consumption */}
      <div style={{ marginTop: 32 }}>
        <DualAxisLineChart
          data={coffeeData}
          title="☕ Coffee Consumption vs Bugs & Productivity"
          xAxisKey="cups"
          leftMetric="bugs"
          rightMetric="productivity"
          leftLabel="Bugs"
          rightLabel="Productivity"
          height={500}
        />
      </div>

      {/* snack-impact */}
      <div style={{ marginTop: 48 }}>
        <DualAxisLineChart
          data={snackData}
          title="🍪 Snack Impact vs Meetings Missed & Morale"
          xAxisKey="snacks"
          leftMetric="meetingsMissed"
          rightMetric="morale"
          leftLabel="Meetings Missed"
          rightLabel="Morale"
          height={500}
        />
      </div>
    </div>
  );
}
