import { MessageCircle, Search, ThumbsUp, Plane } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Process() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: MessageCircle,
      title: t("process.step1Title"),
      description: t("process.step1Desc"),
      color: "from-blue-500 to-teal-600",
    },
    {
      number: "02",
      icon: Search,
      title: t("process.step2Title"),
      description: t("process.step2Desc"),
      color: "from-teal-500 to-emerald-600",
    },
    {
      number: "03",
      icon: ThumbsUp,
      title: t("process.step3Title"),
      description: t("process.step3Desc"),
      color: "from-emerald-500 to-green-600",
    },
    {
      number: "04",
      icon: Plane,
      title: t("process.step4Title"),
      description: t("process.step4Desc"),
      color: "from-purple-500 to-indigo-600",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-slate-900 mb-4">{t("process.title")}</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {t("process.subtitle")}
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connecting line - hidden on mobile */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-teal-200 to-purple-200" style={{ top: "6rem" }} />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative z-10">
                    {/* Number badge */}
                    <div className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                      <span className="text-sm">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <step.icon className="text-white" size={32} />
                    </div>

                    {/* Content */}
                    <h3 className="text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>

                  {/* Connecting arrow - only between steps on desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-4 w-8 h-8 z-20">
                      <svg
                        className="text-teal-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
