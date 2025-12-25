"use client";

import { useState, useEffect } from "react";
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
  const [view, setView] = useState<"login" | "register">(defaultView);

  useEffect(() => {
    if (isOpen) {
      setView(defaultView);
    }
  }, [isOpen, defaultView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the actual authentication logic
    console.log(`Submitting ${view} form`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {view === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                className="col-span-3"
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
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            {view === "login" ? "Login" : "Sign Up"}
          </Button>
        </form>

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
    </Dialog>
  );
};
