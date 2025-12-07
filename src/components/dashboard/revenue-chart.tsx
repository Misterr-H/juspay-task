import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { revenueData, revenueWeekTotals } from "@/lib/dashboard-data"

export function RevenueChart() {
  // Format Y-axis values
  const formatYAxis = (value: number) => {
    return `${value / 1000000}M`
  }

  // Custom legend
  const renderLegend = () => {
    return (
      <div className="flex items-center gap-6 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-foreground" />
          <span className="text-muted-foreground">Current Week</span>
          <span className="font-semibold text-foreground">
            ${revenueWeekTotals.currentWeek.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-muted-foreground/50" />
          <span className="text-muted-foreground">Previous Week</span>
          <span className="font-semibold text-foreground">
            ${revenueWeekTotals.previousWeek.toLocaleString()}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground mb-4">Revenue</h3>
        {renderLegend()}
      </div>
      <ResponsiveContainer width="100%" height={384}>
        <LineChart
          data={revenueData}
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
          <Line
            type="monotone"
            dataKey="currentWeek"
            stroke="hsl(var(--foreground))"
            strokeWidth={2.5}
            dot={false}
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="previousWeek"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

