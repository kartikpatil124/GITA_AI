import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ChatInput from '../components/ChatInput';
import PromptChips from '../components/PromptChips';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSubmit = (text) => {
    navigate(`/chat?q=${encodeURIComponent(text)}`);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4">
      <HeroSection />
      <div className="w-full mt-2">
        <ChatInput onSubmit={handleSubmit} placeholder="Ask your question..." />
        <PromptChips onSelect={handleSubmit} />
      </div>
    </div>
  );
}
