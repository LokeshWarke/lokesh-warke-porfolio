import { profile as fallbackProfile, skills as fallbackSkills, learning as fallbackLearning } from '@/data/profile';
import { projects as fallbackProjects } from '@/data/projects';

export type PortfolioContent = {
  profile: typeof fallbackProfile;
  skills: typeof fallbackSkills;
  learning: typeof fallbackLearning;
  projects: typeof fallbackProjects;
};

export const fallbackContent: PortfolioContent = {
  profile: fallbackProfile,
  skills: fallbackSkills,
  learning: fallbackLearning,
  projects: fallbackProjects,
};

async function supabaseRequest(path: string, options: RequestInit = {}) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(options.headers || {}) },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Supabase request failed: ${response.status}`);
  return response.status === 204 ? null : response.json();
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    const rows = await supabaseRequest('portfolio_content?id=eq.1&select=content') as Array<{content: Partial<PortfolioContent>}> | null;
    const saved = rows?.[0]?.content;
    if (!saved) return fallbackContent;
    return {
      profile: { ...fallbackProfile, ...(saved.profile || {}) },
      skills: { ...fallbackSkills, ...(saved.skills || {}) },
      learning: { ...fallbackLearning, ...(saved.learning || {}) },
      projects: fallbackProjects.map((base:any) => ({ ...base, ...(Array.isArray(saved.projects) ? (saved.projects.find((project:any) => project.slug === base.slug) || {}) : {}) })) as typeof fallbackProjects,
    };
  } catch { return fallbackContent; }
}

export async function savePortfolioContent(content: PortfolioContent) {
  return supabaseRequest('portfolio_content?id=eq.1', {
    method: 'PATCH', headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ content, updated_at: new Date().toISOString() }),
  });
}
