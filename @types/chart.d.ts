/**
 * 차트 (Chart) 관련 타입 정의
 * 네임스페이스를 통해 전역에서 Chart.TopCoffeeBrandsData 등으로 사용 가능
 */

declare namespace Chart {
  /**
   * 커피 브랜드 인기도 데이터
   * GET /mock/top-coffee-brands
   */
  interface CoffeeBrandData {
    brand: string;
    popularity: number;
  }

  type TopCoffeeBrandsResponse = CoffeeBrandData[];

  /**
   * 간식 브랜드 점유율 데이터
   * GET /mock/popular-snack-brands
   */
  interface SnackBrandData {
    name: string;
    share: number;
  }

  type PopularSnackBrandsResponse = SnackBrandData[];

  /**
   * 주간 무드 트렌드 데이터
   * GET /mock/weekly-mood-trend
   */
  interface MoodTrendData {
    week: string;
    happy: number;
    tired: number;
    stressed: number;
  }

  type WeeklyMoodTrendResponse = MoodTrendData[];

  /**
   * 주간 운동 트렌드 데이터
   * GET /mock/weekly-workout-trend
   */
  interface WorkoutTrendData {
    week: string;
    running: number;
    cycling: number;
    stretching: number;
  }

  type WeeklyWorkoutTrendResponse = WorkoutTrendData[];

  /**
   * 팀별 커피 소비/버그/생산성 데이터
   * GET /mock/coffee-consumption
   */
  interface CoffeeConsumptionSeries {
    cups: number;
    bugs: number;
    productivity: number;
  }

  interface CoffeeConsumptionTeam {
    team: string;
    series: CoffeeConsumptionSeries[];
  }

  interface CoffeeConsumptionResponse {
    teams: CoffeeConsumptionTeam[];
  }

  /**
   * 부서별 간식 영향 데이터
   * GET /mock/snack-impact
   */
  interface SnackImpactMetric {
    snacks: number;
    meetingsMissed: number;
    morale: number;
  }

  interface SnackImpactDepartment {
    name: string;
    metrics: SnackImpactMetric[];
  }

  interface SnackImpactResponse {
    departments: SnackImpactDepartment[];
  }
}
