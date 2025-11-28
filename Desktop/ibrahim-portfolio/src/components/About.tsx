import { Award, Target, Heart, TrendingUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function About() {
  const { t } = useLanguage();
  
  // Your professional profile image - works everywhere!
  const profileImg = "https://i.imgur.com/64oQNiZ.jpeg";
  
  const highlights = [
    {
      icon: Target,
      title: t("about.highlight1Title"),
      description: t("about.highlight1Desc"),
    },
    {
      icon: Award,
      title: t("about.highlight2Title"),
      description: t("about.highlight2Desc"),
    },
    {
      icon: TrendingUp,
      title: t("about.highlight3Title"),
      description: t("about.highlight3Desc"),
    },
    {
      icon: Heart,
      title: t("about.highlight4Title"),
      description: t("about.highlight4Desc"),
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-slate-900 mb-4">{t("about.title")}</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {t("about.subtitle")}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full border-4 border-teal-600/20 rounded-lg -z-10" />
              <img
                src={profileImg}
                alt="Ibrahim Abdullayev - Flight Expert"
                className="w-full h-[400px] object-cover rounded-lg shadow-xl"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-slate-900 mb-4">{t("about.journeyTitle")}</h3>
                <div className="space-y-4 text-slate-600">
                  <p>
                    {t("about.journey1")}
                  </p>
                  <p>
                    {t("about.journey2")}
                  </p>
                  <p>
                    {t("about.journey3")}
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-teal-600 pl-6 py-4 bg-slate-50">
                <p className="text-slate-700 italic">
                  "{t("about.quote")}"
                </p>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-slate-50 p-6 rounded-lg hover:shadow-lg transition-shadow border border-slate-200"
              >
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <highlight.icon className="text-white" size={24} />
                </div>
                <h4 className="text-slate-900 mb-2">{highlight.title}</h4>
                <p className="text-slate-600">{highlight.description}</p>
              </div>
            ))}
          </div>

          {/* Personal Touch Section */}
          <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 md:p-12 text-white">
            <h3 className="text-white mb-4">{t("about.beyondTitle")}</h3>
            <p className="text-slate-300 mb-4">
              {t("about.beyond1")}
            </p>
            <p className="text-slate-300">
              {t("about.beyond2")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}