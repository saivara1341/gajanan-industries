# Gajanan enquiry delivery

The website form sends production submissions to the project-scoped Supabase Edge Function:

`https://xoqpxckowwubeqdtazks.supabase.co/functions/v1/submit-enquiry`

That function saves each submission in `public.gajanan_enquiries` and emails the notification to `ssaivaraprasad51@gmail.com`.

## One-time deployment

After authenticating the Supabase CLI to the correct account, run:

```sh
npx supabase link --project-ref xoqpxckowwubeqdtazks
npx supabase db push
npx supabase secrets set RESEND_API_KEY=re_your_key MAIL_FROM='Gajanan Industries <enquiries@your-verified-domain.com>' ENQUIRY_RECIPIENT=ssaivaraprasad51@gmail.com
npx supabase functions deploy submit-enquiry --no-verify-jwt
```

`MAIL_FROM` must be a sender address verified in the Resend account. `RESEND_API_KEY` and the Supabase service-role key remain server-side; neither is included in the website.

## Data protection

The table migration enables Row Level Security and does not give website visitors read access. The Edge Function uses server-only credentials to create enquiry rows. Add bot protection (for example, Turnstile verification inside the Edge Function) before public launch to prevent spam.
