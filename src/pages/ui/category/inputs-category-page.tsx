import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Calendar,
  Checkbox,
  DatePicker,
  Label,
  RadioGroup,
  RadioGroupItem,
  Slider,
  Switch,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';

export default function InputsCategoryPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Inputs"
        description="Grouped input primitives: Checkbox, RadioGroup, Switch, Slider, Toggle, Calendar & DatePicker."
      />

      <ShowcaseSection title="Checkbox / Radio / Switch">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" defaultChecked />
            <Label htmlFor="terms">Accept terms</Label>
          </div>
          <RadioGroup defaultValue="a" className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem id="r-a" value="a" />
              <Label htmlFor="r-a">Option A</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="r-b" value="b" />
              <Label htmlFor="r-b">Option B</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2">
            <Switch id="notify" defaultChecked />
            <Label htmlFor="notify">Email notifications</Label>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Slider">
        <Slider defaultValue={[30]} max={100} step={1} className="w-60" />
        <Slider defaultValue={[20, 70]} max={100} step={1} className="w-60" />
      </ShowcaseSection>

      <ShowcaseSection title="Toggle / ToggleGroup">
        <Toggle aria-label="Bold">B</Toggle>
        <ToggleGroup type="single" defaultValue="left">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </ShowcaseSection>

      <ShowcaseSection title="Calendar / DatePicker">
        <div className="flex flex-wrap items-start gap-4">
          <Calendar mode="single" selected={date} onSelect={setDate} />
          <div className="flex flex-col gap-2">
            <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              Selected: {date ? date.toLocaleDateString() : '—'}
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
