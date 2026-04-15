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

  // Auto-generated fields
  'context-label'?: string; // '{City}, {Month Name} {Year}'
  source?: string; // '{YYYY}.{MM}.{DD} - {Venue}/{Event Name}'
  'email-template'?: string; // 'after-evaluate-{locale}' or 'to-evaluate-{locale}'
}

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
}
