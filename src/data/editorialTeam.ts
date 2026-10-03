import { TeamMember } from '../types/calculator';

export const EDITORIAL_TEAM: TeamMember[] = [
  {
    id: 'maya-chen',
    name: 'Maya Chen',
    role: 'Personal Finance Editor',
    credentials: 'B.A. Economics; 8 years covering consumer money math, taxes, and salary benchmarking',
    bio: 'Maya edits every finance calculator on Everyday Calculator Hub. She verifies each formula against public tax tables and labor statistics, and writes the step-by-step examples so readers can reproduce every result by hand.'
  },
  {
    id: 'daniel-okoro',
    name: 'Daniel Okoro',
    role: 'Mathematics Editor',
    credentials: 'M.Sc. Applied Mathematics; former secondary-school maths teacher',
    bio: 'Daniel owns our math, statistics, date, and converter tools. He checks each derivation, edge case (leap years, rounding, sample vs population statistics), and unit factor against BIPM, NIST, and ISO references.'
  },
  {
    id: 'sofia-marchetti',
    name: 'Sofia Marchetti',
    role: 'Home & Wellness Reviewer',
    credentials: 'Certified kitchen & bath designer; marathon runner and run-club coach',
    bio: 'Sofia reviews construction estimators and pace/wellness tools for real-world plausibility, from paint coverage rates and concrete yields to pacing charts and hydration guidance.'
  }
];

export function getTeamMember(id: string | undefined, fallbackId: string): TeamMember {
  const found = EDITORIAL_TEAM.find(m => m.id === id);
  const fallback = EDITORIAL_TEAM.find(m => m.id === fallbackId) || EDITORIAL_TEAM[0];
  return found || fallback;
}

export const DEFAULT_AUTHOR_ID = 'daniel-okoro';
export const DEFAULT_REVIEWER_ID = 'maya-chen';
