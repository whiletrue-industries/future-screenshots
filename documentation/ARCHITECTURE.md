# Architecture Documentation

## Overview

Future Screenshots (also known as Chronomaps) is an AI-powered participatory mapping platform that enables users to capture, scan, and discuss their visions for the future of specific locations. The platform combines real-time image processing, AI-powered conversation, and geospatial visualization to facilitate collaborative workshops and community engagement around urban planning and development.

### Core Technologies

- **Frontend:** Angular 19.2 with TypeScript 5.7.2, using standalone components and signals
- **Backend:** Firebase (Firestore) + Google Cloud Functions (Python)
- **Image Processing:** OpenCV (cv.js) + jscanify for document detection
- **Mapping:** Leaflet 1.9.4 for 2D interactive maps
- **3D Visualization:** Three.js 0.179.1 for immersive showcases
- **Internationalization:** Angular i18n (English, Hebrew, Dutch)
- **Rendering:** Server-Side Rendering (SSR) with Angular Universal

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Angular 19 Application                       │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │  Scanner   │  │  Discuss   │  │  Showcase  │         │  │
│  │  │ Component  │  │ Component  │  │ Component  │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │        Client-Side Processing                       │  │  │
│  │  │  - OpenCV (document detection)                      │  │  │
│  │  │  - jscanify (corner detection & perspective)        │  │  │
│  │  │  - Leaflet (interactive maps)                       │  │  │
│  │  │  - Three.js (3D visualization)                      │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │          State Management (Signals)                 │  │  │
│  │  │  - StateService (global UI state)                   │  │  │
│  │  │  - ApiService (workspace/item management)           │  │  │
│  │  │  - AuthService (authentication)                     │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS / API Calls
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend Services                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Firebase Platform                            │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │ Firestore  │  │    Auth    │  │  Hosting   │         │  │
│  │  │  Database  │  │            │  │            │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │        Google Cloud Functions (Python)                    │  │
│  │  - Workspace API endpoints                                │  │
│  │  - Item creation/update                                   │  │
│  │  - Screenshot processing                                  │  │
│  │  - AI conversation streaming                              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Components

### Frontend Components

The application uses Angular standalone components organized by feature:

#### Core User Flow Components

1. **Home Component** (`/home`)
   - Entry point with interactive Leaflet map
   - Displays existing items as map markers
   - Provides access to scanner and showcases

2. **Scanner Component** (`/scanner`)
   - Camera access and real-time video streaming
   - Document detection using jscanify and OpenCV
   - Corner detection and perspective correction
   - Image capture with automatic cropping
   - Serves as: `projects/app/src/app/scanner/scanner.component.ts`

3. **Confirm Component** (`/confirm`)
   - Preview captured/scanned image
   - Allow user to retake or proceed
   - Navigate to discussion or property collection

4. **Discuss Component** (`/discuss`)
   - AI-powered chat interface
   - Streaming conversation with backend
   - Markdown rendering for AI responses
   - Message history display
   - Location selection via map integration

5. **Collect Properties Component** (`/collect-properties`)
   - Form-based property collection
   - Custom field support based on workspace configuration
   - Image attachment handling

#### Showcase Components

6. **Showcase Output Map** (`/showcase/output-map`)
   - Public-facing map visualization
   - Display all items from a workspace
   - Interactive markers with popups

7. **PPS25 Showcase** (`/showcase/pps25`)
   - Custom showcase for specific event/campaign

8. **JMA25 Showcase** (`/showcase/jma25`)
   - Custom showcase for specific event/campaign

9. **Showcase WS** (`/showcase-ws`)
   - 3D immersive visualization using Three.js
   - Custom camera controls and scene rendering

#### Admin Components

10. **Admin Login** (`/admin/login`)
    - Admin authentication interface

11. **Moderate Component** (`/admin/moderate`)
    - Content moderation interface
    - Approve/reject items
    - Edit item properties

12. **Workspace Form** (`/admin/workspace-form`)
    - Workspace creation and configuration
    - API key management
    - Custom field definitions

#### Supporting Components

13. **Password Prompt** (`/password-prompt`)
    - Password protection for workspaces
    - Session-based access control

14. **About Component** (`/about`)
    - Information about the platform

15. **Messages Component** (`/messages`)
    - Reusable chat message display
    - Markdown rendering
    - Streaming message support

### Services Architecture

#### Core Services

**ApiService** (`projects/app/src/app/api.service.ts`)
- Primary interface to backend APIs
- Workspace CRUD operations
- Item creation and management
- Screenshot upload and processing
- Conversation streaming
- Uses Angular HttpClient

**StateService** (`projects/app/src/app/state.service.ts`)
- Global application state using Angular Signals
- Manages:
  - Captured images
  - User authentication state
  - UI state (menu visibility, etc.)
  - Session data
- Provides reactive state updates across components

**AuthService** (`projects/app/src/app/admin/auth.service.ts`)
- Firebase Authentication integration
- Admin user management
- Session persistence

**PlatformService** (`projects/app/src/app/platform.service.ts`)
- Browser vs SSR detection
- Platform-specific logic routing
- Ensures proper server-side rendering

#### Specialized Services

**LeafletService** (`projects/app/src/app/home/leaflet.service.ts`)
- Leaflet map initialization and management
- Marker creation and clustering
- Map event handling
- Location selection interface

**ThreeRendererService** (`projects/app/src/app/showcase-ws/three-renderer.service.ts`)
- Three.js scene management
- Camera controls
- 3D visualization rendering
- Animation loop management

**ShowcaseApiService** (`projects/app/src/app/showcase/showcase-api.service.ts`)
- Public API for showcase data
- Read-only access to workspace items
- No authentication required

**AdminApiService** (`projects/app/src/app/admin/admin-api.service.ts`)
- Admin-specific operations
- Moderation actions
- Workspace management

## Data Flow

### User Submission Flow

```
1. User opens app → Home Component
   ↓
2. Clicks "Scan" → Scanner Component
   ├─ Camera access granted
   ├─ Real-time document detection (jscanify/OpenCV)
   ├─ User captures image
   └─ Automatic perspective correction
   ↓
3. Confirm Component
   ├─ Preview processed image
   └─ User approves or retakes
   ↓
4. Discuss Component
   ├─ StateService stores image in memory
   ├─ User chats with AI about their vision
   ├─ ApiService streams conversation to backend
   ├─ Backend processes with AI (Python Cloud Function)
   ├─ Markdown responses rendered in real-time
   └─ User selects location on map (LeafletService)
   ↓
5. Backend Processing
   ├─ Image uploaded to storage
   ├─ Item created in Firestore
   ├─ Metadata extracted and stored
   └─ Geolocation associated
   ↓
6. Confirmation
   └─ Item visible on map (Home Component)
```

### Authentication Flow

```
Workshop Mode (Public):
User → Password Prompt → Session Storage → Access Granted

Admin Mode:
User → Admin Login → Firebase Auth → AuthService → Admin Interface
```

### Showcase Data Flow

```
Public User → Showcase Component
   ↓
ShowcaseApiService → Backend API (unauthenticated)
   ↓
Firestore (read-only query)
   ↓
Items returned → Visualization
   ├─ 2D Map (Leaflet)
   └─ 3D Scene (Three.js)
```

## API Protocols and Interfaces

### Backend API Endpoints

Base URL: Configured via environment/workspace settings

#### Workspace Management

**GET** `/api/workspace/{workspace_id}`
- Retrieve workspace configuration
- Query params: `api_key`, optional `password`
- Response: Workspace object with settings, fields, permissions

**POST** `/api/workspace`
- Create new workspace
- Requires admin authentication
- Body: Workspace configuration object

**PUT** `/api/workspace/{workspace_id}`
- Update workspace settings
- Requires admin API key
- Body: Updated workspace object

#### Item Management

**POST** `/api/item`
- Create new item
- Query params: `workspace`, `api_key`
- Body: Item data including image, properties, location
- Response: Created item with ID

**PUT** `/api/item/{item_id}`
- Update existing item
- Requires appropriate permissions
- Body: Updated item properties

**GET** `/api/items`
- List items for workspace
- Query params: `workspace`, optional filters
- Response: Array of item objects

#### AI Conversation

**POST** `/api/conversation/stream`
- Streaming AI conversation endpoint
- Uses Server-Sent Events (SSE)
- Query params: `workspace`, `api_key`
- Body: Conversation history, current message
- Response: Streamed markdown chunks

#### Screenshot Processing

**POST** `/api/screenshot`
- Upload and process scanned image
- Multipart form data
- Query params: `workspace`, `api_key`
- Response: Processed image URL and metadata

### Data Models

#### Workspace Object

```typescript
interface Workspace {
  id: string;
  name: string;
  description: string;
  password?: string;
  api_keys: {
    collaborator: string;
    admin: string;
  };
  custom_fields?: Array<{
    name: string;
    type: 'text' | 'number' | 'select';
    required: boolean;
    options?: string[];
  }>;
  settings: {
    allow_public_submission: boolean;
    require_location: boolean;
    enable_ai_chat: boolean;
  };
}
```

#### Item Object

```typescript
interface Item {
  id: string;
  workspace_id: string;
  image_url: string;
  thumbnail_url?: string;
  location: {
    lat: number;
    lng: number;
  };
  properties: Record<string, any>;
  conversation?: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }>;
  created_at: number;
  updated_at: number;
  status: 'pending' | 'approved' | 'rejected';
}
```

## State Management

The application uses Angular Signals for reactive state management:

### Global State (StateService)

```typescript
// Current images in processing
images: WritableSignal<string[]>

// Menu visibility
menuOpened: WritableSignal<boolean>

// Authentication state
authState: Signal<AuthState>

// Workspace configuration
workspace: Signal<Workspace | null>
```

### Component-Level State

Components use local signals for UI state:
- Form inputs
- Loading states
- Error messages
- Derived computed values

## Internationalization

The platform supports three languages using Angular i18n:

- **English (en)** - Default locale
- **Hebrew (he)** - RTL support
- **Dutch (nl)** - Nederlands

Translation files located in: `projects/app/src/locale/`

Build process generates separate locale-specific bundles.

## Deployment Architecture

### Build Process

1. Angular production build with AOT compilation
2. Separate builds for each locale (en, he, nl)
3. SSR compilation for server-side rendering
4. Asset optimization and bundling

### Hosting

- **Primary:** GitHub Pages
- **Distribution:** Automated via GitHub Actions
- **Deployment Script:** `deploy.sh`
- **Branch:** `gh-pages` (automatically managed)

### Continuous Integration

```
Push to main branch
   ↓
GitHub Actions trigger
   ↓
Node.js 20 environment setup
   ↓
npm install
   ↓
deploy.sh execution
   ├─ Build all locales
   ├─ Create distribution branch
   └─ Push to gh-pages
   ↓
GitHub Pages deployment
```

## Security Considerations

### Authentication Layers

1. **Public Access:** Password-protected workspaces
2. **Collaborator Access:** API key required for submissions
3. **Admin Access:** Firebase Authentication + admin API key

### API Security

- API keys transmitted via query parameters (HTTPS required)
- CORS configuration on backend
- Rate limiting on Cloud Functions
- Input validation on all endpoints

### Client-Side Security

- XSS prevention via Angular's built-in sanitization
- Content Security Policy headers
- HTTPS-only communication
- Secure session storage for passwords

## Performance Optimizations

### Frontend

- Lazy loading of feature routes
- OnPush change detection strategy
- Image compression before upload
- Efficient signal-based reactivity
- Tree-shakeable standalone components

### Backend

- Firestore indexes for efficient queries
- Cached workspace configurations
- Optimized Cloud Function cold starts
- CDN for static assets

### Build

- Bundle size budgets (1.5MB warning, 2MB error)
- Tree shaking and dead code elimination
- Differential loading for modern browsers
- Prerendering for SSR routes

## Error Handling and Monitoring

### Client-Side

- Sentry integration configured (projects/app/src/app/app.config.ts)
- Global error handling
- User-friendly error messages
- Graceful degradation for offline scenarios

### Backend

- Cloud Functions error logging
- Firebase monitoring
- API error responses with appropriate HTTP status codes

## Related Repositories

- **Frontend:** https://github.com/whiletrue-industries/future-screenshots
- **Backend:** https://github.com/whiletrue-industries/chronomaps-server (Firebase/Python)
- **Project Management:** https://github.com/orgs/whiletrue-industries/projects/4/views/2
