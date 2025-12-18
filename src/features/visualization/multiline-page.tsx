/**
 * 멀티라인 차트 페이지 (듀얼 Y축)
 */

"use client";

import { Typography } from "antd";
import { CoffeeConsumptionChart } from "./components/coffee-consumption-chart";
import { SnackImpactChart } from "./components/snack-impact-chart";

const { Title } = Typography;

export function MultilinePage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>📊 멀티라인 차트 (듀얼 Y축)</Title>

      <div style={{ marginTop: 32 }}>
        <CoffeeConsumptionChart />
      </div>

      <div style={{ marginTop: 48 }}>
        <SnackImpactChart />
      </div>
    </div>
  );
}
