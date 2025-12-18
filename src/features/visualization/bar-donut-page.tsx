/**
 * 바 차트 & 도넛 차트 페이지
 */

"use client";

import { Typography } from "antd";
import { BarDonutCharts } from "./components/bar-donut-charts";

const { Title } = Typography;

export function BarDonutPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>📊 바 차트 & 도넛 차트</Title>
      <BarDonutCharts />
    </div>
  );
}
