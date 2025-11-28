import { useEffect, useRef, useState } from "react";
import { Users, Globe2, DollarSign, Clock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface StatItemProps {
  icon: any;
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

function StatItem({ icon: Icon, value, suffix, label, prefix = "" }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 2000; // 2 seconds animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return (
    <div 
      ref={ref}
      className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 hover:border-teal-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      <div className="relative">
        <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="text-white" size={28} />
        </div>
        <div className="space-y-2">
          <div className="text-slate-900 tabular-nums tracking-tight">
            <span className="text-4xl font-bold">{prefix}{count}</span>
            <span className="text-3xl font-bold text-teal-600">{suffix}</span>
          </div>
          <p className="text-slate-600">{label}</p>
        </div>
      </div>
    </div>
  );
}

export function Stats() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: 500,
      suffix: "+",
      label: t("stats.clients"),
    },
    {
      icon: Globe2,
      value: 50,
      suffix: "+",
      label: t("stats.countries"),
    },
    {
      icon: DollarSign,
      value: 2,
      suffix: "M+",
      label: t("stats.saved"),
      prefix: "$",
    },
    {
      icon: Clock,
      value: 24,
      suffix: "/7",
      label: t("stats.support"),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-teal-600/10 border border-teal-600/20 rounded-full mb-4">
              <span className="text-teal-700">{t("stats.badge")}</span>
            </div>
            <h2 className="text-slate-900 mb-4">{t("stats.title")}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {t("stats.subtitle")}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatItem key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
