import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const contentDir = path.join(process.cwd(), 'src/content');

// ── Generic JSON reader ──────────────────────────────────────────────────────

function readJson<T>(relativePath: string): T {
  const full = path.join(contentDir, relativePath);
  return JSON.parse(fs.readFileSync(full, 'utf8')) as T;
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface SiteData {
  brand: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapsEmbed: string;
  openHours: string;
  social: { instagram: string; facebook: string; youtube: string };
  footer: { about: string; legalLinks: Array<{ label: string; href: string }> };
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  ages: string;
  tagline: string;
  description: string;
  benefits: string[];
  process: string;
  image: string;
  color: string;
}

export interface Checkup {
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  duration: string;
  output: string;
  note: string;
  steps: Array<{ step: number; title: string; desc: string }>;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  order: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

export interface PageContent {
  meta: { title: string; description: string; keywords: string[] };
  hero: { eyebrow: string; title: string; body: string; image: string };
  symptoms: { title: string; items: string[] };
  approach: { title: string; body: string; trustNote: string };
  faq: Array<{ q: string; a: string }>;
  cta: { title: string; body: string; ctaLabel: string; ctaHref: string };
}

// ── Exported readers ─────────────────────────────────────────────────────────

export function getSiteData(): SiteData {
  return readJson<SiteData>('site.json');
}

export function getHomeData(): Record<string, unknown> {
  return readJson('home.json');
}

export function getProgramsData(): { programs: Program[]; checkup: Checkup } {
  return readJson('programs.json');
}

export function getTeamData(): { members: TeamMember[] } {
  return readJson('team.json');
}

export function getAssessmentData(): Record<string, unknown> {
  return readJson('assessment.json');
}

export function getPageData(slug: string): PageContent {
  return readJson<PageContent>(`pages/${slug}.json`);
}

// ── Blog ─────────────────────────────────────────────────────────────────────

export function getAllBlogPosts(): BlogPostMeta[] {
  const blogDir = path.join(contentDir, 'blog');
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));

  return files
    .map((filename): BlogPostMeta => {
      const slug = filename.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(blogDir, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        cover: (data.cover as string) || '/images/blog-placeholder.jpg',
        tags: (data.tags as string[]) || [],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRawBlogPost(slug: string): { meta: BlogPostMeta; rawContent: string } | null {
  const filePath = path.join(contentDir, 'blog', `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      cover: (data.cover as string) || '/images/blog-placeholder.jpg',
      tags: (data.tags as string[]) || [],
    },
    rawContent: content,
  };
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(contentDir, 'blog', `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    cover: (data.cover as string) || '/images/blog-placeholder.jpg',
    tags: (data.tags as string[]) || [],
    contentHtml,
  };
}
