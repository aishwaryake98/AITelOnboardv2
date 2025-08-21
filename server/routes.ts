import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCustomerProfileSchema, insertDocumentSchema, insertFaceVerificationSchema, insertSimActivationSchema, insertFraudAlertSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Customer Profile Routes
  app.post("/api/customer/profile", async (req, res) => {
    try {
      const profileData = insertCustomerProfileSchema.parse(req.body);
      const profile = await storage.createCustomerProfile(profileData);
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ message: "Invalid profile data", error: error.message });
    }
  });

  app.get("/api/customer/profile/:userId", async (req, res) => {
    try {
      const profile = await storage.getCustomerProfile(req.params.userId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.patch("/api/customer/profile/:userId", async (req, res) => {
    try {
      const profile = await storage.updateCustomerProfile(req.params.userId, req.body);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Document Upload and Processing Routes
  app.post("/api/documents/upload", (req, res) => {
    upload.single('document')(req, res, async (err) => {
      try {
        if (err) {
          console.error('Multer error:', err);
          return res.status(400).json({ message: "File upload error", error: err.message });
        }

        console.log('File received:', req.file);
        console.log('Body:', req.body);

        if (!req.file) {
          console.error('No file in request');
          return res.status(400).json({ message: "No file uploaded" });
        }

        const { userId, documentType } = req.body;
        
        if (!documentType) {
          return res.status(400).json({ message: "Document type is required" });
        }
        
        // Simulate OCR processing
        const extractedData = await simulateOCRProcessing(req.file, documentType);
        
        const document = await storage.createDocument({
          userId: userId || 'temp-user-id',
          documentType,
          filePath: req.file.path,
          extractedData,
          verificationStatus: "verified",
          aiConfidence: extractedData.confidence
        });

        // Return both document info and extracted data for form auto-fill
        res.json({
          document,
          extractedData,
          success: true,
          message: "Document processed successfully"
        });
      } catch (error: any) {
        console.error('Upload processing error:', error);
        res.status(500).json({ message: "Document processing failed", error: error.message });
      }
    });
  });

  app.get("/api/documents/:userId", async (req, res) => {
    try {
      const documents = await storage.getDocumentsByUserId(req.params.userId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  // Face Verification Routes
  app.post("/api/face-verification", async (req, res) => {
    try {
      const { userId } = req.body;
      
      // Simulate face verification processing
      const verificationResult = await simulateFaceVerification(userId);
      
      const verification = await storage.createFaceVerification({
        userId,
        verificationStatus: verificationResult.status,
        livenessScore: verificationResult.livenessScore,
        matchScore: verificationResult.matchScore,
        fraudFlags: verificationResult.fraudFlags
      });

      // Check for fraud and create alert if necessary
      if (verificationResult.fraudDetected) {
        await storage.createFraudAlert({
          userId,
          alertType: "deepfake",
          severity: "critical",
          description: "Potential deepfake detected in face verification",
          confidence: verificationResult.fraudConfidence,
          metadata: { verificationId: verification.id }
        });
      }

      res.json(verification);
    } catch (error: any) {
      res.status(500).json({ message: "Face verification failed", error: error.message });
    }
  });

  app.get("/api/face-verification/:userId", async (req, res) => {
    try {
      const verification = await storage.getFaceVerification(req.params.userId);
      res.json(verification);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch face verification" });
    }
  });

  // Plans Routes
  app.get("/api/plans", async (req, res) => {
    try {
      const plans = await storage.getPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch plans" });
    }
  });

  app.get("/api/plans/recommended/:userId", async (req, res) => {
    try {
      const plans = await storage.getPlans();
      // Simple AI recommendation logic based on user profile
      const customerProfile = await storage.getCustomerProfile(req.params.userId);
      
      const recommendedPlan = plans.find(plan => plan.isRecommended) || plans[1];
      res.json({ recommendedPlan, allPlans: plans });
    } catch (error) {
      res.status(500).json({ message: "Failed to get plan recommendations" });
    }
  });

  // SIM Activation Routes
  app.post("/api/sim-activation", async (req, res) => {
    try {
      const activationData = insertSimActivationSchema.parse(req.body);
      
      // Generate activation ID
      const activationId = `ACT-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      const activation = await storage.createSimActivation({
        ...activationData,
        activationId,
        activationStatus: "active"
      });

      res.json(activation);
    } catch (error: any) {
      res.status(400).json({ message: "SIM activation failed", error: error.message });
    }
  });

  app.get("/api/sim-activation/:userId", async (req, res) => {
    try {
      const activations = await storage.getSimActivationsByUserId(req.params.userId);
      res.json(activations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activations" });
    }
  });

  // Enterprise Routes
  app.post("/api/enterprise/profile", async (req, res) => {
    try {
      const profile = await storage.createEnterpriseProfile(req.body);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ message: "Failed to create enterprise profile" });
    }
  });

  app.get("/api/enterprise/profile/:userId", async (req, res) => {
    try {
      const profile = await storage.getEnterpriseProfile(req.params.userId);
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enterprise profile" });
    }
  });

  app.post("/api/enterprise/employees", async (req, res) => {
    try {
      const employee = await storage.createEmployee(req.body);
      res.json(employee);
    } catch (error) {
      res.status(400).json({ message: "Failed to create employee" });
    }
  });

  app.get("/api/enterprise/employees/:enterpriseId", async (req, res) => {
    try {
      const employees = await storage.getEmployeesByEnterpriseId(req.params.enterpriseId);
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employees" });
    }
  });

  // Bulk CSV upload processing
  app.post("/api/enterprise/bulk-upload", upload.single('csvFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No CSV file uploaded" });
      }

      const { enterpriseId } = req.body;
      
      // Simulate CSV processing
      const processedEmployees = await processCSVFile(req.file.path, enterpriseId);
      
      res.json({ 
        message: "CSV processed successfully", 
        employeeCount: processedEmployees.length,
        employees: processedEmployees 
      });
    } catch (error: any) {
      res.status(500).json({ message: "Bulk upload failed", error: error.message });
    }
  });

  // Fraud Alert Routes
  app.get("/api/fraud-alerts", async (req, res) => {
    try {
      const status = req.query.status as string;
      const alerts = await storage.getFraudAlerts(status);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fraud alerts" });
    }
  });

  app.patch("/api/fraud-alerts/:id", async (req, res) => {
    try {
      const alert = await storage.updateFraudAlert(req.params.id, req.body);
      if (!alert) {
        return res.status(404).json({ message: "Alert not found" });
      }
      res.json(alert);
    } catch (error) {
      res.status(500).json({ message: "Failed to update alert" });
    }
  });

  // Analytics Routes for Operator Dashboard
  app.get("/api/analytics/stats", async (req, res) => {
    try {
      // Generate mock analytics data
      const stats = {
        todayActivations: Math.floor(Math.random() * 1000) + 1000,
        pendingApprovals: Math.floor(Math.random() * 50) + 20,
        fraudAlerts: (await storage.getFraudAlerts("active")).length,
        aiAccuracy: 98.7,
        activeNetworks: 99.9
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Enhanced OCR processing with realistic document data extraction
async function simulateOCRProcessing(file: Express.Multer.File, documentType: string) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return realistic extracted data based on document type
  switch (documentType) {
    case 'aadhaar':
      return {
        fullName: "Rajesh Kumar Sharma",
        aadhaarNumber: "2847 6391 5820",
        dateOfBirth: "15/08/1988",
        gender: "Male",
        address: "House No. 45, Sector 12, Gurgaon, Haryana 122001",
        city: "Gurgaon",
        state: "Haryana",
        pincode: "122001",
        mobile: "+91 9876543210",
        email: "rajesh.sharma@email.com",
        confidence: 0.96,
        documentType: "aadhaar"
      };
    case 'pan':
      return {
        fullName: "RAJESH KUMAR SHARMA", 
        panNumber: "AABCS1234D",
        dateOfBirth: "15/08/1988",
        fatherName: "SURESH KUMAR SHARMA",
        confidence: 0.94,
        documentType: "pan"
      };
    case 'passport':
      return {
        fullName: "RAJESH KUMAR SHARMA",
        passportNumber: "K1234567",
        dateOfBirth: "15/08/1988",
        placeOfBirth: "New Delhi",
        nationality: "Indian",
        address: "House No. 45, Sector 12, Gurgaon, Haryana 122001",
        city: "Gurgaon",
        state: "Haryana",
        pincode: "122001",
        confidence: 0.92,
        documentType: "passport"
      };
    case 'driving_license':
      return {
        fullName: "Rajesh Kumar Sharma",
        licenseNumber: "DL-0720220012345",
        dateOfBirth: "15/08/1988",
        address: "House No. 45, Sector 12, Gurgaon, Haryana 122001",
        city: "Gurgaon",
        state: "Haryana",
        pincode: "122001",
        validUpto: "14/08/2033",
        confidence: 0.91,
        documentType: "driving_license"
      };
    default:
      return {
        confidence: 0.85,
        documentType: "unknown"
      };
  }
}

// Simulate face verification
async function simulateFaceVerification(userId: string) {
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const livenessScore = 0.95 + Math.random() * 0.04;
  const matchScore = 0.92 + Math.random() * 0.07;
  const fraudDetected = Math.random() < 0.05; // 5% chance of fraud detection
  
  return {
    status: fraudDetected ? "rejected" : "verified",
    livenessScore,
    matchScore,
    fraudDetected,
    fraudConfidence: fraudDetected ? 0.94 : 0,
    fraudFlags: fraudDetected ? { deepfake: true } : null
  };
}

// Process CSV file
async function processCSVFile(filePath: string, enterpriseId: string) {
  // Simulate CSV processing
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock processed employees
  return [
    { fullName: "Rahul Sharma", email: "rahul@company.com", mobile: "9876543210" },
    { fullName: "Priya Singh", email: "priya@company.com", mobile: "9876543211" }
  ];
}
