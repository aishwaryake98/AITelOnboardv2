import { apiRequest } from "@/lib/queryClient";

export interface UploadResult {
  documentId: string;
  extractedData: any;
  verificationStatus: string;
  confidence: number;
}

class UploadService {
  async uploadDocument(formData: FormData): Promise<UploadResult> {
    try {
      const response = await apiRequest("POST", "/api/documents/upload", formData);
      return response.json();
    } catch (error: any) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  async uploadBulkCSV(formData: FormData): Promise<{ employeeCount: number; employees: any[] }> {
    try {
      const response = await apiRequest("POST", "/api/enterprise/bulk-upload", formData);
      return response.json();
    } catch (error: any) {
      throw new Error(`Bulk upload failed: ${error.message}`);
    }
  }

  async uploadEmployeeDocuments(employeeId: string, documents: File[]): Promise<{ processedCount: number; results: any[] }> {
    const uploadPromises = documents.map(async (file) => {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('employeeId', employeeId);
      formData.append('documentType', this.getDocumentType(file.name));
      
      try {
        return await this.uploadDocument(formData);
      } catch (error: any) {
        return { error: error.message, filename: file.name };
      }
    });

    const results = await Promise.all(uploadPromises);
    const processedCount = results.filter(result => !('error' in result)).length;

    return {
      processedCount,
      results
    };
  }

  private getDocumentType(filename: string): string {
    const name = filename.toLowerCase();
    if (name.includes('aadhaar') || name.includes('aadhar')) return 'aadhaar';
    if (name.includes('pan')) return 'pan';
    if (name.includes('passport')) return 'passport';
    if (name.includes('photo') || name.includes('pic')) return 'photo';
    return 'other';
  }

  validateFileSize(file: File, maxSizeInMB: number = 10): boolean {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  }

  validateFileType(file: File, allowedTypes: string[] = ['image/jpeg', 'image/png', 'application/pdf']): boolean {
    return allowedTypes.includes(file.type);
  }

  async compressImage(file: File, maxWidth: number = 1920, quality: number = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, file.type, quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  generateUploadProgress(file: File): { progress: number; estimated: number } {
    // Simulate upload progress based on file size
    const sizeInMB = file.size / (1024 * 1024);
    const estimatedSeconds = Math.max(2, sizeInMB * 0.5); // Estimate based on file size
    
    return {
      progress: 0,
      estimated: estimatedSeconds * 1000 // Convert to milliseconds
    };
  }
}

export const uploadService = new UploadService();
