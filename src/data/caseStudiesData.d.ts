export interface CaseStudy {
  id: number;
  title: string;
  client: string;
  industry: string;
  duration: string;
  teamSize: string;
  budget: string;
  image: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  featured: boolean;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  publishedDate: string;
  lastUpdated: string;
  status: string;
  projectPhase: string;
  projectTimeline?: Array<{
    phase: string;
    duration: string;
    completed: boolean;
  }>;
  metrics?: {
    performance: { before: number; after: number; unit: string };
    conversion: { before: number; after: number; unit: string };
    uptime: { before: number; after: number; unit: string };
    cost: { before: number; after: number; unit: string };
  };
  gallery?: string[];
  videoUrl?: string;
  documents?: Array<{
    name: string;
    type: string;
    size: string;
  }>;
}

export declare const caseStudiesData: CaseStudy[];
export declare function getCaseStudyById(id: string | number): CaseStudy | undefined;
export declare function getFeaturedCaseStudies(): CaseStudy[];
export declare function getCaseStudiesByIndustry(industry: string): CaseStudy[];
