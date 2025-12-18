/**
 * 차트 TanStack Query 옵션
 * queryKey와 queryFn을 정의하는 클래스
 */

import type { UseQueryOptions } from "@tanstack/react-query";
import { ChartService } from "@/modules/service/chart-service";
import { getQueryClient } from "@/shared/libs/query-client";

export class ChartQueries {
  /**
   * Query Keys 정의
   */
  static readonly keys = {
    root: ["chart"] as const,
    topCoffeeBrands: () => [...this.keys.root, "top-coffee-brands"] as const,
    popularSnackBrands: () =>
      [...this.keys.root, "popular-snack-brands"] as const,
    weeklyMoodTrend: () => [...this.keys.root, "weekly-mood-trend"] as const,
    weeklyWorkoutTrend: () =>
      [...this.keys.root, "weekly-workout-trend"] as const,
    coffeeConsumption: () => [...this.keys.root, "coffee-consumption"] as const,
    snackImpact: () => [...this.keys.root, "snack-impact"] as const,
  };

  /**
   * 인기 커피 브랜드 분포 조회 쿼리
   */
  static queryTopCoffeeBrands(): UseQueryOptions<Chart.TopCoffeeBrandsResponse> {
    return {
      queryKey: this.keys.topCoffeeBrands(),
      queryFn: () => ChartService.fetchTopCoffeeBrands(),
      staleTime: Infinity, // 수동 무효화 전까지 캐시 유지
      gcTime: 1000 * 60 * 30, // 30분
    };
  }

  /**
   * 인기 간식 브랜드 분포 조회 쿼리
   */
  static queryPopularSnackBrands(): UseQueryOptions<Chart.PopularSnackBrandsResponse> {
    return {
      queryKey: this.keys.popularSnackBrands(),
      queryFn: () => ChartService.fetchPopularSnackBrands(),
      staleTime: Infinity, // 수동 무효화 전까지 캐시 유지
      gcTime: 1000 * 60 * 30, // 30분
    };
  }

  /**
   * 주간 무드 트렌드 조회 쿼리
   */
  static queryWeeklyMoodTrend(): UseQueryOptions<Chart.WeeklyMoodTrendResponse> {
    return {
      queryKey: this.keys.weeklyMoodTrend(),
      queryFn: () => ChartService.fetchWeeklyMoodTrend(),
      staleTime: Infinity, // 수동 무효화 전까지 캐시 유지
      gcTime: 1000 * 60 * 30, // 30분
    };
  }

  /**
   * 주간 운동 트렌드 조회 쿼리
   */
  static queryWeeklyWorkoutTrend(): UseQueryOptions<Chart.WeeklyWorkoutTrendResponse> {
    return {
      queryKey: this.keys.weeklyWorkoutTrend(),
      queryFn: () => ChartService.fetchWeeklyWorkoutTrend(),
      staleTime: Infinity, // 수동 무효화 전까지 캐시 유지
      gcTime: 1000 * 60 * 30, // 30분
    };
  }

  /**
   * 팀별 커피 소비/버그/생산성 조회 쿼리
   */
  static queryCoffeeConsumption(): UseQueryOptions<Chart.CoffeeConsumptionResponse> {
    return {
      queryKey: this.keys.coffeeConsumption(),
      queryFn: () => ChartService.fetchCoffeeConsumption(),
      staleTime: Infinity, // 수동 무효화 전까지 캐시 유지
      gcTime: 1000 * 60 * 30, // 30분
    };
  }

  /**
   * 부서별 간식 영향 조회 쿼리
   */
  static querySnackImpact(): UseQueryOptions<Chart.SnackImpactResponse> {
    return {
      queryKey: this.keys.snackImpact(),
      queryFn: () => ChartService.fetchSnackImpact(),
      staleTime: Infinity, // 수동 무효화 전까지 캐시 유지
      gcTime: 1000 * 60 * 30, // 30분
    };
  }

  /**
   * 쿼리 무효화 헬퍼 메서드
   */
  static invalidate = {
    /**
     * 인기 커피 브랜드 분포 무효화
     */
    topCoffeeBrands: () => {
      const queryClient = getQueryClient();
      return queryClient.invalidateQueries({
        queryKey: this.keys.topCoffeeBrands(),
      });
    },

    /**
     * 인기 간식 브랜드 분포 무효화
     */
    popularSnackBrands: () => {
      const queryClient = getQueryClient();
      return queryClient.invalidateQueries({
        queryKey: this.keys.popularSnackBrands(),
      });
    },

    /**
     * 주간 무드 트렌드 무효화
     */
    weeklyMoodTrend: () => {
      const queryClient = getQueryClient();
      return queryClient.invalidateQueries({
        queryKey: this.keys.weeklyMoodTrend(),
      });
    },

    /**
     * 주간 운동 트렌드 무효화
     */
    weeklyWorkoutTrend: () => {
      const queryClient = getQueryClient();
      return queryClient.invalidateQueries({
        queryKey: this.keys.weeklyWorkoutTrend(),
      });
    },

    /**
     * 팀별 커피 소비/버그/생산성 무효화
     */
    coffeeConsumption: () => {
      const queryClient = getQueryClient();
      return queryClient.invalidateQueries({
        queryKey: this.keys.coffeeConsumption(),
      });
    },

    /**
     * 부서별 간식 영향 무효화
     */
    snackImpact: () => {
      const queryClient = getQueryClient();
      return queryClient.invalidateQueries({
        queryKey: this.keys.snackImpact(),
      });
    },

    /**
     * 모든 차트 관련 쿼리 무효화
     */
    all: () => {
      const queryClient = getQueryClient();
      return queryClient.invalidateQueries({
        queryKey: this.keys.root,
      });
    },
  };
}
