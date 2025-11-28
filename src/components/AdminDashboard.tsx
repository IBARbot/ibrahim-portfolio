import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BlogEditor } from "./BlogEditor";
import { BlogPostData } from "./BlogPostCard";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { ProfileSettingsModal } from "./ProfileSettingsModal";
import { ContentEditor } from "./ContentEditor";
import { BookingsTab } from "./BookingsTab";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  status: "new" | "read" | "replied";
}

interface BookingSubmission {
  id: string;
  type: "flight" | "hotel" | "insurance" | "embassy";
  name: string;
  email: string;
  phone: string;
  created_at: string;
  status: "new" | "contacted" | "completed";
  [key: string]: any;
}

interface NewsletterSubscriber {
  email: string;
  name?: string;
  subscribed_at: string;
  status: "active" | "unsubscribed";
}

interface AnalyticsSummary {
  totalPosts: number;
  totalContacts: number;
  newContacts: number;
  totalNewsletterSubscribers: number;
  totalPageviews: number;
  todayPageviews: number;
  todayContacts: number;
}

interface AdminDashboardProps {
  onLogout: () => void;
  posts: BlogPostData[];
  onCreatePost: (post: BlogPostData) => Promise<void>;
  onUpdatePost: (post: BlogPostData) => Promise<void>;
  onDeletePost: (id: string) => Promise<void>;
  onUploadImage?: (file: File) => Promise<string>;
  contacts?: ContactSubmission[];
  subscribers?: NewsletterSubscriber[];
  analytics?: AnalyticsSummary;
  onUpdateContactStatus?: (id: string, status: "new" | "read" | "replied") => Promise<void>;
  onDeleteContact?: (id: string) => Promise<void>;
  bookings?: BookingSubmission[];
}

export function AdminDashboard({
  onLogout,
  posts,
  onCreatePost,
  onUpdatePost,
  onDeletePost,
  onUploadImage,
  contacts,
  subscribers,
  analytics,
  onUpdateContactStatus,
  onDeleteContact,
  bookings,
}: AdminDashboardProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostData | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isProfileSettingsModalOpen, setIsProfileSettingsModalOpen] = useState(false);

  const handleCreateNew = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (post: BlogPostData) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleSave = async (post: BlogPostData) => {
    try {
      if (editingPost?.id) {
        await onUpdatePost(post);
      } else {
        await onCreatePost(post);
      }
      setIsEditorOpen(false);
      setEditingPost(null);
    } catch (err: any) {
      throw err; // Let BlogEditor handle the error
    }
  };

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      try {
        await onDeletePost(postToDelete);
        setDeleteDialogOpen(false);
        setPostToDelete(null);
      } catch (err: any) {
        setError(err.message || "Failed to delete post");
      }
    }
  };

  const handleContactStatusChange = async (id: string, status: 'new' | 'read' | 'replied') => {
    if (onUpdateContactStatus) {
      try {
        await onUpdateContactStatus(id, status);
      } catch (err: any) {
        setError(err.message || "Failed to update status");
      }
    }
  };

  const handleContactDelete = async (id: string) => {
    if (onDeleteContact) {
      try {
        await onDeleteContact(id);
      } catch (err: any) {
        setError(err.message || "Failed to delete contact");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-slate-900">Bloq İdarəetmə Paneli</h1>
                <p className="text-slate-600 text-sm">
                  Bloqları idarə edin və yeniləyin
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-teal-600 transition-colors flex items-center gap-2"
                >
                  <Eye size={18} />
                  <span className="hidden sm:inline">Saytı gör</span>
                </a>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Çıxış</span>
                </Button>
                <Button
                  onClick={() => setIsChangePasswordModalOpen(true)}
                  variant="outline"
                  className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <KeyRound size={18} />
                  <span className="hidden sm:inline">Şifrəni dəyiş</span>
                </Button>
                <Button
                  onClick={() => setIsProfileSettingsModalOpen(true)}
                  variant="outline"
                  className="gap-2 text-teal-600 border-teal-200 hover:bg-teal-50"
                >
                  <User size={18} />
                  <span className="hidden sm:inline">Profil</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle
                size={20}
                className="text-red-600 flex-shrink-0 mt-0.5"
              />
              <div className="flex-1">
                <p className="text-sm text-red-800">{error}</p>
              </div>
              <button
                onClick={() => setError("")}
                className="text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </motion.div>
          )}

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Ümumi Bloqlar</p>
                  <p className="text-slate-900">{posts.length}</p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <BookOpen size={24} className="text-teal-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Son Yeniləmə</p>
                  <p className="text-slate-900 text-sm">
                    {posts.length > 0 ? "Bu gün" : "Yoxdur"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar size={24} className="text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-teal-600 to-blue-700 p-6 rounded-xl shadow-sm text-white"
            >
              <Button
                onClick={handleCreateNew}
                className="w-full bg-white text-teal-600 hover:bg-slate-50 gap-2"
              >
                <Plus size={20} />
                Yeni Bloq Yarat
              </Button>
            </motion.div>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="blog" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto">
              <TabsTrigger value="blog" className="gap-2">
                <BookOpen size={16} />
                <span className="hidden sm:inline">Bloqlar</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="gap-2">
                <Plane size={16} />
                <span className="hidden sm:inline">Sifarişlər</span>
                {bookings && bookings.filter(b => b.status === 'new').length > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                    {bookings.filter(b => b.status === 'new').length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="contacts" className="gap-2">
                <MessageSquare size={16} />
                <span className="hidden sm:inline">Mesajlar</span>
                {analytics && analytics.newContacts > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                    {analytics.newContacts}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="newsletter" className="gap-2">
                <Mail size={16} />
                <span className="hidden sm:inline">Newsletter</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <TrendingUp size={16} />
                <span className="hidden sm:inline">Statistika</span>
              </TabsTrigger>
            </TabsList>

            {/* Blog Posts Tab */}
            <TabsContent value="blog">{/* Blog Posts List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-slate-900">Bloqlarım</h2>
            </div>

            <div className="divide-y divide-slate-200">
              {posts.length === 0 ? (
                <div className="p-12 text-center">
                  <BookOpen
                    size={48}
                    className="text-slate-300 mx-auto mb-4"
                  />
                  <h3 className="text-slate-900 mb-2">Hələ bloq yoxdur</h3>
                  <p className="text-slate-600 mb-6">
                    İlk bloqunuzu yaratmaq üçün "Yeni Bloq Yarat" düyməsinə
                    basın
                  </p>
                  <Button
                    onClick={handleCreateNew}
                    className="bg-teal-600 hover:bg-teal-700 text-white gap-2"
                  >
                    <Plus size={18} />
                    Yeni Bloq Yarat
                  </Button>
                </div>
              ) : (
                posts.map((post, index) => (
                  <motion.div
                    key={post.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Thumbnail */}
                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt={post.titleEn}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-slate-900 mb-1 truncate">
                          {post.titleEn}
                        </h3>
                        <p className="text-slate-600 text-sm mb-2 line-clamp-2">
                          {post.excerptEn}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {post.dateEn}
                          </span>
                          <span>
                            {post.references?.length || 0} istinad
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          onClick={() => handleEdit(post)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Edit size={16} />
                          <span className="hidden sm:inline">Redaktə</span>
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick(post.id!)}
                          variant="outline"
                          size="sm"
                          className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Sil</span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings">{/* Bookings List */}
          <BookingsTab bookings={bookings} />
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts">{/* Contacts List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-slate-900">Gözləyən Mesajlar</h2>
            </div>

            <div className="divide-y divide-slate-200">
              {contacts && contacts.length === 0 ? (
                <div className="p-12 text-center">
                  <MessageSquare
                    size={48}
                    className="text-slate-300 mx-auto mb-4"
                  />
                  <h3 className="text-slate-900 mb-2">Hələ mesaj yoxdur</h3>
                  <p className="text-slate-600 mb-6">
                    İlk mesajınızı gözləyin
                  </p>
                </div>
              ) : (
                contacts?.map((contact, index) => (
                  <motion.div
                    key={contact.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Thumbnail */}
                      <div className="w-24 h-24 object-cover rounded-lg flex-shrink-0">
                        <MessageSquare size={24} className="text-slate-600" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-slate-900 mb-1 truncate">
                          {contact.name}
                        </h3>
                        <p className="text-slate-600 text-sm mb-2 line-clamp-2">
                          {contact.message}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {contact.created_at}
                          </span>
                          <span>
                            {contact.status}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          onClick={() => handleContactStatusChange(contact.id, "read")}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Edit size={16} />
                          <span className="hidden sm:inline">Oxundu</span>
                        </Button>
                        <Button
                          onClick={() => handleContactDelete(contact.id)}
                          variant="outline"
                          size="sm"
                          className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Sil</span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
            </TabsContent>

            {/* Newsletter Tab */}
            <TabsContent value="newsletter">{/* Newsletter List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-slate-900">Newsletter Abunəçatıqlar</h2>
            </div>

            <div className="divide-y divide-slate-200">
              {subscribers && subscribers.length === 0 ? (
                <div className="p-12 text-center">
                  <Mail
                    size={48}
                    className="text-slate-300 mx-auto mb-4"
                  />
                  <h3 className="text-slate-900 mb-2">Hələ abunəçi yoxdur</h3>
                  <p className="text-slate-600 mb-6">
                    İlk abunəçatıqları gözləyin
                  </p>
                </div>
              ) : (
                subscribers?.map((subscriber, index) => (
                  <motion.div
                    key={subscriber.email || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Thumbnail */}
                      <div className="w-24 h-24 object-cover rounded-lg flex-shrink-0">
                        <Mail size={24} className="text-slate-600" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-slate-900 mb-1 truncate">
                          {subscriber.name || subscriber.email}
                        </h3>
                        <p className="text-slate-600 text-sm mb-2 line-clamp-2">
                          {subscriber.email}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {subscriber.subscribed_at}
                          </span>
                          <span>
                            {subscriber.status}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          onClick={() => handleContactStatusChange(subscriber.email, "read")}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Edit size={16} />
                          <span className="hidden sm:inline">Oxundu</span>
                        </Button>
                        <Button
                          onClick={() => handleContactDelete(subscriber.email)}
                          variant="outline"
                          size="sm"
                          className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Sil</span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">{/* Analytics Data */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-slate-900">Statistika</h2>
            </div>

            <div className="divide-y divide-slate-200">
              {analytics ? (
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm mb-1">Ümumi Bloqlar</p>
                      <p className="text-slate-900">{analytics.totalPosts}</p>
                    </div>
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <BookOpen size={24} className="text-teal-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm mb-1">Ümumi Mesajlar</p>
                      <p className="text-slate-900">{analytics.totalContacts}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageSquare size={24} className="text-blue-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm mb-1">Ümumi Abunəçatıqlar</p>
                      <p className="text-slate-900">{analytics.totalNewsletterSubscribers}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Mail size={24} className="text-green-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm mb-1">Ümumi Görüntüləmələr</p>
                      <p className="text-slate-900">{analytics.totalPageviews}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp size={24} className="text-purple-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm mb-1">Bu Günki Görüntüləmələr</p>
                      <p className="text-slate-900">{analytics.todayPageviews}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp size={24} className="text-orange-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm mb-1">Bu Günki Mesajlar</p>
                      <p className="text-slate-900">{analytics.todayContacts}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <MessageSquare size={24} className="text-red-600" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <TrendingUp
                    size={48}
                    className="text-slate-300 mx-auto mb-4"
                  />
                  <h3 className="text-slate-900 mb-2">Statistika yoxdur</h3>
                  <p className="text-slate-600 mb-6">
                    Statistikaları gözləyin
                  </p>
                </div>
              )}
            </div>
          </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Blog Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <BlogEditor
            post={editingPost}
            onSave={handleSave}
            onCancel={() => {
              setIsEditorOpen(false);
              setEditingPost(null);
            }}
            onUploadImage={onUploadImage}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bloqu silmək istədiyinizdən əminsiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu əməliyyat geri alına bilməz. Bloq və bütün məzmunu həmişəlik
              silinəcək.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Ləğv et</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Bəli, sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />

      {/* Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={isProfileSettingsModalOpen}
        onClose={() => setIsProfileSettingsModalOpen(false)}
      />
    </>
  );
}