import { useState } from 'react'
import { Sidebar } from './components/sidebar'
import { Navbar } from './components/navbar'
import { RightSidebar } from './components/right-sidebar'
import { StatsCards } from './components/dashboard/stats-cards'
import { ProjectionsChart } from './components/dashboard/projections-chart'
import { RevenueChart } from './components/dashboard/revenue-chart'
import { MapChart } from './components/dashboard/map-chart'
import { ProductsTable } from './components/dashboard/products-table'
import { SalesArcChart } from './components/dashboard/sales-arc-chart'
import { OrderList } from './components/dashboard/order-list'
import './App.css'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [activeView, setActiveView] = useState<'default' | 'ecommerce'>('default')

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        onNavigate={setActiveView}
        activeView={activeView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          sidebarCollapsed={sidebarCollapsed}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          onRightSidebarToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
          {activeView === 'default' ? (
            <div className="max-w-[1600px] space-y-6">
              {/* Page Header */}
              <div className='w-full flex items-start'>
                <h1 className="text-lg font-semibold">eCommerce</h1>
              </div>

              {/* First Row: Stats Cards (2x2) + Projections Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Stats Cards in 2x2 grid */}
                <StatsCards />
                {/* Right: Projections Chart */}
                <ProjectionsChart />
              </div>

              {/* Second Row: Revenue Line Chart + Map */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-4">
                  <RevenueChart />
                </div>
                <div className="lg:col-span-1">
                  <MapChart />
                </div>
              </div>

              {/* Third Row: Products Table + Sales Arc Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-4">
                  <ProductsTable />
                </div>
                <div className="lg:col-span-1">
                  <SalesArcChart />
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[1600px]">
              <OrderList />
            </div>
          )}
        </main>
      </div>

      {/* Right Sidebar */}
      <RightSidebar isOpen={rightSidebarOpen} />
    </div>
  )
}

export default App
