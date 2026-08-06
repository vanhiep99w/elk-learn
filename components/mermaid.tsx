'use client';

import mermaid from 'mermaid';
import { useEffect, useId, useRef, useState } from 'react';

type MermaidProps = {
  chart: string;
};

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'default',
});

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const renderId = `mermaid-${reactId.replace(/:/g, '')}`;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);

    async function renderChart() {
      try {
        const { svg } = await mermaid.render(renderId, chart);

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (renderError) {
        if (!cancelled) {
          setError(
            renderError instanceof Error
              ? renderError.message
              : 'Không thể render sơ đồ Mermaid.',
          );
        }
      }
    }

    void renderChart();

    return () => {
      cancelled = true;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [chart, renderId]);

  if (error) {
    return (
      <details className="my-6 rounded-lg border border-fd-border bg-fd-card p-4">
        <summary className="cursor-pointer font-medium">
          Không thể hiển thị sơ đồ Mermaid
        </summary>
        <p className="mt-2 text-sm text-fd-muted-foreground">{error}</p>
        <pre className="mt-3 overflow-x-auto text-sm">
          <code>{chart}</code>
        </pre>
      </details>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 overflow-x-auto rounded-lg border border-fd-border bg-fd-card p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
      role="img"
      aria-label="Sơ đồ Mermaid"
    />
  );
}
