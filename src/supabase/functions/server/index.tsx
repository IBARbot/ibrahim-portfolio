import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// ============================================
// AUTH ROUTES
// ============================================

// Admin signup (run once to create admin user)
app.post('/make-server-45a44eb5/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: 'admin' },
      email_confirm: true, // Auto-confirm email
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true, 
      message: 'Admin yaradıldı',
      user: data.user 
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Server xətası baş verdi' }, 500);
  }
});

// ============================================
// BLOG POST ROUTES
// ============================================

// Get all blog posts
app.get('/make-server-45a44eb5/blog/posts', async (c) => {
  try {
    const posts = await kv.getByPrefix('blog_post_');
    
    // Sort by date (newest first)
    const sortedPosts = posts
      .map(p => JSON.parse(p))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return c.json({ posts: sortedPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return c.json({ error: 'Blog yazıları yüklənərkən xəta baş verdi' }, 500);
  }
});

// Get single blog post
app.get('/make-server-45a44eb5/blog/posts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const post = await kv.get(`blog_post_${id}`);

    if (!post) {
      return c.json({ error: 'Yazı tapılmadı' }, 404);
    }

    return c.json({ post: JSON.parse(post) });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return c.json({ error: 'Yazı yüklənərkən xəta baş verdi' }, 500);
  }
});

// Create blog post (requires auth)
app.post('/make-server-45a44eb5/blog/posts', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const post = await c.req.json();
    
    // Generate ID if not provided
    if (!post.id) {
      post.id = Date.now().toString();
    }

    // Add metadata
    post.created_at = new Date().toISOString();
    post.updated_at = new Date().toISOString();
    post.author_id = user.id;

    // Save to KV store
    await kv.set(`blog_post_${post.id}`, JSON.stringify(post));

    return c.json({ 
      success: true, 
      message: 'Yazı yaradıldı',
      post 
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return c.json({ error: 'Yazı yaradılarkən xəta baş verdi' }, 500);
  }
});

// Update blog post (requires auth)
app.put('/make-server-45a44eb5/blog/posts/:id', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const id = c.req.param('id');
    const updates = await c.req.json();

    // Get existing post
    const existingPost = await kv.get(`blog_post_${id}`);
    
    if (!existingPost) {
      return c.json({ error: 'Yazı tapılmadı' }, 404);
    }

    const post = JSON.parse(existingPost);
    
    // Update fields
    const updatedPost = {
      ...post,
      ...updates,
      id, // Preserve ID
      updated_at: new Date().toISOString(),
    };

    // Save to KV store
    await kv.set(`blog_post_${id}`, JSON.stringify(updatedPost));

    return c.json({ 
      success: true, 
      message: 'Yazı yeniləndi',
      post: updatedPost 
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return c.json({ error: 'Yazı yenilənərkən xəta baş verdi' }, 500);
  }
});

// Delete blog post (requires auth)
app.delete('/make-server-45a44eb5/blog/posts/:id', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const id = c.req.param('id');
    
    // Delete from KV store
    await kv.del(`blog_post_${id}`);

    return c.json({ 
      success: true, 
      message: 'Yazı silindi' 
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return c.json({ error: 'Yazı silinərkən xəta baş verdi' }, 500);
  }
});

// ============================================
// CONTACT FORM SUBMISSIONS
// ============================================

// Submit contact form
app.post('/make-server-45a44eb5/contact/submit', async (c) => {
  try {
    const submission = await c.req.json();
    
    // Generate ID
    const id = Date.now().toString();
    
    // Add metadata
    const contactSubmission = {
      ...submission,
      id,
      created_at: new Date().toISOString(),
      status: 'new', // new, read, replied
    };

    // Save to KV store
    await kv.set(`contact_${id}`, JSON.stringify(contactSubmission));

    return c.json({ 
      success: true, 
      message: 'Mesajınız göndərildi',
      id 
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return c.json({ error: 'Mesaj göndərilərkən xəta baş verdi' }, 500);
  }
});

// Get all contact submissions (requires auth)
app.get('/make-server-45a44eb5/contact/submissions', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const submissions = await kv.getByPrefix('contact_');
    
    // Sort by date (newest first)
    const sortedSubmissions = submissions
      .map(s => JSON.parse(s))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return c.json({ submissions: sortedSubmissions });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return c.json({ error: 'Mesajlar yüklənərkən xəta baş verdi' }, 500);
  }
});

// Update contact submission status (requires auth)
app.put('/make-server-45a44eb5/contact/submissions/:id', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const id = c.req.param('id');
    const { status } = await c.req.json();

    // Get existing submission
    const existing = await kv.get(`contact_${id}`);
    
    if (!existing) {
      return c.json({ error: 'Mesaj tapılmadı' }, 404);
    }

    const submission = JSON.parse(existing);
    submission.status = status;
    submission.updated_at = new Date().toISOString();

    // Save to KV store
    await kv.set(`contact_${id}`, JSON.stringify(submission));

    return c.json({ 
      success: true, 
      message: 'Status yeniləndi',
      submission 
    });
  } catch (error) {
    console.error('Error updating contact submission:', error);
    return c.json({ error: 'Status yenilənərkən xəta baş verdi' }, 500);
  }
});

// Delete contact submission (requires auth)
app.delete('/make-server-45a44eb5/contact/submissions/:id', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`contact_${id}`);

    return c.json({ 
      success: true, 
      message: 'Mesaj silindi' 
    });
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    return c.json({ error: 'Mesaj silinərkən xəta baş verdi' }, 500);
  }
});

// ============================================
// NEWSLETTER SUBSCRIPTIONS
// ============================================

// Subscribe to newsletter
app.post('/make-server-45a44eb5/newsletter/subscribe', async (c) => {
  try {
    const { email, name } = await c.req.json();
    
    // Check if email already exists
    const existing = await kv.get(`newsletter_${email}`);
    
    if (existing) {
      return c.json({ error: 'Bu email artıq abunə olunub' }, 400);
    }

    // Create subscription
    const subscription = {
      email,
      name,
      subscribed_at: new Date().toISOString(),
      status: 'active', // active, unsubscribed
    };

    // Save to KV store
    await kv.set(`newsletter_${email}`, JSON.stringify(subscription));

    return c.json({ 
      success: true, 
      message: 'Abunə olundu! Təşəkkürlər!' 
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return c.json({ error: 'Abunə olunarkən xəta baş verdi' }, 500);
  }
});

// Get all newsletter subscribers (requires auth)
app.get('/make-server-45a44eb5/newsletter/subscribers', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const subscribers = await kv.getByPrefix('newsletter_');
    
    // Sort by date (newest first)
    const sortedSubscribers = subscribers
      .map(s => JSON.parse(s))
      .filter(s => s.status === 'active')
      .sort((a, b) => new Date(b.subscribed_at).getTime() - new Date(a.subscribed_at).getTime());

    return c.json({ 
      subscribers: sortedSubscribers,
      count: sortedSubscribers.length 
    });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return c.json({ error: 'Abunəçilər yüklənərkən xəta baş verdi' }, 500);
  }
});

// Unsubscribe from newsletter
app.post('/make-server-45a44eb5/newsletter/unsubscribe', async (c) => {
  try {
    const { email } = await c.req.json();
    
    const existing = await kv.get(`newsletter_${email}`);
    
    if (!existing) {
      return c.json({ error: 'Email tapılmadı' }, 404);
    }

    const subscription = JSON.parse(existing);
    subscription.status = 'unsubscribed';
    subscription.unsubscribed_at = new Date().toISOString();

    await kv.set(`newsletter_${email}`, JSON.stringify(subscription));

    return c.json({ 
      success: true, 
      message: 'Abunəlikdən çıxdınız' 
    });
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return c.json({ error: 'Abunəlikdən çıxarkən xəta baş verdi' }, 500);
  }
});

// ============================================
// ANALYTICS & STATISTICS
// ============================================

// Track page view
app.post('/make-server-45a44eb5/analytics/pageview', async (c) => {
  try {
    const { page, referrer, userAgent } = await c.req.json();
    
    const id = Date.now().toString();
    
    const pageview = {
      id,
      page,
      referrer,
      userAgent,
      timestamp: new Date().toISOString(),
    };

    await kv.set(`analytics_pageview_${id}`, JSON.stringify(pageview));

    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking pageview:', error);
    return c.json({ error: 'Pageview izlənərkən xəta baş verdi' }, 500);
  }
});

// Get analytics summary (requires auth)
app.get('/make-server-45a44eb5/analytics/summary', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    // Get all data
    const [posts, contacts, newsletters, pageviews] = await Promise.all([
      kv.getByPrefix('blog_post_'),
      kv.getByPrefix('contact_'),
      kv.getByPrefix('newsletter_'),
      kv.getByPrefix('analytics_pageview_'),
    ]);

    // Calculate stats
    const contactsData = contacts.map(c => JSON.parse(c));
    const newsletterData = newsletters.map(n => JSON.parse(n));
    const pageviewsData = pageviews.map(p => JSON.parse(p));

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayPageviews = pageviewsData.filter(
      p => new Date(p.timestamp) >= today
    ).length;

    const todayContacts = contactsData.filter(
      c => new Date(c.created_at) >= today
    ).length;

    return c.json({
      totalPosts: posts.length,
      totalContacts: contacts.length,
      newContacts: contactsData.filter(c => c.status === 'new').length,
      totalNewsletterSubscribers: newsletterData.filter(n => n.status === 'active').length,
      totalPageviews: pageviews.length,
      todayPageviews,
      todayContacts,
    });
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return c.json({ error: 'Statistika yüklənərkən xəta baş verdi' }, 500);
  }
});

// ============================================
// STORAGE / FILE UPLOAD
// ============================================

// Initialize storage bucket on server startup
const BUCKET_NAME = 'make-45a44eb5-blog-images';

// Create bucket if it doesn't exist
(async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 5242880, // 5MB
      });
      console.log('Storage bucket yaradıldı:', BUCKET_NAME);
    }
  } catch (error) {
    console.error('Bucket yaradılarkən xəta:', error);
  }
})();

// Upload file (requires auth)
app.post('/make-server-45a44eb5/storage/upload', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'Fayl seçilməyib' }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, await file.arrayBuffer(), {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return c.json({ error: 'Fayl yüklənərkən xəta baş verdi' }, 500);
    }

    // Create signed URL (valid for 1 year)
    const { data: signedUrlData } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filename, 31536000); // 1 year in seconds

    return c.json({ 
      success: true, 
      message: 'Fayl yükləndi',
      filename,
      url: signedUrlData?.signedUrl 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return c.json({ error: 'Fayl yüklənərkən xəta baş verdi' }, 500);
  }
});

// Get file signed URL (requires auth)
app.get('/make-server-45a44eb5/storage/file/:filename', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const filename = c.req.param('filename');

    // Create signed URL (valid for 1 hour)
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filename, 3600); // 1 hour

    if (error) {
      return c.json({ error: 'Fayl tapılmadı' }, 404);
    }

    return c.json({ 
      success: true,
      url: data.signedUrl 
    });
  } catch (error) {
    console.error('Error getting file URL:', error);
    return c.json({ error: 'Fayl URL-i əldə edilərkən xəta baş verdi' }, 500);
  }
});

// Delete file (requires auth)
app.delete('/make-server-45a44eb5/storage/file/:filename', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const filename = c.req.param('filename');

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filename]);

    if (error) {
      return c.json({ error: 'Fayl silinərkən xəta baş verdi' }, 500);
    }

    return c.json({ 
      success: true, 
      message: 'Fayl silindi' 
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    return c.json({ error: 'Fayl silinərkən xəta baş verdi' }, 500);
  }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/make-server-45a44eb5/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Server işləyir' 
  });
});

// ============================================
// BOOKING FORM SUBMISSIONS & EMAIL NOTIFICATIONS
// ============================================

// Submit booking form and send email
app.post('/make-server-45a44eb5/booking/submit', async (c) => {
  try {
    const bookingData = await c.req.json();
    
    // Generate ID
    const id = Date.now().toString();
    
    // Add metadata
    const bookingSubmission = {
      ...bookingData,
      id,
      created_at: new Date().toISOString(),
      status: 'new', // new, contacted, completed
    };

    // Save to KV store
    await kv.set(`booking_${id}`, JSON.stringify(bookingSubmission));

    // Send email notification to admin
    try {
      // Get admin email from environment or use default
      const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'ibrahim.abdullayev1@gmail.com';
      const resendApiKey = Deno.env.get('RESEND_API_KEY');

      if (resendApiKey) {
        // Prepare email content based on booking type
        let emailSubject = '';
        let emailContent = '';

        if (bookingData.type === 'flight') {
          const flightTypeText = bookingData.flightType === 'multi-city' ? 'Çoxşəhərli' : bookingData.flightType === 'one-way' ? 'Bir tərəfli' : 'Gediş-gəliş';
          emailSubject = `Yeni Uçuş Sifarişi - ${flightTypeText} - ${bookingData.from || 'Multi-city'} → ${bookingData.to || ''}`;
          
          let flightDetails = '';
          if (bookingData.flightType === 'multi-city' && bookingData.multiCitySegments) {
            flightDetails = '<h4>Uçuş Seqmentləri:</h4>';
            bookingData.multiCitySegments.forEach((seg, idx) => {
              flightDetails += `<p><strong>Seqment ${idx + 1}:</strong> ${seg.from} → ${seg.to} (${seg.date})</p>`;
            });
          } else {
            flightDetails = `
              <p><strong>Haradan:</strong> ${bookingData.from}</p>
              <p><strong>Hara:</strong> ${bookingData.to}</p>
              <p><strong>Getmə Tarixi:</strong> ${bookingData.departureDate}</p>
              ${bookingData.returnDate ? `<p><strong>Qayıdış Tarixi:</strong> ${bookingData.returnDate}</p>` : ''}
            `;
          }
          
          emailContent = `
            <h2>Yeni Uçuş Sifarişi Sorğusu</h2>
            <p><strong>Müştəri:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Telefon:</strong> ${bookingData.phone}</p>
            <hr>
            <h3>Uçuş Detalları:</h3>
            <p><strong>Uçuş Növü:</strong> ${flightTypeText}</p>
            ${flightDetails}
            <p><strong>Böyüklər:</strong> ${bookingData.adults}</p>
            ${bookingData.children !== '0' ? `<p><strong>Uşaqlar (2-11):</strong> ${bookingData.children}</p>` : ''}
            ${bookingData.infants !== '0' ? `<p><strong>Körpələr (0-2):</strong> ${bookingData.infants}</p>` : ''}
            <p><strong>Sinif:</strong> ${bookingData.class}</p>
            ${bookingData.extraBaggage === 'yes' ? '<p><strong>Əlavə Baqaj:</strong> Bəli</p>' : ''}
            ${bookingData.seatPreference ? `<p><strong>Oturacaq Seçimi:</strong> ${bookingData.seatPreference}</p>` : ''}
            ${bookingData.mealPreference ? `<p><strong>Yemək Tərcihləri:</strong> ${bookingData.mealPreference}</p>` : ''}
            ${bookingData.additionalInfo ? `<p><strong>Əlavə Məlumat:</strong> ${bookingData.additionalInfo}</p>` : ''}
            <hr>
            <p><em>Göndərilmə tarixi: ${new Date().toLocaleString('az-AZ')}</em></p>
          `;
        } else if (bookingData.type === 'hotel') {
          emailSubject = `Yeni Otel Sifarişi - ${bookingData.destination || 'Çoxlu İstiqamət'}`;
          
          let hotelDetails = '';
          if (bookingData.hotelType === 'multiple' && bookingData.multipleDestinations) {
            hotelDetails = '<h4>Otel İstiqamətləri:</h4>';
            bookingData.multipleDestinations.forEach((dest, idx) => {
              hotelDetails += `<p><strong>${idx + 1}. ${dest.city}:</strong> ${dest.checkIn} → ${dest.checkOut}</p>`;
            });
          } else {
            hotelDetails = `
              <p><strong>İstiqamət:</strong> ${bookingData.destination}</p>
              <p><strong>Giriş:</strong> ${bookingData.checkIn}</p>
              <p><strong>Çıxış:</strong> ${bookingData.checkOut}</p>
            `;
          }
          
          emailContent = `
            <h2>Yeni Otel Sifarişi Sorğusu</h2>
            <p><strong>Müştəri:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Telefon:</strong> ${bookingData.phone}</p>
            <hr>
            <h3>Otel Detalları:</h3>
            ${hotelDetails}
            <p><strong>Otaqlar:</strong> ${bookingData.rooms}</p>
            <p><strong>Qonaqlar:</strong> ${bookingData.guests}</p>
            <p><strong>Otaq Növü:</strong> ${bookingData.roomType}</p>
            <p><strong>Qidalanma Planı:</strong> ${bookingData.mealPlan}</p>
            ${bookingData.specialRequests ? `<p><strong>Xüsusi Tələblər:</strong> ${bookingData.specialRequests}</p>` : ''}
            ${bookingData.additionalInfo ? `<p><strong>Əlavə Məlumat:</strong> ${bookingData.additionalInfo}</p>` : ''}
            <hr>
            <p><em>Göndərilmə tarixi: ${new Date().toLocaleString('az-AZ')}</em></p>
          `;
        } else if (bookingData.type === 'insurance') {
          emailSubject = `Yeni Sığorta Sorğusu - ${bookingData.insuranceType} - ${bookingData.insurancePackage}`;
          emailContent = `
            <h2>Yeni Sığorta Sorğusu</h2>
            <p><strong>Müştəri:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Telefon:</strong> ${bookingData.phone}</p>
            <hr>
            <h3>Sığorta Detalları:</h3>
            <p><strong>Növ:</strong> ${bookingData.insuranceType}</p>
            <p><strong>Paket:</strong> ${bookingData.insurancePackage}</p>
            <p><strong>Əhatə Məbləği:</strong> €${bookingData.coverageAmount}</p>
            <p><strong>Səyahətçi sayı:</strong> ${bookingData.travelers}</p>
            <p><strong>İstiqamət:</strong> ${bookingData.destination}</p>
            <p><strong>Səyahət Müddəti:</strong> ${bookingData.travelDates}</p>
            <h4>Əlavə Əhatələr:</h4>
            <p><strong>Ekstremal İdman:</strong> ${bookingData.adventureSports === 'yes' ? 'Bəli' : 'Xeyr'}</p>
            <p><strong>COVID Əhatəsi:</strong> ${bookingData.covidCoverage === 'yes' ? 'Bəli' : 'Xeyr'}</p>
            <p><strong>Ləğvetmə Əhatəsi:</strong> ${bookingData.cancellationCoverage === 'yes' ? 'Bəli' : 'Xeyr'}</p>
            ${bookingData.additionalInfo ? `<p><strong>Əlavə Məlumat:</strong> ${bookingData.additionalInfo}</p>` : ''}
            <hr>
            <p><em>Göndərilmə tarixi: ${new Date().toLocaleString('az-AZ')}</em></p>
          `;
        } else if (bookingData.type === 'embassy') {
          const urgencyText = bookingData.urgencyLevel === 'normal' ? 'Normal' : bookingData.urgencyLevel === 'urgent' ? 'Təcili' : 'Ekspress';
          emailSubject = `Yeni Səfirlik Rezervasiya Sorğusu - ${bookingData.embassyCountry} - ${urgencyText}`;
          emailContent = `
            <h2>Yeni Səfirlik üçün Rezervasiya Sorğusu</h2>
            <p><strong>Müştəri:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Telefon:</strong> ${bookingData.phone}</p>
            <hr>
            <h3>Səfirlik Rezervasiya Detalları:</h3>
            <p><strong>Rezervasiya Növü:</strong> ${bookingData.embassyType === 'multiple' ? 'Çoxlu Ölkə (Schengen)' : 'Tək Ölkə'}</p>
            <p><strong>Səfirlik Ölkəsi:</strong> ${bookingData.embassyCountry}</p>
            ${bookingData.additionalCountries ? `<p><strong>Digər Ölkələr:</strong> ${bookingData.additionalCountries}</p>` : ''}
            <p><strong>Tələb olunan Xidmətlər:</strong> ${bookingData.requiredServices}</p>
            <p><strong>Səyahət Müddəti:</strong> ${bookingData.travelPeriod}</p>
            <p><strong>Təcililik Səviyyəsi:</strong> ${urgencyText}</p>
            <p><strong>Sənəd Hazırlanması:</strong> ${bookingData.documentPrep === 'yes' ? 'Bəli' : 'Xeyr'}</p>
            <p><strong>Viza Müsahibəsi Hazırlığı:</strong> ${bookingData.visaInterview === 'yes' ? 'Bəli' : 'Xeyr'}</p>
            ${bookingData.additionalInfo ? `<p><strong>Əlavə Məlumat:</strong> ${bookingData.additionalInfo}</p>` : ''}
            <hr>
            <p><em>Göndərilmə tarixi: ${new Date().toLocaleString('az-AZ')}</em></p>
          `;
        }

        // Send email via Resend API
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: adminEmail,
            reply_to: bookingData.email,
            subject: emailSubject,
            html: emailContent,
          }),
        });

        const emailResult = await emailResponse.json();
        
        if (!emailResponse.ok) {
          // Log detailed error for debugging
          console.error('[Email] Göndərmə uğursuz oldu:', emailResult);
          // Don't fail the request if email fails, just log it
        } else {
          console.log('[Email] Uğurla göndərildi:', adminEmail);
        }
      } else {
        console.log('[Email] RESEND_API_KEY konfiqurasiya olunmayıb. Booking qeydə alındı.');
      }
    } catch (emailError) {
      // Silently catch email errors - don't log verbose error details
      console.log('[Email] Xəta baş verdi. Booking qeydə alındı.');
      // Don't fail the request if email fails
    }

    return c.json({ 
      success: true, 
      message: 'Sorğu qəbul edildi',
      id 
    });
  } catch (error) {
    console.error('Booking submission error:', error);
    return c.json({ error: 'Sorğu göndərilərkən xəta baş verdi' }, 500);
  }
});

// Get all booking submissions (requires auth)
app.get('/make-server-45a44eb5/booking/submissions', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const submissions = await kv.getByPrefix('booking_');
    
    // Sort by date (newest first)
    const sortedSubmissions = submissions
      .map(s => JSON.parse(s))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return c.json({ submissions: sortedSubmissions });
  } catch (error) {
    console.error('Error fetching booking submissions:', error);
    return c.json({ error: 'Sorğular yüklənərkən xəta baş verdi' }, 500);
  }
});

// Update booking submission status (requires auth)
app.put('/make-server-45a44eb5/booking/submissions/:id', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const id = c.req.param('id');
    const { status } = await c.req.json();

    // Get existing submission
    const existing = await kv.get(`booking_${id}`);
    
    if (!existing) {
      return c.json({ error: 'Sorğu tapılmadı' }, 404);
    }

    const submission = JSON.parse(existing);
    submission.status = status;
    submission.updated_at = new Date().toISOString();

    // Save to KV store
    await kv.set(`booking_${id}`, JSON.stringify(submission));

    return c.json({ 
      success: true, 
      message: 'Status yeniləndi',
      submission 
    });
  } catch (error) {
    console.error('Error updating booking submission:', error);
    return c.json({ error: 'Status yenilənərkən xəta baş verdi' }, 500);
  }
});

// Delete booking submission (requires auth)
app.delete('/make-server-45a44eb5/booking/submissions/:id', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`booking_${id}`);

    return c.json({ 
      success: true, 
      message: 'Sorğu silindi' 
    });
  } catch (error) {
    console.error('Error deleting booking submission:', error);
    return c.json({ error: 'Sorğu silinərkən xəta baş verdi' }, 500);
  }
});

// ============================================
// QUICK CONTACT (EMAIL/PHONE CAPTURE)
// ============================================

// Submit quick contact info from Hero section
app.post('/make-server-45a44eb5/quick-contact/submit', async (c) => {
  try {
    const { email, phone } = await c.req.json();
    
    // Validate at least one field
    if (!email && !phone) {
      return c.json({ error: 'Email və ya telefon nömrəsi tələb olunur' }, 400);
    }
    
    // Generate ID
    const id = Date.now().toString();
    
    // Create submission
    const quickContact = {
      id,
      email: email || null,
      phone: phone || null,
      created_at: new Date().toISOString(),
      status: 'new', // new, contacted
      source: 'hero_quick_contact',
    };

    // Save to KV store
    await kv.set(`quick_contact_${id}`, JSON.stringify(quickContact));

    // Send email notification to admin
    try {
      const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'ibrahim.abdullayev1@gmail.com';
      const resendApiKey = Deno.env.get('RESEND_API_KEY');

      if (resendApiKey) {
        const emailContent = `
          <h2>Yeni Tez Əlaqə Sorğusu</h2>
          <p>Ana səhifədən yeni əlaqə məlumatı alındı:</p>
          <hr>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
          <hr>
          <p><em>Göndərilmə tarixi: ${new Date().toLocaleString('az-AZ')}</em></p>
        `;

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'noreply@ibrahimabdullayev.com',
            to: adminEmail,
            subject: `Yeni Tez Əlaqə - ${email || phone}`,
            html: emailContent,
          }),
        });

        if (!emailResponse.ok) {
          console.log('[Quick Contact Email] Göndərmə uğursuz oldu. Məlumat qeydə alındı.');
        } else {
          console.log('[Quick Contact Email] Uğurla göndərildi:', adminEmail);
        }
      } else {
        console.log('[Quick Contact Email] RESEND_API_KEY konfiqurasiya olunmayıb.');
      }
    } catch (emailError) {
      console.log('[Quick Contact Email] Xəta baş verdi. Məlumat qeydə alındı.');
    }

    return c.json({ 
      success: true, 
      message: 'Məlumatınız qəbul edildi! Tezliklə əlaqə saxlayacağıq.' 
    });
  } catch (error) {
    console.error('Quick contact submission error:', error);
    return c.json({ error: 'Məlumat göndərilərkən xəta baş verdi' }, 500);
  }
});

// Get all quick contact submissions (requires auth)
app.get('/make-server-45a44eb5/quick-contact/submissions', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const submissions = await kv.getByPrefix('quick_contact_');
    
    // Sort by date (newest first)
    const sortedSubmissions = submissions
      .map(s => JSON.parse(s))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return c.json({ submissions: sortedSubmissions });
  } catch (error) {
    console.error('Error fetching quick contact submissions:', error);
    return c.json({ error: 'Məlumatlar yüklənərkən xəta baş verdi' }, 500);
  }
});

// Update quick contact status (requires auth)
app.put('/make-server-45a44eb5/quick-contact/submissions/:id', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const id = c.req.param('id');
    const { status } = await c.req.json();

    const existing = await kv.get(`quick_contact_${id}`);
    
    if (!existing) {
      return c.json({ error: 'Məlumat tapılmadı' }, 404);
    }

    const submission = JSON.parse(existing);
    submission.status = status;
    submission.updated_at = new Date().toISOString();

    await kv.set(`quick_contact_${id}`, JSON.stringify(submission));

    return c.json({ 
      success: true, 
      message: 'Status yeniləndi',
      submission 
    });
  } catch (error) {
    console.error('Error updating quick contact:', error);
    return c.json({ error: 'Status yenilənərkən xəta baş verdi' }, 500);
  }
});

// Delete quick contact submission (requires auth)
app.delete('/make-server-45a44eb5/quick-contact/submissions/:id', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`quick_contact_${id}`);

    return c.json({ 
      success: true, 
      message: 'Məlumat silindi' 
    });
  } catch (error) {
    console.error('Error deleting quick contact:', error);
    return c.json({ error: 'Məlumat silinərkən xəta baş verdi' }, 500);
  }
});

// ============================================
// SITE CONTENT MANAGEMENT
// ============================================

// Get site content
app.get('/make-server-45a44eb5/content', async (c) => {
  try {
    const content = await kv.get('site_content');
    
    if (!content) {
      return c.json({ content: null });
    }

    return c.json({ content: JSON.parse(content) });
  } catch (error) {
    console.error('Error fetching site content:', error);
    return c.json({ error: 'Məzmun yüklənərkən xəta baş verdi' }, 500);
  }
});

// Update site content (requires auth)
app.put('/make-server-45a44eb5/content', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Icazə verilmədi' }, 401);
    }

    const content = await c.req.json();

    // Save to KV store
    await kv.set('site_content', JSON.stringify(content));

    return c.json({ 
      success: true, 
      message: 'Məzmun yeniləndi',
      content 
    });
  } catch (error) {
    console.error('Error updating site content:', error);
    return c.json({ error: 'Məzmun yenilənərkən xəta baş verdi' }, 500);
  }
});

// Start server
Deno.serve(app.fetch);