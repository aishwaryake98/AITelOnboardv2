import { apiRequest } from "@/lib/queryClient";

export interface DocumentExtractionResult {
  name: string;
  documentNumber: string;
  address?: string;
  dateOfBirth?: string;
  confidence: number;
  documentType: string;
}

export interface FaceVerificationResult {
  verificationStatus: "verified" | "rejected" | "pending";
  livenessScore: number;
  matchScore: number;
  fraudFlags?: any;
}

export interface PlanRecommendationResult {
  recommendedPlan: any;
  reasons: string[];
  confidence: number;
}

class AIService {
  async extractDocumentData(file: File, documentType: string): Promise<DocumentExtractionResult> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate OCR extraction with realistic confidence scores
    const extractedData: DocumentExtractionResult = {
      name: "John Doe",
      documentNumber: documentType === "aadhaar" ? "****-****-1234" : "ABCDE1234F",
      address: "123 Main Street, Mumbai, Maharashtra 400001",
      dateOfBirth: "01/01/1990",
      confidence: 0.95 + Math.random() * 0.04, // 95-99% confidence
      documentType
    };

    return extractedData;
  }

  async performFaceVerification(userId: string): Promise<FaceVerificationResult> {
    try {
      const response = await apiRequest("POST", "/api/face-verification", { userId });
      return response.json();
    } catch (error) {
      // Fallback simulation if API fails
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const livenessScore = 0.95 + Math.random() * 0.04;
      const matchScore = 0.92 + Math.random() * 0.07;
      const fraudDetected = Math.random() < 0.05; // 5% chance of fraud detection
      
      return {
        verificationStatus: fraudDetected ? "rejected" : "verified",
        livenessScore,
        matchScore,
        fraudFlags: fraudDetected ? { deepfake: true } : null
      };
    }
  }

  async getPersonalizedRecommendations(userProfile: any): Promise<PlanRecommendationResult> {
    // Simulate AI recommendation processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple recommendation logic based on user profile
    let recommendedPlanType = "premium";
    const reasons = ["Based on your data usage patterns", "Suitable for your profession"];
    
    if (userProfile?.businessType === "enterprise") {
      recommendedPlanType = "enterprise";
      reasons.push("Enterprise features included");
    } else if (userProfile?.estimatedUsage === "light") {
      recommendedPlanType = "basic";
      reasons.length = 0;
      reasons.push("Cost-effective for light usage");
    }

    return {
      recommendedPlan: { type: recommendedPlanType },
      reasons,
      confidence: 0.85 + Math.random() * 0.14 // 85-99% confidence
    };
  }

  async detectFraud(data: any): Promise<{ fraudDetected: boolean; confidence: number; flags: any[] }> {
    // Simulate fraud detection processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const fraudDetected = Math.random() < 0.05; // 5% fraud rate simulation
    const confidence = fraudDetected ? 0.85 + Math.random() * 0.14 : 0.02 + Math.random() * 0.08;
    
    const flags = fraudDetected ? [
      { type: "document_manipulation", severity: "high" },
      { type: "suspicious_metadata", severity: "medium" }
    ] : [];

    return {
      fraudDetected,
      confidence,
      flags
    };
  }

  async validateDocument(documentData: any): Promise<{ isValid: boolean; confidence: number; issues: string[] }> {
    // Simulate document validation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const isValid = Math.random() > 0.1; // 90% validation success rate
    const confidence = isValid ? 0.9 + Math.random() * 0.09 : 0.3 + Math.random() * 0.4;
    
    const issues = isValid ? [] : [
      "Document quality too low",
      "Information partially obscured",
      "Potential tampering detected"
    ];

    return {
      isValid,
      confidence,
      issues
    };
  }
}

export const aiService = new AIService();
