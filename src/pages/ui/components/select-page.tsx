import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';
import { MotionList, MotionListItem } from '@/components/motion';

const FRUITS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian' },
  { value: 'elderberry', label: 'Elderberry' },
];

export default function SelectPage() {
  const [combo, setCombo] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Select & Combobox"
        description="Native-feel select built on Radix, plus a searchable combobox composed from Popover + Command."
      />

      <ComponentApi
        description="Source: src/components/ui/select.tsx (Radix UI). Always wrap content in <SelectContent>; the trigger uses <SelectValue> for the current label."
        importCode={[
          `import {`,
          `  Select,`,
          `  SelectTrigger,`,
          `  SelectValue,`,
          `  SelectContent,`,
          `  SelectGroup,`,
          `  SelectLabel,`,
          `  SelectItem,`,
          `  SelectSeparator,`,
          `} from '@/components/ui';`,
        ]}
        propsTitle="Select root props"
        props={[
          {
            name: 'value / defaultValue',
            type: 'string',
            description: 'Current / initial selected value (controlled vs uncontrolled).',
          },
          {
            name: 'onValueChange',
            type: '(value: string) => void',
            description: 'Fired whenever the selection changes.',
          },
          {
            name: 'open / defaultOpen / onOpenChange',
            type: 'boolean / fn',
            description: 'Control the popover open state.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the trigger and prevents opening.',
          },
          {
            name: 'name',
            type: 'string',
            description: 'When inside a <form>, renders a hidden input with this name.',
          },
          {
            name: 'dir',
            type: `'ltr' | 'rtl'`,
            description: 'Reading direction. Inherits from <html dir> by default.',
          },
        ]}
      />

      <ComponentApi
        title="Combobox API (composed)"
        description="A combobox is a Popover + Command composition. Use this when users need to search through long lists."
        importCode={[
          `import {`,
          `  Popover,`,
          `  PopoverTrigger,`,
          `  PopoverContent,`,
          `  Command,`,
          `  CommandInput,`,
          `  CommandList,`,
          `  CommandEmpty,`,
          `  CommandGroup,`,
          `  CommandItem,`,
          `} from '@/components/ui';`,
        ]}
        propsTitle="Slots"
        props={[
          {
            name: 'PopoverTrigger',
            type: 'asChild',
            description: 'Wraps a Button to open the popover. Use aria-expanded + role="combobox".',
          },
          {
            name: 'CommandInput',
            type: 'value / onValueChange',
            description: 'Search input. Filters CommandItem children automatically.',
          },
          {
            name: 'CommandList',
            type: 'div',
            description: 'Scrollable list container. Wrap groups inside.',
          },
          {
            name: 'CommandItem',
            type: 'value / onSelect',
            description: 'Selectable row. Use the "value" prop for fuzzy matching.',
          },
          {
            name: 'CommandEmpty',
            type: 'children',
            description: 'Rendered when no items match the search term.',
          },
        ]}
        tokens={[
          { name: '--popover / --popover-foreground', description: 'Floating surface and text.' },
          { name: '--accent / --accent-foreground', description: 'Highlighted item.' },
          { name: '--border', description: 'Trigger and content border.' },
          { name: '--ring', description: 'Trigger focus ring.' },
        ]}
      />

      <ShowcaseSection
        title="Select"
        code={`<Select>
  <SelectTrigger><SelectValue placeholder="Pick a fruit" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    …
  </SelectContent>
</Select>`}
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fruit">Fruit</Label>
          <Select>
            <SelectTrigger id="fruit" className="w-56">
              <SelectValue placeholder="Pick a fruit" />
            </SelectTrigger>
            <SelectContent>
              {FRUITS.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Disabled item"
        code={`<SelectItem value="durian" disabled>Durian (not available)</SelectItem>`}
      >
        <Select>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="durian" disabled>
              Durian (not available)
            </SelectItem>
          </SelectContent>
        </Select>
      </ShowcaseSection>

      <ShowcaseSection
        title="Combobox (searchable)"
        description="Use Popover + Command for type-ahead filtering."
        code={`<Popover>
  <PopoverTrigger asChild><Button>Pick…</Button></PopoverTrigger>
  <PopoverContent>
    <Command>
      <CommandInput placeholder="Search fruit…" />
      <CommandList>
        <CommandEmpty>No match.</CommandEmpty>
        <CommandGroup>
          {items.map(…)}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>`}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-56 justify-between"
            >
              {combo ? FRUITS.find((f) => f.value === combo)?.label : 'Pick a fruit…'}
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0">
            <Command>
              <CommandInput placeholder="Search fruit…" />
              <CommandList>
                <CommandEmpty>No match.</CommandEmpty>
                <CommandGroup>
                  {FRUITS.map((f) => (
                    <CommandItem
                      key={f.value}
                      value={f.value}
                      onSelect={(v) => {
                        setCombo(v === combo ? null : v);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn('h-4 w-4', combo === f.value ? 'opacity-100' : 'opacity-0')}
                      />
                      {f.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </ShowcaseSection>

      <ShowcaseSection
        title="Motion"
        description="Radix handles Select content entrance. For custom option lists, use <MotionList/> for a subtle staggered reveal."
        code={`<MotionList stagger="tight">
  {options.map(o => <MotionListItem key={o}>{o}</MotionListItem>)}
</MotionList>`}
      >
        <MotionList stagger="tight" className="w-full space-y-1">
          {['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'].map((o) => (
            <MotionListItem
              key={o}
              className="cursor-pointer rounded-md border border-border bg-muted/30 px-3 py-2 text-sm hover:bg-muted"
            >
              {o}
            </MotionListItem>
          ))}
        </MotionList>
      </ShowcaseSection>
    </div>
  );
}
