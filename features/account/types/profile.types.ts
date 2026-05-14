export interface Profile {
  id: string;
  clerk_user_id: string;
  email: string;
  username: string | null
  avatar_url: string | null;
  company_name: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}