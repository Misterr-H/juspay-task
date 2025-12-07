import { TrendingUp, TrendingDown } from "lucide-react"
import { statsData } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className={cn(
            "rounded-2xl p-6 transition-all hover:shadow-md",
            stat.bgColor,
            "border border-border/50"
          )}
        >
          <div className="flex flex-col gap-3">
            {/* Label */}
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>

            {/* Value and Change */}
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-semibold text-foreground">
                {stat.value}
              </h3>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  stat.isPositive ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
                )}
              >
                {stat.isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

