import { WorkspaceNameUtility } from '../shared/workspace-name.utility';

// --- Direction type ---
export type DirectionValue = 'prefer' | 'mostly-prefer' | 'prevent' | 'mostly-prevent' | 'uncertain';

// --- Shared constants ---

export const PREFER_SLOT_MAP = new Map<number, number>([
  [0, 1],
  [25, 2],
  [50, 3],
  [75, 4],
  [100, 5],
]);

export const PREVENT_SLOT_MAP = new Map<number, number>([
  [100, 5],
  [75, 6],
  [50, 7],
  [25, 8],
  [0, 9],
]);

export const PLAUSIBILITY_LABEL_MAP: Record<number, string> = {
  100: 'projected',
  75: 'probable',
  50: 'plausible',
  25: 'possible',
  0: 'preposterous'
};

export const LEVELS = ['rejected', 'flagged', 'pending', 'not-flagged', 'approved', 'highlighted'];

export const ALL_STATUSES = ['highlighted', 'approved', 'not-flagged', 'pending', 'flagged', 'rejected'];

export const STATUS_OPTIONS: { label: string; value: number }[] = [
  { label: 'Highlighted', value: 5 },
  { label: 'Approved', value: 4 },
  { label: 'Not flagged', value: 3 },
  { label: 'Pending', value: 2 },
  { label: 'Flagged', value: 1 },
  { label: 'Rejected', value: 0 },
];

export const STATUS_LABELS: Record<string, string> = {
  highlighted: 'Highlighted',
  approved: 'Approved',
  'not-flagged': 'Not flagged',
  pending: 'Pending',
  flagged: 'Flagged',
  rejected: 'Rejected',
};

export const TYPE_LABELS: Record<string, string> = {
  sign_in_a_demonstration: '🪧 Sign',
  social_media_post: '📣 Social',
  chat_conversation: '💬 Chat',
  notification_alert: '🔔 Alert',
  ai_agent_query: '🤖 AI',
  review: '⭐ Review',
  map_visualization: '🗺️ Map',
  photograph: '📸 Photo',
};

// --- Pure helper functions ---

export function normalizeDirection(value: string | null | undefined): DirectionValue {
  const normalized = (value || '').toLowerCase();
  if (normalized === 'prefer') return 'prefer';
  if (normalized === 'mostly prefer') return 'mostly-prefer';
  if (normalized === 'mostly prevent') return 'mostly-prevent';
  if (normalized === 'prevent') return 'prevent';
  return 'uncertain';
}

export function coerceValue(original: any, rawValue: any): any {
  if (typeof original === 'number') {
    const num = Number(rawValue);
    return Number.isNaN(num) ? original : num;
  }
  if (typeof original === 'boolean') {
    return rawValue === true || rawValue === 'true';
  }
  return rawValue;
}

export function getAIConfidence(item: any): number {
  const content = item.content_certainty || 0;
  const transition = item.transition_bar_certainty || 0;
  return Math.round((content + transition) / 2);
}

export function getConfidenceLevel(item: any): string {
  const confidence = getAIConfidence(item);
  if (confidence >= 80) return 'high';
  if (confidence >= 50) return 'medium';
  return 'low';
}

export function getIndicatorSlot(item: any | null): number | null {
  if (!item) return null;
  const plausibility = Number(item.plausibility);
  if (!Number.isFinite(plausibility)) return null;

  const direction = normalizeDirection(item.favorable_future);
  if (direction === 'prefer' || direction === 'mostly-prefer') {
    return PREFER_SLOT_MAP.get(plausibility) ?? null;
  }
  if (direction === 'prevent' || direction === 'mostly-prevent') {
    return PREVENT_SLOT_MAP.get(plausibility) ?? null;
  }
  return null;
}

export function getIndicatorLabel(item: any | null): string {
  if (!item) return 'No score';
  const plausibility = Number(item.plausibility);
  const plausibilityLabel = PLAUSIBILITY_LABEL_MAP[plausibility];
  const direction = normalizeDirection(item.favorable_future);

  if (!plausibilityLabel) return 'No plausibility score';

  switch (direction) {
    case 'prefer':
      return `prefer ${plausibilityLabel}`;
    case 'mostly-prefer':
      return `mostly prefer ${plausibilityLabel}`;
    case 'prevent':
      return `prevent ${plausibilityLabel}`;
    case 'mostly-prevent':
      return `mostly prevent ${plausibilityLabel}`;
    default:
      return `uncertain ${plausibilityLabel}`;
  }
}

export function isPreferDirection(item: any | null): boolean {
  const direction = normalizeDirection(item?.favorable_future);
  return direction === 'prefer' || direction === 'mostly-prefer';
}

export function isPreventDirection(item: any | null): boolean {
  const direction = normalizeDirection(item?.favorable_future);
  return direction === 'prevent' || direction === 'mostly-prevent';
}

export function isMostlyPrefer(item: any | null): boolean {
  return normalizeDirection(item?.favorable_future) === 'mostly-prefer';
}

export function isMostlyPrevent(item: any | null): boolean {
  return normalizeDirection(item?.favorable_future) === 'mostly-prevent';
}

export function isNeutralDirection(item: any | null): boolean {
  return normalizeDirection(item?.favorable_future) === 'uncertain';
}

export function getDesirabilityClass(value: string): string {
  if (!value) return '';
  if (value.includes('prefer')) return 'prefer';
  if (value.includes('prevent')) return 'prevent';
  return 'uncertain';
}

export function getPlausibilityClass(value: number): string {
  if (!value) return '';
  if (value >= 75) return 'high';
  if (value >= 25) return 'medium';
  return 'low';
}

export function getEmail(item: any): string {
  return item._private_email || item.email || item.user_email || 'unknown@user.com';
}

export function getWorkspaceNameWithEmojis(workspace: any): string {
  return WorkspaceNameUtility.formatWorkspaceNameWithEmojis(workspace);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
}
