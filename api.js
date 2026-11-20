// ==========================================
// محرك الاتصال الموحد بـ API المنصة
// ==========================================
const API_URL = "https://script.google.com/macros/s/AKfycbxJ8xajoGb4xhPSQUyZRtgqaDnbr1z-Vf23FlfTINObhXt0E2yvtOQrmcsgPEaIKpPM6A/exec";

// دالة جلب البيانات (GET)
async function apiGet(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.append('action', action);
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  }
  const response = await fetch(url.toString());
  return await response.json();
}

// دالة الإرسال والحفظ والتعديل (POST)
async function apiPost(action, bodyData = {}) {
  const payload = { action: action, ...bodyData };
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
  return await response.json();
}

// تشغيل نغمة النقر التفاعلية
function playClickSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch(e) {}
}
