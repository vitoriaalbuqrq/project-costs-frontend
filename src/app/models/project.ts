import { ProjectServices } from "./projectServices";

export interface Project {
  id?: number;
  title: string;
  description: string;
  category: string;
  startDate: string; 
  endDate: string; 
  budget: number;
  cost?: number;
  services?: ProjectServices[]; 
}