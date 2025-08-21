export const USER_TYPES = {
  CUSTOMER: 'customer',
  ENTERPRISE: 'enterprise',
  OPERATOR: 'operator'
} as const;

export const DOCUMENT_TYPES = {
  AADHAAR: 'aadhaar',
  PAN: 'pan',
  PASSPORT: 'passport',
  DRIVING_LICENSE: 'driving_license',
  VOTER_ID: 'voter_id'
} as const;

export const SIM_TYPES = {
  PHYSICAL: 'physical',
  ESIM: 'esim',
  DONGLE: 'dongle'
} as const;

export const PLAN_TYPES = {
  BASIC: 'basic',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise'
} as const;

export const KYC_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
} as const;

export const ACTIVATION_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  CANCELLED: 'cancelled'
} as const;

export const FRAUD_ALERT_TYPES = {
  DEEPFAKE: 'deepfake',
  DUPLICATE_DOCUMENT: 'duplicate_document',
  UNUSUAL_ACTIVITY: 'unusual_activity',
  SUSPICIOUS_LOCATION: 'suspicious_location',
  FAKE_DOCUMENT: 'fake_document'
} as const;

export const FRAUD_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const;

export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired'
} as const;

export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE_MB: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf'],
  ALLOWED_CSV_TYPES: ['text/csv', 'application/vnd.ms-excel']
} as const;

export const AI_CONFIDENCE_THRESHOLDS = {
  DOCUMENT_VERIFICATION: 0.85,
  FACE_VERIFICATION: 0.90,
  FRAUD_DETECTION: 0.75,
  LIVENESS_DETECTION: 0.85
} as const;

export const INDIAN_STATES = [
  { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
  { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
  { value: 'assam', label: 'Assam' },
  { value: 'bihar', label: 'Bihar' },
  { value: 'chhattisgarh', label: 'Chhattisgarh' },
  { value: 'goa', label: 'Goa' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'haryana', label: 'Haryana' },
  { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
  { value: 'jharkhand', label: 'Jharkhand' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'manipur', label: 'Manipur' },
  { value: 'meghalaya', label: 'Meghalaya' },
  { value: 'mizoram', label: 'Mizoram' },
  { value: 'nagaland', label: 'Nagaland' },
  { value: 'odisha', label: 'Odisha' },
  { value: 'punjab', label: 'Punjab' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'sikkim', label: 'Sikkim' },
  { value: 'tamil-nadu', label: 'Tamil Nadu' },
  { value: 'telangana', label: 'Telangana' },
  { value: 'tripura', label: 'Tripura' },
  { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
  { value: 'uttarakhand', label: 'Uttarakhand' },
  { value: 'west-bengal', label: 'West Bengal' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'puducherry', label: 'Puducherry' },
  { value: 'chandigarh', label: 'Chandigarh' },
  { value: 'dadra-nagar-haveli', label: 'Dadra and Nagar Haveli' },
  { value: 'daman-diu', label: 'Daman and Diu' },
  { value: 'lakshadweep', label: 'Lakshadweep' },
  { value: 'andaman-nicobar', label: 'Andaman and Nicobar Islands' }
] as const;

export const ROUTES = {
  HOME: '/',
  CUSTOMER: '/customer',
  ENTERPRISE: '/enterprise',
  OPERATOR: '/operator'
} as const;

export const API_ENDPOINTS = {
  // Customer endpoints
  CUSTOMER_PROFILE: '/api/customer/profile',
  DOCUMENTS: '/api/documents',
  DOCUMENT_UPLOAD: '/api/documents/upload',
  FACE_VERIFICATION: '/api/face-verification',
  SIM_ACTIVATION: '/api/sim-activation',
  
  // Enterprise endpoints
  ENTERPRISE_PROFILE: '/api/enterprise/profile',
  EMPLOYEES: '/api/enterprise/employees',
  BULK_UPLOAD: '/api/enterprise/bulk-upload',
  
  // Operator endpoints
  FRAUD_ALERTS: '/api/fraud-alerts',
  ANALYTICS: '/api/analytics/stats',
  
  // Plan endpoints
  PLANS: '/api/plans',
  PLAN_RECOMMENDATIONS: '/api/plans/recommended'
} as const;

export const COLORS = {
  PRIMARY: 'hsl(208, 79%, 51%)',
  SECONDARY: 'hsl(202, 77%, 43%)',
  SUCCESS: 'hsl(120, 61%, 34%)',
  WARNING: 'hsl(45, 93%, 47%)',
  DESTRUCTIVE: 'hsl(356, 69%, 44%)',
  MUTED: 'hsl(240, 1.9608%, 90%)',
  BORDER: 'hsl(201.4286, 30.4348%, 90.9804%)'
} as const;

export const ONBOARDING_STEPS = {
  PERSONAL_INFO: 1,
  DOCUMENT_UPLOAD: 2,
  FACE_VERIFICATION: 3,
  PLAN_SELECTION: 4
} as const;

export const REGEX_PATTERNS = {
  MOBILE: /^[+]?[1-9][\d]{9,14}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PINCODE: /^[1-9][0-9]{5}$/,
  AADHAAR: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
} as const;
