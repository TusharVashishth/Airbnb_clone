-- Insert user trigger 

create function public.add_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id ,metadata, email)
  values (new.id ,new.raw_user_meta_data , new.email);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.add_new_user();




-- Create a trigger function for updates
create function public.update_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.users
  set
    metadata = new.raw_user_meta_data,
    email = new.email
  where
    id = new.id;
  return new;
end;
$$;

-- Create a trigger that fires the update_user function
create trigger on_auth_user_updated
  after update on auth.users
  for each row
  execute procedure public.update_user();
