"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/lib/auth.service";
import { useAuthStore } from "@/store/auth.store";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: "login" | "register";
}

export const AuthModal = ({
  isOpen,
  onClose,
  defaultView = "login",
}: AuthModalProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { session, setSession } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"login" | "register">(defaultView);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      setView(defaultView);
    }
  }, [isOpen, defaultView]);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await AuthService.getSession();
      setSession(session);
      setLoading(false);
    };

    getInitialSession();

    const { data: { subscription } } = AuthService.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    if (view === "register") {
      const { error: signUpError } = await AuthService.signUp(
        formData.email,
        formData.password,
        formData.name
      );
      
      if (signUpError) {
        console.error("Sign up error:", signUpError.message);
        setError(signUpError.message);
        return;
      }
    } else {
      const { error: signInError } = await AuthService.signIn(
        formData.email,
        formData.password
      );

      if (signInError) {
        console.error("Sign in error:", signInError.message);
        setError(signInError.message);
        
        return;
      }
    }

    // Success: Refresh the page to update Server Components and close the modal
    window.location.reload(); 
    onClose();
    
  };

  const handleSignOut = async () => {
    await AuthService.signOut();
    window.location.reload();
  };

  const handleGoogleSignIn = async () => {
    const { error: signInError } = await AuthService.signInWithGoogle();
    if (signInError) {
      console.error("Google sign in error:", signInError.message);
      setError(signInError.message);
    }
  };

  if (loading && isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {session ? (
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
                Account
            </DialogTitle>
            <DialogDescription className="text-center">
                You are currently signed in.
            </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
            <div className="text-center">
                <p className="font-semibold">{session.user.user_metadata?.full_name || "User"}</p>
                <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
            <Button 
                onClick={handleSignOut} 
                
                variant="destructive"
                className="w-full"
            >
                Sign Out
            </Button>
            <Button 
                onClick={() => router.push("/profile/" + session.user.id)} 
                variant="default"
                className="w-full bg-blue-500"
            >
                View Profile
            </Button>
        </div>
        </DialogContent>
      ) : (
      
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">
                    {view === "login" ? "Welcome Back" : "Create Account"}
                </DialogTitle>
                <DialogDescription className="text-center">
                    {view === "login"
                    ? "Enter your credentials to access your account"
                    : "Enter your details to create a new account"}
                </DialogDescription>
                {error && (
                    <p className="text-red-500 text-center mt-2">
                        {error}
                    </p>
                )}
                </DialogHeader>

                {/* View Toggle Buttons */}
                <div className="flex items-center bg-secondary/50 p-1 rounded-lg w-full mt-4">
                  <button
                    type="button"
                    onClick={() => setView("login")}
                    className={`flex-1 text-sm font-medium py-2 rounded-md transition-all duration-200 ${
                      view === "login"
                        ? "bg-white text-black shadow-sm"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("register")}
                    className={`flex-1 text-sm font-medium py-2 rounded-md transition-all duration-200 ${
                      view === "register"
                        ? "bg-blue-500 text-black shadow-sm"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    Register
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                {view === "register" && (
                    <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        className="col-span-3"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    className="col-span-3"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="col-span-3"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    {view === "login" ? "Login" : "Sign Up"}
                </Button>
                </form>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleGoogleSignIn}
                >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Google
                </Button>

                <div className="flex justify-center text-sm text-gray-500 mt-2">
                {view === "login" ? (
                    <p>
                    Don&apos;t have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setView("register")}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Sign Up
                    </button>
                    </p>
                ) : (
                    <p>
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setView("login")}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </button>
                    </p>
                )}
                </div>
            </DialogContent>
        )}
    </Dialog>
  );
};
