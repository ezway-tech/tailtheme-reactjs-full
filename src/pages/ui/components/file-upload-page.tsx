import { useState } from 'react';
import { Image as ImageIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileUpload, formatBytes } from '@/components/ui/file-upload';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';

export default function FileUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [avatar, setAvatar] = useState<File[]>([]);
  const [progressFiles, setProgressFiles] = useState<File[]>([]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="FileUpload / Dropzone"
        description="Click-or-drop file picker built on a native input. Supports drag highlight, multi-file lists, type / size validation and a custom list renderer for previews and progress."
      />

      <ComponentApi
        description="Source: src/components/ui/file-upload.tsx. Uncontrolled by default — pass `value` + `onChange` to control externally."
        importCode={`import { FileUpload } from '@/components/ui';`}
        props={[
          {
            name: 'value',
            type: 'File[]',
            description: 'Controlled file list. Omit for uncontrolled mode.',
          },
          { name: 'defaultValue', type: 'File[]', description: 'Initial files when uncontrolled.' },
          {
            name: 'onChange',
            type: '(files: File[]) =&gt; void',
            description: 'Fires for both add and remove operations.',
          },
          {
            name: 'onFilesAdded',
            type: '(files: File[]) =&gt; void',
            description: 'Fires only when accepted files are added.',
          },
          {
            name: 'onReject',
            type: '(rejected: { file: File; reason: &apos;type&apos; | &apos;size&apos; | &apos;limit&apos; }[]) =&gt; void',
            description: 'Notify the user about rejected files.',
          },
          {
            name: 'accept',
            type: 'string',
            description: 'Native accept string (e.g. `&quot;image/*,.pdf&quot;`).',
          },
          { name: 'maxSize', type: 'number', description: 'Maximum bytes per file.' },
          { name: 'maxFiles', type: 'number', description: 'Cap the number of files in the list.' },
          {
            name: 'multiple',
            type: 'boolean',
            default: 'true',
            description: 'Allow multi-select. Set `false` for single-file pickers.',
          },
          {
            name: 'hint',
            type: 'React.ReactNode',
            description: 'Help text below the upload icon (e.g. allowed types).',
          },
          {
            name: 'renderList',
            type: '(files, { remove }) =&gt; ReactNode',
            description: 'Custom file list renderer (great for previews / progress).',
          },
          {
            name: 'inputProps',
            type: 'InputHTMLAttributes',
            description:
              'Forwarded to the inner native `<input type=&quot;file&quot;>` (e.g. `name`).',
          },
        ]}
        tokens={[
          { name: '--border', description: 'Default dashed border color.' },
          { name: '--primary', description: 'Hover and drag-over border + icon tint.' },
          {
            name: '--muted / --muted-foreground',
            description: 'Background fill and helper text on the dropzone.',
          },
          {
            name: 'role=&quot;button&quot; + tabIndex=0',
            description: 'Keyboard support: Enter / Space opens the picker.',
          },
        ]}
      />

      <ShowcaseSection
        title="Default dropzone"
        description="Multi-file with a hint line — the most common use case for document upload forms."
        code={`<FileUpload
  hint="PNG, JPG or PDF up to 10MB"
  accept="image/*,.pdf"
  maxSize={10 * 1024 * 1024}
  onChange={setFiles}
/>`}
      >
        <div className="w-full max-w-xl">
          <FileUpload
            value={files}
            onChange={setFiles}
            accept="image/*,.pdf"
            maxSize={10 * 1024 * 1024}
            hint="PNG, JPG or PDF up to 10MB"
          />
          {files.length > 0 ? (
            <div className="mt-3 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => setFiles([])}>
                <Trash2 className="h-4 w-4" aria-hidden /> Clear all
              </Button>
            </div>
          ) : null}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Single file (avatar)"
        description="Set `multiple={false}` and use a custom list renderer to show an image preview."
        code={`<FileUpload
  multiple={false}
  accept="image/*"
  maxSize={2 * 1024 * 1024}
  hint="Square image up to 2MB"
  renderList={(files, { remove }) => /* ...preview... */}
/>`}
      >
        <div className="w-full max-w-md space-y-3">
          <Label>Profile picture</Label>
          <FileUpload
            multiple={false}
            value={avatar}
            onChange={setAvatar}
            accept="image/*"
            maxSize={2 * 1024 * 1024}
            label={
              <>
                <span className="text-primary">Click to upload</span> or drop a square image
              </>
            }
            hint="JPG, PNG, WebP up to 2MB"
            renderList={(items, { remove }) => (
              <ul className="space-y-2">
                {items.map((file) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <li
                      key={file.name}
                      className="flex items-center gap-3 rounded-md border border-border bg-background p-2"
                    >
                      <img
                        src={url}
                        alt=""
                        className="h-12 w-12 rounded-md border border-border object-cover"
                        onLoad={() => URL.revokeObjectURL(url)}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => remove(file)}>
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="With progress"
        description="Custom list renderer that simulates upload progress per file — wire up to your real `XMLHttpRequest` / `fetch` callbacks."
        code={`<FileUpload renderList={(files) => files.map((f) => /* progress UI */)} />`}
      >
        <div className="w-full max-w-xl">
          <FileUpload
            value={progressFiles}
            onChange={setProgressFiles}
            hint="Drop files to see a fake progress bar"
            renderList={(items, { remove }) => (
              <ul className="space-y-2">
                {items.map((file) => (
                  <li
                    key={file.name}
                    className="space-y-1.5 rounded-md border border-border bg-background p-3"
                  >
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" aria-hidden />
                      <span className="flex-1 truncate text-sm font-medium text-foreground">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatBytes(file.size)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => remove(file)}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      </Button>
                    </div>
                    <Progress value={72} className="h-1" />
                  </li>
                ))}
              </ul>
            )}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Disabled"
        description="Drag highlight and click are disabled while the dropzone is in `disabled` mode."
        code={`<FileUpload disabled hint="Uploads are paused while we sync your account" />`}
      >
        <div className="w-full max-w-xl">
          <FileUpload disabled hint="Uploads are paused while we sync your account" />
        </div>
      </ShowcaseSection>
    </div>
  );
}
