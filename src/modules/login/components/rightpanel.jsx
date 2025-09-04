import React from "react";

const RightPanel = () => {
  return (
    <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center">
      <div className="text-white text-center px-10">
        <h2 className="text-4xl font-bold mb-4">Modern. Secure. Fast.</h2>
        <p className="text-lg opacity-80">
          Experience a secure login system built with modern UI principles.
        </p>
        <img
          src="https://undraw.co/api/illustrations/59b4733a-04a5-4ad2-a02c-b3167f6e3de6"
          alt="Illustration"
          className="mt-8 max-w-md mx-auto"
        />
      </div>
    </div>
  );
};

export default RightPanel;
