import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService } from '../../../admin-api.service';
import { WorkspaceMetadata, CreateOrUpdateWorkspaceRequest, WsGroup } from '../workspace-metadata.interface';

interface LanguageOption {
  code: string;
  name: string;
}

@Component({
  selector: 'app-workspace-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workspace-form.component.html',
  styleUrls: ['./workspace-form.component.less']
})
export class WorkspaceFormComponent implements OnInit {
  isEditMode = signal(false);
  workspaceId = signal<string | null>(null);
  adminKey = signal<string | null>(null);

  // Form data
  formData = signal<WorkspaceMetadata>({
    date: '',
    city: '',
    country: '',
    venue: '',
    event_name: '',
    interactive_workshop: false,
    languages: [],
    facilitator_names: [''],
    keywords: [],
    active_templates: [
      'post', 'chat', 'notification', 'review', 'prompt', 
      'photo', 'sign', 'holyland', 'world'
    ], // Default: all except jerusalem, europe, us
    'context-label': '',
    source: '',
    'email-template': ''
  });

  publicVisible = signal(false);
  collaborate = signal(false);

  // Available options
  availableLanguages: LanguageOption[] = [
    { code: 'he', name: 'Hebrew' },
    { code: 'ar', name: 'Arabic' },
    { code: 'en', name: 'English' },
    { code: 'nl', name: 'Dutch' }
  ];

  // Keyword input
  keywordInput = signal('');

  // Strategic workshop: new group input
  newGroupName = signal('');

  // Strategic workshop: round prompts as string array
  wsRoundPromptsRaw = computed(() => {
    const prompts = this.formData().ws_round_prompts || [];
    const rounds = this.formData().ws_rounds || 4;
    // Pad to match round count
    const padded = [...prompts];
    while (padded.length < rounds) {
      padded.push('');
    }
    return padded.slice(0, rounds);
  });

  // Available templates
  availableTemplates = [
    { id: 'post', name: 'Post' },
    { id: 'chat', name: 'Chat' },
    { id: 'notification', name: 'Notification' },
    { id: 'review', name: 'Review' },
    { id: 'prompt', name: 'Prompt' },
    { id: 'photo', name: 'Photo' },
    { id: 'sign', name: 'Sign' },
    { id: 'holyland', name: 'Holy Land' },
    { id: 'world', name: 'World' },
    { id: 'jerusalem', name: 'Jerusalem' },
    { id: 'europe', name: 'Europe' },
    { id: 'us', name: 'United States' },
  ];

  // UI state
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminApi: AdminApiService
  ) {}

  ngOnInit() {
    // Check if we're in edit mode
    this.route.params.subscribe(params => {
      if (params['workspaceId']) {
        this.isEditMode.set(true);
        this.workspaceId.set(params['workspaceId']);
      }
    });

    // Get admin key from query params (for edit mode)
    this.route.queryParams.subscribe(params => {
      if (params['key']) {
        this.adminKey.set(params['key']);
      }
    });

    // Load workspace data if in edit mode
    if (this.isEditMode() && this.workspaceId() && this.adminKey()) {
      this.loadWorkspaceData();
    }
  }

  loadWorkspaceData() {
    const id = this.workspaceId();
    const key = this.adminKey();
    if (!id || !key) return;

    this.adminApi.getWorkspace(id, key).subscribe({
      next: (workspace_metadata) => {
        if (workspace_metadata) {
          const metadata = { ...workspace_metadata };

          // Reverse-engineer missing fields from existing data
          this.reverseEngineerFields(metadata);

          this.formData.set(metadata);
          this.publicVisible.set(workspace_metadata['public'] || false);
          this.collaborate.set(workspace_metadata['collaborate'] || false);

          // Ensure facilitator_names is an array
          if (!this.formData().facilitator_names || this.formData().facilitator_names.length === 0) {
            this.formData.update(data => ({ ...data, facilitator_names: [''] }));
          }
        }
      },
      error: (error) => {
        console.error('Error loading workspace:', error);
        this.errorMessage.set('Failed to load workspace data. Please check the admin key.');
      }
    });
  }

  reverseEngineerFields(metadata: WorkspaceMetadata) {
    // Try to extract date from source field: '{YYYY}.{MM}.{DD} - {Venue}/{Event Name}'
    if (!metadata.date && metadata.source) {
      const dateMatch = metadata.source.match(/^(\d{2,4})[\.-](\d{2})[\.-](\d{2})/);
      if (dateMatch) {
        if (dateMatch[1].length === 2) {
          // Assume 21st century for 2-digit years
          dateMatch[1] = '20' + dateMatch[1];
        }
        metadata.date = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
      }
    }

    // Try to extract venue and event_name from source: '{YYYY}.{MM}.{DD} - {Venue}/{Event Name}'
    if (metadata.source) {
      const sourceMatch = metadata.source.match(/^\d{2,4}[\.-]\d{2}[\.-]\d{2}[- ]+(.+?)\/(.+)$/);
      if (sourceMatch) {
        if (!metadata.venue) {
          metadata.venue = sourceMatch[1].trim();
        }
        if (!metadata.event_name) {
          metadata.event_name = sourceMatch[2].trim();
        }
      }
    }

    // Try to extract city from context-label: '{City}, {Month Name} {Year}'
    if (!metadata.city && metadata['context-label']) {
      const cityMatch = metadata['context-label'].match(/^([^,]+),/);
      if (cityMatch) {
        metadata.city = cityMatch[1].trim();
      }
    }

    // Try to determine interactive_workshop from email-template
    if (metadata.interactive_workshop === undefined && metadata['email-template']) {
      metadata.interactive_workshop = metadata['email-template'].startsWith('to-evaluate-');
    }

    // Try to extract primary language from email-template: 'after-evaluate-{locale}' or 'to-evaluate-{locale}'
    if ((!metadata.languages || metadata.languages.length === 0) && metadata['email-template']) {
      const localeMatch = metadata['email-template'].match(/-(he|ar|en|nl)$/);
      if (localeMatch) {
        metadata.languages = [localeMatch[1]];
      }
    }
    metadata.languages = metadata.languages || [];

    // Ensure facilitator_names is initialized
    if (!metadata.facilitator_names) {
      metadata.facilitator_names = [];
    }

    // Ensure keywords is initialized
    if (!metadata.keywords) {
      metadata.keywords = [];
    }

    // Initialize active_templates with default values if not present
    // By default all templates are active except: jerusalem, europe, us
    if (!metadata.active_templates) {
      metadata.active_templates = [
        'post', 'chat', 'notification', 'review', 'prompt', 
        'photo', 'sign', 'holyland', 'world'
      ];
    }

    // Initialize strategic workshop fields
    if (metadata.ws_strategic === undefined) {
      metadata.ws_strategic = false;
    }
    if (!metadata.ws_rounds) {
      metadata.ws_rounds = 5;
    }
    if (!metadata.ws_groups) {
      metadata.ws_groups = [];
    }
    if (!metadata.ws_round_prompts || metadata.ws_round_prompts.length === 0) {
      // Default prompts from the Future Screenshots methodology
      metadata.ws_round_prompts = [
        "Imagine it's [year]. Your organisation has achieved its most ambitious goal. Take a screenshot of the digital proof.",
        "What is the biggest challenge your organisation faces today? Take a screenshot that shows this barrier.",
        "Which partner, community, or unexpected actor is key to your success? Take a screenshot showing this collaboration.",
        "What tool, funding, or infrastructure would change everything? Take a screenshot of where you'd find it.",
        "What is the very first thing your organisation will do after this workshop? Take a screenshot of the action.",
      ];
    }
  }

  isLanguageSelected(code: string): boolean {
    return this.formData().languages.includes(code);
  }

  toggleLanguage(code: string) {
    const currentLanguages = [...this.formData().languages || []];
    const index = currentLanguages.indexOf(code);

    if (index > -1) {
      currentLanguages.splice(index, 1);
    } else {
      currentLanguages.push(code);
    }

    this.formData.update(data => ({ ...data, languages: currentLanguages }));
    this.updateAutoGeneratedFields();
  }

  addKeyword() {
    const keyword = this.keywordInput().trim();
    if (!keyword) return;

    const currentKeywords = [...(this.formData().keywords || [])];

    // Don't add duplicates
    if (!currentKeywords.includes(keyword)) {
      currentKeywords.push(keyword);
      this.formData.update(data => ({ ...data, keywords: currentKeywords }));
    }

    // Clear input
    this.keywordInput.set('');
  }

  removeKeyword(keyword: string) {
    const currentKeywords = [...(this.formData().keywords || [])];
    const index = currentKeywords.indexOf(keyword);

    if (index > -1) {
      currentKeywords.splice(index, 1);
      this.formData.update(data => ({ ...data, keywords: currentKeywords }));
    }
  }

  onKeywordKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addKeyword();
    }
  }

  isTemplateSelected(templateId: string): boolean {
    return this.formData().active_templates?.includes(templateId) || false;
  }

  toggleTemplate(templateId: string) {
    const currentTemplates = [...this.formData().active_templates || []];
    const index = currentTemplates.indexOf(templateId);

    if (index > -1) {
      currentTemplates.splice(index, 1);
    } else {
      currentTemplates.push(templateId);
    }

    this.formData.update(data => ({ ...data, active_templates: currentTemplates }));
  }

  addFacilitatorName() {
    const names = [...this.formData().facilitator_names, ''];
    this.formData.update(data => ({ ...data, facilitator_names: names }));
  }

  removeFacilitatorName(index: number) {
    const names = [...this.formData().facilitator_names];
    if (names.length > 1) {
      names.splice(index, 1);
      this.formData.update(data => ({ ...data, facilitator_names: names }));
    }
  }

  updateFacilitatorName(index: number, value: string) {
    const names = [...this.formData().facilitator_names];
    names[index] = value;
    this.formData.update(data => ({ ...data, facilitator_names: names }));
  }

  updateAutoGeneratedFields() {
    const data = this.formData();

    // Generate context-label: '{City}, {Month Name} {Year}'
    if (data.date && data.city) {
      const dateObj = new Date(data.date);
      const monthName = dateObj.toLocaleDateString('en-US', { month: 'long' });
      const year = dateObj.getFullYear();
      data['context-label'] = `${data.city}, ${monthName} ${year}`;
    }

    // Generate source: '{YYYY}.{MM}.{DD} - {Venue}/{Event Name}'
    if (data.date && data.venue && data.event_name) {
      const [year, month, day] = data.date.split('-');
      data.source = `${year}.${month}.${day} - ${data.venue}/${data.event_name}`;
    }

    // Generate email-template
    if (data.languages.length > 0) {
      const primaryLocale = data.languages[0];
      data['email-template'] = data.interactive_workshop
        ? `to-evaluate-${primaryLocale}`
        : `after-evaluate-${primaryLocale}`;
    }

    this.formData.set({ ...data });
  }

  onFieldChange() {
    this.updateAutoGeneratedFields();
  }

  isFormValid(): boolean {
    const data = this.formData();
    return !!(
      data.date &&
      data.city &&
      data.country &&
      data.venue &&
      data.event_name &&
      data.languages.length > 0 &&
      data.facilitator_names.length > 0 &&
      data.facilitator_names.every(name => name.trim().length > 0)
    );
  }

  onSubmit() {
    if (!this.isFormValid()) {
      this.errorMessage.set('Please fill in all required fields.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    // Update auto-generated fields one last time
    this.updateAutoGeneratedFields();

    if (this.isEditMode()) {
      this.updateWorkspace();
    } else {
      this.createWorkspace();
    }
  }

  createWorkspace() {
    const request: CreateOrUpdateWorkspaceRequest = {
      metadata: this.formData(),
      public: this.publicVisible(),
      collaborate: this.collaborate()
    };

    this.adminApi.createWorkspace(request).subscribe({
      next: (workspace) => {
        console.log('Workspace created successfully:', workspace);
        this.router.navigate(['/admin'], {
          state: { message: 'Workspace created successfully!' }
        });
      },
      error: (error) => {
        console.error('Error creating workspace:', error);
        this.errorMessage.set(error.error?.message || 'Failed to create workspace. Please try again.');
        this.isSubmitting.set(false);
      }
    });
  }

  updateWorkspace() {
    const id = this.workspaceId();
    const key = this.adminKey();

    if (!id || !key) {
      this.errorMessage.set('Missing workspace ID or admin key.');
      this.isSubmitting.set(false);
      return;
    }

    const request: CreateOrUpdateWorkspaceRequest = {
      metadata: this.formData(),
      public: this.publicVisible(),
      collaborate: this.collaborate()
    };

    this.adminApi.updateWorkspace(id, key, request).subscribe({
      next: (response) => {
        console.log('Workspace updated successfully:', response);
        this.router.navigate(['/admin'], {
          state: { message: 'Workspace updated successfully!' }
        });
      },
      error: (error) => {
        console.error('Error updating workspace:', error);
        this.errorMessage.set(error.error?.message || 'Failed to update workspace. Please try again.');
        this.isSubmitting.set(false);
      }
    });
  }

  private generateGroupId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      try {
        return crypto.randomUUID().slice(0, 8);
      } catch {
        // Fall through to fallback
      }
    }
    return Math.random().toString(36).slice(2, 10);
  }

  onWsStrategicChange(value: boolean) {
    this.formData.update(d => ({ ...d, ws_strategic: value }));
  }

  // ---- Strategic workshop: group management ----

  addGroup() {
    const name = this.newGroupName().trim();
    if (!name) return;
    const existing = this.formData().ws_groups || [];
    const id = `group-${this.generateGroupId()}`;
    const colors = ['#E91E63', '#9C27B0', '#3F51B5', '#2196F3', '#009688', '#FF9800', '#795548', '#607D8B'];
    const color = colors[existing.length % colors.length];
    const groups: WsGroup[] = [...existing, { id, name, color }];
    this.formData.update(data => ({ ...data, ws_groups: groups }));
    this.newGroupName.set('');
  }

  removeGroup(groupId: string) {
    const groups = (this.formData().ws_groups || []).filter(g => g.id !== groupId);
    this.formData.update(data => ({ ...data, ws_groups: groups }));
  }

  updateGroupName(groupId: string, value: string) {
    const groups = (this.formData().ws_groups || []).map(g => g.id === groupId ? { ...g, name: value } : g);
    this.formData.update(data => ({ ...data, ws_groups: groups }));
  }

  onGroupNameKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addGroup();
    }
  }

  // ---- Strategic workshop: round prompt management ----

  updateRoundPrompt(roundIndex: number, value: string) {
    const prompts = [...(this.formData().ws_round_prompts || [])];
    while (prompts.length <= roundIndex) {
      prompts.push('');
    }
    prompts[roundIndex] = value;
    this.formData.update(data => ({ ...data, ws_round_prompts: prompts }));
  }

  updateRoundCount(value: number) {
    const rounds = Math.max(1, Math.min(10, value || 4));
    this.formData.update(data => ({ ...data, ws_rounds: rounds }));
  }

  getRoundPromptArray(): number[] {
    const rounds = this.formData().ws_rounds || 4;
    return Array.from({ length: rounds }, (_, i) => i);
  }

  getRoundPrompt(index: number): string {
    return (this.formData().ws_round_prompts || [])[index] || '';
  }

  cancel() {
    this.router.navigate(['/admin']);
  }

  getLanguageName(code: string): string {
    return this.availableLanguages.find(l => l.code === code)?.name || code;
  }
}
