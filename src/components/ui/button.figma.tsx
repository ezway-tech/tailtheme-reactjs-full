/**
 * Figma Code Connect — Button
 *
 * Maps `Button` to the TailTheme Web Figma library.
 * File key: `OjGoqhtHI9gzspszsDQ7Va` — component set **Button** (default, outline, destructive).
 *
 * Setup:
 *   npm install -D @figma/code-connect
 *   npx figma connect publish
 *
 * @see https://www.figma.com/developers/code-connect
 * @see docs/figma-tailtheme-web.md
 */

import figma from '@figma/code-connect/react';
import { Button, type ButtonProps } from './button';

figma.connect(Button, 'https://www.figma.com/design/OjGoqhtHI9gzspszsDQ7Va/TailTheme-Web', {
  props: {
    variant: figma.enum('Variant', {
      Default: 'default',
      Outline: 'outline',
      Destructive: 'destructive',
      Secondary: 'secondary',
      Ghost: 'ghost',
      Link: 'link',
    }),
    size: figma.enum('Size', {
      Default: 'default',
      Small: 'sm',
      Large: 'lg',
    }),
    children: figma.string('Label'),
  },
  example: ({ variant, size, children }: Pick<ButtonProps, 'variant' | 'size' | 'children'>) => (
    <Button variant={variant} size={size}>
      {children}
    </Button>
  ),
});
