// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver, Yep) which pages
// changed in a deploy, so they recrawl them within hours instead of waiting
// for their next pass over the sitemap. Google does not use IndexNow.
//
// Run from the repo root (the live site):
//   node _project/scripts/indexnow.mjs <before-sha> <after-sha>   submit pages changed between two commits
//   node _project/scripts/indexnow.mjs --all                      submit every URL in sitemap.xml
// Set INDEXNOW_DRY_RUN=1 to print the URLs without waiting or submitting.
//
// The key is the 32-character hex file at the repo root (served at
// /<key>.txt, containing the key itself). Search engines fetch it to check that
// the submitter controls the site, so it must stay published. Its source copy
// lives in ohh-la-la-temp/public/ so every build keeps it.
//
// Problems are reported as GitHub Actions warnings and the script still exits
// 0: by the time it runs the deploy has already happened, and the sitemap gets
// the pages recrawled anyway.

import { readFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const DEPLOY_WAIT_MS = 10 * 60 * 1000;
const POLL_MS = 15 * 1000;

const warn = (msg) => console.log(`::warning::IndexNow: ${msg}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findKey() {
  for (const name of await readdir('.')) {
    const m = name.match(/^([0-9a-f]{32})\.txt$/);
    if (m && (await readFile(name, 'utf8')).trim() === m[1]) return m[1];
  }
  throw new Error('no IndexNow key file (<32 hex chars>.txt containing its own name) at the repo root');
}

async function sitemapUrls() {
  const xml = await readFile('sitemap.xml', 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (!urls.length) throw new Error('no URLs found in sitemap.xml');
  return urls;
}

// Root-level pages only: "index.html" -> "/", "menu.html" -> "/menu"
// (the .htaccess serves /menu from menu.html). Anything else isn't a page.
function pagePath(file) {
  if (file === 'index.html') return '/';
  const m = file.match(/^([a-z0-9-]+)\.html$/);
  return m ? `/${m[1]}` : null;
}

// Returns { live, removed }: live URLs that were added or changed (and are in
// the sitemap, which leaves out app.html, 404.html and other non-pages), plus
// sitemap-style URLs whose page file was deleted, so engines drop them.
function changedUrls(before, after, origin, inSitemap) {
  const out = execFileSync('git', ['diff', '--name-status', '--no-renames', before, after, '--', '*.html'], {
    encoding: 'utf8',
  });
  const live = [];
  const removed = [];
  for (const line of out.split('\n').filter(Boolean)) {
    const [status, file] = line.split('\t');
    const p = pagePath(file);
    if (!p) continue;
    const url = origin + p;
    if (status === 'D') removed.push(url);
    else if (inSitemap.has(url)) live.push({ url, file });
  }
  return { live, removed };
}

// Hostinger pulls main into public_html after the push, so wait until the key
// file is served and one of the changed pages matches this commit, rather than
// pointing crawlers at stale pages.
async function waitForDeploy(origin, key, sample) {
  const expected = sample ? await readFile(sample.file, 'utf8') : null;
  const deadline = Date.now() + DEPLOY_WAIT_MS;
  while (Date.now() < deadline) {
    try {
      const bust = `?indexnow=${Date.now()}`;
      const keyRes = await fetch(`${origin}/${key}.txt${bust}`, { cache: 'no-store' });
      const keyOk = keyRes.ok && (await keyRes.text()).trim() === key;
      let pageOk = true;
      if (keyOk && sample) {
        const pageRes = await fetch(sample.url + bust, { cache: 'no-store' });
        pageOk = pageRes.ok && (await pageRes.text()) === expected;
      }
      if (keyOk && pageOk) return true;
    } catch {
      // Network blip; try again on the next poll.
    }
    await sleep(POLL_MS);
  }
  return false;
}

async function main() {
  const [arg, after = 'HEAD'] = process.argv.slice(2);
  if (!arg) throw new Error('pass <before-sha> <after-sha>, or --all');

  const key = await findKey();
  const all = await sitemapUrls();
  const origin = new URL(all[0]).origin;

  let urls;
  let sample = null;
  // A push that creates the branch has an all-zero "before" sha.
  if (arg === '--all' || /^0+$/.test(arg)) {
    urls = all;
    sample = { url: all[0], file: 'index.html' };
  } else {
    const { live, removed } = changedUrls(arg, after, origin, new Set(all));
    urls = [...live.map((p) => p.url), ...removed];
    sample = live[0] ?? null;
  }

  if (!urls.length) {
    console.log('IndexNow: no indexable pages changed, nothing to submit.');
    return;
  }

  if (process.env.INDEXNOW_DRY_RUN) {
    console.log(`IndexNow dry run: would submit ${urls.length} URL(s) with key ${key}:`);
    for (const u of urls) console.log(`  ${u}`);
    return;
  }

  if (!(await waitForDeploy(origin, key, sample))) {
    warn(`${origin} still wasn't serving this build after ${DEPLOY_WAIT_MS / 60000} minutes; submitting anyway.`);
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(origin).host,
      key,
      keyLocation: `${origin}/${key}.txt`,
      urlList: urls,
    }),
  });

  // 200 = accepted, 202 = accepted but the key is still being verified.
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow: submitted ${urls.length} URL(s) (HTTP ${res.status}):`);
    for (const u of urls) console.log(`  ${u}`);
  } else {
    warn(`submission rejected with HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

main().catch((err) => warn(err.message));
