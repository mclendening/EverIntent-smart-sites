/**
 * @fileoverview Generic admin form editor component.
 *
 * Renders a dynamic form from an array of `FieldDef` descriptors.
 * Integrates react-hook-form with Zod validation for type-safe,
 * schema-validated form submission.
 *
 * ## Features
 * - Declarative field rendering from `FieldDef[]` array
 * - Zod schema integration via `@hookform/resolvers/zod`
 * - Inline validation errors per field
 * - Field types: text, textarea (with char counter), number, boolean (Switch),
 *   select (dropdown), tags (comma-separated array), image-url (with preview)
 * - Save + Cancel buttons with loading state
 * - Controlled default values for edit mode
 *
 * ## Data Contract
 * - `schema`: Zod schema for the entire form (drives validation)
 * - `defaultValues`: Pre-populated values for edit mode (empty for create)
 * - `fields`: Array of `FieldDef` defining which controls to render
 * - `onSubmit`: Async callback receiving validated form data
 * - `onCancel`: Optional callback for the Cancel button
 * - `isSubmitting`: External loading state (e.g., from `useMutation.isPending`)
 * - `submitLabel`: Custom submit button text (default: "Save")
 *
 * ## Portability
 * - Depends on: react-hook-form, @hookform/resolvers/zod, zod,
 *   shadcn (Form, Input, Textarea, Switch, Select, Button, Label)
 * - Uses semantic design tokens from the project's Tailwind config
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { FieldDef } from './types';

/**
 * Props for `AdminFormEditor`.
 *
 * @template T - The Zod schema's inferred output type
 */
export interface AdminFormEditorProps<T extends z.ZodType> {
  /** Zod schema driving form validation */
  schema: T;
  /** Default form values (for edit mode; empty object for create mode) */
  defaultValues: Partial<z.infer<T>>;
  /** Array of field descriptors defining which form controls to render */
  fields: FieldDef[];
  /** Async callback receiving validated form data on submit */
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
  /** Optional callback for the Cancel button */
  onCancel?: () => void;
  /** Whether the form is currently submitting (disables submit button + shows spinner) */
  isSubmitting?: boolean;
  /** Custom submit button text (default: "Save") */
  submitLabel?: string;
}

/**
 * Generic admin form editor with Zod validation and dynamic field rendering.
 *
 * @template T - Zod schema type
 *
 * ## Usage
 * ```tsx
 * <AdminFormEditor
 *   schema={portfolioInsertSchema}
 *   defaultValues={{ title: '', slug: '', is_published: false }}
 *   fields={[
 *     { name: 'title', label: 'Title', type: 'text', required: true },
 *     { name: 'slug', label: 'URL Slug', type: 'text', required: true, placeholder: 'my-item' },
 *     { name: 'description', label: 'Description', type: 'textarea', maxLength: 2000 },
 *     { name: 'industry', label: 'Industry', type: 'select', options: [
 *       { label: 'Home Services', value: 'home-services' },
 *       { label: 'Automotive', value: 'automotive' },
 *     ]},
 *     { name: 'is_published', label: 'Published', type: 'boolean' },
 *     { name: 'services_provided', label: 'Services', type: 'tags', placeholder: 'web-design, seo' },
 *     { name: 'featured_image_url', label: 'Featured Image', type: 'image-url' },
 *   ]}
 *   onSubmit={handleSave}
 *   onCancel={() => navigate('/admin/portfolio')}
 *   isSubmitting={mutation.isPending}
 * />
 * ```
 */
export function AdminFormEditor<T extends z.ZodType>({
  schema,
  defaultValues,
  fields,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Save',
}: AdminFormEditorProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  /**
   * Renders a single form field based on its `FieldDef.type`.
   */
  function renderField(fieldDef: FieldDef) {
    return (
      <FormField
        key={fieldDef.name}
        control={form.control}
        name={fieldDef.name as any}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {fieldDef.label}
              {fieldDef.required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
            <FormControl>
              {renderControl(fieldDef, field)}
            </FormControl>
            {fieldDef.description && (
              <FormDescription>{fieldDef.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  /**
   * Renders the appropriate input control for a given field type.
   */
  function renderControl(fieldDef: FieldDef, field: any) {
    switch (fieldDef.type) {
      case 'text':
        return (
          <Input
            placeholder={fieldDef.placeholder}
            {...field}
            value={field.value ?? ''}
          />
        );

      case 'textarea':
        return (
          <div className="space-y-1">
            <Textarea
              placeholder={fieldDef.placeholder}
              {...field}
              value={field.value ?? ''}
              maxLength={fieldDef.maxLength}
              className="min-h-[100px]"
            />
            {fieldDef.maxLength && (
              <p className="text-xs text-muted-foreground text-right">
                {(field.value?.length ?? 0)}/{fieldDef.maxLength}
              </p>
            )}
          </div>
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={fieldDef.placeholder}
            {...field}
            value={field.value ?? ''}
            onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
          />
        );

      case 'boolean':
        return (
          <div className="flex items-center gap-2 pt-1">
            <Switch
              checked={!!field.value}
              onCheckedChange={field.onChange}
            />
            <Label className="text-sm text-muted-foreground">
              {field.value ? 'Yes' : 'No'}
            </Label>
          </div>
        );

      case 'select':
        return (
          <Select
            value={field.value ?? ''}
            onValueChange={field.onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder={fieldDef.placeholder ?? 'Select...'} />
            </SelectTrigger>
            <SelectContent>
              {fieldDef.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'tags':
        return (
          <Input
            placeholder={fieldDef.placeholder ?? 'tag1, tag2, tag3'}
            value={Array.isArray(field.value) ? field.value.join(', ') : (field.value ?? '')}
            onChange={(e) => {
              const tags = e.target.value
                .split(',')
                .map((t: string) => t.trim())
                .filter(Boolean);
              field.onChange(tags);
            }}
          />
        );

      case 'image-url':
        return (
          <div className="space-y-2">
            <Input
              type="url"
              placeholder={fieldDef.placeholder ?? 'https://example.com/image.jpg'}
              {...field}
              value={field.value ?? ''}
            />
            {field.value && (
              <div className="rounded-md border border-border overflow-hidden max-w-xs">
                <img
                  src={field.value}
                  alt="Preview"
                  className="w-full h-auto object-cover max-h-40"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        );

      default:
        return (
          <Input
            placeholder={fieldDef.placeholder}
            {...field}
            value={field.value ?? ''}
          />
        );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map(renderField)}

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : submitLabel}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
