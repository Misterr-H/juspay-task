import { useState } from 'react'
import { Sidebar } from './components/sidebar'
import { Navbar } from './components/navbar'
import './App.css'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          sidebarCollapsed={sidebarCollapsed}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
          <div className="max-w-[1400px] space-y-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">eCommerce</h1>
              <p className="text-sm text-muted-foreground">
                Dashboard content will go here. The sidebar and navbar are now ready!
              </p>
            </div>
            {/* Placeholder for dashboard widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-card rounded-xl border border-border p-6 h-48 shadow-sm"></div>
              <div className="bg-card rounded-xl border border-border p-6 h-48 shadow-sm"></div>
              <div className="bg-card rounded-xl border border-border p-6 h-48 shadow-sm"></div>
              <div className="bg-card rounded-xl border border-border p-6 h-64 shadow-sm md:col-span-2"></div>
              <div className="bg-card rounded-xl border border-border p-6 h-64 shadow-sm"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
