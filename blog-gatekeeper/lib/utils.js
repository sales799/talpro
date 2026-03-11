import crypto from 'node:crypto';

export function stripHtml(input = '') {
  const noTags = (input || '').replace(/<[^>]*>/g, ' ');
  return noTags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function slugify(title = '') {
  return (title || '')
    .toLowerCase()
    .replace(/['"`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

export function normalizeUrl(u = '') {
  try {
    const url = new URL(u.trim());
    url.hash = '';
    const params = url.searchParams;
    const bad = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'fbclid', 'gclid', 'igshid'];
    bad.forEach(k => params.delete(k));
    
    const pairs = [...params.entries()].sort(([a], [b]) => a.localeCompare(b));
    const sp = new URLSearchParams(pairs);
    const cleaned = `${url.protocol}//${url.host}${url.pathname.replace(/\/+$/, '')}${sp.toString() ? '?' + sp.toString() : ''}`;
    return cleaned.toLowerCase();
  } catch {
    return (u || '').trim().toLowerCase();
  }
}

export function sha256Hex(s) {
  return crypto.createHash('sha256').update(s, 'utf8').digest('hex');
}

export function hmac256Hex(secret, payload) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

export function computeUniqueKey(payload = {}) {
  const { source_url, canonical_url, link, source, guid, title = '', body = '' } = payload;
  const url = source_url || canonical_url || link;
  
  if (url) return 'url::' + sha256Hex(normalizeUrl(url));
  if (source && guid) return 'sg::' + sha256Hex(`${String(source).toLowerCase()}::${String(guid)}`);
  if (guid) return 'guid::' + sha256Hex(String(guid));
  
  const compact = stripHtml(String(title) + ' ' + String(body)).slice(0, 2048);
  return 'fp::' + sha256Hex(compact);
}
