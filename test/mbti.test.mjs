/**
 * Tests for the personality questionnaire: scoring correctness and determinism,
 * and the integrity of the translated content.
 *
 * Run with: npm run test:mbti
 * (The TypeScript sources are compiled to a temp folder first — see the script.)
 */
import assert from 'node:assert/strict';

const { MBTI_ITEMS, RESPONSE_LABELS } = await import('../.test-build/mbti/items.js');
const { scoreAnswers, ALL_TYPES, DIMENSIONS, POINTS_PER_DIMENSION, clarityOf } = await import(
  '../.test-build/mbti/scoring.js'
);
const { POLE_INFO, DIMENSION_LABELS } = await import('../.test-build/mbti/dimensions.js');
const { PROFILES_EN } = await import('../.test-build/mbti/profiles/en.js');
const { PROFILES_FR } = await import('../.test-build/mbti/profiles/fr.js');
const { PROFILES_AR } = await import('../.test-build/mbti/profiles/ar.js');
const { UI, OFFICIAL_SOURCES, RESEARCH_SOURCES } = await import('../.test-build/mbti/ui.js');

const LANGS = ['en', 'fr', 'ar'];
let pass = 0;
let fail = 0;

function check(name, fn) {
  try {
    fn();
    pass++;
    console.log(`  PASS  ${name}`);
  } catch (err) {
    fail++;
    console.log(`  FAIL  ${name}`);
    console.log(`        ${err.message.split('\n')[0]}`);
  }
}

// ──────────────────────────────────────────────
console.log('\nQuestionnaire structure:');

check('20 items, 5 per dimension', () => {
  assert.equal(MBTI_ITEMS.length, 20);
  for (const { poles } of DIMENSIONS) {
    const count = MBTI_ITEMS.filter((i) => poles.includes(i.keyed)).length;
    assert.equal(count, 5, `${poles.join('/')} has ${count} items`);
  }
});

check('every item id is unique', () => {
  const ids = MBTI_ITEMS.map((i) => i.id);
  assert.equal(new Set(ids).size, ids.length);
});

check('every item is translated into all three languages, with no duplicates', () => {
  for (const item of MBTI_ITEMS) {
    for (const lang of LANGS) {
      const text = item.text[lang];
      assert.ok(text && text.trim().length > 15, `${item.id}/${lang} missing or too short`);
    }
    // A missing translation most often shows up as the English text copied over.
    assert.notEqual(item.text.fr, item.text.en, `${item.id} fr equals en`);
    assert.notEqual(item.text.ar, item.text.en, `${item.id} ar equals en`);
  }
});

check('Arabic item text actually contains Arabic script', () => {
  const arabic = /[؀-ۿ]/;
  for (const item of MBTI_ITEMS) assert.ok(arabic.test(item.text.ar), `${item.id} not Arabic`);
});

check('four response labels per language', () => {
  for (const lang of LANGS) {
    assert.equal(RESPONSE_LABELS[lang].length, 4, lang);
    assert.equal(new Set(RESPONSE_LABELS[lang]).size, 4, `${lang} has duplicate labels`);
  }
});

// ──────────────────────────────────────────────
console.log('\nScoring — correctness:');

const answerAll = (value) => Object.fromEntries(MBTI_ITEMS.map((i) => [i.id, value]));

function randomAnswers(seed) {
  // Deterministic pseudo-random answers so a failure can be reproduced.
  let x = seed;
  const next = () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x % 4;
  };
  return Object.fromEntries(MBTI_ITEMS.map((i) => [i.id, next()]));
}


check('agreeing strongly with every statement gives ESTJ at 100%', () => {
  // Every statement is keyed E / S / T / J.
  const r = scoreAnswers(MBTI_ITEMS, answerAll(0));
  assert.equal(r.type, 'ESTJ');
  for (const d of r.dimensions) {
    assert.equal(d.winnerPercent, 100, d.id);
    assert.equal(d.loserPercent, 0, d.id);
  }
});

check('disagreeing strongly with every statement gives INFP at 100%', () => {
  const r = scoreAnswers(MBTI_ITEMS, answerAll(3));
  assert.equal(r.type, 'INFP');
  for (const d of r.dimensions) assert.equal(d.winnerPercent, 100, d.id);
});

check('mild answers move the needle less than strong ones', () => {
  const mild = scoreAnswers(MBTI_ITEMS, answerAll(1));
  const strong = scoreAnswers(MBTI_ITEMS, answerAll(0));
  assert.equal(mild.type, strong.type, 'same direction');
  for (const d of strong.dimensions) assert.equal(d.winnerPercent, 100);
  // 2-1 splits land at 10 of 15 points -> 67%, clearly weaker than 100%.
  for (const d of mild.dimensions) {
    assert.equal(d.winnerPoints, 10, d.id);
    assert.equal(d.winnerPercent, 67, d.id);
    assert.equal(d.clarity, 'moderate', d.id);
  }
});

check('the two percentages of a pair always total 100', () => {
  for (let trial = 0; trial < 200; trial++) {
    const answers = Object.fromEntries(MBTI_ITEMS.map((i) => [i.id, trial % 4]));
    const r = scoreAnswers(MBTI_ITEMS, answers);
    for (const d of r.dimensions) assert.equal(d.winnerPercent + d.loserPercent, 100, d.id);
  }
});

check('each dimension always distributes exactly 15 points', () => {
  // Fixed-split scoring means the denominator never drifts with answer strength.
  for (const p of [0, 1, 2, 3]) {
    const r = scoreAnswers(MBTI_ITEMS, answerAll(p));
    for (const d of r.dimensions) {
      assert.equal(d.winnerPoints + d.loserPoints, POINTS_PER_DIMENSION, `${d.id} pattern ${p}`);
    }
  }
  for (let seed = 1; seed <= 300; seed++) {
    const r = scoreAnswers(MBTI_ITEMS, randomAnswers(seed));
    for (const d of r.dimensions) {
      assert.equal(d.winnerPoints + d.loserPoints, POINTS_PER_DIMENSION, `${d.id} seed ${seed}`);
    }
  }
});

check('a fully answered dimension can never tie (15 is odd)', () => {
  for (let seed = 1; seed <= 1000; seed++) {
    const r = scoreAnswers(MBTI_ITEMS, randomAnswers(seed));
    for (const d of r.dimensions) {
      assert.ok(!d.tied, `${d.id} tied on seed ${seed}`);
      assert.ok(d.winnerPercent > 50, `${d.id} = ${d.winnerPercent}% on seed ${seed}`);
    }
  }
});

check('an exact 50/50 split (only possible when items are skipped) is flagged and broken to I/N/F/P', () => {
  // With a complete questionnaire a tie cannot occur, so build one by leaving
  // the fifth statement of each dimension unanswered: 2 strong agree vs 2 strong
  // disagree = 6 points each.
  const answers = {};
  for (const { poles } of DIMENSIONS) {
    const items = MBTI_ITEMS.filter((i) => poles.includes(i.keyed));
    answers[items[0].id] = 0;
    answers[items[1].id] = 0;
    answers[items[2].id] = 3;
    answers[items[3].id] = 3;
    // items[4] deliberately left unanswered
  }
  const tie = scoreAnswers(MBTI_ITEMS, answers);
  assert.equal(tie.type, 'INFP', `tie-break produced ${tie.type}`);
  for (const d of tie.dimensions) {
    assert.ok(d.tied, `${d.id} should be tied`);
    assert.equal(d.winnerPercent, 50, d.id);
    assert.equal(d.loserPercent, 50, d.id);
  }
});

check('an entirely unanswered questionnaire degrades safely to 50/50', () => {
  const r = scoreAnswers(MBTI_ITEMS, {});
  assert.equal(r.type, 'INFP');
  for (const d of r.dimensions) {
    assert.equal(d.winnerPercent, 50);
    assert.ok(Number.isFinite(d.winnerPercent), 'no NaN');
  }
});

check('clarity bands map to the documented thresholds', () => {
  assert.equal(clarityOf(50), 'slight');
  assert.equal(clarityOf(59), 'slight');
  assert.equal(clarityOf(60), 'moderate');
  assert.equal(clarityOf(74), 'moderate');
  assert.equal(clarityOf(75), 'clear');
  assert.equal(clarityOf(89), 'clear');
  assert.equal(clarityOf(90), 'veryClear');
  assert.equal(clarityOf(100), 'veryClear');
});

// ──────────────────────────────────────────────
console.log('\nScoring — determinism and language independence:');

check('the same answers always produce the same result (1000 trials)', () => {
  for (let seed = 1; seed <= 1000; seed++) {
    const answers = randomAnswers(seed);
    const a = scoreAnswers(MBTI_ITEMS, answers);
    const b = scoreAnswers(MBTI_ITEMS, answers);
    assert.deepEqual(a, b, `seed ${seed} not deterministic`);
  }
});

check('scoring never depends on item order (shuffled input)', () => {
  for (let seed = 1; seed <= 200; seed++) {
    const answers = randomAnswers(seed);
    const straight = scoreAnswers(MBTI_ITEMS, answers);
    const shuffled = scoreAnswers([...MBTI_ITEMS].reverse(), answers);
    assert.equal(straight.type, shuffled.type, `seed ${seed}`);
    assert.deepEqual(straight.percentages, shuffled.percentages, `seed ${seed}`);
  }
});

check('scoring has no language input at all (identical across locales)', () => {
  // The scorer only ever sees ids and keyed poles — proven by scoring with the
  // item text replaced by each language's text and comparing results.
  for (let seed = 1; seed <= 100; seed++) {
    const answers = randomAnswers(seed);
    const results = LANGS.map((lang) =>
      scoreAnswers(
        MBTI_ITEMS.map((i) => ({ ...i, text: i.text[lang] })),
        answers
      )
    );
    assert.deepEqual(results[0], results[1], `seed ${seed} en vs fr`);
    assert.deepEqual(results[0], results[2], `seed ${seed} en vs ar`);
  }
});

check('percentages are never random — repeated runs over all patterns match', () => {
  const snapshot = [];
  for (let seed = 1; seed <= 50; seed++) snapshot.push(scoreAnswers(MBTI_ITEMS, randomAnswers(seed)).percentages);
  for (let seed = 1; seed <= 50; seed++) {
    assert.deepEqual(scoreAnswers(MBTI_ITEMS, randomAnswers(seed)).percentages, snapshot[seed - 1]);
  }
});

check('every one of the 16 types is reachable from real answers', () => {
  // Construct answers that force each type, proving no type is unreachable.
  const seen = new Set();
  for (const type of ALL_TYPES) {
    const answers = {};
    for (const item of MBTI_ITEMS) {
      // Agree strongly if the keyed pole is in the target type, else disagree strongly.
      answers[item.id] = type.includes(item.keyed) ? 0 : 3;
    }
    const r = scoreAnswers(MBTI_ITEMS, answers);
    assert.equal(r.type, type, `wanted ${type}, got ${r.type}`);
    seen.add(r.type);
  }
  assert.equal(seen.size, 16);
});

// ──────────────────────────────────────────────
console.log('\nContent — all 16 types, in all three languages:');

const PROFILE_SETS = { en: PROFILES_EN, fr: PROFILES_FR, ar: PROFILES_AR };
const TEXT_FIELDS = ['nickname', 'tagline', 'overview', 'communication', 'decisions', 'social', 'work'];
const LIST_FIELDS = { strengths: 4, weaknesses: 4, growth: 3 };

check('each language has a complete profile for all 16 types', () => {
  for (const lang of LANGS) {
    const profiles = PROFILE_SETS[lang];
    assert.equal(Object.keys(profiles).length, 16, `${lang} has ${Object.keys(profiles).length}`);
    for (const type of ALL_TYPES) {
      const p = profiles[type];
      assert.ok(p, `${lang} missing ${type}`);
      for (const field of TEXT_FIELDS) {
        assert.ok(p[field] && p[field].trim().length > 10, `${lang}/${type}/${field} too short`);
      }
      for (const [field, count] of Object.entries(LIST_FIELDS)) {
        assert.equal(p[field].length, count, `${lang}/${type}/${field}`);
        for (const entry of p[field]) assert.ok(entry.trim().length > 10, `${lang}/${type}/${field} entry`);
      }
    }
  }
});

check('no two types share an overview, tagline or nickname (per language)', () => {
  for (const lang of LANGS) {
    for (const field of ['overview', 'tagline', 'nickname']) {
      const values = ALL_TYPES.map((t) => PROFILE_SETS[lang][t][field]);
      const unique = new Set(values);
      assert.equal(unique.size, 16, `${lang}/${field}: only ${unique.size} distinct of 16`);
    }
  }
});

check('no two types share any strength, weakness or growth suggestion', () => {
  for (const lang of LANGS) {
    for (const field of Object.keys(LIST_FIELDS)) {
      const seen = new Map();
      for (const type of ALL_TYPES) {
        for (const entry of PROFILE_SETS[lang][type][field]) {
          const prior = seen.get(entry);
          assert.ok(!prior, `${lang}/${field}: "${entry.slice(0, 40)}…" shared by ${prior} and ${type}`);
          seen.set(entry, type);
        }
      }
    }
  }
});

check('types sharing three letters still read differently (ISTP vs INTP etc.)', () => {
  // Any two types differing by one letter must not have near-identical prose.
  const overlap = (a, b) => {
    const wordsA = new Set(a.toLowerCase().split(/\W+/).filter((w) => w.length > 4));
    const wordsB = new Set(b.toLowerCase().split(/\W+/).filter((w) => w.length > 4));
    const shared = [...wordsA].filter((w) => wordsB.has(w)).length;
    return shared / Math.max(1, Math.min(wordsA.size, wordsB.size));
  };

  for (const lang of LANGS) {
    for (const a of ALL_TYPES) {
      for (const b of ALL_TYPES) {
        if (a >= b) continue;
        const diff = [...a].filter((c, i) => c !== b[i]).length;
        if (diff !== 1) continue;
        const textA = PROFILE_SETS[lang][a].overview + ' ' + PROFILE_SETS[lang][a].strengths.join(' ');
        const textB = PROFILE_SETS[lang][b].overview + ' ' + PROFILE_SETS[lang][b].strengths.join(' ');
        const ratio = overlap(textA, textB);
        assert.ok(ratio < 0.5, `${lang}: ${a} and ${b} overlap ${(ratio * 100).toFixed(0)}% of distinctive words`);
      }
    }
  }
});

check('French and Arabic profiles are genuinely translated, not English copies', () => {
  for (const type of ALL_TYPES) {
    assert.notEqual(PROFILES_FR[type].overview, PROFILES_EN[type].overview, `${type} fr`);
    assert.notEqual(PROFILES_AR[type].overview, PROFILES_EN[type].overview, `${type} ar`);
    assert.ok(/[؀-ۿ]/.test(PROFILES_AR[type].overview), `${type} ar not Arabic script`);
    assert.ok(/[a-zA-ZÀ-ÿ]/.test(PROFILES_FR[type].overview), `${type} fr not Latin script`);
  }
});

check('profiles avoid deterministic career and superiority claims', () => {
  const banned = [
    /\byou will (?:become|be) a\b/i,
    /\bbest type\b/i,
    /\bworst type\b/i,
    /\bsuperior to\b/i,
    /\byou should become\b/i,
    /\bdestined\b/i,
  ];
  for (const lang of LANGS) {
    for (const type of ALL_TYPES) {
      const all = JSON.stringify(PROFILE_SETS[lang][type]);
      for (const pattern of banned) {
        assert.ok(!pattern.test(all), `${lang}/${type} matches ${pattern}`);
      }
    }
  }
});

// ──────────────────────────────────────────────
console.log('\nInterface strings and sources:');

check('every UI string exists in all three languages', () => {
  const keys = Object.keys(UI.en);
  for (const lang of LANGS) {
    for (const key of keys) {
      const value = UI[lang][key];
      assert.ok(value !== undefined && value !== null, `${lang}.${key} missing`);
      if (typeof value === 'string') assert.ok(value.trim().length > 0, `${lang}.${key} empty`);
    }
    assert.equal(UI[lang].methodologyBody.length, UI.en.methodologyBody.length, `${lang} methodology length`);
  }
});

check('all eight poles and four dimension labels are translated', () => {
  for (const pole of ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P']) {
    for (const lang of LANGS) {
      assert.ok(POLE_INFO[pole].name[lang], `${pole}.name.${lang}`);
      assert.ok(POLE_INFO[pole].blurb[lang].length > 20, `${pole}.blurb.${lang}`);
    }
  }
  for (const dim of ['EI', 'SN', 'TF', 'JP']) {
    for (const lang of LANGS) assert.ok(DIMENSION_LABELS[dim][lang], `${dim}.${lang}`);
  }
});

check('sources are real links with a note in every language', () => {
  const all = [...OFFICIAL_SOURCES, ...RESEARCH_SOURCES];
  assert.ok(all.length >= 6);
  for (const source of all) {
    assert.match(source.url, /^https:\/\//, source.label);
    for (const lang of LANGS) assert.ok(source.note[lang]?.length > 20, `${source.label} note ${lang}`);
  }
});

check('results page carries the self-reflection disclaimer in every language', () => {
  for (const lang of LANGS) {
    assert.ok(UI[lang].disclaimerBody.length > 100, `${lang} disclaimer too short`);
    assert.ok(UI[lang].sourcesNote.includes('MindMirror'), `${lang} trademark note`);
  }
});

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail > 0 ? 1 : 0);
