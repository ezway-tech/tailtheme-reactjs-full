import * as React from 'react';
import { File as FileIcon, FileImage, FileText, UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface FileUploadProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  /** Controlled list of files. Pass `undefined` to keep the component uncontrolled. */
  value?: File[];
  /** Initial files when used uncontrolled. */
  defaultValue?: File[];
  /** Fires whenever the file list changes — both add and remove. */
  onChange?: (files: File[]) => void;
  /** Fires when one or more files are added (post-validation). */
  onFilesAdded?: (files: File[]) => void;
  /** Fires when validation rejects files. Receives the bad list and a reason. */
  onReject?: (rejected: { file: File; reason: 'type' | 'size' | 'limit' }[]) => void;
  /** Mirrors the native `accept` attribute (e.g. `image/*,.pdf`). */
  accept?: string;
  /** Maximum size per file, in bytes. */
  maxSize?: number;
  /** Maximum number of files kept in the list. Default: unlimited. */
  maxFiles?: number;
  /** Allow selecting multiple files. Defaults to `true`. */
  multiple?: boolean;
  /** Disable interaction. */
  disabled?: boolean;
  /** Helper text rendered under the upload icon. */
  hint?: React.ReactNode;
  /** Override the label that appears above the hint. */
  label?: React.ReactNode;
  /** Custom file list renderer — receive the current files + a remove fn. */
  renderList?: (files: File[], helpers: { remove: (file: File) => void }) => React.ReactNode;
  /** Forwarded to the inner `<input type="file">` (e.g. `name`). */
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'accept' | 'multiple' | 'onChange' | 'value' | 'defaultValue'
  >;
}

/**
 * Click-or-drop file upload zone. Wraps a native `<input type="file">` so
 * server-side form submissions keep working, while adding a focus-visible
 * dashed dropzone, drag highlight, default file list and validation hooks.
 */
export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onFilesAdded,
      onReject,
      accept,
      maxSize,
      maxFiles,
      multiple = true,
      disabled,
      hint,
      label,
      renderList,
      inputProps,
      className,
      ...rest
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<File[]>(defaultValue ?? []);
    const files = isControlled ? value : internal;
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    const updateFiles = React.useCallback(
      (next: File[]) => {
        if (!isControlled) setInternal(next);
        onChange?.(next);
      },
      [isControlled, onChange],
    );

    const validateAndAdd = React.useCallback(
      (incoming: FileList | File[]) => {
        if (disabled) return;
        const list = Array.from(incoming);
        const accepted: File[] = [];
        const rejected: { file: File; reason: 'type' | 'size' | 'limit' }[] = [];
        const acceptList = accept
          ? accept
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : null;

        for (const file of list) {
          if (acceptList && !matchesAccept(file, acceptList)) {
            rejected.push({ file, reason: 'type' });
            continue;
          }
          if (maxSize && file.size > maxSize) {
            rejected.push({ file, reason: 'size' });
            continue;
          }
          accepted.push(file);
        }

        let merged = multiple ? [...files, ...accepted] : accepted.slice(-1);
        if (maxFiles !== undefined && merged.length > maxFiles) {
          const overflow = merged.slice(maxFiles);
          for (const file of overflow) rejected.push({ file, reason: 'limit' });
          merged = merged.slice(0, maxFiles);
        }

        if (rejected.length > 0) onReject?.(rejected);
        if (accepted.length > 0) onFilesAdded?.(accepted);
        updateFiles(merged);
      },
      [accept, disabled, files, maxFiles, maxSize, multiple, onFilesAdded, onReject, updateFiles],
    );

    const remove = (file: File) => {
      updateFiles(files.filter((f) => f !== file));
    };

    const open = () => {
      if (disabled) return;
      inputRef.current?.click();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      if (event.dataTransfer.files?.length) {
        validateAndAdd(event.dataTransfer.files);
      }
    };

    return (
      <div ref={ref} className={cn('space-y-3', className)} {...rest}>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          onClick={open}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              open();
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'group flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/20 px-6 py-8 text-center transition-colors',
            'hover:border-primary/60 hover:bg-muted/40',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            isDragging && 'border-primary bg-primary/5',
            disabled && 'cursor-not-allowed opacity-60 hover:border-border hover:bg-muted/20',
          )}
        >
          <UploadCloud
            className={cn(
              'h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary',
              isDragging && 'text-primary',
            )}
            aria-hidden
          />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {label ?? (
                <>
                  <span className="text-primary">Click to upload</span> or drag &amp; drop
                </>
              )}
            </p>
            {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
          </div>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            tabIndex={-1}
            {...inputProps}
            onChange={(event) => {
              if (event.target.files?.length) validateAndAdd(event.target.files);
              event.target.value = '';
            }}
          />
        </div>

        {files.length > 0 ? (
          renderList ? (
            renderList(files, { remove })
          ) : (
            <ul className="space-y-1.5">
              {files.map((file, idx) => (
                <li
                  key={`${file.name}-${idx}`}
                  className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <FileTypeIcon file={file} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => remove(file)}
                    className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )
        ) : null}
      </div>
    );
  },
);
FileUpload.displayName = 'FileUpload';

function FileTypeIcon({ file }: { file: File }) {
  if (file.type.startsWith('image/')) {
    return <FileImage className="h-5 w-5 text-muted-foreground" aria-hidden />;
  }
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    return <FileText className="h-5 w-5 text-muted-foreground" aria-hidden />;
  }
  return <FileIcon className="h-5 w-5 text-muted-foreground" aria-hidden />;
}

function matchesAccept(file: File, acceptList: string[]): boolean {
  return acceptList.some((entry) => {
    if (entry.startsWith('.')) {
      return file.name.toLowerCase().endsWith(entry.toLowerCase());
    }
    if (entry.endsWith('/*')) {
      const family = entry.slice(0, -1);
      return file.type.startsWith(family);
    }
    return file.type === entry;
  });
}

/** Format a byte count using the binary units commonly seen in file UIs. */
export function formatBytes(bytes: number): string {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exp = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const value = bytes / Math.pow(1024, exp);
  return `${value.toFixed(value >= 10 || exp === 0 ? 0 : 1)} ${units[exp]}`;
}
