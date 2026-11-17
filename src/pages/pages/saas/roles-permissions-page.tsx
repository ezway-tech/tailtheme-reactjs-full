import { useState } from 'react';
import { Shield } from 'lucide-react';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const ROLES = ['Owner', 'Admin', 'Editor', 'Viewer'] as const;
const PERMISSIONS = [
  'View workspace',
  'Edit projects',
  'Manage billing',
  'Manage members',
  'Manage API keys',
  'Delete workspace',
] as const;

/** role → permission index set */
const DEFAULT_MATRIX: Record<(typeof ROLES)[number], number[]> = {
  Owner: [0, 1, 2, 3, 4, 5],
  Admin: [0, 1, 2, 3, 4],
  Editor: [0, 1],
  Viewer: [0],
};

export default function RolesPermissionsPage() {
  const [matrix, setMatrix] = useState(DEFAULT_MATRIX);

  function toggle(role: (typeof ROLES)[number], permIndex: number) {
    setMatrix((prev) => {
      const set = new Set(prev[role]);
      if (set.has(permIndex)) set.delete(permIndex);
      else set.add(permIndex);
      return { ...prev, [role]: [...set].sort((a, b) => a - b) };
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & permissions"
        description="Matrix editor for workspace roles. Changes apply on save (demo)."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-5 w-5 text-primary" aria-hidden />
            Permission matrix
          </CardTitle>
          <CardDescription>Check cells to grant a permission to a role.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Permission</TableHead>
                {ROLES.map((role) => (
                  <TableHead key={role} className="text-center">
                    <Badge variant={role === 'Owner' ? 'default' : 'outline'}>{role}</Badge>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {PERMISSIONS.map((perm, i) => (
                <TableRow key={perm}>
                  <TableCell className="font-medium">{perm}</TableCell>
                  {ROLES.map((role) => (
                    <TableCell key={role} className="text-center">
                      <Checkbox
                        checked={matrix[role].includes(i)}
                        disabled={role === 'Owner' && i === 0}
                        onCheckedChange={() => toggle(role, i)}
                        aria-label={`${role} — ${perm}`}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
