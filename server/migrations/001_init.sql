-- Supabase / Postgres initial schema for Travelgenie
-- Run this in the Supabase SQL editor or via psql

create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  phone text,
  name text,
  created_at timestamptz default now()
);

create table if not exists preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  preferred_airlines jsonb,
  seat_preference text,
  preferred_currency text,
  created_at timestamptz default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  provider text,
  provider_booking_id text,
  flight_option jsonb,
  price numeric,
  currency text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists flights_cache (
  id uuid primary key default gen_random_uuid(),
  search_hash text unique,
  results jsonb,
  provider text,
  expires_at timestamptz
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  channel text,
  payload jsonb,
  status text default 'queued',
  created_at timestamptz default now()
);
