import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { Subtitles } from "./Subtitles";
import {
  ACCENT_COLOR,
  BACKGROUND_CSS,
  FONT_FAMILY,
  HINT_COLOR,
  TITLE_TEXT,
} from "./config";

export type HelloWorldProps = {
  readonly titleText: string;
  readonly titleColor: string;
};

// Композиция интро для YouTube-роликов.
// Заголовок и цвет по умолчанию берутся из src/config.ts,
// но остаются пропсами — их можно переопределить при рендере.
export const HelloWorld: React.FC<HelloWorldProps> = ({
  titleText = TITLE_TEXT,
  titleColor = "#ffffff",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  return (
    // Тёмный градиентный фон вместо белого (константы — в src/config.ts)
    <AbsoluteFill
      style={{
        background: BACKGROUND_CSS,
      }}
    >
      <Interactive.Div
        name="Content fade"
        premountFor={fps}
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(
            frame,
            [durationInFrames - 25, durationInFrames - 15],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      >
        <Logo
          name="Remotion logo"
          premountFor={fps}
          logoColor1="#91EAE4"
          logoColor2="#86A8E7"
          style={{
            translate: interpolate(frame, [25, 55], ["0px 0px", "0px -150px"], {
              easing: Easing.spring({ damping: 100 }),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Title
          name="Welcome title"
          from={35}
          premountFor={fps}
          titleText={titleText}
          titleColor={titleColor}
        />
        {/* Субтитры: строка выезжает снизу через spring() с 15-го кадра */}
        <Subtitles text={TITLE_TEXT} />
        <Interactive.Div
          name="Editing hint"
          from={75}
          premountFor={fps}
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            textAlign: "center",
            position: "absolute",
            bottom: 260,
            width: "100%",
            color: HINT_COLOR,
            opacity: interpolate(frame, [75, 105], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Edit <code style={{ color: ACCENT_COLOR }}>src/Root.tsx</code> and save to reload.
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
