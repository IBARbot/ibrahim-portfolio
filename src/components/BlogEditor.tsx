import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Save,
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  Eye,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface BlogReference {
  title: string;
  url: string;
  source?: string;
}

export interface BlogPostData {
  id?: string;
  titleEn: string;
  titleRu: string;
  titleAz: string;
  dateEn: string;
  dateRu: string;
  dateAz: string;
  excerptEn: string;
  excerptRu: string;
  excerptAz: string;
  contentEn: string;
  contentRu: string;
  contentAz: string;
  imageUrl: string;
  referencesEn: string;
  referencesRu: string;
  referencesAz: string;
  references: BlogReference[];
}

interface BlogEditorProps {
  post?: BlogPostData | null;
  onSave: (post: BlogPostData) => Promise<void>;
  onCancel: () => void;
  onUploadImage?: (file: File) => Promise<string>;
}

export function BlogEditor({ post, onSave, onCancel, onUploadImage }: BlogEditorProps) {
  const [formData, setFormData] = useState<BlogPostData>(
    post || {
      titleEn: "",
      titleRu: "",
      titleAz: "",
      dateEn: "",
      dateRu: "",
      dateAz: "",
      excerptEn: "",
      excerptRu: "",
      excerptAz: "",
      contentEn: "",
      contentRu: "",
      contentAz: "",
      imageUrl: "",
      referencesEn: "References & Resources",
      referencesRu: "Ссылки и Ресурсы",
      referencesAz: "İstinadlar və Mənbələr",
      references: [],
    }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(formData.imageUrl);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof BlogPostData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setImagePreview(url);
    handleInputChange("imageUrl", url);
  };

  const addReference = () => {
    setFormData((prev) => ({
      ...prev,
      references: [...prev.references, { title: "", url: "", source: "" }],
    }));
  };

  const removeReference = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }));
  };

  const updateReference = (
    index: number,
    field: keyof BlogReference,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.map((ref, i) =>
        i === index ? { ...ref, [field]: value } : ref
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let finalImageUrl = formData.imageUrl;

      // Upload image if file selected
      if (imageFile && onUploadImage) {
        finalImageUrl = await onUploadImage(imageFile);
      }

      await onSave({
        ...formData,
        imageUrl: finalImageUrl,
      });
    } catch (err: any) {
      setError(err.message || "Failed to save blog post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="min-h-screen py-8 px-4">
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-slate-900">
              {post?.id ? "Bloqu Redaktə Et" : "Yeni Bloq Yarat"}
            </h2>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6">
            {/* Image Upload Section */}
            <div className="mb-8 p-6 bg-slate-50 rounded-xl">
              <Label className="text-slate-900 mb-4 block">Şəkil</Label>

              <Tabs defaultValue="url" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="url">URL daxil et</TabsTrigger>
                  <TabsTrigger value="upload">Fayl yüklə</TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="space-y-4">
                  <Input
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.imageUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                  />
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="flex-1"
                    />
                    <ImageIcon size={20} className="text-slate-400" />
                  </div>
                  {!onUploadImage && (
                    <p className="text-sm text-amber-600">
                      ⚠️ Şəkil upload funksiyası Supabase konfiqurasiyasından
                      sonra aktivləşəcək
                    </p>
                  )}
                </TabsContent>
              </Tabs>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-slate-600 mb-2">Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Multi-language Tabs */}
            <Tabs defaultValue="en" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
                <TabsTrigger value="ru">🇷🇺 Русский</TabsTrigger>
                <TabsTrigger value="az">🇦🇿 Azərbaycan</TabsTrigger>
              </TabsList>

              {/* English */}
              <TabsContent value="en" className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="titleEn">Title (English)</Label>
                  <Input
                    id="titleEn"
                    value={formData.titleEn}
                    onChange={(e) => handleInputChange("titleEn", e.target.value)}
                    placeholder="10 Essential Flight Booking Tips..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dateEn">Date (English)</Label>
                  <Input
                    id="dateEn"
                    value={formData.dateEn}
                    onChange={(e) => handleInputChange("dateEn", e.target.value)}
                    placeholder="December 2024"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerptEn">Excerpt (English)</Label>
                  <Textarea
                    id="excerptEn"
                    value={formData.excerptEn}
                    onChange={(e) => handleInputChange("excerptEn", e.target.value)}
                    placeholder="Short description (150-200 characters)..."
                    rows={3}
                    required
                  />
                  <p className="text-sm text-slate-500 mt-1">
                    {formData.excerptEn.length} simvol
                  </p>
                </div>

                <div>
                  <Label htmlFor="contentEn">Content (English)</Label>
                  <Textarea
                    id="contentEn"
                    value={formData.contentEn}
                    onChange={(e) => handleInputChange("contentEn", e.target.value)}
                    placeholder="Full blog content... Use \n\n for paragraphs."
                    rows={12}
                    required
                  />
                </div>
              </TabsContent>

              {/* Russian */}
              <TabsContent value="ru" className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="titleRu">Заголовок (Русский)</Label>
                  <Input
                    id="titleRu"
                    value={formData.titleRu}
                    onChange={(e) => handleInputChange("titleRu", e.target.value)}
                    placeholder="10 Главных Советов..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dateRu">Дата (Русский)</Label>
                  <Input
                    id="dateRu"
                    value={formData.dateRu}
                    onChange={(e) => handleInputChange("dateRu", e.target.value)}
                    placeholder="Декабрь 2024"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerptRu">Краткое Описание</Label>
                  <Textarea
                    id="excerptRu"
                    value={formData.excerptRu}
                    onChange={(e) => handleInputChange("excerptRu", e.target.value)}
                    placeholder="Краткое описание..."
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contentRu">Содержание (Русский)</Label>
                  <Textarea
                    id="contentRu"
                    value={formData.contentRu}
                    onChange={(e) => handleInputChange("contentRu", e.target.value)}
                    placeholder="Полное содержание..."
                    rows={12}
                    required
                  />
                </div>
              </TabsContent>

              {/* Azerbaijani */}
              <TabsContent value="az" className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="titleAz">Başlıq (Azərbaycan)</Label>
                  <Input
                    id="titleAz"
                    value={formData.titleAz}
                    onChange={(e) => handleInputChange("titleAz", e.target.value)}
                    placeholder="10 Əsas Məsləhət..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dateAz">Tarix (Azərbaycan)</Label>
                  <Input
                    id="dateAz"
                    value={formData.dateAz}
                    onChange={(e) => handleInputChange("dateAz", e.target.value)}
                    placeholder="Dekabr 2024"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerptAz">Qısa Məzmun</Label>
                  <Textarea
                    id="excerptAz"
                    value={formData.excerptAz}
                    onChange={(e) => handleInputChange("excerptAz", e.target.value)}
                    placeholder="Qısa məzmun..."
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contentAz">Məzmun (Azərbaycan)</Label>
                  <Textarea
                    id="contentAz"
                    value={formData.contentAz}
                    onChange={(e) => handleInputChange("contentAz", e.target.value)}
                    placeholder="Tam məzmun..."
                    rows={12}
                    required
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* References Section */}
            <div className="mb-8 p-6 bg-slate-50 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-slate-900">İstinadlar</Label>
                <Button
                  type="button"
                  onClick={addReference}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Plus size={16} />
                  Əlavə et
                </Button>
              </div>

              <div className="space-y-4">
                {formData.references.map((ref, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-lg border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        İstinad #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeReference(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <Input
                      placeholder="Başlıq (Title)"
                      value={ref.title}
                      onChange={(e) =>
                        updateReference(index, "title", e.target.value)
                      }
                    />

                    <Input
                      placeholder="URL (https://...)"
                      value={ref.url}
                      onChange={(e) =>
                        updateReference(index, "url", e.target.value)
                      }
                    />

                    <Input
                      placeholder="Mənbə (Source) - optional"
                      value={ref.source || ""}
                      onChange={(e) =>
                        updateReference(index, "source", e.target.value)
                      }
                    />
                  </div>
                ))}

                {formData.references.length === 0 && (
                  <p className="text-center text-slate-500 py-4">
                    İstinad əlavə etməmişsiniz
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="gap-2"
              >
                <Eye size={18} />
                {showPreview ? "Gizlət" : "Preview"}
              </Button>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Ləğv et
                </Button>
                <Button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Yadda saxlanılır...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Yadda saxla
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Preview Section */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-slate-200 overflow-hidden"
              >
                <div className="p-6 bg-slate-50">
                  <h3 className="text-slate-900 mb-4">Preview (English)</h3>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h4 className="text-slate-900 mb-2">{formData.titleEn}</h4>
                      <p className="text-sm text-slate-500 mb-3">
                        {formData.dateEn}
                      </p>
                      <p className="text-slate-600 mb-4">{formData.excerptEn}</p>
                      <p className="text-slate-700 whitespace-pre-line">
                        {formData.contentEn}
                      </p>
                      {formData.references.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <p className="text-sm font-medium text-slate-700 mb-2">
                            References ({formData.references.length})
                          </p>
                          {formData.references.map((ref, i) => (
                            <div key={i} className="text-sm text-slate-600 mb-1">
                              <ExternalLink size={12} className="inline mr-1" />
                              {ref.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
