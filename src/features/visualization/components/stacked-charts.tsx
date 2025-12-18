/**
 * 스택형 바 차트 + 면적 차트 컴포넌트 (백분율)
 * weekly-mood-trend, weekly-workout-trend 데이터 표시
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { Row, Col, Typography } from "antd";
import { ChartQueries } from "@/modules/queries/chart-queries";
import { StackedBarChart, AreaChart } from "@/components/ui/chart";
import { useMemo } from "react";

const { Title } = Typography;

// 백분율 변환 함수
function convertToPercentage(data: Array<Record<string, any>>, keys: string[]) {
  return data.map((item) => {
    const total = keys.reduce((sum, key) => sum + (item[key] || 0), 0);
    const result: Record<string, any> = { ...item };
    keys.forEach((key) => {
      result[key] = total > 0 ? ((item[key] / total) * 100).toFixed(1) : 0;
    });
    return result;
  });
}

export function StackedCharts() {
  // API 데이터 fetching (레이아웃에서 prefetch됨)
  const { data: moodData } = useQuery(ChartQueries.queryWeeklyMoodTrend());
  const { data: workoutData } = useQuery(
    ChartQueries.queryWeeklyWorkoutTrend()
  );

  // 백분율 데이터
  const moodPercentData = useMemo(
    () =>
      moodData
        ? convertToPercentage(moodData, ["happy", "tired", "stressed"])
        : [],
    [moodData]
  );

  const workoutPercentData = useMemo(
    () =>
      workoutData
        ? convertToPercentage(workoutData, ["running", "cycling", "stretching"])
        : [],
    [workoutData]
  );

  return (
    <>
      <Title level={3} style={{ marginTop: 32 }}>
        😊 주간 무드 트렌드
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <StackedBarChart
            data={moodPercentData}
            dataKeys={["happy", "tired", "stressed"]}
            xAxisKey="week"
            labels={{
              happy: "행복 (%)",
              tired: "피곤 (%)",
              stressed: "스트레스 (%)",
            }}
            title="스택형 바 차트"
          />
        </Col>
        <Col xs={24} lg={12}>
          <AreaChart
            data={moodPercentData}
            dataKeys={["happy", "tired", "stressed"]}
            xAxisKey="week"
            labels={{
              happy: "행복 (%)",
              tired: "피곤 (%)",
              stressed: "스트레스 (%)",
            }}
            title="면적 차트"
            stacked
          />
        </Col>
      </Row>

      <Title level={3} style={{ marginTop: 48 }}>
        🏃 주간 운동 트렌드
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <StackedBarChart
            data={workoutPercentData}
            dataKeys={["running", "cycling", "stretching"]}
            xAxisKey="week"
            labels={{
              running: "달리기 (%)",
              cycling: "사이클 (%)",
              stretching: "스트레칭 (%)",
            }}
            title="스택형 바 차트"
          />
        </Col>
        <Col xs={24} lg={12}>
          <AreaChart
            data={workoutPercentData}
            dataKeys={["running", "cycling", "stretching"]}
            xAxisKey="week"
            labels={{
              running: "달리기 (%)",
              cycling: "사이클 (%)",
              stretching: "스트레칭 (%)",
            }}
            title="면적 차트"
            stacked
          />
        </Col>
      </Row>
    </>
  );
}
