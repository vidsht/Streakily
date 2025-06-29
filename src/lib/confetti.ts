
import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  // Fire confetti from multiple positions
  const end = Date.now() + 3 * 1000; // 3 seconds
  const colors = ['#a855f7', '#ec4899', '#f97316', '#10b981', '#3b82f6'];

  const frame = () => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: colors,
    });

    requestAnimationFrame(frame);
  };

  frame();
};
