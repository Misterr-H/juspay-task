import { Bug, User, Radio } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface RightSidebarProps {
  isOpen: boolean
}

interface Notification {
  id: string
  icon: React.ComponentType<{ className?: string }>
  text: string
  timestamp: string
}

interface Activity {
  id: string
  avatar: string
  avatarFallback: string
  text: string
  timestamp: string
}

interface Contact {
  id: string
  name: string
  avatar: string
  avatarFallback: string
}

const notifications: Notification[] = [
  {
    id: "1",
    icon: Bug,
    text: "You have a bug that needs...",
    timestamp: "Just now",
  },
  {
    id: "2",
    icon: User,
    text: "New user registered",
    timestamp: "59 minutes ago",
  },
  {
    id: "3",
    icon: Bug,
    text: "You have a bug that needs...",
    timestamp: "12 hours ago",
  },
  {
    id: "4",
    icon: Radio,
    text: "Andi Lane subscribed to you",
    timestamp: "Today, 11:59 AM",
  },
]

const activities: Activity[] = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?img=1",
    avatarFallback: "BL",
    text: "You have a bug that needs...",
    timestamp: "Just now",
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/150?img=2",
    avatarFallback: "HS",
    text: "Released a new version",
    timestamp: "59 minutes ago",
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/150?img=3",
    avatarFallback: "AK",
    text: "Submitted a bug",
    timestamp: "12 hours ago",
  },
  {
    id: "4",
    avatar: "https://i.pravatar.cc/150?img=4",
    avatarFallback: "JD",
    text: "Modified A data in Page X",
    timestamp: "Today, 11:59 AM",
  },
  {
    id: "5",
    avatar: "https://i.pravatar.cc/150?img=5",
    avatarFallback: "SM",
    text: "Deleted a page in Project X",
    timestamp: "Feb 2, 2023",
  },
]

const contacts: Contact[] = [
  {
    id: "1",
    name: "Natali Craig",
    avatar: "https://i.pravatar.cc/150?img=10",
    avatarFallback: "NC",
  },
  {
    id: "2",
    name: "Drew Cano",
    avatar: "https://i.pravatar.cc/150?img=11",
    avatarFallback: "DC",
  },
  {
    id: "3",
    name: "Orlando Diggs",
    avatar: "https://i.pravatar.cc/150?img=12",
    avatarFallback: "OD",
  },
  {
    id: "4",
    name: "Andi Lane",
    avatar: "https://i.pravatar.cc/150?img=13",
    avatarFallback: "AL",
  },
  {
    id: "5",
    name: "Kate Morrison",
    avatar: "https://i.pravatar.cc/150?img=14",
    avatarFallback: "KM",
  },
  {
    id: "6",
    name: "Koray Okumus",
    avatar: "https://i.pravatar.cc/150?img=15",
    avatarFallback: "KO",
  },
]

export function RightSidebar({ isOpen }: RightSidebarProps) {
  return (
    <aside
      className={cn(
        "h-screen bg-background border-l border-border flex flex-col transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "w-[280px]" : "w-0 border-l-0"
      )}
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-8">
        {/* Notifications Section */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground text-left">Notifications</h3>
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = notification.icon
              return (
                <div key={notification.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed text-left">{notification.text}</p>
                    <p className="text-xs text-muted-foreground mt-1 text-left">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Activities Section */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground text-left">Activities</h3>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-border" />
            
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 relative">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-8 w-8 border-2 border-background relative z-10">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-medium">
                        {activity.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-sm text-foreground leading-tight truncate text-left">{activity.text}</p>
                    <p className="text-xs mt-1 text-left text-muted-foreground/60">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contacts Section */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground text-left">Contacts</h3>
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-medium">
                    {contact.avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground">{contact.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

