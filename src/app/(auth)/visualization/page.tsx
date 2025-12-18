/**
 * Visualization 대시보드 페이지
 * 12개의 차트를 요구사항에 맞게 구현
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { Row, Col, Typography } from "antd";
import { ChartQueries } from "@/modules/queries/chart-queries";
import {
  BarChart,
  PieChart,
  StackedBarChart,
  AreaChart,
  DualAxisLineChart,
} from "@/components/ui/chart";
import { useMemo } from "react";

const { Title } = Typography;

export default function VisualPage() {
  // API 데이터 fetching
  const { data: moodData } = useQuery(ChartQueries.queryWeeklyMoodTrend());
  const { data: snackData } = useQuery(ChartQueries.queryPopularSnackBrands());
  const { data: workoutData } = useQuery(
    ChartQueries.queryWeeklyWorkoutTrend()
  );

  // (1) 도넛 차트용 데이터 변환
  const moodPieData = useMemo(() => {
    if (!moodData) return [];
    // 전체 합계 계산
    const totals = moodData.reduce(
      (acc, curr) => ({
        happy: acc.happy + curr.happy,
        tired: acc.tired + curr.tired,
        stressed: acc.stressed + curr.stressed,
      }),
      { happy: 0, tired: 0, stressed: 0 }
    );
    return [
      { name: "happy", value: totals.happy },
      { name: "tired", value: totals.tired },
      { name: "stressed", value: totals.stressed },
    ];
  }, [moodData]);

  const snackPieData = useMemo(
    () =>
      snackData?.map((item) => ({
        name: item.name,
        value: item.share,
      })) || [],
    [snackData]
  );

  // (2) 백분율 변환 함수
  const convertToPercentage = (
    data: Array<Record<string, any>>,
    keys: string[]
  ) => {
    return data.map((item) => {
      const total = keys.reduce((sum, key) => sum + (item[key] || 0), 0);
      const result: Record<string, any> = { ...item };
      keys.forEach((key) => {
        result[key] = total > 0 ? ((item[key] / total) * 100).toFixed(1) : 0;
      });
      return result;
    });
  };

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
    <div style={{ padding: 24 }}>
      <Title level={2}>📊 Visualization Dashboard</Title>

      {/* (1) 바 차트 + 도넛 차트 */}
      <Title level={3} style={{ marginTop: 32 }}>
        1. 바 차트 & 도넛 차트
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <BarChart
            data={moodData || []}
            dataKeys={["happy", "tired", "stressed"]}
            xAxisKey="week"
            labels={{ happy: "행복", tired: "피곤", stressed: "스트레스" }}
            title="😊 주간 무드 트렌드 (바 차트)"
          />
        </Col>
        <Col xs={24} lg={12}>
          <PieChart
            data={moodPieData}
            title="😊 주간 무드 트렌드 (도넛 차트)"
            innerRadius={60}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <BarChart
            data={snackData || []}
            dataKeys={["share"]}
            xAxisKey="name"
            labels={{ share: "점유율" }}
            title="🍪 간식 브랜드 점유율 (바 차트)"
          />
        </Col>
        <Col xs={24} lg={12}>
          <PieChart
            data={snackPieData}
            title="🍪 간식 브랜드 점유율 (도넛 차트)"
            innerRadius={60}
          />
        </Col>
      </Row>

      {/* (2) 스택형 바 차트 + 면적 차트 (백분율) */}
      <Title level={3} style={{ marginTop: 48 }}>
        2. 스택형 바 차트 & 면적 차트 (백분율)
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
            title="😊 주간 무드 트렌드 (스택형 바 - %)"
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
            title="😊 주간 무드 트렌드 (면적 - %)"
            stacked
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
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
            title="🏃 주간 운동 트렌드 (스택형 바 - %)"
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
            title="🏃 주간 운동 트렌드 (면적 - %)"
            stacked
          />
        </Col>
      </Row>

      {/* (3) 멀티라인 차트 (듀얼 Y축) */}
      <Title level={3} style={{ marginTop: 48 }}>
        3. 멀티라인 차트 (듀얼 Y축)
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <CoffeeConsumptionChart />
        </Col>
        <Col xs={24} style={{ marginTop: 16 }}>
          <SnackImpactChart />
        </Col>
      </Row>
    </div>
  );
}

// Coffee Consumption 차트
function CoffeeConsumptionChart() {
  const { data } = useQuery(ChartQueries.queryCoffeeConsumption());

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
    />
  );
}

// Snack Impact 차트
function SnackImpactChart() {
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
    />
  );
}
