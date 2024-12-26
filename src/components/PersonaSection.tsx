import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { InspirationCard } from '@/components/InspirationCard';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { MainBubbleBio } from '@/components/MainBubbleBio';
import { portfolioData } from '@/config/portfolio-data';
import type { PersonaId } from '@/types/portfolio';

interface PersonaSectionProps {
  selectedPersona: PersonaId | null;
  onSelectPersona: (id: PersonaId) => void;
  isMainSelected: boolean;
}

const personaOrder: PersonaId[] = ['engineer', 'educator', 'movement-builder'];

export function PersonaSection({ selectedPersona, onSelectPersona, isMainSelected }: PersonaSectionProps) {
  if (!selectedPersona && !isMainSelected) return null;
  
  if (isMainSelected) {
    return <MainBubbleBio />;
  }

  const currentPersona = portfolioData[selectedPersona!];
  const currentIndex = personaOrder.indexOf(selectedPersona!);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < personaOrder.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      onSelectPersona(personaOrder[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onSelectPersona(personaOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="mt-12 space-y-8">
      <div 
        className="rounded-lg p-8 transition-colors duration-300"
        style={{
          backgroundColor: `${currentPersona.color.replace('1)', '0.1)')}`,
          borderColor: currentPersona.color,
          borderWidth: '1px'
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            disabled={!hasPrevious}
            className="mr-4"
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </Button>
          <div className="flex-1 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {currentPersona.emoji} {currentPersona.title}
            </h2>
            <p className="text-xl text-gray-400">{currentPersona.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={!hasNext}
            className="ml-4"
          >
            <ChevronRightIcon className="h-8 w-8" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h3 className="text-2xl font-semibold mb-6">
              My {currentPersona.title} Inspirations
            </h3>
            <div className="space-y-6">
              {currentPersona.inspirations.map((inspiration, index) => (
                <InspirationCard key={index} inspiration={inspiration} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-6">
              My {currentPersona.title}-Related Experiences
            </h3>
            <ExperienceTimeline experiences={currentPersona.experiences} />
          </section>
        </div>
      </div>
    </div>
  );
} 