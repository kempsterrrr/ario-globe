import { enhanceGatewayDataWithLocation } from './src/lib/utils'
import gatewayData from "./data/gatewaydata.json"

console.log(gatewayData)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
enhanceGatewayDataWithLocation(gatewayData)

