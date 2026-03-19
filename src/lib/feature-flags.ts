/**
 * Feature flags to hide/show sections without deleting code.
 * Set to true to show, false to hide from view.
 */
export const FEATURE_FLAGS = {
  /** When false, /talents route returns 404 and nav links to /talents are hidden. */
  showTalentsPage: true,
  /** When false, the "Meet The Collective" block (TalentCarousel) is hidden on the homepage. */
  showHomepageCollectiveBlock: true,
  /** When false, freelancer avatar and username are hidden on the service detail page (/services/[id]). */
  showFreelancerOnServiceDetail: true,
  /** When false, freelancer avatar and username are hidden on service cards (/services). */
  showFreelancerOnServiceCard: true,
} as const;
