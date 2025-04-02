"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 개발자 도구
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

export const queryClient = new QueryClient();
export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Dev Tool : React Query DevTools 셋팅 */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}
