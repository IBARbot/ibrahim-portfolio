import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Lock, Mail, CheckCircle, AlertCircle, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { supabase } from "../utils/supabase/client";

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileSettingsModal({ isOpen, onClose }: ProfileSettingsModalProps) {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("email");

  useEffect(() => {
    if (isOpen) {
      loadCurrentUser();
    }
  }, [isOpen]);

  const loadCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      setCurrentEmail(user.email);
      setNewEmail(user.email);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newEmail || newEmail === currentEmail) {
      setError("Yeni email cari email-dən fərqli olmalıdır");
      return;
    }

    if (!emailPassword) {
      setError("Şifrənizi daxil edin");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError("Düzgün email formatı daxil edin");
      return;
    }

    setIsLoading(true);

    try {
      // Verify password first
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password: emailPassword,
      });

      if (signInError) {
        throw new Error("Şifrə yanlışdır");
      }

      // Update email
      const { error: updateError } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      setSuccess("Email uğurla dəyişdirildi! 🎉");
      setCurrentEmail(newEmail);
      setEmailPassword("");
      
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Email dəyişdirilərkən xəta baş verdi");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 8) {
      setError("Yeni şifrə minimum 8 simvol olmalıdır");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Şifrələr uyğun gəlmir");
      return;
    }

    if (newPassword === currentPassword) {
      setError("Yeni şifrə köhnə şifrədən fərqli olmalıdır");
      return;
    }

    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.email) {
        throw new Error("İstifadəçi tapılmadı");
      }

      // Verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        throw new Error("Cari şifrə yanlışdır");
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      setSuccess("Şifrə uğurla dəyişdirildi! 🎉");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Şifrə dəyişdirilərkən xəta baş verdi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setEmailPassword("");
      setError("");
      setSuccess("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User size={20} className="text-teal-600" />
            Profil Parametrləri
          </DialogTitle>
          <DialogDescription>
            Email və şifrənizi dəyişdirin
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
            <h3 className="text-slate-900 mb-2">{success}</h3>
            <Button
              onClick={() => setSuccess("")}
              className="mt-4 bg-gradient-to-r from-teal-600 to-blue-700"
            >
              Davam et
            </Button>
          </motion.div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="gap-2">
                <Mail size={16} />
                Email
              </TabsTrigger>
              <TabsTrigger value="password" className="gap-2">
                <Lock size={16} />
                Şifrə
              </TabsTrigger>
            </TabsList>

            {/* Email Tab */}
            <TabsContent value="email" className="space-y-4 pt-4">
              <form onSubmit={handleEmailChange} className="space-y-4">
                {error && activeTab === "email" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
                  >
                    <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </motion.div>
                )}

                <div>
                  <Label htmlFor="currentEmail">Cari Email</Label>
                  <Input
                    id="currentEmail"
                    type="email"
                    value={currentEmail}
                    disabled
                    className="bg-slate-50"
                  />
                </div>

                <div>
                  <Label htmlFor="newEmail">Yeni Email</Label>
                  <Input
                    id="newEmail"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="yeni@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="emailPassword">Şifrənizli Təsdiqlə</Label>
                  <Input
                    id="emailPassword"
                    type="password"
                    value={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Təhlükəsizlik üçün şifrənizi daxil edin
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Ləğv et
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Dəyişdirilir...
                      </span>
                    ) : (
                      "Email-i Dəyişdir"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Password Tab */}
            <TabsContent value="password" className="space-y-4 pt-4">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                {error && activeTab === "password" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
                  >
                    <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </motion.div>
                )}

                <div>
                  <Label htmlFor="currentPassword">Cari Şifrə</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword">Yeni Şifrə</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Minimum 8 simvol
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Yeni Şifrəni Təsdiqlə</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Ləğv et
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Dəyişdirilir...
                      </span>
                    ) : (
                      "Şifrəni Dəyişdir"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
