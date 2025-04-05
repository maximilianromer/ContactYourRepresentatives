import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { LandmarkIcon, Loader2, Copy, Mail, PenLine } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SimpleFormData, LetterResponse, ApiError } from "@shared/types";
import { copyToClipboard, downloadDocx, sendGmailEmail, sendOutlookEmail } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import WordIcon from "@/components/icons/WordIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineMailOutline } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import OutlookIcon from "@/components/icons/OutlookIcon";

const Home = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SimpleFormData>({
    userInfo: "",
    representativeInfo: "",
    issueDetails: "",
    customInstructions: ""
  });
  const [generatedLetter, setGeneratedLetter] = useState<string>("");
  const mailLinkRef = useRef<HTMLAnchorElement>(null);

  // Handle form input changes
  const handleInputChange = (field: keyof SimpleFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Generate letter mutation
  const { mutate, isPending, isError, error } = useMutation<LetterResponse, ApiError, void>({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/generate-letter", { formData });
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setGeneratedLetter(data.content);
      toast({
        title: "Success!",
        description: "Your letter has been generated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to generate letter. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerateLetter = () => {
    if (!formData.userInfo || !formData.representativeInfo || !formData.issueDetails) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields to generate your letter.",
        variant: "destructive",
      });
      return;
    }
    mutate();
  };

  const handleCopyLetter = async () => {
    if (!generatedLetter) return;
    
    const success = await copyToClipboard(generatedLetter);
    
    if (success) {
      toast({
        title: "Copied to clipboard",
        description: "Letter content has been copied to your clipboard.",
      });
    }
  };

  const handleDownloadLetter = () => {
    if (!generatedLetter) return;
    downloadDocx(generatedLetter, "representative-letter.docx");
  };

  const handleDefaultEmailLetter = () => {
    if (!generatedLetter || !mailLinkRef.current) return;
    
    try {
      // Create mailto URL with parameters
      const subject = encodeURIComponent("Letter to Representative");
      const body = encodeURIComponent(generatedLetter);
      const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
      
      // Check if the URL is too long (most browsers have limitations)
      if (mailtoUrl.length > 2000) {
        toast({
          title: "Email too large",
          description: "Your letter may be too large for the default email client. Try Gmail or Outlook instead.",
          variant: "destructive"
        });
        return;
      }
      
      // Set the href of the anchor element
      mailLinkRef.current.href = mailtoUrl;
      
      // Programmatically click the link
      mailLinkRef.current.click();
      
      toast({
        title: "Opening email client",
        description: "Your letter has been prepared for email."
      });
    } catch (error) {
      console.error("Error opening email client:", error);
      toast({
        title: "Failed to open email client",
        description: "Please try Gmail or Outlook instead.",
        variant: "destructive"
      });
    }
  };
  
  const handleGmailLetter = () => {
    if (!generatedLetter) return;
    
    const success = sendGmailEmail("", "Letter to Representative", generatedLetter);
    
    if (success) {
      toast({
        title: "Opening Gmail",
        description: "Your letter has been prepared in Gmail."
      });
    } else {
      toast({
        title: "Couldn't open Gmail",
        description: "Please check your popup blocker settings or try another email method.",
        variant: "destructive"
      });
    }
  };
  
  const handleOutlookLetter = () => {
    if (!generatedLetter) return;
    
    const success = sendOutlookEmail("", "Letter to Representative", generatedLetter);
    
    if (success) {
      toast({
        title: "Opening Outlook",
        description: "Your letter has been prepared in Outlook."
      });
    } else {
      toast({
        title: "Couldn't open Outlook",
        description: "Please check your popup blocker settings or try another email method.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-card dark:bg-[#0a0a0a] py-4 shadow-sm dark:shadow-none border-b border-border dark:border-[#111]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <LandmarkIcon className="h-6 w-6 text-primary dark:text-primary" />
            <h1 className="text-lg md:text-xl font-bold text-card-foreground dark:text-shadow-subtle">
              Contact Your Representatives
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-grow bg-muted dark:bg-[#000]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Form Section */}
            <div className="space-y-6">
              <div className="bg-card dark:card-gradient p-6 rounded-lg shadow dark:shadow-none dark:glow-subtle dark:border dark:border-[#111]">
                <h2 className="text-xl font-semibold text-card-foreground mb-4 dark:text-shadow-subtle">Enter Your Information</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill out these simple fields to generate a professional letter to your elected official.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-1">
                      About you
                    </label>
                    <Textarea 
                      placeholder="Your name, address, occupation, and any relevant personal details that establish your connection to the issue"
                      rows={3}
                      value={formData.userInfo}
                      onChange={(e) => handleInputChange("userInfo", e.target.value)}
                      className="w-full dark:bg-[#0d0d0d] dark:border-[#111] dark:focus:border-primary/50 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-1">
                      Representative information
                    </label>
                    <Textarea 
                      placeholder="Name of the representative (e.g., Julius Caesar)"
                      rows={1}
                      value={formData.representativeInfo}
                      onChange={(e) => handleInputChange("representativeInfo", e.target.value)}
                      className="w-full dark:bg-[#0d0d0d] dark:border-[#111] dark:focus:border-primary/50 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-1">
                      Issue details
                    </label>
                    <Textarea 
                      placeholder="Describe the issue, legislation, or problem. Include your position and why you hold this view, along with any specific actions you'd like taken."
                      rows={5}
                      value={formData.issueDetails}
                      onChange={(e) => handleInputChange("issueDetails", e.target.value)}
                      className="w-full dark:bg-[#0d0d0d] dark:border-[#111] dark:focus:border-primary/50 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-1">
                      Custom instructions (optional)
                    </label>
                    <Textarea 
                      placeholder="Optional: Specify tone, style, or formatting preferences for your letter"
                      rows={2}
                      value={formData.customInstructions}
                      onChange={(e) => handleInputChange("customInstructions", e.target.value)}
                      className="w-full dark:bg-[#0d0d0d] dark:border-[#111] dark:focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    onClick={handleGenerateLetter}
                    disabled={isPending}
                    className="w-full py-2 dark:bg-primary dark:text-white dark:hover:bg-primary/90"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <PenLine className="mr-2 h-4 w-4" />
                        Generate Letter
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Results Section */}
            <div>
              <div className="bg-card dark:card-gradient p-6 rounded-lg shadow dark:shadow-none dark:glow-subtle dark:border dark:border-[#111] h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-card-foreground dark:text-shadow-subtle">Your Letter</h2>
                  
                  {generatedLetter && (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleCopyLetter}
                        title="Copy to clipboard"
                        className="dark:bg-transparent dark:border-[#222] dark:hover:bg-[#111]"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleDownloadLetter}
                        title="Download as DOCX"
                        className="dark:bg-transparent dark:border-[#222] dark:hover:bg-[#111]"
                      >
                        <WordIcon className="h-4 w-4 mr-1" color="#185ABD" />
                        Save
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Send as email"
                            className="dark:bg-transparent dark:border-[#222] dark:hover:bg-[#111] bg-[#185ABD] text-white hover:bg-[#1346A0]"
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={handleDefaultEmailLetter}>
                            <MdOutlineMailOutline className="h-4 w-4 mr-2" />
                            <span>Mail</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={handleGmailLetter}>
                            <SiGmail className="h-4 w-4 mr-2" />
                            <span>Gmail</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={handleOutlookLetter}>
                            <OutlookIcon className="h-4 w-4 mr-2" />
                            <span>Outlook</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
                
                <div className="border dark:border-[#111] rounded-md p-4 h-[600px] overflow-y-auto bg-muted dark:bg-[#0a0a0a]">
                  {isPending ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <Loader2 className="h-8 w-8 animate-spin mb-2 dark:text-primary" />
                      <p>Researching and writing your letter...</p>
                    </div>
                  ) : isError ? (
                    <div className="flex flex-col items-center justify-center h-full text-destructive">
                      <p className="font-medium">Error generating letter</p>
                      <p className="text-sm">{error?.message || "Please try again"}</p>
                    </div>
                  ) : generatedLetter ? (
                    <div className="prose prose-sm max-w-none whitespace-pre-line dark:prose-invert">
                      {generatedLetter}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <p className="text-center">Fill out the form and click "Generate Letter" to create your letter</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Hidden email anchor element */}
      <a 
        ref={mailLinkRef}
        href=""
        style={{ display: 'none' }}
        id="hidden-email-link"
      />
    </div>
  );
};

export default Home;
