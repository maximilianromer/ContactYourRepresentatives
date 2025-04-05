import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateLetter } from "./api/perplexity";
import type { LetterRequest, LetterResponse, SimpleFormData } from "@shared/types";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/generate-letter", async (req, res) => {
    try {
      const formData: SimpleFormData = req.body.formData;
      
      if (!formData || !formData.userInfo || !formData.representativeInfo || !formData.issueDetails) {
        return res.status(400).json({ message: "Please fill out all required fields" });
      }
      
      // Call the Perplexity API
      const result = await generateLetter(formData);
      
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Error generating letter:", error);
      
      const statusCode = error.message?.includes("rate limit") ? 429 : 500;
      const message = error.message || "An unexpected error occurred";
      
      return res.status(statusCode).json({ 
        message,
        statusCode 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
