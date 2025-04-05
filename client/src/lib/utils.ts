import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import fileDownload from 'file-saver';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function downloadDocx(content: string, fileName: string = 'letter.docx'): void {
  // Import the docx library dynamically to avoid SSR issues
  import('docx').then(({ Document, Packer, Paragraph, TextRun }) => {
    // Split the content by newlines to create paragraphs
    const contentLines = content.split('\n').filter(line => line.trim() !== '');
    
    // Create paragraphs from the content
    const paragraphs = contentLines.map(line => 
      new Paragraph({
        children: [
          new TextRun({
            text: line,
            size: 24 // 12pt font
          })
        ],
        spacing: {
          after: 200 // Space after paragraph
        }
      })
    );
    
    // Create a new document with the paragraphs
    const doc = new Document({
      sections: [{
        properties: {},
        children: paragraphs
      }]
    });
    
    // Generate the document as a blob
    Packer.toBlob(doc).then(blob => {
      // Use file-saver to download the blob
      fileDownload(blob, fileName);
    });
  });
}

export function copyToClipboard(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        resolve(successful);
      } catch (err) {
        resolve(false);
      }
      
      document.body.removeChild(textArea);
    }
  });
}

export function sendDefaultEmail(to: string, subject: string, body: string): boolean {
  try {
    // Some email clients have limitations on the mailto: URL length
    // A common limitation is around 2000 characters, so let's check for that
    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // If the URL is too long, warn the user to use another method
    if (mailtoUrl.length > 2000) {
      console.warn("Email content is too large for mailto: protocol. Consider using Gmail or Outlook instead.");
      return false;
    }
    
    // Direct location change for mailto: as it works better in most browsers
    window.location.href = mailtoUrl;
    return true;
  } catch (error) {
    console.error("Error opening email client:", error);
    return false;
  }
}

export function sendGmailEmail(to: string, subject: string, body: string): boolean {
  try {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const newWindow = window.open(gmailUrl, '_blank');
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      console.warn("Popup blocker may have prevented opening Gmail");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error opening Gmail:", error);
    return false;
  }
}

export function sendOutlookEmail(to: string, subject: string, body: string): boolean {
  try {
    const outlookUrl = `https://outlook.live.com/mail/deeplink/compose?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const newWindow = window.open(outlookUrl, '_blank');
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      console.warn("Popup blocker may have prevented opening Outlook");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error opening Outlook:", error);
    return false;
  }
}

export function sendEmail(to: string, subject: string, body: string): boolean {
  return sendDefaultEmail(to, subject, body);
}

export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" }
];
