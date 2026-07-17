import { audienceJourneys } from "./audience-journeys";

export type ContentGovernanceRecord = {
  id: string;
  title: string;
  contentType: "buyer_journey" | "research" | "regional_journey";
  publicationStatus: "approved" | "evidence_required" | "qualified_review_required";
  publicPath: string | null;
  ownerName: string | null;
  expertReviewerName: string | null;
  methodology: string | null;
  sourceRegister: string | null;
  approvedAt: string | null;
  reviewBy: string | null;
  archiveDecision: "review_quarterly" | "withhold_until_approved";
  missingEvidence: string[];
};

const audienceRecords: ContentGovernanceRecord[] = audienceJourneys.map((journey) => ({
  id: `audience-${journey.slug}`,
  title: journey.title,
  contentType: "buyer_journey",
  publicationStatus: "approved",
  publicPath: `/who-we-serve/${journey.slug}`,
  ownerName: "Bhaskar Anand",
  expertReviewerName: "Bhaskar Anand",
  methodology: "Constitution-defined audience questions using only approved positioning, offer boundaries, evidence gates and non-guaranteed outcomes.",
  sourceRegister: "Talpro Website Constitution v2.1 sections 2-8 and P3",
  approvedAt: "2026-07-16T00:00:00.000Z",
  reviewBy: "2026-10-16T00:00:00.000Z",
  archiveDecision: "review_quarterly",
  missingEvidence: [],
}));

export const contentGovernanceRegistry: ContentGovernanceRecord[] = [
  ...audienceRecords,
  {
    id: "gcc-workforce-intelligence-2026",
    title: "GCC workforce intelligence",
    contentType: "research",
    publicationStatus: "evidence_required",
    publicPath: null,
    ownerName: null,
    expertReviewerName: null,
    methodology: null,
    sourceRegister: null,
    approvedAt: null,
    reviewBy: null,
    archiveDecision: "withhold_until_approved",
    missingEvidence: ["approved dataset", "documented method", "named author", "expert review", "claim approval"],
  },
  {
    id: "india-technology-talent-intelligence-2026",
    title: "India technology talent intelligence",
    contentType: "research",
    publicationStatus: "evidence_required",
    publicPath: null,
    ownerName: null,
    expertReviewerName: null,
    methodology: null,
    sourceRegister: null,
    approvedAt: null,
    reviewBy: null,
    archiveDecision: "withhold_until_approved",
    missingEvidence: ["approved dataset", "documented method", "named author", "expert review", "claim approval"],
  },
  {
    id: "salary-research-2026",
    title: "India salary research",
    contentType: "research",
    publicationStatus: "evidence_required",
    publicPath: null,
    ownerName: null,
    expertReviewerName: null,
    methodology: null,
    sourceRegister: null,
    approvedAt: null,
    reviewBy: null,
    archiveDecision: "withhold_until_approved",
    missingEvidence: ["current source population", "role/location sample method", "currency and period", "expert review", "claim approval"],
  },
  {
    id: "regional-delivery-journeys",
    title: "Global and regional delivery journeys",
    contentType: "regional_journey",
    publicationStatus: "qualified_review_required",
    publicPath: null,
    ownerName: null,
    expertReviewerName: null,
    methodology: null,
    sourceRegister: null,
    approvedAt: null,
    reviewBy: null,
    archiveDecision: "withhold_until_approved",
    missingEvidence: ["real regional capability", "local proof", "regional owner", "routing and time-zone model", "privacy review"],
  },
];

export function isPublishableContent(record: ContentGovernanceRecord, now = new Date()): boolean {
  return record.publicationStatus === "approved"
    && Boolean(record.publicPath)
    && Boolean(record.ownerName)
    && Boolean(record.expertReviewerName)
    && Boolean(record.methodology)
    && Boolean(record.sourceRegister)
    && Boolean(record.approvedAt)
    && Boolean(record.reviewBy)
    && new Date(record.reviewBy!).getTime() > now.getTime()
    && record.missingEvidence.length === 0;
}
