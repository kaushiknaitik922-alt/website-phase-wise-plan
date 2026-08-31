import { GenerationBlock } from "@/components/about/GenerationBlock";
import type { GenerationBlock as GenerationBlockType } from "@/lib/types";

export function Timeline({ generations }: { generations: GenerationBlockType[] }) {
  const sorted = [...generations].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {sorted.map((generation, i) => (
        <GenerationBlock
          key={generation.id}
          generation={generation}
          reverse={i % 2 === 1}
          isLast={i === sorted.length - 1}
        />
      ))}
    </div>
  );
}
