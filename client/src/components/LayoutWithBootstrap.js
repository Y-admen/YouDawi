// LayoutWithBootstrap.js
import React, { useEffect } from 'react';

const LayoutWithBootstrap = ({ children }) => {
  useEffect(() => {
    // // Dynamically load Bootstrap styles and scripts
    // import('bootstrap/dist/css/bootstrap.min.css');
    // import('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  return <div>{children}</div>;
};

export default LayoutWithBootstrap;