EverIntent Checkout Design Specification – Version 5.1 (Feb 2026)

1. Introduction

The purpose of this document is to consolidate and refine the EverIntent checkout experience.  Previous versions of the design focused heavily on task lists and implementation details.  While those lists are useful for planning, they do not clearly articulate the end‐to‐end experience we want to deliver.  Version 5.1 translates the backlog into a coherent user–experience design and connects it to the underlying technical architecture.  It respects the guardrails defined in the Smart Websites v2.2 tracker (no URL changes, dark/purple/yellow styling, separation of products) while incorporating Lovable’s feedback that the checkout must feel seamless, modern and intuitive.  This spec builds on v5.0 but re‑casts the work as a narrative: it tells the story of the customer journey, the data flow and the responsibilities of each system.

This document is intentionally comprehensive.  It is intended to be read by both designers and developers working on the EverIntent checkout flow—particularly those building the React components on everintent.com and those integrating with GoHighLevel (GHL) on the backend.  Where previous drafts blurred roles, v5.1 delineates them clearly.  The length of this file reflects the complexity of marrying a modern front‑end with an external subscription platform; however, the goal is always to simplify the customer’s experience.

Versioning

This file supersedes all previous versions of Detail-Checkout-design.md (v2.0 through v5.0).  It is versioned as v5.1 and must be referenced accordingly in the tracker and planning documents.  Future updates should increment the minor version number and include a changelog entry at the end of the file.

2. Current State Summary

Before designing the future state, it is essential to understand the current environment.  This section summarises the assets and configurations already in place at the time of writing.

2.1 Product Definitions

All Smart Websites tiers (Launch, Capture, Convert, Scale) and AI Employee plans (After‑Hours, Front Office, Full AI Employee, Web Chat Only) have been created as SaaS products inside GoHighLevel with appropriate monthly and annual pricing.  Add‑on packs (Email Authority, Get Paid Now, Social Autopilot, Omnichannel Inbox, AI Voice Chat, Unlimited AI) are also configured with their own recurring prices.  Pipeline Revival and Review Blitz are configured as one‑time products.

2.2 Website Pages

The Go EverIntent site in GHL currently contains stub pages for /checkout-launch, /checkout-capture, /checkout-convert and /checkout-scale as well as a basic home page.  These pages were created in the GHL builder but are intentionally blank because we intend to keep all pre‑checkout UI on the main site (everintent.com).  The domain go.everintent.com still resolves to a rudimentary hero section with limited styling, illustrating the problem with using GHL as a public front‑end.  Going forward, we will not use these GHL pages for content; they will either be deleted or repurposed to host the SaaS payment form only.

2.3 Supabase & Serverless

A Supabase project exists with a table checkout_submissions that stores form submissions.  Each record includes contact details, service interest, add‑on selections, TCPA consent, GHL sync fields, and UTM parameters.  There is also a serverless function start-checkout (Edge Function) that currently upserts contacts into GHL and applies tags, but it does not yet return the SaaS checkout URL.  A shared library ghlClient.ts provides helper functions to interact with the GHL v2 API and map tiers/add‑ons to tags.

2.4 Pipelines & Tags

In GHL, a Checkout Pipeline has been created with stages: Pre‑Checkout, Payment Pending, Paid – Onboarding, Snapshot Applied, and Active Customer.  The tag map includes entries for each tier (e.g. EI: Tier – Launch) and each add‑on (e.g. EI: AddOn – Get Paid Now).  However, no workflows yet move opportunities through these stages based on tag application or payment events.  Tagging logic exists in the shared library but must be integrated with the edge function.

2.5 Constraints & Guardrails

The Smart Websites v2.2 tracker defines several non‑negotiable constraints:
	1.	No URL Redirects – All existing slugs (e.g. /smart-websites/smart-site) must remain valid.  We can add new pages, but we cannot change existing paths.
	2.	Consistent Styling – The checkout flow must match the dark background, purple headers and yellow call‑to‑action buttons used throughout EverIntent.com.
	3.	Product Separation – Smart Websites and AI Employee remain distinct product lines; cross‑sells and upsells are allowed but should not blur boundaries.
	4.	Static Site Generators (SSG) – The marketing site uses an SSG with no server‑side routing; therefore, checkout routes must be pre‑generated (/checkout/launch, /checkout/capture, etc.).  This also means we cannot rely on HTTP redirects to change slugs.
	5.	Session Persistence – Users must be able to navigate backwards or refresh the page without losing their progress.  We will use browser storage (sessionStorage) to persist the form state.
	6.	Accessibility & SEO – All forms must be keyboard friendly, labels must be associated with inputs, alt text must be meaningful, and meta tags must be descriptive.
	7.	No Use of GHL Builder – Following the decision to keep the entire pre‑checkout flow on EverIntent.com, we will not use GHL’s page builder except for the hosted payment form.  All custom HTML and styling will live in the React project.

3. Future State Goals

Our goal is to create a checkout experience that is both frictionless for the buyer and maintainable for the business.  To accomplish this, we will:
	1.	Consolidate the Flow – Move all plan selection, add‑on selection and contact detail collection onto EverIntent.com.  Only the payment step will occur on GHL’s SaaS checkout page.
	2.	Improve Clarity – Present the checkout as a three‑step journey (Plan & Add‑Ons → Contact Details → Review & Confirm).  Each step will be clearly delineated, with a progress indicator and back buttons.
	3.	Stay on Brand – Use the dark/purple/yellow colour palette, typography and spacing found on the main site to ensure the checkout feels like a natural extension of EverIntent.com.
	4.	Handle Changes Gracefully – Allow users to switch tiers or modify add‑ons at any time during the pre‑checkout flow without losing other data.  Provide an easy way to return and edit previous steps from the review page.
	5.	Support Abandoned Cart Recovery – Capture incomplete checkouts via Supabase and automatically trigger follow‑up sequences (email or SMS) to encourage completion.  Ensure that the state of the form can be restored via sessionStorage if the user returns.
	6.	Ensure Data Integrity – Upsert contacts in GHL with accurate tags for the chosen tier and add‑ons.  Ensure UTM parameters are preserved and recorded for attribution analysis.
	7.	Maintain Security & Compliance – Collect TCPA consent; ensure that sensitive information (credit card details) is handled exclusively by Stripe via GHL’s checkout, and that our serverless function adheres to Supabase and GHL security best practices.

4. User Journey & Experience Design

This section describes the checkout flow from the perspective of the user.  Each subsection details the components, interactions, validations and styling considerations for each step.

4.1 Step 1: Plan & Add‑On Selection

Overview:  The first step invites the user to customise their purchase by confirming the selected tier and choosing optional add‑on packs.  The page should open with the tier pre‑selected based on the route (e.g. /checkout/capture pre‑selects the Capture tier).  The user may change tiers via a dropdown, though doing so will reset selected add‑ons.  Below the tier card, six add‑on cards appear as toggleable options.  A real‑time order summary in the sidebar (or beneath the cards on mobile) shows the monthly totals and one‑time setup fees.

Layout:
	•	Progress indicator at the top shows three circles (Step 1 of 3).  The current step is filled, while the others are outlined.
	•	Tier Card displays the plan name, price and description.  A Change Plan dropdown allows the user to switch to another tier.  The dropdown lists all available Smart Websites tiers; selecting a different tier updates the state and resets add‑ons.
	•	Add‑On Grid presents the six packs in two rows of three cards.  Each card includes:
	•	Pack name and price (e.g. “Get Paid Now – $49/mo”).
	•	A short description emphasising the benefit (“Send invoice. Get paid in 60 seconds”).
	•	A checkbox that toggles when the card is clicked.  The entire card should highlight when selected.
	•	Order Summary box shows the selected plan (name + price) and any add‑ons.  Totals are calculated as follows:
	•	One‑Time Total: The setup fee for the selected tier (e.g. $249 for Launch).  Add‑ons do not have setup fees.
	•	Monthly Total: Sum of the monthly subscription fee for the tier plus the monthly prices of any selected add‑ons.
	•	Continue Button at the bottom right.  The user cannot proceed unless a tier is selected (always true) and the TCPA consent will be collected later.

Interactions & Validation:
	1.	Pre‑selection: On page load, the tier is read from the URL parameter.  If no parameter is provided or it does not match a known tier, default to launch.
	2.	Change Plan: When the user selects a different tier from the dropdown, update the state accordingly and clear selected add‑ons.  The URL slug remains unchanged; the plan is stored in state.
	3.	Add‑On Toggle: Clicking an add‑on card toggles its selected state.  Use checkboxes for accessibility, but hide the default checkbox styles.  When selected, apply a highlight or border colour to the card.
	4.	Real‑Time Summary: Immediately update the Order Summary when plan or add‑ons change.  Show both one‑time and monthly totals separately to avoid confusion.  Use the “per mo” suffix next to recurring amounts.
	5.	Proceed: The “Continue to Details” button should be disabled if no tier is selected (impossible) but remains enabled if no add‑ons are selected.  Clicking continues to Step 2 and scrolls to top.
	6.	Accessibility: All cards and buttons must be focusable via keyboard.  Use appropriate ARIA roles and labels.  The progress indicator must have an accessible name (“Step 1 of 3”).
	7.	Styling: The background of the page should be dark (#0a0a0a or similar).  Tier and add‑on cards use dark surfaces with subtle outlines.  Purple is used for headings and active highlights; yellow for primary CTAs.  Use consistent border radius and spacing.  On mobile, stack the add‑on cards vertically or in a scrollable row.

4.2 Step 2: Contact Details Form

Overview:  Step 2 collects the buyer’s personal and business information.  All fields except the message are required, and there is a mandatory TCPA consent checkbox.  Domain ownership is captured via radio buttons with conditional display of a domain input field.  Inline validation ensures data is correctly formatted before proceeding.

Layout:
	•	Progress Indicator: The second circle is filled; the other two are outlined.
	•	Input Grid: Use a two‑column layout on desktop for first/last name and email/phone fields, and a single column on mobile.  Each field includes a label, an input and an error state placeholder.
	•	Business Name: A full‑width input captures the company name.  Label this field clearly (e.g. “Business Name or DBA”).
	•	Domain Question: Present two radio options: “Yes, I have a domain” and “No, I need help getting one”.  When “Yes” is selected, reveal a domain input field below.  The domain input should validate for a plausible domain name format (no spaces, must include a dot).
	•	Optional Message: Provide a multi‑line text area for any additional notes or questions.  Do not mark this as required.  Consider adding a character limit (e.g. 500 characters) and show a counter.
	•	TCPA Consent: Present a checkbox with text similar to: “I agree to receive communications from EverIntent regarding my purchase and future offers. View our Privacy Policy.”  The phrase “Privacy Policy” should link to the policy page.
	•	Navigation Buttons: A “Back” button on the left returns to Step 1 with data preserved.  A “Review Your Order” button on the right validates the inputs and proceeds to Step 3.

Interactions & Validation:
	1.	Required Fields: All fields except the message must be filled.  Use HTML5 validation types (e.g. type="email") and custom checks for phone numbers.
	2.	Inline Errors: When a field loses focus, validate its contents.  If invalid, display a red border and a small error message below (e.g. “Please enter a valid email address”).  Remove the error when corrected.
	3.	Conditional Domain Input: Only show the domain text field if the user selects “Yes” for owning a domain.  If the user changes the answer back to “No,” clear and hide the domain value.
	4.	TCPA Required: The “Review” button must be disabled until the TCPA checkbox is ticked.  Provide a tooltip or note explaining why it is required.
	5.	Back Navigation: Clicking “Back” should preserve all entered values (this is accomplished via React state and sessionStorage; see Section 4.4).  It should also scroll the page to the top of Step 1.
	6.	Proceed: On clicking “Review Your Order,” validate all fields.  If any errors remain, scroll to the first invalid input and focus it.  If all are valid, advance to Step 3.
	7.	Styling: Use the same dark background and white text for inputs, with purple borders on focus.  Buttons use the yellow accent colour.  The form container should have gentle padding and a max width to improve readability.

4.3 Step 3: Review & Confirm

Overview:  The final step summarises the user’s selections and details.  It allows for last‑minute edits via “Edit” links and final confirmation before redirecting to the GHL payment form.  A clear disclaimer explains that clicking “Complete Checkout” will open a secure payment page.

Layout:
	•	Progress Indicator: The third circle is filled; the first two are outlined.
	•	Summary Boxes: Use two cards side by side (or stacked on mobile).  The first card summarises the plan and add‑ons; the second summarises the contact details.  Each section has an “Edit” link that returns to the relevant step.
	•	Totals: At the bottom of the first card, display the total monthly cost and the one‑time setup fee clearly.  Consider using a thicker border or a highlight to separate totals from line items.
	•	Navigation: A “Back” button returns to Step 2 with values preserved.  A prominent yellow “Complete Checkout” button triggers submission.
	•	Legal Notice: Beneath the buttons, include a small note about being redirected to a secure payment page and referencing the Terms of Service.

Interactions & Validation:
	1.	Editing: The “Edit” links should navigate back to the respective step (Plan & Add‑Ons or Details) with all selections preserved.  Use anchor navigation (#step1, #step2) or programmatic scrolling.  The step indicator and progress bar update accordingly.
	2.	Submission: Clicking “Complete Checkout” triggers a submit handler that disables the button, shows a spinner and calls the serverless function (see Section 6).  If the function returns success, the page should redirect to the provided GHL URL.  If it returns an error (e.g. contact upsert failure), show a toast or inline error at the top of the form with a suggestion to retry.
	3.	Data Integrity Check: Before calling the serverless function, compute the expected totals and ensure they match the front‑end calculation.  If there is a mismatch, log an error and prevent submission.  This guards against tampering in the browser.
	4.	Styling: As above, maintain dark backgrounds, purple headings and yellow CTAs.  Use consistent card components from the design system.

4.4 Session Persistence & Local State

To provide a resilient experience, all form state should be stored in memory and persisted to sessionStorage on each step transition.  Pseudocode for this pattern is included in the v2.2 tracker and reproduced here:
