import { MessageCircle, FileText, Search, Check } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function ProcessSteps() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: MessageCircle,
      title: t("process.step1Title"),
      description: t("process.step1Desc"),
      color: "from-blue-500 to-blue-600",
    },
    {
      number: "02",
      icon: FileText,
      title: t("process.step2Title"),
      description: t("process.step2Desc"),
      color: "from-teal-500 to-teal-600",
    },
    {
      number: "03",
      icon: Search,
      title: t("process.step3Title"),
      description: t("process.step3Desc"),
      color: "from-emerald-500 to-emerald-600",
    },
    {
      number: "04",
      icon: Check,
      title: t("process.step4Title"),
      description: t("process.step4Desc"),
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-teal-200 to-emerald-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-teal-600/10 border border-teal-600/20 rounded-full mb-4">
              <span className="text-teal-700">{t("process.badge")}</span>
            </div>
            <h2 className="text-slate-900 mb-4">{t("process.title")}</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {t("process.subtitle")}
            </p>
          </div>

          {/* Process Timeline */}
          <div className="relative">
            {/* Connection Line - Hidden on mobile */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 via-teal-300 via-emerald-300 to-purple-300 opacity-30" />

            {/* Steps Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card */}
                  <div className="relative bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-teal-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    {/* Number Badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-white text-lg font-bold">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-4 mt-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <step.icon className="text-white" size={32} />
                    </div>

                    {/* Content */}
                    <h3 className="text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Progress indicator */}
                    <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${step.color} rounded-full group-hover:w-full transition-all duration-500`}
                        style={{ width: `${(index + 1) * 25}%` }}
                      />
                    </div>
                  </div>

                  {/* Arrow connector - Desktop only */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-4 z-20">
                      <div className="w-8 h-8 bg-white border-2 border-teal-400 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-2xl p-6">
              <p className="text-slate-700 mb-2">
                <span className="text-teal-700">✨</span> {t("process.cta")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
