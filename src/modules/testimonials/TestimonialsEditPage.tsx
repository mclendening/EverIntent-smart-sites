/**
 * @fileoverview Testimonials admin edit/create page.
 *
 * Renders a form for creating or editing a testimonial using the shared
 * `AdminDetailView` + `AdminFormEditor` patterns with Zod validation.
 *
 * ## Features
 * - Create mode (path: /admin/testimonials/new)
 * - Edit mode (path: /admin/testimonials/:id)
 * - Delete button (edit mode only) with confirmation
 * - Toast notifications for success/error
 * - 11 form fields covering all testimonials table columns
 *
 * ## Portability
 * - Depends on: `AdminDetailView`, `AdminFormEditor`, `testimonialHooks`, `testimonialInsertSchema`
 */

import { useParams, useNavigate } from 'react-router-dom';
import { AdminDetailView } from '../shared/AdminDetailView';
import { AdminFormEditor } from '../shared/AdminFormEditor';
import { testimonialHooks, testimonialInsertSchema, testimonialUpdateSchema } from './service';
import type { FieldDef } from '../shared/types';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/** Form field definitions for testimonials */
const testimonialFields: FieldDef[] = [
  { name: 'client_name', label: 'Client Name', type: 'text', required: true, placeholder: 'Jane Smith' },
  { name: 'quote', label: 'Testimonial Quote', type: 'textarea', required: true, maxLength: 1000, placeholder: '"They transformed our business..."' },
  { name: 'rating', label: 'Rating (1-5)', type: 'number', placeholder: '5', description: 'Star rating from 1 to 5' },
  { name: 'client_title', label: 'Client Title', type: 'text', placeholder: 'Owner' },
  { name: 'client_company', label: 'Company', type: 'text', placeholder: 'Acme Plumbing LLC' },
  { name: 'client_photo_url', label: 'Client Photo URL', type: 'image-url', placeholder: 'https://example.com/photo.jpg' },
  { name: 'industry', label: 'Industry', type: 'select', options: [
    { label: 'Home Services', value: 'home-services' },
    { label: 'Professional Services', value: 'professional-services' },
    { label: 'Health & Wellness', value: 'health-wellness' },
    { label: 'Automotive', value: 'automotive' },
    { label: 'Other', value: 'other' },
  ]},
  { name: 'service_type', label: 'Service Type', type: 'text', placeholder: 'Web Design' },
  { name: 'display_order', label: 'Display Order', type: 'number', description: 'Lower numbers appear first' },
  { name: 'is_published', label: 'Published', type: 'boolean', description: 'Visible on the public site' },
  { name: 'is_featured', label: 'Featured', type: 'boolean', description: 'Highlighted on the homepage' },
];

/**
 * Testimonials edit/create page — renders at /admin/testimonials/:id or /admin/testimonials/new.
 */
export default function TestimonialsEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = id === 'new';

  const { data: item, isLoading } = testimonialHooks.useGetById(isNew ? undefined : id);
  const createMutation = testimonialHooks.useCreate();
  const updateMutation = testimonialHooks.useUpdate();
  const removeMutation = testimonialHooks.useRemove();

  const handleSubmit = async (data: any) => {
    try {
      if (isNew) {
        await createMutation.mutateAsync(data);
        toast({ title: 'Testimonial created' });
      } else {
        await updateMutation.mutateAsync({ id: id!, data });
        toast({ title: 'Testimonial updated' });
      }
      navigate('/admin/testimonials');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!id || isNew) return;
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await removeMutation.mutateAsync(id);
      toast({ title: 'Testimonial deleted' });
      navigate('/admin/testimonials');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  return (
    <AdminDetailView
      title={isNew ? 'Create Testimonial' : 'Edit Testimonial'}
      subtitle={isNew ? 'Add a new customer testimonial' : `Editing: ${(item as any)?.client_name ?? '...'}`}
      backPath="/admin/testimonials"
      backLabel="Back to Testimonials"
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
        schema={isNew ? testimonialInsertSchema : testimonialUpdateSchema}
        defaultValues={
          isNew
            ? { client_name: '', quote: '', is_published: false, is_featured: false, display_order: 0 }
            : (item as any ?? {})
        }
        fields={testimonialFields}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/testimonials')}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        submitLabel={isNew ? 'Create' : 'Save Changes'}
      />
    </AdminDetailView>
  );
}
