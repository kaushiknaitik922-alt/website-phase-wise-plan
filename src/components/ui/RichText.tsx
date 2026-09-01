import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { isLexicalDocument } from '@/lib/lexical'
import { cn } from '@/lib/utils'
import type { RichTextValue } from '@/types/content'

const proseClasses =
  'prose-headings:font-display max-w-prose space-y-4 text-base leading-relaxed text-muted [&_a]:font-medium [&_a]:text-navy [&_a]:underline [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-navy [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink'

/**
 * Renders both shapes of rich text: a Lexical document from the CMS, or the
 * plain multi-paragraph strings used as defaults.
 */
export function RichText({ value, className }: { value: RichTextValue; className?: string }) {
  if (!value) return null

  if (isLexicalDocument(value)) {
    return (
      <LexicalRichText
        data={value as unknown as SerializedEditorState}
        className={cn(proseClasses, className)}
      />
    )
  }

  const paragraphs = String(value)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <div className={cn(proseClasses, className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}
