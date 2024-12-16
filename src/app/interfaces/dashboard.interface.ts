export interface DashboardStats {
  totalResidents: number;
  pendingDocuments: number;
  todaysCases: number;
  recentAnnouncements: Announcement[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: boolean;
  validUntil: Date;
  targetAudience: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
} 