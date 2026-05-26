"use client";

import { useState } from "react";
import type { FilterState } from "@/lib/types";

export function useSourceFilter(initial: FilterState = "all") {
  const [filter, setFilter] = useState<FilterState>(initial);
  return { filter, setFilter };
}
