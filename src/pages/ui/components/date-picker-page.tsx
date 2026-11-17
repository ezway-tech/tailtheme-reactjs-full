import * as React from 'react';
import type { DateRange } from 'react-day-picker';
import { Calendar, DatePicker, DateRangePicker, Label } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';

export default function DatePickerPage() {
  const [selected, setSelected] = React.useState<Date | undefined>(undefined);
  const [range, setRange] = React.useState<DateRange | undefined>(undefined);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Date picker"
        description="Single-date and range pickers. `<DatePicker>` wraps a Popover-anchored `<Calendar>` so you can drop it into any form."
      />

      <ComponentApi
        description="Source: src/components/ui/date-picker.tsx (DatePicker) + src/components/ui/calendar.tsx (Calendar — react-day-picker under the hood)."
        importCode={`import { DatePicker, Calendar } from '@/components/ui';
import type { DatePickerProps, CalendarProps } from '@/components/ui';`}
        propsTitle="DatePicker props"
        props={[
          {
            name: 'value',
            type: 'Date | undefined',
            description: 'Controlled selected date.',
          },
          {
            name: 'defaultValue',
            type: 'Date | undefined',
            description: 'Initial date for uncontrolled usage.',
          },
          {
            name: 'onChange',
            type: '(date?: Date) => void',
            description: 'Fires when the user picks (or clears) a date.',
          },
          {
            name: 'placeholder',
            type: 'string',
            default: `'Pick a date'`,
            description: 'Trigger label when no date is selected.',
          },
          {
            name: 'formatStr',
            type: 'string',
            default: `'PPP'`,
            description: 'date-fns format token used to render the selected date.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Disables the trigger and prevents opening the popover.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'Trigger-level Tailwind override (width, alignment, etc.).',
          },
        ]}
        tokens={[
          { name: '--popover / --popover-foreground', description: 'Calendar popover surface.' },
          { name: '--accent / --accent-foreground', description: 'Hover & focused day cell.' },
          {
            name: '--primary / --primary-foreground',
            description: 'Selected day fill and contrast.',
          },
          { name: '--muted-foreground', description: 'Out-of-month days.' },
        ]}
      />

      <ShowcaseSection
        title="Single date"
        description="Uncontrolled — let the picker keep its own state."
        code={`<DatePicker defaultValue={new Date()} onChange={(d) => console.log(d)} />`}
      >
        <DatePicker defaultValue={new Date()} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Controlled with reset"
        description="Hold the date externally if you need to clear or sync with a form."
        code={`const [selected, setSelected] = useState<Date | undefined>();
<DatePicker value={selected} onChange={setSelected} />`}
      >
        <div className="flex flex-col items-start gap-2">
          <DatePicker value={selected} onChange={setSelected} placeholder="Choose date" />
          <p className="text-sm text-muted-foreground">
            {selected ? selected.toDateString() : 'No date selected'}
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Date range picker"
        description="Popover range picker with preset rail (Today, Last 7 days, …)."
        code={`<DateRangePicker defaultValue={range} onChange={setRange} showPresets />`}
      >
        <DateRangePicker value={range} onChange={setRange} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Calendar (range mode)"
        description="Drop `<Calendar mode='range'>` directly when you need an inline range picker."
        code={`<Calendar
  mode="range"
  selected={range}
  onSelect={(r) => setRange(r ?? {})}
  numberOfMonths={2}
/>`}
      >
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={1}
          className="rounded-md border border-border"
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Inside a form"
        description="Wrap with a Label or Form primitive — the trigger is a normal Button."
        code={`<Label htmlFor="dob">Date of birth</Label>
<DatePicker id="dob" defaultValue={new Date(1992, 5, 12)} />`}
      >
        <div className="flex w-full max-w-xs flex-col gap-1.5">
          <Label htmlFor="dob">Date of birth</Label>
          <DatePicker defaultValue={new Date(1992, 5, 12)} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Disabled"
        description="`disabled` greys out the trigger and prevents opening."
        code={`<DatePicker disabled placeholder="Locked date" />`}
      >
        <DatePicker disabled placeholder="Locked date" />
      </ShowcaseSection>
    </div>
  );
}
