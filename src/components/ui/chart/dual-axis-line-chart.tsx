/**
 * 듀얼 Y축 멀티라인 차트 컴포넌트
 * - 왼쪽 Y축: bugs, meetingsMissed
 * - 오른쪽 Y축: productivity, morale
 * - 팀별 색상 통일, 실선/점선 구분, 마커 구분
 * - 인터랙티브 범례 (데이터 보이기/숨기기, 색상 변경)
 */

import React, { useMemo } from "react";
import { Card } from "antd";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CHART_DEFAULTS } from "@/theme/chart-config";
import { useChartLegend } from "@/shared/hooks/use-chart-legend";
import { ChartLegend } from "./common/chart-legend";

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

  const teams = data.teams || data.departments || [];

  // 데이터 변환: 팀별 series를 플랫하게 변환
  const transformedData = useMemo(() => {
    if (!data.teams && !data.departments) return [];

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
  }, [data, teams, xAxisKey, leftMetric, rightMetric]);

  // 모든 라인의 키 생성 (팀_메트릭 형태)
  const allDataKeys = useMemo(() => {
    const keys: string[] = [];
    teams.forEach((team: any) => {
      const teamName = team.team || team.name;
      keys.push(`${teamName}_${leftMetric}`);
      keys.push(`${teamName}_${rightMetric}`);
    });
    return keys;
  }, [teams, leftMetric, rightMetric]);

  // 라벨 생성
  const labels = useMemo(() => {
    const result: Record<string, string> = {};
    teams.forEach((team: any) => {
      const teamName = team.team || team.name;
      result[`${teamName}_${leftMetric}`] = `${teamName} ${leftLabel}`;
      result[`${teamName}_${rightMetric}`] = `${teamName} ${rightLabel}`;
    });
    return result;
  }, [teams, leftMetric, rightMetric, leftLabel, rightLabel]);

  // 초기 색상 생성 (팀별 동일 색상)
  const initialColors = useMemo(() => {
    const colors: string[] = [];
    teams.forEach((team: any) => {
      const teamName = team.team || team.name;
      const color = TEAM_COLORS[teamName] || "#8c8c8c";
      colors.push(color); // left metric
      colors.push(color); // right metric
    });
    return colors;
  }, [teams]);

  // useChartLegend 훅 사용
  const {
    colors,
    hiddenKeys,
    visibleDataKeys,
    handleToggle,
    handleColorChange,
  } = useChartLegend({ dataKeys: allDataKeys, initialColors });

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
            const [teamName, metric] = entry.dataKey.split("_");
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

          {/* 각 팀별 라인 - 보이는 것만 렌더링 */}
          {teams.map((team: any) => {
            const teamName = team.team || team.name;
            const leftKey = `${teamName}_${leftMetric}`;
            const rightKey = `${teamName}_${rightMetric}`;
            const leftColor = colors[leftKey];
            const rightColor = colors[rightKey];

            return (
              <React.Fragment key={teamName}>
                {/* 왼쪽 축: 실선, 원형 마커 */}
                {visibleDataKeys.includes(leftKey) && (
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey={leftKey}
                    stroke={leftColor}
                    strokeWidth={2}
                    strokeDasharray="" // 실선
                    dot={{ fill: leftColor, r: 4 }} // 원형 마커
                    name={`${teamName} ${leftLabel}`}
                  />
                )}

                {/* 오른쪽 축: 점선, 사각형 마커 */}
                {visibleDataKeys.includes(rightKey) && (
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey={rightKey}
                    stroke={rightColor}
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
                          fill={rightColor}
                        />
                      );
                    }}
                    name={`${teamName} ${rightLabel}`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </RechartsLineChart>
      </ResponsiveContainer>

      {/* 커스텀 범례 */}
      <ChartLegend
        dataKeys={allDataKeys}
        labels={labels}
        colors={colors}
        hiddenKeys={hiddenKeys}
        onToggle={handleToggle}
        onColorChange={handleColorChange}
      />
    </Card>
  );
}
