import * as React from 'react';
import { Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui';
import { ImageCropDialog } from '@/components/ui/image-crop';
import { cn } from '@/lib/cn';

export interface AvatarUploadFieldProps {
  fallback: string;
  defaultSrc?: string;
  className?: string;
}

/**
 * Pick → crop → preview flow for profile avatars.
 */
export function AvatarUploadField({ fallback, defaultSrc, className }: AvatarUploadFieldProps) {
  const [src, setSrc] = React.useState<string | null>(defaultSrc ?? null);
  const [cropOpen, setCropOpen] = React.useState(false);
  const [pendingSrc, setPendingSrc] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Avatar className="h-20 w-20">
        {src ? <AvatarImage src={src} alt="" /> : null}
        <AvatarFallback className="text-lg">{fallback}</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            setPendingSrc(url);
            setCropOpen(true);
          }}
        />
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
          <Camera className="mr-1 h-4 w-4" /> Upload photo
        </Button>
        <p className="text-xs text-muted-foreground">JPG or PNG, max 2 MB.</p>
      </div>
      {pendingSrc ? (
        <ImageCropDialog
          open={cropOpen}
          onOpenChange={setCropOpen}
          imageSrc={pendingSrc}
          aspect={1}
          onCropComplete={(_, preview) => setSrc(preview)}
        />
      ) : null}
    </div>
  );
}
