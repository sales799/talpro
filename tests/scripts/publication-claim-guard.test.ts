import { describe, expect, it } from 'vitest';
import { findBlockedPublicClaimIds } from '../../scripts/lib/publication-claim-guard';

describe('rendered publication claim guard', () => {
  it.each([
    ['Shortlists in 48 hours', 'shortlist-sla'],
    ['A 36-hour shortlist promise', 'shortlist-sla'],
    ['500+ placements', 'placements-count'],
    ['90%+ client retention', 'client-retention'],
    ['15+ years', 'years-in-business'],
    ['₹0 upfront', 'zero-upfront'],
    ['90-day replacement guarantee', 'replacement-guarantee'],
    ['Top 1% engineering talent', 'unapproved-ranking'],
  ])('blocks %s', (wording, claimId) => {
    expect(findBlockedPublicClaimIds(wording)).toContain(claimId);
  });

  it('allows mandate-specific language that makes no universal claim', () => {
    expect(findBlockedPublicClaimIds(
      'Service levels, timelines, and replacement conditions are agreed in the signed mandate.',
    )).toEqual([]);
  });
});

