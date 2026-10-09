# Updating the portfolio after deployment

1. Open `https://YOUR-DOMAIN.com/admin`.
2. Enter the value configured as `ADMIN_PASSWORD` in Vercel.
3. Edit the JSON in the editor.
4. Click **Save changes**.
5. Refresh the public portfolio.

The saved content lives in Supabase. You do not need to push code or redeploy for normal content edits.

## Editable content
- `profile.name`
- `profile.role`
- `profile.tagline`
- `profile.email`
- `profile.github`
- `profile.linkedin`
- `profile.location`
- `profile.philosophy`
- `skills` categories and arrays
- `projects` array, including slug/name/type/description/overview/problem/solution/features/architecture/deploymentPlan/stack/status/imageUrl/repositoryUrl/liveUrl

## Important
Keep `SUPABASE_SERVICE_ROLE_KEY` server-side. Never use it as a `NEXT_PUBLIC_` variable.
Use a strong random admin password.


## AWS re/Start and images
The editable `learning` object controls the Amazon AWS re/Start section: `title`, `status`, `description`, `topics`, and `imageUrl`. Update these as your training progresses.

To change images, paste a direct publicly accessible image URL into `profile.photoUrl` for your profile photo, `learning.imageUrl` for the training section, or `projects[n].imageUrl` for a project preview. Save and refresh. Empty string (`""`) hides the image. Image URL changes are saved with the rest of your content and do not require redeployment.


## Project showcase and future deployment
OpsDesk is the first project in the showcase. Women Safety has been removed. Each project detail page supports a problem statement, solution, feature list, architecture summary, deployment roadmap, and optional repository/live-demo links. Keep `repositoryUrl` and `liveUrl` empty until real public URLs exist; the UI will show a planned/coming-soon state. When a project is actually deployed, add its real URLs through the project data and admin editor.

## Resume download and automatic content sync
The `/resume` page reads the same portfolio content returned by `getPortfolioContent()`. After saving edits in `/admin`, open `/resume` again and use **Download / Save as PDF**; choose **Save as PDF** in the browser print dialog. The generated resume then reflects the latest saved profile, skills, projects and AWS re/Start details. No separate resume file needs to be updated.

The resume export uses the browser print dialog rather than a stored PDF, so it stays current with the latest content. Review the exported PDF before sending it to employers.
