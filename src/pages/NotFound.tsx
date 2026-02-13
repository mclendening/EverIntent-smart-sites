import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Render noindex before redirect to prevent any crawl indexing
  return (
    <>
      <SEO title="Page Not Found" noIndex />
      <Navigate to="/" replace />
    </>
  );
};

export default NotFound;
