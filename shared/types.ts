// Common types shared between client and server

export interface SimpleFormData {
  userInfo: string;
  representativeInfo: string;
  issueDetails: string;
  customInstructions: string;
}

export interface LetterRequest {
  formData: SimpleFormData;
}

export interface LetterResponse {
  content: string;
  citations: string[];
}

export interface ApiError {
  message: string;
  statusCode: number;
}
