export interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  content: string;
  analysis: DocumentAnalysis;
}

export interface Regulation {
  id: number;
  name: string;
  uploadDate: Date;
  content: string;
}


export interface DocumentAnalysis {
  text:string,
  analysis:string,
  risk_level: string;
  findings: string[];
  recommendations: string[];
}

export interface DashboardStats {
  totalApplications: number;
  highRiskApplications: number;
}