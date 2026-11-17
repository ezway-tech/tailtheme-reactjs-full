import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/patterns';
import { ComponentApi } from '@/components/showcase/component-api';
import { ColumnsTab } from '@/pages/ui/components/table/columns-tab';
import { EditingTab } from '@/pages/ui/components/table/editing-tab';
import { FilteringTab } from '@/pages/ui/components/table/filtering-tab';
import { HierarchyTab } from '@/pages/ui/components/table/hierarchy-tab';
import { PaginationTab } from '@/pages/ui/components/table/pagination-tab';
import { PerformanceTab } from '@/pages/ui/components/table/performance-tab';
import { PrimitivesTab } from '@/pages/ui/components/table/primitives-tab';
import { RowsTab } from '@/pages/ui/components/table/rows-tab';
import { StatesTab } from '@/pages/ui/components/table/states-tab';
import { VisualTab } from '@/pages/ui/components/table/visual-tab';

export default function TablePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Table"
        description="Accessible primitives plus full TanStack Table recipes (sort/filter/group/virtualize) on this page. The standalone `/app/pages/saas/data-table` route remains a focused consumer example."
      />

      <ComponentApi
        description="Source: src/components/ui/table.tsx. Thin styled wrappers around native HTML <table> elements; all props forward to the underlying tag."
        importCode={[
          `import {`,
          `  Table,`,
          `  TableHeader,`,
          `  TableBody,`,
          `  TableFooter,`,
          `  TableRow,`,
          `  TableHead,`,
          `  TableCell,`,
          `  TableCaption,`,
          `} from '@/components/ui';`,
        ]}
        propsTitle="Slots"
        props={[
          {
            name: 'Table',
            type: 'table',
            description: 'Outer wrapper. Renders <table> with w-full + caption-bottom.',
          },
          {
            name: 'TableHeader',
            type: 'thead',
            description: 'Header rows container. Adds a bottom border.',
          },
          {
            name: 'TableBody',
            type: 'tbody',
            description: 'Data rows container.',
          },
          {
            name: 'TableFooter',
            type: 'tfoot',
            description: 'Footer rows (e.g. totals). Renders bg-muted/50 + medium font.',
          },
          {
            name: 'TableRow',
            type: 'tr',
            description: 'Single row. Adds hover + selected (data-[state=selected]) styling.',
          },
          {
            name: 'TableHead',
            type: 'th',
            description: 'Cell inside <thead>. Sets text-left, muted color.',
          },
          {
            name: 'TableCell',
            type: 'td',
            description: 'Body cell. Padding p-3.',
          },
          {
            name: 'TableCaption',
            type: 'caption',
            description: 'Optional caption rendered below the table.',
          },
        ]}
        tokens={[
          { name: '--border', description: 'Row separators and outer outline.' },
          {
            name: '--muted / --muted-foreground',
            description: 'Header background + footer + secondary text.',
          },
          { name: '--accent', description: 'Hover background on TableRow.' },
        ]}
      />

      <Tabs defaultValue="primitives" className="space-y-4">
        <TabsList className="flex h-auto min-h-10 w-full flex-wrap justify-start gap-1 bg-muted/40 p-1">
          <TabsTrigger value="primitives">Primitives</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="filtering">Filtering</TabsTrigger>
          <TabsTrigger value="columns">Columns</TabsTrigger>
          <TabsTrigger value="rows">Rows</TabsTrigger>
          <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
          <TabsTrigger value="editing">Editing</TabsTrigger>
          <TabsTrigger value="pagination">Pagination</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="states">States</TabsTrigger>
        </TabsList>

        <TabsContent value="primitives" className="mt-0 outline-none">
          <PrimitivesTab />
        </TabsContent>
        <TabsContent value="visual" className="mt-0 outline-none">
          <VisualTab />
        </TabsContent>
        <TabsContent value="filtering" className="mt-0 outline-none">
          <FilteringTab />
        </TabsContent>
        <TabsContent value="columns" className="mt-0 outline-none">
          <ColumnsTab />
        </TabsContent>
        <TabsContent value="rows" className="mt-0 outline-none">
          <RowsTab />
        </TabsContent>
        <TabsContent value="hierarchy" className="mt-0 outline-none">
          <HierarchyTab />
        </TabsContent>
        <TabsContent value="editing" className="mt-0 outline-none">
          <EditingTab />
        </TabsContent>
        <TabsContent value="pagination" className="mt-0 outline-none">
          <PaginationTab />
        </TabsContent>
        <TabsContent value="performance" className="mt-0 outline-none">
          <PerformanceTab />
        </TabsContent>
        <TabsContent value="states" className="mt-0 outline-none">
          <StatesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
