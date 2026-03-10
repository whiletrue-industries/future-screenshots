# Backend: Implement Export Manifest Service for Multi-Workspace Showcase

## Problem

The current multi-workspace showcase export feature fails because it relies on an in-memory cache (`ExportCacheService`) that:
- Is lost on page refresh or browser tab close
- Has a 5-minute expiry
- Cannot be shared via URL (cache is client-side only)
- Makes export URLs non-functional when accessed directly

## Proposed Solution

Implement a server-side export manifest service that stores minimal export configuration and serves optimized item data for showcase rendering.

### Architecture

```
Client: POST /export-manifest → { item_ids, layout, cluster_by }
                ↓
Backend: Store in Firestore → Calculate content hash → Return { export_id: hash }
                ↓
Client: Navigate to /showcase-ws?export={hash}
                ↓
Backend: GET /export-data/{hash} → Fetch manifest → Batch load minimal item data
                ↓
Client: Render showcase with minimal data → Lazy-load full metadata on sidebar open
```

## Backend Implementation Required

### 1. New Cloud Function: `export-manifest-handler`

**Endpoint:** `POST /export-manifest`

**Request Body:**
```json
{
  "item_ids": ["item1", "item2", ...],
  "layout": "circle-packing" | "grid" | "tsne",
  "cluster_by": "user" | "workspace"
}
```

**Response:**
```json
{
  "export_id": "sha256-hash-of-content"
}
```

**Logic:**
1. Accept POST request with item IDs and settings
2. Calculate SHA-256 hash of request body (for content-based deduplication)
3. Store in Firestore collection `/export_manifests/{hash}`:
   ```json
   {
     "item_ids": [...],
     "layout": "circle-packing",
     "cluster_by": "workspace",
     "created_at": "2026-03-09T12:00:00Z"
   }
   ```
4. Return hash as `export_id`

**Notes:**
- Use content hash for deduplication (same export = same URL)
- Add `created_at` field for future expiry logic (if needed)
- No auth required (manifests are just IDs, not sensitive data)

### 2. New Cloud Function: `export-data-handler`

**Endpoint:** `GET /export-data/{export_id}`

**Response:**
```json
{
  "settings": {
    "layout": "circle-packing",
    "cluster_by": "workspace"
  },
  "items": [
    {
      "_id": "item-uuid",
      "url": "https://storage.googleapis.com/.../image.jpg",
      "created_at": "2026-03-09T12:00:00Z",
      "_workspaceId": "workspace-uuid",
      "author_id": "user-uuid"
    }
  ]
}
```

**Logic:**
1. Fetch manifest from Firestore: `/export_manifests/{export_id}`
2. If not found, return 404 with error message
3. Batch fetch items from Firestore using `item_ids` from manifest
4. Return **only minimal fields** needed for showcase layout:
   - `_id`: Item identifier
   - `url`: Image URL
   - `created_at`: Timestamp for sorting
   - `_workspaceId`: For workspace clustering
   - `author_id`: For user clustering
5. Include settings (layout, cluster_by) in response

**Performance:**
- Use batch reads for efficiency
- Response should be CDN-cacheable (immutable data)
- Target: <500ms for 100 items

**Error Handling:**
```json
// 404 if export not found
{
  "error": "Export manifest not found",
  "export_id": "{hash}"
}
```

## Data Model

### Firestore Collection: `export_manifests`

**Document ID:** SHA-256 hash of content  
**Document Structure:**
```json
{
  "item_ids": ["uuid1", "uuid2", ...],
  "layout": "circle-packing",
  "cluster_by": "workspace",
  "created_at": Timestamp
}
```

**Indexing:**
- No special indexes needed (lookup by document ID only)

**Retention:**
- Indefinite storage (manifests are tiny: ~100 bytes per 100 items)
- Can add TTL/cleanup later if needed

## Frontend Changes (for reference)

The frontend will be updated to:
1. POST export manifest to backend before navigation
2. Navigate to `/showcase-ws?export={hash}`
3. Fetch export data from `/export-data/{hash}`
4. Render showcase with minimal item data
5. Lazy-load full item metadata when sidebar opens (uses existing `GET /{workspace}/{item_id}` endpoint)

## Testing

### Manual Testing Steps:
1. Export 50 items from multi-workspace view
2. Verify export URL contains only `?export={hash}` parameter
3. Verify showcase renders correctly
4. Copy URL to new browser tab → should still work
5. Refresh page → should still work
6. Share URL with another user → should work (if items are public/accessible)

### Expected Metrics:
- Export creation: <200ms
- Data fetch: <500ms for 100 items
- URL length: ~50 characters (vs. thousands with item_ids)

## Questions

1. Should there be any auth check for accessing `/export-data/{hash}`? (Currently assuming exports are public)
2. Do we need rate limiting on export creation?
3. Should manifests have expiry (e.g., auto-delete after 30 days)?

## Assignee

@akariv

## Priority

Medium-High — Blocks multi-workspace export feature from being usable in production

## Labels

backend, enhancement, API
