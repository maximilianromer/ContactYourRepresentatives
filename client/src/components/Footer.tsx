const Footer = () => {
  return (
    <footer className="bg-card dark:bg-[#0a0a0a] py-4 border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Contact Your Representatives. All rights reserved. Powered by Perplexity AI.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
