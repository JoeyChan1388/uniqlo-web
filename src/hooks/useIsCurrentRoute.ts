"use client";

import { usePathname, useSearchParams } from "next/navigation";

// ------------------------------------------------------------------

type Matcher =
  | string
  | RegExp
  | ((pathname: string, search: URLSearchParams | null) => boolean);

// ------------------------------------------------------------------

/**
 * Custom hook to determine if the current route matches a given pattern.
 * 
 * @param matcher - A string, RegExp, or function to match the current route
 * @param opts - Optional settings (e.g., ignoreQuery)
 * @returns 
 */
export default function useIsRoute(
  matcher: Matcher,
  opts?: { ignoreQuery?: boolean }
) {
  const pathname = usePathname();
  const search = useSearchParams();

  if (!pathname) return false;

  if (typeof matcher === "string") {
    return opts?.ignoreQuery
      ? pathname === matcher
      : pathname + (search ? `?${search.toString()}` : "") === matcher;
  }
  if (matcher instanceof RegExp) return matcher.test(pathname);
  return matcher(pathname, search);
}
