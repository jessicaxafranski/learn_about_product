# Claude Code Commands

## Slash Commands

| Command | What it does |
|---|---|
| `/help` | List all available slash commands |
| `/clear` | Clear the conversation history (frees up context window) |
| `/compact` | Summarize the conversation to save tokens without losing context |
| `/config` | Open Claude Code settings |
| `/cost` | Show token usage and cost for the current session |
| `/init` | Generate a `CLAUDE.md` file for the current project |
| `/memory` | Open the memory file for editing |
| `/model` | Switch the AI model (Opus, Sonnet, Haiku) |
| `/review` | Review current code changes for bugs and improvements |
| `/status` | Show git status of the current repo |
| `/doctor` | Check Claude Code installation health |
| `/login` | Authenticate with your Anthropic account |
| `/logout` | Log out of your Anthropic account |
| `/exit` | Exit Claude Code |

---

## CLI Flags (used when launching from terminal)

| Flag | What it does |
|---|---|
| `-p` / `--print` | Run a single prompt and print the response — no interactive session |
| `-c` / `--continue` | Continue the last conversation |
| `--model <name>` | Set the model for the session (e.g. `--model claude-opus-4-7`) |
| `--allowedTools <list>` | Whitelist specific tools Claude can use |
| `--dangerouslySkipPermissions` | Skip all approval prompts — **sandbox only, never on real data** |
| `--verbose` | Show full output including internal reasoning |
| `--output-format json` | Return response as JSON (useful for scripting) |

---

## Keyboard Shortcuts

| Shortcut | What it does |
|---|---|
| `Shift + Tab` | Toggle auto-accept mode (Claude executes without asking) |
| `Ctrl + C` | Cancel the current action |
| `Ctrl + L` | Clear the screen |
| `↑` | Navigate to previous message in history |

---

## In-Chat References

| Syntax | What it does |
|---|---|
| `@filename` | Reference a specific file in your message |
| `@folder/` | Reference an entire folder |
| `#` | Reference a git commit, branch, or issue |

---

## Models Available

| Model | Best for |
|---|---|
| `claude-opus-4-7` | Most capable — complex reasoning, architecture, hard bugs |
| `claude-sonnet-4-6` | Balanced — everyday tasks, coding, writing |
| `claude-haiku-4-5` | Fastest — quick lookups, simple edits, high-volume tasks |
