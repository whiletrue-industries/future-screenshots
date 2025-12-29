import { Component, computed, effect, input, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PhotoMetadata } from '../photo-data';
import { ApiService } from '../../../api.service';
import { Message, MessagesComponent } from '../../messages/messages.component';
import { LtrDirective } from '../../ltr.directive';

interface PrebakedOption {
  id: string;
  label: string;
  prompt: string;
}

@Component({
  selector: 'app-lightbox-chat',
  imports: [FormsModule, MessagesComponent, LtrDirective],
  templateUrl: './lightbox-chat.component.html',
  styleUrl: './lightbox-chat.component.less'
})
export class LightboxChatComponent {
  private apiService = inject(ApiService);

  photoMetadata = input.required<PhotoMetadata>();
  
  messages = signal<Message[]>([]);
  inputMessage = signal<string>('');
  thinking = signal<boolean>(false);
  initialAnalysisShown = signal<boolean>(false);
  showPrebakedOptions = signal<boolean>(true);
  
  // Metadata change management
  pendingMetadataChanges = signal<any | null>(null);
  metadataBackup = signal<any | null>(null);

  prebakedOptions: PrebakedOption[] = [
    {
      id: 'not-exactly',
      label: 'not exactly',
      prompt: 'That\'s not exactly what I meant. Let me clarify...'
    },
    {
      id: 'map-to-cone',
      label: 'map to the cone',
      prompt: 'Help me map this to the futures cone - is it preferred, prevented, or potential?'
    },
    {
      id: 'what-do-you-make',
      label: 'what do you make of this?',
      prompt: 'What opportunities for action do you see in the present based on this future?'
    }
  ];

  constructor() {
    effect(() => {
      const photo = this.photoMetadata();
      if (photo && !this.initialAnalysisShown()) {
        this.showInitialAnalysis();
      }
    });
  }

  private showInitialAnalysis(): void {
    this.thinking.set(true);
    this.initialAnalysisShown.set(true);

    // Generate initial analysis
    const analysisMessage = this.generateInitialAnalysis();
    this.addMessage('ai', analysisMessage);
    
    this.thinking.set(false);
  }

  private generateInitialAnalysis(): string {
    // TODO: This should come from the API/AI
    // For now, generate a placeholder based on available metadata
    const photo = this.photoMetadata();
    return `This image represents a vision for the future captured at this location. Based on the visual elements, this appears to be exploring possibilities in [domain]. How would you like to explore this further?`;
  }

  addMessage(kind: 'ai' | 'human', text: string): void {
    this.messages.update(msgs => [...msgs, new Message(kind, text)]);
  }

  selectPrebakedOption(option: PrebakedOption): void {
    this.inputMessage.set(option.prompt);
    this.showPrebakedOptions.set(false);
  }

  submitMessage(): void {
    const message = this.inputMessage();
    if (!message.trim()) return;

    this.addMessage('human', message);
    this.inputMessage.set('');
    this.thinking.set(true);
    this.showPrebakedOptions.set(false);

    // TODO: Implement actual API call for chat
    // For now, just add a placeholder response
    setTimeout(() => {
      this.addMessage('ai', 'I understand. Let me help you with that...');
      this.thinking.set(false);
    }, 1000);
  }

  approveMetadataChanges(): void {
    const changes = this.pendingMetadataChanges();
    if (!changes) return;

    // Create backup
    const backup = {
      timestamp: new Date().toISOString(),
      previousContent: { ...this.photoMetadata() }
    };
    this.metadataBackup.set(backup);

    // TODO: Save changes via API
    console.log('Approved metadata changes:', changes);
    console.log('Backup created:', backup);

    this.pendingMetadataChanges.set(null);
  }

  rejectMetadataChanges(): void {
    this.pendingMetadataChanges.set(null);
  }
}
