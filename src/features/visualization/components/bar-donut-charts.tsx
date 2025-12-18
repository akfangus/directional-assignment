/**
 * 바 차트 + 도넛 차트 컴포넌트
 * weekly-mood-trend, popular-snack-brands 데이터 표시
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { Row, Col, Typography } from "antd";
import { ChartQueries } from "@/modules/queries/chart-queries";
import { BarChart, PieChart } from "@/components/ui/chart";
import { useMemo } from "react";

const { Title } = Typography;

export function BarDonutCharts() {
  // API 데이터 fetching
  const { data: moodData } = useQuery(ChartQueries.queryWeeklyMoodTrend());
  const { data: snackData } = useQuery(ChartQueries.queryPopularSnackBrands());

  // 도넛 차트용 데이터 변환
  const moodPieData = useMemo(() => {
    if (!moodData) return [];
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

  return (
    <>
      {/* weekly-mood-trend: 바 + 도넛 */}
      <Title level={3} style={{ marginTop: 32 }}>
        😊 주간 무드 트렌드
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <BarChart
            data={moodData || []}
            dataKeys={["happy", "tired", "stressed"]}
            xAxisKey="week"
            labels={{ happy: "행복", tired: "피곤", stressed: "스트레스" }}
            title="바 차트"
          />
        </Col>
        <Col xs={24} lg={12}>
          <PieChart data={moodPieData} title="도넛 차트" innerRadius={60} />
        </Col>
      </Row>

      {/* popular-snack-brands: 바 + 도넛 */}
      <Title level={3} style={{ marginTop: 48 }}>
        🍪 간식 브랜드 점유율
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <BarChart
            data={snackData || []}
            dataKeys={["share"]}
            xAxisKey="name"
            labels={{ share: "점유율" }}
            title="바 차트"
          />
        </Col>
        <Col xs={24} lg={12}>
          <PieChart data={snackPieData} title="도넛 차트" innerRadius={60} />
        </Col>
      </Row>
    </>
  );
}
