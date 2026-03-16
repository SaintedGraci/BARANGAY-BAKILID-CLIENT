-- =====================================================
-- Add Onboarding Tracking Fields
-- =====================================================
-- Run this in Supabase SQL Editor after the main schema
-- =====================================================

-- Add onboarding tracking columns to residents table
alter table public.residents 
add column if not exists email_verified boolean default false,
add column if not exists phone_verified boolean default false,
add column if not exists profile_completed boolean default false,
add column if not exists documents_uploaded boolean default false,
add column if not exists onboarding_completed_at timestamp with time zone;

-- Update is_verified to be computed from all verification steps
-- You can manually set is_verified to true after admin reviews documents

-- Add comment for clarity
comment on column public.residents.email_verified is 'Email verification completed during onboarding';
comment on column public.residents.phone_verified is 'Phone OTP verification completed during onboarding';
comment on column public.residents.profile_completed is 'Profile details filled during onboarding';
comment on column public.residents.documents_uploaded is 'ID documents uploaded during onboarding';
comment on column public.residents.onboarding_completed_at is 'Timestamp when resident completed onboarding';
