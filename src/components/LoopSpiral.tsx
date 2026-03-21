import styles from './LoopSpiral.module.css'

interface Props {
  level?: number
  size?: number
}

interface RingConfig {
  r: number
  dashArray: string
  rotation: number
  opacity: number
  strokeWidth: number
}

function getSpiralRings(level: number): RingConfig[] {
  // Level 1 = 7 tight rings; Level 7 = 2 open rings
  const t = (level - 1) / 6              // 0 → 1
  const numRings = Math.round(7 - t * 5)  // 7 → 2
  const spacing = 7 + t * 11             // 7 → 18px gap between rings
  const gapDeg = 22 + t * 44             // 22° → 66° gap opening
  const baseR = 12

  return Array.from({ length: numRings }, (_, i) => {
    const r = baseR + i * spacing
    const circ = Math.PI * 2 * r
    const gapFrac = gapDeg / 360
    return {
      r,
      dashArray: `${circ * (1 - gapFrac)} ${circ * gapFrac}`,
      rotation: -90 + i * 28,            // gaps spiral around ~28° per ring
      opacity: Math.max(0.45, 1 - i * 0.08),
      strokeWidth: Math.max(1.2, 2.2 - t * 0.8 - i * 0.06),
    }
  })
}

export default function LoopSpiral({ level = 1, size = 200 }: Props) {
  const rings = getSpiralRings(level)
  const cx = 100
  const cy = 100
  const id = `spiralGlow-${level}`

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={styles.svg}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#2563EB" stopOpacity="0.18" />
          <stop offset="60%"  stopColor="#2563EB" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </radialGradient>
        <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient glow disc */}
      <circle cx={cx} cy={cy} r="88" fill={`url(#${id})`} />

      {/* Rings — slow rotation group */}
      <g className={styles.rings} filter="url(#ringGlow)">
        {rings.map((ring, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={ring.r}
            fill="none"
            stroke="#2563EB"
            strokeWidth={ring.strokeWidth}
            strokeDasharray={ring.dashArray}
            strokeLinecap="round"
            transform={`rotate(${ring.rotation}, ${cx}, ${cy})`}
            style={{ opacity: ring.opacity }}
          />
        ))}
      </g>

      {/* Inner pulse dot */}
      <circle cx={cx} cy={cy} r="4" fill="#2563EB" className={styles.centerDot} />
      <circle cx={cx} cy={cy} r="8" fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.35" className={styles.centerRing} />
    </svg>
  )
}
