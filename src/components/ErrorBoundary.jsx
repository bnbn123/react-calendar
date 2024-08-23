import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="error-boundary">
        <h1>Something went wrong. </h1>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
