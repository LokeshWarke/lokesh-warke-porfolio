# LOKESH.SYS — Premium Full-Stack Portfolio

A premium, developer-focused portfolio built with Next.js, TypeScript and Tailwind CSS. It includes a post-deployment content control panel backed by Supabase.

## Features
- Cinematic full-stack developer homepage
- Project showcase + detailed dynamic project pages (OpsDesk appears first; Women Safety has been removed)
- Developer stack / skills section
- Interactive terminal
- Responsive dark UI
- `/admin` content control panel
- `/resume` recruiter-friendly resume generated dynamically from the latest saved portfolio content
- Resume PDF export through the browser print dialog (choose “Save as PDF”); no separately maintained resume file is needed
- Engineering notes, troubleshooting case-study prompts, deployment readiness guidance, and direct recruiter CTAs
- Update name, email, social links, tagline, philosophy, skills, projects and AWS re/Start learning details after deployment
- Change profile, training and project pictures at any time by updating their image URLs in `/admin`
- Supabase JSON storage so content changes do not require a new deployment

## 1. Requirements
- Node.js 18.17+ (20 LTS recommended)
- Git
- VS Code
- A Supabase project for post-deployment editing

## 2. Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## 3. Set up the editable admin system
Create a Supabase project and open its SQL Editor. Run:

```text
supabase-schema.sql
```

Then copy `.env.example` to `.env.local` and set:

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
ADMIN_PASSWORD=use-a-long-random-password
```

IMPORTANT: `SUPABASE_SERVICE_ROLE_KEY` is server-only. Never put it in a `NEXT_PUBLIC_*` variable and never expose it in client code.

## 4. Change your portfolio after deployment
Open:

```text
https://YOUR-DOMAIN.com/admin
```

Enter the `ADMIN_PASSWORD`. The editor lets you change the portfolio JSON and save it to Supabase.

After saving, open the public site and refresh. No Git push or Vercel redeploy is required for content changes.

### What can be changed
- Name
- Role
- Tagline
- Email
- GitHub URL
- LinkedIn URL
- Location
- Philosophy/about text
- Skill categories and technologies
- AWS re/Start title, current status, description and learning topics
- Profile photo (`profile.photoUrl`), AWS re/Start image (`learning.imageUrl`) and project pictures (`projects[n].imageUrl`)
- Projects, detailed problem/solution/features/architecture/deployment roadmap, image URLs, repository URLs, live demo URLs and status

## 5. Run a production build
```bash
npm run build
npm start
```

## 6. Deploy to Vercel
1. Create a GitHub repository.
2. Push this project.
3. Import the repository into Vercel.
4. Vercel detects Next.js automatically.
5. Add the three environment variables from `.env.local` in Vercel Project Settings → Environment Variables.
6. Deploy.
7. Visit `/admin` on your deployed domain.

When you change content later, use `/admin`; you do not need to redeploy.

## Resume that stays in sync

Open `/resume` and choose **Download / Save as PDF**, then select **Save as PDF** in the browser print dialog. The resume page reads the same current portfolio content as the homepage and admin editor. After you save edits in `/admin`, revisit `/resume` and export again to get the updated version. This avoids maintaining a separate, stale resume PDF in the repository. Keep project statuses and feature claims accurate; only add real repository/live links when they exist.

## Portfolio sections added

- Recruiter-friendly hero with project and resume calls to action
- OpsDesk first, followed by OpsPilot, DocuMind and DevTrack; Women Safety is not listed
- Detailed project case-study pages with problem, solution, features, architecture and deployment roadmap
- AWS re/Start current learning section, technology stack, learning journey and interactive terminal
- Engineering troubleshooting notes, explicitly framed as documentation prompts until verified implementation details are added
- Deployment-readiness principles that do not pretend projects are already live
- Contact links and a resume page generated from current saved content

## 7. Security
Use a long random `ADMIN_PASSWORD`. Do not commit `.env.local` or the Supabase service-role key. For a production-grade public CMS, the next upgrade should be Supabase Auth with an authenticated admin user instead of a single shared password.


## AWS re/Start section and changing pictures
The homepage includes a current-upskilling section for the Amazon AWS re/Start batch, with Linux, networking/troubleshooting, AWS fundamentals and cloud security topics. Update its wording and topics from `/admin` as the batch progresses.

To change pictures without redeploying, upload your picture to a public image host/storage you control and paste its direct image URL into the JSON fields `profile.photoUrl`, `learning.imageUrl`, or a project's `imageUrl`. Save changes and refresh the homepage. Use an empty string to hide a picture. Never paste private credentials or secret storage keys into portfolio content.


## Project links and future live deployment

OpsDesk is listed first and has a detailed project page covering its multi-tenant SaaS goal, JWT authentication, RBAC, ticket-management foundation, technology stack, and planned deployment approach. The Women Safety project has been removed from the portfolio.

Project detail data lives in `data/projects.ts`. When a project is ready to share, update its `repositoryUrl` and `liveUrl` fields with real public URLs. Until then, the page intentionally shows “coming soon” / “planned” labels rather than fake links. The deployment roadmap is informational; a live URL is not created automatically by this portfolio.

For future production hosting, a typical setup is a Next.js frontend on Vercel, a Spring Boot API on a suitable container/app host, and a managed PostgreSQL database. Configure HTTPS, environment variables, database migrations, backups, logs, and access controls before publishing OpsDesk publicly. Keep secrets out of the repository.
