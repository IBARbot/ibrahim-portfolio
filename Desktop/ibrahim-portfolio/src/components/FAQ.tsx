import { HelpCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQ() {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4"),
    },
    {
      question: t("faq.q5"),
      answer: t("faq.a5"),
    },
    {
      question: t("faq.q6"),
      answer: t("faq.a6"),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-teal-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600/10 border border-teal-600/20 rounded-full mb-4">
              <HelpCircle size={18} className="text-teal-700" />
              <span className="text-teal-700">{t("faq.badge")}</span>
            </div>
            <h2 className="text-slate-900 mb-4">{t("faq.title")}</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {t("faq.subtitle")}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 shadow-xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-200 rounded-xl px-6 hover:border-teal-400 transition-colors data-[state=open]:border-teal-600 data-[state=open]:bg-teal-50/50"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm">?</span>
                      </div>
                      <span className="text-slate-900 pr-4">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-9 pr-4 pb-4 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8">
            <h3 className="text-white mb-3">{t("faq.ctaTitle")}</h3>
            <p className="text-slate-300 mb-6">
              {t("faq.ctaDesc")}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("contact");
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
            >
              {t("faq.ctaButton")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
