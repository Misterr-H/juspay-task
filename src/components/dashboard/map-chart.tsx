import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"
import { locationsData } from "@/lib/dashboard-data"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

export function MapChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">
          Revenue by Location
        </h3>
      </div>
      
      <div className="flex flex-col gap-6">
        {/* World Map */}
        <div className="relative w-full h-[200px] bg-muted/20 rounded-lg overflow-hidden">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 100,
              center: [0, 20],
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--background))"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "hsl(var(--muted))" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {locationsData.map((location) => (
              <Marker
                key={location.name}
                coordinates={[location.lng, location.lat]}
              >
                <circle
                  r={4}
                  fill="hsl(var(--foreground))"
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                />
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* Location List with Progress Bars */}
        <div className="space-y-3">
          {locationsData.map((location) => {
            const percentage = (location.numericValue / location.maxValue) * 100
            return (
              <div key={location.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">
                    {location.name}
                  </span>
                  <span className="text-foreground font-semibold">
                    {location.value}
                  </span>
                </div>
                <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

