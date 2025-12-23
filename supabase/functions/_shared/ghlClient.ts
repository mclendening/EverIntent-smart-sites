/**
 * @fileoverview Shared GHL v2 API Client Library
 * @module supabase/functions/_shared/ghlClient
 * @description Centralized GoHighLevel API client for contact management,
 * tagging, notes, and file uploads. All form submissions sync through this client.
 */

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = '2021-07-28';

/**
 * Centralized GHL tag constants.
 * All tags used across the application are defined here for consistency.
 * Tags follow naming convention: "{Category}: {Action/Status}"
 * 
 * @constant
 */
export const GHL_TAGS = {
  /** Checkout flow tags - one per tier */
  CHECKOUT_T1: 'SS: Checkout Started - T1',
  CHECKOUT_T2: 'SS: Checkout Started - T2',
  CHECKOUT_T3: 'SS: Checkout Started - T3',
  CHECKOUT_T4: 'SS: Checkout Started - T4',
  /** LocalPros partner application */
  LOCALPROS_APPLY: 'LP: Partner Apply',
  /** Careers job application */
  CAREERS_APPLICATION: 'Careers: Application',
  /** General contact form submission */
  CONTACT_FORM: 'SS: Contact Form',
  /** CCPA/DSAR data rights request - requires 45-day response */
  DATA_RIGHTS_REQUEST: 'DSAR: Data Rights Request',
} as const;

// Helper to get GHL headers
export function ghlHeaders(): Record<string, string> {
  const token = Deno.env.get('GHL_API_TOKEN');
  if (!token) {
    throw new Error('GHL_API_TOKEN not configured');
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Version': GHL_API_VERSION,
    'Content-Type': 'application/json',
  };
}

// Get location ID from env
export function getLocationId(): string {
  const locationId = Deno.env.get('GHL_LOCATION_ID');
  if (!locationId) {
    throw new Error('GHL_LOCATION_ID not configured');
  }
  return locationId;
}

// Contact payload interface
export interface ContactPayload {
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  companyName?: string;
  customFields?: Array<{ id: string; value: string }>;
  tags?: string[];
}

/**
 * Upserts (creates or updates) a contact in GoHighLevel.
 * 
 * Searches for an existing contact by email. If found, updates the contact
 * with the provided fields. If not found, creates a new contact.
 * 
 * @param payload - Contact data to create or update
 * @returns Object containing the contact ID and whether it was newly created
 * @throws Error if GHL API calls fail
 * 
 * @example
 * const { id, isNew } = await upsertContact({
 *   email: 'user@example.com',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   phone: '+1234567890'
 * });
 */
export async function upsertContact(payload: ContactPayload): Promise<{ id: string; isNew: boolean }> {
  const locationId = getLocationId();
  
  // First, try to find existing contact by email
  const searchUrl = `${GHL_BASE_URL}/contacts/search/duplicate?locationId=${locationId}&email=${encodeURIComponent(payload.email)}`;
  
  console.log(`[GHL] Searching for existing contact: ${payload.email}`);
  
  const searchResponse = await fetch(searchUrl, {
    method: 'GET',
    headers: ghlHeaders(),
  });

  if (!searchResponse.ok) {
    const errorText = await searchResponse.text();
    console.error(`[GHL] Search failed: ${searchResponse.status} - ${errorText}`);
    throw new Error(`GHL contact search failed: ${searchResponse.status}`);
  }

  const searchResult = await searchResponse.json();
  
  // If contact exists, update it
  if (searchResult.contact?.id) {
    const contactId = searchResult.contact.id;
    console.log(`[GHL] Found existing contact: ${contactId}, updating...`);
    
    const updateUrl = `${GHL_BASE_URL}/contacts/${contactId}`;
    
    // Build update payload with only valid GHL fields
    const updatePayload: Record<string, unknown> = {};
    if (payload.firstName) updatePayload.firstName = payload.firstName;
    if (payload.lastName) updatePayload.lastName = payload.lastName;
    if (payload.name) updatePayload.name = payload.name;
    if (payload.phone) updatePayload.phone = payload.phone;
    if (payload.companyName) updatePayload.companyName = payload.companyName;
    if (payload.customFields?.length) updatePayload.customFields = payload.customFields;
    // Don't include email in update - it's the lookup key
    
    console.log(`[GHL] Update payload:`, JSON.stringify(updatePayload));
    
    const updateResponse = await fetch(updateUrl, {
      method: 'PUT',
      headers: ghlHeaders(),
      body: JSON.stringify(updatePayload),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error(`[GHL] Update failed: ${updateResponse.status} - ${errorText}`);
      throw new Error(`GHL contact update failed: ${updateResponse.status} - ${errorText}`);
    }

    console.log(`[GHL] Contact updated successfully: ${contactId}`);
    return { id: contactId, isNew: false };
  }

  // Create new contact
  console.log(`[GHL] Creating new contact: ${payload.email}`);
  
  const createUrl = `${GHL_BASE_URL}/contacts/`;
  const createPayload = {
    ...payload,
    locationId,
  };

  const createResponse = await fetch(createUrl, {
    method: 'POST',
    headers: ghlHeaders(),
    body: JSON.stringify(createPayload),
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    console.error(`[GHL] Create failed: ${createResponse.status} - ${errorText}`);
    throw new Error(`GHL contact creation failed: ${createResponse.status}`);
  }

  const createResult = await createResponse.json();
  console.log(`[GHL] Contact created successfully: ${createResult.contact?.id}`);
  
  return { id: createResult.contact?.id, isNew: true };
}

// Add tags to a contact
export async function addTags(contactId: string, tags: string[]): Promise<void> {
  if (!tags.length) return;
  
  const url = `${GHL_BASE_URL}/contacts/${contactId}/tags`;
  
  console.log(`[GHL] Adding tags to contact ${contactId}:`, tags);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: ghlHeaders(),
    body: JSON.stringify({ tags }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[GHL] Add tags failed: ${response.status} - ${errorText}`);
    throw new Error(`GHL add tags failed: ${response.status}`);
  }

  console.log(`[GHL] Tags added successfully`);
}

// Add a note to a contact
export async function addNote(contactId: string, body: string): Promise<void> {
  const url = `${GHL_BASE_URL}/contacts/${contactId}/notes`;
  
  console.log(`[GHL] Adding note to contact ${contactId}`);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: ghlHeaders(),
    body: JSON.stringify({ body }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[GHL] Add note failed: ${response.status} - ${errorText}`);
    throw new Error(`GHL add note failed: ${response.status}`);
  }

  console.log(`[GHL] Note added successfully`);
}

// Upload file to custom field
// CRITICAL: GHL v2 requires specific field naming convention: ${FIELD_ID}_file
export async function uploadFileToCustomField(
  contactId: string,
  fieldId: string,
  fileBuffer: ArrayBuffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  const locationId = getLocationId();
  const url = `${GHL_BASE_URL}/forms/upload-custom-files`;
  
  console.log(`[GHL] Uploading file for contact ${contactId}, field ${fieldId}`);
  
  const formData = new FormData();
  formData.append('contactId', contactId);
  formData.append('locationId', locationId);
  
  // CRITICAL: Field name must be ${fieldId}_file for GHL v2
  const blob = new Blob([fileBuffer], { type: mimeType });
  formData.append(`${fieldId}_file`, blob, fileName);

  // CRITICAL: Do NOT set Content-Type header - let FormData set boundary
  const headers = ghlHeaders();
  delete headers['Content-Type'];

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[GHL] File upload failed: ${response.status} - ${errorText}`);
    throw new Error(`GHL file upload failed: ${response.status}`);
  }

  const result = await response.json();
  console.log(`[GHL] File uploaded successfully`);
  
  // Extract file URL from response
  return extractFileInfoFromUpload(result, fieldId);
}

// Extract file URL from upload response
function extractFileInfoFromUpload(result: Record<string, unknown>, fieldId: string): string {
  // GHL returns file info in the custom field value
  const customField = result[fieldId] || result[`${fieldId}_file`];
  if (typeof customField === 'string') {
    return customField;
  }
  if (customField && typeof customField === 'object' && 'url' in customField) {
    return (customField as { url: string }).url;
  }
  console.warn('[GHL] Could not extract file URL from response:', result);
  return '';
}

// Get all custom fields for a location (for admin tool)
export async function getCustomFields(): Promise<Array<{
  id: string;
  name: string;
  fieldType: string;
  dataType: string;
}>> {
  const locationId = getLocationId();
  const url = `${GHL_BASE_URL}/locations/${locationId}/customFields`;
  
  console.log(`[GHL] Fetching custom fields for location ${locationId}`);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: ghlHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[GHL] Get custom fields failed: ${response.status} - ${errorText}`);
    throw new Error(`GHL get custom fields failed: ${response.status}`);
  }

  const result = await response.json();
  console.log(`[GHL] Custom fields fetched successfully`);
  
  return result.customFields || [];
}
