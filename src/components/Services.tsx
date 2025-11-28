import { ArrowRight, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { BookingForm } from "./BookingForm";
import { useState } from "react";

export function Services() {
  const { t } = useLanguage();
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"flight" | "hotel" | "insurance" | "embassy">("flight");
  
  const services = [
    {
      title: t("services.service1Title"),
      tagline: t("services.service1Tagline"),
      description: t("services.service1Desc"),
      features: [
        t("services.service1Feature1"),
        t("services.service1Feature2"),
        t("services.service1Feature3"),
      ],
      cta: t("services.service1CTA"),
      accent: "from-blue-500 to-teal-600",
      bookingType: "flight" as const,
    },
    {
      title: t("services.service2Title"),
      tagline: t("services.service2Tagline"),
      description: t("services.service2Desc"),
      features: [
        t("services.service2Feature1"),
        t("services.service2Feature2"),
        t("services.service2Feature3"),
      ],
      cta: t("services.service2CTA"),
      accent: "from-teal-500 to-emerald-600",
      bookingType: "hotel" as const,
    },
    {
      title: t("services.service3Title"),
      tagline: t("services.service3Tagline"),
      description: t("services.service3Desc"),
      features: [
        t("services.service3Feature1"),
        t("services.service3Feature2"),
        t("services.service3Feature3"),
      ],
      cta: t("services.service3CTA"),
      accent: "from-purple-500 to-indigo-600",
      bookingType: "insurance" as const,
    },
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const openBookingForm = (type: "flight" | "hotel" | "insurance" | "embassy") => {
    setBookingType(type);
    setIsBookingFormOpen(true);
  };

  return (
    <>
      <section id="services" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-slate-900 mb-4">{t("services.title")}</h2>
              <div className="w-20 h-1 bg-teal-600 mx-auto mb-6" />
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                {t("services.subtitle")}
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 border-slate-200 flex flex-col"
                >
                  <CardHeader>
                    <div
                      className={`w-full h-2 rounded-full bg-gradient-to-r ${service.accent} mb-4`}
                    />
                    <CardTitle className="text-slate-900">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-teal-600">
                      {service.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-2 text-slate-700"
                        >
                          <Check
                            className="text-teal-600 flex-shrink-0 mt-0.5"
                            size={18}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => openBookingForm(service.bookingType)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white group"
                    >
                      {service.cta}
                      <ArrowRight
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                        size={18}
                      />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Call-to-Action Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 rounded-xl p-8 md:p-12 text-center text-white shadow-2xl">
              <h3 className="text-white mb-4">
                {t("services.ctaTitle")}
              </h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                {t("services.ctaDesc")}
              </p>
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {t("services.ctaButton")}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <BookingForm
        isOpen={isBookingFormOpen}
        onClose={() => setIsBookingFormOpen(false)}
        type={bookingType}
      />
    </>
  );
}