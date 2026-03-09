/**
 * Maps legacy full names to usernames so the frontend always shows usernames.
 * Used for display only; avatars and lookups are unchanged.
 */
const FULL_NAME_TO_USERNAME: Record<string, string> = {
    'Arthur Sterling': 'arthur.brand',
    'Elena Richter': 'elena.saasux',
    'Julien Dubois': 'julien.motion',
    'Lars Jensen': 'lars.render',
    'Sophie Caldwell': 'sophie.pitch',
    'Giulia Rossi': 'giulia.mobile',
    'Marcus Thorne': 'marcus.webflow',
    'Stefan Kovac': 'stefan.next',
    'Erik Saar': 'erik.web3',
    'Bram Van Dijk': 'bram.shopify',
    'Thomas Müller': 'thomas.python',
    'Andreas Weber': 'andreas.cyber',
    "Claire O'Connor": 'claire.seoaudit',
    'Hugo Martins': 'hugo.ppc',
    'Lucia Fernandez': 'lucia.social',
    'Nigel Rivers': 'nigel.crm',
    'James Kensington': 'james.cfo',
    'Antoine Lefevre': 'antoine.legal',
    'Petra Novak': 'petra.product',
    'Kasia Wójcik': 'kasia.dataviz',
    'Eleanor Brooks': 'eleanor.uxwrite',
    'Leo Davies': 'leo.reels',
    'Christian Wessner': 'christian.docs',
    'Sarah Jenkins': 'sarah.copy',
};

/**
 * Returns the username to show for a freelancer. If the value is a legacy full name,
 * returns the mapped username; otherwise returns the value (already a username).
 */
export function getDisplayUsername(name: string | null | undefined): string {
    if (name == null || name === '') return 'Unknown';
    const normalized = name.replace(/\u2019/g, "'"); // Unicode apostrophe → straight
    return FULL_NAME_TO_USERNAME[normalized] ?? name;
}
