import { useEffect, useRef } from 'react';
import { QuestProgressBarProps } from '../../hero/model/types';

export function QuestProgressBar({ quest }: QuestProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const passed = Date.now() - quest.startedAt;

    //width нельзя использовать, ибо он вызывает пересчёт геометрии (на проце), поэтому просто тыкаю кейфреймы и от них играю (всё на гпу)
    const animation = barRef.current.animate(
      [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
      {
        duration: quest.duration * 1000,
        delay: -passed,
        fill: 'forwards',
        easing: 'linear',
      },
    );

    //я забыл чистить память от зомби-анимаций, чтобы не допускать утечку памяти. НЕ ЗАБЫВАТЬ
    return () => {
      animation.cancel();
    };
  }, [quest.startedAt, quest.duration]);

  return (
    <div className="relative mt-4 h-3 w-full overflow-hidden rounded-full border border-slate-700 bg-slate-800 shadow-inner">
      <div ref={barRef} className="absolute inset-0 h-full w-full origin-left bg-violet-500">
        <div className="absolute top-0 right-0 bottom-0 w-10 bg-linear-to-r from-transparent to-white/30"></div>
      </div>
    </div>
  );
}
