import { Calendar, Link2, MapPin } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';

export default function SocialProfilePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border">
        <div className="h-32 rounded-t-lg bg-gradient-to-r from-primary to-accent" aria-hidden />
        <div className="flex flex-col gap-4 p-6 pt-0 sm:flex-row sm:items-end">
          <Avatar className="-mt-10 h-24 w-24 ring-4 ring-background">
            <AvatarImage src="https://i.pravatar.cc/256?img=15" alt="profile" />
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-semibold">Alex Nguyen</h1>
            <p className="text-sm text-muted-foreground">
              @alex · Designer & maintainer of TailTheme UI
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> Ho Chi Minh City
              </span>
              <a className="flex items-center gap-1 hover:underline" href="#">
                <Link2 className="h-3.5 w-3.5" /> tailtheme.dev
              </a>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Joined March 2024
              </span>
            </div>
            <div className="flex gap-4 pt-2 text-sm">
              <span>
                <strong>281</strong> <span className="text-muted-foreground">Following</span>
              </span>
              <span>
                <strong>12.4K</strong> <span className="text-muted-foreground">Followers</span>
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Message</Button>
            <Button>Follow</Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-base">Post #{i + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Tokens-first theming keeps customer branding trivial. More notes on the blog.</p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline">design</Badge>
                  <Badge variant="outline">theming</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="media">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="aspect-square rounded-md bg-muted" aria-hidden />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="likes" className="text-sm text-muted-foreground">
          Liked posts will appear here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
