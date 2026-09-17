import { signal } from '@angular/core';
import { AdminApiService } from '../../admin-api.service';

export type MapRebuildState = 'idle' | 'running' | 'done' | 'empty' | 'failed';

/**
 * One workspace's manual map rebuild, as shown next to a "Rebuild map" button: whether a
 * run is going, and a line of text saying where it is or how it ended.
 */
export class MapRebuild {
  state = signal<MapRebuildState>('idle');
  status = signal('');

  constructor(private api: AdminApiService) {}

  start(workspace: string, adminKey: string, onDone?: () => void): void {
    // The clusterer takes no lock, so a second click would start an overlapping run.
    if (!workspace || !adminKey || this.state() === 'running') {
      return;
    }
    this.state.set('running');
    this.status.set('Starting…');
    // The stream ending is not success - a run that hits its memory or time limit just stops.
    let outcome: 'done' | 'empty' | 'failed' = 'failed';
    let failure = 'The run stopped before the map was published.';
    this.api.rebuildMap(workspace, adminKey).subscribe({
      next: (bit) => {
        if (bit.done) {
          outcome = 'done';
        } else if (bit.empty) {
          outcome = 'empty';
        } else if (bit.error) {
          failure = bit.error;
        }
        if (bit.message) {
          this.status.set(`${bit.seconds}s · ${bit.message}`);
        }
      },
      error: (error) => {
        console.error('Error rebuilding map:', error);
        this.state.set('failed');
        this.status.set(`The run was cut off (${error?.message || error}).`);
      },
      complete: () => {
        this.state.set(outcome);
        this.status.set({
          done: 'Map rebuilt.',
          empty: 'No usable items yet, so no map was written.',
          failed: failure,
        }[outcome]);
        if (outcome === 'done') {
          onDone?.();
        }
      },
    });
  }
}
