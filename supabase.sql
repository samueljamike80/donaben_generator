create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null, kva text default '', price numeric default 0,
  image_url text default '', link_url text default '', specs text default '',
  sort int default 0, created_at timestamptz default now());
create table if not exists settings (key text primary key, value text default '');
alter table products enable row level security;
alter table settings enable row level security;
-- Admin login is a client-side password, so writes use the anon key.
create policy "public all products" on products for all using (true) with check (true);
create policy "public all settings" on settings for all using (true) with check (true);
insert into storage.buckets (id,name,public) values ('products','products',true) on conflict do nothing;
create policy "public read images" on storage.objects for select using (bucket_id='products');
create policy "public upload images" on storage.objects for insert with check (bucket_id='products');
create policy "public update images" on storage.objects for update using (bucket_id='products');
create policy "public delete images" on storage.objects for delete using (bucket_id='products');
