import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-green-500 py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© 2024 @re4lity. All rights reserved.</p>
          </div>
          <div className="text-sm">
            <p>Licensed under MIT License</p>
            <p className="mt-2">
              Permission is hereby granted, free of charge, to any person obtaining a copy
              of this software and associated documentation files.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;