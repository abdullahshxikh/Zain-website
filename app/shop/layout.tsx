import { Suspense } from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Required for useSearchParams() usage within the /shop route segment.
  return <Suspense fallback={null}>{children}</Suspense>;
}


