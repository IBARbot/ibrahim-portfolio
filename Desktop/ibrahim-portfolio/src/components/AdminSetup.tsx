import { useState } from "react";
import { motion } from "motion/react";
import { UserPlus, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function AdminSetup() {
  const [email, setEmail] = useState("ibrahim@admin.com");
  const [password, setPassword] = useState("Ibrahim2024!");
  const [name, setName] = useState("İbrahim Abdullayev");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-45a44eb5/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Admin yaradılarkən xəta baş verdi");
      }

      setSuccess(true);
      console.log("✅ Admin yaradıldı:", data);
    } catch (err: any) {
      setError(err.message || "Xəta baş verdi");
      console.error("❌ Admin yaratma xətası:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus size={32} className="text-white" />
            </div>
            <CardTitle>Admin Account Yaratmaq</CardTitle>
            <CardDescription>
              İlk admin istifadəçini yaradın (Yalnız bir dəfə)
            </CardDescription>
          </CardHeader>

          <CardContent>
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
                <h3 className="text-slate-900 mb-2">Admin Yaradıldı! 🎉</h3>
                <p className="text-slate-600 mb-6">
                  İndi <strong>/admin</strong> səhifəsinə gedib giriş edə
                  bilərsiniz.
                </p>
                <div className="space-y-2 text-left bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-700">
                    <strong>Email:</strong> {email}
                  </p>
                  <p className="text-sm text-slate-700">
                    <strong>Şifrə:</strong> {password}
                  </p>
                </div>
                <Button
                  onClick={() => (window.location.href = "/admin")}
                  className="mt-6 bg-teal-600 hover:bg-teal-700"
                >
                  Admin Panel-ə Get →
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleCreateAdmin} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                  >
                    <AlertCircle
                      size={20}
                      className="text-red-600 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-sm text-red-800">{error}</p>
                  </motion.div>
                )}

                <div>
                  <Label htmlFor="name">Ad Soyad</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="İbrahim Abdullayev"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ibrahim@admin.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Şifrə</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Güclü şifrə"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Minimum 8 simvol, böyük hərf və rəqəm
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800"
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
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Yaradılır...
                    </span>
                  ) : (
                    <>
                      <UserPlus size={18} className="mr-2" />
                      Admin Yarat
                    </>
                  )}
                </Button>

                <div className="pt-4 border-t">
                  <p className="text-sm text-slate-600 text-center">
                    Bu səhifəni yalnız bir dəfə istifadə edin. Admin
                    yaratdıqdan sonra bu səhifəni silə bilərsiniz.
                  </p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white/80 hover:text-white transition-colors text-sm"
          >
            ← Ana səhifəyə qayıt
          </a>
        </div>
      </motion.div>
    </div>
  );
}
