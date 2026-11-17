import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';

export default function NavigationCategoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Navigation" description="Breadcrumb, Pagination and NavigationMenu." />

      <ShowcaseSection title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Button</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ShowcaseSection>

      <ShowcaseSection title="Pagination">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ShowcaseSection>

      <ShowcaseSection title="NavigationMenu" description="Top-level mega-menu for websites.">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent className="p-4">
                <div className="grid w-72 gap-2 text-sm">
                  <NavigationMenuLink className="rounded-md px-2 py-1.5 hover:bg-muted" href="#">
                    Overview
                  </NavigationMenuLink>
                  <NavigationMenuLink className="rounded-md px-2 py-1.5 hover:bg-muted" href="#">
                    Analytics
                  </NavigationMenuLink>
                  <NavigationMenuLink className="rounded-md px-2 py-1.5 hover:bg-muted" href="#">
                    Integrations
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Company</NavigationMenuTrigger>
              <NavigationMenuContent className="p-4">
                <div className="grid w-72 gap-2 text-sm">
                  <NavigationMenuLink className="rounded-md px-2 py-1.5 hover:bg-muted" href="#">
                    About
                  </NavigationMenuLink>
                  <NavigationMenuLink className="rounded-md px-2 py-1.5 hover:bg-muted" href="#">
                    Careers
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </ShowcaseSection>
    </div>
  );
}
