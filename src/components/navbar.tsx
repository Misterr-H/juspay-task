import {
  Search,
  Star,
  Clock,
  Bell,
  PanelLeft,
  PanelRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useRef } from "react"

interface NavbarProps {
  sidebarCollapsed: boolean
  onMenuClick: () => void
  onRightSidebarToggle: () => void
}

export function Navbar({ onMenuClick, onRightSidebarToggle }: NavbarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-2">
          {/* 1. Sidebar Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={onMenuClick}
          >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          {/* 2. Star Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
          >
            <Star className="h-5 w-5" />
            <span className="sr-only">Favorites</span>
          </Button>

          {/* 3. Breadcrumb */}
          <div className="flex items-center gap-2 text-sm ml-2">
            <span className="text-muted-foreground">Dashboards</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">Default</span>
          </div>
        </div>

        {/* SPACER */}
        <div className="flex-1" />

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {/* 1. Search Input */}
          <div className="relative w-60">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground/50" 
            />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search"
              className="pl-9 pr-20 h-9 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-muted text-foreground placeholder:text-muted-foreground/50"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium opacity-100 text-muted-foreground/50">
              <span className="text-lg">{isMac ? '⌘' : 'Ctrl'}</span>
              <span className="text-md">/</span>
            </kbd>
          </div>

          {/* 2. Dark Mode Toggle */}
          <ThemeToggle />

          {/* 3. History Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
          >
            <Clock className="h-5 w-5" />
            <span className="sr-only">History</span>
          </Button>

          {/* 4. Notification Bell Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={onRightSidebarToggle}
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* 5. Right Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={onRightSidebarToggle}
          >
            <PanelRight className="h-5 w-5" />
            <span className="sr-only">Toggle right sidebar</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}

