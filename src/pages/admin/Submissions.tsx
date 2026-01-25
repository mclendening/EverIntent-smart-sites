/**
 * @fileoverview Admin Submissions Management Page
 * @module pages/admin/Submissions
 * @description CRUD interface for managing form submissions including
 * contact forms and DSAR data rights requests.
 */

import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  RefreshCw, 
  Eye, 
  Trash2, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

/**
 * Form submission record from Supabase.
 */
interface FormSubmission {
  id: string;
  form_type: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  tcpa_consent: boolean;
  source_page: string | null;
  ghl_sync_status: string | null;
  ghl_contact_id: string | null;
  ghl_error: string | null;
  created_at: string;
}

/**
 * Maps form_type to display label.
 */
const FORM_TYPE_LABELS: Record<string, string> = {
  contact: 'Contact Form',
  data_rights_request: 'DSAR Request',
};

/**
 * Admin Submissions page for viewing and managing all form submissions.
 * 
 * Features:
 * - Filter by form type
 * - View submission details
 * - GHL sync status indicator
 * - Delete submissions
 * - DSAR requests highlighted for compliance
 * 
 * @component
 */
export default function AdminSubmissions() {
  const { user } = useAdminAuth();
  const { toast } = useToast();
  
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  /**
   * Fetches submissions from the database with optional type filter.
   */
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (filterType !== 'all') {
        query = query.eq('form_type', filterType);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: 'Error loading submissions',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [filterType]);

  /**
   * Deletes a submission from the database.
   */
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    
    setDeleting(id);
    try {
      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSubmissions(prev => prev.filter(s => s.id !== id));
      toast({ title: 'Submission deleted' });
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: 'Error deleting submission',
        variant: 'destructive',
      });
    } finally {
      setDeleting(null);
    }
  };

  /**
   * Returns badge variant based on GHL sync status.
   */
  const getSyncStatusBadge = (status: string | null) => {
    switch (status) {
      case 'synced':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Synced</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  /**
   * Returns badge for form type with DSAR highlighted.
   */
  const getFormTypeBadge = (type: string) => {
    if (type === 'data_rights_request') {
      return <Badge variant="destructive" className="bg-orange-600"><AlertTriangle className="w-3 h-3 mr-1" />DSAR</Badge>;
    }
    return <Badge variant="outline">{FORM_TYPE_LABELS[type] || type}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-14 sm:h-16 items-center gap-4 px-4">
          <Link to="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-base sm:text-xl font-bold">Form Submissions</h1>
        </div>
      </header>

      <main className="container py-4 sm:py-8 px-4">
        {/* Page Instructions */}
        <Card className="mb-6 border-muted bg-muted/30">
          <CardContent className="py-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Form Submissions</strong> — This page displays all website form submissions stored locally. 
              All leads and contacts sync to GoHighLevel (GHL) where business operations occur. Use this page to verify sync status, 
              troubleshoot failed syncs, and handle compliance-related requests. Use the dropdown to filter by form type.
            </p>
            
            {/* Conditional context per form type */}
            {filterType === 'data_rights_request' && (
              <p className="text-sm text-orange-600 dark:text-orange-400 border-l-2 border-orange-500 pl-3 mt-2">
                <strong>DSAR Compliance:</strong> Data Subject Access Requests require action within regulatory timeframes (typically 30-45 days). 
                Review and process these promptly to maintain compliance.
              </p>
            )}
            {filterType === 'contact' && (
              <p className="text-sm text-green-600 dark:text-green-400 border-l-2 border-green-500 pl-3 mt-2">
                <strong>Contact Forms:</strong> General inquiries from the website contact form. 
                These sync to GHL as new contacts for follow-up.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Submissions</SelectItem>
              <SelectItem value="contact">Contact Forms</SelectItem>
              <SelectItem value="data_rights_request">DSAR Requests</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={fetchSubmissions} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">DSAR Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {submissions.filter(s => s.form_type === 'data_rights_request').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">GHL Synced</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {submissions.filter(s => s.ghl_sync_status === 'synced').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sync Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {submissions.filter(s => s.ghl_sync_status === 'failed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>GHL Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : submissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No submissions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    submissions.map((submission) => (
                      <TableRow 
                        key={submission.id}
                        className={submission.form_type === 'data_rights_request' ? 'bg-orange-50 dark:bg-orange-950/20' : ''}
                      >
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(submission.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>{getFormTypeBadge(submission.form_type)}</TableCell>
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{getSyncStatusBadge(submission.ghl_sync_status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDelete(submission.id)}
                              disabled={deleting === submission.id}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Submission Details</DialogTitle>
              <DialogDescription>
                {selectedSubmission && format(new Date(selectedSubmission.created_at), 'PPpp')}
              </DialogDescription>
            </DialogHeader>
            
            {selectedSubmission && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  {getFormTypeBadge(selectedSubmission.form_type)}
                  {getSyncStatusBadge(selectedSubmission.ghl_sync_status)}
                </div>

                <div className="grid gap-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-foreground">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-foreground">{selectedSubmission.email}</p>
                  </div>
                  {selectedSubmission.phone && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-foreground">{selectedSubmission.phone}</p>
                    </div>
                  )}
                  {selectedSubmission.company && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Company</label>
                      <p className="text-foreground">{selectedSubmission.company}</p>
                    </div>
                  )}
                  {selectedSubmission.message && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Message</label>
                      <p className="text-foreground whitespace-pre-wrap">{selectedSubmission.message}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">TCPA Consent</label>
                    <p className="text-foreground">{selectedSubmission.tcpa_consent ? 'Yes' : 'No'}</p>
                  </div>
                  {selectedSubmission.source_page && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Source Page</label>
                      <p className="text-foreground">{selectedSubmission.source_page}</p>
                    </div>
                  )}
                  {selectedSubmission.ghl_contact_id && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">GHL Contact ID</label>
                      <p className="text-foreground font-mono text-sm">{selectedSubmission.ghl_contact_id}</p>
                    </div>
                  )}
                  {selectedSubmission.ghl_error && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">GHL Error</label>
                      <p className="text-red-500 text-sm">{selectedSubmission.ghl_error}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
