import type {ReactNode} from 'react';
import React from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
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
  "Everything you need during Gaurav Khurana's hands-on AutomationSTAR 2026 tutorial: three ways to run the labs, the files, and the common commands.";

const REPO_URL = 'https://github.com/gauravkhuraana/shopkart-ai-tutorial-v2';
const BLOB = `${REPO_URL}/blob/main`;
const CODESPACES_URL = 'https://codespaces.new/gauravkhuraana/shopkart-ai-tutorial-v2';
const NOTEBOOK_URL = `${BLOB}/workshop.ipynb`;
const COMMANDS_WINDOWS_URL = `${BLOB}/COMMANDS_WINDOWS.md`;
const COMMANDS_MAC_URL = `${BLOB}/COMMANDS_MAC.md`;
const TROUBLESHOOTING_URL = `${BLOB}/TROUBLESHOOTING.md`;
const GROQ_KEYS_URL = 'https://console.groq.com/keys';
const CODESPACES_SETTINGS_URL = 'https://github.com/settings/codespaces';
const LINKEDIN_URL = 'https://www.linkedin.com/in/gauravkhuraana/';

// Attendees copy these exactly. String.raw keeps every backslash; none contains ${ or a backtick.
const CMD = {
  checkSetup: String.raw`python check_setup.py`,
  cdWin: String.raw`cd C:\Users\YourName\Downloads\shopkart-ai-tutorial-v2`,
  cdMac: String.raw`cd ~/Downloads/shopkart-ai-tutorial-v2`,
  activateWin: String.raw`.venv\Scripts\Activate.ps1`,
  executionPolicy: String.raw`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`,
  activateCmd: String.raw`.venv\Scripts\activate.bat`,
  activateMac: String.raw`source .venv/bin/activate`,
  cdBotWin: String.raw`cd build\step5_agent`,
  uvicorn: String.raw`uvicorn app:app --reload`,
  cdBotMac: String.raw`cd build/step5_agent`,
  backWin: String.raw`cd ..\..`,
  backMac: String.raw`cd ../..`,
  checkpoint: String.raw`python checkpoint.py step3`,
  plantLiar: String.raw`python plant_bug.py liar`,
  plantOff: String.raw`python plant_bug.py off`,
  pytest: String.raw`pytest evaluate -v`,
  httpServer: String.raw`python -m http.server 8080 --directory evaluate`,
  killPortWin: String.raw`Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Get-CimInstance Win32_Process -Filter "ParentProcessId=$($_.OwningProcess)" | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }; Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }`,
  killPortMac: String.raw`kill $(lsof -ti :8000) 2>/dev/null`,
  deactivate: String.raw`deactivate`,
};

function ExternalLink({href, children}: {href: string; children: ReactNode}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function ButtonLink({href, children}: {href: string; children: ReactNode}) {
  return (
    <a
      className="button button--primary button--block"
      href={href}
      target="_blank"
      rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Cmd({code, lang = 'bash'}: {code: string; lang?: string}) {
  return <CodeBlock language={lang}>{code}</CodeBlock>;
}

function OsTabs({windows, mac}: {windows: ReactNode; mac: ReactNode}) {
  return (
    <Tabs groupId="os" defaultValue="windows">
      <TabItem value="windows" label="Windows (PowerShell)">
        {windows}
      </TabItem>
      <TabItem value="mac" label="Mac · Linux · Codespaces">
        {mac}
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

type FileRow = {file: string; purpose: string; href: string};

const files: FileRow[] = [
  {file: 'workshop.ipynb', purpose: 'The notebook: all 9 steps, press ▶︎', href: NOTEBOOK_URL},
  {
    file: 'COMMANDS_WINDOWS.md',
    purpose: 'Every command for steps 1 to 9, Windows PowerShell',
    href: COMMANDS_WINDOWS_URL,
  },
  {
    file: 'COMMANDS_MAC.md',
    purpose: 'Every command for steps 1 to 9, Mac, Linux and Codespaces',
    href: COMMANDS_MAC_URL,
  },
  {file: 'README.md', purpose: 'The overview: what we build, what we test', href: REPO_URL},
  {file: 'TROUBLESHOOTING.md', purpose: 'Every problem by number', href: TROUBLESHOOTING_URL},
  {
    file: 'plant_bug_README.md',
    purpose: 'The bugs we plant in Part 2, and how to remove them',
    href: `${BLOB}/plant_bug_README.md`,
  },
  {file: 'solutions/', purpose: 'Finished code for every step', href: `${REPO_URL}/tree/main/solutions`},
];

type StepRow = {step: string; what: string; path: string};

const buildSteps: StepRow[] = [
  {step: '1 · Brain', what: 'Talk to the AI model', path: 'build/step1_model'},
  {step: '2 · Bridge', what: 'Put it behind a web API', path: 'build/step2_api'},
  {step: '3 · Browser', what: 'Give it a chat page', path: 'build/step3_ui'},
  {step: '4 · Book', what: "Make it answer from ShopKart's rules", path: 'build/step4_ground'},
  {step: '5 · Body', what: 'Let it act: refund, or ask a human', path: 'build/step5_agent'},
];

const testSteps: StepRow[] = [
  {step: '6 · Rules', what: 'Words it must say, words it must never say', path: 'evaluate/step6_rules'},
  {step: '7 · AI judge', what: 'Is the answer true?', path: 'evaluate/step7_judge'},
  {step: '8 · Agent', what: 'Test the journey, not just the landing', path: 'evaluate/step8_agent'},
  {step: '9 · Judge on trial', what: 'Can we trust the judge?', path: 'evaluate/step9_trial'},
];

function StepRows({rows}: {rows: StepRow[]}) {
  return (
    <>
      {rows.map((row) => (
        <tr key={row.step}>
          <td>{row.step}</td>
          <td>{row.what}</td>
          <td>
            <ExternalLink href={`${BLOB}/${row.path}/README.md`}>README</ExternalLink>
          </td>
        </tr>
      ))}
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
          <p className={shared.heroSub}>On the day: pick your way to run the labs</p>
          <p className={shared.heroText}>
            Three ways, same 9 steps, same files. Pick one and stay with it for the whole tutorial.
          </p>
          <p className={styles.heroLink}>
            Not set up yet? Start with the <Link to="/ai-tests-ai/">get-ready page</Link>.
          </p>
          <nav aria-label="Jump to">
            <ul className={styles.jumpMenu}>
              <li><a href="#three-ways">Three ways</a></li>
              <li><a href="#files">Files</a></li>
              <li><a href="#commands">Common commands</a></li>
              <li><a href="#steps">Steps</a></li>
              <li><a href="#stuck">Stuck?</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className={shared.section}>
          <Heading as="h2" id="three-ways">Three ways to run it</Heading>
          <div className={styles.wayGrid}>
            <div className={clsx(shared.pathCard, shared.pathCardRecommended, styles.wayCard)}>
              <p className={shared.pathLabel}>Way 1</p>
              <p className={shared.pathTitle}>
                GitHub Codespaces<span className={shared.badge}>Recommended</span>
              </p>
              <ul>
                <li>VS Code in your browser. Nothing to install, already set up for you.</li>
                <li>Works the same on every laptop, including locked-down work laptops.</li>
                <li>Needs: a free GitHub account (signed in) and your free Groq key.</li>
                <li>Inside it you can type commands (terminal) or press ▶︎ (notebook).</li>
              </ul>
              <div className={styles.wayButtons}>
                <ButtonLink href={CODESPACES_URL}>Open in Codespaces</ButtonLink>
              </div>
            </div>
            <div className={clsx(shared.pathCard, styles.wayCard)}>
              <p className={shared.pathLabel}>Way 2</p>
              <p className={shared.pathTitle}>Notebook (press ▶︎)</p>
              <ul>
                <li>
                  Open <code>workshop.ipynb</code> and press ▶︎ on each cell. The least typing.
                </li>
                <li>The notebook starts and stops the bot for you.</li>
                <li>Works inside Codespaces or in VS Code on your laptop.</li>
              </ul>
              <div className={styles.wayButtons}>
                <ButtonLink href={NOTEBOOK_URL}>Open the notebook</ButtonLink>
              </div>
            </div>
            <div className={clsx(shared.pathCard, styles.wayCard)}>
              <p className={shared.pathLabel}>Way 3</p>
              <p className={shared.pathTitle}>VS Code on your laptop</p>
              <ul>
                <li>The project on your own laptop, commands typed in VS Code's terminal.</li>
                <li>Use this if you finished the get-ready check and every line said OK.</li>
                <li>
                  Needs: Python 3.12, VS Code, <code>.venv</code> set up, your Groq key in{' '}
                  <code>.env</code>.
                </li>
              </ul>
              <div className={styles.wayButtons}>
                <ButtonLink href={COMMANDS_WINDOWS_URL}>Windows commands</ButtonLink>
                <ButtonLink href={COMMANDS_MAC_URL}>Mac / Linux commands</ButtonLink>
              </div>
            </div>
          </div>
          <p>
            <strong>Not sure? Use Codespaces.</strong> If your laptop setup gives you trouble on the
            day, switch to Codespaces; it takes about 5 minutes.
          </p>
        </section>

        <section className={shared.section}>
          <Heading as="h2" id="which-one">Which one is for me?</Heading>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th />
                  <th>Codespaces (recommended)</th>
                  <th>Notebook</th>
                  <th>VS Code on your laptop</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Install anything?</th>
                  <td>No</td>
                  <td>Only if you run it on your laptop</td>
                  <td>Yes (done before the day)</td>
                </tr>
                <tr>
                  <th scope="row">How you run steps</th>
                  <td>Terminal or ▶︎</td>
                  <td>Press ▶︎ on each cell</td>
                  <td>Type commands in the terminal</td>
                </tr>
                <tr>
                  <th scope="row">Commands to use</th>
                  <td>Mac / Linux, even on a Windows laptop</td>
                  <td>Inside the cells</td>
                  <td>Windows or Mac / Linux, for your laptop</td>
                </tr>
                <tr>
                  <th scope="row">Fell behind?</th>
                  <td><code>python checkpoint.py step3</code></td>
                  <td>the <strong>Short on time?</strong> cell of that step</td>
                  <td><code>python checkpoint.py step3</code></td>
                </tr>
                <tr>
                  <th scope="row">Best for</th>
                  <td>Everyone, especially work laptops</td>
                  <td>Less typing, less to remember</td>
                  <td>Keeping everything on your own machine</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.callout}>
            <p className={styles.calloutTitle}>Two rules that prevent most problems</p>
            <ol>
              <li>
                <strong>Don't mix the notebook and the terminal.</strong> Only one bot fits on port
                8000. A bot started in a terminal and one started by the notebook will collide.
              </li>
              <li>
                <strong>In Codespaces, use the Mac / Linux commands</strong>, even if your own laptop
                runs Windows. A Codespace is Linux.
              </li>
            </ol>
          </div>
        </section>

        <section className={shared.section}>
          <Heading as="h2" id="way-1">Way 1 · Codespaces in four steps</Heading>
          <ol className={styles.steps}>
            <li>
              <strong>Sign in to GitHub</strong> (a free account). If you are not signed in, the
              Codespaces option does not appear.
            </li>
            <li>
              Click <strong><ExternalLink href={CODESPACES_URL}>Open in Codespaces</ExternalLink></strong>{' '}
              → <strong>Create codespace</strong>. (Or on the repo page: green <strong>Code</strong>{' '}
              button → <strong>Codespaces</strong> tab → <strong>Create codespace on main</strong>.)
            </li>
            <li>
              When it asks for secrets, paste your <strong>free Groq key</strong> (starts with{' '}
              <code>gsk_</code>) into <strong>both</strong> <code>LLM_API_KEY</code> and{' '}
              <code>JUDGE_API_KEY</code>. No key yet? Create one at{' '}
              <ExternalLink href={GROQ_KEYS_URL}>console.groq.com/keys</ExternalLink> (no credit card).
            </li>
            <li>
              Wait a few minutes while it sets itself up. When the terminal shows{' '}
              <code>(.venv)</code>, run the check:
              <Cmd code={CMD.checkSetup} />
            </li>
          </ol>
          <p>
            Every line OK? You are ready. It opens <code>COMMANDS_MAC.md</code> and{' '}
            <code>workshop.ipynb</code> for you: use the commands, or switch to the notebook.
          </p>
          <ul>
            <li>
              The bot appears on <strong>port 8000</strong> and the scoreboard on{' '}
              <strong>port 8080</strong>. Find both in VS Code's <strong>Ports</strong> panel.
            </li>
            <li>
              <strong>Key typed wrong?</strong> Fixing <code>.env</code> does not help in Codespaces
              (secrets win). Change it at{' '}
              <ExternalLink href={CODESPACES_SETTINGS_URL}>github.com/settings/codespaces</ExternalLink>,
              then stop and restart the Codespace.
            </li>
            <li>
              <strong>When you're done:</strong> bottom-left menu →{' '}
              <strong>Stop Current Codespace</strong>, to save your free hours.
            </li>
            <li>
              Work GitHub account blocks Codespaces? Use a personal GitHub account, or pair with a
              neighbour.
            </li>
          </ul>
        </section>

        <section className={shared.section}>
          <Heading as="h2" id="way-2">Way 2 · The notebook</Heading>
          <ol className={styles.steps}>
            <li>
              Open <strong><code>workshop.ipynb</code></strong> (in Codespaces it is already open; on
              your laptop, open it from VS Code's Explorer).
            </li>
            <li>
              Click the first grey code cell and press <strong>▶︎</strong> (or{' '}
              <strong>Shift+Enter</strong>).
            </li>
            <li>
              If VS Code asks for a kernel: <strong>Select Kernel</strong> (top right) →{' '}
              <strong>Python Environments</strong> → <strong>.venv</strong>.
            </li>
            <li>
              Work down the notebook. For each TODO, uncomment the lines in the real file it points
              to, then press ▶︎ again.
            </li>
            <li>
              Fell behind? Run that step's <strong>Short on time?</strong> cell. Your own file is kept
              as <code>.mine</code>.
            </li>
          </ol>
        </section>

        <section className={shared.section}>
          <Heading as="h2" id="way-3">Way 3 · VS Code on your laptop</Heading>
          <ol className={styles.steps}>
            <li>
              VS Code → <strong>File → Open Folder</strong> → the{' '}
              <code>shopkart-ai-tutorial-v2</code> folder (a ZIP download unpacks to{' '}
              <code>shopkart-ai-tutorial-v2-main</code>).
            </li>
            <li>
              <strong>Terminal → New Terminal</strong>, then activate <code>.venv</code> (see{' '}
              <a href="#commands">Common commands</a> below). You should see <code>(.venv)</code> at
              the start of the line.
            </li>
            <li>
              Run <code>python check_setup.py</code>. Every line OK means ready.
            </li>
            <li>
              You'll use <strong>three terminals</strong>: one for Ollama (optional demo), one for the
              bot, one for your work. Activate <code>.venv</code> in the bot and work terminals.
            </li>
            <li>
              Follow the commands for your laptop:{' '}
              <ExternalLink href={COMMANDS_WINDOWS_URL}>Windows</ExternalLink> ·{' '}
              <ExternalLink href={COMMANDS_MAC_URL}>Mac / Linux</ExternalLink>.
            </li>
          </ol>
        </section>

        <section className={shared.section}>
          <Heading as="h2" id="files">The files you'll use</Heading>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>File</th>
                  <th>What it's for</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {files.map((row) => (
                  <tr key={row.file}>
                    <td><code>{row.file}</code></td>
                    <td>{row.purpose}</td>
                    <td><ExternalLink href={row.href}>Open</ExternalLink></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={shared.section}>
          <Heading as="h2" id="commands">Common commands</Heading>
          <p className={shared.intro}>
            Start in the project folder (the one with <code>check_setup.py</code>), with{' '}
            <code>(.venv)</code> active, unless it says otherwise. Each box is one command: copy,
            paste, Enter.
          </p>

          <CmdBlock title="Go to the project folder">
            <OsTabs
              windows={
                <>
                  <p className={styles.cmdLabel}>Change the path to where you put the folder.</p>
                  <Cmd lang="powershell" code={CMD.cdWin} />
                </>
              }
              mac={
                <>
                  <p className={styles.cmdLabel}>In Codespaces you are already there.</p>
                  <Cmd code={CMD.cdMac} />
                </>
              }
            />
          </CmdBlock>

          <CmdBlock title="Activate the virtual environment (every new terminal)">
            <OsTabs
              windows={
                <>
                  <Cmd lang="powershell" code={CMD.activateWin} />
                  <p className={styles.cmdLabel}>
                    "Running scripts is disabled on this system"? Run this once, then activate again:
                  </p>
                  <Cmd lang="powershell" code={CMD.executionPolicy} />
                  <p className={styles.cmdLabel}>Using Command Prompt instead of PowerShell:</p>
                  <Cmd lang="bat" code={CMD.activateCmd} />
                </>
              }
              mac={<Cmd code={CMD.activateMac} />}
            />
            <p>
              You should now see <code>(.venv)</code> at the start of the line.
            </p>
          </CmdBlock>

          <CmdBlock title="Am I ready?">
            <p className={styles.cmdLabel}>Both Windows and Mac / Linux:</p>
            <Cmd code={CMD.checkSetup} />
          </CmdBlock>

          <CmdBlock title="Start the bot (bot terminal; leave it running)">
            <OsTabs
              windows={
                <>
                  <Cmd lang="powershell" code={CMD.cdBotWin} />
                  <Cmd lang="powershell" code={CMD.uvicorn} />
                </>
              }
              mac={
                <>
                  <Cmd code={CMD.cdBotMac} />
                  <Cmd code={CMD.uvicorn} />
                </>
              }
            />
            <p>
              Open <ExternalLink href="http://localhost:8000">http://localhost:8000</ExternalLink>{' '}
              (Codespaces: port 8000 in the <strong>Ports</strong> panel). <strong>Ctrl+C</strong>{' '}
              stops the bot.
            </p>
          </CmdBlock>

          <CmdBlock title="Back to the project folder from a step folder">
            <OsTabs
              windows={<Cmd lang="powershell" code={CMD.backWin} />}
              mac={<Cmd code={CMD.backMac} />}
            />
          </CmdBlock>

          <CmdBlock
            title={
              <>
                Fell behind? Copy in a finished step (replace <code>step3</code> with{' '}
                <code>step1</code> to <code>step9</code>)
              </>
            }>
            <p className={styles.cmdLabel}>Both Windows and Mac / Linux:</p>
            <Cmd code={CMD.checkpoint} />
            <p>
              Your own file is kept next to it as <code>&lt;name&gt;.mine</code>.
            </p>
          </CmdBlock>

          <CmdBlock title="Part 2: plant a bug, then always remove it">
            <p className={styles.cmdLabel}>Both Windows and Mac / Linux, from the project folder:</p>
            <Cmd code={CMD.plantLiar} />
            <Cmd code={CMD.plantOff} />
            <p>
              From inside a step folder (<code>evaluate/stepN</code>), use{' '}
              <code>{String.raw`..\..\plant_bug.py`}</code> on Windows or{' '}
              <code>../../plant_bug.py</code> on Mac / Linux.
            </p>
          </CmdBlock>

          <CmdBlock title="Run all the tests and see the scoreboard">
            <p className={styles.cmdLabel}>
              Both Windows and Mac / Linux, from the project folder, with the bot running:
            </p>
            <Cmd code={CMD.pytest} />
            <p>
              Then open <code>evaluate/report.html</code> in your browser.
              <br />
              <strong>Codespaces:</strong> start this in a separate terminal, then open port 8080 in
              the <strong>Ports</strong> panel and click <code>report.html</code>:
            </p>
            <Cmd code={CMD.httpServer} />
          </CmdBlock>

          <CmdBlock title={'"Port 8000 is already in use"'}>
            <OsTabs
              windows={<Cmd lang="powershell" code={CMD.killPortWin} />}
              mac={<Cmd code={CMD.killPortMac} />}
            />
            <p>No output means it worked.</p>
          </CmdBlock>

          <CmdBlock title="Finished for the day">
            <p className={styles.cmdLabel}>Both Windows and Mac / Linux:</p>
            <Cmd code={CMD.deactivate} />
            <p>
              Codespaces: also <strong>Stop Current Codespace</strong> (bottom-left menu).
            </p>
          </CmdBlock>

          <p className={styles.tip}>
            Uncommenting the TODO lines: select them and press <strong>Ctrl+/</strong> (Mac:{' '}
            <strong>Cmd+/</strong>). On a Belgian AZERTY or German keyboard where that does nothing,
            use <strong>Edit → Toggle Line Comment</strong>.
          </p>
        </section>

        <section className={shared.section}>
          <Heading as="h2" id="steps">The 9 steps</Heading>
          <p className={shared.intro}>
            Each step folder has a README with what to do, how to run it, and how you know you're done.
          </p>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Step</th>
                  <th>What you do</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.groupRow}>
                  <td colSpan={3}>Part 1 · Build</td>
                </tr>
                <StepRows rows={buildSteps} />
                <tr className={styles.groupRow}>
                  <td colSpan={3}>Part 2 · Test</td>
                </tr>
                <StepRows rows={testSteps} />
              </tbody>
            </table>
          </div>
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
                Fell behind? <code>python checkpoint.py step3</code> (or the notebook's{' '}
                <strong>Short on time?</strong> cell).
              </li>
              <li>Raise your hand, or ask your neighbour. Nobody gets left behind.</li>
            </ol>
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
