import { 
  User, InsertUser, 
  CustomerProfile, InsertCustomerProfile,
  Document, InsertDocument,
  FaceVerification, InsertFaceVerification,
  SimActivation, InsertSimActivation,
  Plan, InsertPlan,
  EnterpriseProfile, InsertEnterpriseProfile,
  Employee, InsertEmployee,
  FraudAlert, InsertFraudAlert
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Customer Profiles
  createCustomerProfile(profile: InsertCustomerProfile): Promise<CustomerProfile>;
  getCustomerProfile(userId: string): Promise<CustomerProfile | undefined>;
  updateCustomerProfile(userId: string, updates: Partial<CustomerProfile>): Promise<CustomerProfile | undefined>;
  
  // Documents
  createDocument(document: InsertDocument): Promise<Document>;
  getDocumentsByUserId(userId: string): Promise<Document[]>;
  updateDocument(id: string, updates: Partial<Document>): Promise<Document | undefined>;
  
  // Face Verifications
  createFaceVerification(verification: InsertFaceVerification): Promise<FaceVerification>;
  getFaceVerification(userId: string): Promise<FaceVerification | undefined>;
  
  // SIM Activations
  createSimActivation(activation: InsertSimActivation): Promise<SimActivation>;
  getSimActivationsByUserId(userId: string): Promise<SimActivation[]>;
  updateSimActivation(id: string, updates: Partial<SimActivation>): Promise<SimActivation | undefined>;
  
  // Plans
  getPlans(): Promise<Plan[]>;
  getPlan(id: string): Promise<Plan | undefined>;
  
  // Enterprise
  createEnterpriseProfile(profile: InsertEnterpriseProfile): Promise<EnterpriseProfile>;
  getEnterpriseProfile(userId: string): Promise<EnterpriseProfile | undefined>;
  
  // Employees
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  getEmployeesByEnterpriseId(enterpriseId: string): Promise<Employee[]>;
  updateEmployee(id: string, updates: Partial<Employee>): Promise<Employee | undefined>;
  
  // Fraud Alerts
  createFraudAlert(alert: InsertFraudAlert): Promise<FraudAlert>;
  getFraudAlerts(status?: string): Promise<FraudAlert[]>;
  updateFraudAlert(id: string, updates: Partial<FraudAlert>): Promise<FraudAlert | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private customerProfiles: Map<string, CustomerProfile> = new Map();
  private documents: Map<string, Document> = new Map();
  private faceVerifications: Map<string, FaceVerification> = new Map();
  private simActivations: Map<string, SimActivation> = new Map();
  private plans: Map<string, Plan> = new Map();
  private enterpriseProfiles: Map<string, EnterpriseProfile> = new Map();
  private employees: Map<string, Employee> = new Map();
  private fraudAlerts: Map<string, FraudAlert> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed plans
    const basicPlan: Plan = {
      id: "plan-basic",
      name: "Basic",
      type: "basic",
      price: 299,
      dataLimit: "2GB daily",
      features: ["Unlimited calls", "100 SMS/day"],
      isRecommended: false
    };

    const premiumPlan: Plan = {
      id: "plan-premium",
      name: "Premium",
      type: "premium", 
      price: 499,
      dataLimit: "5GB daily",
      features: ["Unlimited calls", "Unlimited SMS", "OTT benefits"],
      isRecommended: true
    };

    const enterprisePlan: Plan = {
      id: "plan-enterprise",
      name: "Enterprise",
      type: "enterprise",
      price: 799,
      dataLimit: "Unlimited",
      features: ["Unlimited data", "Priority network", "Enterprise support"],
      isRecommended: false
    };

    this.plans.set(basicPlan.id, basicPlan);
    this.plans.set(premiumPlan.id, premiumPlan);
    this.plans.set(enterprisePlan.id, enterprisePlan);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      fullName: insertUser.fullName || null,
      companyName: insertUser.companyName || null
    };
    this.users.set(id, user);
    return user;
  }

  async createCustomerProfile(insertProfile: InsertCustomerProfile): Promise<CustomerProfile> {
    const id = randomUUID();
    const profile: CustomerProfile = { 
      ...insertProfile, 
      id, 
      createdAt: new Date(),
      kycStatus: insertProfile.kycStatus || null
    };
    this.customerProfiles.set(id, profile);
    return profile;
  }

  async getCustomerProfile(userId: string): Promise<CustomerProfile | undefined> {
    return Array.from(this.customerProfiles.values()).find(profile => profile.userId === userId);
  }

  async updateCustomerProfile(userId: string, updates: Partial<CustomerProfile>): Promise<CustomerProfile | undefined> {
    const profile = Array.from(this.customerProfiles.values()).find(p => p.userId === userId);
    if (profile) {
      const updated = { ...profile, ...updates };
      this.customerProfiles.set(profile.id, updated);
      return updated;
    }
    return undefined;
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = randomUUID();
    const document: Document = { 
      ...insertDocument, 
      id, 
      createdAt: new Date(),
      documentNumber: insertDocument.documentNumber || null,
      extractedData: insertDocument.extractedData || null,
      verificationStatus: insertDocument.verificationStatus || null,
      aiConfidence: insertDocument.aiConfidence || null
    };
    this.documents.set(id, document);
    return document;
  }

  async getDocumentsByUserId(userId: string): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(doc => doc.userId === userId);
  }

  async updateDocument(id: string, updates: Partial<Document>): Promise<Document | undefined> {
    const document = this.documents.get(id);
    if (document) {
      const updated = { ...document, ...updates };
      this.documents.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async createFaceVerification(insertVerification: InsertFaceVerification): Promise<FaceVerification> {
    const id = randomUUID();
    const verification: FaceVerification = { 
      ...insertVerification, 
      id, 
      createdAt: new Date(),
      verificationStatus: insertVerification.verificationStatus || null,
      livenessScore: insertVerification.livenessScore || null,
      matchScore: insertVerification.matchScore || null,
      fraudFlags: insertVerification.fraudFlags || null
    };
    this.faceVerifications.set(id, verification);
    return verification;
  }

  async getFaceVerification(userId: string): Promise<FaceVerification | undefined> {
    return Array.from(this.faceVerifications.values()).find(fv => fv.userId === userId);
  }

  async createSimActivation(insertActivation: InsertSimActivation): Promise<SimActivation> {
    const id = randomUUID();
    const activation: SimActivation = { 
      ...insertActivation, 
      id, 
      createdAt: new Date(),
      activationStatus: insertActivation.activationStatus || null
    };
    this.simActivations.set(id, activation);
    return activation;
  }

  async getSimActivationsByUserId(userId: string): Promise<SimActivation[]> {
    return Array.from(this.simActivations.values()).filter(sa => sa.userId === userId);
  }

  async updateSimActivation(id: string, updates: Partial<SimActivation>): Promise<SimActivation | undefined> {
    const activation = this.simActivations.get(id);
    if (activation) {
      const updated = { ...activation, ...updates };
      this.simActivations.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async getPlans(): Promise<Plan[]> {
    return Array.from(this.plans.values());
  }

  async getPlan(id: string): Promise<Plan | undefined> {
    return this.plans.get(id);
  }

  async createEnterpriseProfile(insertProfile: InsertEnterpriseProfile): Promise<EnterpriseProfile> {
    const id = randomUUID();
    const profile: EnterpriseProfile = { 
      ...insertProfile, 
      id, 
      createdAt: new Date(),
      businessType: insertProfile.businessType || null,
      employeeCount: insertProfile.employeeCount || null,
      monthlyBudget: insertProfile.monthlyBudget || null
    };
    this.enterpriseProfiles.set(id, profile);
    return profile;
  }

  async getEnterpriseProfile(userId: string): Promise<EnterpriseProfile | undefined> {
    return Array.from(this.enterpriseProfiles.values()).find(ep => ep.userId === userId);
  }

  async createEmployee(insertEmployee: InsertEmployee): Promise<Employee> {
    const id = randomUUID();
    const employee: Employee = { 
      ...insertEmployee, 
      id, 
      createdAt: new Date(),
      mobile: insertEmployee.mobile || null,
      kycStatus: insertEmployee.kycStatus || null,
      simNumber: insertEmployee.simNumber || null,
      planId: insertEmployee.planId || null,
      activationStatus: insertEmployee.activationStatus || null,
      dataUsage: insertEmployee.dataUsage || null
    };
    this.employees.set(id, employee);
    return employee;
  }

  async getEmployeesByEnterpriseId(enterpriseId: string): Promise<Employee[]> {
    return Array.from(this.employees.values()).filter(emp => emp.enterpriseId === enterpriseId);
  }

  async updateEmployee(id: string, updates: Partial<Employee>): Promise<Employee | undefined> {
    const employee = this.employees.get(id);
    if (employee) {
      const updated = { ...employee, ...updates };
      this.employees.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async createFraudAlert(insertAlert: InsertFraudAlert): Promise<FraudAlert> {
    const id = randomUUID();
    const alert: FraudAlert = { 
      ...insertAlert, 
      id, 
      createdAt: new Date(),
      metadata: insertAlert.metadata || {},
      status: insertAlert.status || null,
      userId: insertAlert.userId || null,
      confidence: insertAlert.confidence || null
    };
    this.fraudAlerts.set(id, alert);
    return alert;
  }

  async getFraudAlerts(status?: string): Promise<FraudAlert[]> {
    let alerts = Array.from(this.fraudAlerts.values());
    if (status) {
      alerts = alerts.filter(alert => alert.status === status);
    }
    return alerts.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async updateFraudAlert(id: string, updates: Partial<FraudAlert>): Promise<FraudAlert | undefined> {
    const alert = this.fraudAlerts.get(id);
    if (alert) {
      const updated = { ...alert, ...updates };
      this.fraudAlerts.set(id, updated);
      return updated;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
