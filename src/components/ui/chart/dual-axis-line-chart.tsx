import React from "react";
import { Card } from "antd";
/**
 * 듀얼 Y축 멀티라인 차트 컴포넌트
 * - 왼쪽 Y축: bugs, meetingsMissed
 * - 오른쪽 Y축: productivity, morale
 * - 팀별 색상 통일, 실선/점선 구분, 마커 구분
 */

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CHART_DEFAULTS } from "@/theme/chart-config";

interface DualAxisLineChartProps {
  data: any;
  title?: string;
  height?: number;
  xAxisKey: string;
  leftMetric: string; // 'bugs' or 'meetingsMissed'
  rightMetric: string; // 'productivity' or 'morale'
  leftLabel: string;
  rightLabel: string;
}

// 팀별 색상 매핑
const TEAM_COLORS: Record<string, string> = {
  Frontend: "#1890ff",
  Backend: "#52c41a",
  AI: "#722ed1",
  Marketing: "#faad14",
  Sales: "#ff4d4f",
  HR: "#13c2c2",
};

export function DualAxisLineChart({
  data,
  title,
  height = CHART_DEFAULTS.height,
  xAxisKey,
  leftMetric,
  rightMetric,
  leftLabel,
  rightLabel,
}: DualAxisLineChartProps) {
  if (!data) return null;

  // 데이터 변환: 팀별 series를 플랫하게 변환
  const transformedData = (() => {
    if (!data.teams && !data.departments) return [];

    const teams = data.teams || data.departments;
    const maxLength = Math.max(
      ...teams.map((t: any) => t.series?.length || t.metrics?.length || 0)
    );

    const result: any[] = [];
    for (let i = 0; i < maxLength; i++) {
      const point: any = {};

      // X축 값 설정
      const firstTeam = teams[0];
      const seriesData = firstTeam.series || firstTeam.metrics;
      point[xAxisKey] = seriesData[i]?.cups || seriesData[i]?.snacks || i + 1;

      // 각 팀의 데이터 추가
      teams.forEach((team: any) => {
        const teamName = team.team || team.name;
        const series = team.series || team.metrics;
        if (series[i]) {
          point[`${teamName}_${leftMetric}`] = series[i][leftMetric];
          point[`${teamName}_${rightMetric}`] = series[i][rightMetric];
        }
      });

      result.push(point);
    }

    return result;
  })();

  const teams = data.teams || data.departments || [];

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const xValue = payload[0].payload[xAxisKey];

      return (
        <div
          style={{
            background: "white",
            padding: 12,
            border: "1px solid #d9d9d9",
            borderRadius: 4,
          }}
        >
          <p style={{ margin: 0, marginBottom: 8, fontWeight: "bold" }}>
            {xAxisKey}: {xValue}
          </p>
          {payload.map((entry: any, index: number) => {
            const teamName = entry.name.split("_")[0];
            const metric = entry.name.split("_")[1];
            const color = entry.stroke || entry.fill;

            return (
              <div key={index} style={{ margin: "4px 0" }}>
                <span style={{ color }}>●</span>{" "}
                <span style={{ fontWeight: 500 }}>{teamName}</span> - {metric}:{" "}
                <span style={{ fontWeight: "bold" }}>{entry.value}</span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={transformedData}
          margin={CHART_DEFAULTS.margin}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />

          {/* 왼쪽 Y축 */}
          <YAxis
            yAxisId="left"
            label={{ value: leftLabel, angle: -90, position: "insideLeft" }}
          />

          {/* 오른쪽 Y축 */}
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: rightLabel, angle: 90, position: "insideRight" }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* 각 팀별 라인 */}
          {teams.map((team: any) => {
            const teamName = team.team || team.name;
            const color = TEAM_COLORS[teamName] || "#8c8c8c";

            return (
              <React.Fragment key={teamName}>
                {/* 왼쪽 축: 실선, 원형 마커 */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey={`${teamName}_${leftMetric}`}
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray="" // 실선
                  dot={{ fill: color, r: 4 }} // 원형 마커
                  name={`${teamName} ${leftLabel}`}
                />

                {/* 오른쪽 축: 점선, 사각형 마커 */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey={`${teamName}_${rightMetric}`}
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray="5 5" // 점선
                  dot={(props: any) => {
                    const { cx, cy } = props;
                    return (
                      <rect
                        x={cx - 4}
                        y={cy - 4}
                        width={8}
                        height={8}
                        fill={color}
                      />
                    );
                  }}
                  name={`${teamName} ${rightLabel}`}
                />
              </React.Fragment>
            );
          })}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Card>
  );
}
