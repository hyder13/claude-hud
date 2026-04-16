import type { RenderContext } from '../types.js';
import { getTips, getCurrentTip } from '../tips.js';
import { green, tips } from './colors.js';

export function renderTipsLine(ctx: RenderContext): string | null {
  const display = ctx.config?.display;
  if (display?.showTips === false) return null;

  const allTips = getTips(ctx.config);
  if (allTips.length === 0) return null;

  const interval = display?.tipsInterval ?? 30;
  const tip = getCurrentTip(allTips, interval);
  if (!tip) return null;

  const colors = ctx.config?.colors;
  const icon = green('▶');
  return `${icon} ${tips(tip, colors)}`;
}
