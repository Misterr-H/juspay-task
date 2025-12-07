// Dashboard dummy data

export interface StatCard {
  label: string
  value: string
  change: string
  isPositive: boolean
  bgColor: string
}

export const statsData: StatCard[] = [
  {
    label: "Customers",
    value: "3,781",
    change: "+11.01%",
    isPositive: true,
    bgColor: "bg-blue-50 dark:bg-blue-950/30"
  },
  {
    label: "Orders",
    value: "1,219",
    change: "-0.03%",
    isPositive: false,
    bgColor: "bg-gray-50 dark:bg-gray-900/30"
  },
  {
    label: "Revenue",
    value: "$695",
    change: "+15.03%",
    isPositive: true,
    bgColor: "bg-gray-50 dark:bg-gray-900/30"
  },
  {
    label: "Growth",
    value: "30.1%",
    change: "+6.08%",
    isPositive: true,
    bgColor: "bg-purple-50 dark:bg-purple-950/30"
  }
]

export interface ProjectionData {
  month: string
  projections: number
  actuals: number
}

export const projectionsData: ProjectionData[] = [
  { month: "Jan", projections: 18000000, actuals: 20000000 },
  { month: "Feb", projections: 22000000, actuals: 19000000 },
  { month: "Mar", projections: 20000000, actuals: 18000000 },
  { month: "Apr", projections: 25000000, actuals: 23000000 },
  { month: "May", projections: 18000000, actuals: 15000000 },
  { month: "Jun", projections: 24000000, actuals: 21000000 }
]

export interface RevenuePoint {
  month: string
  currentWeek: number
  previousWeek: number
}

export const revenueData: RevenuePoint[] = [
  { month: "Jan", currentWeek: 12000000, previousWeek: 14000000 },
  { month: "Feb", currentWeek: 16000000, previousWeek: 11000000 },
  { month: "Mar", currentWeek: 11000000, previousWeek: 16000000 },
  { month: "Apr", currentWeek: 18000000, previousWeek: 12000000 },
  { month: "May", currentWeek: 13000000, previousWeek: 20000000 },
  { month: "Jun", currentWeek: 20000000, previousWeek: 19000000 }
]

export interface LocationData {
  name: string
  value: string
  numericValue: number
  maxValue: number
  lat: number
  lng: number
}

export const locationsData: LocationData[] = [
  {
    name: "New York",
    value: "72K",
    numericValue: 72000,
    maxValue: 100000,
    lat: 40.7128,
    lng: -74.0060
  },
  {
    name: "San Francisco",
    value: "39K",
    numericValue: 39000,
    maxValue: 100000,
    lat: 37.7749,
    lng: -122.4194
  },
  {
    name: "Sydney",
    value: "25K",
    numericValue: 25000,
    maxValue: 100000,
    lat: -33.8688,
    lng: 151.2093
  },
  {
    name: "Singapore",
    value: "61K",
    numericValue: 61000,
    maxValue: 100000,
    lat: 1.3521,
    lng: 103.8198
  }
]

export interface Product {
  name: string
  price: string
  quantity: number
  amount: string
}

export const productsData: Product[] = [
  {
    name: "ASOS Ridley High Waist",
    price: "$79.49",
    quantity: 82,
    amount: "$6,518.18"
  },
  {
    name: "Marco Lightweight Shirt",
    price: "$128.50",
    quantity: 37,
    amount: "$4,754.50"
  },
  {
    name: "Half Sleeve Shirt",
    price: "$39.99",
    quantity: 64,
    amount: "$2,559.36"
  },
  {
    name: "Lightweight Jacket",
    price: "$20.00",
    quantity: 184,
    amount: "$3,680.00"
  },
  {
    name: "Marco Shoes",
    price: "$79.49",
    quantity: 64,
    amount: "$1,965.81"
  }
]

export interface SalesChannel {
  name: string
  value: number
  percentage: number
  color: string
}

export const salesChannelsData: SalesChannel[] = [
  {
    name: "Direct",
    value: 300.56,
    percentage: 38.6,
    color: "#1C1C1C" // dark color for direct
  },
  {
    name: "Affiliate",
    value: 135.18,
    percentage: 22.5,
    color: "#86EFAC" // green
  },
  {
    name: "Sponsored",
    value: 154.02,
    percentage: 30.8,
    color: "#818CF8" // indigo/purple
  },
  {
    name: "E-mail",
    value: 48.96,
    percentage: 8.1,
    color: "#7DD3FC" // light blue
  }
]

// Current week and previous week totals for revenue chart legend
export const revenueWeekTotals = {
  currentWeek: 58211,
  previousWeek: 68768
}

export interface OrderItem {
  id: number
  orderId: string
  user: {
    name: string
    avatar?: string
  }
  project: string
  address: string
  date: string
  status: 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected'
}

export const ordersData: OrderItem[] = [
  {
    id: 1,
    orderId: '#CM9801',
    user: {
      name: 'Natali Craig',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Natali'
    },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: 'Just now',
    status: 'In Progress'
  },
  {
    id: 2,
    orderId: '#CM9802',
    user: {
      name: 'Kate Morrison',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kate'
    },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: 'A minute ago',
    status: 'Complete'
  },
  {
    id: 3,
    orderId: '#CM9803',
    user: {
      name: 'Drew Cano',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Drew'
    },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocala',
    date: '1 hour ago',
    status: 'Pending'
  },
  {
    id: 4,
    orderId: '#CM9804',
    user: {
      name: 'Orlando Diggs',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orlando'
    },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: 'Yesterday',
    status: 'Approved'
  },
  {
    id: 5,
    orderId: '#CM9805',
    user: {
      name: 'Andi Lane',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi'
    },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: 'Feb 2, 2023',
    status: 'Rejected'
  },
  {
    id: 6,
    orderId: '#CM9801',
    user: {
      name: 'Natali Craig',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Natali'
    },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: 'Just now',
    status: 'In Progress'
  },
  {
    id: 7,
    orderId: '#CM9802',
    user: {
      name: 'Kate Morrison',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kate'
    },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: 'A minute ago',
    status: 'Complete'
  },
  {
    id: 8,
    orderId: '#CM9803',
    user: {
      name: 'Drew Cano',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Drew'
    },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocala',
    date: '1 hour ago',
    status: 'Pending'
  },
  {
    id: 9,
    orderId: '#CM9804',
    user: {
      name: 'Orlando Diggs',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orlando'
    },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: 'Yesterday',
    status: 'Approved'
  },
  {
    id: 10,
    orderId: '#CM9805',
    user: {
      name: 'Andi Lane',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi'
    },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: 'Feb 2, 2023',
    status: 'Rejected'
  }
]

