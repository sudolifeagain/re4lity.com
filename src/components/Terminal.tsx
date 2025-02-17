import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [processingText, setProcessingText] = useState('');
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const targetCommand = 'sudo lifeagain';

  const linuxLogo = `
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+==----:-:::...-*%@@@@@@@@@@@@@@@@@@@@@@%%@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+#@%##############%@@@@@@@@@@@@@@@@@@@@@%...:@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%@@@@%#+#%#%#@@@@%%%#*######**+#%@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@%@@#+#@@@%+--=#@%+==*%#*+==-===*##@@%*#+++**+=++#@@@@@@@@@@@@@@@@@@@@@@@@@@@
-#@@@@@@@%#*+*#+=*#=:..+@@%-:-@@@%##%@@#+%#@%--:=##++*+===++**#%@@@@@@@@@@@@@@@@@@@@@@@*.=
##**+###%%@%%%@@%%#@@@@@*@@@@-::@@@@*:#@@%+-@@@@:.=@@#+*+++++#%@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@%@@@@@%%@@@%@@@@@@@%@@@@@@@@@+-.@@@@=-:@@@=#:%@+..*@=+#%###%@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@#@%@@@%=:::@@@=..@@@@.@@#..%@*:+#+#%@@@@@@@@@@@@@+#@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@%%%%#-+@@@%+--:-@@@=::*@%:@@#..@@#:..###%@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@-#@@@@@@@@*+####%##+**:+@@@%:--:+@@@--*@#:%@%..#@::@+.....+%@@@@@@@@@@@@@@@@@@@@@@
+.=%@%%@@@@@@@@@@@@@@**#**+=#*=-.%@@@==-.#@@@=--@%::@#..=====%@@#=-+@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@+#@@@%%@%#+++--:-+-==+::-%@%-=-:=@@%#=:@@+:=-.:%#@@@@@@@@+#@@@@@@@@@@@@@@@@@@@@@
@@@@@%@@@@@@%%%%*===-*%%@@@@@@*##-:#@@==-=:-#%#*++**+---.:@@@@@@@@@@=+@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@%#++++*@@@@@@@@@@@@@@@@=-@======++***==##*==..@@=...%@@@@#=@@@@@@@@@@@@@@@@@@@
@%%@@@@@%%@%##%%@@@@@@@@@@@@@@@@@@@@@@=.---==**#*+++=#+=-..@@@%%=-=@@@%-*@@@@@@@@@@@@@@@@@
@@@@@@@@@@%###*#@@@@@@@@@@@@@@@@@@@@@@@@=:::.-+****=+=-++-..%+@@=%%-@@@#:=@@@@@@@@@@@@@@@@
@@@@@@@@%#%%@%@@@@@@@*.....-%%##+@@@@@@@@+::....=**+==-:.:...#*@@:*:=@%@=.=@@@@@@@@@@%#@@@
@@@%%######@@@@@@@@@@@@@+..##*@@@@=@@@@@@@+::-:..=--=:-...:+-::-@#:--@#@@:.#@@@@@@@@@@@@@@
@@@@%#####%#####=%@@@@@@@@@@@+%%+@@%@@@@@@@@@@%%...+%@@@@@@%**-::-==@@@@@@::+@@@@@@@@@@@@@
@@@@@@@%*=-::.-=:-@@@@*+%@%@@@-%-#%@#@@@@@@+@@@@@@:#@@@@@@@@@@=..::--..=#:...-@@@@@@@@@@@@
@@@@@@@@@@@@#-.....:@@##+...-@..-..+*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+.....=#@@@@@@@@@@@@
@@@@@@%%%@@@@@@@@+:..-@@@:..-@*...:-+@@@@@@@@@@@@@@@@@@@@@@@@@@@+-@+-=*@@@@@@@#@@@@@@@@@@@
@@@@@@@@@@%@@@@@@@@@-...+@@===-==#@@@@@@@%-.=-%@@@@@@@@@@@@@@@@@@@@@**##@.:@%+*@@@@@@@@@@@
@@@@@%@@@@@@@@@@@@@@@@@@+-..=@@@@@@@-.........%@@@@#@@+-=-:=#@@@@@@@@#@@@....@@@@@@@@@@@@@
@@@@@@@@@@@@@@@##@@@@@@@@@%@@@+-:...::---++#@@@#%%-%*-@@*%:........#@@@@+.:#-+==:-+#%%@@@@
@@@@@@@@@:@@#.-+@%@@@@@@@@@@+%@@@@@@@@@@@@@@@@*#:=@@:......*@@@++:...=@@.::#...#%@@@@@@@@@
@@@@@@@@@@%.@@@@@@@@@@@@%#@@@@@@@@@@@@@@@@@@+=+@@:...-#@@@+:...+#@@+=.#%=+==::..=#%@@@@@@@
@@@@@@-:=@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=-=+-..@@@@@-....=*%@@=-+%#=+@*=*#=-=+-----=+*#%
@@@@@@@@%....@@@@@@@@@@@@@@@@@@@@@@@@@@*..=+@@@@@@-...=%%@@@+:=%@@++#=@@%##*##+--%@@@@%##%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#=-==**++=...=@@@@@@-..-+%%*=#*%%@@@@%###*+=+#+==+%@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*=-:=+++*+++#%@@@+--.:=@@@@#%*#@%##@@#+@@@@#*+=#%*-=%@@@@+
@@@@@@@@@@@@@@@@@@@@@@@@@@@@#++++++**#++*#%#@#+-=@%%@@%=-=+@%@%##@@%#*=-#@@%%+#*--%@@%.-@@
@@@@@@@@@@@@@@@@@@@@@@@@@%#*########*##*##%#++%%%%@#-+-@@@@@*#%@@%#*##*=-##+=+#@@@@=.#@@@%
@@@@@@@@@@@@@@@@@@@@%%%@@##%%%#**+#*####%#+*#@@##@#*@*#%=+##@@@##*#%%##*+#+*%@%+=#@@@@#-@@
@@@@@@%.@@@@@@@@%%%%%@@@%%%##+**#####%%#*%*%%%+=%@+@+#@+*@@@%%##%##%###+++*#*+%@@@*=%@@@@%
@@@@@@@@@@@@@%@@@%%@@@@%###########%%#*%*#%%#+*@@+@##@%#@@@%#%%%#%%%##+++#@@@@@##%@@@#@@@@
@@@@@@@@@@@@@@@@@@@@@@#######%%%#%%%#%##@@@###@@+@%+%@%%%@#%%%%%@%%%###%@%%%@@@@@@@@@@@%@@
@@@@@@@@@@@@@@@@@@@@%#%%%%%%%%%%%%%%%*%@%#*%#@@=@%*#@@#@%@@%%%%%%%#####%@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@%##%%%%%%#%%%%%%%%##%@%%#@%@@#@@##@@%%%%%#%%#%%%%######%@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@%##%%%#%%%%%%%%%%%%#%%%%*%@#%@#@@*#@@@%%%%@%%%%%%%%####%%%#%%@@@@@@@@@@@@@@
@@@@@@@@@@@%%%%%%%%%%%%%%%%%%%%%%#@@%@#%@%@@#@@##@@@%%%%%%%%%%%%%#%####*+#%@@@@@@@@@@@@@@@
@@@@@@%@@%@%%%@%%%@@%@%%%%%%@%@#%@@@@%@@#@@%@@%#@@%%%%%%%%%%%%%%%%##*++**#%@@@@@@@@@@@@@@@
@@%@@@@%@@@%%@@@@@%%%%%%@%%%%%#%@@@%%@@%@@#%@%%@@@@%@@%%%%%%%%%%%#####%%@@@@@@@@@@@@@@@@@@
@@@@@%@@@@@@@@%%%@@@@%%%%%@@%#@%@@#%@@#@@%%@#%@@@@%@%%%%%%%%%%%%#####%@@@@@@@@@@@@@@@@@@@@
%%%%%%@%%%%%%#%%%%###%%##%%#%%%####%#####*#**#*+++++=====-----::::::::-=#@@@@@@@@@@@@@@@@@


  `;

  const bootMessages = [
    '[    0.000000] Linux version 6.5.0-re4lity',
    '[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.5.0-re4lity',
    '[    0.004000] BIOS-provided physical RAM map:',
    '[    0.004000] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable',
    '[    0.005000] NX (Execute Disable) protection: active',
    '[    0.005000] SMBIOS 2.8 present.',
    '[    0.005000] DMI: re4lity custom build/Virtual Machine, BIOS 6.00 01/01/2024',
    '[    0.008000] Initializing cgroup subsys cpuset',
    '[    0.010000] Console: colour VGA+ 80x25',
    '[    0.012000] Detected 128TB Neural Memory',
    '[    0.012000] Quantum Processing Unit v2.0 detected',
    '[    0.014000] CyberKernel 3.0 initialized',
    '[    0.016000] Initializing neural network subsystems...',
    '[    0.018000] Quantum entanglement established',
    '[    0.020000] System security protocols activated',
    '[    0.024000] Mounting virtual filesystems...',
    '[    0.028000] Network interfaces initialized',
    '[    0.030000] Quantum encryption layer activated',
    '[    0.032000] Neural firewall enabled',
    '[    0.034000] System initialization complete'
  ];

  useEffect(() => {
    if (command.length < targetCommand.length) {
      const timer = setTimeout(() => {
        setCommand(targetCommand.slice(0, command.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else if (command === targetCommand && !isProcessing) {
      setIsProcessing(true);
      startProcessing();
    }
  }, [command, isProcessing]);

  const generateRandomString = (length: number) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const startProcessing = () => {
    let count = 0;
    const maxCount = 15;
    
    const interval = setInterval(() => {
      if (count < maxCount) {
        setProcessingText(generateRandomString(30));
        count++;
      } else {
        clearInterval(interval);
        setProcessingText('');
        startBootSequence();
      }
    }, 100);
  };

  const startBootSequence = () => {
    setBootLogs([linuxLogo]);
    let messageIndex = 0;

    const interval = setInterval(() => {
      if (messageIndex < bootMessages.length) {
        setBootLogs(prev => [...prev, bootMessages[messageIndex]]);
        messageIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowWelcome(true), 500);
      }
    }, 80);
  };

  return (
    <div className="font-mono text-left w-full bg-black/80 p-4 sm:p-8 rounded-lg border border-green-500 h-screen sm:min-h-[80vh] flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
      </div>
      <div className="mb-3 text-base sm:text-lg">
        <span className="text-green-500">root@system</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$ </span>
        <span className="text-green-500">{command}</span>
        <AnimatePresence>
          {showCursor && (
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 sm:w-2.5 h-4 sm:h-6 bg-green-500 ml-1"
            />
          )}
        </AnimatePresence>
      </div>
      
      {processingText && (
        <div className="text-xs sm:text-sm text-green-400 overflow-hidden whitespace-pre-wrap mb-3 font-mono">
          {processingText}
        </div>
      )}

      <div className="flex-1 overflow-auto text-xs sm:text-sm">
        <AnimatePresence>
          {bootLogs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-green-400 ${log === linuxLogo ? 'whitespace-pre font-mono text-[0.6rem] sm:text-xs leading-[1.15]' : ''}`}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-3xl text-center text-green-500 font-bold mt-3 sm:mt-4"
          >
            Welcome to the re4lity's site
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Terminal;