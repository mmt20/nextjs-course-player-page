import { LeaderboardEntry, messageType, studentLevel } from "./types";
export const motivationalMessages = {
  beginner: [
    {
      text: "تمام يا صديقي.. أنت بتبدأ صح قوي.. استمر بالمجهود ده وشوف نفسك هتتطور إزاي.. أنا معاك",
      emoji: "🚀",
      type: "encouragement",
    },
    {
      text: "كويس جداً.. أول مرة تقعد بتتعلم وتركز كده.. الاستمرار هو المهم.. روح جرب التمارين التانية",
      emoji: "💪",
      type: "encouragement",
    },
    {
      text: "حلو يا معلم.. أنت بتفهم الأساسيات صح.. كمّل بالسرعة دي وهتبقى محترف بسرعة",
      emoji: "✅",
      type: "encouragement",
    },

    {
      text: "متستسلمش خالص يا معلم.. أنت على الطريق الصح.. كل يوم بتتعلم حاجة جديدة بتقربك من النجاح",
      emoji: "🔥",
      type: "motivation",
    },
    {
      text: "المجهود اللي بتبذله ده مهم جداً.. أنت بتبني أساس قوي.. استمر متخلشش عن الكورس",
      emoji: "💎",
      type: "motivation",
    },
    {
      text: "كل الناس اللي احترفوا في المجال ده بدأوا من هنا.. أنت في الطريق الصح يا صديقي",
      emoji: "🎯",
      type: "motivation",
    },

    { text: "تمام.. بس ماتنسش إن المتابعة مهمة.. يوم إجازة ويوم مذاكرة مش هيخليك تتقدم", emoji: "⚡", type: "push" },
    {
      text: "أداؤك حلو.. لكن أنت قادر على أحسن من كده.. بالتركيز والممارسة هتوصل لمستوى أعلى",
      emoji: "📈",
      type: "push",
    },
  ],

  intermediate: [
    {
      text: "عظيم يا صديقي.. أداؤك في الكورس ده أفضل من 60% من باقي الطلبة.. كمّل عايز أشوف اسمك في الليدر بورد هنا",
      emoji: "🌟",
      type: "encouragement",
    },
    {
      text: "شايف الأداء الكويس ده؟ أنت قارب تحترف.. استمر في الزخم ده واتوقع إنك هتوصل أعلى من كده",
      emoji: "🎯",
      type: "encouragement",
    },
    {
      text: "أداء ممتاز يا معلم.. أنت بتقترب من مستوى الاحترافية.. المتابعة دي من عندك براهة يا غالي",
      emoji: "🏆",
      type: "encouragement",
    },

    {
      text: "أنت الآن في مرحلة حرجة.. الفرق بينك وبين الأفضل قليل جداً.. استمر بالعزيمة دي وهتتجاوزهم",
      emoji: "⚔️",
      type: "motivation",
    },
    {
      text: "البعض بيسعى للمتوسط.. أنت لا.. أنت شايف نفسك على قمة الجدول.. كمّل بالإيمان ده",
      emoji: "👑",
      type: "motivation",
    },
    { text: "أداك تغير.. الناس بتشوف إنك جد.. بس باقي كام خطوة وتبقى من الأوائل", emoji: "🚀", type: "motivation" },

    { text: "أنت تستاهل أحسن من 60%.. لماذا ما بتطلع 80% أو أكتر؟ أنت قادر يا معلم", emoji: "💪", type: "push" },
    { text: "في ناس فوقك في الترتيب.. بتفكر إنك هتوصلهم؟ أم بس بتقول كلام ولا تشتغل؟", emoji: "🔥", type: "push" },
    {
      text: "المرحلة دي بتحتاج تركيز أكتر.. اللي بيسيب المجهود هنا بيرجع ورا كتير.. متكونش من اللي بيسيبوا",
      emoji: "⚠️",
      type: "push",
    },
  ],

  advanced: [
    {
      text: "خطير يا معلم.. أنت بتقود من الطلبة الأوائل.. الناس بتشوف أدائك وتتعلم منك.. كمّل كده",
      emoji: "👑",
      type: "encouragement",
    },
    {
      text: "نجم والله.. أداك استثنائي وفوق التوقعات.. أنت بتشتغل على نفسك وشايفين الناس الفرق",
      emoji: "⭐",
      type: "encouragement",
    },
    {
      text: "برافو يا معلم.. وصلت لمستوى احترافي فشخ.. فخور بيك جداً.. استمر تشتغل بالطريقة دي",
      emoji: "🎖️",
      type: "encouragement",
    },

    {
      text: "أنت الآن يا معلم في مرحلة تاني.. مش بس تتعلم.. أنت بتصير قدوة.. بلاش تفقدها",
      emoji: "💎",
      type: "motivation",
    },
    {
      text: "الخطوة الجاية للاحتراف الحقيقي.. تشتغل على الناس تانية وتعلمهم.. أنت خلصت اللي عندك؟",
      emoji: "🌟",
      type: "motivation",
    },
    {
      text: "المستوى اللي وصلت له بيقول على شخصيتك.. استمر بالنفس الاحترام لنفسك ولمجهودك",
      emoji: "🏅",
      type: "motivation",
    },

    {
      text: "أنت الأول في الفئة ده.. لماذا ما بتخليش اللي ورايك يحسوا إن الأول صعب الوصول؟ شد شوية أكتر",
      emoji: "⚡",
      type: "push",
    },
    {
      text: "المستوى الحالي كويس.. بس في ناس بينسوا إنهم بدأوا من الصفر زيك.. أنت متستكفي بالإنجاز دا",
      emoji: "🔥",
      type: "push",
    },
    {
      text: "بلاش تريح نفسك.. الناس اللي بتراقبك بتقول إنك وصلت لسقف معين.. نسيت إنك بتقدر تطير أعلى؟",
      emoji: "⚔️",
      type: "push",
    },
  ],
};
// Mock leaderboard data
export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Ahmed Hassan", score: 950, level: "Advanced", avatar: "https://avatar.iran.liara.run/public/1" },
  { rank: 2, name: "Fatima Ali", score: 920, level: "Advanced", avatar: "https://avatar.iran.liara.run/public/2" },
  {
    rank: 3,
    name: "Mohammed Karim",
    score: 890,
    level: "Intermediate",
    avatar: "https://avatar.iran.liara.run/public/3",
  },
  { rank: 4, name: "Layla Omar", score: 850, level: "Intermediate", avatar: "https://avatar.iran.liara.run/public/4" },
  { rank: 5, name: "You", score: 780, level: "Intermediate", avatar: "https://avatar.iran.liara.run/public/5" },
  { rank: 6, name: "Zainab Noor", score: 750, level: "Beginner", avatar: "https://avatar.iran.liara.run/public/6" },
  { rank: 7, name: "Khalid Samir", score: 720, level: "Beginner", avatar: "https://avatar.iran.liara.run/public/7" },
  { rank: 8, name: "Hana Rashid", score: 680, level: "Beginner", avatar: "https://avatar.iran.liara.run/public/8" },
];

export function getMotivationalMessage(level: studentLevel, type?: messageType) {
  const messages = motivationalMessages[level];

  let filtered = messages;
  if (type) {
    filtered = messages.filter((m) => m.type === type);
  }

  return filtered[Math.floor(Math.random() * filtered.length)];
}
export function getMessagesByType(
  level: "beginner" | "intermediate" | "advanced",
  type: "encouragement" | "motivation" | "push"
) {
  return motivationalMessages[level].filter((m) => m.type === type);
}
