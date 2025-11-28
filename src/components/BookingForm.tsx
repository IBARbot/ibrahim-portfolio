import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plane, Hotel, Shield, FileText, Send, Loader2, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../contexts/LanguageContext";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "flight" | "hotel" | "insurance" | "embassy";
}

interface FlightSegment {
  from: string;
  to: string;
  date: string;
}

interface HotelDestination {
  city: string;
  checkIn: string;
  checkOut: string;
}

export function BookingForm({ isOpen, onClose, type = "flight" }: BookingFormProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(type);
  const [loading, setLoading] = useState(false);
  
  // Dynamic multi-city flights
  const [flightSegments, setFlightSegments] = useState<FlightSegment[]>([
    { from: "", to: "", date: "" }
  ]);
  
  // Dynamic multi-destination hotels
  const [hotelDestinations, setHotelDestinations] = useState<HotelDestination[]>([
    { city: "", checkIn: "", checkOut: "" }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // Flight fields
    flightType: "round-trip", // one-way, round-trip, multi-city
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    adults: "1",
    children: "0",
    infants: "0",
    class: "economy",
    extraBaggage: "no",
    seatPreference: "",
    mealPreference: "",
    // Hotel fields
    hotelType: "single", // single, multiple
    destination: "",
    checkIn: "",
    checkOut: "",
    rooms: "1",
    guests: "1",
    roomType: "standard",
    mealPlan: "room-only",
    specialRequests: "",
    // Insurance fields
    insuranceType: "travel",
    insurancePackage: "individual", // individual, family, group
    coverageAmount: "50000",
    travelDates: "",
    destination_insurance: "",
    travelers: "1",
    adventureSports: "no",
    covidCoverage: "yes",
    cancellationCoverage: "yes",
    // Embassy fields
    embassyType: "single", // single, multiple
    embassyCountry: "",
    additionalCountries: "",
    requiredServices: "flight+hotel",
    travelPeriod: "",
    urgencyLevel: "normal",
    documentPrep: "no",
    visaInterview: "no",
    // Common
    additionalInfo: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Flight segment handlers
  const addFlightSegment = () => {
    setFlightSegments([...flightSegments, { from: "", to: "", date: "" }]);
  };

  const removeFlightSegment = (index: number) => {
    if (flightSegments.length > 1) {
      setFlightSegments(flightSegments.filter((_, i) => i !== index));
    }
  };

  const updateFlightSegment = (index: number, field: keyof FlightSegment, value: string) => {
    const updated = [...flightSegments];
    updated[index][field] = value;
    setFlightSegments(updated);
  };

  // Hotel destination handlers
  const addHotelDestination = () => {
    setHotelDestinations([...hotelDestinations, { city: "", checkIn: "", checkOut: "" }]);
  };

  const removeHotelDestination = (index: number) => {
    if (hotelDestinations.length > 1) {
      setHotelDestinations(hotelDestinations.filter((_, i) => i !== index));
    }
  };

  const updateHotelDestination = (index: number, field: keyof HotelDestination, value: string) => {
    const updated = [...hotelDestinations];
    updated[index][field] = value;
    setHotelDestinations(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare form data based on type
      let submissionData: any = {
        type: activeTab,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        additionalInfo: formData.additionalInfo,
        language,
        submittedAt: new Date().toISOString(),
      };

      // Add type-specific fields
      if (activeTab === "flight") {
        submissionData = {
          ...submissionData,
          flightType: formData.flightType,
          from: formData.from,
          to: formData.to,
          departureDate: formData.departureDate,
          returnDate: formData.returnDate,
          adults: formData.adults,
          children: formData.children,
          infants: formData.infants,
          class: formData.class,
          extraBaggage: formData.extraBaggage,
          seatPreference: formData.seatPreference,
          mealPreference: formData.mealPreference,
          multiCitySegments: formData.flightType === "multi-city" ? flightSegments : null,
        };
      } else if (activeTab === "hotel") {
        submissionData = {
          ...submissionData,
          hotelType: formData.hotelType,
          destination: formData.destination,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          rooms: formData.rooms,
          guests: formData.guests,
          roomType: formData.roomType,
          mealPlan: formData.mealPlan,
          specialRequests: formData.specialRequests,
          multipleDestinations: formData.hotelType === "multiple" ? hotelDestinations : null,
        };
      } else if (activeTab === "insurance") {
        submissionData = {
          ...submissionData,
          insuranceType: formData.insuranceType,
          insurancePackage: formData.insurancePackage,
          coverageAmount: formData.coverageAmount,
          travelDates: formData.travelDates,
          destination: formData.destination_insurance,
          travelers: formData.travelers,
          adventureSports: formData.adventureSports,
          covidCoverage: formData.covidCoverage,
          cancellationCoverage: formData.cancellationCoverage,
        };
      } else if (activeTab === "embassy") {
        submissionData = {
          ...submissionData,
          embassyType: formData.embassyType,
          embassyCountry: formData.embassyCountry,
          additionalCountries: formData.additionalCountries,
          requiredServices: formData.requiredServices,
          travelPeriod: formData.travelPeriod,
          urgencyLevel: formData.urgencyLevel,
          documentPrep: formData.documentPrep,
          visaInterview: formData.visaInterview,
        };
      }

      // Submit to Google Sheets via Netlify Function
      const response = await fetch(
        "/.netlify/functions/submit-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Göndərmək alınmadı");
      }

      // Log booking data to console for development
      if (import.meta.env.DEV) {
        console.log('✅ Booking submitted successfully:', {
          id: result.id,
          type: activeTab,
          name: formData.name,
          email: formData.email,
        });
      }

      // Show success message
      const successMessages = {
        en: "Your request has been submitted successfully! We'll contact you shortly.",
        ru: "Ваш запрос успешно отправлен! Мы свяжемся с вами в ближайшее время.",
        az: "Sorğunuz uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.",
      };

      toast.success(successMessages[language]);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        flightType: "round-trip",
        from: "",
        to: "",
        departureDate: "",
        returnDate: "",
        adults: "1",
        children: "0",
        infants: "0",
        class: "economy",
        extraBaggage: "no",
        seatPreference: "",
        mealPreference: "",
        hotelType: "single",
        destination: "",
        checkIn: "",
        checkOut: "",
        rooms: "1",
        guests: "1",
        roomType: "standard",
        mealPlan: "room-only",
        specialRequests: "",
        insuranceType: "travel",
        insurancePackage: "individual",
        coverageAmount: "50000",
        travelDates: "",
        destination_insurance: "",
        travelers: "1",
        adventureSports: "no",
        covidCoverage: "yes",
        cancellationCoverage: "yes",
        embassyType: "single",
        embassyCountry: "",
        additionalCountries: "",
        requiredServices: "flight+hotel",
        travelPeriod: "",
        urgencyLevel: "normal",
        documentPrep: "no",
        visaInterview: "no",
        additionalInfo: "",
      });
      setFlightSegments([{ from: "", to: "", date: "" }]);
      setHotelDestinations([{ city: "", checkIn: "", checkOut: "" }]);

      // Close form after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error("Booking submission error:", error);
      const errorMessages = {
        en: "Failed to submit. Please try again or contact us directly.",
        ru: "Не удалось отправить. Попробуйте еще раз или свяжитесь с нами напрямую.",
        az: "Göndərmək alınmadı. Yenidən cəhd edin və ya birbaşa bizimlə əlaqə saxlayın.",
      };
      toast.error(errorMessages[language]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const titles = {
    flight: { en: "Flight Booking Request", ru: "Запрос на бронирование рейса", az: "Uçuş Sifarişi Sorğusu" },
    hotel: { en: "Hotel Booking Request", ru: "Запрос на бронирование отеля", az: "Otel Sifarişi Sorğusu" },
    insurance: { en: "Travel Insurance Request", ru: "Запрос на страхование путешествия", az: "Səyahət Sığortası Sorğusu" },
    embassy: { en: "Embassy Booking Request", ru: "Запрос на бронирование для посольства", az: "Səfirlik üçün Rezervasiya Sorğusu" },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white p-6 flex items-center justify-between">
            <h2 className="text-white">{titles[activeTab][language]}</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="p-6 space-y-6">
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="flight" className="gap-2">
                    <Plane size={16} />
                    <span className="hidden sm:inline">
                      {language === "en" ? "Flight" : language === "ru" ? "Рейс" : "Uçuş"}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="hotel" className="gap-2">
                    <Hotel size={16} />
                    <span className="hidden sm:inline">
                      {language === "en" ? "Hotel" : language === "ru" ? "Отель" : "Otel"}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="insurance" className="gap-2">
                    <Shield size={16} />
                    <span className="hidden sm:inline">
                      {language === "en" ? "Insurance" : language === "ru" ? "Страховка" : "Sığorta"}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="embassy" className="gap-2">
                    <FileText size={16} />
                    <span className="hidden sm:inline">
                      {language === "en" ? "Embassy" : language === "ru" ? "Посольство" : "Səfirlik"}
                    </span>
                  </TabsTrigger>
                </TabsList>

                {/* Personal Information (Common) */}
                <div className="mt-6 space-y-4">
                  <h3 className="text-slate-900">
                    {language === "en" ? "Personal Information" : language === "ru" ? "Личная информация" : "Şəxsi Məlumat"}
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {language === "en" ? "Full Name" : language === "ru" ? "Полное имя" : "Tam Ad"} *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder={language === "en" ? "John Doe" : language === "ru" ? "Иван Иванов" : "Adınız Soyadınız"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {language === "en" ? "Phone" : language === "ru" ? "Телефон" : "Telefon"} *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+994 XX XXX XX XX"
                    />
                  </div>
                </div>

                {/* Flight Tab */}
                <TabsContent value="flight" className="space-y-4 mt-6">
                  <h3 className="text-slate-900">
                    {language === "en" ? "Flight Details" : language === "ru" ? "Детали рейса" : "Uçuş Detalları"}
                  </h3>

                  {/* Flight Type */}
                  <div className="space-y-2">
                    <Label htmlFor="flightType">
                      {language === "en" ? "Flight Type" : language === "ru" ? "Тип рейса" : "Uçuş Növü"} *
                    </Label>
                    <select
                      id="flightType"
                      required
                      value={formData.flightType}
                      onChange={(e) => handleChange("flightType", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="one-way">{language === "en" ? "One Way" : language === "ru" ? "В одну сторону" : "Bir Tərəfli"}</option>
                      <option value="round-trip">{language === "en" ? "Round Trip" : language === "ru" ? "Туда и обратно" : "Gediş-Gəliş"}</option>
                      <option value="multi-city">{language === "en" ? "Multi-City" : language === "ru" ? "Несколько городов" : "Çoxşəhərli"}</option>
                    </select>
                  </div>

                  {/* Standard Flight Fields (for one-way and round-trip) */}
                  {formData.flightType !== "multi-city" && (
                    <>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="from">
                            {language === "en" ? "From" : language === "ru" ? "Откуда" : "Haradan"} *
                          </Label>
                          <Input
                            id="from"
                            required
                            value={formData.from}
                            onChange={(e) => handleChange("from", e.target.value)}
                            placeholder={language === "en" ? "Baku (GYD)" : language === "ru" ? "Баку (GYD)" : "Bakı (GYD)"}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="to">
                            {language === "en" ? "To" : language === "ru" ? "Куда" : "Hara"} *
                          </Label>
                          <Input
                            id="to"
                            required
                            value={formData.to}
                            onChange={(e) => handleChange("to", e.target.value)}
                            placeholder={language === "en" ? "Dubai (DXB)" : language === "ru" ? "Дубай (DXB)" : "Dubai (DXB)"}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="departureDate">
                            {language === "en" ? "Departure Date" : language === "ru" ? "Дата отправления" : "Getmə Tarixi"} *
                          </Label>
                          <Input
                            id="departureDate"
                            type="date"
                            required
                            value={formData.departureDate}
                            onChange={(e) => handleChange("departureDate", e.target.value)}
                          />
                        </div>

                        {formData.flightType === "round-trip" && (
                          <div className="space-y-2">
                            <Label htmlFor="returnDate">
                              {language === "en" ? "Return Date" : language === "ru" ? "Дата возвращения" : "Qayıdış Tarixi"} *
                            </Label>
                            <Input
                              id="returnDate"
                              type="date"
                              required
                              value={formData.returnDate}
                              onChange={(e) => handleChange("returnDate", e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Multi-City Flight Segments */}
                  {formData.flightType === "multi-city" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>{language === "en" ? "Flight Segments" : language === "ru" ? "Сегменты полета" : "Uçuş Seqmentləri"}</Label>
                        <Button
                          type="button"
                          onClick={addFlightSegment}
                          size="sm"
                          variant="outline"
                          className="gap-1"
                        >
                          <Plus size={16} />
                          {language === "en" ? "Add" : language === "ru" ? "Добавить" : "Əlavə et"}
                        </Button>
                      </div>

                      {flightSegments.map((segment, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">
                              {language === "en" ? "Segment" : language === "ru" ? "Сегмент" : "Seqment"} {index + 1}
                            </span>
                            {flightSegments.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeFlightSegment(index)}
                                size="sm"
                                variant="ghost"
                                className="gap-1 text-red-600 hover:text-red-700"
                              >
                                <Minus size={16} />
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid sm:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <Label>{language === "en" ? "From" : language === "ru" ? "Откуда" : "Haradan"} *</Label>
                              <Input
                                required
                                value={segment.from}
                                onChange={(e) => updateFlightSegment(index, "from", e.target.value)}
                                placeholder="City"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>{language === "en" ? "To" : language === "ru" ? "Куда" : "Hara"} *</Label>
                              <Input
                                required
                                value={segment.to}
                                onChange={(e) => updateFlightSegment(index, "to", e.target.value)}
                                placeholder="City"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>{language === "en" ? "Date" : language === "ru" ? "Дата" : "Tarix"} *</Label>
                              <Input
                                type="date"
                                required
                                value={segment.date}
                                onChange={(e) => updateFlightSegment(index, "date", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Passengers */}
                  <div className="space-y-2">
                    <Label>{language === "en" ? "Passengers" : language === "ru" ? "Пассажиры" : "Sərnişinlər"}</Label>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="adults" className="text-sm text-slate-600">
                          {language === "en" ? "Adults (12+)" : language === "ru" ? "Взрослые (12+)" : "Böyüklər (12+)"} *
                        </Label>
                        <Input
                          id="adults"
                          type="number"
                          min="1"
                          required
                          value={formData.adults}
                          onChange={(e) => handleChange("adults", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="children" className="text-sm text-slate-600">
                          {language === "en" ? "Children (2-11)" : language === "ru" ? "Дети (2-11)" : "Uşaqlar (2-11)"}
                        </Label>
                        <Input
                          id="children"
                          type="number"
                          min="0"
                          value={formData.children}
                          onChange={(e) => handleChange("children", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="infants" className="text-sm text-slate-600">
                          {language === "en" ? "Infants (0-2)" : language === "ru" ? "Младенцы (0-2)" : "Körpələr (0-2)"}
                        </Label>
                        <Input
                          id="infants"
                          type="number"
                          min="0"
                          value={formData.infants}
                          onChange={(e) => handleChange("infants", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Class & Extras */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class">
                        {language === "en" ? "Class" : language === "ru" ? "Класс" : "Sinif"} *
                      </Label>
                      <select
                        id="class"
                        required
                        value={formData.class}
                        onChange={(e) => handleChange("class", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="economy">{language === "en" ? "Economy" : language === "ru" ? "Эконом" : "Ekonom"}</option>
                        <option value="premium-economy">{language === "en" ? "Premium Economy" : language === "ru" ? "Премиум-эконом" : "Premium Ekonom"}</option>
                        <option value="business">{language === "en" ? "Business" : language === "ru" ? "Бизнес" : "Biznes"}</option>
                        <option value="first">{language === "en" ? "First Class" : language === "ru" ? "Первый класс" : "Birinci Sinif"}</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="extraBaggage">
                        {language === "en" ? "Extra Baggage" : language === "ru" ? "Дополнительный багаж" : "Əlavə Baqaj"}
                      </Label>
                      <select
                        id="extraBaggage"
                        value={formData.extraBaggage}
                        onChange={(e) => handleChange("extraBaggage", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="no">{language === "en" ? "No" : language === "ru" ? "Нет" : "Xeyr"}</option>
                        <option value="yes">{language === "en" ? "Yes" : language === "ru" ? "Да" : "Bəli"}</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="seatPreference">
                        {language === "en" ? "Seat Preference" : language === "ru" ? "Предпочтение по месту" : "Oturacaq Seçimi"}
                      </Label>
                      <Input
                        id="seatPreference"
                        value={formData.seatPreference}
                        onChange={(e) => handleChange("seatPreference", e.target.value)}
                        placeholder={language === "en" ? "Window, Aisle, etc." : language === "ru" ? "У окна, у прохода и т.д." : "Pəncərə yanı, keçid yanı və s."}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mealPreference">
                        {language === "en" ? "Meal Preference" : language === "ru" ? "Предпочтения по питанию" : "Yemək Tərcihləri"}
                      </Label>
                      <Input
                        id="mealPreference"
                        value={formData.mealPreference}
                        onChange={(e) => handleChange("mealPreference", e.target.value)}
                        placeholder={language === "en" ? "Vegetarian, Halal, etc." : language === "ru" ? "Вегетарианская, халяльная и т.д." : "Vegetarian, Halal və s."}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Hotel Tab */}
                <TabsContent value="hotel" className="space-y-4 mt-6">
                  <h3 className="text-slate-900">
                    {language === "en" ? "Hotel Details" : language === "ru" ? "Детали отеля" : "Otel Detalları"}
                  </h3>

                  {/* Hotel Type */}
                  <div className="space-y-2">
                    <Label htmlFor="hotelType">
                      {language === "en" ? "Booking Type" : language === "ru" ? "Тип бронирования" : "Rezervasiya Növü"} *
                    </Label>
                    <select
                      id="hotelType"
                      required
                      value={formData.hotelType}
                      onChange={(e) => handleChange("hotelType", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="single">{language === "en" ? "Single Destination" : language === "ru" ? "Один пункт назначения" : "Tək İstiqamət"}</option>
                      <option value="multiple">{language === "en" ? "Multiple Destinations" : language === "ru" ? "Несколько пунктов назначения" : "Çoxlu İstiqamətlər"}</option>
                    </select>
                  </div>

                  {/* Single Hotel Booking */}
                  {formData.hotelType === "single" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="destination">
                          {language === "en" ? "Destination" : language === "ru" ? "Место назначения" : "İstiqamət"} *
                        </Label>
                        <Input
                          id="destination"
                          required
                          value={formData.destination}
                          onChange={(e) => handleChange("destination", e.target.value)}
                          placeholder={language === "en" ? "Dubai, UAE" : language === "ru" ? "Дубай, ОАЭ" : "Dubai, BƏƏ"}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="checkIn">
                            {language === "en" ? "Check-in Date" : language === "ru" ? "Дата заезда" : "Giriş Tarixi"} *
                          </Label>
                          <Input
                            id="checkIn"
                            type="date"
                            required
                            value={formData.checkIn}
                            onChange={(e) => handleChange("checkIn", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="checkOut">
                            {language === "en" ? "Check-out Date" : language === "ru" ? "Дата выезда" : "Çıxış Tarixi"} *
                          </Label>
                          <Input
                            id="checkOut"
                            type="date"
                            required
                            value={formData.checkOut}
                            onChange={(e) => handleChange("checkOut", e.target.value)}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Multiple Hotel Destinations */}
                  {formData.hotelType === "multiple" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>{language === "en" ? "Hotel Destinations" : language === "ru" ? "Отели в городах" : "Otel İstiqamətləri"}</Label>
                        <Button
                          type="button"
                          onClick={addHotelDestination}
                          size="sm"
                          variant="outline"
                          className="gap-1"
                        >
                          <Plus size={16} />
                          {language === "en" ? "Add" : language === "ru" ? "Добавить" : "Əlavə et"}
                        </Button>
                      </div>

                      {hotelDestinations.map((dest, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">
                              {language === "en" ? "Destination" : language === "ru" ? "Пункт назначения" : "İstiqamət"} {index + 1}
                            </span>
                            {hotelDestinations.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeHotelDestination(index)}
                                size="sm"
                                variant="ghost"
                                className="gap-1 text-red-600 hover:text-red-700"
                              >
                                <Minus size={16} />
                              </Button>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <Label>{language === "en" ? "City" : language === "ru" ? "Город" : "Şəhər"} *</Label>
                            <Input
                              required
                              value={dest.city}
                              onChange={(e) => updateHotelDestination(index, "city", e.target.value)}
                              placeholder={language === "en" ? "Dubai" : language === "ru" ? "Дубай" : "Dubai"}
                            />
                          </div>
                          
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label>{language === "en" ? "Check-in" : language === "ru" ? "Заезд" : "Giriş"} *</Label>
                              <Input
                                type="date"
                                required
                                value={dest.checkIn}
                                onChange={(e) => updateHotelDestination(index, "checkIn", e.target.value)}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>{language === "en" ? "Check-out" : language === "ru" ? "Выезд" : "Çıxış"} *</Label>
                              <Input
                                type="date"
                                required
                                value={dest.checkOut}
                                onChange={(e) => updateHotelDestination(index, "checkOut", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Rooms & Guests */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rooms">
                        {language === "en" ? "Rooms" : language === "ru" ? "Номера" : "Otaqlar"} *
                      </Label>
                      <Input
                        id="rooms"
                        type="number"
                        min="1"
                        required
                        value={formData.rooms}
                        onChange={(e) => handleChange("rooms", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guests">
                        {language === "en" ? "Guests" : language === "ru" ? "Гости" : "Qonaqlar"} *
                      </Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        required
                        value={formData.guests}
                        onChange={(e) => handleChange("guests", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Room Type & Meal Plan */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="roomType">
                        {language === "en" ? "Room Type" : language === "ru" ? "Тип номера" : "Otaq Növü"}
                      </Label>
                      <select
                        id="roomType"
                        value={formData.roomType}
                        onChange={(e) => handleChange("roomType", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="standard">{language === "en" ? "Standard" : language === "ru" ? "Стандартный" : "Standart"}</option>
                        <option value="deluxe">{language === "en" ? "Deluxe" : language === "ru" ? "Делюкс" : "Deluxe"}</option>
                        <option value="suite">{language === "en" ? "Suite" : language === "ru" ? "Люкс" : "Lüks"}</option>
                        <option value="family">{language === "en" ? "Family Room" : language === "ru" ? "Семейный номер" : "Ailə Otağı"}</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mealPlan">
                        {language === "en" ? "Meal Plan" : language === "ru" ? "План питания" : "Qidalanma Planı"}
                      </Label>
                      <select
                        id="mealPlan"
                        value={formData.mealPlan}
                        onChange={(e) => handleChange("mealPlan", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="room-only">{language === "en" ? "Room Only" : language === "ru" ? "Только номер" : "Yalnız Otaq"}</option>
                        <option value="breakfast">{language === "en" ? "Bed & Breakfast" : language === "ru" ? "Номер и завтрак" : "Səhər yeməyi daxil"}</option>
                        <option value="half-board">{language === "en" ? "Half Board" : language === "ru" ? "Полупансион" : "Yarım Pansion"}</option>
                        <option value="full-board">{language === "en" ? "Full Board" : language === "ru" ? "Полный пансион" : "Tam Pansion"}</option>
                        <option value="all-inclusive">{language === "en" ? "All Inclusive" : language === "ru" ? "Всё включено" : "Hər şey daxil"}</option>
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">
                      {language === "en" ? "Special Requests" : language === "ru" ? "Особые пожелания" : "Xüsusi Tələblər"}
                    </Label>
                    <Input
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => handleChange("specialRequests", e.target.value)}
                      placeholder={language === "en" ? "Honeymoon, Accessible room, etc." : language === "ru" ? "Медовый месяц, доступная комната и т.д." : "Bal ayı, əlçatan otaq və s."}
                    />
                  </div>
                </TabsContent>

                {/* Insurance Tab */}
                <TabsContent value="insurance" className="space-y-4 mt-6">
                  <h3 className="text-slate-900">
                    {language === "en" ? "Insurance Details" : language === "ru" ? "Детали страховки" : "Sığorta Detalları"}
                  </h3>

                  {/* Insurance Type & Package */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insuranceType">
                        {language === "en" ? "Insurance Type" : language === "ru" ? "Тип страховки" : "Sığorta Növü"} *
                      </Label>
                      <select
                        id="insuranceType"
                        required
                        value={formData.insuranceType}
                        onChange={(e) => handleChange("insuranceType", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="travel">{language === "en" ? "Travel Insurance" : language === "ru" ? "Страхование путешествий" : "Səyahət Sığortası"}</option>
                        <option value="health">{language === "en" ? "Health Insurance" : language === "ru" ? "Медицинская страховка" : "Sağlamlıq Sığortası"}</option>
                        <option value="cancellation">{language === "en" ? "Cancellation Insurance" : language === "ru" ? "Страхование отмены" : "Ləğvetmə Sığortası"}</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="insurancePackage">
                        {language === "en" ? "Package Type" : language === "ru" ? "Тип пакета" : "Paket Növü"} *
                      </Label>
                      <select
                        id="insurancePackage"
                        required
                        value={formData.insurancePackage}
                        onChange={(e) => handleChange("insurancePackage", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="individual">{language === "en" ? "Individual" : language === "ru" ? "Индивидуальный" : "Fərdi"}</option>
                        <option value="family">{language === "en" ? "Family" : language === "ru" ? "Семейный" : "Ailə"}</option>
                        <option value="group">{language === "en" ? "Group" : language === "ru" ? "Групповой" : "Qrup"}</option>
                      </select>
                    </div>
                  </div>

                  {/* Coverage Amount & Travelers */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="coverageAmount">
                        {language === "en" ? "Coverage Amount (EUR)" : language === "ru" ? "Сумма покрытия (EUR)" : "Əhatə Məbləği (EUR)"} *
                      </Label>
                      <select
                        id="coverageAmount"
                        required
                        value={formData.coverageAmount}
                        onChange={(e) => handleChange("coverageAmount", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="30000">€30,000</option>
                        <option value="50000">€50,000</option>
                        <option value="100000">€100,000</option>
                        <option value="250000">€250,000</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="travelers">
                        {language === "en" ? "Number of Travelers" : language === "ru" ? "Количество путешественников" : "Səyahətçi sayı"} *
                      </Label>
                      <Input
                        id="travelers"
                        type="number"
                        min="1"
                        required
                        value={formData.travelers}
                        onChange={(e) => handleChange("travelers", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Destination & Travel Dates */}
                  <div className="space-y-2">
                    <Label htmlFor="destination_insurance">
                      {language === "en" ? "Travel Destination" : language === "ru" ? "Место назначения" : "Səyahət İstiqaməti"} *
                    </Label>
                    <Input
                      id="destination_insurance"
                      required
                      value={formData.destination_insurance}
                      onChange={(e) => handleChange("destination_insurance", e.target.value)}
                      placeholder={language === "en" ? "Dubai, UAE" : language === "ru" ? "Дубай, ОАЭ" : "Dubai, BƏƏ"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="travelDates">
                      {language === "en" ? "Travel Period" : language === "ru" ? "Период путешествия" : "Səyahət Müddəti"} *
                    </Label>
                    <Input
                      id="travelDates"
                      required
                      value={formData.travelDates}
                      onChange={(e) => handleChange("travelDates", e.target.value)}
                      placeholder={language === "en" ? "15 Dec - 25 Dec 2024" : language === "ru" ? "15 дек - 25 дек 2024" : "15 Dek - 25 Dek 2024"}
                    />
                  </div>

                  {/* Additional Coverage */}
                  <div className="space-y-3">
                    <Label>{language === "en" ? "Additional Coverage" : language === "ru" ? "Дополнительное покрытие" : "Əlavə Əhatə"}</Label>
                    
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="adventureSports" className="text-sm">
                          {language === "en" ? "Adventure Sports" : language === "ru" ? "Экстремальные виды спорта" : "Ekstremal İdman"}
                        </Label>
                        <select
                          id="adventureSports"
                          value={formData.adventureSports}
                          onChange={(e) => handleChange("adventureSports", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="no">{language === "en" ? "No" : language === "ru" ? "Нет" : "Xeyr"}</option>
                          <option value="yes">{language === "en" ? "Yes" : language === "ru" ? "Да" : "Bəli"}</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="covidCoverage" className="text-sm">
                          {language === "en" ? "COVID Coverage" : language === "ru" ? "COVID покрытие" : "COVID Əhatəsi"}
                        </Label>
                        <select
                          id="covidCoverage"
                          value={formData.covidCoverage}
                          onChange={(e) => handleChange("covidCoverage", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="yes">{language === "en" ? "Yes" : language === "ru" ? "Да" : "Bəli"}</option>
                          <option value="no">{language === "en" ? "No" : language === "ru" ? "Нет" : "Xeyr"}</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cancellationCoverage" className="text-sm">
                          {language === "en" ? "Cancellation" : language === "ru" ? "Отмена" : "Ləğvetmə"}
                        </Label>
                        <select
                          id="cancellationCoverage"
                          value={formData.cancellationCoverage}
                          onChange={(e) => handleChange("cancellationCoverage", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="yes">{language === "en" ? "Yes" : language === "ru" ? "Да" : "Bəli"}</option>
                          <option value="no">{language === "en" ? "No" : language === "ru" ? "Нет" : "Xeyr"}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Embassy Tab */}
                <TabsContent value="embassy" className="space-y-4 mt-6">
                  <h3 className="text-slate-900">
                    {language === "en" ? "Embassy Required Bookings" : language === "ru" ? "Бронирование для посольства" : "Səfirlik üçün Rezervasiyalar"}
                  </h3>

                  {/* Embassy Type */}
                  <div className="space-y-2">
                    <Label htmlFor="embassyType">
                      {language === "en" ? "Booking Type" : language === "ru" ? "Тип бронирования" : "Rezervasiya Növü"} *
                    </Label>
                    <select
                      id="embassyType"
                      required
                      value={formData.embassyType}
                      onChange={(e) => handleChange("embassyType", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="single">{language === "en" ? "Single Country" : language === "ru" ? "Одна страна" : "Tək Ölkə"}</option>
                      <option value="multiple">{language === "en" ? "Multiple Countries (Schengen)" : language === "ru" ? "Несколько стран (Шенген)" : "Çoxlu Ölkələr (Schengen)"}</option>
                    </select>
                  </div>

                  {/* Embassy Country */}
                  <div className="space-y-2">
                    <Label htmlFor="embassyCountry">
                      {language === "en" ? "Embassy Country" : language === "ru" ? "Страна посольства" : "Səfirlik Ölkəsi"} *
                    </Label>
                    <Input
                      id="embassyCountry"
                      required
                      value={formData.embassyCountry}
                      onChange={(e) => handleChange("embassyCountry", e.target.value)}
                      placeholder={language === "en" ? "USA, UK, Turkey..." : language === "ru" ? "США, Великобритания, Турция..." : "ABŞ, İngiltərə, Türkiyə..."}
                    />
                  </div>

                  {/* Additional Countries (for Schengen) */}
                  {formData.embassyType === "multiple" && (
                    <div className="space-y-2">
                      <Label htmlFor="additionalCountries">
                        {language === "en" ? "Additional Countries to Visit" : language === "ru" ? "Дополнительные страны для посещения" : "Ziyarət ediləcək Digər Ölkələr"}
                      </Label>
                      <Input
                        id="additionalCountries"
                        value={formData.additionalCountries}
                        onChange={(e) => handleChange("additionalCountries", e.target.value)}
                        placeholder={language === "en" ? "France, Germany, Italy..." : language === "ru" ? "Франция, Германия, Италия..." : "Fransa, Almaniya, İtaliya..."}
                      />
                    </div>
                  )}

                  {/* Required Services */}
                  <div className="space-y-2">
                    <Label htmlFor="requiredServices">
                      {language === "en" ? "Required Services" : language === "ru" ? "Необходимые услуги" : "Tələb olunan Xidmətlər"} *
                    </Label>
                    <select
                      id="requiredServices"
                      required
                      value={formData.requiredServices}
                      onChange={(e) => handleChange("requiredServices", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="flight">{language === "en" ? "Flight Only" : language === "ru" ? "Только рейс" : "Yalnız Uçuş"}</option>
                      <option value="hotel">{language === "en" ? "Hotel Only" : language === "ru" ? "Только отель" : "Yalnız Otel"}</option>
                      <option value="flight+hotel">{language === "en" ? "Flight + Hotel" : language === "ru" ? "Рейс + Отель" : "Uçuş + Otel"}</option>
                      <option value="flight+hotel+insurance">{language === "en" ? "Flight + Hotel + Insurance" : language === "ru" ? "Рейс + Отель + Страховка" : "Uçuş + Otel + Sığorta"}</option>
                      <option value="full-package">{language === "en" ? "Full Package" : language === "ru" ? "Полный пакет" : "Tam Paket"}</option>
                    </select>
                  </div>

                  {/* Travel Period */}
                  <div className="space-y-2">
                    <Label htmlFor="travelPeriod">
                      {language === "en" ? "Travel Period" : language === "ru" ? "Период путешествия" : "Səyahət Müddəti"} *
                    </Label>
                    <Input
                      id="travelPeriod"
                      required
                      value={formData.travelPeriod}
                      onChange={(e) => handleChange("travelPeriod", e.target.value)}
                      placeholder={language === "en" ? "15 Dec - 25 Dec 2024" : language === "ru" ? "15 дек - 25 дек 2024" : "15 Dek - 25 Dek 2024"}
                    />
                  </div>

                  {/* Urgency & Services */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="urgencyLevel">
                        {language === "en" ? "Urgency Level" : language === "ru" ? "Срочность" : "Təcililik Səviyyəsi"} *
                      </Label>
                      <select
                        id="urgencyLevel"
                        required
                        value={formData.urgencyLevel}
                        onChange={(e) => handleChange("urgencyLevel", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="normal">{language === "en" ? "Normal (2-3 weeks)" : language === "ru" ? "Обычная (2-3 недели)" : "Normal (2-3 həftə)"}</option>
                        <option value="urgent">{language === "en" ? "Urgent (1 week)" : language === "ru" ? "Срочная (1 неделя)" : "Təcili (1 həftə)"}</option>
                        <option value="express">{language === "en" ? "Express (2-3 days)" : language === "ru" ? "Экспресс (2-3 дня)" : "Ekspress (2-3 gün)"}</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documentPrep">
                        {language === "en" ? "Document Preparation" : language === "ru" ? "Подготовка документов" : "Sənəd Hazırlanması"}
                      </Label>
                      <select
                        id="documentPrep"
                        value={formData.documentPrep}
                        onChange={(e) => handleChange("documentPrep", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="no">{language === "en" ? "No" : language === "ru" ? "Нет" : "Xeyr"}</option>
                        <option value="yes">{language === "en" ? "Yes" : language === "ru" ? "Да" : "Bəli"}</option>
                      </select>
                    </div>
                  </div>

                  {/* Visa Interview Support */}
                  <div className="space-y-2">
                    <Label htmlFor="visaInterview">
                      {language === "en" ? "Visa Interview Preparation" : language === "ru" ? "Подготовка к собеседованию" : "Viza Müsahibəsi Hazırlığı"}
                    </Label>
                    <select
                      id="visaInterview"
                      value={formData.visaInterview}
                      onChange={(e) => handleChange("visaInterview", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="no">{language === "en" ? "No" : language === "ru" ? "Нет" : "Xeyr"}</option>
                      <option value="yes">{language === "en" ? "Yes" : language === "ru" ? "Да" : "Bəli"}</option>
                    </select>
                  </div>
                </TabsContent>

                {/* Additional Information (Common) */}
                <div className="mt-6 space-y-2">
                  <Label htmlFor="additionalInfo">
                    {language === "en" ? "Additional Information" : language === "ru" ? "Дополнительная информация" : "Əlavə Məlumat"}
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => handleChange("additionalInfo", e.target.value)}
                    rows={4}
                    placeholder={
                      language === "en"
                        ? "Any special requests or additional details..."
                        : language === "ru"
                        ? "Любые специальные пожелания или дополнительные детали..."
                        : "Hər hansı xüsusi tələblər və ya əlavə detallar..."
                    }
                  />
                </div>
              </Tabs>
            </div>

            {/* Footer */}
            <div className="border-t bg-slate-50 p-6 flex items-center justify-between">
              <Button type="button" onClick={onClose} variant="outline">
                {language === "en" ? "Cancel" : language === "ru" ? "Отмена" : "Ləğv et"}
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 text-white gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {language === "en" ? "Sending..." : language === "ru" ? "Отправка..." : "Göndərilir..."}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {language === "en" ? "Submit Request" : language === "ru" ? "Отправить запрос" : "Sorğu Göndər"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
