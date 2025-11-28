import { Star, Quote } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  location: string;
}

export function Testimonials() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const testimonials: Testimonial[] = [
    {
      name: t("testimonials.client1Name"),
      role: t("testimonials.client1Role"),
      content: t("testimonials.client1Content"),
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      location: "Baku, Azerbaijan",
    },
    {
      name: t("testimonials.client2Name"),
      role: t("testimonials.client2Role"),
      content: t("testimonials.client2Content"),
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      location: "Istanbul, Turkey",
    },
    {
      name: t("testimonials.client3Name"),
      role: t("testimonials.client3Role"),
      content: t("testimonials.client3Content"),
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      location: "Dubai, UAE",
    },
    {
      name: t("testimonials.client4Name"),
      role: t("testimonials.client4Role"),
      content: t("testimonials.client4Content"),
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      location: "Moscow, Russia",
    },
    {
      name: t("testimonials.client5Name"),
      role: t("testimonials.client5Role"),
      content: t("testimonials.client5Content"),
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      location: "London, UK",
    },
    {
      name: t("testimonials.client6Name"),
      role: t("testimonials.client6Role"),
      content: t("testimonials.client6Content"),
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      location: "New York, USA",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-teal-600/10 border border-teal-600/20 rounded-full mb-4">
              <span className="text-teal-700">{t("testimonials.badge")}</span>
            </div>
            <h2 className="text-slate-900 mb-4">{t("testimonials.title")}</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {t("testimonials.subtitle")}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-200 hover:border-teal-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Glassmorphism overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-teal-600/5 to-blue-600/5 rounded-2xl opacity-0 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : ''}`} />
                
                <div className="relative">
                  {/* Quote icon */}
                  <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote size={24} />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-slate-700 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-600/20 group-hover:ring-teal-600/40 transition-all"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-600 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-900">{testimonial.name}</p>
                      <p className="text-slate-500 text-sm">{testimonial.role}</p>
                      <p className="text-teal-600 text-xs">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-600">
              {t("testimonials.cta")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
