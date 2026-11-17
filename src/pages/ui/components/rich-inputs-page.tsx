import * as React from 'react';
import {
  Button,
  ColorPicker,
  ImageCropDialog,
  InputFloating,
  RichTextEditor,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';

export default function RichInputsPage() {
  const [color, setColor] = React.useState('#3b82f6');
  const [bio, setBio] = React.useState('<p>Write something <strong>bold</strong>.</p>');
  const [cropOpen, setCropOpen] = React.useState(false);
  const [cropSrc, setCropSrc] = React.useState<string | null>(null);
  const [cropPreview, setCropPreview] = React.useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rich inputs"
        description="Color picker, floating labels, rich text editor, and image crop — common in settings and CMS flows."
      />

      <ShowcaseSection
        title="Color picker"
        code={`<ColorPicker value={color} onChange={setColor} />`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <ColorPicker value={color} onChange={setColor} />
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-mono">{color}</span>
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Floating label input"
        description="Label animates above the field when focused or filled."
        code={`<InputFloating label="Email" type="email" />`}
      >
        <div className="w-full max-w-sm space-y-4">
          <InputFloating label="Email" type="email" />
          <InputFloating label="Password" type="password" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Rich text editor"
        description="Tiptap-based editor with a minimal toolbar."
      >
        <RichTextEditor
          className="max-w-2xl"
          value={bio}
          onChange={setBio}
          placeholder="Start writing…"
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Image crop dialog"
        description="Modal cropper with zoom slider — ideal for avatar or cover uploads."
      >
        <div className="flex flex-col items-start gap-3">
          <input
            id="crop-file"
            type="file"
            accept="image/*"
            className="block w-full max-w-md text-sm file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setCropSrc(URL.createObjectURL(file));
              setCropOpen(true);
            }}
          />
          {cropPreview ? (
            <img
              src={cropPreview}
              alt="Cropped preview"
              className="h-24 w-24 rounded-full border border-border object-cover"
            />
          ) : null}
          <Button
            type="button"
            variant="outline"
            disabled={!cropSrc}
            onClick={() => setCropOpen(true)}
          >
            Open crop dialog
          </Button>
          {cropSrc ? (
            <ImageCropDialog
              open={cropOpen}
              onOpenChange={setCropOpen}
              imageSrc={cropSrc}
              aspect={1}
              onCropComplete={(_, previewUrl) => setCropPreview(previewUrl)}
            />
          ) : null}
        </div>
      </ShowcaseSection>
    </div>
  );
}
