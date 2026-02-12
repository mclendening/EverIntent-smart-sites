/**
 * @fileoverview Portfolio admin edit/create page.
 *
 * Renders a form for creating or editing a portfolio item using the shared
 * `AdminDetailView` + `AdminFormEditor` patterns with Zod validation.
 *
 * ## Features
 * - Create mode (path: /admin/portfolio/new)
 * - Edit mode (path: /admin/portfolio/:id)
 * - Delete button (edit mode only) with confirmation
 * - Toast notifications for success/error
 * - 13 form fields covering all portfolio table columns
 *
 * ## Data Flow
 * 1. `useParams().id` determines create vs edit mode
 * 2. Edit mode: `portfolioHooks.useGetById(id)` fetches existing data
 * 3. Form submit: `useCreate()` or `useUpdate()` mutation
 * 4. Success: navigate back to /admin/portfolio
 *
 * ## Portability
 * - Depends on: `AdminDetailView`, `AdminFormEditor`, `portfolioHooks`, `portfolioInsertSchema`
 */

import { useParams, useNavigate } from 'react-router-dom';
import { AdminDetailView } from '../shared/AdminDetailView';
import { AdminFormEditor } from '../shared/AdminFormEditor';
import { portfolioHooks, portfolioInsertSchema, portfolioUpdateSchema } from './service';
import type { FieldDef } from '../shared/types';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/** Form field definitions for portfolio items */
const portfolioFields: FieldDef[] = [
  { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Project title' },
  { name: 'slug', label: 'URL Slug', type: 'text', required: true, placeholder: 'my-project', description: 'Lowercase letters, numbers, and hyphens only' },
  { name: 'client_name', label: 'Client Name', type: 'text', placeholder: 'Acme Corp' },
  { name: 'industry', label: 'Industry', type: 'select', options: [
    { label: 'Home Services', value: 'home-services' },
    { label: 'Professional Services', value: 'professional-services' },
    { label: 'Health & Wellness', value: 'health-wellness' },
    { label: 'Automotive', value: 'automotive' },
    { label: 'Other', value: 'other' },
  ]},
  { name: 'description', label: 'Description', type: 'textarea', maxLength: 2000, placeholder: 'Describe the project...' },
  { name: 'services_provided', label: 'Services Provided', type: 'tags', placeholder: 'web-design, seo, lead-capture', description: 'Comma-separated list' },
  { name: 'featured_image_url', label: 'Featured Image URL', type: 'image-url', placeholder: 'https://example.com/image.jpg' },
  { name: 'website_url', label: 'Website URL', type: 'text', placeholder: 'https://client-site.com' },
  { name: 'results_summary', label: 'Results Summary', type: 'textarea', maxLength: 1000, placeholder: 'Key metrics and outcomes...' },
  { name: 'testimonial_quote', label: 'Client Quote', type: 'textarea', maxLength: 500, placeholder: '"They transformed our online presence..."' },
  { name: 'display_order', label: 'Display Order', type: 'number', description: 'Lower numbers appear first' },
  { name: 'is_published', label: 'Published', type: 'boolean', description: 'Visible on the public portfolio page' },
  { name: 'is_featured', label: 'Featured', type: 'boolean', description: 'Highlighted on the homepage' },
];

/**
 * Portfolio edit/create page — renders at /admin/portfolio/:id or /admin/portfolio/new.
 */
export default function PortfolioEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = id === 'new';

  const { data: item, isLoading } = portfolioHooks.useGetById(isNew ? undefined : id);
  const createMutation = portfolioHooks.useCreate();
  const updateMutation = portfolioHooks.useUpdate();
  const removeMutation = portfolioHooks.useRemove();

  const handleSubmit = async (data: any) => {
    try {
      if (isNew) {
        await createMutation.mutateAsync(data);
        toast({ title: 'Portfolio item created' });
      } else {
        await updateMutation.mutateAsync({ id: id!, data });
        toast({ title: 'Portfolio item updated' });
      }
      navigate('/admin/portfolio');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!id || isNew) return;
    if (!window.confirm('Are you sure you want to delete this portfolio item?')) return;
    try {
      await removeMutation.mutateAsync(id);
      toast({ title: 'Portfolio item deleted' });
      navigate('/admin/portfolio');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  return (
    <AdminDetailView
      title={isNew ? 'Create Portfolio Item' : 'Edit Portfolio Item'}
      subtitle={isNew ? 'Add a new project to your portfolio' : `Editing: ${(item as any)?.title ?? '...'}`}
      backPath="/admin/portfolio"
      backLabel="Back to Portfolio"
      isLoading={!isNew && isLoading}
      actions={
        !isNew ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={removeMutation.isPending}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        ) : undefined
      }
    >
      <AdminFormEditor
        schema={isNew ? portfolioInsertSchema : portfolioUpdateSchema}
        defaultValues={
          isNew
            ? { title: '', slug: '', is_published: false, is_featured: false, display_order: 0 }
            : (item as any ?? {})
        }
        fields={portfolioFields}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/portfolio')}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        submitLabel={isNew ? 'Create' : 'Save Changes'}
      />
    </AdminDetailView>
  );
}
