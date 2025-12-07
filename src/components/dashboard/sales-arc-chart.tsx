import { useState } from "react"
import { salesChannelsData } from "@/lib/dashboard-data"

export function SalesArcChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Calculate total for percentages
  const total = salesChannelsData.reduce((sum, item) => sum + item.value, 0)

  // Calculate start and end angles for each arc
  const radius = 80
  const innerRadius = 55
  const centerX = 100
  const centerY = 100
  const gapAngle = 5 // Gap between arcs in degrees

  // Function to create arc path
  const createArcPath = (
    startAngle: number,
    endAngle: number,
    outerRadius: number,
    innerRadius: number
  ) => {
    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180

    const x1 = centerX + outerRadius * Math.cos(startAngleRad)
    const y1 = centerY + outerRadius * Math.sin(startAngleRad)
    const x2 = centerX + outerRadius * Math.cos(endAngleRad)
    const y2 = centerY + outerRadius * Math.sin(endAngleRad)
    const x3 = centerX + innerRadius * Math.cos(endAngleRad)
    const y3 = centerY + innerRadius * Math.sin(endAngleRad)
    const x4 = centerX + innerRadius * Math.cos(startAngleRad)
    const y4 = centerY + innerRadius * Math.sin(startAngleRad)

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

    return `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
      Z
    `
  }

  // Calculate arcs
  let currentAngle = -90 // Start from top
  const arcs = salesChannelsData.map((item) => {
    const percentage = (item.value / total) * 100
    const arcAngle = (percentage / 100) * 360 - gapAngle
    const startAngle = currentAngle
    const endAngle = currentAngle + arcAngle

    currentAngle = endAngle + gapAngle

    return {
      ...item,
      startAngle,
      endAngle,
      percentage,
      path: createArcPath(startAngle, endAngle, radius, innerRadius),
    }
  })

  const displayedPercentage = hoveredIndex !== null 
    ? arcs[hoveredIndex].percentage 
    : arcs[0].percentage

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">Total Sales</h3>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* SVG Chart */}
        <div className="relative w-full max-w-[240px] aspect-square">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {arcs.map((arc, index) => (
              <g key={index}>
                <path
                  d={arc.path}
                  fill={arc.color}
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.5,
                    filter:
                      hoveredIndex === index
                        ? "brightness(1.1) drop-shadow(0px 2px 4px rgba(0,0,0,0.2))"
                        : "none",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            ))}
            {/* Center Text */}
            <text
              x={centerX}
              y={centerY - 5}
              textAnchor="middle"
              className="fill-foreground text-2xl font-bold"
            >
              {displayedPercentage.toFixed(1)}%
            </text>
            <text
              x={centerX}
              y={centerY + 15}
              textAnchor="middle"
              className="fill-muted-foreground text-xs"
            >
              {hoveredIndex !== null ? arcs[hoveredIndex].name : arcs[0].name}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="w-full space-y-3">
          {salesChannelsData.map((channel, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm cursor-pointer transition-opacity hover:opacity-80"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: channel.color }}
                />
                <span className="text-muted-foreground">{channel.name}</span>
              </div>
              <span className="font-semibold text-foreground">
                ${channel.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

