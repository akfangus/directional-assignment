/**
 * 차트 범례 상태 관리 훅
 * 모든 차트 컴포넌트에서 재사용
 */

import { useState, useMemo, useCallback } from "react";
import { CHART_COLORS } from "@/theme/chart-config";

interface UseChartLegendProps {
  dataKeys: string[];
  initialColors?: string[];
}

interface UseChartLegendReturn {
  colors: Record<string, string>;
  hiddenKeys: Set<string>;
  visibleDataKeys: string[];
  handleToggle: (key: string) => void;
  handleColorChange: (key: string, color: string) => void;
}

export function useChartLegend({
  dataKeys,
  initialColors,
}: UseChartLegendProps): UseChartLegendReturn {
  // 숨긴 데이터 키 관리
  const [hiddenKeys, setHiddenKeys] = useState<Set<string>>(new Set());

  // 색상 관리
  const [colors, setColors] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      dataKeys.map((key, i) => [
        key,
        initialColors?.[i] || CHART_COLORS[i % CHART_COLORS.length],
      ])
    )
  );

  // 보이는 데이터 키만 필터링 (메모이제이션)
  const visibleDataKeys = useMemo(
    () => dataKeys.filter((key) => !hiddenKeys.has(key)),
    [dataKeys, hiddenKeys]
  );

  // 토글 핸들러
  const handleToggle = useCallback((key: string) => {
    setHiddenKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  }, []);

  // 색상 변경 핸들러
  const handleColorChange = useCallback((key: string, color: string) => {
    setColors((prev) => ({ ...prev, [key]: color }));
  }, []);

  return {
    colors,
    hiddenKeys,
    visibleDataKeys,
    handleToggle,
    handleColorChange,
  };
}
