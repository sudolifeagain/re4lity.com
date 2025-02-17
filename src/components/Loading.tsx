import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <div className="text-green-500 flex flex-col items-center">
        <Terminal className="w-16 h-16 mb-4" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="text-2xl font-mono"
        >
          LOADING SYSTEM...
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loading;