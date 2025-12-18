/**
 * 차트 API 서비스
 * API 호출만 담당하는 순수한 서비스 클래스
 */

import { apiClient } from "@/shared/apis";

export class ChartService {
  /**
   * 인기 커피 브랜드 분포 조회
   * 바/도넛 차트용 데이터
   */
  static async fetchTopCoffeeBrands(): Promise<Chart.TopCoffeeBrandsResponse> {
    const response = await apiClient.get<Chart.TopCoffeeBrandsResponse>(
      "/mock/top-coffee-brands"
    );
    return response.data;
  }

  /**
   * 인기 간식 브랜드 분포 조회
   * 바/도넛 차트용 데이터
   */
  static async fetchPopularSnackBrands(): Promise<Chart.PopularSnackBrandsResponse> {
    const response = await apiClient.get<Chart.PopularSnackBrandsResponse>(
      "/mock/popular-snack-brands"
    );
    return response.data;
  }

  /**
   * 주간 무드 트렌드 조회
   * 스택형 바/면적 차트용 데이터
   */
  static async fetchWeeklyMoodTrend(): Promise<Chart.WeeklyMoodTrendResponse> {
    const response = await apiClient.get<Chart.WeeklyMoodTrendResponse>(
      "/mock/weekly-mood-trend"
    );
    return response.data;
  }

  /**
   * 주간 운동 트렌드 조회
   * 스택형 바/면적 차트용 데이터
   */
  static async fetchWeeklyWorkoutTrend(): Promise<Chart.WeeklyWorkoutTrendResponse> {
    const response = await apiClient.get<Chart.WeeklyWorkoutTrendResponse>(
      "/mock/weekly-workout-trend"
    );
    return response.data;
  }

  /**
   * 팀별 커피 소비/버그/생산성 조회
   * 멀티라인 차트용 데이터
   */
  static async fetchCoffeeConsumption(): Promise<Chart.CoffeeConsumptionResponse> {
    const response = await apiClient.get<Chart.CoffeeConsumptionResponse>(
      "/mock/coffee-consumption"
    );
    return response.data;
  }

  /**
   * 부서별 간식 영향 조회
   * 멀티라인 차트용 데이터
   */
  static async fetchSnackImpact(): Promise<Chart.SnackImpactResponse> {
    const response = await apiClient.get<Chart.SnackImpactResponse>(
      "/mock/snack-impact"
    );
    return response.data;
  }
}
