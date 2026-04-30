import AnimatedStars from './AnimatedStars';

export default function CosmicBackground({ pulseMode = false }) {
  return (
    <div className="fixed inset-0 bg-black" style={{ zIndex: 0 }} aria-hidden="true">
      <AnimatedStars pulseMode={pulseMode} />
    </div>
  );
}
