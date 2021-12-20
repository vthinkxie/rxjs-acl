# RxJS Anti-corruption Layer

## API V1
```ts
import { forkJoin, map, mergeMap, Observable } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export function getMemoryFree(): Observable<number> {
  return fromFetch("/api/v1/memory/free").pipe(mergeMap((res) => res.json()));
}

export function getMemoryUsage(): Observable<number> {
  return fromFetch("/api/v1/memory/usage").pipe(mergeMap((res) => res.json()));
}

export function getMemoryUsagePercent(): Observable<number> {
  return forkJoin([getMemoryUsage(), getMemoryFree()]).pipe(
    map(([usage, free]) => +((usage / (usage + free)) * 100).toFixed(2))
  );
}
```

### API V2
```diff
export function getMemoryFree(): Observable<number> {
  return fromFetch("/api/v2/memory/free").pipe(
     mergeMap((res) => res.json()),
+    map((data) => data.data)
  );
}

export function getMemoryUsage(): Observable<number> {
  return fromFetch("/api/v2/memory/usage").pipe(
     mergeMap((res) => res.json()),
+    map((data) => data.data)
  );
}
```


### API V3
```ts
import { map, mergeMap, Observable } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export function getMemory(): Observable<{ free: number; usage: number }> {
  return fromFetch("/api/v3/memory").pipe(
    mergeMap((res) => res.json()),
    map((data) => data.data)
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
    map(({ usage, free }) => +((usage / (usage + free)) * 100).toFixed(2))
  );
}
```
