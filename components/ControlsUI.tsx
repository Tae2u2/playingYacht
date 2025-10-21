export const ControlsUI = () => {
  return (
    <div className="absolute top-4 left-4 bg-black/50 text-white p-4 rounded-lg z-10">
      <h3 className="font-bold mb-2">키보드 조작법</h3>
      <ul className="text-sm space-y-1">
        <li>W / ↓ : 전진</li>
        <li>S / ↑ : 후진</li>
        <li>A / → : 좌회전</li>
        <li>D / ← : 우회전</li>
        <li>Space : 상승</li>
        <li>Shift : 하강</li>
      </ul>
    </div>
  );
};
