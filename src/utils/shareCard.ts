// ── Share card canvas generator ───────────────────────────────────────────────

export type MilestoneType =
  | 'level-up'
  | 'streak-7'
  | 'streak-30'
  | 'challenge-complete'
  | 'human-score-90'
  | 'unlooped'

export interface MilestoneData {
  type: MilestoneType
  id: string            // unique ID for dedup
  achievement: string   // e.g. "Level 5: Directing"
  subtitle: string      // e.g. "i'm 5 levels into taking my phone back"
  daysActive?: number   // for unlooped card
}

export function buildMilestoneData(
  type: MilestoneType,
  params: {
    level?: number
    levelName?: string
    streakDays?: number
    challengeName?: string
    humanScore?: number
    daysActive?: number
  }
): MilestoneData {
  switch (type) {
    case 'level-up':
      return {
        type,
        id: `level-${params.level}`,
        achievement: `Level ${params.level}: ${params.levelName}`,
        subtitle: `i'm ${params.level} level${params.level !== 1 ? 's' : ''} into taking my phone back`,
      }
    case 'streak-7':
      return {
        type,
        id: 'streak-7',
        achievement: '7 Day Streak',
        subtitle: '7 days of choosing how i use my phone',
      }
    case 'streak-30':
      return {
        type,
        id: 'streak-30',
        achievement: '30 Day Streak',
        subtitle: '30 days of choosing how i use my phone',
      }
    case 'challenge-complete':
      return {
        type,
        id: `challenge-${params.challengeName ?? 'done'}`,
        achievement: `${params.challengeName ?? 'Challenge'} Complete`,
        subtitle: `${params.challengeName ?? 'challenge'} complete. done.`,
      }
    case 'human-score-90':
      return {
        type,
        id: `score-${params.humanScore}`,
        achievement: `Human Score: ${params.humanScore}`,
        subtitle: `scored a ${params.humanScore} out of 100 on intentional phone use today`,
      }
    case 'unlooped':
      return {
        type,
        id: 'unlooped',
        achievement: 'Unlooped',
        subtitle: `fully unlooped. took ${params.daysActive ?? '?'} days but i did it.`,
        daysActive: params.daysActive,
      }
  }
}

// ── Canvas card generation ────────────────────────────────────────────────────

export async function generateShareCard(milestone: MilestoneData): Promise<string> {
  const W = 1200
  const H = 630

  const canvas = document.createElement('canvas')
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Background
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, W, H)

  // Subtle grid pattern
  ctx.strokeStyle = '#F1F5F9'
  ctx.lineWidth   = 1
  for (let x = 0; x <= W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
  }
  for (let y = 0; y <= H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
  }

  // Left panel – wordmark
  const leftX = 80
  const leftY = H / 2

  ctx.fillStyle = '#2563EB'
  ctx.font      = 'bold 48px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText('unloop', leftX, leftY - 16)

  ctx.fillStyle = '#94A3B8'
  ctx.font      = '20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  ctx.fillText('break the loop', leftX, leftY + 24)

  // Divider
  ctx.strokeStyle = '#E2E8F0'
  ctx.lineWidth   = 1
  ctx.beginPath()
  ctx.moveTo(360, 80); ctx.lineTo(360, H - 80)
  ctx.stroke()

  // Right divider
  ctx.beginPath()
  ctx.moveTo(W - 360, 80); ctx.lineTo(W - 360, H - 80)
  ctx.stroke()

  // Center – achievement
  const centerX = W / 2
  ctx.textAlign = 'center'

  // Achievement title
  ctx.fillStyle = '#1E293B'
  ctx.font      = `bold ${milestone.type === 'unlooped' ? 64 : 52}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  ctx.textBaseline = 'middle'
  ctx.fillText(milestone.achievement, centerX, H / 2 - 32)

  // Subtitle
  ctx.fillStyle = '#64748B'
  ctx.font      = '22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'

  // Wrap subtitle text
  const words = milestone.subtitle.split(' ')
  const maxWidth = 380
  let line = ''
  let lineY = H / 2 + 32
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, centerX, lineY)
      line  = word
      lineY += 32
    } else {
      line = test
    }
  }
  if (line) ctx.fillText(line, centerX, lineY)

  // Right panel – loop visual (simple concentric arcs)
  const rxCenter = W - 180
  const ryCenter = H / 2
  const radii    = [20, 38, 56, 74]

  radii.forEach((r, i) => {
    ctx.beginPath()
    ctx.arc(rxCenter, ryCenter, r, 0, Math.PI * 2)
    ctx.strokeStyle = i === 0 ? '#2563EB' : `rgba(37, 99, 235, ${0.6 - i * 0.12})`
    ctx.lineWidth   = i === 0 ? 3 : 2
    ctx.stroke()
  })

  // Blue dot center
  ctx.beginPath()
  ctx.arc(rxCenter, ryCenter, 8, 0, Math.PI * 2)
  ctx.fillStyle = '#2563EB'
  ctx.fill()

  // Footer URL
  ctx.fillStyle   = '#CBD5E1'
  ctx.font        = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  ctx.textAlign   = 'center'
  ctx.textBaseline = 'bottom'
  ctx.fillText('unloop.app', W / 2, H - 28)

  return canvas.toDataURL('image/png')
}
