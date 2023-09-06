export default class Env {
  static S3_BUCKET: string = process.env.NEXT_PUBLIC_S3_BUCKET!;
  static SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  static SUPABASE_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
}
