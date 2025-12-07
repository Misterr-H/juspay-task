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
import { cn } from "@/lib/utils"

interface SidebarProps {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
  onNavigate: (view: 'default' | 'ecommerce') => void
  activeView: 'default' | 'ecommerce'
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

export function Sidebar({ collapsed, onCollapsedChange, onNavigate, activeView }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"favorites" | "recently">("favorites")
  const [expandedItems, setExpandedItems] = useState<string[]>(["User Profile"])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const Icon = item.icon
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0
    
    const handleClick = () => {
      if (hasChildren) {
        toggleExpanded(item.title)
      } else if (item.title === 'Default') {
        onNavigate('default')
      } else if (item.title === 'eCommerce') {
        onNavigate('ecommerce')
      }
    }

    return (
      <div key={item.title}>
        <button
          onClick={handleClick}
          className={cn(
            "w-full flex items-center gap-3 py-2 rounded-lg text-[14px] font-normal transition-all group relative",
            item.active || (item.title === 'Default' && activeView === 'default') || (item.title === 'eCommerce' && activeView === 'ecommerce')
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            collapsed ? "justify-center px-2" : "pr-3",
            level > 0 && !collapsed ? "pl-9 text-[13px]" : !collapsed && "pl-3"
          )}
        >
          {/* Bold left border for active item */}
          {(item.active || (item.title === 'Default' && activeView === 'default') || (item.title === 'eCommerce' && activeView === 'ecommerce')) && (
            <span className="absolute left-0 top-1.5 bottom-0 w-[4px] bg-foreground rounded-full h-3/5" />
          )}
          
          {/* Chevron for collapsible items OR placeholder space for alignment */}
          {!collapsed && (
            hasChildren ? (
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform flex-shrink-0",
                  isExpanded && "rotate-90"
                )}
              />
            ) : (
              <span className="w-4 flex-shrink-0" />
            )
          )}
          
          {item.showDot && !collapsed ? (
            <span className="h-[6px] w-[6px] rounded-full bg-muted-foreground/50 flex-shrink-0" />
          ) : (
            <Icon className={cn("h-4 w-4 flex-shrink-0")} />
          )}
          {!collapsed && (
            <span className="flex-1 text-left truncate">{item.title}</span>
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
                  ? "font-medium text-foreground/60"
                  : "text-foreground/30 hover:opacity-60"
              )}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveTab("recently")}
              className={cn(
                "relative py-2.5 text-[13px] font-normal transition-colors",
                activeTab === "recently"
                  ? "font-medium text-foreground/60"
                  : "text-foreground/30 hover:opacity-60"
              )}
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
            <h3 className="px-3 mb-2 text-xs font-normal text-left text-foreground/60">
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
            <h3 className="px-3 mb-2 text-xs font-normal text-left text-foreground/60">
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

