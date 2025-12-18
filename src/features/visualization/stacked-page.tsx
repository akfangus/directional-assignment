/**
 * 스택형 바/면적 차트 페이지 (백분율)
 */

"use client";

import { Typography } from "antd";
import { StackedCharts } from "./components/stacked-charts";

const { Title } = Typography;

export function StackedPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>📊 스택형 바 차트 & 면적 차트 (백분율)</Title>
      <StackedCharts />
    </div>
  );
}
