# "Migrate an Existing Website" Scenario — Developer Documentation

## Overview

This scenario is a **linear, scripted demo** that simulates an AI assistant migrating a school website. It lives entirely inside `AiWorkspaceView.tsx` and is triggered when the user clicks the **"Migrate an existing website"** quick action card. The flow is divided into 5 steps (states), progressing through a chat panel on the left, a browser canvas in the center, and a control panel on the right.

---

## Entry Point

**File:** `src/App.tsx`

`App.tsx` renders the top-level navigation and tab system. When `activeTab === 'workspace'`, it mounts `<AiWorkspaceView>` and passes a single callback:

```tsx
<AiWorkspaceView
  onFinishScenario={() => {
    setHasHiredAgents(true);   // unlocks "Our Team (AI)" nav item
    setActiveTab('dashboard'); // redirects to the Inbox tab
  }}
/>
```

`hasHiredAgents` is the only piece of state that persists across this scenario. When the scenario ends, it flips to `true`, which causes the **Inbox (Dashboard)** to show agent suggestion cards.

---

## State Machine

**File:** `src/components/AiWorkspaceView.tsx`

The scenario is driven by a `ScenarioStep` union type:

```ts
type ScenarioStep = 'idle' | 'url_input' | 'orchestrator' | 'generation' | 'hiring';
```

Each step controls what renders in all three panels simultaneously.

---

## Step-by-Step Breakdown

### Step 1 — `idle`
**Trigger:** Initial state on page load.

**What renders:**
- **Chat panel:** Welcome bubble from the assistant + 6 quick action cards.
- **Canvas:** Empty placeholder with a sparkle icon.
- **Right panel:** Empty state with "Agents and data hooks will appear here" message.

**Key detail:** Only the "Migrate an existing website" card has `scenario: true` in the `QUICK_ACTIONS` array, making it the only card that actually does anything when clicked. All other cards are clickable but have no `onClick` handler (they do nothing).

---

### Step 2 — `url_input`
**Trigger:** Clicking "Migrate an existing website" calls `startScenario()`.

**What `startScenario()` does:**
1. Sets `scenarioStep` → `'url_input'`
2. Pre-fills `typedUrl` with `'http://lincolnhigh.edu'` (the `TARGET_URL` constant)
3. Pushes a user message: `"Migrate our existing website"`
4. After 800ms, pushes an agent reply asking for the website URL, and sets `urlPromptReady = true`

**What renders:**
- **Chat panel:** The conversation starts; after the agent's reply appears, a **"Submit link →"** button appears (controlled by `urlPromptReady && !urlSubmitted`).
- **Canvas:** Placeholder with "Your site preview will load once the URL is confirmed."
- **Right panel:** Still empty (hidden).

**User action:** Click **"Submit link →"** to proceed.

---

### Step 3 — `orchestrator`
**Trigger:** Clicking "Submit link →" calls `confirmUrl()`.

**What `confirmUrl()` does:**
1. Sets `urlSubmitted = true` (hides the submit button immediately)
2. Pushes the URL as a user message
3. After 600ms, pushes a scanning message
4. After 900ms, pushes a fuller scanning message with the URL highlighted in blue
5. After 2500ms more, sets `scenarioStep` → `'orchestrator'`, resets `orchestratorTick` to `-4`, and pushes "Analysis complete!" message

**Auto-tick system:** A `useEffect` watches `scenarioStep === 'orchestrator'` and auto-increments `orchestratorTick` every 1200–3000ms until it reaches `5`. The tick drives two things in parallel:

**Chat messages tied to ticks:**
| `orchestratorTick` | Agent message |
|---|---|
| `-3` | "I am allocating specialized AI Sub-Agents…" |
| `-1` | "To ensure your calendar…I am securely connecting our Data Hooks…" |
| `4` | "All agents deployed and SIS platforms connected. Would you like me to execute the migration?" |

**Right panel — Data Hooks animation:** Each of the 4 SIS integrations (PowerSchool, FACTS SIS, Infinite Campus, Skyward) maps directly to a tick value `0–3`. At tick `idx`, that row shows a spinner (`Loader2`). At tick `> idx`, it shows a green checkmark. Before tick `idx`, it's dimmed.

**Right panel — Assigned Agents card:** Appears when `orchestratorTick >= -2`. Shows "Web Admin" and "Content Creator" agents both with green checkmarks (they appear already-connected).

**Canvas:** Shows `<SchoolBefore />` — a deliberately ugly legacy school website — rendered desaturated (`opacity-60 saturate-50 contrast-75`) with an "Analyzing…" browser bar.

**User action:** When `orchestratorTick >= 4`, a **"Generate site →"** button appears. User clicks it to proceed.

---

### Step 4 — `generation`
**Trigger:** Clicking "Generate site →" calls `advanceToGeneration()`.

**What `advanceToGeneration()` does:**
1. Pushes user message: `"Connections look good. Deploy the new framework."`
2. After 1000ms, sets `scenarioStep` → `'generation'` and pushes agent message about generating the new React-based design.

**What renders:**
- **Canvas:** Switches from `<SchoolBefore />` to `<SchoolAfterMagic />` — a modern, beautiful redesigned school site — with a zoom-in animation and a green "Live" badge in the browser bar. The right panel stays as-is (all agents + data hooks shown as connected).
- **Chat panel:** Shows a **"What's next? →"** button.

**User action:** Click **"What's next? →"** to proceed.

---

### Step 5 — `hiring`
**Trigger:** Clicking "What's next? →" calls `advanceToHiring()`.

**What `advanceToHiring()` does:**
1. Pushes user message: `"Wow, looks great! What's next?"`
2. After 1000ms, sets `scenarioStep` → `'hiring'` and pushes a rich agent message explaining that two sub-agents (Web Admin Agent, Content Creator Agent) are being "hired" and that a dedicated inbox will appear on the dashboard.

**What renders:**
- **Canvas:** Same `<SchoolAfterMagic />` as before (no change).
- **Chat panel:** Shows a green **"Return to Overview"** button with a checkmark icon.

**User action:** Click **"Return to Overview"** to finish the scenario.

---

### Scenario End
**Trigger:** Clicking "Return to Overview" calls `finishAndGoToDashboard()`, which calls `onFinishScenario()` (passed from `App.tsx`).

**Effect:**
- `hasHiredAgents` flips to `true` in `App.tsx`
- `activeTab` is set to `'dashboard'`
- The **Inbox** now shows suggestion cards from "Content Creator Agent" and "Web Admin Agent" (hardcoded in `Dashboard.tsx`)
- The **"Our Team (AI)"** nav item becomes visible in the sidebar

---

## Key Files Reference

| File | Role |
|---|---|
| `src/App.tsx` | Top-level state: `hasHiredAgents`, `activeTab`; mounts `AiWorkspaceView` |
| `src/components/AiWorkspaceView.tsx` | **Owns the entire scenario** — all 5 steps, chat messages, canvas switching, right panel |
| `src/pages/SchoolBefore.tsx` | "Before" canvas: legacy ugly school website (inline styles, no Tailwind) |
| `src/pages/SchoolAfterMagic.tsx` | "After" canvas: modern redesigned school website; accepts optional `previewType` and `showAfter` props for AI Review Modal highlights (not used in this scenario) |
| `src/components/Dashboard.tsx` | Inbox tab; shows hardcoded agent suggestion cards when `hasHiredAgents === true` |
| `src/data/mockData.ts` | `AiAction` type and mock data; not directly used by the migration scenario itself |

---

## State & Timing Summary

```
idle
 └─[click "Migrate"] startScenario()
    └─ url_input
        └─[click "Submit link →"] confirmUrl()
            └─ orchestrator  (auto-ticks -4 → 4, ~15s total)
                └─[tick >= 4, click "Generate site →"] advanceToGeneration()
                    └─ generation
                        └─[click "What's next? →"] advanceToHiring()
                            └─ hiring
                                └─[click "Return to Overview"] onFinishScenario()
                                    └─ App: hasHiredAgents=true, tab='dashboard'
```

---

## Tips for Making Changes Safely

- **To change what the agent says:** Edit the `agentMessage()` calls inside `startScenario()`, `confirmUrl()`, `advanceToGeneration()`, `advanceToHiring()`, and the `orchestratorTick` `useEffect`. The content can be plain strings or JSX.
- **To add a new step:** Add a new value to `ScenarioStep`, add a new action button in the chat panel's action buttons section (the block after `{!isIdle && !isUrlInput && ...}`), and add a new handler function. Also add corresponding canvas/right-panel rendering blocks.
- **To change the "before" website:** Edit `SchoolBefore.tsx`.
- **To change the "after" website:** Edit `SchoolAfterMagic.tsx`. Note its `previewType` and `showAfter` props are used by the AI Review Modal flow (in `AiReviewModal.tsx` / `AiWorkspaceView.tsx`), not by the migration scenario.
- **To change the SIS integrations list** in the right panel: Edit the array inside the Data Hooks section in `AiWorkspaceView.tsx` (the array with `{ name, domain }` objects). Adding/removing items will change how many ticks the orchestrator phase takes visually.
- **To change the orchestrator timing:** Adjust the `waitTime` values in the auto-tick `useEffect`, or change the `5` limit in `orchestratorTick < 5`.
- **To change what appears in the Inbox after the scenario:** Edit the hardcoded `CC_ACTION` and `WA_ACTION` objects in `Dashboard.tsx`.
