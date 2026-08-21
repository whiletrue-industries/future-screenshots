import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

export type NowMode = 'evaluate' | 'workshop' | 'batch';

/**
 * The `/#now` quick-link target, stored server-side in the global key-value
 * store under the key `now` (see `GET/PUT /global/<key>` in the server API).
 * A `null` value means no workspace is currently the NOW target.
 */
export interface NowTarget {
  workspace_id: string;
  api_key: string; // collaborate key of the target workspace
  mode: NowMode;
  end_time: string | null; // optional ISO datetime after which /#now is inactive
}

export const NOW_GLOBAL_KEY = 'now';

export function normalizeNowMode(raw: unknown): NowMode | null {
  return raw === 'evaluate' || raw === 'workshop' || raw === 'batch' ? raw : null;
}

export function parseNowTarget(raw: unknown): NowTarget | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  const value = raw as Record<string, unknown>;
  const workspaceId = typeof value['workspace_id'] === 'string' ? value['workspace_id'] : '';
  const apiKey = typeof value['api_key'] === 'string' ? value['api_key'] : '';
  if (!workspaceId || !apiKey) {
    return null;
  }
  const endTime = typeof value['end_time'] === 'string' && value['end_time'].length > 0 ? value['end_time'] : null;
  return {
    workspace_id: workspaceId,
    api_key: apiKey,
    mode: normalizeNowMode(value['mode']) || 'evaluate',
    end_time: endTime,
  };
}

/** True when the target has an `end_time` that has already passed. */
export function isNowTargetExpired(target: NowTarget, nowMs: number): boolean {
  if (!target.end_time) {
    return false;
  }
  const endMs = Date.parse(target.end_time);
  return !Number.isNaN(endMs) && nowMs > endMs;
}

/** Relative ingest URL (for `prescan`) for the given target and mode. */
export function buildNowIngestUrl(target: NowTarget, mode: NowMode): string {
  const params = new URLSearchParams({
    workspace: target.workspace_id,
    api_key: target.api_key,
  });
  if (mode === 'workshop') {
    params.set('ws', 'true');
  } else if (mode === 'batch') {
    params.set('automatic', 'true');
  }
  return `prescan?${params.toString()}`;
}

/**
 * Read side of the `/#now` target. Writes are admin-only and live in
 * `AdminApiService.setNowTarget()`.
 */
@Injectable({
  providedIn: 'root'
})
export class NowTargetService {

  private readonly CHRONOMAPS_API_URL = 'https://chronomaps-api-qjzuw7ypfq-ez.a.run.app';
  private http = inject(HttpClient);

  /** Last known target; `undefined` until the first load completes. */
  target = signal<NowTarget | null | undefined>(undefined);

  /** Fetches the current target from the public `GET /global/now` endpoint. */
  load(): Observable<NowTarget | null> {
    return this.http.get<unknown>(`${this.CHRONOMAPS_API_URL}/global/${NOW_GLOBAL_KEY}`).pipe(
      map(value => parseNowTarget(value)),
      catchError((error) => {
        // 404 simply means the key was never set.
        if (error?.status !== 404) {
          console.error('Error fetching /#now target:', error);
        }
        return of(null);
      }),
      tap(target => this.target.set(target))
    );
  }
}
