-- =====================================================
-- ADD VERIFICATION SYSTEM FOR RESIDENT APPROVAL
-- =====================================================

-- Add verification status and document tracking
alter table public.residents 
add column if not exists verification_status text default 'pending' check (verification_status in ('pending', 'approved', 'rejected')),
add column if not exists verification_notes text,
add column if not exists verified_by uuid references public.admin_users(id),
add column if not exists verified_at timestamp with time zone,
add column if not exists rejection_reason text,
add column if not exists proof_of_residency_url text,
add column if not exists government_id_url text,
add column if not exists supporting_doc_url text;

-- Add comments
comment on column public.residents.verification_status is 'Admin approval status: pending, approved, rejected';
comment on column public.residents.proof_of_residency_url is 'Barangay Certificate, Cedula, or Voters ID';
comment on column public.residents.government_id_url is 'Government-issued ID with photo';
comment on column public.residents.supporting_doc_url is 'Utility bill or lease contract';

-- Create index for faster queries
create index if not exists residents_verification_status_idx on public.residents(verification_status);

-- Verify changes
select 
  column_name, 
  data_type, 
  column_default
from information_schema.columns
where table_name = 'residents' 
  and column_name in ('verification_status', 'proof_of_residency_url', 'government_id_url');
