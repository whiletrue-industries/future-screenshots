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

  // Auto-generated fields
  'context-label'?: string; // '{City}, {Month Name} {Year}'
  source?: string; // '{YYYY}.{MM}.{DD} - {Venue}/{Event Name}'
  'email-template'?: string; // 'after-evaluate-{locale}' or 'to-evaluate-{locale}'
}

export interface Workspace {
  id: string;
  metadata: WorkspaceMetadata;
  keys?: {
    admin: string;
    collaborate: string;
  };
}

export interface CreateWorkspaceRequest {
  metadata: WorkspaceMetadata;
  public?: boolean;
  collaborate?: boolean;
}

export interface UpdateWorkspaceRequest {
  metadata: WorkspaceMetadata;
}
