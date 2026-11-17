import {
  Avatar,
  AvatarFallback,
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';

export default function OverlaysCategoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Overlays"
        description="Popover, Tooltip, HoverCard, DropdownMenu and ContextMenu. See the Dialog page for modal overlays."
      />

      <ShowcaseSection title="Popover">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent className="text-sm">Popover content.</PopoverContent>
        </Popover>
      </ShowcaseSection>

      <ShowcaseSection title="Tooltip" description="Short label on hover / focus.">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Helpful hint</TooltipContent>
        </Tooltip>
      </ShowcaseSection>

      <ShowcaseSection title="HoverCard" description="Rich preview on hover.">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@tailtheme</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>VU</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">TailTheme UI</p>
                <p className="text-muted-foreground">Template library by TailTheme team.</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </ShowcaseSection>

      <ShowcaseSection title="DropdownMenu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ShowcaseSection>

      <ShowcaseSection title="ContextMenu" description="Right-click on the area below.">
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div className="grid h-32 w-full place-items-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
              Right-click here
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuItem>Duplicate</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem className="text-destructive">Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </ShowcaseSection>
    </div>
  );
}
