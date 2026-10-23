// Конфигурация продакшена: цвета, шрифты и тайминги вынесены сюда
// согласно правилам проекта (QWEN.md, пункт 5).

// ── Цвета ────────────────────────────────────────────────────────────
// Тёмный градиент фона композиции HelloWorld
export const BACKGROUND_GRADIENT = {
  from: "#0d1117", // верх градиента — почти чёрный сине-серый
  to: "#1a2639", // низ градиента — тёмно-синий
  angle: "160deg", // направление градиента
} as const;

// Строка CSS для linear-gradient фона
export const BACKGROUND_CSS = `linear-gradient(${BACKGROUND_GRADIENT.angle}, ${BACKGROUND_GRADIENT.from}, ${BACKGROUND_GRADIENT.to})`;

// Цвет текста заголовка на тёмном фоне
export const TITLE_COLOR = "#ffffff";

// Цвет строки субтитров и её подложки
export const SUBTITLE_COLOR = "#e8edf4";
export const SUBTITLE_BACKGROUND = "rgba(0, 0, 0, 0.45)";

// Акцентный цвет (подсветка кода и т.п.)
export const ACCENT_COLOR = "#86A8E7";

// Приглушённый цвет вспомогательной подсказки на тёмном фоне
export const HINT_COLOR = "#cdd6e0";

// ── Шрифты ───────────────────────────────────────────────────────────
export const FONT_FAMILY = "SF Pro Text, Helvetica, Arial, sans-serif";

// ── Тексты ───────────────────────────────────────────────────────────
// Новый заголовок ролика
export const TITLE_TEXT = "Я делаю видео нейросетями";

// ── Тайминги (в кадрах при 30 fps) ──────────────────────────────────
export const TIMING = {
  // Субтитры: строка выезжает снизу начиная с 15-го кадра
  subtitlesStart: 15,
  // Длительность въезда субтитров (spring)
  subtitlesDuration: 30,
} as const;
