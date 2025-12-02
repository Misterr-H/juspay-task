import {
  Search,
  Star,
  Clock,
  Bell,
  Settings,
  LayoutGrid,
  ChevronRight,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface NavbarProps {
  sidebarCollapsed: boolean
  onMenuClick: () => void
}

export function Navbar({ sidebarCollapsed, onMenuClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="flex h-14 items-center gap-4 px-6">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboards</span>
          </button>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-foreground">Default</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-9 h-9 bg-muted/40 border-border focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-0.5">
          {/* Star/Bookmark */}
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
            <Star className="h-[1.1rem] w-[1.1rem]" />
            <span className="sr-only">Favorites</span>
          </Button>

          {/* History/Clock */}
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
            <Clock className="h-[1.1rem] w-[1.1rem]" />
            <span className="sr-only">History</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-foreground">
            <Bell className="h-[1.1rem] w-[1.1rem]" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500 border border-background" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Sidebar Toggle (Desktop) */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={onMenuClick}
          >
            <LayoutGrid className="h-[1.1rem] w-[1.1rem]" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

