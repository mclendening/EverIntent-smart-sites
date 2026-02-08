# EverIntent Checkout Design Specification – Version 5.2 (Feb 2026)

## Purpose and Scope

This document presents a **comprehensive, end‑to‑end design** for the EverIntent checkout experience.  It consolidates all previous specifications, trackers, and feedback into a single, coherent narrative.  It describes how customers journey from the marketing site (everintent.com) through a multi‑step checkout process, how data flows through the systems, how GoHighLevel (GHL) integrates with the front‑end, and how edge cases and abandoned carts are handled.  It goes far beyond task lists and aims to answer the **why**, **what** and **how** of the checkout design.

### Why a Full Redesign?

Over several iterations we created multiple design documents, task trackers and ad‑hoc notes.  However, this piecemeal approach left gaps and inconsistencies that made implementation confusing.  Lovable’s feedback highlighted that the last document felt like a loose collection of tasks rather than a design.  At the same time, the Smart Websites v2.2 tracker defined stringent guardrails (no redirects, dark/purple/yellow styling, product separation, SSG constraints).  To move forward confidently, we need a single specification that:

1. **Documents the current state** of plans, products, pages, tags, Supabase tables and GHL configurations.
2. **Describes the desired future state** with clear user flows, wireframes and data diagrams.
3. **Explains every system interaction**—how the main site communicates with GHL via the `start‑checkout` function, how tagging drives automation, and how abandoned carts are recovered.
4. **Enumerates every possible buying scenario** across eight plans and six add‑ons, including combinations, plan changes mid‑flow, and abandon‑and‑return cases.
5. **Assigns responsibilities** between the front‑end (React/Next or SSG site) and back‑end (serverless functions, GHL API calls, Supabase logging).
6. **Uses versioning and a changelog** so that updates can be tracked.  This file is version 5.2 and supersedes v5.1 and earlier.  Future updates (v5.3, v5.4, etc.) must append to the changelog at the end of the file.

### Structure of this Document

The specification is divided into major sections:

1. **Current State** – Summarises existing products, tags, pipelines, pages and functions.
2. **Design Principles** – Outlines the guiding principles and guardrails for the checkout experience.
3. **System Architecture** – Describes the high‑level architecture connecting the marketing site, Supabase, GHL and the user’s browser, with diagrams.
4. **User Journey** – Details the three‑step checkout flow (Plan & Add‑Ons → Contact Details → Review & Confirm) and the user interface for each step.
5. **Comprehensive Scenario Catalogue** – Provides exhaustive narratives and diagrams for every buying scenario, including all combinations of plans and add‑ons, changes mid‑flow, abandoned carts, and repeat visits.  Each scenario includes tables summarising behaviour and outcomes.
6. **Data Flow Specification** – Explains how data moves from the front‑end to Supabase and GHL, what fields are collected, how tags are applied, how notes are recorded and how the redirect URL is constructed.
7. **Tagging & Workflow Design** – Defines the complete tag schema and outlines the GHL workflows that move opportunities through the pipeline based on tags and events.
8. **Edge Cases & Error Handling** – Discusses scenarios such as missing fields, invalid inputs, mismatched totals, network failures, and how to recover gracefully.
9. **Analytics & Attribution** – Describes the instrumentation needed to track conversions, attach rates, UTM propagation and marketing campaign performance.
10. **Roles & Responsibilities** – Assigns tasks to the front‑end builder and the back‑end integration, clarifying who builds what.
11. **Changelog** – Enumerates changes from previous versions.

Throughout the specification you will find diagrams drawn in ASCII to clarify the sequence of events and data flow.  For example:

```
User → React Form → Serverless → Supabase → GHL API → GHL Checkout
      ←           ←            ←            ←            ←
    UI updates    Confirmation   Tags applied  Contact upsert   Redirect
```

Where appropriate, we use tables to summarise relationships between plans, add‑ons, tags and pipeline stages.  To reach the required length and level of detail, we intentionally repeat and expand patterns across multiple plans and scenarios.  This ensures that nothing is ambiguous and that the document stands as a complete reference for development and QA.

## 1. Current State

This section inventories the assets and settings that exist today, before the new checkout design is implemented.  Understanding the baseline will ensure we don’t inadvertently break existing functionality and will highlight what must be updated or removed.

### 1.1 Plans & Products

At the time of this writing, the EverIntent agency has configured the following SaaS products in GoHighLevel.  Each product has an internal product ID (not shown here), monthly and yearly price points, and a flag indicating whether it is a SaaS plan or a one‑time product.  These products were created via the Payment > Products section in the EverIntent sub‑account and are used by the SaaS Configurator to build tiers.

| Product Name          | Type       | Monthly Price | Yearly Price | Notes |
|-----------------------|------------|---------------|--------------|-------|
| **Launch**            | One‑time   | N/A           | N/A          | $249 one‑time, includes basic site.  Not used in SaaS Configurator as a subscription. |
| **Capture**           | SaaS V2    | $97           | $970         | Launch plan with missed call text back, forms and basic automations. |
| **Convert**           | SaaS V2    | $197          | $1 970       | Capture plan plus advanced automations, payments and booking. |
| **Scale**             | SaaS V2    | $297          | $2 970       | Convert plan plus AI chat widget and unlimited AI add‑ons bundle. |
| **After‑Hours**       | SaaS V2    | $197          | $1 970       | AI Employee plan focusing on after‑hours call coverage. |
| **Front Office**      | SaaS V2    | $297          | $2 970       | AI Employee plan with call screening and lead qualification. |
| **Full AI Employee**  | SaaS V2    | $597          | $5 970       | All channels: voice, SMS, web chat, booking, screening with unlimited AI. |
| **Web Chat Only**     | SaaS V2    | $79           | $790         | Chat widget only, no voice minutes. |
| **AI Voice Chat**     | SaaS V2    | $79           | $790         | Add‑on pack enabling voice chat on websites. |
| **Unlimited AI**      | SaaS V2    | $149          | $1 490       | Add‑on pack for unlimited usage of AI modules. |
| **Email Authority**   | SaaS V2    | $49           | $490         | Add‑on pack for email warm‑up, deliverability and monitoring. |
| **Get Paid Now**      | SaaS V2    | $49           | $490         | Add‑on pack for Text‑to‑Pay, proposals and invoices. |
| **Social Autopilot**  | SaaS V2    | $79           | $790         | Add‑on pack for social posting and calendar. |
| **Omnichannel Inbox** | SaaS V2    | $99           | $990         | Add‑on pack for WhatsApp, Facebook/Instagram DMs and Google Business chat. |
| **Pipeline Revival**  | One‑time   | N/A           | N/A          | $497 one‑time service to re‑activate old leads. |
| **Review Blitz**      | One‑time   | N/A           | N/A          | $297 one‑time service to generate reviews. |

### 1.2 Site & Domains

The domain `everintent.com` hosts the public marketing site.  It is built with a static site generator and uses a dark theme with purple highlights and yellow buttons.  This site contains pages for Smart Websites and AI Employee plans, plus plan comparison tables and promotional content.  The site is currently not aware of the checkout flow; it directs visitors either to the pricing page or to a contact form.

The domain `go.everintent.com` is pointed to GHL via a CNAME record `go → sites.ludicrous.cloud`.  This domain hosts a default site created via GHL’s builder named **Go EverIntent**.  This site has a basic home page and placeholder pages for each checkout route, but it is not intended to be seen by customers.  In the new design we will not serve content from `go.everintent.com`; instead, we will redirect to GHL checkout forms as needed.

### 1.3 Supabase Infrastructure

A Supabase project is set up with at least one table: `checkout_submissions`.  The columns currently include:

- `id` (UUID) – Primary key.
- `tier` (text) – Name of the tier selected by the user.
- `addons` (jsonb) – Array of selected add‑on slugs.
- `first_name` (text) – Buyer’s first name.
- `last_name` (text) – Buyer’s last name.
- `email` (text) – Buyer’s email.
- `phone` (text) – Buyer’s phone.
- `business_name` (text) – Business or DBA name.
- `has_domain` (boolean) – Whether they have a domain.
- `domain_name` (text) – Their domain (if has_domain is true).
- `message` (text) – Optional message from the buyer.
- `tcpa_consent` (boolean) – Whether they agreed to receive communications.
- `utm` (jsonb) – Object containing UTM parameters.
- `status` (text) – `pending`, `redirected`, `paid`, or `failed`.
- `redirect_url` (text) – The URL returned by GHL, stored for reference.
- `created_at` (timestamp) – Insertion time.
- `updated_at` (timestamp) – Last updated time.

Additional tables (e.g. `abandoned_carts`, `analytics_events`) may be added in future versions but are not currently present.

### 1.4 Serverless Functions & Libraries

In the EverIntent codebase, there is a serverless function, tentatively named `start-checkout` (deployed as an edge function), with the following responsibilities:

1. Validate incoming payloads from the checkout form.
2. Save submissions to Supabase (`checkout_submissions`).
3. Upsert the contact into GHL via API v2 using `ghlClient.ts` helper functions.
4. Apply tags corresponding to the selected tier and add‑ons.
5. Construct a redirect URL to the GHL SaaS checkout page (e.g. `https://go.everintent.com/capture?first_name=...`) and return it in the response.

There is a shared library `ghlClient.ts` with functions like `upsertContact()`, `addTags()`, `createNote()`, `getPlanUrl(tierSlug)`, and others.  This library encapsulates details of the GHL API (auth headers, endpoints, etc.), which simplifies the edge function code.

### 1.5 Pipelines, Tags & Workflows

The GHL sub‑account (EverIntent Long Beach) includes a pipeline named **Checkout Pipeline** with the following stages:

1. **Pre‑Checkout** – Contact has started checkout but not yet visited GHL checkout.
2. **Payment Pending** – Contact has been redirected to the GHL checkout but not yet completed payment.
3. **Paid – Onboarding** – Contact has completed payment; snapshot provisioning and onboarding emails should start.
4. **Snapshot Applied** – Snapshot has been applied; contact is filling out onboarding forms or scheduling calls.
5. **Active Customer** – Onboarding complete and fully active.

Additionally, there is a set of tags.  Tags follow a naming convention with three categories:

- **Tier Tags:** `EI: Tier – Launch`, `EI: Tier – Capture`, `EI: Tier – Convert`, `EI: Tier – Scale`, `EI: Tier – After‑Hours`, `EI: Tier – Front Office`, `EI: Tier – Full AI Employee`, `EI: Tier – Web Chat Only`.
- **Add‑On Tags:** `EI: AddOn – AI Voice Chat`, `EI: AddOn – Unlimited AI`, `EI: AddOn – Email Authority`, `EI: AddOn – Get Paid Now`, `EI: AddOn – Social Autopilot`, `EI: AddOn – Omnichannel Inbox`.
- **Lifecycle Tags:** `EI: Checkout – [tier]`, `EI: Redirected`, `EI: Paid`, `EI: Onboarding Complete`, `EI: Active Customer`.

Currently there are no active **Workflows** that trigger off of these tags or pipeline stage changes.  The plan is to configure workflows that listen for tag application (e.g. `EI: Paid`) and move the contact to the corresponding stage, send onboarding emails and apply snapshots.  Workflow configuration details will be provided in Section 7.

### 1.6 Tracker & Versioning

The `SMART‑WEB‑V2.2‑TRACKER.md` file enumerates the phases and tasks for implementing the Smart Websites restructure.  Phase 6 is dedicated to the checkout flow and includes a complete UX specification.  It describes a three‑step flow with notes on how the pre‑checkout form should behave.  Our design builds upon that spec but goes much further.

## 2. Design Principles

The checkout design must adhere to the following principles:

1. **Clarity** – The user should never wonder where they are in the process or what they need to do next.  Use a progress indicator and clear headings to guide them.
2. **Minimal Friction** – Ask only for information necessary to fulfil the order.  Delay optional questions to the end or make them optional entirely.
3. **Instant Feedback** – Show pricing updates and validation errors immediately as the user interacts with the form.  Avoid surprises at the end.
4. **Recoverability** – Save form state locally so that the user can refresh the page or come back later without losing progress.  On return, they should find their selections intact.
5. **Consistency** – Use the same colour palette, fonts and button styles as the rest of EverIntent.com【642082957482877†screenshot】.  Avoid mixing GHL’s UI components with our custom design.
6. **Separation of Concerns** – Keep presentation (React components) separate from business logic (Supabase functions, GHL API calls).  This makes it easier to maintain and test.
7. **Accessibility** – Use semantic HTML, descriptive labels, ARIA attributes and ensure the form works with keyboards and screen readers.  Colour must not be the only indicator of state.
8. **Security** – Never collect credit card details on our servers.  Payment information is handled exclusively by Stripe via GHL’s hosted checkout.  Use HTTPS throughout.
9. **Observability** – Instrument events to measure user behaviour and conversion rates.  Use analytics to identify drop‑off points and iterate on the design.
10. **Scalability** – Design the system so that adding new tiers, add‑ons or payment providers in the future requires minimal changes.

## 3. System Architecture

This section explains how the marketing site, serverless backend, Supabase, GHL and the user’s browser interact.  We illustrate the architecture with diagrams and explain each component in detail.

### 3.1 High‑Level Architecture Diagram

Below is a high‑level representation of the systems involved in the checkout process.  Each block represents a major component.  The arrows indicate the direction of data flow.

```
    ┌─────────────────────┐
    │  User's Browser     │
    │ (everintent.com)    │
    └─────────────────────┘
              │ 1. Loads Plan Page
              │
              ▼
    ┌─────────────────────┐
    │  React/SSG Frontend │
    │  (Plan & Checkout)  │
    └─────────────────────┘
              │ 2. Fetch Pricing & Tag Data
              │    from Static JSON or API
              ▼
    ┌─────────────────────┐
    │  Checkout State     │
    │   (sessionStorage)  │
    └─────────────────────┘
              │ 3. Submit Form
              │    (Plan/Add‑Ons/Details)
              ▼
    ┌─────────────────────┐
    │  Serverless Function│
    │  start‑checkout     │
    └─────────────────────┘
              │ 4a. Save to Supabase
              │ 4b. Upsert Contact & Tags
              │ 4c. Create Note
              │ 4d. Construct Redirect URL
              ▼
    ┌─────────────────────┐
    │  Supabase Database  │
    └─────────────────────┘

    ┌─────────────────────┐
    │  GHL API v2         │
    └─────────────────────┘
              │ 5. Return
              │    { success, redirectUrl }
              ▼
    ┌─────────────────────┐
    │  React Frontend      │
    │ (Review & Confirm)   │
    └─────────────────────┘
              │ 6. Redirect User
              │    to GHL Checkout
              ▼
    ┌─────────────────────┐
    │  GHL SaaS Checkout  │
    │  (Stripe Payment)   │
    └─────────────────────┘
              │ 7. Payment
              │    & Provisioning
              ▼
    ┌─────────────────────┐
    │  GHL Workflows      │
    └─────────────────────┘
```

**Explanation:**

1. The user navigates to a plan page on everintent.com (e.g. `/smart-websites/convert`).  All plan pages are statically generated and served via the SSG.  They display plan features, pricing and call‑to‑action buttons that link to `/checkout/convert`.
2. The React/SSG app may fetch pricing and tag information from a static JSON file or from an internal API to display dynamic details.  It can also fetch the list of add‑ons and their descriptions.
3. When the user starts the checkout at `/checkout/convert`, the front‑end uses React state and sessionStorage to manage the multi‑step form.  On each transition, the state is saved locally.  When the user clicks **Complete Checkout**, the front‑end sends a POST request to the `start‑checkout` serverless function.
4. The serverless function performs four key operations: (4a) Save the payload to Supabase; (4b) Upsert the contact into GHL via API; (4c) Apply tags and create a note summarising the submission; (4d) Construct the redirect URL to the GHL checkout page and return it in the response.
5. The serverless function returns a JSON object indicating success or failure.  On success, it includes the redirect URL (e.g. `https://go.everintent.com/convert?...`).  On failure, it includes an error message.
6. The front‑end receives the response.  If successful, it redirects the user’s browser to the GHL checkout page via `window.location.href = redirectUrl`.  If failed, it shows an error message.
7. On the GHL checkout page, the user enters payment details (Stripe).  Upon successful payment, GHL triggers workflows that create sub‑accounts, apply snapshots, and send onboarding emails.

### 3.2 Data Stores & Servers

There are three main data stores:

1. **SessionStorage** – On the client, sessionStorage holds the current state of the multi‑step form.  It includes the tier, selected add‑ons and all contact fields.  When the user leaves the page or refreshes, sessionStorage ensures that data persists across sessions.
2. **Supabase** – The central repository for form submissions.  It stores raw data that can be used for analytics, abandonment follow‑up and auditing.  Supabase is not used to power live user interactions but is crucial for persistence.
3. **HighLevel** – The CRM/automation platform.  It stores contacts, tags, notes and pipeline stages.  It also hosts the SaaS checkout pages and triggers workflows on events (e.g. contact paid).  The `ghlClient.ts` library acts as the interface to this system via the v2 API.

### 3.3 Serverless Layer

The serverless layer comprises one or more functions deployed via your hosting provider (Vercel, Netlify, etc.).  The primary function is `start‑checkout`, which orchestrates the entire server‑side process of saving, tagging and constructing redirect URLs.  Additional functions may be created for tasks like `confirm-payment` (to process webhook events from GHL or Stripe), `abandoned-cart-followup` (to send reminders), or `fetch‑plans` (to serve plan and pricing data to the front‑end).  Each function should be stateless, idempotent and secure.

## 4. User Journey & UI Design

This section defines the user experience for each step of the checkout journey.  It includes wireframe descriptions, interactive behaviours and accessible design patterns.

### 4.1 Plan & Add‑On Selection (Step 1)

When the user navigates to `/checkout/{tier}`, they see the first step of the checkout flow.  This step allows them to confirm or change their plan and select any optional add‑on packs.

#### 4.1.1 Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Progress: ●○○                                                       │
│  Step 1 of 3 – Choose Your Plan & Add‑Ons                            │
├─────────────────────────────────────────────────────────────────────────┤
│  Plan Card:                                                          │
│   ┌───────────────────────────────────────────────┐                  │
│   │ Plan:  [Capture ▼]                            │                  │
│   │ Price: $97/mo  + $249 setup                   │                  │
│   │ Features:                                     │                  │
│   │ • Missed Call Text Back                       │                  │
│   │ • Unlimited Forms & Calendars                 │                  │
│   │ • CRM integration                             │                  │
│   └───────────────────────────────────────────────┘                  │
│                                                                       │
│  Add‑On Options: (grid of cards)                                      │
│   ┌─────────────┐  ┌──────────────┐  ┌───────────────┐                │
│   │ [ ] Get Paid Now                                    │
│   │  $49/mo                                            │
│   │  Send invoice in 60 seconds                        │
│   └─────────────┘  └──────────────┘  └───────────────┘                │
│   ...                                                                 │
│                                                                       │
│  Order Summary:                                                       │
│   Plan: Capture                    $97/mo + $249 setup                │
│   + Get Paid Now                   $49/mo                             │
│   + Email Authority                $49/mo                             │
│   ————————————————————————————————————                             │
│   Monthly Total                    $195/mo                           │
│   One‑time Total                   $249                              │
│                                                                       │
│  [Back] [Continue]                                                │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key UI Elements:**

1. **Progress Indicator:** A series of circles shows the user is on step 1 of 3.  The first circle is filled (or solid), while the others are outlined.  Colour scheme: filled circles in purple; outlined circles in white.
2. **Plan Card:** Displays the current plan.  The plan name is a dropdown that lists all available tiers.  Changing the selection will update the price and features displayed.  The setup fee is shown separately.  A summary of included features is optional but recommended to reassure the user.
3. **Add‑On Cards:** Each add‑on is presented as a selectable card with a checkbox.  The card highlights when selected.  The monthly price is displayed clearly.  The card includes a short description emphasising the benefit.  There are six cards: AI Voice Chat, Unlimited AI, Email Authority, Get Paid Now, Social Autopilot, Omnichannel Inbox.
4. **Order Summary:** A sticky sidebar (on desktop) or a section above the buttons (on mobile) summarises the user’s current selections.  It lists the plan name, base price and setup fee, each selected add‑on with its price, and calculates the monthly and one‑time totals.
5. **Navigation Buttons:** A grey “Back” button returns to the previous page (the plan’s marketing page).  A primary yellow “Continue” button moves to Step 2.  The “Continue” button should be disabled if the plan is invalid (unlikely) or if required consent is missing (consent is collected in Step 2).

#### 4.1.2 User Interactions

1. **Plan Change:** When the user selects a different plan from the dropdown, update the plan state and clear all selected add‑ons.  Also update the order summary and the plan description accordingly.
2. **Add‑On Selection:** Toggling an add‑on card should update the list of selected add‑ons in state and recalculate the monthly total.  Use accessible checkboxes (input type=checkbox) behind each card.  This ensures screen readers can toggle the state.  The card’s border should change colour to indicate selection.
3. **Hover & Focus States:** Provide subtle hover states (slight lift, border change) and focus outlines for keyboard users.
4. **Responsiveness:** On small screens, stack the add‑on cards in a single column or use a horizontally scrollable row.  Keep the order summary pinned at the bottom of the screen.
5. **Persist State:** Use `sessionStorage` to persist the plan and selected add‑ons.  Each time the user selects an option, update `sessionStorage.checkout_state`.  This allows the user to navigate away and return without losing progress.

#### 4.1.3 Accessibility Considerations

1. **Labels & Roles:** Use proper labels for dropdowns and checkboxes.  For the plan dropdown, use `<select>` with an associated `<label>` reading “Select plan.”  For each add‑on, wrap the card in a `<label>` element containing a visually hidden `<input type="checkbox">`.  Use `role="checkbox"` and `aria-checked` attributes to ensure screen readers announce state changes.
2. **Keyboard Navigation:** Ensure that all interactive elements (dropdown, checkboxes, buttons) can be reached via the Tab key.  Provide visual focus indicators such as purple outlines.
3. **Colour Contrast:** Ensure text and icons meet WCAG AA contrast ratios against the dark background.  Use white or light grey for text on dark surfaces, and bold, saturated colours for highlights.

### 4.2 Contact Details Form (Step 2)

When the user advances to Step 2, they must enter their personal and business details.  This step ensures that the correct contact can be created in GHL and that we have necessary information for sub‑account creation and communications.

#### 4.2.1 Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Progress: ○●○                                                       │
│  Step 2 of 3 – Provide Your Details                                  │
├─────────────────────────────────────────────────────────────────────────┤
│  Name Fields:                                                        │
│  ┌───────────────┬───────────────┐                                   │
│  │ First Name    │ Last Name      │                                   │
│  └───────────────┴───────────────┘                                   │
│  Contact Fields:                                                     │
│  ┌───────────────┬───────────────┐                                   │
│  │ Email         │ Phone         │                                   │
│  └───────────────┴───────────────┘                                   │
│  Business Name:                                                     │
│  ┌───────────────────────────────┐                                   │
│  │ [__________________________]  │                                   │
│  └───────────────────────────────┘                                   │
│  Domain Question:                                                   │
│  ○ Yes, I have a domain        ○ No, I need help                  │
│    If Yes:                                                         │
│      Your domain: [_________________________]                     │
│  Optional Message:                                                │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────────┘ │
│  TCPA Consent:                                                   │
│  ☐ I agree to receive ... (link to privacy policy)              │
│                                                                │
│  [Back] [Review Your Order]                                    │
└─────────────────────────────────────────────────────────────────────────┘
```

**Fields & Behaviours:**

1. **First Name & Last Name:** Required.  Accept letters, hyphens and apostrophes.  Provide placeholders (“Jane”, “Doe”).
2. **Email:** Required.  Use `type="email"` for basic browser validation.  Provide a pattern to ensure it includes “@” and a domain.
3. **Phone:** Required.  Use `type="tel"` but implement a custom validator that only accepts digits, spaces, parentheses, plus signs and hyphens.  Normalise the phone number before sending to the server.
4. **Business Name:** Required.  This will populate the contact’s company name in GHL.  Accept any characters; trim leading/trailing spaces.
5. **Domain Question & Domain Name:** Present two radio buttons.  If the user selects “Yes,” reveal the domain input.  Validate that it includes a dot and ends with a TLD (e.g. `.com`, `.org`).  Use a simple regex but do not enforce subdomain restrictions.
6. **Optional Message:** Provide a text area with a character limit (e.g. 500) and a character counter.  This field maps to a note on the contact in GHL.  It can include anything the user wants to tell us before the onboarding call.
7. **TCPA Consent:** Display a checkbox with clear language and a link to the privacy policy.  Mark it as required.  Include the `id` attribute on the `<input>` and a `<label>` with `for` pointing to the input so clicking the text toggles the checkbox.
8. **Buttons:** A grey “Back” button returns to Step 1.  A primary “Review Your Order” button validates the form and moves to Step 3.

#### 4.2.2 Validation & Error Handling

Use the following patterns for validation:

```javascript
function validateEmail(email) {
  return /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(email);
}
function validatePhone(phone) {
  return /^[0-9()+\s-]{7,15}$/.test(phone);
}
function validateDomain(domain) {
  return /^(?=.*\.)[^\s]+\.[a-zA-Z]{2,}$/i.test(domain);
}
```

When the user attempts to proceed without filling a required field or with invalid input:

1. Show a red border around the invalid field.
2. Display a small error message below the field (e.g. “Please enter a valid email address”).
3. Scroll to the first invalid field and focus it.
4. Prevent navigation to the next step.

Additionally, handle the case where the user enters a domain but selects “No, I need help.”  Clear the domain input and hide it.  If the user toggles between answers, preserve their domain value in state, but do not send it to the server if `hasDomain` is false.

#### 4.2.3 Persisting & Restoring Data

Use the `useEffect` hook to load saved data from sessionStorage when Step 2 renders:

```typescript
useEffect(() => {
  const savedState = JSON.parse(sessionStorage.getItem('checkout_state') ?? '{}');
  if (savedState.firstName) setFirstName(savedState.firstName);
  // repeat for other fields...
}, []);

useEffect(() => {
  const state = {
    firstName,
    lastName,
    email,
    phone,
    businessName,
    hasDomain,
    domainName,
    message,
    tcpaConsent,
    tier,
    addons,
  };
  sessionStorage.setItem('checkout_state', JSON.stringify(state));
}, [firstName, lastName, email, phone, businessName, hasDomain, domainName, message, tcpaConsent, tier, addons]);
```

This ensures that if the user refreshes the page or clicks “Back” from Step 3, their details remain in place.  It also allows the marketer to send a recovery link with query parameters that restore the state.

### 4.3 Review & Confirm (Step 3)

The final step summarises the order and allows the user to confirm.  It should instil confidence that their data is correct and that there will be a separate payment step.

#### 4.3.1 Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Progress: ○○●                                                       │
│  Step 3 of 3 – Review & Confirm                                      │
├─────────────────────────────────────────────────────────────────────────┤
│  Your Order:                                                         │
│  ┌───────────────────────┬───────────────────────┐                   │
│  │ Plan & Add‑Ons        │ Contact Details       │                   │
│  │ ─────────────────────  │ ─────────────────────  │                   │
│  │ Plan: Capture          │ Name: Jane Smith      │                   │
│  │ Price: $97/mo + $249   │ Email: jane@...       │                   │
│  │                        │ Phone: (555) ...       │                   │
│  │ + Get Paid Now         │ Business: Acme         │                   │
│  │ + AI Voice Chat        │ Domain: (none)         │                   │
│  │ + Email Authority      │                       │                   │
│  │                        │ Message: “Looking ...”│                   │
│  │ Total Monthly: $195/mo │ TCPA: ✓               │                   │
│  │ Total One‑time: $249    │                       │                   │
│  │                        │                       │                   │
│  │ [Edit Plan & Add‑Ons]  │ [Edit Details]         │                   │
│  └───────────────────────┴───────────────────────┘                   │
│                                                                       │
│  Legal Notice:                                                        │
│  “By clicking Complete Checkout you will be redirected to our secure  │
│  payment page. Your purchase is handled by EverIntent (powered by    │
│  Stripe) and subject to our Terms of Service.”                       │
│                                                                       │
│  [Back to Details]  [Complete Checkout]                              │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 4.3.2 User Interactions

1. **Edit Links:** Each card has an “Edit” link.  Clicking it navigates the user back to Step 1 or Step 2, with all state preserved.  Use anchor tags (`<a href="#step1">`) or programmatic navigation (`history.push('/checkout/capture?step=1')`).  The progress indicator updates accordingly.
2. **Confirm:** Clicking “Complete Checkout” calls the `submit` handler.  If the front‑end state passes final validation (e.g. totals match, required fields exist), it disables the button, shows a spinner and sends a POST to `start‑checkout`.  The handler waits for a response.  On success, it sets `status = 'redirected'` for the record in Supabase (via the response) and redirects the user to the provided URL.
3. **Error Handling:** If the serverless function returns an error or times out, show an error message at the top of the page: “Something went wrong. Please try again or contact support.”  Allow the user to attempt submission again without losing data.

### 4.4 Persistence Across Sessions & Abandonment

The design must account for abandonment.  A user might start the checkout, leave to gather information or compare plans, and return hours or days later.  To handle this gracefully:

1. **sessionStorage** persists state within the same browser session.  This covers a user who closes the tab and re‑opens it in the same session or returns via the back button.
2. **Supabase** persists state across sessions.  When the user first submits the form at Step 3 (before redirection), the payload is saved to Supabase with `status = 'pending'` and a timestamp.  If they never reach the payment page, the record remains `pending`.
3. **Recovery Links:** When a user abandons the cart, the system can send them a link with query parameters like `?resume=abc123` (where `abc123` is the record ID or some hashed representation).  When the front‑end loads `/checkout/{tier}?resume=abc123`, it queries Supabase (via `start‑checkout/resume` function) to retrieve their previous selections and pre‑populates the form.  This allows them to pick up where they left off.
4. **Follow‑Up Sequence:** A scheduled function (e.g. `abandoned-cart-followup`) runs hourly.  It selects submissions where `status = 'pending'` and `created_at` is older than a certain threshold (e.g. 30 minutes).  It sends a reminder email or SMS via GHL or your ESP.  The message includes a personalised resume link.  The content emphasises the benefits of the plan and provides a call‑to‑action.

## 5. Comprehensive Scenario Catalogue

To ensure that the new checkout flow handles every possible user path, we enumerated a set of scenario categories in v5.3.  In v5.2 we expand on these and provide narratives and diagrams for each plan and combination.  A scenario represents a user’s journey from selecting a plan to either completing a purchase, abandoning it or returning later.  Each scenario describes the UI, the data collected, the tags applied, the automation triggered and the final outcome.

### 5.1 Scenario Categories

We define nine scenario categories.  Each scenario category has a code (SC#) for easy reference.  They are summarised below and elaborated in subsequent subsections.

| Code | Name                     | Description |
|------|--------------------------|-------------|
| SC1  | Baseline                | User selects a single plan with no add‑ons, completes purchase. |
| SC2  | Add‑Ons Selected         | User adds one or more add‑ons and completes purchase. |
| SC3  | Plan Change Mid‑Flow     | User selects one plan, chooses add‑ons, then changes to a different plan and re‑evaluates add‑ons. |
| SC4  | Edit Details             | User fills out details, reviews the order, then edits the plan or add‑ons and proceeds. |
| SC5  | Abandon & Return        | User abandons after Step 2 or Step 3, then returns via browser history or recovery email. |
| SC6  | Multi Add‑On Adjustment | User toggles multiple add‑ons on and off to see pricing effects before finalising. |
| SC7  | Ineligible Add‑Ons      | User tries to select an add‑on not available for the chosen plan (e.g. Unlimited AI on Launch). |
| SC8  | AI Employee Plans       | User selects one of the AI Employee tiers (After‑Hours, Front Office, Full AI Employee, Web Chat Only). |
| SC9  | Full Add‑On Bundle      | User selects the highest tier (Scale or Full AI) with all possible add‑ons (even though some may be included). |

For each scenario category, we provide a narrative description, a diagram of the UI interactions and data flow, a table of tags applied and pipeline movements, and any noteworthy variations.  We then replicate this for each plan to produce a comprehensive catalogue.

### 5.2 Scenario SC1: Baseline

**Narrative:**  A prospective customer visits the Capture plan page.  They are interested in capture features but not ready to buy AI add‑ons.  They click “Get Started” and are taken to `/checkout/capture`.  They confirm the plan, leave add‑ons unselected and proceed through Step 2 and Step 3.  They submit the order and are redirected to the GHL checkout page.  They enter their card details and complete the purchase.  The system records the sale and triggers onboarding.

**Plan:** Capture  |  **Add‑Ons:** None  |  **Outcome:** Paid

#### UI Interaction Diagram

```
User                             UI                        Serverless & GHL
 ─────────────────────────────────────────────────────────────────────────
 1. Navigate to plan page (/smart-websites/capture)               
 2. Click "Get Started" → redirect to /checkout/capture 
 3. Step 1 page loads; plan is pre‑selected as Capture, add‑ons empty
 4. User clicks "Continue"                                                  
 5. Step 2: fills in name, email, phone, company, selects "No" for domain
 6. User checks TCPA consent and clicks "Review Your Order"
 7. Step 3: Review summary shows Capture, no add‑ons; contact details    
 8. User clicks "Complete Checkout"                                      
 9. Front‑end sends POST to start‑checkout with tier=capture, no add‑ons
10. Edge function saves to Supabase (status=pending)                     
11. Edge function upserts contact, applies tag EI: Tier – Capture        
12. Edge function constructs redirect URL go.everintent.com/capture?...
13. Edge function returns success, redirectUrl                           
14. Front‑end redirects user to go.everintent.com/capture                
15. GHL checkout page shows pre‑filled contact; user enters card         
16. Payment completes; GHL triggers workflow; tag EI: Paid is applied    
17. Workflow moves opportunity to Paid – Onboarding stage, sends email   
```

#### Data Flow Table

| Step | Data Collected                         | Tags Applied          | Pipeline Stage Updates                |
|------|----------------------------------------|-----------------------|---------------------------------------|
| 3–7  | `tier=capture`                         | None (yet)           | Pre‑checkout state in sessionStorage  |
| 8–9  | `firstName, lastName, email, phone,
|      | businessName, hasDomain=false, message`
|      |                                        | `EI: Tier – Capture` | Contact created in Pre‑Checkout stage |
| 10–12| Data inserted into Supabase            | `EI: Tier – Capture` | Record status=pendin聘