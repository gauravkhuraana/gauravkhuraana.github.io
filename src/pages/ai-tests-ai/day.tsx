import type {ReactNode} from 'react';
import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import Details from '@theme/Details';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import shared from '../ai-tests-ai.module.css';
import styles from './day.module.css';

/*
 * Unlisted on-the-day page for the AutomationSTAR 2026 tutorial, opened from a QR code.
 * Linked only from /ai-tests-ai/ (and links back to it). The robots noindex tag below also keeps
 * it out of sitemap.xml. Do not wrap content in <article> with a `markdown` class, or lunr
 * search will index it.
 */

const PAGE_TITLE = 'On the day · Poison Kills Poison: AI Tests AI';
const PAGE_DESCRIPTION =
  "Every command you run during Gaurav Khurana's hands-on AutomationSTAR 2026 tutorial, step by step, for Windows and Mac.";

const REPO_URL = 'https://github.com/gauravkhuraana/shopkart-ai-tutorial-v2';
const BLOB = `${REPO_URL}/blob/main`;
const COMMANDS_WINDOWS_URL = `${BLOB}/COMMANDS_WINDOWS.md`;
const COMMANDS_MAC_URL = `${BLOB}/COMMANDS_MAC.md`;
const TROUBLESHOOTING_URL = `${BLOB}/TROUBLESHOOTING.md`;
const GROQ_KEYS_URL = 'https://console.groq.com/keys';
const LINKEDIN_URL = 'https://www.linkedin.com/in/gauravkhuraana/';

// Attendees copy these exactly. String.raw keeps every backslash; none contains ${ or a backtick.
const CMD = {
  activateWin: String.raw`.venv\Scripts\Activate.ps1`,
  activateMac: String.raw`source .venv/bin/activate`,
  executionPolicy: String.raw`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`,
  checkSetup: String.raw`python check_setup.py`,
  checkpoint: String.raw`python checkpoint.py step3`,
  pytestAll: String.raw`pytest evaluate -v`,
  httpServer: String.raw`python -m http.server 8080 --directory evaluate`,
  killPortWin: String.raw`Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Get-CimInstance Win32_Process -Filter "ParentProcessId=$($_.OwningProcess)" | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }; Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }`,
  killPortMac: String.raw`kill $(lsof -ti :8000) 2>/dev/null`,
};

function ExternalLink({href, children}: {href: string; children: ReactNode}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Cmd({code, lang = 'bash'}: {code: string; lang?: string}) {
  return <CodeBlock language={lang}>{code}</CodeBlock>;
}

function OsTabs({windows, mac}: {windows: ReactNode; mac: ReactNode}) {
  return (
    <Tabs groupId="os" defaultValue="mac">
      <TabItem value="mac" label="Codespaces · Mac · Linux">
        {mac}
      </TabItem>
      <TabItem value="windows" label="Windows (PowerShell)">
        {windows}
      </TabItem>
    </Tabs>
  );
}

function CmdBlock({title, children}: {title: ReactNode; children: ReactNode}) {
  return (
    <div className={styles.cmdBlock}>
      <p className={styles.cmdTitle}>{title}</p>
      {children}
    </div>
  );
}

/*
 * One line of a step. `cmd` is written Mac / Linux style. When `paths` is set, the Windows
 * version swaps / for \ and the line is shown in OS tabs; otherwise it is the same everywhere.
 */
type StepLine = {note: string; cmd: string; paths?: boolean};
type Step = {title: string; lines: StepLine[]};

const cd = (folder: string): StepLine => ({note: 'Go into the step folder', cmd: `cd ${folder}`, paths: true});
const back: StepLine = {note: 'Back to the project folder', cmd: 'cd ../..', paths: true};
const plant = (bug: string, note: string): StepLine => ({
  note,
  cmd: `python ../../plant_bug.py ${bug}`,
  paths: true,
});
const BUG_OFF = plant('off', 'Remove the bug. Always do this before you move on');

const steps: Step[] = [
  {
    title: 'Step 1 · Brain: talk to the AI model',
    lines: [
      cd('build/step1_model'),
      {note: 'Ask the model one question', cmd: 'python ask_simple.py'},
      {note: 'After the TODO: the full version', cmd: 'python ask.py'},
      back,
    ],
  },
  {
    title: 'Step 2 · Bridge: put it behind a web API',
    lines: [
      cd('build/step2_api'),
      {note: 'Start the simple API (Ctrl+C to stop)', cmd: 'uvicorn app_simple:app --reload'},
      {note: 'After the TODO: the full API', cmd: 'uvicorn app:app --reload'},
      back,
    ],
  },
  {
    title: 'Step 3 · Browser: give it a chat page',
    lines: [
      cd('build/step3_ui'),
      {note: 'Start the chat page (Ctrl+C to stop)', cmd: 'uvicorn app_simple:app --reload'},
      {note: 'After the TODO: the full version', cmd: 'uvicorn app:app --reload'},
      back,
    ],
  },
  {
    title: "Step 4 · Book: answer from ShopKart's rules",
    lines: [
      cd('build/step4_ground'),
      {note: 'See which rule it finds', cmd: 'python retrieval.py "Do you price-match?"'},
      {note: 'Start the grounded bot (Ctrl+C to stop)', cmd: 'uvicorn app_simple:app --reload'},
      {note: 'After the TODO: the full version', cmd: 'uvicorn app:app --reload'},
      back,
    ],
  },
  {
    title: 'Step 5 · Body: let it act',
    lines: [
      cd('build/step5_agent'),
      {note: 'Run the agent on one order', cmd: 'python agent_simple.py 1043'},
      {note: 'Run it on every order', cmd: 'python agent_simple.py all'},
      {note: 'Run the full crew', cmd: 'python agent.py 1043'},
      {
        note: 'Start the bot and leave it running for all of Part 2. Open a new terminal for the next steps',
        cmd: 'uvicorn app:app --reload',
      },
    ],
  },
  {
    title: 'Step 6 · Rules: words it must and must never say',
    lines: [
      cd('evaluate/step6_rules'),
      {note: 'Try the rules once', cmd: 'python rules_simple.py'},
      {note: 'Run the rule tests', cmd: 'python -m pytest test_rules.py -v'},
      plant('liar', 'Plant a bug: the bot now lies'),
      {note: 'Run the tests again: they should catch it', cmd: 'python -m pytest test_rules.py -v'},
      BUG_OFF,
      back,
    ],
  },
  {
    title: 'Step 7 · AI judge: is the answer true?',
    lines: [
      cd('evaluate/step7_judge'),
      {note: 'Ask the judge once', cmd: 'python judge_simple.py'},
      {note: 'Run the judge tests', cmd: 'pytest test_judge.py -v'},
      plant('liar', 'Plant a bug: the bot now lies'),
      {note: 'Can the judge catch it?', cmd: 'pytest test_judge.py -v -k price'},
      BUG_OFF,
      back,
    ],
  },
  {
    title: 'Step 8 · Agent: test the journey, not just the landing',
    lines: [
      cd('evaluate/step8_agent'),
      {note: 'Check the agent once', cmd: 'python agent_check_simple.py'},
      plant('skip_lookup', 'Plant a bug: the agent skips the order lookup'),
      {note: 'Check again: it should fail', cmd: 'python agent_check_simple.py'},
      BUG_OFF,
      {note: 'Run the agent tests', cmd: 'pytest test_agents.py -v -k "not task_completion"'},
      back,
    ],
  },
  {
    title: 'Step 9 · Judge on trial: can we trust the judge?',
    lines: [
      cd('evaluate/step9_trial'),
      {note: 'Put the judge on trial once', cmd: 'python trial_simple.py'},
      {note: 'The full trial', cmd: 'python judge_the_judge.py --runs 2'},
      back,
    ],
  },
];

function StepLineView({line}: {line: StepLine}) {
  return (
    <>
      <p className={styles.cmdLabel}>{line.note}</p>
      {line.paths ? (
        <OsTabs
          mac={<Cmd code={line.cmd} />}
          windows={<Cmd lang="powershell" code={line.cmd.replaceAll('/', '\\')} />}
        />
      ) : (
        <Cmd code={line.cmd} />
      )}
    </>
  );
}

export default function AiTestsAiDay(): ReactNode {
  return (
    <Layout description={PAGE_DESCRIPTION}>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
      </Head>

      <header className={shared.hero}>
        <div className={shared.heroInner}>
          <p className={shared.kicker}>AutomationSTAR 2026 · Antwerp · 4 November, 09:00 CET</p>
          <Heading as="h1">Poison Kills Poison: AI Tests AI</Heading>
          <p className={shared.heroSub}>On the day: every command we run, in order</p>
          <p className={shared.heroText}>
            Set up once, then copy each command, paste it, press Enter.
          </p>
          <p className={styles.heroLink}>
            Not set up yet? Start with the <Link to="/ai-tests-ai/">get-ready page</Link>.
          </p>
          <nav aria-label="Jump to">
            <ul className={styles.jumpMenu}>
              <li><a href="#setup">Set up</a></li>
              <li><a href="#start">Every terminal</a></li>
              <li><a href="#steps">Steps 1 to 9</a></li>
              <li><a href="#handy">Handy commands</a></li>
              <li><a href="#stuck">Stuck?</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className={shared.section}>
          <Heading as="h2" id="setup">Set up: GitHub Codespaces (recommended)</Heading>
          <p className={shared.intro}>
            VS Code in your browser. Nothing to install, and it works on every laptop.
          </p>
          <ol className={styles.steps}>
            <li>
              Open <ExternalLink href={REPO_URL}>github.com/gauravkhuraana/shopkart-ai-tutorial-v2</ExternalLink>{' '}
              and <strong>sign in to GitHub</strong> (a free account). Not signed in? The Codespaces
              option does not appear.
            </li>
            <li>
              Click the green <strong>Code</strong> button → <strong>Codespaces</strong> tab →{' '}
              <strong>Create codespace on main</strong>.
            </li>
            <li>
              Wait a few minutes until VS Code opens in your browser and the terminal at the bottom
              is ready.
            </li>
            <li>
              In the file list on the left, open <code>.env</code>. Paste your free Groq key (starts
              with <code>gsk_</code>) right after <code>LLM_API_KEY=</code> and again after{' '}
              <code>JUDGE_API_KEY=</code>, then save (<strong>Ctrl+S</strong>). No key yet? Create
              one at <ExternalLink href={GROQ_KEYS_URL}>console.groq.com/keys</ExternalLink> (no credit
              card).
            </li>
            <li>
              In the terminal, run these two commands. Every line OK means you're ready.
              <Cmd code={CMD.activateMac} />
              <Cmd code={CMD.checkSetup} />
            </li>
          </ol>
          <p>
            <strong>On your own laptop instead?</strong> Open the project folder in VS Code (
            <strong>File → Open Folder</strong>), then <strong>Terminal → New Terminal</strong>. You
            are now in the project folder. Use the <strong>Windows</strong> tab below if your laptop
            runs Windows.
          </p>
        </section>

        <section className={shared.section}>
          <Heading as="h2" id="start">Every new terminal</Heading>
          <p className={shared.intro}>
            Be in the project folder (the one with <code>check_setup.py</code>). If you are not,{' '}
            <code>cd</code> into your folder first. Then switch on the virtual environment:
          </p>
          <OsTabs
            mac={<Cmd code={CMD.activateMac} />}
            windows={
              <>
                <Cmd lang="powershell" code={CMD.activateWin} />
                <p className={styles.cmdLabel}>
                  "Running scripts is disabled on this system"? Run this once, then activate again:
                </p>
                <Cmd lang="powershell" code={CMD.executionPolicy} />
              </>
            }
          />
          <p>
            You should now see <code>(.venv)</code> at the start of the line.
          </p>
        </section>

        <section className={shared.section}>
          <Heading as="h2" id="steps">Steps 1 to 9</Heading>
          <p className={shared.intro}>
            Each step starts in the project folder and ends back there. A command marked with tabs
            differs between Windows and Mac; pick your tab once and the page remembers it.
          </p>
          <p className={styles.tip}>
            Uncommenting the TODO lines: select them and press <strong>Ctrl+/</strong> (Mac:{' '}
            <strong>Cmd+/</strong>). No luck on your keyboard? Use{' '}
            <strong>Edit → Toggle Line Comment</strong>.
          </p>
          {steps.map((step) => (
            <Details
              key={step.title}
              className={styles.stepDetails}
              summary={<summary>{step.title}</summary>}>
              {step.lines.map((line, i) => (
                <StepLineView key={i} line={line} />
              ))}
            </Details>
          ))}
        </section>

        <section className={shared.section}>
          <Heading as="h2" id="handy">Handy commands</Heading>

          <CmdBlock title="Am I ready?">
            <Cmd code={CMD.checkSetup} />
          </CmdBlock>

          <CmdBlock
            title={
              <>
                Fell behind? Copy in a finished step (change <code>step3</code> to the step you need)
              </>
            }>
            <p className={styles.cmdLabel}>From the project folder. Your own file is kept as <code>.mine</code>.</p>
            <Cmd code={CMD.checkpoint} />
          </CmdBlock>

          <CmdBlock title="Run every test at once">
            <p className={styles.cmdLabel}>From the project folder, with the bot running.</p>
            <Cmd code={CMD.pytestAll} />
          </CmdBlock>

          <CmdBlock title="See the scoreboard">
            <p className={styles.cmdLabel}>
              On your laptop: open <code>evaluate/report.html</code> in your browser. In Codespaces:
              run this in a new terminal, then open port 8080 in the <strong>Ports</strong> panel.
            </p>
            <Cmd code={CMD.httpServer} />
          </CmdBlock>

          <CmdBlock title={'"Port 8000 is already in use"'}>
            <OsTabs
              mac={<Cmd code={CMD.killPortMac} />}
              windows={<Cmd lang="powershell" code={CMD.killPortWin} />}
            />
          </CmdBlock>

          <p>
            Want every command with the explanation?{' '}
            <ExternalLink href={COMMANDS_WINDOWS_URL}>Windows commands</ExternalLink> ·{' '}
            <ExternalLink href={COMMANDS_MAC_URL}>Mac / Linux / Codespaces commands</ExternalLink>
          </p>
        </section>

        <section className={shared.section}>
          <div className={shared.cta}>
            <Heading as="h2" id="stuck">Stuck?</Heading>
            <ol>
              <li>
                Every problem has a number: look it up in the{' '}
                <ExternalLink href={TROUBLESHOOTING_URL}>troubleshooting guide</ExternalLink>.
              </li>
              <li>
                Fell behind? <code>python checkpoint.py step3</code> gets you going again.
              </li>
              <li>Raise your hand, or ask your neighbour. Nobody gets left behind.</li>
            </ol>
            <p>
              Done for the day in Codespaces? Bottom-left menu → <strong>Stop Current Codespace</strong>{' '}
              to save your free hours.
            </p>
            <p>
              Contact after the day: <ExternalLink href={LINKEDIN_URL}>LinkedIn</ExternalLink> ·{' '}
              <Link to="/connect/">gauravkhurana.com/connect</Link>
            </p>
          </div>
        </section>

        <p className={shared.closing}>Thank you for building and breaking with me. #SharingIsCaring</p>
      </main>
    </Layout>
  );
}
