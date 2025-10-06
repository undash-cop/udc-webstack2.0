export interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  posted: string;
  featured: boolean;
  urgent: boolean;
  description: string;
  skills: string[];
  responsibilities: string[];
}

declare const jobOpeningsData: JobOpening[];
export default jobOpeningsData;
