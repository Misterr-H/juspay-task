import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { projectionsData } from "@/lib/dashboard-data"

export function ProjectionsChart() {
  // Format Y-axis values
  const formatYAxis = (value: number) => {
    return `${value / 1000000}M`
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">
          Projections vs Actuals
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={projectionsData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickFormatter={formatYAxis}
            ticks={[0, 10000000, 20000000, 30000000]}
          />
          <Bar
            dataKey="projections"
            stackId="a"
            fill="#A8C5DA"
            radius={[0, 0, 4, 4]}
            maxBarSize={32}
          />
          <Bar
            dataKey="actuals"
            stackId="a"
            fill="#6C93B8"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

