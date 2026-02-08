EverIntent Checkout Design Specification – Version 5.2 (Feb 2026)

Purpose and Scope

This document presents a comprehensive, end‑to‑end design for the EverIntent checkout experience.  It consolidates all previous specifications, trackers, and feedback into a single, coherent narrative.  It describes how customers journey from the marketing site (everintent.com) through a multi‑step checkout process, how data flows through the systems, how GoHighLevel (GHL) integrates with the front‑end, and how edge cases and abandoned carts are handled.  It goes far beyond task lists and aims to answer the why, what and how of the checkout design.

Why a Full Redesign?

Over several iterations we created multiple design documents, task trackers and ad‑hoc notes.  However, this piecemeal approach left gaps and inconsistencies that made implementation confusing.  Lovable’s feedback highlighted that the last document felt like a loose collection of tasks rather than a design.  At the same time, the Smart Websites v2.2 tracker defined stringent guardrails (no redirects, dark/purple/yellow styling, product separation, SSG constraints).  To move forward confidently, we need a single specification that:
	1.	Documents the current state of plans, products, pages, tags, Supabase tables and GHL configurations.
	2.	Describes the desired future state with clear user flows, wireframes and data diagrams.
	3.	Explains every system interaction—how the main site communicates with GHL via the start‑checkout function, how tagging drives automation, and how abandoned carts are recovered.
	4.	Enumerates every possible buying scenario across eight plans and six add‑ons, including combinations, plan changes mid‑flow, and abandon‑and‑return cases.
	5.	Assigns responsibilities between the front‑end (React/Next or SSG site) and back‑end (serverless functions, GHL API calls, Supabase logging).
	6.	Uses versioning and a changelog so that updates can be tracked.  This file is version 5.2 and supersedes v5.1 and earlier.  Future updates (v5.3, v5.4, etc.) must append to the changelog at the end of the file.

Structure of this Document

The specification is divided into major sections:
	1.	Current State – Summarises existing products, tags, pipelines, pages and functions.
	2.	Design Principles – Outlines the guiding principles and guardrails for the checkout experience.
	3.	System Architecture – Describes the high‑level architecture connecting the marketing site, Supabase, GHL and the user’s browser, with diagrams.
	4.	User Journey – Details the three‑step checkout flow (Plan & Add‑Ons → Contact Details → Review & Confirm) and the user interface for each step.
	5.	Comprehensive Scenario Catalogue – Provides exhaustive narratives and diagrams for every buying scenario, including all combinations of plans and add‑ons, changes mid‑flow, abandoned carts, and repeat visits.  Each scenario includes tables summarising behaviour and outcomes.
	6.	Data Flow Specification – Explains how data moves from the front‑end to Supabase and GHL, what fields are collected, how tags are applied, how notes are recorded and how the redirect URL is constructed.
	7.	Tagging & Workflow Design – Defines the complete tag schema and outlines the GHL workflows that move opportunities through the pipeline based on tags and events.
	8.	Edge Cases & Error Handling – Discusses scenarios such as missing fields, invalid inputs, mismatched totals, network failures, and how to recover gracefully.
	9.	Analytics & Attribution – Describes the instrumentation needed to track conversions, attach rates, UTM propagation and marketing campaign performance.
	10.	Roles & Responsibilities – Assigns tasks to the front‑end builder and the back‑end integration, clarifying who builds what.
	11.	Changelog – Enumerates changes from previous versions.

Throughout the specification you will find diagrams drawn in ASCII to clarify the sequence of events and data flow.  For example:
