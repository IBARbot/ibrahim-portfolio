import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// ============================================
// TYPES
// ============================================

interface ContactData {
  type: 'contact' | 'flight' | 'hotel' | 'insurance' | 'embassy';
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  [key: string]: any;
}

interface EmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

interface SheetsResult {
  success: boolean;
  message?: string;
}

// ============================================
// CONSTANTS
// ============================================

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxLJXTHny5JD3bEqX_qOcFgmt4RH37gRBKkRf3JeygoB4NU503_ey4ETloK3nS8sHETaA/exec';
const RESEND_API_URL = 'https://api.resend.com/emails';
const ADMIN_EMAIL = 'ibrahim.abdullayev1@gmail.com';
const RESEND_API_KEY = 're_ct7ef3AG_N5uVpggnDXVtSrBKtM8ziEXE';

// ============================================
// UTILITY FUNCTIONS
// ============================================

function escapeHtml(text: string | undefined | null): string {
  if (!text) return '—';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(): string {
  return new Date().toLocaleString('az-AZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long'
  });
}

function cleanPhoneNumber(phone: string | undefined): string {
  if (!phone) return '';
  return phone.replace(/[^0-9]/g, '');
}

// ============================================
// EMAIL TEMPLATES
// ============================================

function createContactEmailTemplate(data: ContactData): string {
  const currentDate = formatDate();
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone);
  const message = escapeHtml(data.message);
  const phoneClean = cleanPhoneNumber(data.phone);
  const hasPhone = !!data.phone && phoneClean.length > 0;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #f1f5f9;">
  <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">📧 Yeni Əlaqə Sorğusu</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Portfolio Website-dən gələn yeni mesaj</p>
    </div>
    <div style="padding: 30px;">
      <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #0d9488;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #475569; width: 35%;">👤 Ad:</td><td style="padding: 8px 0; color: #1e293b; font-size: 16px;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">📧 Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0d9488; text-decoration: none; font-size: 16px;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">📱 Telefon:</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #0d9488; text-decoration: none; font-size: 16px;">${phone}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">📅 Tarix:</td><td style="padding: 8px 0; color: #1e293b; font-size: 16px;">${currentDate}</td></tr>
        </table>
      </div>
      <div style="background: #fef3c7; border-radius: 8px; padding: 20px; border-left: 4px solid #f59e0b;">
        <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 18px;">💬 Mesaj:</h3>
        <div style="background: white; padding: 15px; border-radius: 6px; color: #1e293b; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${message}</div>
      </div>
      <div style="margin-top: 25px; text-align: center;">
        <a href="mailto:${email}" style="display: inline-block; background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">✉️ Email-ə Cavab Ver</a>
        ${hasPhone ? `<a href="https://wa.me/${phoneClean}" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">💬 WhatsApp</a>` : ''}
      </div>
    </div>
    <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; color: #64748b; font-size: 12px;">Bu email Portfolio Website-dən avtomatik göndərilmişdir.<br><strong>${ADMIN_EMAIL}</strong></p>
    </div>
  </div>
</body>
</html>`;
}

function createBookingEmailTemplate(data: ContactData): string {
  const currentDate = formatDate();
  const type = escapeHtml(data.type || 'Unknown');
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone);
  const phoneClean = cleanPhoneNumber(data.phone);
  const hasPhone = !!data.phone && phoneClean.length > 0;
  const detailsJson = JSON.stringify(data, null, 2);
  const detailsEscaped = escapeHtml(detailsJson);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #f1f5f9;">
  <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">✈️ Yeni Rezervasiya Sorğusu</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">${type} - Portfolio Website</p>
    </div>
    <div style="padding: 30px;">
      <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #0d9488;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #475569; width: 35%;">📋 Tip:</td><td style="padding: 8px 0; color: #1e293b; font-size: 16px; text-transform: capitalize;">${type}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">👤 Ad:</td><td style="padding: 8px 0; color: #1e293b; font-size: 16px;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">📧 Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0d9488; text-decoration: none; font-size: 16px;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">📱 Telefon:</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #0d9488; text-decoration: none; font-size: 16px;">${phone}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">📅 Tarix:</td><td style="padding: 8px 0; color: #1e293b; font-size: 16px;">${currentDate}</td></tr>
        </table>
      </div>
      <div style="background: #fef3c7; border-radius: 8px; padding: 20px; border-left: 4px solid #f59e0b;">
        <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 18px;">📋 Ətraflı Məlumat:</h3>
        <div style="background: white; padding: 15px; border-radius: 6px; color: #1e293b; line-height: 1.6; font-size: 13px; font-family: 'Courier New', monospace; overflow-x: auto;">
          <pre style="margin: 0; white-space: pre-wrap; word-wrap: break-word;">${detailsEscaped}</pre>
        </div>
      </div>
      <div style="margin-top: 25px; text-align: center;">
        <a href="mailto:${email}" style="display: inline-block; background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">✉️ Email-ə Cavab Ver</a>
        ${hasPhone ? `<a href="https://wa.me/${phoneClean}" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">💬 WhatsApp</a>` : ''}
      </div>
    </div>
    <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; color: #64748b; font-size: 12px;">Bu email Portfolio Website-dən avtomatik göndərilmişdir.<br><strong>${ADMIN_EMAIL}</strong></p>
    </div>
  </div>
</body>
</html>`;
}

// ============================================
// EMAIL SERVICE
// ============================================

async function sendEmail(data: ContactData): Promise<EmailResult> {
  try {
    const isContact = data.type === 'contact';
    const emailSubject = isContact 
      ? '🔔 Yeni Əlaqə Sorğusu - Portfolio Website'
      : `🔔 Yeni Rezervasiya Sorğusu - ${data.type || 'Unknown'}`;
    
    const emailBody = isContact 
      ? createContactEmailTemplate(data)
      : createBookingEmailTemplate(data);

    const resendResponse = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: ADMIN_EMAIL,
        to: ADMIN_EMAIL,
        subject: emailSubject,
        html: emailBody,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      const errorMessage = resendData.message || resendData.error?.message || 'Email göndərilmədi';
      console.error('❌ Resend API Error:', { status: resendResponse.status, error: resendData });
      return { 
        success: false, 
        error: `${errorMessage} (Status: ${resendResponse.status})` 
      };
    }

    console.log('✅ Email uğurla göndərildi! ID:', resendData.id);
    return { success: true, id: resendData.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown email error';
    console.error('❌ Email göndərmə xətası:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

// ============================================
// GOOGLE SHEETS SERVICE
// ============================================

async function sendToGoogleSheets(data: ContactData): Promise<SheetsResult> {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      redirect: 'follow',
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      console.error('⚠️ Google Sheets Error:', { status: response.status, text: responseText });
      return { success: false };
    }

    try {
      const parsed = JSON.parse(responseText);
      console.log('✅ Google Sheets Response:', parsed);
      return { success: true, message: parsed.message || 'Saved' };
    } catch {
      console.log('✅ Google Sheets Response (text):', responseText);
      return { success: true, message: responseText };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('⚠️ Google Sheets xətası:', errorMessage);
    return { success: false };
  }
}

// ============================================
// CORS HEADERS
// ============================================

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

// ============================================
// MAIN HANDLER
// ============================================

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data: ContactData = JSON.parse(event.body || '{}');
    console.log('📨 Processing request:', data.type || 'contact');

    // Parallel execution: Email və Google Sheets eyni vaxtda göndər
    const [emailResult, sheetsResult] = await Promise.allSettled([
      sendEmail(data),
      sendToGoogleSheets(data),
    ]);

    const email = emailResult.status === 'fulfilled' ? emailResult.value : { success: false, error: 'Email function failed' };
    const sheets = sheetsResult.status === 'fulfilled' ? sheetsResult.value : { success: false };

    // Əgər heç biri işləməyibsə, error qaytar
    if (!email.success && !sheets.success) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Nə email, nə də Google Sheets-ə göndərilmədi',
          emailError: email.error,
        }),
      };
    }

    // Response message
    const responseMessage = email.success 
      ? 'Sorğu uğurla göndərildi və email göndərildi' 
      : sheets.success 
        ? 'Sorğu Google Sheets-ə yazıldı, amma email göndərilmədi' 
        : 'Sorğu göndərildi';

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: responseMessage,
        emailSent: email.success,
        sheetsSaved: sheets.success,
        emailId: email.id,
        emailError: email.error || null,
      }),
    };
  } catch (error) {
    console.error('❌ Handler Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

export { handler };

