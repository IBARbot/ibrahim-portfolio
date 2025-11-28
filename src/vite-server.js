// Mock Local Development Server for Booking Submissions
// This runs alongside Vite dev server to handle booking requests locally

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock booking submission endpoint
app.post('/make-server-45a44eb5/booking/submit', async (req, res) => {
  console.log('\n📧 ===== YENİ BOOKING SORĞUSU =====');
  console.log('📅 Tarix:', new Date().toLocaleString('az-AZ'));
  console.log('📋 Type:', req.body.type);
  console.log('👤 Ad:', req.body.name);
  console.log('📧 Email:', req.body.email);
  console.log('📱 Telefon:', req.body.phone);
  console.log('📝 Məlumat:', JSON.stringify(req.body, null, 2));
  console.log('===================================\n');

  // Simulate successful booking
  res.json({
    success: true,
    message: 'Sorğu qəbul edildi (LOCAL MOCK)',
    id: 'local_' + Date.now(),
    note: '⚠️ Bu lokal development test-dir. Production-da Supabase Edge Function işləyəcək.'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock Booking Server: http://localhost:${PORT}`);
  console.log('✅ Booking requests bu server-ə yönələcək (local dev)');
});
