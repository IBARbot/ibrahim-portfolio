import { useState, useEffect } from "react";
import { BookOpen, Calendar, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface BlogReference {
  title: string;
  url: string;
  source?: string;
}

interface BlogPost {
  id: string;
  title_en: string;
  title_ru: string;
  title_az: string;
  content_en: string;
  content_ru: string;
  content_az: string;
  image_url: string;
  author: string;
  date: string;
  category: string;
  hidden_references?: string;
  // Legacy support
  titleKey?: string;
  dateKey?: string;
  excerptKey?: string;
  contentKey?: string;
  imageUrl?: string;
  referencesKey?: string;
  references?: BlogReference[];
}

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-45a44eb5`;

function BlogPostCard({ post }: { post: BlogPost }) {
  const { t } = useLanguage();
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={post.imageUrl || post.image_url}
          alt={t(post.titleKey || `blog.post${post.id}.title`)}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm">
            <Calendar size={14} className="inline mr-1" />
            {t(post.dateKey || `blog.post${post.id}.date`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-slate-900 mb-3 hover:text-teal-600 transition-colors">
          {t(post.titleKey || `blog.post${post.id}.title`)}
        </h3>
        
        <p className="text-slate-600 mb-4 line-clamp-3">
          {t(post.excerptKey || `blog.post${post.id}.excerpt`)}
        </p>

        {/* Full content - expandable */}
        <div className="prose prose-slate max-w-none mb-4">
          <p className="text-slate-700 whitespace-pre-line">
            {t(post.contentKey || `blog.post${post.id}.content`)}
          </p>
        </div>

        {/* References section - collapsible */}
        {post.references && post.references.length > 0 && (
          <Collapsible
            open={isReferencesOpen}
            onOpenChange={setIsReferencesOpen}
            className="border-t border-slate-200 pt-4 mt-4"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left group">
              <span className="text-sm font-medium text-slate-700 group-hover:text-teal-600 transition-colors">
                {post.referencesKey ? t(post.referencesKey) : "References"} ({post.references.length})
              </span>
              {isReferencesOpen ? (
                <ChevronUp size={18} className="text-slate-400 group-hover:text-teal-600 transition-colors" />
              ) : (
                <ChevronDown size={18} className="text-slate-400 group-hover:text-teal-600 transition-colors" />
              )}
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-3 space-y-2">
              {post.references.map((ref, index) => (
                <a
                  key={index}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg hover:bg-teal-50 transition-colors group"
                >
                  <ExternalLink size={16} className="text-teal-600 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 group-hover:text-teal-600 transition-colors">
                      {ref.title}
                    </p>
                    {ref.source && (
                      <p className="text-xs text-slate-500 mt-1">
                        {ref.source}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </article>
  );
}

export function Blog() {
  const { t } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      // First, try to load from localStorage immediately (no loading state)
      const savedPosts = localStorage.getItem("blogPosts");
      if (savedPosts) {
        try {
          const parsed = JSON.parse(savedPosts);
          if (parsed && parsed.length > 0) {
            setBlogPosts(parsed);
            setIsLoading(false);
          } else {
            setIsLoading(false); // Empty but valid
          }
        } catch (e) {
          // Invalid localStorage data, clear it
          localStorage.removeItem("blogPosts");
          setIsLoading(false);
        }
      } else {
        // No localStorage data
        setIsLoading(false);
      }

      // Then try to fetch from backend (silently, in background)
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(`${API_URL}/blog/posts`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.posts && data.posts.length > 0) {
            setBlogPosts(data.posts);
            localStorage.setItem("blogPosts", JSON.stringify(data.posts));
          }
        }
      } catch (error) {
        // Completely silent - no console logs, no errors shown
        // This is expected when backend is not deployed
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section id="blog" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full mb-4">
              <BookOpen size={18} />
              <span className="font-medium">{t("blog.badge")}</span>
            </div>
            <h2 className="text-slate-900 mb-4">{t("blog.title")}</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {t("blog.subtitle")}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-500">Yüklənir...</p>
            </div>
          )}

          {/* Blog Posts Grid */}
          {!isLoading && blogPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Empty state for when there are no posts */}
          {!isLoading && blogPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen size={48} className="text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">
                {t("blog.noPosts")}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}