export interface PracticeArea {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  highlights: string[];
  idealFor: string;
  featured?: boolean;
  category?: 'familia' | 'complementar';
}

export interface DiagnosticOption {
  label: string;
  description: string;
  icon?: string;
}

export interface DiagnosticQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: {
    value: string;
    label: string;
    detail: string;
  }[];
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  challenge: string;
  strategy: string;
  result: string;
  duration: string;
}

export interface ClientReviewCase {
  id: string;
  name: string;
  role: string;
  timeAgo: string;
  rating: number;
  highlight: string;
  reviewText: string;
  initials: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  category: string;
  answer: string;
  practicalTip?: string;
}

export interface OfficeInfo {
  name: string;
  lawyerName: string;
  title: string;
  oabNumber: string;
  phone: string;
  phoneRaw: string;
  email: string;
  instagram: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    full?: string;
    mapsUrl?: string;
  };
}
