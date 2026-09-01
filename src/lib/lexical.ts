import type { RichTextValue } from '@/types/content'

type LexicalTextNode = {
  type: 'text'
  text: string
  detail: number
  format: number
  mode: 'normal'
  style: ''
  version: 1
}

type LexicalParagraph = {
  type: 'paragraph'
  children: LexicalTextNode[]
  direction: 'ltr'
  format: ''
  indent: 0
  textFormat: 0
  version: 1
}

export type LexicalDocument = {
  root: {
    type: 'root'
    children: LexicalParagraph[]
    direction: 'ltr'
    format: ''
    indent: 0
    version: 1
  }
}

const textNode = (text: string): LexicalTextNode => ({
  type: 'text',
  text,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

/**
 * Plain text (blank line = new paragraph) turned into the Lexical document
 * shape Payload stores. Used by the seed script so default content lands in
 * the CMS as editable rich text.
 */
export const textToLexical = (text: string): LexicalDocument => ({
  root: {
    type: 'root',
    children: text
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => ({
        type: 'paragraph' as const,
        children: [textNode(paragraph)],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0 as const,
        textFormat: 0 as const,
        version: 1 as const,
      })),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

export const isLexicalDocument = (value: RichTextValue): value is LexicalDocument =>
  Boolean(value) && typeof value === 'object' && 'root' in (value as object)

/** Flattens rich text to a plain string, for meta descriptions and JSON-LD. */
export const richTextToPlainText = (value: RichTextValue, maxLength = 300): string => {
  if (!value) return ''

  let text = ''
  if (typeof value === 'string') {
    text = value.replace(/\s+/g, ' ').trim()
  } else {
    const walk = (node: unknown): string => {
      if (!node || typeof node !== 'object') return ''
      const record = node as Record<string, unknown>
      if (typeof record.text === 'string') return record.text
      const children = Array.isArray(record.children) ? record.children : []
      return children.map(walk).join(' ')
    }
    text = walk((value as LexicalDocument).root).replace(/\s+/g, ' ').trim()
  }

  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trimEnd()}…`
}
