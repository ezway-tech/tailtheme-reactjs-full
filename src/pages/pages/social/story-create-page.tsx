import { Link } from 'react-router-dom';
import { Camera, X } from 'lucide-react';
import { Button, Input, toast } from '@/components/ui';
import { urls } from '@/routes/urls';

export default function StoryCreatePage() {
  return (
    <div className="relative flex h-[100dvh] flex-col bg-black text-white">
      <header className="flex items-center justify-between p-4">
        <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Link to={urls.app.pages.social.feed} aria-label="Exit">
            <X className="h-5 w-5" />
          </Link>
        </Button>
        <span className="text-sm font-medium">New story</span>
        <div className="w-9" />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
        <div className="flex h-64 w-full max-w-sm flex-col items-center justify-center rounded-xl border border-dashed border-white/30 bg-white/5">
          <Camera className="h-12 w-12 text-white/60" />
          <p className="mt-2 text-sm text-white/60">Camera preview placeholder</p>
        </div>
        <Input
          placeholder="Add a caption…"
          className="max-w-sm border-white/20 bg-white/10 text-white placeholder:text-white/50"
        />
      </div>

      <footer className="flex gap-3 p-4">
        <Button
          asChild
          variant="outline"
          className="flex-1 border-white/30 bg-transparent text-white"
        >
          <Link to={urls.app.pages.social.feed}>Cancel</Link>
        </Button>
        <Button className="flex-1" onClick={() => toast.success('Story shared (demo)')}>
          Share
        </Button>
      </footer>
    </div>
  );
}
