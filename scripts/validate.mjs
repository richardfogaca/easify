import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');

const skill = read('easify/SKILL.md');
const surfaces = read('easify/references/surfaces.md');
const visualComposition = read('easify/references/visual-composition.md');
const openai = read('easify/agents/openai.yaml');
const manifest = JSON.parse(read('evals/cases/frozen-manifest.json'));

assert.match(skill, /^---\nname: easify\ndescription: /);
assert.match(skill, /“Easify this”/);
assert.match(skill, /“Easyfi this”/);
assert.match(skill, /\$easify in Codex/);
assert.match(skill, /\/easify in Claude/);
assert.match(skill, /Named on demand/);
assert.match(skill, /For structured material, lead with a representation/i);
assert.match(skill, /use width for parallelism and comparison;\s+height for sequence and causality/i);
assert.match(skill, /Ground the mental model in one concrete example/i);
assert.match(skill, /Give each claim one primary home/i);
assert.match(skill, /references\/visual-composition\.md/);
assert.doesNotMatch(skill, /top-down central spine|integrated vertical/i);
assert.match(skill, /Markdown explanation independently\ncomplete/);
assert.match(skill, /do not authorize source edits, implementation/);
assert.match(skill, /active plan\/report method own plan and report structure/);
assert.match(skill, /references\/surfaces\.md/);
assert.doesNotMatch(skill, /generic “explain this”/i);

assert.match(openai, /allow_implicit_invocation: true/);
assert.match(openai, /\$easify/);
assert.match(surfaces, /## PR description, review, or comment/);
assert.match(surfaces, /## Documentation/);
assert.match(surfaces, /## QA or evidence/);
assert.match(surfaces, /## Grill Me/);
assert.match(surfaces, /## Idea transfer/);
assert.match(surfaces, /## Interactive walkthrough/);
assert.match(surfaces, /Drafting never authorizes posting/);
assert.match(surfaces, /walkthrough is an explanation surface, not independent evidence/);
assert.match(visualComposition, /## Route by relationship/);
assert.match(visualComposition, /Sequence plus parallelism/);
assert.match(visualComposition, /Each claim gets one primary home/);

const developmentDir = path.join(root, 'evals/cases/development');
const holdoutDir = path.join(root, 'evals/cases/holdout');
const regressionDir = path.join(root, 'evals/cases/regression');
const development = fs.readdirSync(developmentDir).filter(name => name.endsWith('.json'));
const holdout = fs.readdirSync(holdoutDir).filter(name => name.endsWith('.json'));
const regressions = fs.readdirSync(regressionDir).filter(name => name.endsWith('.json'));
assert.equal(development.length, manifest.caseCounts.development);
assert.equal(holdout.length, manifest.caseCounts.holdout);
assert.equal(regressions.length, 1);

for (const [folder, names] of [[developmentDir, development], [holdoutDir, holdout]]) {
  for (const name of names) {
    const testCase = JSON.parse(fs.readFileSync(path.join(folder, name), 'utf8'));
    assert.ok(testCase.id);
    assert.ok(testCase.readerTask);
    assert.ok(testCase.questions.length >= 2 && testCase.questions.length <= 5);
    assert.ok(testCase.requiredFacts.length > 0);
    assert.ok(testCase.prohibitedOverclaims.length > 0);
    assert.equal(sha256(fs.readFileSync(testCase.source.path)), testCase.source.sha256, `${testCase.id}: source drift`);
    const numericPrefix = name.slice(0, 2);
    const baseline = path.join(root, `evals/results/baseline-${numericPrefix}-${testCase.id}.md`);
    assert.ok(fs.statSync(baseline).size > 0, `${testCase.id}: missing frozen baseline`);
  }
}

for (const name of regressions) {
  const testCase = JSON.parse(fs.readFileSync(path.join(regressionDir, name), 'utf8'));
  assert.ok(testCase.id);
  assert.ok(testCase.readerTask);
  assert.ok(testCase.source.content);
  assert.ok(testCase.requiredFacts.length > 0);
  assert.ok(testCase.representationRequirements.length > 0);
  assert.ok(testCase.failureSignals.length > 0);
  assert.ok(testCase.prohibitedOverclaims.length > 0);
}

assert.equal(manifest.candidateNotYetAuthored, true);
assert.deepEqual(Object.keys(manifest.lanes).sort(), ['packaging', 'renderer', 'semantic']);

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'easify-install-'));
try {
  const env = {
    ...process.env,
    CODEX_SKILLS_ROOT: path.join(temp, 'codex'),
    CLAUDE_SKILLS_ROOT: path.join(temp, 'claude'),
  };
  execFileSync(path.join(root, 'scripts/install-local.sh'), { env, stdio: 'pipe' });
  const codex = path.join(temp, 'codex/easify');
  const claude = path.join(temp, 'claude/easify');
  assert.equal(fs.realpathSync(codex), path.join(root, 'easify'));
  assert.equal(fs.realpathSync(claude), path.join(root, 'easify'));
  execFileSync(path.join(root, 'scripts/install-local.sh'), { env, stdio: 'pipe' });

  fs.unlinkSync(claude);
  fs.mkdirSync(claude);
  assert.throws(
    () => execFileSync(path.join(root, 'scripts/install-local.sh'), { env, stdio: 'pipe' }),
    error => error.status === 2,
  );
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

const preparedLocal = execFileSync(process.execPath, [
  path.join(root, 'scripts/prepare-run.mjs'),
  '--case=05-tiny',
  '--lane=packaging',
  '--arm=local',
  '--runtime=codex',
], { encoding: 'utf8' });
assert.match(preparedLocal, /<easify-skill>/);
assert.match(preparedLocal, /tiny configuration change proportionally/);

const preparedNative = execFileSync(process.execPath, [
  path.join(root, 'scripts/prepare-run.mjs'),
  '--case=05-tiny',
  '--lane=semantic',
  '--arm=easify',
  '--runtime=claude',
], { encoding: 'utf8' });
assert.match(preparedNative, /^\/easify /);
assert.doesNotMatch(preparedNative, /<easify-skill>/);

const preparedRegression = execFileSync(process.execPath, [
  path.join(root, 'scripts/prepare-run.mjs'),
  '--case=09-implementation-visual-first',
  '--lane=semantic',
  '--arm=easify',
  '--runtime=codex',
], { encoding: 'utf8' });
assert.match(preparedRegression, /^\$easify /);
assert.match(preparedRegression, /resumable local drafts and safe synchronization/);
assert.match(preparedRegression, /inline-regression-fixture/);

console.log('Easify structural, boundary, case, source, and installer checks passed.');
