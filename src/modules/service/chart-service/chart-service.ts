/**
 * 차트 API 서비스
 * 서버: Next.js fetch (캐싱)
 * 클라이언트: Axios (기존 방식)
 */

import { apiClient } from "@/shared/apis";

// 서버/클라이언트 여부 확인
const isServer = typeof window === "undefined";

// 서버 사이드에서만 사용 (클라이언트는 apiClient 사용)
const API_BASE_URL = process.env.API_URL;

export class ChartService {
  /**
   * 인기 커피 브랜드 분포 조회
   */
  static async fetchTopCoffeeBrands(): Promise<Chart.TopCoffeeBrandsResponse> {
    if (isServer) {
      if (!API_BASE_URL) {
        throw new Error("API_URL environment variable is not defined");
      }

      // 서버: Next.js fetch (캐싱 지원)
      const response = await fetch(`${API_BASE_URL}/mock/top-coffee-brands`, {
        next: {
          revalidate: 3600,
          tags: ["chart-data"],
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch top coffee brands");
      }

      return response.json();
    } else {
      // 클라이언트: Axios (기존 방식)
      const response = await apiClient.get<Chart.TopCoffeeBrandsResponse>(
        "/mock/top-coffee-brands"
      );
      return response.data;
    }
  }

  /**
   * 인기 간식 브랜드 분포 조회
   */
  static async fetchPopularSnackBrands(): Promise<Chart.PopularSnackBrandsResponse> {
    if (isServer) {
      if (!API_BASE_URL) {
        throw new Error("API_URL environment variable is not defined");
      }

      const response = await fetch(
        `${API_BASE_URL}/mock/popular-snack-brands`,
        {
          next: {
            revalidate: 3600,
            tags: ["chart-data"],
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch popular snack brands");
      }

      return response.json();
    } else {
      const response = await apiClient.get<Chart.PopularSnackBrandsResponse>(
        "/mock/popular-snack-brands"
      );
      return response.data;
    }
  }

  /**
   * 주간 무드 트렌드 조회
   */
  static async fetchWeeklyMoodTrend(): Promise<Chart.WeeklyMoodTrendResponse> {
    if (isServer) {
      if (!API_BASE_URL) {
        throw new Error("API_URL environment variable is not defined");
      }

      const response = await fetch(`${API_BASE_URL}/mock/weekly-mood-trend`, {
        next: {
          revalidate: 3600,
          tags: ["chart-data"],
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch weekly mood trend");
      }

      return response.json();
    } else {
      const response = await apiClient.get<Chart.WeeklyMoodTrendResponse>(
        "/mock/weekly-mood-trend"
      );
      return response.data;
    }
  }

  /**
   * 주간 운동 트렌드 조회
   */
  static async fetchWeeklyWorkoutTrend(): Promise<Chart.WeeklyWorkoutTrendResponse> {
    if (isServer) {
      if (!API_BASE_URL) {
        throw new Error("API_URL environment variable is not defined");
      }

      const response = await fetch(
        `${API_BASE_URL}/mock/weekly-workout-trend`,
        {
          next: {
            revalidate: 3600,
            tags: ["chart-data"],
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weekly workout trend");
      }

      return response.json();
    } else {
      const response = await apiClient.get<Chart.WeeklyWorkoutTrendResponse>(
        "/mock/weekly-workout-trend"
      );
      return response.data;
    }
  }

  /**
   * 팀별 커피 소비/버그/생산성 조회
   */
  static async fetchCoffeeConsumption(): Promise<Chart.CoffeeConsumptionResponse> {
    if (isServer) {
      if (!API_BASE_URL) {
        throw new Error("API_URL environment variable is not defined");
      }

      const response = await fetch(`${API_BASE_URL}/mock/coffee-consumption`, {
        next: {
          revalidate: 3600,
          tags: ["chart-data"],
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch coffee consumption");
      }

      return response.json();
    } else {
      const response = await apiClient.get<Chart.CoffeeConsumptionResponse>(
        "/mock/coffee-consumption"
      );
      return response.data;
    }
  }

  /**
   * 부서별 간식 영향 조회
   */
  static async fetchSnackImpact(): Promise<Chart.SnackImpactResponse> {
    if (isServer) {
      if (!API_BASE_URL) {
        throw new Error("API_URL environment variable is not defined");
      }

      const response = await fetch(`${API_BASE_URL}/mock/snack-impact`, {
        next: {
          revalidate: 3600,
          tags: ["chart-data"],
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch snack impact");
      }

      return response.json();
    } else {
      const response = await apiClient.get<Chart.SnackImpactResponse>(
        "/mock/snack-impact"
      );
      return response.data;
    }
  }
}
