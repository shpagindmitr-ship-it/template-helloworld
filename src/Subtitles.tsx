import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  FONT_FAMILY,
  SUBTITLE_BACKGROUND,
  SUBTITLE_COLOR,
  TIMING,
} from "./config";

type SubtitlesProps = {
  // Текст строки субтитров
  readonly text: string;
  // Кадр, с которого строка начинает выезжать (по умолчанию из config.ts)
  readonly from?: number;
};

// Компонент субтитров: строка выезжает снизу через spring()
export const Subtitles: React.FC<SubtitlesProps> = ({
  text,
  from = TIMING.subtitlesStart,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Пружинная анимация появления (без ручных таймеров)
  const enter = spring({
    frame: frame - from,
    fps,
    config: {
      damping: 200, // почти без отскока
      stiffness: 100,
    },
    durationInFrames: TIMING.subtitlesDuration,
  });

  // Смещение: снизу за пределы экрана (80px) в конечную позицию
  const translateY = interpolate(enter, [0, 1], [80, 0]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        // Полупрозрачная подложка под текст
        opacity: enter,
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 56,
          fontWeight: 600,
          color: SUBTITLE_COLOR,
          backgroundColor: SUBTITLE_BACKGROUND,
          padding: "16px 36px",
          borderRadius: 16,
          textAlign: "center",
          transform: `translateY(${translateY}px)`,
        }}
      >
        {text}
      </span>
    </div>
  );
};
