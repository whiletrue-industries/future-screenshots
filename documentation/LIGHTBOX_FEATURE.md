# Lightbox with Chat Feature

## Overview

The lightbox with chat feature enables users to view showcase photos in full-screen mode and engage in AI-powered conversations about the images. This feature enhances the interactive experience of the showcase by allowing detailed discussion and metadata refinement.

## Architecture

### Components

#### 1. LightboxComponent
**Location:** `projects/app/src/app/showcase-ws/lightbox/`

Main lightbox container that displays:
- Full-screen image overlay
- Close button
- Chat toggle button (bottom left)
- Chat sidebar (when active)

**Key Features:**
- Click outside to close
- Keyboard navigation support
- Smooth animations
- Responsive design

#### 2. LightboxChatComponent
**Location:** `projects/app/src/app/showcase-ws/lightbox-chat/`

Chat interface within the lightbox that provides:
- Initial AI analysis of the image
- Message history display
- Pre-baked conversation options
- Metadata change approval dialog
- Text input for free-form chat

**Pre-baked Options:**
1. **"not exactly"** - Encourages user to correct the system's understanding
2. **"map to the cone"** - Guides user through prefer/prevent/potential flow
3. **"what do you make of this?"** - Discusses opportunities for action

#### 3. LightboxService
**Location:** `projects/app/src/app/showcase-ws/lightbox.service.ts`

State management service that handles:
- Opening/closing lightbox
- Toggling chat visibility
- Managing selected photo metadata
- Updating photo data

### Integration

The lightbox integrates with the three-renderer service to capture photo clicks:

```typescript
// In ThreeRendererService
private onPhotoClickCallback?: (photoId: string, photoData: any) => void;

setPhotoClickCallback(callback: (photoId: string, photoData: any) => void): void {
  this.onPhotoClickCallback = callback;
}
```

Click detection distinguishes between clicks and drags:
- **Click:** Mouse down + up within 300ms and minimal movement
- **Drag:** Longer duration or significant movement

## User Flow

1. **View Showcase:** User browses photos in the showcase-ws view
2. **Click Photo:** User clicks on any photo
3. **Lightbox Opens:** Photo displays in full-screen lightbox
4. **Initial Analysis:** (TODO) AI provides 2-sentence analysis of the image
5. **Chat Options:** User sees pre-baked conversation options
6. **Discussion:** User can select options or type custom messages
7. **Metadata Changes:** If conversation suggests changes, approval dialog appears
8. **Save Changes:** (TODO) User approves changes, system creates backup and saves

## Data Handling

### Metadata Changes

When the chat conversation leads to metadata changes:

1. **Detection:** System identifies suggested changes
2. **Approval Dialog:** User sees proposed changes
3. **Backup Creation:**
   ```typescript
   {
     timestamp: "2025-01-15T10:30:00.000Z",
     previousContent: { ...originalMetadata }
   }
   ```
4. **Save:** Changes applied via API

### Backup Structure

```typescript
interface MetadataBackup {
  timestamp: string;           // ISO 8601 format
  previousContent: {
    id: string;
    url: string;
    screenshot_url: string;
    created_at: string;
    author_id?: string;
    layout_x?: number;
    layout_y?: number;
    [key: string]: any;        // Additional metadata
  };
}
```

## Styling

### Design System Integration

The lightbox follows the platform's design system:

**Colors:**
- Primary: `#4E02B2` (Purple - chat button, send button)
- Background: `rgba(0, 0, 0, 0.9)` (Dark overlay)
- Surface: `white` (Chat sidebar, buttons)
- Text: `#333` (Primary text)

**Spacing:**
- Container padding: `20px`
- Chat message gap: `12px`
- Button sizes: `44px` (close), `56px` (chat toggle), `40px` (send)

**Animations:**
- Fade in: `0.2s ease-out` (backdrop)
- Slide in: `0.3s ease-out` (chat sidebar)
- Transform: `0.3s ease-out` (image shift when chat opens)

### Responsive Design

**Desktop (>768px):**
- Chat sidebar: 400px width
- Image shifts left by 200px when chat opens
- Close and chat buttons in fixed positions

**Mobile (≤768px):**
- Chat sidebar: full width
- Image hidden when chat opens
- Optimized for touch interactions

## Accessibility

### Implemented Features

- **Keyboard Navigation:** Escape key closes lightbox
- **Focus Management:** Proper focus order for interactive elements
- **ARIA Labels:** All buttons have descriptive labels
- **Color Contrast:** Meets WCAG AA standards

### TODO: Additional Requirements

- [ ] Add keyboard shortcuts documentation
- [ ] Implement focus trap in lightbox
- [ ] Add screen reader announcements for chat messages
- [ ] Ensure all interactive elements are keyboard accessible

## API Integration

### Current State (Placeholder)

The chat currently uses placeholder responses. To integrate with the backend:

```typescript
// In LightboxChatComponent
submitMessage(): void {
  const message = this.inputMessage();
  
  // TODO: Replace with actual API call
  this.apiService.sendMessage(message).subscribe((ret: any) => {
    if (ret.kind === 'message') {
      this.addMessage('ai', ret.content);
    }
  });
}
```

### Required Backend Endpoints

1. **GET `/api/chat/initial-analysis`**
   - Input: `item_id`, `workspace`, `api_key`
   - Output: Initial 2-sentence analysis

2. **POST `/api/chat/message`**
   - Input: `message`, `item_id`, `workspace`, `api_key`, `conversation_history`
   - Output: Streaming AI response (SSE)

3. **PUT `/api/item/{item_id}/metadata`**
   - Input: `metadata`, `backup`, `item_key`, `workspace`, `api_key`
   - Output: Updated item with success confirmation

## Testing

### Manual Testing Steps

1. **Basic Functionality:**
   ```
   - Navigate to showcase-ws with valid credentials
   - Click on any photo
   - Verify lightbox opens with image displayed
   - Click close button to verify lightbox closes
   - Click outside lightbox to verify it closes
   ```

2. **Chat Functionality:**
   ```
   - Open lightbox on a photo
   - Click chat button (bottom left)
   - Verify chat sidebar slides in
   - Verify initial analysis is displayed (when implemented)
   - Click pre-baked options
   - Verify options populate input field
   - Type custom message and send
   - Verify placeholder response appears
   ```

3. **Metadata Changes:**
   ```
   - (When backend integrated) Trigger metadata change in chat
   - Verify approval dialog appears
   - Approve changes
   - Verify backup is created
   - Verify changes are saved
   ```

4. **Responsive Design:**
   ```
   - Test on desktop (>768px)
   - Test on tablet (768px)
   - Test on mobile (<768px)
   - Verify layout adapts correctly
   ```

### Automated Testing (TODO)

```typescript
describe('LightboxComponent', () => {
  it('should open when photo is clicked');
  it('should close when backdrop is clicked');
  it('should close when close button is clicked');
  it('should toggle chat sidebar');
});

describe('LightboxChatComponent', () => {
  it('should display initial analysis');
  it('should show pre-baked options');
  it('should send messages');
  it('should show metadata approval dialog');
});
```

## Known Limitations

1. **API Integration:** Chat streaming and metadata saving need backend implementation
2. **Initial Analysis:** Placeholder text shown instead of AI-generated analysis
3. **Accessibility:** Some keyboard shortcuts and screen reader support pending
4. **Multi-language:** Chat interface needs i18n integration

## Future Enhancements

### Short Term
- [ ] Integrate with backend chat API
- [ ] Implement streaming responses
- [ ] Add real initial analysis
- [ ] Complete accessibility features
- [ ] Add i18n support for chat interface

### Long Term
- [ ] Voice input for chat
- [ ] Image annotations in lightbox
- [ ] Multi-photo comparison mode
- [ ] Export conversation history
- [ ] Collaborative chat (multiple users)

## Related Files

### Core Files
- `projects/app/src/app/showcase-ws/lightbox/lightbox.component.{ts,html,less}`
- `projects/app/src/app/showcase-ws/lightbox-chat/lightbox-chat.component.{ts,html,less}`
- `projects/app/src/app/showcase-ws/lightbox.service.ts`
- `projects/app/src/app/showcase-ws/three-renderer.service.ts`
- `projects/app/src/app/showcase-ws/showcase-ws.component.{ts,html}`

### Dependencies
- `projects/app/src/app/messages/messages.component.ts` - Message display component
- `projects/app/src/api.service.ts` - API communication
- `projects/app/src/app/showcase-ws/photo-data.ts` - Photo metadata models

## Contributing

When modifying this feature:

1. **Follow Coding Standards:** See `documentation/CODING_STANDARDS.md`
2. **Maintain Accessibility:** All changes must meet WCAG AA
3. **Update Tests:** Add/update tests for new functionality
4. **Document Changes:** Update this file with significant changes
5. **Review Integration:** Ensure changes don't break showcase-ws functionality

## Support

For questions or issues:
- Create an issue on GitHub
- Reference this documentation
- Include screenshots of unexpected behavior
- Provide browser/device information
