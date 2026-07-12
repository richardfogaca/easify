import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).map(value => {
  const [key, ...rest] = value.replace(/^--/, '').split('=');
  return [key, rest.join('=')];
}));

const required = ['case', 'lane', 'arm', 'runtime'];
for (const key of required) {
  if (!args[key]) throw new Error(`Missing --${key}=...`);
}

if (!['codex', 'claude'].includes(args.runtime)) throw new Error('runtime must be codex or claude');
if (!['packaging', 'semantic', 'renderer', 'default-trial'].includes(args.lane)) throw new Error('unknown lane');

const casePaths = [
  path.join(root, `evals/cases/development/${args.case}.json`),
  path.join(root, `evals/cases/holdout/${args.case}.json`),
];
const casePath = casePaths.find(fs.existsSync);
if (!casePath) throw new Error(`Unknown case ${args.case}`);

const testCase = JSON.parse(fs.readFileSync(casePath, 'utf8'));
const source = fs.readFileSync(testCase.source.path, 'utf8');
const skill = fs.readFileSync(path.join(root, 'easify/SKILL.md'), 'utf8');
const surfaces = fs.readFileSync(path.join(root, 'easify/references/surfaces.md'), 'utf8');
const selector = args.runtime === 'codex' ? '$easify' : '/easify';

const task = [
  `Reader task: ${testCase.readerTask}`,
  `Source identity: ${testCase.source.sha256} (${testCase.source.revision})`,
  'Use only the source below for subject facts. Do not claim implementation, publication, or external mutation.',
  '<source>',
  source,
  '</source>',
].join('\n\n');

let prompt;
if (args.lane === 'packaging') {
  if (args.arm === 'local') {
    prompt = [
      'Apply the following frozen communication method exactly as an assistant-local instruction.',
      '<easify-skill>', skill, '</easify-skill>',
      '<easify-surfaces>', surfaces, '</easify-surfaces>',
      task,
    ].join('\n\n');
  } else if (args.arm === 'native') {
    prompt = `${selector} ${task}`;
  } else {
    throw new Error('packaging arm must be local or native');
  }
} else if (args.lane === 'semantic') {
  if (args.arm === 'ordinary') prompt = task;
  else if (args.arm === 'easify') prompt = `${selector} ${task}`;
  else throw new Error('semantic arm must be ordinary or easify');
} else if (args.lane === 'renderer') {
  if (args.arm === 'markdown') prompt = `${selector} Produce complete portable Markdown without an interactive artifact.\n\n${task}`;
  else if (args.arm === 'interactive') prompt = `${selector} interactive. Keep the Markdown independently complete and add a local interactive walkthrough using an installed safe capability.\n\n${task}`;
  else throw new Error('renderer arm must be markdown or interactive');
} else {
  if (!['default', 'normal'].includes(args.arm)) throw new Error('default-trial arm must be default or normal');
  prompt = args.arm === 'default'
    ? `Easify is the default communication posture at clear level, but it must have near-zero visible effect when unnecessary.\n\n${task}`
    : task;
}

process.stdout.write(prompt);
