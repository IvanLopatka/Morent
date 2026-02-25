"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Edit2, Save, X, Camera, Loader2, Upload } from "lucide-react";
import { AuthService } from "@/lib/auth.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface UserInfoUIProps {
  profile: any;
}

export const UserInfoUI = ({ profile }: UserInfoUIProps) => {
  useEffect(() => {
    console.log("Current Profile State:", profile);
  }, [profile]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
  });
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile?.id) return;

    setIsUploading(true);
    try {
      const { error } = await AuthService.uploadAvatar(file, profile.id);
      if (error) {
        console.error("Upload error details:", error);
        alert(`Upload failed: ${error.message || "Unknown storage error"}`);
        return;
      }
      
      console.log("Avatar updated successfully");
      setIsUploadDialogOpen(false);
      window.location.reload(); 
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      alert(`Failed to upload image: ${error.message || "Check your Supabase console"}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    // Check if any changes were made
    const hasChanges =
      formData.full_name !== (profile?.full_name || "") ||
      formData.email !== (profile?.email || "") ||
      formData.phone !== (profile?.phone || "");

    if (!hasChanges) {
      console.log("No changes detected, skipping save.");
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await AuthService.updateProfile({
        full_name: formData.full_name,
        phone: formData.phone,
      });

      if (error) {
        throw error;
      }

      console.log("Profile updated successfully");
      setIsEditing(false);
      // Force a refresh to show updated data from the server components
      window.location.reload();
    } catch (error: any) {
      console.error("Error updating profile detailed:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        error
      });
      alert(`Failed to update profile: ${error.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col w-full p-4 md:p-8 items-start gap-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            My Profile
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your personal information and account settings
          </p>
        </div>

        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="rounded-xl px-6 py-6 border-slate-200 hover:bg-slate-50 transition-all font-semibold gap-2 shadow-sm"
          >
            <Edit2 className="w-4 h-4 text-primary" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              onClick={handleCancel}
              variant="ghost"
              className="rounded-xl px-6 py-6 hover:bg-slate-100 font-semibold gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="rounded-xl px-8 py-6 bg-primary hover:bg-primary/90 text-white font-semibold gap-2 shadow-lg shadow-primary/20 transition-all min-w-[140px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        {/* Profile Card */}
        <div className="lg:col-span-1 flex flex-col items-center p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-br from-primary/10 to-primary/5" />
          
          <div className="relative mt-4">
            <div className="relative">
              <div className="w-[120px] h-[120px] rounded-full ring-4 ring-white shadow-md overflow-hidden relative bg-slate-50">
                <Image
                  src={profile?.avatar_url || "/profile.svg"}
                  alt="profile"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              {isEditing && (
                <button 
                  onClick={() => setIsUploadDialogOpen(true)}
                  className="absolute bottom-1 right-1 p-2 bg-primary text-white rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 text-center space-y-1">
            <h3 className="text-xl font-bold text-slate-900">
              {isEditing ? formData.full_name : profile?.full_name || "New User"}
            </h3>
            <p className="text-slate-500 text-sm font-medium">{profile?.email}</p>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50 w-full space-y-4">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm">{profile?.email}</span>
            </div>
          </div>
        </div>

        {/* Details Form/View */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40">
          <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Personal Details
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-slate-700 font-semibold ml-1">
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="rounded-xl border-slate-200 focus:ring-primary/20 h-12 bg-slate-50/50"
                  placeholder="Your full name"
                />
              ) : (
                <div className="h-12 px-4 flex items-center bg-slate-50/30 rounded-xl border border-transparent text-slate-700 font-medium capitalize">
                  {profile?.full_name || "—"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold ml-1">
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  value={formData.email}
                  className="rounded-xl border-slate-200 bg-slate-100 cursor-not-allowed h-12"
                  placeholder="Your email address"
                />
              ) : (
                <div className="h-12 px-4 flex items-center bg-slate-50/30 rounded-xl border border-transparent text-slate-500 font-medium">
                  {profile?.email || "—"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700 font-semibold ml-1">
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="rounded-xl border-slate-200 focus:ring-primary/20 h-12 bg-slate-50/50"
                  placeholder="+1 (555) 000-0000"
                />
              ) : (
                <div className="h-12 px-4 flex items-center bg-slate-50/30 rounded-xl border border-transparent text-slate-700 font-medium">
                  {profile?.phone || "—"}
                </div>
              )}
            </div>

          </div>

          <div className="mt-10 p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <X className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary">Pro Tip</p>
              <p className="text-xs text-slate-600 mt-1">
                Keep your profile updated to receive personalized car recommendations 
                and speed up your booking process.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Upload Profile Photo</DialogTitle>
            <DialogDescription className="text-slate-500">
              Update your profile picture to help others recognize you.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50 gap-4 mt-4 group hover:border-primary/30 transition-colors duration-300">
            <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform duration-300">
              {isUploading ? (
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              ) : (
                <Camera className="w-8 h-8 text-primary" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700">
                {isUploading ? "Uploading..." : "Click or drag image to upload"}
              </p>
              <p className="text-xs text-slate-500 mt-1">Recommended: Square image, max 2MB</p>
            </div>
            <Input 
              type="file" 
              id="avatar-upload" 
              className="hidden" 
              accept="image/*"
              disabled={isUploading}
              onChange={handleAvatarUpload}
            />
            <Button 
              onClick={() => document.getElementById("avatar-upload")?.click()}
              disabled={isUploading}
              className="mt-2 rounded-xl bg-white text-primary border-primary/20 border hover:bg-primary/5 shadow-sm"
              variant="outline"
            >
              {isUploading ? "Processing..." : "Select Image"}
            </Button>
          </div>

          <DialogFooter className="sm:justify-center mt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsUploadDialogOpen(false)}
              className="rounded-xl font-semibold"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
