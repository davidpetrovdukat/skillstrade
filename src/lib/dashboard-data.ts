export type OrderStatus = 'In Progress' | 'Review' | 'Completed' | 'To Do';

export interface Order {
    id: string;
    projectName: string;
    freelancer: string;
    status: OrderStatus;
    deliveryTime: string; // e.g., "2 Days left", "Delivered", "-"
    price?: number; // Optional, maybe used later
}

export interface DashboardStats {
    tokenBalance: number;
    activeOrders: number;
    totalSpent: number;
}

// MOCK DATA
export const MOCK_STATS: DashboardStats = {
    tokenBalance: 2400,
    activeOrders: 2,
    totalSpent: 12500
};

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ord-001',
        projectName: 'Fintech App Redesign',
        freelancer: 'Elena R.',
        status: 'In Progress',
        deliveryTime: '2 Days left'
    },
    {
        id: 'ord-002',
        projectName: 'SEO Audit',
        freelancer: 'Mark S.',
        status: 'Review',
        deliveryTime: 'Delivered'
    },
    {
        id: 'ord-003',
        projectName: 'Logo Refresh',
        freelancer: 'Alex D.',
        status: 'Completed',
        deliveryTime: '-'
    }
];
