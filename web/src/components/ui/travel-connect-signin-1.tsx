
'use client';

import React, { useRef, useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { getSupabase } from "@/lib/supabase";
import { useRouter } from "@/i18n/navigation";

// Helper function to merge class names
const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

// Custom Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

const Button = ({ 
  children, 
  variant = "default", 
  className = "", 
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variantStyles = {
    default: "bg-primary bg-gradient-to-r from-teal to-navy text-white hover:opacity-90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm text-gray-800 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

type RoutePoint = {
  x: number;
  y: number;
  delay: number;
};

const DotMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Set up routes that will animate across the map
  const routes: { start: RoutePoint; end: RoutePoint; color: string }[] = [
    {
      start: { x: 100, y: 150, delay: 0 },
      end: { x: 200, y: 80, delay: 2 },
      color: "#1A7A8A",
    },
    {
      start: { x: 200, y: 80, delay: 2 },
      end: { x: 260, y: 120, delay: 4 },
      color: "#1A7A8A",
    },
    {
      start: { x: 50, y: 50, delay: 1 },
      end: { x: 150, y: 180, delay: 3 },
      color: "#1A7A8A",
    },
    {
      start: { x: 280, y: 60, delay: 0.5 },
      end: { x: 180, y: 180, delay: 2.5 },
      color: "#1A7A8A",
    },
  ];

  // Create dots for the world map
  const generateDots = (width: number, height: number) => {
    const dots = [];
    const gap = 12;
    const dotRadius = 1;

    // Create a dot grid pattern with random opacity
    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        // Shape the dots to form a world map silhouette
        const isInMapShape =
          // North America
          ((x < width * 0.25 && x > width * 0.05) && (y < height * 0.4 && y > height * 0.1)) ||
          // South America
          ((x < width * 0.25 && x > width * 0.15) && (y < height * 0.8 && y > height * 0.4)) ||
          // Europe
          ((x < width * 0.45 && x > width * 0.3) && (y < height * 0.35 && y > height * 0.15)) ||
          // Africa
          ((x < width * 0.5 && x > width * 0.35) && (y < height * 0.65 && y > height * 0.35)) ||
          // Asia
          ((x < width * 0.7 && x > width * 0.45) && (y < height * 0.5 && y > height * 0.1)) ||
          // Australia
          ((x < width * 0.8 && x > width * 0.65) && (y < height * 0.8 && y > height * 0.6));

        if (isInMapShape && Math.random() > 0.3) {
          dots.push({
            x,
            y,
            radius: dotRadius,
            opacity: Math.random() * 0.5 + 0.2, // Slightly higher opacity for light theme
          });
        }
      }
    }
    return dots;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
      canvas.width = width;
      canvas.height = height;
    });

    resizeObserver.observe(canvas.parentElement as Element);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dots = generateDots(dimensions.width, dimensions.height);
    let animationFrameId: number;
    let startTime = Date.now();

    // Draw background dots
    function drawDots() {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw the dots
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 122, 138, ${dot.opacity})`;
        ctx.fill();
      });
    }

    // Draw animated routes
    function drawRoutes() {
      const currentTime = (Date.now() - startTime) / 1000; // Time in seconds
      
      routes.forEach(route => {
        const elapsed = currentTime - route.start.delay;
        if (elapsed <= 0) return;
        
        const duration = 3; // Animation duration in seconds
        const progress = Math.min(elapsed / duration, 1);
        
        const x = route.start.x + (route.end.x - route.start.x) * progress;
        const y = route.start.y + (route.end.y - route.start.y) * progress;
        
        // Draw the route line
        ctx.beginPath();
        ctx.moveTo(route.start.x, route.start.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = route.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Draw the start point
        ctx.beginPath();
        ctx.arc(route.start.x, route.start.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = route.color;
        ctx.fill();
        
        // Draw the moving point
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#E2685E";
        ctx.fill();

        // Add glow effect to the moving point
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(226, 104, 94, 0.4)";
        ctx.fill();
        
        // If the route is complete, draw the end point
        if (progress === 1) {
          ctx.beginPath();
          ctx.arc(route.end.x, route.end.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = route.color;
          ctx.fill();
        }
      });
    }
    
    // Animation loop
    function animate() {
      drawDots();
      drawRoutes();
      
      // If all routes are complete, restart the animation
      const currentTime = (Date.now() - startTime) / 1000;
      if (currentTime > 15) { // Reset after 15 seconds
        startTime = Date.now();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

const SignInCard = () => {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const swap = (m: "signin" | "signup") => {
    setMode(m);
    setError("");
    setInfo("");
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    const supabase = getSupabase();
    if (!supabase) {
      setError(t("notConfigured"));
      return;
    }
    if (!email.includes("@")) {
      setError(t("errEmail"));
      return;
    }
    if (password.length < 6) {
      setError(t("errPasswordShort"));
      return;
    }
    setBusy(true);
    const { data, error: err } = await supabase.auth.signUp({ email, password });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    if (data.session) router.push("/my-tours"); // auto-confirmed
    else setInfo(t("confirmSent")); // email confirmation required
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    const supabase = getSupabase();
    if (!supabase) {
      setError(t("notConfigured"));
      return;
    }
    if (!email.includes("@")) {
      setError(t("errEmail"));
      return;
    }
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) setError(t("errCreds"));
    else router.push("/my-tours");
  };

  const google = async () => {
    setError("");
    const supabase = getSupabase();
    if (!supabase) {
      setError(t("notConfigured"));
      return;
    }
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const forgot = async () => {
    setError("");
    setInfo("");
    const supabase = getSupabase();
    if (!supabase) {
      setError(t("notConfigured"));
      return;
    }
    if (!email.includes("@")) {
      setError(t("errEmail"));
      return;
    }
    const { error: err } = await supabase.auth.resetPasswordForEmail(email);
    if (err) setError(err.message);
    else setInfo(t("resetSent"));
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl overflow-hidden rounded-2xl flex bg-white shadow-xl"
      >
        {/* Left side - Map */}
        <div className="hidden md:block w-1/2 h-[600px] relative overflow-hidden border-r border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-aqua to-edge">
            <DotMap />
            
            {/* Logo and text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mb-6"
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal to-navy flex items-center justify-center shadow-lg shadow-teal/30">
                  <ArrowRight className="text-white h-6 w-6" />
                </div>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal to-navy"
              >
                Hayasa Tours
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-sm text-center text-gray-600 max-w-xs"
              >
                {t('brandTagline')}
              </motion.p>
            </div>
          </div>
        </div>
        
        {/* Right side - Sign In Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-800">{t('welcome')}</h1>
            <p className="text-gray-500 mb-8">{t('subtitle')}</p>

            <div className="mb-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-all duration-300 text-gray-700 shadow-sm"
                onClick={google}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fillOpacity=".54"
                  />
                  <path
                    fill="#4285F4"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#34A853"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="#EA4335" d="M1 1h22v22H1z" fillOpacity="0" />
                </svg>
                <span>{t('google')}</span>
              </button>
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('or')}</span>
              </div>
            </div>
            
            <form className="space-y-5" onSubmit={mode === "signup" ? signUp : signIn}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('email')} <span className="text-amber">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  required
                  className="bg-gray-50 border-gray-200 placeholder:text-gray-400 text-gray-800 w-full focus:border-teal focus:ring-teal"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('password')} <span className="text-amber">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('passwordPlaceholder')}
                    required
                    className="bg-gray-50 border-gray-200 placeholder:text-gray-400 text-gray-800 w-full pr-10 focus:border-teal focus:ring-teal"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {error && <p className="text-sm text-amber-dark">{error}</p>}
              {info && <p className="text-sm text-teal">{info}</p>}

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="pt-2"
              >
                <Button
                  type="submit"
                  disabled={busy}
                  className={cn(
                    "w-full bg-gradient-to-r relative overflow-hidden from-teal to-navy hover:opacity-90 text-white py-2 rounded-lg transition-all duration-300",
                    isHovered ? "shadow-lg shadow-teal/30" : ""
                  )}
                >
                  <span className="flex items-center justify-center">
                    {busy ? t('sending') : mode === 'signup' ? t('signUp') : t('signIn')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                  {isHovered && (
                    <motion.span
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ filter: "blur(8px)" }}
                    />
                  )}
                </Button>
              </motion.div>
              
              <div className="text-center mt-6 space-y-2">
                {mode === 'signin' && (
                  <button type="button" onClick={forgot} className="block w-full text-teal hover:text-teal-dark text-sm transition-colors">
                    {t('forgot')}
                  </button>
                )}
                <div className="text-sm text-gray-500">
                  {mode === 'signin' ? (
                    <>
                      {t('noAccount')}{' '}
                      <button type="button" onClick={() => swap('signup')} className="font-semibold text-teal hover:text-teal-dark transition-colors">
                        {t('signUp')}
                      </button>
                    </>
                  ) : (
                    <>
                      {t('haveAccount')}{' '}
                      <button type="button" onClick={() => swap('signin')} className="font-semibold text-teal hover:text-teal-dark transition-colors">
                        {t('signIn')}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-aqua to-edge p-4">
      <SignInCard />
    </div>
  );
};

export default Index;
