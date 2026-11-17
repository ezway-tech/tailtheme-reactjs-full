/**
 * Figma Code Connect — Input
 * File: TailTheme Web (`OjGoqhtHI9gzspszsDQ7Va`)
 */

import figma from '@figma/code-connect/react';
import { Input, type InputProps } from './input';

figma.connect(Input, 'https://www.figma.com/design/OjGoqhtHI9gzspszsDQ7Va/TailTheme-Web', {
  props: {
    placeholder: figma.string('Placeholder'),
    disabled: figma.boolean('Disabled'),
  },
  example: ({ placeholder, disabled }: Pick<InputProps, 'placeholder' | 'disabled'>) => (
    <Input placeholder={placeholder} disabled={disabled} />
  ),
});
