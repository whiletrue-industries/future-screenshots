# Tags Debugging Guide & URL Parameter Documentation

## Complete Fix - Tags Now Fully Working! ✅

### Problems Fixed:

**Problem 1:** Tags were preserved in frontend but never saved to database
- **Fix:** After `startDiscussion` completes, `uploadImageAuto()` and `uploadImage()` now call `updateItem()` to persist tags
- **Location:** [api.service.ts](projects/app/src/api.service.ts) lines 203-210, 217-224

**Problem 2:** Moderate component was overwriting API tags with old `future_scenario_topics`
- **Fix:** Component now merges API tags with topics-based tags instead of replacing
- **Location:** [moderate.component.ts](projects/app/src/app/admin/moderate/moderate.component.ts) lines 296-309

**Problem 3:** When editing tags in admin, they weren't saved to the `tags` database field
- **Fix:** `setTags()` method now sends both `tags` array and `future_scenario_topics` object
- **Location:** [moderate.component.ts](projects/app/src/app/admin/moderate/moderate.component.ts) lines 722-737

✅ **Also Fixed:** 
- Tags clear after successful upload in automatic mode (fresh start for next scan)
- Comprehensive console logging throughout the tag flow to trace data

## The Complete Tag Flow (Now With Database Save)

```
User adds tags in Confirm Screen
    ↓
User uploads image
    ↓
confirm.component.ts upload() - logs metadata being sent
    ↓
api.service.ts createItem() - receives metadata with tags
    - Logs what metadata was received
    - Merges response with metadata (metadata takes priority)
    - Stores item in signal
    ↓
uploadImageAuto() triggered (automatic mode)
    ↓
api.service.ts startDiscussion() - AI processes image
    - Receives AI metadata back from API
    - Preserves user tags when merging AI results
    - Logs at 3 points: response, preservation, final result
    ↓
✅ NEW: updateItem() called to save merged item with tags to database
    - explicit tags field sent to database
    - logs success/failure
    ↓
Admin/Moderate panel fetches item from database (tags now present!)
```

## How to Test & Debug

### Step 1: Add Tags & Upload
1. Open the app at `/scan`
2. Take an image
3. In the Confirm screen, add 2-3 **custom tags** (not from autocomplete)
4. Make note of them (e.g., "test-tag-1", "test-tag-2")
5. Click Upload

### Step 2: Check Browser Console
Press `F12` to open Developer Tools → Console tab

Look for logs in this order:

#### Log Set 1: Confirm Component Sending Tags
```
[CONFIRM] Current batch tags: Array(2) ["test-tag-1", "test-tag-2"]
[CONFIRM] Metadata.tags being sent: Array(2) ["test-tag-1", "test-tag-2"]
[CONFIRM] Full metadata: {tags: Array(2), ...}
[CONFIRM] Item created successfully: {item_id: "...", item_key: "...", ...}
```

#### Log Set 2: API Creating Item
```
[API] createItem with metadata: {tags: Array(2), ...}
[API] createItem response: {item_id: "...", ...}
[API] final item in signal: {tags: Array(2), item_id: "...", ...}
```

#### Log Set 3: API Processing Image (startDiscussion)
```
[API] Screenshot uploaded successfully
[API] AI metadata returned: {metadata: {...}}
[API] Current item before merge: {tags: Array(2), ...}
[API] User tags to preserve: Array(2) ["test-tag-1", "test-tag-2"]
[API] Restoring user tags after AI processing
[API] Final item after preserving tags: {tags: Array(2), ...}
```

#### Log Set 4: NEW - Tags Saved to Database
```
[API] Saving item with preserved tags: Array(2) ["test-tag-1", "test-tag-2"]
[API] Tags saved to database successfully
```

### Step 3: Verify in Admin/Moderate Panel
After upload completes, navigate to the moderate/admin panel. The item should now display your custom tags!

### Step 4: Interpret the Logs

**Perfect Scenario: All logs present including Log Set 4**
- ✅ Tags added and sent to API
- ✅ Tags preserved through AI processing  
- ✅ Tags saved to database
- ✅ Tags should appear in admin/moderate panel
- 🟢 **SUCCESS** - your tags are now saved!

**Tags Missing in Admin: Check if Log Set 4 appears**
- If Log Set 4 is missing: updateItem call might have failed, check error logs
- If Log Set 4 shows success: Tags are in database, but admin UI might not be displaying them
- Check admin component to see if it's querying the tags field

**Tags Showing Errors in Log Set 4**
- Check the error message in console
- May be a permissions issue with the API key
- Verify updateItem is being called with correct item_id and item_key

## Expected Console Output for Successful Case

When everything works, you should see:

```
[CONFIRM] Current batch tags: Array(2) ["my-tag", "another-tag"]
[CONFIRM] Metadata.tags being sent: Array(2) ["my-tag", "another-tag"]  
[CONFIRM] Full metadata: {tags: Array(2), favorable_future: "prefer", plausibility: 75}
[CONFIRM] Item created successfully: {item_id: "abc123", item_key: "key456", tags: Array(2), ...}
[API] createItem with metadata: {tags: Array(2), ...}
[API] createItem response: {item_id: "abc123", item_key: "key456"}
[API] final item in signal: {item_id: "abc123", tags: Array(2), ...}
[API] Screenshot uploaded successfully
[API] AI metadata returned: {metadata: {favorable_future: "prefer_ai"}}
[API] Current item before merge: {item_id: "abc123", tags: Array(2), ...}
[API] User tags to preserve: Array(2) ["my-tag", "another-tag"]
[API] Restoring user tags after AI processing
[API] Final item after preserving tags: {item_id: "abc123", tags: Array(2), favorable_future: "prefer", ...}
[API] Saving item with preserved tags: Array(2) ["my-tag", "another-tag"]
[API] Tags saved to database successfully
[CONFIRM] Upload complete, clearing tags for next scan
```

Then check the moderate/admin panel - tags should be visible!

## Additional Notes

- Tags are persisted to localStorage so they survive page refreshes while scanning
- Tags are cleared after successful automatic upload (new feature)
- Tags in both regular and template ("no-paper") flows are supported
- AI tags from server responses are now preserved alongside user tags AND saved to database
- The fix ensures tags are persisted at TWO levels: frontend signal + database

## If Tags Still Don't Appear in Admin

1. **Verify tags are saved to database**: Check for "[API] Tags saved to database successfully" in logs
2. **If that log shows an error**: See error details, may need to adjust API/permissions
3. **If that log shows success but admin still empty**:
   - Tags are in database but admin component might not be displaying them
   - Check if admin component/template includes tags field in UI
   - May need to refresh the admin page or check if it's fetching fresh data

If the save succeeds ([API] Tags saved to database successfully), the issue is in the admin display logic, not the tag saving logic.

## Summary of All Fixes

| Issue | Location | Fix |
|-------|----------|-----|
| Tags not saved after AI processing | api.service.ts uploadImageAuto/Image | Call updateItem() with tags after startDiscussion |
| Moderate component overwriting tags | moderate.component.ts line 296 | Merge API tags + topics tags instead of replace |
| Tags not in database after admin edit | moderate.component.ts setTags() | Include `tags` field in updateData sent to API |
| Tags cleared between scans | confirm.component.ts upload() | Clear batchTags after successful auto upload |

All fixes ensure tags flow correctly from **Confirm Screen → API → Database → Admin Display**

---

## URL Tag Parameters

You can pre-populate tags via URL query parameters. This is useful for automating workflows or providing context-specific tags.

### Basic Syntax

```
/scan?tags=tag1,tag2,tag3
```

### Combined with Existing Parameters

```
/scan?workspace=61358757-cf32-483f-847f-3e4eb3855408&api_key=212aa064-4d02-4edb-8f0b-9f649d026fb2&tags=sustainability,climate-action
```

### With Template Flow

```
/scan?template=true&tags=climate,sustainability
```
When `template=true`, the "no-paper" tag is automatically added as the first tag.

### Bi-Directional Sync (Loading → Confirm Screen)

**URL → Scanner Component:** Tags from URL are loaded at the start
- `scanner.component.ts` parses URL tags when component initializes
- Tags are added to `state.batchTags` (overrides localStorage)
- Example: `/scan?tags=a,b,c` → Sets tags: `["a", "b", "c"]`

**Confirm Component → URL:** Tags update the URL as you edit them
- When you add/remove tags in the confirm screen, the URL updates automatically
- Uses `window.history.replaceState()` so it doesn't create new history entries
- Example: Add tag → URL becomes `/confirm?tags=climate,sustainability,new-tag`
- Preserves all other query params (workspace, api_key, template, etc.)

### Behavior

- **Multiple tags:** Comma-separated, whitespace trimmed automatically
- **Case normalization:** All tags converted to lowercase
- **Override behavior:** URL tags override localStorage (fresh start)
- **Template flow:** Automatically prepends "no-paper" tag if not already included
- **Invalid tags:** Empty or whitespace-only tags are filtered out
- **URL persistence:** Tags stay in URL throughout the workflow for reproducibility and sharing
- **Smart clearing after upload:**
  - If tags were provided via URL or modified by user → **Persist for next scan**
  - If no URL tags and no modifications → Clear for fresh start
  - Tags from URL remain in URL after navigation (via `queryParamsHandling: 'preserve'`)
  - Modified tags stay in localStorage and URL for next session

### Examples

**Example 1: Simple tags**
```
http://localhost:4200/scan?tags=climate-change,urban-planning,future-food
```
→ Scanner loads tags: `["climate-change", "urban-planning", "future-food"]`
→ Proceed to confirm screen, edit tags, and URL updates automatically

**Example 2: With credentials**
```
http://localhost:4200/scan?workspace=61358757-cf32-483f-847f-3e4eb3855408&api_key=212aa064-4d02-4edb-8f0b-9f649d026fb2&tags=ai,ethics,governance
```
→ Sets workspace & API key, then sets tags: `["ai", "ethics", "governance"]`
→ Tag edits update URL while keeping workspace and api_key params

**Example 3: Template flow with tags**
```
http://localhost:4200/scan?template=true&tags=scenario-planning,innovation
```
→ Sets tags: `["no-paper", "scenario-planning", "innovation"]`(no-paper is auto-added)
→ URL becomes `/confirm?template=true&tags=no-paper,scenario-planning,innovation` as you proceed

**Example 4: Handling spaces and case**
```
http://localhost:4200/scan?tags=Climate Change,Urban Planning
```
→ Sets tags: `["climate change", "urban planning"]` (spaces preserved, case lowercased)
→ URL stays in sync as you add/remove tags

### Console Output

When tags are loaded from URL (scanner):
```
[SCANNER] URL tags loaded: ['tag1', 'tag2', 'tag3']
```

When tags are synced in confirm screen:
```
[CONFIRM] Tags synced to URL: ['tag1', 'tag2', 'tag3']
```

### Use Cases

1. **Reproducible Workflows:** Share a URL with specific tags pre-loaded
2. **Batch Processing:** Automate tag assignment for similar content
3. **Context Preservation:** Keep tags throughout the entire workflow
4. **Mobile Links:** Use `scripts/dev-with-mobile-link.js` to share QR code with pre-set tags
5. **API Integration:** Construct URLs programmatically with desired tags
6. **Workflow Automation:** Set tags once, scan multiple images with same context
7. **Team Collaboration:** Share URL with teammates so they use consistent tags

### Persistence Behavior Examples

**Scenario 1: URL tags, no modifications**
```
/scan?tags=climate,sustainability
→ Take photo → Confirm (don't change tags) → Upload
→ Returns to /scan?tags=climate,sustainability (tags persist for next scan)
```

**Scenario 2: URL tags + user modifications**
```
/scan?tags=climate,sustainability
→ Take photo → Confirm → Add "governance" tag → Upload
→ Returns to /scan?tags=climate,sustainability,governance (modified tags persist)
```

**Scenario 3: No URL tags, user adds tags**
```
/scan (no tags param)
→ Take photo → Confirm → Add "test" tag → Upload
→ Returns to /scan?tags=test (user tags persist)
```

**Scenario 4: No URL tags, no user tags**
```
/scan (no tags param)
→ Take photo → Confirm (no tags added) → Upload
→ Returns to /scan (clean slate for next scan)
```





## How to Test & Debug

### Step 1: Add Tags & Upload
1. Open the app at `/scan`
2. Take an image
3. In the Confirm screen, add 2-3 **custom tags** (not from autocomplete)
4. Make note of them (e.g., "test-tag-1", "test-tag-2")
5. Click Upload

### Step 2: Check Browser Console
Press `F12` to open Developer Tools → Console tab

Look for logs in this order:

#### Log Set 1: Confirm Component Sending Tags
```
[CONFIRM] Current batch tags: Array(2) ["test-tag-1", "test-tag-2"]
[CONFIRM] Metadata.tags being sent: Array(2) ["test-tag-1", "test-tag-2"]
[CONFIRM] Full metadata: {tags: Array(2), ...}
[CONFIRM] Item created successfully: {item_id: "...", item_key: "...", ...}
```

#### Log Set 2: API Creating Item
```
[API] createItem with metadata: {tags: Array(2), ...}
[API] createItem response: {item_id: "...", ...}
[API] final item in signal: {tags: Array(2), item_id: "...", ...}
```

#### Log Set 3: API Processing Image (startDiscussion)
```
[API] Screenshot uploaded successfully
[API] AI metadata returned: {metadata: {...}}
[API] Current item before merge: {tags: Array(2), ...}
[API] User tags to preserve: Array(2) ["test-tag-1", "test-tag-2"]
[API] Restoring user tags after AI processing
[API] Final item after preserving tags: {tags: Array(2), ...}
```

### Step 3: Interpret the Logs

**Scenario A: Tags present in all logs**
- ✅ Tags are being sent correctly
- ✅ Tags are preserved through AI processing  
- ❌ Problem: NOT in frontend (check admin display logic)
- 🔍 Next: Check if tags are saved to database and admin component displays them

**Scenario B: Tags in Log Set 1 & 2 but NOT in Log Set 3**
- ✅ Tags sent to API correctly
- ❌ Tags lost during AI processing in startDiscussion
- 🔍 Next: Check if item.tags exists before merge, review preserve logic

**Scenario C: Tags NOT in Log Set 1**
- ❌ Tags not being added to metadata in confirm.component
- 🔍 Next: Check if batchTags signal is populated correctly

**Scenario D: Tags NOT in any logs**
- ❌ Tags not reaching API at all
- 🔍 Next: Check network tab, verify request payload

### Step 4: Check the Backend

If tags are present in all logs but don't appear in admin:

1. **Check Firebase/Backend**
   - Are tags being saved to Firestore?
   - Is the `tags` field present in the item document?

2. **Check Admin Component**
   - Does the admin template display the tags field?
   - Is the value binding correct?

## Expected Console Output for Successful Case

When everything works, you should see:

```
[CONFIRM] Current batch tags: Array(2) ["my-tag", "another-tag"]
[CONFIRM] Metadata.tags being sent: Array(2) ["my-tag", "another-tag"]  
[CONFIRM] Full metadata: {tags: Array(2), favorable_future: "prefer", plausibility: 75}
[CONFIRM] Item created successfully: {item_id: "abc123", item_key: "key456", tags: Array(2), ...}
[API] createItem with metadata: {tags: Array(2), ...}
[API] createItem response: {item_id: "abc123", item_key: "key456"}
[API] final item in signal: {item_id: "abc123", tags: Array(2), ...}
[API] Screenshot uploaded successfully
[API] AI metadata returned: {metadata: {favorable_future: "prefer_ai"}}
[API] Current item before merge: {item_id: "abc123", tags: Array(2), ...}
[API] User tags to preserve: Array(2) ["my-tag", "another-tag"]
[API] Restoring user tags after AI processing
[API] Final item after preserving tags: {item_id: "abc123", tags: Array(2), favorable_future: "prefer", ...}
[CONFIRM] Upload complete, clearing tags for next scan
```

## Additional Notes

- Tags are persisted to localStorage so they survive page refreshes
- Tags are cleared after successful automatic upload (new feature)
- Tags in both regular and template ("no-paper") flows are supported
- AI tags from server responses are preserved alongside user tags

## If Tags Still Don't Appear in Admin

1. **Verify tags are sent**: Check [CONFIRM] logs
2. **Verify tags reach API**: Check [API] logs  
3. **Verify tags preserved during AI**: Check startDiscussion logs
4. **Check admin component**: Does it actually fetch/display the tags field?
5. **Check Firebase**: Is the data actually saved?

If steps 1-3 all show tags correctly, the issue is likely in the admin component or backend storage.

