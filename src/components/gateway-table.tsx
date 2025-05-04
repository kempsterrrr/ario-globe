"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import gatewayData from "../../data/gatewaydata.json"
import { useEffect } from "react"


interface GatewayTableData {
  id: string
  domain: string
  status: string
  email: string
}

const columns = [
  {
    accessorKey: "FQDN",
    header: "Domain",
  },
  {
    accessorKey: "Ping (ms)",
    header: "Ping",
  },
  {
    accessorKey: "IP Address",
    header: "IP Address",
  },
]


export function GatewayTable() {
    // const [filteredData, setFilteredData] = useState([])
    // useEffect(() => {
    //     let newData = gatewayData.filter((item, index) => {
            
    //     })
    // }, [])
  return <DataTable columns={columns} data={gatewayData} />
} 