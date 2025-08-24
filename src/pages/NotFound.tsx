import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blog-surface">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blog-text-primary">404</h1>
        <p className="text-xl text-blog-text-secondary mb-4">Oops! Page not found</p>
        <a href="/blog" className="text-blog-primary hover:text-blog-secondary underline">
          Return to Blog
        </a>
      </div>
    </div>
  );
};

export default NotFound;
