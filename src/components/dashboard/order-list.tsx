import { useState } from 'react'
import { Plus, ListFilter, ArrowUpDown, Search, Calendar, ChevronLeft, ChevronRight, Copy } from 'lucide-react'
import { ordersData } from '@/lib/dashboard-data'
import type { OrderItem } from '@/lib/dashboard-data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ITEMS_PER_PAGE = 5

export function OrderList() {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter orders based on search
  const filteredOrders = ordersData.filter(order => 
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  // Select all checkbox
  const allSelected = currentOrders.length > 0 && currentOrders.every(order => selectedOrders.includes(order.id))
  const someSelected = currentOrders.some(order => selectedOrders.includes(order.id)) && !allSelected

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedOrders(prev => prev.filter(id => !currentOrders.find(order => order.id === id)))
    } else {
      setSelectedOrders(prev => [...new Set([...prev, ...currentOrders.map(order => order.id)])])
    }
  }

  const toggleSelectOrder = (orderId: number) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const getStatusBadge = (status: OrderItem['status']) => {
    const statusConfig = {
      'In Progress': {
        bgColor: 'bg-blue-100 dark:bg-blue-950/50',
        textColor: 'text-blue-700 dark:text-blue-400',
        dotColor: 'bg-blue-600 dark:bg-blue-500'
      },
      'Complete': {
        bgColor: 'bg-green-100 dark:bg-green-950/50',
        textColor: 'text-green-700 dark:text-green-400',
        dotColor: 'bg-green-600 dark:bg-green-500'
      },
      'Pending': {
        bgColor: 'bg-orange-100 dark:bg-orange-950/50',
        textColor: 'text-orange-700 dark:text-orange-400',
        dotColor: 'bg-orange-600 dark:bg-orange-500'
      },
      'Approved': {
        bgColor: 'bg-yellow-100 dark:bg-yellow-950/50',
        textColor: 'text-yellow-700 dark:text-yellow-600',
        dotColor: 'bg-yellow-600 dark:bg-yellow-500'
      },
      'Rejected': {
        bgColor: 'bg-gray-100 dark:bg-gray-800/50',
        textColor: 'text-gray-700 dark:text-gray-400',
        dotColor: 'bg-gray-600 dark:bg-gray-500'
      }
    }

    const config = statusConfig[status]

    return (
      <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', config.bgColor, config.textColor)}>
        <span className={cn('h-1.5 w-1.5 rounded-full', config.dotColor)} />
        {status}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-foreground">Order List</h1>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-border bg-card">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 hover:bg-muted"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 hover:bg-muted"
            >
              <ListFilter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 hover:bg-muted"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-muted/50 border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-6 w-12">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleSelectAll}
                    className={someSelected ? 'data-[state=checked]:bg-primary' : ''}
                  />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                  Order ID
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                  User
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                  Project
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                  Address
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => toggleSelectOrder(order.id)}
                    />
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-foreground">
                    {order.orderId}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={order.user.avatar} />
                        <AvatarFallback className="text-xs">
                          {order.user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground">
                        {order.user.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-foreground">
                    {order.project}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                      {order.address}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      {order.date}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="py-4 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-muted"
                    >
                      <span className="text-muted-foreground">⋯</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 p-6 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={cn(
                "h-8 w-8 p-0",
                currentPage === page && "bg-foreground text-background hover:bg-foreground/90"
              )}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
