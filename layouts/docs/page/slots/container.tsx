'use client';

import type { ComponentProps } from 'react';
import { useDocsPage } from './..';
import { cn } from '../../../../lib/cn';

export function Container(props: ComponentProps<'article'>) {
  const { full } = useDocsPage();

  return (
    <article
      id="nd-page"
      data-full={full}
      {...props}
      className={cn(
        'flex flex-col w-full max-w-none mx-0 [grid-area:main] px-3 py-6 gap-3 md:px-4 md:pt-8 xl:px-6 xl:pt-14',
        full && 'max-w-none',
        props.className,
      )}
    >
      {props.children}
    </article>
  );
}
