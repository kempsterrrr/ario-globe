"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"

interface Payment {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

const data: Payment[] = [
  {
    id: "1",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "2",
    amount: 200,
    status: "processing",
    email: "a@example.com",
  },
  {
    id: "3",
    amount: 300,
    status: "success",
    email: "b@example.com",
  },
]

export function DataTableExample() {
  return <DataTable columns={columns} data={data} />
} 