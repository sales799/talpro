const DEFAULT_STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'from', 'has', 'have', 'had',
  'he', 'her', 'his', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'of', 'on', 'or', 'our', 'ours',
  'she', 'so', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this',
  'to', 'too', 'us', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'who', 'will', 'with',
  'within', 'without', 'you', 'your', 'yours'
]);

function fnv1a32(str, seed = 0) {
  let h = (0x811c9dc5 ^ seed) >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b) >>> 0;
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35) >>> 0;
  h ^= h >>> 16;
  return h >>> 0;
}

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t && t.length > 1 && !DEFAULT_STOPWORDS.has(t));
}

function shingles(tokens, S) {
  if (tokens.length < S) return [];
  const result = [];
  for (let i = 0; i <= tokens.length - S; i++) {
    result.push(tokens.slice(i, i + S).join(' '));
  }
  return result;
}

function seeds(K, baseSeed) {
  const arr = new Array(K);
  let s = (baseSeed >>> 0) || 1337;
  for (let i = 0; i < K; i++) {
    s = (s + 0x9e3779b1) >>> 0;
    arr[i] = s;
  }
  return arr;
}

export function createMinHasher({ K = 64, S = 3, seed = 1337 } = {}) {
  const seedArr = seeds(K, seed);

  function signature(text) {
    const toks = tokenize(text);
    const sh = shingles(toks, S);
    const sig = new Array(K).fill(0xffffffff);
    if (sh.length === 0) return { sig, size: 0 };

    for (const shingle of sh) {
      for (let j = 0; j < K; j++) {
        const h = fnv1a32(shingle, seedArr[j]);
        if (h < sig[j]) sig[j] = h;
      }
    }
    return { sig, size: sh.length };
  }

  function similarity(sigA, sigB) {
    const a = sigA || [];
    const b = sigB || [];
    const n = Math.min(a.length, b.length);
    if (!n) return 0;
    let same = 0;
    for (let i = 0; i < n; i++) if (a[i] === b[i]) same++;
    return same / n;
  }

  return { signature, similarity };
}
