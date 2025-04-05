import axios from 'axios';
import type { SimpleFormData } from '@shared/types';

// Perplexity API client
export async function generateLetter(formData: SimpleFormData): Promise<{ content: string; citations: string[] }> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  
  if (!apiKey) {
    throw new Error('Perplexity API key is not configured');
  }

  try {
    const { userInfo, representativeInfo, issueDetails, customInstructions } = formData;

    // Construct system prompt
    const systemPrompt = `
      You are a professional letter writer helping constituents contact their elected officials. 
      Write a formal, respectful letter that is clear and persuasive.
      Follow proper modern email formatting and etiquette.
      Use facts and data to support the constituent's position.
      Keep the tone respectful but firm.
      Focus on a specific ask or action the representative can take.
      If available, incorporate any biographical details that establish the writer's credibility on this issue.
      Do not include citations or references unless the user specifically requests them.
    `;

    // Construct user prompt with all the form data
    const userPrompt = `
      Write a professional letter to a representative using the following information:
      
      About me:
      ${userInfo}
      
      Representative information:
      ${representativeInfo}
      
      Issue details:
      ${issueDetails}
      
      Custom instructions:
      ${customInstructions}
      
      Please research current information about this issue/legislation and incorporate accurate, up-to-date content in the letter.
    `;

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1500,
        top_p: 0.9,
        search_domain_filter: [],
        return_images: false,
        return_related_questions: false,
        search_recency_filter: 'month',
        top_k: 0,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 1
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      content: response.data.choices[0].message.content,
      citations: response.data.citations || []
    };
  } catch (error: any) {
    console.error('Error generating letter with Perplexity API:', error);
    
    // Check if it's a rate limit error
    if (error.response?.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    
    throw new Error(error.message || 'Failed to generate letter');
  }
}
