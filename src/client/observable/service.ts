import {
  catchError,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  race,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";

export function getMemoryLegacy(): Observable<{ free: number; usage: number }> {
  const legacyUsage = fromFetch("/api/v2/memory/usage").pipe(
    mergeMap((res) => res.json())
  );
  const legacyFree = fromFetch("/api/v2/memory/free").pipe(
    mergeMap((res) => res.json())
  );
  return forkJoin([legacyUsage, legacyFree], (usage, free) => ({
    free: free.data.free,
    usage: usage.data.usage,
  }));
}

export function getMemory(): Observable<{ free: number; usage: number }> {
  const current = fromFetch("/api/v3/memory").pipe(
    mergeMap((res) => res.json()),
    map((data) => data.data)
  );
  return race(getMemoryLegacy(), current).pipe(
    catchError(() => of({ usage: 0, free: 0 }))
  );
}

export function getMemoryFree(): Observable<number> {
  return getMemory().pipe(map((data) => data.free));
}

export function getMemoryUsage(): Observable<number> {
  return getMemory().pipe(map((data) => data.usage));
}

export function getMemoryUsagePercent(): Observable<number> {
  return getMemory().pipe(
    map(({ usage, free }) => +((usage / (usage + free)) * 100).toFixed(2) || 0)
  );
}
