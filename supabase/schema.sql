-- Supabase database schema for art.biz-flow.cloud

create table if not exists creations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('wallpaper', 'theme')),
  title text,
  image_url text,
  metadata jsonb,
  is_public boolean not null default true,
  created_at timestamp with time zone default timezone('utc', now())
);

create index if not exists creations_user_id_idx on creations(user_id);
create index if not exists creations_created_at_idx on creations(created_at desc);
create index if not exists creations_is_public_idx on creations(is_public);
