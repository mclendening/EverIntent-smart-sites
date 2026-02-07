Comprehensive Implementation Report for EverIntent: All Products and Site-Wide Checkout & Attribution

Document Purpose: This report serves as a step-by-step blueprint for implementing a unified, seamless checkout experience across all EverIntent products—Smart Websites, AI Employee plans, and add-on services—and establishing attribution and analytics reporting for every customer journey. It is designed for developers working in GoHighLevel (GHL) and Lovable’s front-end team, and for business stakeholders who need to understand the workflow end-to-end. The guidance herein must be aligned with the existing implementation tracker and adheres to the static site generator (SSG) constraints (no redirects) and style guidelines.

We cover the following product lines:
	•	Smart Websites: Launch, Capture, Convert, Scale tiers
	•	AI Employee: After-Hours, Front Office, Full AI Employee
	•	Add-On Packs & Standalone Services: Email Authority (Warmy), Get Paid Now (invoicing), AI Voice Chat, Social Autopilot, Omnichannel Inbox, Unlimited AI, Pipeline Revival, Review Blitz, domain acquisition and Warmy packages, SEO & GBP Management

The tasks are broken into back-end (GHL) configuration, front-end implementation, analytics & attribution, and cross-product flows. A textual diagram of the checkout process for each product line is provided. Finally, an exhaustive enumeration of buying scenarios explains how each combination of product and add-on should behave, what data is captured, and what analytics should be recorded.

GoHighLevel Configuration Tasks for All Products

The following tasks outline the required setup within GoHighLevel for Smart Websites, AI Employee plans, and all add-on products. Each task includes actions, expected outcomes, and verification steps. These tasks should be logged into the existing implementation tracker and mapped to appropriate IDs.

GHL Task 1: Set Up SaaS Products for Website Tiers
	•	Create four SaaS products in GHL: Launch (one-time $249), Capture ($97/mo),
	•	Convert ($197/mo), Scale ($297/mo). For each, configure the one-time setup fee
	•	as an order bump. Attach the correct snapshot to ensure the corresponding
	•	website template, automations, and CRM setup are provisioned upon purchase.

GHL Task 2: Set Up SaaS Products for AI Employee Plans
	•	Create three SaaS products in GHL: After-Hours ($197/mo), Front Office
	•	($297/mo), Full AI Employee ($597/mo). Include their one-time setup fees as
	•	order bumps ($997, $1,497, $2,500 respectively). Attach the appropriate call-
	•	handling snapshot, voice minutes allocation, and AI settings to each product.

GHL Task 3: Define All Add-On Packs as Products
	•	For each add-on pack (Email Authority, Get Paid Now, AI Voice Chat, Social
	•	Autopilot, Omnichannel Inbox, Unlimited AI), create a separate SaaS product.
	•	Designate whether the product is a monthly subscription or a one-time purchase
	•	(e.g., Pipeline Revival is one-time). Ensure price points match the business
	•	strategy and do not conflict with tier pricing.

GHL Task 4: Configure Order Bumps and Cross-Sells on GHL Checkout Pages
	•	Add order bumps for setup fees to each checkout page. Configure optional cross-
	•	sell upsells for add-on packs that are relevant to the tier (e.g., Email
	•	Authority upsell on Launch and Capture checkouts). Each upsell should clearly
	•	show price, description, and the monthly vs one-time nature of the add-on.

GHL Task 5: Integrate Stripe for Payments
	•	Ensure GHL is connected to a live Stripe account. Map each SaaS product and add-
	•	on to a Stripe Price ID. Verify that both recurring and one-time charges are
	•	processed correctly, receipts are issued, and payment failures trigger
	•	appropriate notifications.

GHL Task 6: Set Up Custom Fields for Analytics & Attribution
	•	Within GHL, define custom fields or tags to capture the following data: tier
	•	purchased, add-ons selected, source/UTM parameters, first touch channel, last
	•	touch channel. Ensure these fields are available in workflows and reporting.

GHL Task 7: Webhook & n8n Workflow Configuration
	•	Configure webhooks in GHL that fire on successful checkout events for each
	•	product. The webhook should send payload data (customer info, tier, add-ons,
	•	payment details) to n8n. Build or update n8n workflows to create sub-accounts,
	•	apply snapshots, enable purchased add-ons, tag contacts with UTM parameters, and
	•	send welcome emails.

GHL Task 8: Automated Onboarding & Service Activation
	•	Develop or refine GHL workflows that: 1) send a welcome email with portal login
	•	and instructions; 2) trigger domain setup tasks for Email Authority; 3) enable
	•	AI chat and voice capabilities if purchased; 4) schedule onboarding calls; 5)
	•	enrol the customer in nurture sequences that correspond to their tier and add-on
	•	selections.

GHL Task 9: Quality Assurance & Testing
	•	For each product and add-on combination, perform test purchases in Stripe’s
	•	sandbox mode. Verify that the correct charges are applied, the customer details
	•	pre-fill in checkout, snapshots are applied, add-ons are enabled, and
	•	automations fire. Log the results, errors, and fixes.

GHL Task 10: Monitoring, Error Handling & Billing Recovery
	•	Implement monitoring in GHL to catch failed payments, incomplete checkouts, and
	•	webhook errors. Set up fallback alerts to support staff. Configure Stripe’s
	•	automated dunning to retry failed payments. Ensure billing recovery mechanisms
	•	are in place and documented.

Front-End Site Implementation Tasks for All Products

These tasks describe the necessary changes to the EverIntent website to support unified checkout flows, cross-product navigation, add-on selection, and attribution tracking. The tasks are grouped by functionality and product line but share common patterns to maintain consistency.

Site Implementation Task 1: Unify Navigation & Menus
	•	Ensure the main navigation clearly separates product lines (Smart Websites, AI
	•	Employee, Add-Ons, Services). Under each product line, include tier-specific
	•	links and a pricing/comparison link. Add a top-level Add-Ons link that leads to
	•	the add-ons hub. Remove redundant links (e.g., multiple Contact entries).

Site Implementation Task 2: Create Checkout Pages for All Products
	•	For each product tier (Launch, Capture, Convert, Scale, After-Hours, Front
	•	Office, Full AI Employee), build a /checkout/[slug] page. Each page uses a
	•	multi-step form: Step 1 selects the plan and add-ons; Step 2 collects user
	•	details (name, email, phone, company) and business-specific questions (e.g.,
	•	domain ownership for websites, hours of operation for AI Employee); Step 3
	•	reviews charges and triggers the start-checkout function.

Site Implementation Task 3: Implement Universal Order Summary
	•	Design a reusable order summary component that shows the selected product, setup
	•	fee, recurring cost, selected add-ons, and total. The component should update
	•	dynamically across all checkout pages and differentiate between monthly and one-
	•	time charges.

Site Implementation Task 4: Plan & Add-On Selection UI Patterns
	•	Create standardized UI components (cards, toggles, checkboxes) for selecting
	•	plans and add-ons. Each card should display the plan name, a brief description,
	•	price, included minutes (for AI Employee), and included features. Add-ons should
	•	be grouped by category (e.g., messaging, payments, reputation).

Site Implementation Task 5: Data Validation & User Experience Enhancements
	•	Add inline validation for all required fields. Provide tooltips or help icons
	•	explaining each field or add-on. Use progress indicators to show the checkout
	•	step. Allow users to go back and modify selections without losing data.

Site Implementation Task 6: Integration with start-checkout Endpoint
	•	For both Smart Websites and AI Employee checkouts, send a POST request to the
	•	start-checkout edge function with the user’s input, selected plan, selected
	•	add-ons, and any UTM parameters. Handle the response by redirecting to GHL
	•	checkout. Display error messages if the function returns an error.

Site Implementation Task 7: CTAs & Call-to-Action Updates
	•	Replace all existing ‘Get Started’ buttons with links to the appropriate
	•	/checkout/[tier] route. Add cross-sell CTAs on each tier page: for Smart
	•	Websites, promote After-Hours AI Employee at the Scale tier; for AI Employee,
	•	promote Smart Website services for customers who do not have a website. For each
	•	add-on pack, include ‘Learn More’ buttons that link to detailed descriptions on
	•	the add-ons hub.

Site Implementation Task 8: Add-Ons Hub & Service Pages
	•	Build /add-ons hub listing all packs and stand-alone services (Warmy domain
	•	warm-up, SEO optimization, GBP management). Each add-on should have its own sub-
	•	page with detailed features, pricing, compatibility with tiers, instructions for
	•	enabling, and FAQs. Integrate cross-sell suggestions back to core tiers.

Site Implementation Task 9: Cross-Line Upsells & Bridges
	•	Implement modals or sections that bridge product lines. For example, on the AI
	•	Employee After-Hours page, include a section explaining how adding a Smart
	•	Website can enhance lead conversion. Conversely, on the Scale website page,
	•	include a section recommending AI Employee for after-hours call handling.

Site Implementation Task 10: Consistency & Styling
	•	Ensure all new pages and components match the dark-themed design with purple and
	•	yellow accents. Use the June 2025 EverIntent Style Guide as a reference for
	•	typography, spacing, button styles, and component behavior. Test across desktop
	•	and mobile viewports.

Analytics & Attribution Reporting Tasks

Proper analytics and attribution are essential for understanding where customers come from, how they progress through the funnel, and which products and add-ons drive revenue. The following tasks define the instrumentation needed across all product lines.

Analytics Task 1: Define Event Taxonomy
	•	Develop a naming convention for events (e.g., checkout_plan_selected,
	•	checkout_addon_selected, checkout_form_submitted, ghl_checkout_completed,
	•	addon_purchase_success). Document the payload schema for each event, including
	•	user ID, tier, add-ons, timestamps, UTM parameters, and step index.

Analytics Task 2: Implement Client-Side Tracking
	•	Embed analytics scripts on all relevant pages. For each step in the checkout
	•	flow, send events to the analytics platform (GA4, Supabase, or chosen platform).
	•	Capture page views, button clicks, form interactions, and errors. Pass along UTM
	•	parameters from the URL into the analytics payload.

Analytics Task 3: Server-Side Tracking & Attribution
	•	Inside the start-checkout function, log events to the analytics pipeline
	•	whenever a checkout is initiated. Include metadata such as the referring page,
	•	IP address, and device. On the GHL side, configure webhook calls to send
	•	completed checkout data back to the analytics system for revenue attribution.

Analytics Task 4: Integrate with UTM & Marketing Source Tracking
	•	Ensure that all marketing campaign links include UTM parameters. On first
	•	landing, capture and store UTM values in cookies or session storage. Pass these
	•	values to start-checkout and into GHL contacts via custom fields. Use them
	•	later to attribute revenue back to campaigns.

Analytics Task 5: Dashboards & Reporting
	•	Set up dashboards that visualise funnel metrics: number of visitors per tier
	•	page, checkout initiations, step-wise drop-off rates, add-on attach rates,
	•	conversion rates, revenue per plan, revenue per add-on. Implement cohort
	•	analysis to measure churn and upsell performance across Smart Websites and AI
	•	Employee plans.

Analytics Task 6: Revenue & LTV Calculations
	•	Combine subscription and one-time transaction data to calculate Monthly
	•	Recurring Revenue (MRR), Annual Recurring Revenue (ARR), and lifetime value per
	•	customer. Differentiate revenue streams by product line and add-on type.

Analytics Task 7: Attribution Modelling
	•	Implement multi-touch attribution modelling to assign revenue credit to
	•	marketing channels across the user journey. Use first touch, last touch, and
	•	weighted models to evaluate channel performance. Analyse cross-line upgrades
	•	(e.g., from Scale to After-Hours) and attribute revenue accordingly.

Analytics Task 8: Quality Assurance for Analytics
	•	Validate that analytics events are firing correctly by comparing event counts to
	•	actual form submissions and GHL transactions. Use tag debugging tools and test
	•	scripts to simulate user paths across all scenarios.

Analytics Task 9: Privacy & Compliance
	•	Implement data anonymisation and consent mechanisms to comply with privacy laws
	•	(GDPR, CCPA). Provide a cookie banner for tracking consent and ensure that
	•	tracking scripts respect user choices.

Analytics Task 10: Documentation & Knowledge Transfer
	•	Create a comprehensive analytics documentation that explains event names,
	•	fields, dashboards, and typical interpretations. Share with marketing and sales
	•	teams so they can self-serve insights and propose optimisations.

Textual Diagrams of Product Purchase Flows

Below are textual representations of the checkout flows for each product line. These diagrams describe the sequence of interactions between the customer, the website, GoHighLevel, and the automation systems. They ensure that every data hand-off, decision point, and user action is fully described for engineers and product owners.

Smart Websites Checkout Flow
	•		1.	Visitor views the pricing table on a Smart Websites tier page (Launch, Capture, Convert, Scale).
	•		2.	They click “Get Started” and are routed to /checkout/[website-tier].
	•		3.	Plan & Add-On Selection: The user can confirm or change the tier, select website-related add-ons (Email Authority, Get Paid Now, Social Autopilot, Omnichannel Inbox, Unlimited AI), and see the updated order summary.
	•		4.	Details Collection: Collect first name, last name, email, phone, business name, and domain preference. Validate each field and ensure TCPA consent is checked.
	•		5.	Review & Confirm: Present a summary of selections. When the user proceeds, send the data to start-checkout (containing all fields and UTM parameters).
	•		6.	Backend Handling: start-checkout stores data in Supabase, upserts the contact in GHL with appropriate tags and notes, and returns a URL to go.everintent.com/[website-tier] with pre-filled parameters.
	•		7.	Payment on GHL: The user completes payment through Stripe. Setup fees and subscription fees are charged. Upsells may offer AI Employee or add-on packs.
	•		8.	Post-Payment Workflow: GHL triggers a webhook to n8n, which provisions the website, configures the domain (if needed), enables the purchased add-ons, and sends welcome emails.
	•		9.	Analytics: Each step emits events: page views, selections, form submissions, checkout started, checkout completed.

AI Employee Checkout Flow
	•		1.	Visitor lands on an AI Employee plan page (After-Hours, Front Office, Full AI Employee) via navigation or a marketing link.
	•		2.	They click “Get Started” and are taken to /checkout/[ai-plan].
	•		3.	Plan & Add-On Selection: The user can confirm or change the AI plan. They may select voice-related add-ons: additional phone lines (DIDs), additional user seats, the Web Chat widget, unlimited AI modules (Conversation AI, Reviews AI, Content AI, Funnel AI) if not included, and optional packs like Get Paid Now.
	•		4.	Hours & Qualifying Questions: The form collects business hours (for After-Hours coverage), preferred call screening questions (for Front Office), or channels to activate (for Full AI Employee). It also collects contact information and TCPA consent.
	•		5.	Review & Confirm: Summarise monthly charges, one-time setup fees, selected packs, and projected voice minutes. On confirmation, call start-checkout.
	•		6.	Backend Handling: The edge function stores the data, tags the contact in GHL with AI plan identifiers, adds notes about selected channels and add-ons, and constructs a redirect URL to go.everintent.com/[ai-plan] with query parameters.
	•		7.	Payment & Upsell: On the GHL checkout page, the user sees their plan cost, call minute bundles, and upsell prompts for additional modules. They pay using the Stripe form. Order bumps handle setup fees.
	•		8.	Post-Payment Workflow: GHL and n8n create the sub-account, enable voice AI training, set up call routing rules (after-hours vs business hours), provision web chat or SMS channels, and send onboarding instructions. If voice minutes exceed the base allowance, per-minute billing is configured.
	•		9.	Analytics: Events capture plan selection, minutes add-on selection, form completion, checkout initiation, checkout completion, and subsequent add-on purchases.

Add-On Purchases & Stand-Alone Services
	•		1.	A customer (new or existing) lands on the Add-Ons hub or a specific add-on page.
	•		2.	They click “Add to Cart” or “Get Started” next to the desired pack.
	•		3.	If the customer is not logged in, the site prompts them to choose a base plan or logs them in via a single sign-on. If they already have a base plan, the add-on is attached to their existing sub-account.
	•		4.	The add-on detail page collects any specific info (e.g., domain for Email Authority, templates for Social Autopilot).
	•		5.	The site calls start-checkout with the add-on selection and user information. The function tags the existing contact in GHL and returns the appropriate GHL checkout URL for the add-on.
	•		6.	The customer completes payment on GHL. The add-on is activated via a workflow that updates the sub-account, adds usage allowances, and sends confirmation emails.
	•		7.	Analytics track add-on page views, add-on selections, checkout initiations, and successful purchases.

Cross-Line Upgrade Flow
	•		1.	An existing Smart Websites customer logs into their portal and sees a recommendation to add After-Hours AI Employee for after-hours call coverage.
	•		2.	They click “Upgrade Now,” which navigates them to /checkout/after-hours with their contact and sub-account details pre-populated.
	•		3.	The checkout page recognises they are an existing website customer and disables the plan selection step; only add-ons relevant to AI are shown.
	•		4.	The user completes the AI-specific form (hours of operation, call screening preferences) and reviews the cost.
	•		5.	On submission, start-checkout records that this is an existing sub-account upgrade, tags the contact with the AI plan, and constructs a redirect URL to go.everintent.com/after-hours with upgrade-specific parameters.
	•		6.	Payment is collected via GHL. Upon success, the AI modules are activated in the user’s existing sub-account without duplicating the website snapshot.
	•		7.	Analytics report this as an upgrade event, linking the revenue back to the original acquisition channel and capturing the upsell source (dashboard recommendation).

Exhaustive Buying Scenarios Across All Products

The following scenarios illustrate how customers might purchase various combinations of Smart Website tiers, AI Employee plans, and add-on packs. Each scenario is described with the user journey, the specific data captured, the charges applied, and the analytics events fired. These scenarios are representative patterns; the same structure applies across all other permutations. To ensure coverage, we document multiple scenarios per tier, plan, and add-on count.

Scenario 1: Launch with 0 Add-Ons
	•	Product: Smart Website – Launch
	•	Add-Ons Selected: None
	•	User Journey: The user navigates to the Launch tier page and clicks Get Started, leading to /checkout/launch.
	•	Selection Step: They confirm the Launch plan and choose no add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/launch is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (0), checkout completion, and revenue attribution to the original marketing source.

Scenario 2: Launch with 1 Add-On
	•	Product: Smart Website – Launch
	•	Add-Ons Selected: Email Authority
	•	User Journey: The user navigates to the Launch tier page and clicks Get Started, leading to /checkout/launch.
	•	Selection Step: They confirm the Launch plan and choose 1 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/launch is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (1), checkout completion, and revenue attribution to the original marketing source.

Scenario 3: Launch with 2 Add-Ons
	•	Product: Smart Website – Launch
	•	Add-Ons Selected: Email Authority, Get Paid Now
	•	User Journey: The user navigates to the Launch tier page and clicks Get Started, leading to /checkout/launch.
	•	Selection Step: They confirm the Launch plan and choose 2 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/launch is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (2), checkout completion, and revenue attribution to the original marketing source.

Scenario 4: Launch with 3 Add-Ons
	•	Product: Smart Website – Launch
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat
	•	User Journey: The user navigates to the Launch tier page and clicks Get Started, leading to /checkout/launch.
	•	Selection Step: They confirm the Launch plan and choose 3 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/launch is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (3), checkout completion, and revenue attribution to the original marketing source.

Scenario 5: Launch with 4 Add-Ons
	•	Product: Smart Website – Launch
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat, Social Autopilot
	•	User Journey: The user navigates to the Launch tier page and clicks Get Started, leading to /checkout/launch.
	•	Selection Step: They confirm the Launch plan and choose 4 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/launch is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (4), checkout completion, and revenue attribution to the original marketing source.

Scenario 6: Capture with 0 Add-Ons
	•	Product: Smart Website – Capture
	•	Add-Ons Selected: None
	•	User Journey: The user navigates to the Capture tier page and clicks Get Started, leading to /checkout/capture.
	•	Selection Step: They confirm the Capture plan and choose no add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/capture is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (0), checkout completion, and revenue attribution to the original marketing source.

Scenario 7: Capture with 1 Add-On
	•	Product: Smart Website – Capture
	•	Add-Ons Selected: Email Authority
	•	User Journey: The user navigates to the Capture tier page and clicks Get Started, leading to /checkout/capture.
	•	Selection Step: They confirm the Capture plan and choose 1 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/capture is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (1), checkout completion, and revenue attribution to the original marketing source.

Scenario 8: Capture with 2 Add-Ons
	•	Product: Smart Website – Capture
	•	Add-Ons Selected: Email Authority, Get Paid Now
	•	User Journey: The user navigates to the Capture tier page and clicks Get Started, leading to /checkout/capture.
	•	Selection Step: They confirm the Capture plan and choose 2 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/capture is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (2), checkout completion, and revenue attribution to the original marketing source.

Scenario 9: Capture with 3 Add-Ons
	•	Product: Smart Website – Capture
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat
	•	User Journey: The user navigates to the Capture tier page and clicks Get Started, leading to /checkout/capture.
	•	Selection Step: They confirm the Capture plan and choose 3 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/capture is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (3), checkout completion, and revenue attribution to the original marketing source.

Scenario 10: Capture with 4 Add-Ons
	•	Product: Smart Website – Capture
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat, Social Autopilot
	•	User Journey: The user navigates to the Capture tier page and clicks Get Started, leading to /checkout/capture.
	•	Selection Step: They confirm the Capture plan and choose 4 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/capture is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (4), checkout completion, and revenue attribution to the original marketing source.

Scenario 11: Convert with 0 Add-Ons
	•	Product: Smart Website – Convert
	•	Add-Ons Selected: None
	•	User Journey: The user navigates to the Convert tier page and clicks Get Started, leading to /checkout/convert.
	•	Selection Step: They confirm the Convert plan and choose no add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/convert is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (0), checkout completion, and revenue attribution to the original marketing source.

Scenario 12: Convert with 1 Add-On
	•	Product: Smart Website – Convert
	•	Add-Ons Selected: Email Authority
	•	User Journey: The user navigates to the Convert tier page and clicks Get Started, leading to /checkout/convert.
	•	Selection Step: They confirm the Convert plan and choose 1 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/convert is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (1), checkout completion, and revenue attribution to the original marketing source.

Scenario 13: Convert with 2 Add-Ons
	•	Product: Smart Website – Convert
	•	Add-Ons Selected: Email Authority, Get Paid Now
	•	User Journey: The user navigates to the Convert tier page and clicks Get Started, leading to /checkout/convert.
	•	Selection Step: They confirm the Convert plan and choose 2 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/convert is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (2), checkout completion, and revenue attribution to the original marketing source.

Scenario 14: Convert with 3 Add-Ons
	•	Product: Smart Website – Convert
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat
	•	User Journey: The user navigates to the Convert tier page and clicks Get Started, leading to /checkout/convert.
	•	Selection Step: They confirm the Convert plan and choose 3 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/convert is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (3), checkout completion, and revenue attribution to the original marketing source.

Scenario 15: Convert with 4 Add-Ons
	•	Product: Smart Website – Convert
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat, Social Autopilot
	•	User Journey: The user navigates to the Convert tier page and clicks Get Started, leading to /checkout/convert.
	•	Selection Step: They confirm the Convert plan and choose 4 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/convert is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (4), checkout completion, and revenue attribution to the original marketing source.

Scenario 16: Scale with 0 Add-Ons
	•	Product: Smart Website – Scale
	•	Add-Ons Selected: None
	•	User Journey: The user navigates to the Scale tier page and clicks Get Started, leading to /checkout/scale.
	•	Selection Step: They confirm the Scale plan and choose no add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/scale is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (0), checkout completion, and revenue attribution to the original marketing source.

Scenario 17: Scale with 1 Add-On
	•	Product: Smart Website – Scale
	•	Add-Ons Selected: Email Authority
	•	User Journey: The user navigates to the Scale tier page and clicks Get Started, leading to /checkout/scale.
	•	Selection Step: They confirm the Scale plan and choose 1 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/scale is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (1), checkout completion, and revenue attribution to the original marketing source.

Scenario 18: Scale with 2 Add-Ons
	•	Product: Smart Website – Scale
	•	Add-Ons Selected: Email Authority, Get Paid Now
	•	User Journey: The user navigates to the Scale tier page and clicks Get Started, leading to /checkout/scale.
	•	Selection Step: They confirm the Scale plan and choose 2 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/scale is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (2), checkout completion, and revenue attribution to the original marketing source.

Scenario 19: Scale with 3 Add-Ons
	•	Product: Smart Website – Scale
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat
	•	User Journey: The user navigates to the Scale tier page and clicks Get Started, leading to /checkout/scale.
	•	Selection Step: They confirm the Scale plan and choose 3 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/scale is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (3), checkout completion, and revenue attribution to the original marketing source.

Scenario 20: Scale with 4 Add-Ons
	•	Product: Smart Website – Scale
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat, Social Autopilot
	•	User Journey: The user navigates to the Scale tier page and clicks Get Started, leading to /checkout/scale.
	•	Selection Step: They confirm the Scale plan and choose 4 add-on(s).
	•	Form Step: The user inputs their name, email, phone, business name, and domain preference and accepts TCPA consent.
	•	Backend Process: The data is passed to start-checkout, saved in Supabase, tagged in GHL, and a redirect to go.everintent.com/scale is constructed.
	•	Payment & Provisioning: The user pays the one-time fee and subscription on GHL; automations provision the website and activate the selected add-ons.
	•	Analytics & Attribution: Events recorded include tier page view, checkout start, add-on selection count (4), checkout completion, and revenue attribution to the original marketing source.

Scenario 21: After-Hours with 0 Add-Ons
	•	Product: AI Employee – After-Hours
	•	Add-Ons Selected: None
	•	User Journey: Visitor clicks Get Started on the After-Hours page and lands on /checkout/after-hours.
	•	Selection Step: They confirm the After-Hours plan and select no extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/after-hours.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 22: After-Hours with 1 Add-On
	•	Product: AI Employee – After-Hours
	•	Add-Ons Selected: Email Authority
	•	User Journey: Visitor clicks Get Started on the After-Hours page and lands on /checkout/after-hours.
	•	Selection Step: They confirm the After-Hours plan and select 1 extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/after-hours.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 23: After-Hours with 2 Add-Ons
	•	Product: AI Employee – After-Hours
	•	Add-Ons Selected: Email Authority, Get Paid Now
	•	User Journey: Visitor clicks Get Started on the After-Hours page and lands on /checkout/after-hours.
	•	Selection Step: They confirm the After-Hours plan and select 2 extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/after-hours.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 24: After-Hours with 3 Add-Ons
	•	Product: AI Employee – After-Hours
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat
	•	User Journey: Visitor clicks Get Started on the After-Hours page and lands on /checkout/after-hours.
	•	Selection Step: They confirm the After-Hours plan and select 3 extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/after-hours.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 25: After-Hours with 4 Add-Ons
	•	Product: AI Employee – After-Hours
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat, Social Autopilot
	•	User Journey: Visitor clicks Get Started on the After-Hours page and lands on /checkout/after-hours.
	•	Selection Step: They confirm the After-Hours plan and select 4 extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/after-hours.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 26: Front Office with 0 Add-Ons
	•	Product: AI Employee – Front Office
	•	Add-Ons Selected: None
	•	User Journey: Visitor clicks Get Started on the Front Office page and lands on /checkout/front-office.
	•	Selection Step: They confirm the Front Office plan and select no extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/front-office.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 27: Front Office with 1 Add-On
	•	Product: AI Employee – Front Office
	•	Add-Ons Selected: Email Authority
	•	User Journey: Visitor clicks Get Started on the Front Office page and lands on /checkout/front-office.
	•	Selection Step: They confirm the Front Office plan and select 1 extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/front-office.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 28: Front Office with 2 Add-Ons
	•	Product: AI Employee – Front Office
	•	Add-Ons Selected: Email Authority, Get Paid Now
	•	User Journey: Visitor clicks Get Started on the Front Office page and lands on /checkout/front-office.
	•	Selection Step: They confirm the Front Office plan and select 2 extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/front-office.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 29: Front Office with 3 Add-Ons
	•	Product: AI Employee – Front Office
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat
	•	User Journey: Visitor clicks Get Started on the Front Office page and lands on /checkout/front-office.
	•	Selection Step: They confirm the Front Office plan and select 3 extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/front-office.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 30: Front Office with 4 Add-Ons
	•	Product: AI Employee – Front Office
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat, Social Autopilot
	•	User Journey: Visitor clicks Get Started on the Front Office page and lands on /checkout/front-office.
	•	Selection Step: They confirm the Front Office plan and select 4 extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/front-office.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 31: Full AI Employee with 0 Add-Ons
	•	Product: AI Employee – Full AI Employee
	•	Add-Ons Selected: None
	•	User Journey: Visitor clicks Get Started on the Full AI Employee page and lands on /checkout/full-ai-employee.
	•	Selection Step: They confirm the Full AI Employee plan and select no extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/full-ai-employee.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 32: Full AI Employee with 1 Add-On
	•	Product: AI Employee – Full AI Employee
	•	Add-Ons Selected: Email Authority
	•	User Journey: Visitor clicks Get Started on the Full AI Employee page and lands on /checkout/full-ai-employee.
	•	Selection Step: They confirm the Full AI Employee plan and select 1 extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/full-ai-employee.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 33: Full AI Employee with 2 Add-Ons
	•	Product: AI Employee – Full AI Employee
	•	Add-Ons Selected: Email Authority, Get Paid Now
	•	User Journey: Visitor clicks Get Started on the Full AI Employee page and lands on /checkout/full-ai-employee.
	•	Selection Step: They confirm the Full AI Employee plan and select 2 extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/full-ai-employee.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 34: Full AI Employee with 3 Add-Ons
	•	Product: AI Employee – Full AI Employee
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat
	•	User Journey: Visitor clicks Get Started on the Full AI Employee page and lands on /checkout/full-ai-employee.
	•	Selection Step: They confirm the Full AI Employee plan and select 3 extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/full-ai-employee.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 35: Full AI Employee with 4 Add-Ons
	•	Product: AI Employee – Full AI Employee
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat, Social Autopilot
	•	User Journey: Visitor clicks Get Started on the Full AI Employee page and lands on /checkout/full-ai-employee.
	•	Selection Step: They confirm the Full AI Employee plan and select 4 extra add-ons such as additional phone lines, user seats, or AI modules.
	•	Form Step: Collect business hours, call screening preferences, and contact information. Validate entries and gather TCPA consent.
	•	Backend Process: start-checkout saves the data, tags the contact with the AI plan and selected add-ons, and provides a redirect URL to go.everintent.com/full-ai-employee.
	•	Payment & Provisioning: On GHL, the user pays monthly plus setup fee, voice minutes are allocated, and add-on services are activated via automation.
	•	Analytics & Attribution: Track plan page view, add-on selections, call minutes purchase (if any), checkout initiation, checkout completion, and link revenue to marketing campaigns.

Scenario 36: Launch Upgrade to After-Hours
	•	Product Combination: Existing Smart Website customer on Launch decides to add AI Employee plan After-Hours.
	•	User Journey: The user receives an upsell message in their dashboard or via email. They click the upsell CTA, which directs them to /checkout/after-hours with their info pre-populated.
	•	Selection Step: The plan is fixed to After-Hours; the user may add AI-specific add-ons like additional phone lines or AI Voice Chat.
	•	Form Step: The form requests business hours and call screening preferences (for After-Hours or Front Office) while confirming the existing contact data.
	•	Backend Process: start-checkout marks this as an upgrade, tags the GHL contact accordingly, and returns the AI checkout URL with appropriate parameters.
	•	Payment & Provisioning: The user pays the AI plan setup fee and monthly subscription; the AI modules are enabled within the existing sub-account without duplicating the website snapshot.
	•	Analytics & Attribution: Record the upsell source (dashboard message, email) and assign revenue credit to the original website acquisition channel and the upsell campaign.

Scenario 37: Launch Upgrade to Front Office
	•	Product Combination: Existing Smart Website customer on Launch decides to add AI Employee plan Front Office.
	•	User Journey: The user receives an upsell message in their dashboard or via email. They click the upsell CTA, which directs them to /checkout/front-office with their info pre-populated.
	•	Selection Step: The plan is fixed to Front Office; the user may add AI-specific add-ons like additional phone lines or AI Voice Chat.
	•	Form Step: The form requests business hours and call screening preferences (for After-Hours or Front Office) while confirming the existing contact data.
	•	Backend Process: start-checkout marks this as an upgrade, tags the GHL contact accordingly, and returns the AI checkout URL with appropriate parameters.
	•	Payment & Provisioning: The user pays the AI plan setup fee and monthly subscription; the AI modules are enabled within the existing sub-account without duplicating the website snapshot.
	•	Analytics & Attribution: Record the upsell source (dashboard message, email) and assign revenue credit to the original website acquisition channel and the upsell campaign.

Scenario 38: Launch Upgrade to Full AI Employee
	•	Product Combination: Existing Smart Website customer on Launch decides to add AI Employee plan Full AI Employee.
	•	User Journey: The user receives an upsell message in their dashboard or via email. They click the upsell CTA, which directs them to /checkout/full-ai-employee with their info pre-populated.
	•	Selection Step: The plan is fixed to Full AI Employee; the user may add AI-specific add-ons like additional phone lines or AI Voice Chat.
	•	Form Step: The form requests business hours and call screening preferences (for After-Hours or Front Office) while confirming the existing contact data.
	•	Backend Process: start-checkout marks this as an upgrade, tags the GHL contact accordingly, and returns the AI checkout URL with appropriate parameters.
	•	Payment & Provisioning: The user pays the AI plan setup fee and monthly subscription; the AI modules are enabled within the existing sub-account without duplicating the website snapshot.
	•	Analytics & Attribution: Record the upsell source (dashboard message, email) and assign revenue credit to the original website acquisition channel and the upsell campaign.

Scenario 39: Capture Upgrade to After-Hours
	•	Product Combination: Existing Smart Website customer on Capture decides to add AI Employee plan After-Hours.
	•	User Journey: The user receives an upsell message in their dashboard or via email. They click the upsell CTA, which directs them to /checkout/after-hours with their info pre-populated.
	•	Selection Step: The plan is fixed to After-Hours; the user may add AI-specific add-ons like additional phone lines or AI Voice Chat.
	•	Form Step: The form requests business hours and call screening preferences (for After-Hours or Front Office) while confirming the existing contact data.
	•	Backend Process: start-checkout marks this as an upgrade, tags the GHL contact accordingly, and returns the AI checkout URL with appropriate parameters.
	•	Payment & Provisioning: The user pays the AI plan setup fee and monthly subscription; the AI modules are enabled within the existing sub-account without duplicating the website snapshot.
	•	Analytics & Attribution: Record the upsell source (dashboard message, email) and assign revenue credit to the original website acquisition channel and the upsell campaign.

Scenario 40: Capture Upgrade to Front Office
	•	Product Combination: Existing Smart Website customer on Capture decides to add AI Employee plan Front Office.
	•	User Journey: The user receives an upsell message in their dashboard or via email. They click the upsell CTA, which directs them to /checkout/front-office with their info pre-populated.
	•	Selection Step: The plan is fixed to Front Office; the user may add AI-specific add-ons like additional phone lines or AI Voice Chat.
	•	Form Step: The form requests business hours and call screening preferences (for After-Hours or Front Office) while confirming the existing contact data.
	•	Backend Process: start-checkout marks this as an upgrade, tags the GHL contact accordingly, and returns the AI checkout URL with appropriate parameters.
	•	Payment & Provisioning: The user pays the AI plan setup fee and monthly subscription; the AI modules are enabled within the existing sub-account without duplicating the website snapshot.
	•	Analytics & Attribution: Record the upsell source (dashboard message, email) and assign revenue credit to the original website acquisition channel and the upsell campaign.

Scenario 41: Capture Upgrade to Full AI Employee
	•	Product Combination: Existing Smart Website customer on Capture decides to add AI Employee plan Full AI Employee.
	•	User Journey: The user receives an upsell message in their dashboard or via email. They click the upsell CTA, which directs them to /checkout/full-ai-employee with their info pre-populated.
	•	Selection Step: The plan is fixed to Full AI Employee; the user may add AI-specific add-ons like additional phone lines or AI Voice Chat.
	•	Form Step: The form requests business hours and call screening preferences (for After-Hours or Front Office) while confirming the existing contact data.
	•	Backend Process: start-checkout marks this as an upgrade, tags the GHL contact accordingly, and returns the AI checkout URL with appropriate parameters.
	•	Payment & Provisioning: The user pays the AI plan setup fee and monthly subscription; the AI modules are enabled within the existing sub-account without duplicating the website snapshot.
	•	Analytics & Attribution: Record the upsell source (dashboard message, email) and assign revenue credit to the original website acquisition channel and the upsell campaign.

Scenario 42: Convert Upgrade to After-Hours
	•	Product Combination: Existing Smart Website customer on Convert decides to add AI Employee plan After-Hours.
	•	User Journey: The user receives an upsell message in their dashboard or via email. They click the upsell CTA, which directs them to /checkout/after-hours with their info pre-populated.
	•	Selection Step: The plan is fixed to After-Hours; the user may add AI-specific add-ons like additional phone lines or AI Voice Chat.
	•	Form Step: The form requests business hours and call screening preferences (for After-Hours or Front Office) while confirming the existing contact data.
	•	Backend Process: start-checkout marks this as an upgrade, tags the GHL contact accordingly, and returns the AI checkout URL with appropriate parameters.
	•	Payment & Provisioning: The user pays the AI plan setup fee and monthly subscription; the AI modules are enabled within the existing sub-account without duplicating the website snapshot.
	•	Analytics & Attribution: Record the upsell source (dashboard message, email) and assign revenue credit to the original website acquisition channel and the upsell campaign.

Scenario 43: Convert Upgrade to Front Office
	•	Product Combination: Existing Smart Website customer on Convert decides to add AI Employee plan Front Office.
	•	User Journey: The user receives an upsell message in their dashboard or via email. They click the upsell CTA, which directs them to /checkout/front-office with their info pre-populated.
	•	Selection Step: The plan is fixed to Front Office; the user may add AI-specific add-ons like additional phone lines or AI Voice Chat.
	•	Form Step: The form requests business hours and call screening preferences (for After-Hours or Front Office) while confirming the existing contact data.
	•	Backend Process: start-checkout marks this as an upgrade, tags the GHL contact accordingly, and returns the AI checkout URL with appropriate parameters.
	•	Payment & Provisioning: The user pays the AI plan setup fee and monthly subscription; the AI modules are enabled within the existing sub-account without duplicating the website snapshot.
	•	Analytics & Attribution: Record the upsell source (dashboard message, email) and assign revenue credit to the original website acquisition channel and the upsell campaign.

Scenario 44: Convert Upgrade to Full AI Employee
	•	Product Combination: Existing Smart Website customer on Convert decides to add AI Employee plan Full AI Employee.
	•	User Journey: The user receives an upsell message in their dashboard or via email. They click the upsell CTA, which directs them to /checkout/full-ai-employee with their info pre-populated.
	•	Selection Step: The plan is fixed to Full AI Employee; the user may add AI-specific add-ons like additional phone lines or AI Voice Chat.
	•	Form Step: The form requests business hours and call screening preferences (for After-Hours or Front Office) while confirming the existing contact data.
	•	Backend Process: start-checkout marks this as an upgrade, tags the GHL contact accordingly, and returns the AI checkout URL with appropriate parameters.
	•	Payment & Provisioning: The user pays the AI plan setup fee and monthly subscription; the AI modules are enabled within the existing sub-account without duplicating the website snapshot.
	•	Analytics & Attribution: Record the upsell source (dashboard message, email) and assign revenue credit to the original website acquisition channel and the upsell campaign.

Scenario 45: Scale Upgrade to After-Hours
	•	Product Combination: Existing Smart Website customer on Scale decides to add AI Employee plan After-Hours.
	•	User Journey: The user receives an upsell message in their dashboard or via email. They click the upsell CTA, which directs them to /checkout/after-hours with their info pre-populated.
	•	Selection Step: The plan is fixed to After-Hours; the user may add AI-specific add-ons like additional phone lines or AI Voice Chat.
	•	Form Step: The form requests business hours and call screening preferences (for After-Hours or Front Office) while confirming the existing contact data.
	•	Backend Process: start-checkout marks this as an upgrade, tags the GHL contact accordingly, and returns the AI checkout URL with appropriate parameters.
	•	Payment & Provisioning: The user pays the AI plan setup fee and monthly subscription; the AI modules are enabled within the existing sub-account without duplicating the website snapshot.
	•	Analytics & Attribution: Record the upsell source (dashboard message, email) and assign revenue credit to the original website acquisition channel and the upsell campaign.

Scenario 46: Scale Upgrade to Front Office
	•	Product Combination: Existing Smart Website customer on Scale decides to add AI Employee plan Front Office.
	•	User Journey: The user receives an upsell message in their dashboard or via email. They click the upsell CTA, which directs them to /checkout/front-office with their info pre-populated.
	•	Selection Step: The plan is fixed to Front Office; the user may add AI-specific add-ons like additional phone lines or AI Voice Chat.
	•	Form Step: The form requests business hours and call screening preferences (for After-Hours or Front Office) while confirming the existing contact data.
	•	Backend Process: start-checkout marks this as an upgrade, tags the GHL contact accordingly, and returns the AI checkout URL with appropriate parameters.
	•	Payment & Provisioning: The user pays the AI plan setup fee and monthly subscription; the AI modules are enabled within the existing sub-account without duplicating the website snapshot.
	•	Analytics & Attribution: Record the upsell source (dashboard message, email) and assign revenue credit to the original website acquisition channel and the upsell campaign.

Scenario 47: Scale Upgrade to Full AI Employee
	•	Product Combination: Existing Smart Website customer on Scale decides to add AI Employee plan Full AI Employee.
	•	User Journey: The user receives an upsell message in their dashboard or via email. They click the upsell CTA, which directs them to /checkout/full-ai-employee with their info pre-populated.
	•	Selection Step: The plan is fixed to Full AI Employee; the user may add AI-specific add-ons like additional phone lines or AI Voice Chat.
	•	Form Step: The form requests business hours and call screening preferences (for After-Hours or Front Office) while confirming the existing contact data.
	•	Backend Process: start-checkout marks this as an upgrade, tags the GHL contact accordingly, and returns the AI checkout URL with appropriate parameters.
	•	Payment & Provisioning: The user pays the AI plan setup fee and monthly subscription; the AI modules are enabled within the existing sub-account without duplicating the website snapshot.
	•	Analytics & Attribution: Record the upsell source (dashboard message, email) and assign revenue credit to the original website acquisition channel and the upsell campaign.

Scenario 48: Existing Customer Purchases Email Authority
	•	Customer Profile: The customer already has a base plan (website or AI).
	•	Add-Ons Selected: Email Authority
	•	User Journey: The customer navigates to the Add-Ons hub, selects the desired pack(s), and clicks Add to Cart.
	•	Form Step: Since the system knows their identity, minimal info is required. The user confirms contact details and optionally provides additional configuration (e.g., domain name for Email Authority).
	•	Backend Process: start-checkout recognises an existing account, tags the add-ons to the user’s GHL contact, and returns a checkout URL for the add-ons product.
	•	Payment & Provisioning: Payment is completed on GHL; the add-ons are applied to the existing sub-account via automation.
	•	Analytics & Attribution: Track add-on page view, selection, attach rate, checkout initiation, completion, and credit revenue to both the original plan and the marketing campaign that promoted the add-on.

Scenario 49: Existing Customer Purchases Email Authority, Get Paid Now
	•	Customer Profile: The customer already has a base plan (website or AI).
	•	Add-Ons Selected: Email Authority, Get Paid Now
	•	User Journey: The customer navigates to the Add-Ons hub, selects the desired pack(s), and clicks Add to Cart.
	•	Form Step: Since the system knows their identity, minimal info is required. The user confirms contact details and optionally provides additional configuration (e.g., domain name for Email Authority).
	•	Backend Process: start-checkout recognises an existing account, tags the add-ons to the user’s GHL contact, and returns a checkout URL for the add-ons product.
	•	Payment & Provisioning: Payment is completed on GHL; the add-ons are applied to the existing sub-account via automation.
	•	Analytics & Attribution: Track add-on page view, selection, attach rate, checkout initiation, completion, and credit revenue to both the original plan and the marketing campaign that promoted the add-on.

Scenario 50: Existing Customer Purchases Email Authority, Get Paid Now, AI Voice Chat
	•	Customer Profile: The customer already has a base plan (website or AI).
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat
	•	User Journey: The customer navigates to the Add-Ons hub, selects the desired pack(s), and clicks Add to Cart.
	•	Form Step: Since the system knows their identity, minimal info is required. The user confirms contact details and optionally provides additional configuration (e.g., domain name for Email Authority).
	•	Backend Process: start-checkout recognises an existing account, tags the add-ons to the user’s GHL contact, and returns a checkout URL for the add-ons product.
	•	Payment & Provisioning: Payment is completed on GHL; the add-ons are applied to the existing sub-account via automation.
	•	Analytics & Attribution: Track add-on page view, selection, attach rate, checkout initiation, completion, and credit revenue to both the original plan and the marketing campaign that promoted the add-on.

Scenario 51: Existing Customer Purchases Email Authority, Get Paid Now, AI Voice Chat, Social Autopilot
	•	Customer Profile: The customer already has a base plan (website or AI).
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat, Social Autopilot
	•	User Journey: The customer navigates to the Add-Ons hub, selects the desired pack(s), and clicks Add to Cart.
	•	Form Step: Since the system knows their identity, minimal info is required. The user confirms contact details and optionally provides additional configuration (e.g., domain name for Email Authority).
	•	Backend Process: start-checkout recognises an existing account, tags the add-ons to the user’s GHL contact, and returns a checkout URL for the add-ons product.
	•	Payment & Provisioning: Payment is completed on GHL; the add-ons are applied to the existing sub-account via automation.
	•	Analytics & Attribution: Track add-on page view, selection, attach rate, checkout initiation, completion, and credit revenue to both the original plan and the marketing campaign that promoted the add-on.

Scenario 52: Existing Customer Purchases Email Authority, Get Paid Now, AI Voice Chat, Social Autopilot, Omnichannel Inbox
	•	Customer Profile: The customer already has a base plan (website or AI).
	•	Add-Ons Selected: Email Authority, Get Paid Now, AI Voice Chat, Social Autopilot, Omnichannel Inbox
	•	User Journey: The customer navigates to the Add-Ons hub, selects the desired pack(s), and clicks Add to Cart.
	•	Form Step: Since the system knows their identity, minimal info is required. The user confirms contact details and optionally provides additional configuration (e.g., domain name for Email Authority).
	•	Backend Process: start-checkout recognises an existing account, tags the add-ons to the user’s GHL contact, and returns a checkout URL for the add-ons product.
	•	Payment & Provisioning: Payment is completed on GHL; the add-ons are applied to the existing sub-account via automation.
	•	Analytics & Attribution: Track add-on page view, selection, attach rate, checkout initiation, completion, and credit revenue to both the original plan and the marketing campaign that promoted the add-on.

Alignment with Existing Implementation Tracker

This section maps the tasks in this document to the existing tracker entries. The tracker enforces naming conventions, phases, and statuses. Each task in the tracker should be cross-referenced with the sections in this guide to ensure there is no duplication or conflict. If a task already exists, update its description; if not, add a new entry with the corresponding details.
