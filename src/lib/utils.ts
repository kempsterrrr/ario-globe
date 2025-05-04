import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import ipLocation from "iplocation"

export interface GatewayData {
  "FQDN": string
  "IP Address": string
  "Ping (ms)": number
  "Release": number
  "Operator Stake": number
  "Total Delegated Stake": number
  "Delegates Count": number
  "Status": string
  "Prescribed Epoch Count": number
  "Observed Epoch Count": number
  "Total Epoch Count": number
  "Passed Epoch Count": number
  "Failed Epoch Count": number
  "Failed Consecutive Epochs": number
  "Passed Consecutive Epochs": number
  "ISP": string
  "Geo Location": string
  "Error Message": string
  "Process Id": string
  "ANS-104 Unbundle Filter": string
  "ANS-104 Index Filter": string
  "Supported Manifest Versions": string
}

interface LocationData {
  country: string
  region: string
  city: string
  latitude: number
  longitude: number
}

interface EnhancedGatewayData extends GatewayData {
  location?: LocationData
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function enhanceGatewayDataWithLocation(gatewayData: GatewayData[]): Promise<EnhancedGatewayData[]> {
  const enhancedData: EnhancedGatewayData[] = []

  for (const gateway of gatewayData) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const locationData = await ipLocation(gateway["IP Address"]) as Record<string, any>
      enhancedData.push({
        ...gateway,
        location: {
          country: locationData.country || "",
          region: locationData.region || "",
          city: locationData.city || "",
          latitude: locationData.latitude || 0,
          longitude: locationData.longitude || 0
        }
      })
    } catch (error) {
      // If location lookup fails, keep the original data without location
      enhancedData.push(gateway)
    }
  }

  return enhancedData
}