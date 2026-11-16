-- Run once in the Supabase SQL editor BEFORE deploying the site version that saves disclosure_text,
-- or every signup will fail until you do.
-- Stores the "who's asking + contact" line shown next to the checkbox, so the record matches what each person saw.

alter table public.waitlist add column if not exists disclosure_text text;
