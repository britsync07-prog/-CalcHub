import { TeamMember } from '../types/calculator';

/**
 * One real person maintains this project. Earlier drafts of this file listed
 * invented subject-matter experts; publishing fake credentials is worse than
 * publishing none, so the byline now points at the developer who actually
 * writes and verifies every formula.
 */
export const EDITORIAL_TEAM: TeamMember[] = [
  {
    id: 'musfiqur-rahman-saimon',
    name: 'Musfiqur Rahman Saimon',
    role: 'Founder & Developer',
    credentials: 'Full-stack developer; builds, tests, and maintains every calculator and guide on this site',
    bio: 'Musfiqur designs the calculators, checks each formula against primary sources (NIST, BIPM, IRS publications, and official statistics), and writes the worked examples so anyone can reproduce a result by hand.'
  }
];

export function getTeamMember(id: string | undefined, fallbackId: string): TeamMember {
  const found = EDITORIAL_TEAM.find(m => m.id === id);
  const fallback = EDITORIAL_TEAM.find(m => m.id === fallbackId) || EDITORIAL_TEAM[0];
  return found || fallback;
}

export const DEFAULT_AUTHOR_ID = 'musfiqur-rahman-saimon';
export const DEFAULT_REVIEWER_ID = 'musfiqur-rahman-saimon';
