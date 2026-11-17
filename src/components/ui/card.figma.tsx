/**
 * Figma Code Connect — Card
 * File: TailTheme Web (`OjGoqhtHI9gzspszsDQ7Va`)
 */

import figma from '@figma/code-connect/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

figma.connect(Card, 'https://www.figma.com/design/OjGoqhtHI9gzspszsDQ7Va/TailTheme-Web', {
  example: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Supporting description for the card body.</CardDescription>
      </CardHeader>
      <CardContent>Content area</CardContent>
    </Card>
  ),
});
