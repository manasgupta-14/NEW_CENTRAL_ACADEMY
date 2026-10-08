// Small helpers shared by every Study Point tool (audio files + browser speech).
const BASE = import.meta.env.BASE_URL;

// studyAsset("english/img/apple.png") -> "/study/english/img/apple.png"
export const studyAsset = (path) => `${BASE}study/${path}`;

let currentAudio = null;

export function stopSounds() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

// Plays an mp3 from /public/study. Only one sound plays at a time.
export function playSound(path) {
  stopSounds();
  currentAudio = new Audio(studyAsset(path));
  return currentAudio.play().catch(() => {});
}

// Reads text aloud with the browser voice. lang: "en-US" | "en-IN" | "hi-IN".
export function speak(text, { lang = "en-US", rate = 0.85, pitch = 1.05, onEnd } = {}) {
  if (!("speechSynthesis" in window)) return;
  stopSounds();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  u.pitch = pitch;
  if (onEnd) u.onend = onEnd;
  window.speechSynthesis.speak(u);
}

const ONES = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const TENS = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];

// 0-100 -> "forty-two"
export function numberToWords(n) {
  if (n < 20) return ONES[n];
  if (n === 100) return "one hundred";
  const t = TENS[Math.floor(n / 10)];
  return n % 10 ? `${t}-${ONES[n % 10]}` : t;
}
