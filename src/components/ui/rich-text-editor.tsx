import * as React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, Link2, List, ListOrdered, Redo2, Strikethrough, Undo2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from './button';
import { Toggle } from './toggle';

export interface RichTextEditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'compact';
}

function ToolbarButton({
  pressed,
  onPressedChange,
  label,
  children,
}: {
  pressed?: boolean;
  onPressedChange: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Toggle
      size="sm"
      pressed={pressed}
      onPressedChange={onPressedChange}
      aria-label={label}
      className="h-8 w-8 px-0"
    >
      {children}
    </Toggle>
  );
}

/**
 * Headless rich text editor (Tiptap) with a tokenized toolbar.
 */
export function RichTextEditor({
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Write something…',
  disabled,
  className,
  variant = 'default',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value ?? defaultValue,
    editable: !disabled,
    onUpdate: ({ editor: ed }) => onChange?.(ed.getHTML()),
  });

  React.useEffect(() => {
    if (!editor || value === undefined) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-input bg-background',
        disabled && 'opacity-60',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/40 p-1',
          variant === 'compact' && 'p-0.5',
        )}
      >
        <ToolbarButton
          label="Bold"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          pressed={editor.isActive('strike')}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Bullet list"
          pressed={editor.isActive('bulletList')}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Ordered list"
          pressed={editor.isActive('orderedList')}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          pressed={editor.isActive('link')}
          onPressedChange={() => {
            const url = window.prompt('URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
            else editor.chain().focus().unsetLink().run();
          }}
        >
          <Link2 className="h-4 w-4" />
        </ToolbarButton>
        <div className="ml-auto flex gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Undo"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Redo"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <EditorContent
        editor={editor}
        className={cn(
          'prose prose-sm dark:prose-invert max-w-none px-3 py-2 focus:outline-none',
          '[&_.tiptap]:min-h-[120px] [&_.tiptap]:outline-none',
          variant === 'compact' && '[&_.tiptap]:min-h-[80px]',
        )}
      />
    </div>
  );
}
RichTextEditor.displayName = 'RichTextEditor';
