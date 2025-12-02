import { useState } from "react"
import {
  LayoutDashboard,
  FolderKanban,
  ShoppingCart,
  BookOpen,
  User,
  Settings,
  Building2,
  FileText,
  Share2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface SidebarProps {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
}

interface NavItem {
  title: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  active?: boolean
  badge?: string
  children?: NavItem[]
  showDot?: boolean
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    href: "/overview",
    showDot: true,
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/projects",
    showDot: true,
  },
]

const dashboardItems: NavItem[] = [
  {
    title: "Default",
    icon: LayoutDashboard,
    href: "/dashboard/default",
    active: true,
  },
  {
    title: "eCommerce",
    icon: ShoppingCart,
    href: "/dashboard/ecommerce",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/dashboard/projects",
  },
  {
    title: "Online Courses",
    icon: BookOpen,
    href: "/dashboard/courses",
  },
]

const pageItems: NavItem[] = [
  {
    title: "User Profile",
    icon: User,
    href: "/pages/user-profile",
    children: [
      { title: "Overview", icon: LayoutDashboard, href: "/pages/user-profile/overview" },
      { title: "Projects", icon: FolderKanban, href: "/pages/user-profile/projects" },
      { title: "Campaigns", icon: Share2, href: "/pages/user-profile/campaigns" },
      { title: "Documents", icon: FileText, href: "/pages/user-profile/documents" },
      { title: "Followers", icon: User, href: "/pages/user-profile/followers" },
    ],
  },
  {
    title: "Account",
    icon: Settings,
    href: "/pages/account",
  },
  {
    title: "Corporate",
    icon: Building2,
    href: "/pages/corporate",
  },
  {
    title: "Blog",
    icon: FileText,
    href: "/pages/blog",
  },
  {
    title: "Social",
    icon: Share2,
    href: "/pages/social",
  },
]

export function Sidebar({ collapsed, onCollapsedChange }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"favorites" | "recently">("favorites")
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const Icon = item.icon
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.title}>
        <button
          onClick={() => hasChildren && toggleExpanded(item.title)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-normal transition-all group",
            item.active
              ? "bg-foreground text-background shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
            collapsed && "justify-center px-2",
            level > 0 && !collapsed && "pl-9 text-[13px]"
          )}
        >
          {item.showDot && !collapsed ? (
            <span className="h-[6px] w-[6px] rounded-full bg-muted-foreground/50 flex-shrink-0" />
          ) : (
            <Icon className={cn("h-4 w-4 flex-shrink-0")} />
          )}
          {!collapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.title}</span>
              {hasChildren && (
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform flex-shrink-0",
                    isExpanded && "rotate-90"
                  )}
                />
              )}
            </>
          )}
        </button>
        {hasChildren && isExpanded && !collapsed && (
          <div className="mt-1 space-y-1">
            {item.children?.map((child) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-background border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* User Section */}
      <div className="flex items-center gap-3 p-4">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="/avatar-placeholder.png" />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-medium">
            BW
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <span className="font-semibold text-sm">ByeWind</span>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3">
        {/* Favorites/Recently Tabs */}
        {!collapsed && (
          <div className="flex gap-8 mb-4 px-2">
            <button
              onClick={() => setActiveTab("favorites")}
              className={cn(
                "relative py-2.5 text-[13px] font-normal transition-colors",
                activeTab === "favorites"
                  ? "font-medium"
                  : "hover:opacity-60"
              )}
              style={{
                color: activeTab === "favorites" ? "#1C1C1C66" : "#1C1C1C33"
              }}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveTab("recently")}
              className={cn(
                "relative py-2.5 text-[13px] font-normal transition-colors",
                activeTab === "recently"
                  ? "font-medium"
                  : "hover:opacity-60"
              )}
              style={{
                color: activeTab === "recently" ? "#1C1C1C66" : "#1C1C1C33"
              }}
            >
              Recently
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <div className="space-y-1 mb-6">
          {navItems.map((item) => renderNavItem(item))}
        </div>

        {/* Dashboards Section */}
        <div className="mb-6">
          {!collapsed && (
            <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Dashboards
            </h3>
          )}
          <div className="space-y-1">
            {dashboardItems.map((item) => renderNavItem(item))}
          </div>
        </div>

        {/* Pages Section */}
        <div>
          {!collapsed && (
            <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Pages
            </h3>
          )}
          <div className="space-y-1">
            {pageItems.map((item) => renderNavItem(item))}
          </div>
        </div>
      </div>

      {/* Collapse Toggle Button */}
      <div className="p-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCollapsedChange(!collapsed)}
          className={cn(
            "w-full justify-center h-8",
            collapsed && "px-2"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}

