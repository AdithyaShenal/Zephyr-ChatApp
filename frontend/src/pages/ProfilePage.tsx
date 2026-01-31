import { Input } from "@/components/ui/input";
import useMe from "@/hooks/useMe";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { Label } from "@radix-ui/react-label";
import {
  User,
  Mail,
  Calendar,
  CheckCircle,
  Camera,
  Upload,
} from "lucide-react";

import userProfileAlter from "../assets/userProfile.png";

const ProfilePage = () => {
  const { data: user } = useMe();
  const { mutate: uploadImage } = useUpdateProfile();

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-md border border-gray-200 overflow-hidden">
          {/* Profile Picture Section */}
          <div className="bg-linear-to-r from-gray-900 to-gray-700 px-6 py-12 md:px-8 md:py-16">
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <img
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                  src={user?.profilePic || userProfileAlter}
                  alt="Profile"
                />
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="w-full max-w-md">
                <Label
                  htmlFor="picture"
                  className="block text-sm font-medium text-white mb-3 text-center"
                >
                  Change Profile Picture
                </Label>

                <div className="flex justify-center">
                  <label
                    htmlFor="picture"
                    className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 
                 text-white text-sm font-medium cursor-pointer 
                 hover:border-white/70 hover:bg-white/10 transition-all"
                  >
                    <Upload className="h-4 w-4" />
                    Upload profile image
                  </label>

                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const base64 = await fileToBase64(file);
                      uploadImage(base64);
                    }}
                  />
                </div>

                <p className="text-xs text-gray-300 mt-2 text-center">
                  JPG, PNG or GIF (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-gray-700" />
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      disabled
                      type="text"
                      id="fullname"
                      value={user?.fullName ?? "Full name"}
                      className="pl-10 bg-gray-50 border-gray-200 disabled:opacity-70"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      disabled
                      type="email"
                      id="email"
                      value={user?.email ?? "email@example.com"}
                      className="pl-10 bg-gray-50 border-gray-200 disabled:opacity-70"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gray-700" />
                Account Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="memberSince"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Member Since
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      disabled
                      type="text"
                      id="memberSince"
                      value={new Date(user?.createdAt ?? "").toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                      className="pl-10 bg-gray-50 border-gray-200 disabled:opacity-70"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Account Status
                  </Label>
                  <div className="relative">
                    <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                    <Input
                      disabled
                      type="text"
                      id="status"
                      value="Active"
                      className="pl-10 bg-green-50 border-green-200 text-green-800 font-medium disabled:opacity-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
