export const blockedPublicClaimPatterns = [
  { claimId: 'shortlist-sla', pattern: /\b(?:36|48)[\s\-\u2010-\u2015]hours?\b/i },
  { claimId: 'placements-count', pattern: /\b500\+\s+placements\b/i },
  { claimId: 'client-retention', pattern: /\b90%\+\s+client retention\b/i },
  { claimId: 'years-in-business', pattern: /\b15\+\s+years\b/i },
  { claimId: 'zero-upfront', pattern: /₹0\s+upfront/i },
  { claimId: 'replacement-guarantee', pattern: /\b90[\-\u2010-\u2015]day replacement guarantee\b/i },
  { claimId: 'unapproved-ranking', pattern: /\btop 1%(?!\w)/i },
] as const;

export function findBlockedPublicClaimIds(text: string): string[] {
  return blockedPublicClaimPatterns
    .filter(({ pattern }) => pattern.test(text))
    .map(({ claimId }) => claimId);
}
