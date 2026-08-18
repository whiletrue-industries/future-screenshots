export interface WorkspaceMetadata {
  // Mandatory fields
  date: string; // YYYY-MM-DD format
  city: string;
  country: string;
  venue: string;
  event_name: string;
  interactive_workshop: boolean;
  languages: string[]; // Array of language codes: 'he', 'ar', 'en', 'nl'
  facilitator_names: string[];

  // Optional fields
  keywords?: string[];
  active_templates?: string[]; // Array of template IDs to show in the template gallery

  // Strategic workshop fields (optional)
  ws_strategic?: boolean; // Whether this workspace supports strategic workshop mode
  ws_groups?: WsGroup[]; // Thematic groups for the strategic workshop
  ws_rounds?: number; // Number of rounds (default: 4)
  ws_round_prompts?: string[]; // Array of prompts, one per round
  open_now?: boolean; // Whether this workspace is the quick-link target for /#now
  now_default_mode?: NowDefaultMode; // Default /#now ingest mode
  now_end_time?: string; // Optional ISO datetime for when /#now should stop being active

  // Auto-generated fields
  'context-label'?: string; // '{City}, {Month Name} {Year}'
  source?: string; // '{YYYY}.{MM}.{DD} - {Venue}/{Event Name}'
  'email-template'?: string; // 'after-evaluate-{locale}' or 'to-evaluate-{locale}'
}

export type NowDefaultMode = 'evaluate' | 'workshop' | 'batch';

export interface WsGroup {
  id: string; // Unique identifier for the group (e.g., 'group-1')
  name: string; // Display name for the group (e.g., 'Education')
  color?: string; // Optional color for the group (hex)
}

export interface Workspace {
  id: string;
  metadata: WorkspaceMetadata;
  keys?: {
    admin: string;
    collaborate: string;
  };
  item_count?: number;
  reviewed_count?: number;
  public?: boolean; // Whether the workspace allows public visibility
  collaborate?: boolean; // Whether the workspace allows collaboration/new items
  open_now?: boolean; // Whether this workspace is the target for /#now quick-link
  now_default_mode?: NowDefaultMode; // Default mode for /#now when no hash override is passed
  now_end_time?: string; // Optional ISO datetime for when /#now should stop being active
}

export interface EnrichedItem {
  _workspaceId?: string;
  _workspaceName?: string;
  _workspaceAdminKey?: string;
  [key: string]: any;
}

export interface CreateOrUpdateWorkspaceRequest {
  metadata: WorkspaceMetadata | null;
  public?: boolean;
  collaborate?: boolean;
  open_now?: boolean;
  now_default_mode?: NowDefaultMode;
}
