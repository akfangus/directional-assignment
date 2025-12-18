/**
 * 인터랙티브 차트 범례 컴포넌트
 * Ant Design 컴포넌트로 구성
 */

import { Checkbox, Space, ColorPicker } from "antd";

interface ChartLegendProps {
  dataKeys: string[];
  labels?: Record<string, string>;
  colors: Record<string, string>;
  hiddenKeys: Set<string>;
  onToggle: (key: string) => void;
  onColorChange: (key: string, color: string) => void;
}

export function ChartLegend({
  dataKeys,
  labels,
  colors,
  hiddenKeys,
  onToggle,
  onColorChange,
}: ChartLegendProps) {
  return (
    <Space wrap style={{ marginTop: 16 }}>
      {dataKeys.map((key) => (
        <Checkbox
          key={key}
          checked={!hiddenKeys.has(key)}
          onChange={() => onToggle(key)}
        >
          <Space size={8}>
            {/* 색상 인디케이터 */}
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: colors[key],
                borderRadius: 2,
              }}
            />
            {/* 라벨 */}
            <span>{labels?.[key] || key}</span>
            {/* 색상 피커 */}
            <ColorPicker
              size="small"
              value={colors[key]}
              onChange={(color) => onColorChange(key, color.toHexString())}
            />
          </Space>
        </Checkbox>
      ))}
    </Space>
  );
}
