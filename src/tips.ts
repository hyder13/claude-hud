import type { HudConfig, TipsLanguage } from './config.js';

export interface Tip {
  category: 'command' | 'shortcut' | 'workflow' | 'concept';
  text: string;
}

const BUILTIN_TIPS_ZH_TW: Tip[] = [
  // Commands
  { category: 'command', text: '/help 查看所有命令和技能' },
  { category: 'command', text: '/plan 進入規劃模式，先想再做' },
  { category: 'command', text: '/commit 自動產生 commit message' },
  { category: 'command', text: '/review 讓 Claude 審查你的 PR' },
  { category: 'command', text: '/init 自動產生 CLAUDE.md 專案說明' },
  { category: 'command', text: '/compact 壓縮對話，釋放 context 空間' },
  { category: 'command', text: '/clear 清除對話記錄，重新開始' },
  { category: 'command', text: '/model 切換模型（Opus / Sonnet / Haiku）' },

  // Shortcuts
  { category: 'shortcut', text: 'Shift+Tab 切換權限模式（bypass / normal）' },
  { category: 'shortcut', text: 'Ctrl+C 中斷 Claude 當前操作' },
  { category: 'shortcut', text: 'Esc 兩次可清空輸入' },
  { category: 'shortcut', text: '! command — 在對話中直接執行 shell 命令' },
  { category: 'shortcut', text: '@ 可以引用檔案路徑，自動補全' },

  // Workflow
  { category: 'workflow', text: 'CLAUDE.md 是你的專案說明書，Claude 每次都會讀' },
  { category: 'workflow', text: '先寫 spec 再讓 Claude 寫 code，品質更好' },
  { category: 'workflow', text: '可以把圖片拖進對話，Claude 看得懂截圖' },
  { category: 'workflow', text: '善用 Agent 子任務，讓 Claude 平行處理多件事' },
  { category: 'workflow', text: '用 /plan 先規劃再執行，避免 Claude 走歪' },

  // Concepts
  { category: 'concept', text: 'Context 是對話記憶容量，快滿時用 /compact' },
  { category: 'concept', text: 'Usage 是 API 用量，5 小時重置一次' },
  { category: 'concept', text: 'Agent 是 Claude 派出的子任務，可平行工作' },
  { category: 'concept', text: 'MCP 是外部工具整合，讓 Claude 操作瀏覽器等' },
  { category: 'concept', text: 'Hooks 是自動化觸發器，在特定事件時執行腳本' },
];

const BUILTIN_TIPS_EN: Tip[] = [
  // Commands
  { category: 'command', text: '/help — view all commands and skills' },
  { category: 'command', text: '/plan — enter planning mode before coding' },
  { category: 'command', text: '/commit — auto-generate commit messages' },
  { category: 'command', text: '/review — let Claude review your PR' },
  { category: 'command', text: '/init — auto-generate CLAUDE.md for your project' },
  { category: 'command', text: '/compact — compress conversation to free context' },
  { category: 'command', text: '/clear — clear conversation and start fresh' },
  { category: 'command', text: '/model — switch models (Opus / Sonnet / Haiku)' },

  // Shortcuts
  { category: 'shortcut', text: 'Shift+Tab to toggle permission mode (bypass / normal)' },
  { category: 'shortcut', text: 'Ctrl+C to interrupt Claude\'s current action' },
  { category: 'shortcut', text: 'Esc twice to clear your input' },
  { category: 'shortcut', text: '! command — run shell commands inline' },
  { category: 'shortcut', text: '@ to reference file paths with autocomplete' },

  // Workflow
  { category: 'workflow', text: 'CLAUDE.md is your project guide — Claude reads it every time' },
  { category: 'workflow', text: 'Write specs first, then let Claude code — better results' },
  { category: 'workflow', text: 'Drag images into chat — Claude understands screenshots' },
  { category: 'workflow', text: 'Use Agent subasks to parallelize work' },
  { category: 'workflow', text: 'Use /plan before coding to keep Claude on track' },

  // Concepts
  { category: 'concept', text: 'Context is conversation memory — use /compact when full' },
  { category: 'concept', text: 'Usage is API quota — resets every 5 hours' },
  { category: 'concept', text: 'Agents are subtasks Claude dispatches in parallel' },
  { category: 'concept', text: 'MCP integrates external tools (browser, APIs, etc.)' },
  { category: 'concept', text: 'Hooks are automation triggers that run scripts on events' },
];

function getBuiltinTips(language: TipsLanguage): string[] {
  const tips = language === 'zh-TW' ? BUILTIN_TIPS_ZH_TW : BUILTIN_TIPS_EN;
  return tips.map(t => t.text);
}

export function getTips(config: HudConfig): string[] {
  const language = config.display?.tipsLanguage ?? 'zh-TW';
  const builtin = getBuiltinTips(language);
  const custom = Array.isArray(config.display?.customTips) ? config.display.customTips : [];

  // Custom tips first (priority), then builtin
  return [...custom, ...builtin];
}

export function getCurrentTip(tips: string[], intervalSeconds: number): string {
  if (tips.length === 0) return '';
  const index = Math.floor(Date.now() / (intervalSeconds * 1000)) % tips.length;
  return tips[index];
}
