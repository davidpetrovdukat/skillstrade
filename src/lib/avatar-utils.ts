/**
 * Builds the canonical avatar map keyed by BOTH current username AND legacy full name.
 *
 * This means the lookup works regardless of whether the MongoDB document still has
 * the old full name (e.g. "Arthur Sterling") or the new username ("arthur.brand").
 * Without this double-keying, prod DB docs with un-migrated names fall through to
 * their stale avatarUrl field which may have a wrong extension (e.g. .webp → 404).
 */
import { RAW_SERVICES_DATA } from '@/lib/services-data';
import { FULL_NAME_TO_USERNAME } from '@/lib/freelancer-usernames';

// Invert FULL_NAME_TO_USERNAME → username: fullName
const USERNAME_TO_FULL_NAME: Record<string, string> = Object.fromEntries(
    Object.entries(FULL_NAME_TO_USERNAME).map(([fullName, username]) => [username, fullName])
);

export function buildCanonicalAvatarMap(): Map<string, string> {
    const map = new Map<string, string>();
    for (const item of RAW_SERVICES_DATA) {
        const username = item.meta.name;
        const url = item.meta.avatar_url;
        map.set(username, url);
        // Also set the legacy full name so unmigrated DB docs still resolve correctly
        const fullName = USERNAME_TO_FULL_NAME[username];
        if (fullName) map.set(fullName, url);
    }
    return map;
}
