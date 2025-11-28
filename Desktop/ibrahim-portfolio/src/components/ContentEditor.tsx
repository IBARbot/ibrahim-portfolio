import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Upload, X, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { toast } from "sonner@2.0.3";

interface ContentEditorProps {
  onSave: (content: any) => Promise<void>;
  onClose: () => void;
}

export function ContentEditor({ onSave, onClose }: ContentEditorProps) {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load current content from localStorage
    const savedContent = localStorage.getItem("site_content");
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    } else {
      // Initialize with default structure
      setContent({
        hero: {
          badge: { en: "Your Flight Expert", ru: "Ваш эксперт по авиабилетам", az: "Sizin Uçuş Ekspertiniz" },
          name: { en: "Ibrahim Abdullayev", ru: "Ибрагим Абдуллаев", az: "İbrahim Abdullayev" },
          tagline: { en: "Smart Flight Booking Consultation & Travel Solutions", ru: "Умная консультация по бронированию авиабилетов и туристические решения", az: "Ağıllı Uçuş Sifarişi Konsultasiyası və Səyahət Həlləri" },
          description1: { en: "", ru: "", az: "" },
          description2: { en: "", ru: "", az: "" },
          image: "",
        },
        about: {
          title: { en: "About Me", ru: "Обо мне", az: "Haqqımda" },
          subtitle: { en: "", ru: "", az: "" },
          journey1: { en: "", ru: "", az: "" },
          journey2: { en: "", ru: "", az: "" },
          journey3: { en: "", ru: "", az: "" },
          quote: { en: "", ru: "", az: "" },
          image: "",
        },
        services: [],
        testimonials: [],
        stats: {
          stat1: { value: "500+", label: { en: "Happy Clients", ru: "Довольных клиентов", az: "Məmnun Müştərilər" } },
          stat2: { value: "5000+", label: { en: "Flights Booked", ru: "Забронировано рейсов", az: "Sifariş edilmiş uçuşlar" } },
          stat3: { value: "98%", label: { en: "Satisfaction Rate", ru: "Уровень удовлетворенности", az: "Məmnuniyyət Nisbəti" } },
          stat4: { value: "24/7", label: { en: "Support Available", ru: "Поддержка доступна", az: "Dəstək mövcuddur" } },
        },
        contact: {
          title: { en: "Get In Touch", ru: "Связаться", az: "Əlaqə" },
          subtitle: { en: "", ru: "", az: "" },
          phone: "+994555973923",
          email: "info@ibrahimabdullayev.com",
          instagram: "ibrahim_abdullar",
          address: { en: "Baku, Azerbaijan", ru: "Баку, Азербайджан", az: "Bakı, Azərbaycan" },
        },
      });
    }
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(content);
      localStorage.setItem("site_content", JSON.stringify(content));
      toast.success("Məzmun uğurla saxlanıldı!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Saxlamaq alınmadı");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (section: string, field: string, lang: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: {
          ...prev[section]?.[field],
          [lang]: value,
        },
      },
    }));
  };

  const updateSimpleField = (section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const addService = () => {
    setContent((prev: any) => ({
      ...prev,
      services: [
        ...(prev.services || []),
        {
          id: Date.now().toString(),
          title: { en: "", ru: "", az: "" },
          tagline: { en: "", ru: "", az: "" },
          description: { en: "", ru: "", az: "" },
          features: [
            { en: "", ru: "", az: "" },
            { en: "", ru: "", az: "" },
            { en: "", ru: "", az: "" },
          ],
          icon: "✈️",
        },
      ],
    }));
  };

  const removeService = (index: number) => {
    setContent((prev: any) => ({
      ...prev,
      services: prev.services.filter((_: any, i: number) => i !== index),
    }));
  };

  const updateService = (index: number, field: string, lang: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      services: prev.services.map((service: any, i: number) =>
        i === index
          ? {
              ...service,
              [field]: {
                ...service[field],
                [lang]: value,
              },
            }
          : service
      ),
    }));
  };

  const addTestimonial = () => {
    setContent((prev: any) => ({
      ...prev,
      testimonials: [
        ...(prev.testimonials || []),
        {
          id: Date.now().toString(),
          name: "",
          role: { en: "", ru: "", az: "" },
          content: { en: "", ru: "", az: "" },
          rating: 5,
          image: "",
        },
      ],
    }));
  };

  const removeTestimonial = (index: number) => {
    setContent((prev: any) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_: any, i: number) => i !== index),
    }));
  };

  const updateTestimonial = (index: number, field: string, lang: string | null, value: string | number) => {
    setContent((prev: any) => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial: any, i: number) =>
        i === index
          ? {
              ...testimonial,
              [field]: lang
                ? {
                    ...testimonial[field],
                    [lang]: value,
                  }
                : value,
            }
          : testimonial
      ),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-white mb-1">Sayt Məzmununu Redaktə Et</h2>
            <p className="text-teal-100 text-sm">
              Bütün sayt məzmununu buradan idarə edin
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          <Tabs defaultValue="hero" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="hero">Ana Səhifə</TabsTrigger>
              <TabsTrigger value="about">Haqqımda</TabsTrigger>
              <TabsTrigger value="services">Xidmətlər</TabsTrigger>
              <TabsTrigger value="testimonials">Rəylər</TabsTrigger>
              <TabsTrigger value="contact">Əlaqə</TabsTrigger>
            </TabsList>

            {/* Hero Section */}
            <TabsContent value="hero" className="space-y-4">
              <Card className="p-6 space-y-4">
                <h3 className="text-slate-900">Ana Səhifə Məzmunu</h3>
                
                {["en", "ru", "az"].map((lang) => (
                  <div key={lang} className="space-y-4 p-4 border rounded-lg">
                    <h4 className="text-slate-700">
                      {lang === "en" ? "İngilis" : lang === "ru" ? "Rusca" : "Azərbaycan"}
                    </h4>
                    
                    <div className="space-y-2">
                      <Label>Badge</Label>
                      <Input
                        value={content.hero?.badge?.[lang] || ""}
                        onChange={(e) => updateField("hero", "badge", lang, e.target.value)}
                        placeholder="Your Flight Expert"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Ad</Label>
                      <Input
                        value={content.hero?.name?.[lang] || ""}
                        onChange={(e) => updateField("hero", "name", lang, e.target.value)}
                        placeholder="Ibrahim Abdullayev"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Başlıq (Tagline)</Label>
                      <Input
                        value={content.hero?.tagline?.[lang] || ""}
                        onChange={(e) => updateField("hero", "tagline", lang, e.target.value)}
                        placeholder="Smart Flight Booking..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Təsvir 1</Label>
                      <Textarea
                        value={content.hero?.description1?.[lang] || ""}
                        onChange={(e) => updateField("hero", "description1", lang, e.target.value)}
                        placeholder="Welcome! I help travelers..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Təsvir 2</Label>
                      <Textarea
                        value={content.hero?.description2?.[lang] || ""}
                        onChange={(e) => updateField("hero", "description2", lang, e.target.value)}
                        placeholder="Whether you're planning..."
                        rows={4}
                      />
                    </div>
                  </div>
                ))}

                <div className="space-y-2">
                  <Label>Şəkil URL (isteğe bağlı)</Label>
                  <Input
                    value={content.hero?.image || ""}
                    onChange={(e) => updateSimpleField("hero", "image", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </Card>
            </TabsContent>

            {/* About Section */}
            <TabsContent value="about" className="space-y-4">
              <Card className="p-6 space-y-4">
                <h3 className="text-slate-900">Haqqımda Məzmunu</h3>
                
                {["en", "ru", "az"].map((lang) => (
                  <div key={lang} className="space-y-4 p-4 border rounded-lg">
                    <h4 className="text-slate-700">
                      {lang === "en" ? "İngilis" : lang === "ru" ? "Rusca" : "Azərbaycan"}
                    </h4>
                    
                    <div className="space-y-2">
                      <Label>Başlıq</Label>
                      <Input
                        value={content.about?.title?.[lang] || ""}
                        onChange={(e) => updateField("about", "title", lang, e.target.value)}
                        placeholder="About Me"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Alt Başlıq</Label>
                      <Textarea
                        value={content.about?.subtitle?.[lang] || ""}
                        onChange={(e) => updateField("about", "subtitle", lang, e.target.value)}
                        placeholder="Dedicated flight booking specialist..."
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Səyahət Hekayəsi 1</Label>
                      <Textarea
                        value={content.about?.journey1?.[lang] || ""}
                        onChange={(e) => updateField("about", "journey1", lang, e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Səyahət Hekayəsi 2</Label>
                      <Textarea
                        value={content.about?.journey2?.[lang] || ""}
                        onChange={(e) => updateField("about", "journey2", lang, e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Səyahət Hekayəsi 3</Label>
                      <Textarea
                        value={content.about?.journey3?.[lang] || ""}
                        onChange={(e) => updateField("about", "journey3", lang, e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Sitat (Quote)</Label>
                      <Textarea
                        value={content.about?.quote?.[lang] || ""}
                        onChange={(e) => updateField("about", "quote", lang, e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}

                <div className="space-y-2">
                  <Label>Şəkil URL</Label>
                  <Input
                    value={content.about?.image || ""}
                    onChange={(e) => updateSimpleField("about", "image", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </Card>
            </TabsContent>

            {/* Services Section */}
            <TabsContent value="services" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-900">Xidmətlər</h3>
                <Button onClick={addService} className="gap-2">
                  <Plus size={16} />
                  Xidmət Əlavə Et
                </Button>
              </div>

              {content.services?.map((service: any, index: number) => (
                <Card key={service.id} className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-slate-800">Xidmət #{index + 1}</h4>
                    <Button
                      onClick={() => removeService(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  {["en", "ru", "az"].map((lang) => (
                    <div key={lang} className="space-y-3 p-4 border rounded-lg">
                      <h5 className="text-slate-700">
                        {lang === "en" ? "İngilis" : lang === "ru" ? "Rusca" : "Azərbaycan"}
                      </h5>
                      
                      <div className="space-y-2">
                        <Label>Başlıq</Label>
                        <Input
                          value={service.title?.[lang] || ""}
                          onChange={(e) => updateService(index, "title", lang, e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tagline</Label>
                        <Input
                          value={service.tagline?.[lang] || ""}
                          onChange={(e) => updateService(index, "tagline", lang, e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Təsvir</Label>
                        <Textarea
                          value={service.description?.[lang] || ""}
                          onChange={(e) => updateService(index, "description", lang, e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </Card>
              ))}

              {(!content.services || content.services.length === 0) && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <p className="text-slate-500 mb-4">Hələ xidmət əlavə edilməyib</p>
                  <Button onClick={addService}>İlk Xidməti Əlavə Et</Button>
                </div>
              )}
            </TabsContent>

            {/* Testimonials Section */}
            <TabsContent value="testimonials" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-900">Müştəri Rəyləri</h3>
                <Button onClick={addTestimonial} className="gap-2">
                  <Plus size={16} />
                  Rəy Əlavə Et
                </Button>
              </div>

              {content.testimonials?.map((testimonial: any, index: number) => (
                <Card key={testimonial.id} className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-slate-800">Rəy #{index + 1}</h4>
                    <Button
                      onClick={() => removeTestimonial(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Ad</Label>
                    <Input
                      value={testimonial.name || ""}
                      onChange={(e) => updateTestimonial(index, "name", null, e.target.value)}
                      placeholder="Müştəri adı"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Şəkil URL</Label>
                    <Input
                      value={testimonial.image || ""}
                      onChange={(e) => updateTestimonial(index, "image", null, e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Reytinq (1-5)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={testimonial.rating || 5}
                      onChange={(e) => updateTestimonial(index, "rating", null, parseInt(e.target.value))}
                    />
                  </div>

                  {["en", "ru", "az"].map((lang) => (
                    <div key={lang} className="space-y-3 p-4 border rounded-lg">
                      <h5 className="text-slate-700">
                        {lang === "en" ? "İngilis" : lang === "ru" ? "Rusca" : "Azərbaycan"}
                      </h5>
                      
                      <div className="space-y-2">
                        <Label>Vəzifə/Rol</Label>
                        <Input
                          value={testimonial.role?.[lang] || ""}
                          onChange={(e) => updateTestimonial(index, "role", lang, e.target.value)}
                          placeholder="Frequent Traveler"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Rəy Mətni</Label>
                        <Textarea
                          value={testimonial.content?.[lang] || ""}
                          onChange={(e) => updateTestimonial(index, "content", lang, e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}
                </Card>
              ))}

              {(!content.testimonials || content.testimonials.length === 0) && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <p className="text-slate-500 mb-4">Hələ rəy əlavə edilməyib</p>
                  <Button onClick={addTestimonial}>İlk Rəyi Əlavə Et</Button>
                </div>
              )}
            </TabsContent>

            {/* Contact Section */}
            <TabsContent value="contact" className="space-y-4">
              <Card className="p-6 space-y-4">
                <h3 className="text-slate-900">Əlaqə Məlumatları</h3>

                <div className="space-y-2">
                  <Label>Telefon (WhatsApp)</Label>
                  <Input
                    value={content.contact?.phone || ""}
                    onChange={(e) => updateSimpleField("contact", "phone", e.target.value)}
                    placeholder="+994555973923"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={content.contact?.email || ""}
                    onChange={(e) => updateSimpleField("contact", "email", e.target.value)}
                    placeholder="info@ibrahimabdullayev.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Instagram</Label>
                  <Input
                    value={content.contact?.instagram || ""}
                    onChange={(e) => updateSimpleField("contact", "instagram", e.target.value)}
                    placeholder="ibrahim_abdullar"
                  />
                </div>

                {["en", "ru", "az"].map((lang) => (
                  <div key={lang} className="space-y-4 p-4 border rounded-lg">
                    <h4 className="text-slate-700">
                      {lang === "en" ? "İngilis" : lang === "ru" ? "Rusca" : "Azərbaycan"}
                    </h4>
                    
                    <div className="space-y-2">
                      <Label>Başlıq</Label>
                      <Input
                        value={content.contact?.title?.[lang] || ""}
                        onChange={(e) => updateField("contact", "title", lang, e.target.value)}
                        placeholder="Get In Touch"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Alt Başlıq</Label>
                      <Textarea
                        value={content.contact?.subtitle?.[lang] || ""}
                        onChange={(e) => updateField("contact", "subtitle", lang, e.target.value)}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Ünvan</Label>
                      <Input
                        value={content.contact?.address?.[lang] || ""}
                        onChange={(e) => updateField("contact", "address", lang, e.target.value)}
                        placeholder="Baku, Azerbaijan"
                      />
                    </div>
                  </div>
                ))}
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="border-t bg-slate-50 p-6 flex items-center justify-between">
          <Button onClick={onClose} variant="outline">
            Ləğv et
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white gap-2"
          >
            <Save size={18} />
            {loading ? "Saxlanılır..." : "Yadda Saxla"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
