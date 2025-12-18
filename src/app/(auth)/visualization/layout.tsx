import { QueryClient, dehydrate } from "@tanstack/react-query";
import { ChartQueries } from "@/modules/queries/chart-queries";
import { ChartService } from "@/modules/service/chart-service";
import { VisualizationProvider } from "./providers";

export default async function VisualizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  // 🚀 모든 차트 데이터를 한 번에 prefetch
  await Promise.all([
    // bar-donut 페이지용
    queryClient.prefetchQuery({
      queryKey: ChartQueries.keys.weeklyMoodTrend(),
      queryFn: () => ChartService.fetchWeeklyMoodTrend(),
    }),
    queryClient.prefetchQuery({
      queryKey: ChartQueries.keys.popularSnackBrands(),
      queryFn: () => ChartService.fetchPopularSnackBrands(),
    }),
    // stacked 페이지용
    queryClient.prefetchQuery({
      queryKey: ChartQueries.keys.weeklyWorkoutTrend(),
      queryFn: () => ChartService.fetchWeeklyWorkoutTrend(),
    }),
    // multiline 페이지용
    queryClient.prefetchQuery({
      queryKey: ChartQueries.keys.coffeeConsumption(),
      queryFn: () => ChartService.fetchCoffeeConsumption(),
    }),
    queryClient.prefetchQuery({
      queryKey: ChartQueries.keys.snackImpact(),
      queryFn: () => ChartService.fetchSnackImpact(),
    }),
  ]);

  return (
    <VisualizationProvider state={dehydrate(queryClient)}>
      {children}
    </VisualizationProvider>
  );
}
