"use client";

import NeonButton from "./NeonButton";

interface IslandUIProps {
  isVisible: boolean;
}

/**
 * 섬에 도착했을 때 표시되는 UI 컴포넌트
 *
 * 위치: 화면 중앙
 * 구성: 4개의 버튼을 배치할 수 있는 그리드 레이아웃
 */
export const IslandUI = ({ isVisible }: IslandUIProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="pointer-events-auto bg-black/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col w-[500px]">
          <button className="w-full bg-slate-800 text-white font-semibold py-2 px-4 text-2xl">
            CREED
          </button>

          <NeonButton />
        </div>
      </div>
    </div>
  );
};
