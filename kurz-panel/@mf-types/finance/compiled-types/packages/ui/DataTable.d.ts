import { type ColumnDef } from '@tanstack/react-table';
export declare function DataTable<T>({ data, columns }: {
    data: T[];
    columns: ColumnDef<T>[];
}): import("react/jsx-runtime").JSX.Element;
