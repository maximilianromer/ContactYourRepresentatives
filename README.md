# Contact Your Representatives AI Letter Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Remix on Replit](https://img.shields.io/badge/Remix%20on%20Replit-blue?style=for-the-badge&logo=replit)](https://replit.com/@romermaxromer/ContactYourRepresentatives?v=1)

This project provides a web application designed to help constituents easily draft professional letters to their elected officials using the power of AI. By providing basic information about themselves, the representative, and the issue at hand, users can generate well-structured, persuasive letters ready to be sent.

## 🚀 Live Demo

**Try the application live:** 
# [**https://contactyourrepresentatives.replit.app**](https://contactyourrepresentatives.replit.app)




## 🌟 Features

*   **AI-Powered Drafting:** Leverages the Perplexity AI API to generate formal, researched, and persuasive letter content.
*   **Simple Interface:** User-friendly form to input necessary details (user info, representative info, issue, custom instructions).
*   **Customizable Output:** Option to add custom instructions to guide the AI's tone, style, or specific points to include.
*   **Multiple Export Options:**
    *   Copy the generated letter text to the clipboard.
    *   Download the letter as a formatted `.docx` file.
    *   Initiate sending the letter via the default email client, Gmail, or Outlook.
*   **Theming:** Supports both Light and Dark modes, respecting system preferences and allowing manual toggling.
*   **Responsive Design:** Adapts to various screen sizes for accessibility on desktop and mobile devices.
*   **Built with Modern Tech:** Utilizes React, TypeScript, Node.js, Express, and shadcn/ui components.

## 🛠️ Technology Stack

*   **Frontend:**
    *   React
    *   Vite
    *   TypeScript
    *   Wouter (Routing)
    *   TanStack Query (Data Fetching/Caching)
    *   shadcn/ui (Component Library)
    *   Tailwind CSS (Styling)
    *   `docx` (for .docx generation)
    *   `file-saver` (for file downloads)
*   **Backend:**
    *   Node.js
    *   Express
    *   TypeScript
    *   Perplexity AI API (via Axios)
*   **Shared:**
    *   TypeScript (for shared types/schemas)
    *   Zod (Schema validation)
*   **Development/Build:**
    *   `tsx` (TypeScript execution)
    *   `esbuild` (Bundling for production)
*   **Deployment:**
    *   Replit (Hosting & Autoscale)

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Perplexity API key:
    ```dotenv
    # .env
    PERPLEXITY_API_KEY=your_perplexity_api_key_here
    ```
    *(Note: The `.env` file is included in `.gitignore` and should not be committed.)*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start both the backend server and the Vite frontend development server. The application should be accessible at `http://localhost:5000`.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please send me a message!

## 📄 License

This project is licensed under the [MIT License](https://github.com/maximilianromer/ContactYourRepresentatives/blob/main/LICENSE). Use it as you wish.

## 🙏 Acknowledgements

*   **Replit:** For the seamless development and deployment platform.
*   **Perplexity API:** For providing the powerful AI model used for letter generation.
*   **shadcn/ui:** For the excellent collection of reusable UI components.
