/**
 * @fileoverview Shared type definitions for the admin UI pattern components.
 *
 * Defines the contracts used by `AdminListView`, `AdminDetailView`, and
 * `AdminFormEditor` to render dynamic, module-agnostic admin interfaces.
 *
 * ## Data Contracts
 *
 * ### `FieldDef`
 * Declarative field descriptor consumed by `AdminFormEditor` to render form controls.
 * Each field maps to a single form input with label, validation, and help text.
 *
 * Supported field types:
 * - `text` — Single-line text input (`<Input />`)
 * - `textarea` — Multi-line text input (`<Textarea />`) with optional character counter
 * - `number` — Numeric input (`<Input type="number" />`)
 * - `boolean` — Toggle switch (`<Switch />`) for on/off fields
 * - `select` — Dropdown select (`<Select />`) with predefined options
 * - `tags` — Comma-separated string array input (renders as `<Input />`, parsed to `string[]`)
 * - `image-url` — URL input with image preview (`<Input />` + `<img />` preview)
 *
 * ### `ColumnDef<T>`
 * Declarative column descriptor consumed by `AdminListView` to render table columns.
 * Each column maps a row field to a table header + cell renderer.
 *
 * ## Portability
 * - Zero dependencies on project-specific code
 * - Copy this file + the three admin UI components into any shadcn + React project
 */

import type { ReactNode } from 'react';

/**
 * A declarative field descriptor for `AdminFormEditor`.
 *
 * Drives automatic form rendering — each `FieldDef` produces one labeled
 * form control with validation, placeholder, and optional help text.
 */
export interface FieldDef {
  /** Form field name (must match the Zod schema property key) */
  name: string;
  /** Human-readable label displayed above the input */
  label: string;
  /**
   * Input control type:
   * - `text`: single-line `<Input />`
   * - `textarea`: multi-line `<Textarea />`
   * - `number`: numeric `<Input type="number" />`
   * - `boolean`: `<Switch />` toggle
   * - `select`: `<Select />` dropdown (requires `options`)
   * - `tags`: comma-separated array input
   * - `image-url`: URL input with image preview
   */
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'tags' | 'image-url';
  /** Predefined options for `select` type fields */
  options?: { label: string; value: string }[];
  /** Placeholder text for text/textarea/number/tags/image-url inputs */
  placeholder?: string;
  /** Whether the field is required (visual indicator only — actual validation is via Zod) */
  required?: boolean;
  /** Help text displayed below the input */
  description?: string;
  /** Maximum character count for textarea fields (enables character counter) */
  maxLength?: number;
}

/**
 * A declarative column descriptor for `AdminListView`.
 *
 * Maps a row property to a table column with header label
 * and optional custom cell renderer.
 *
 * @template T - The row data type
 */
export interface ColumnDef<T> {
  /** Column header label */
  header: string;
  /**
   * Row property key to display.
   * If `render` is provided, `accessor` is used as the column key only.
   */
  accessor: keyof T & string;
  /**
   * Optional custom cell renderer.
   * When provided, overrides the default string display for this column.
   *
   * @param value - The cell value from `row[accessor]`
   * @param row - The full row object for cross-field rendering
   */
  render?: (value: T[keyof T], row: T) => ReactNode;
  /** Optional CSS class applied to the `<td>` element */
  className?: string;
}
