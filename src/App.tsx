import "./styles.css";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { GatewayTable } from "./components/gateway-table";
import gatewaysData from "../data/gateways_info_1746388866.json";

interface Gateway {
  fqdn: string;
  ipAddress: string;
  ping: number;
  release: string;
  processId: string;
  ans104UnbundleFilter: {
    never?: boolean;
    and?: any;
    or?: any;
    attributes?: any;
  };
  ans104IndexFilter: {
    never?: boolean;
    and?: any;
    or?: any;
    attributes?: any;
  };
  operatorStake: number;
  totalDelegatedStake: number;
  delegatesCount: number;
  status: string;
  prescribedEpochCount: number;
  observedEpochCount: number;
  totalEpochCount: number;
  passedEpochCount: number;
  failedEpochCount: number;
  failedConsecutiveEpochs: number;
  passedConsecutiveEpochs: number;
  isp: string;
  geoLocation: string;
  longitude: number;
  latitude: number;
  delegates: any[];
}

type Marker = {
  location: [number, number];
  size: number;
}

// https://github.com/shuding/cobe

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let phi = 0

    const markers: Marker[] = (gatewaysData as Gateway[])
      .filter(gateway => gateway.longitude && gateway.latitude)
      .map(gateway => ({
        location: [gateway.latitude, gateway.longitude] as [number, number],
        size: 0.05
      }))

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers,
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi
        phi += 0.005
      }
    })

    return () => {
      globe.destroy()
    }
  }, [])
  
  return (
    <div className="App">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* <Card className="@container/card bg-black text-white">
            <CardHeader className="relative">
              <CardDescription>Active Gateways</CardDescription>
              <CardTitle className="@[250px]/card:text-4xl text-6xl font-semibold tabular-nums">
                {gatewaysData.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="@container/card bg-black text-white">
            <CardHeader className="relative">
              <CardDescription>Total Domains</CardDescription>
              <CardTitle className="@[250px]/card:text-4xl text-6xl font-semibold tabular-nums">
                5,000
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="@container/card bg-black text-white">
            <CardHeader className="relative">
              <CardDescription>Total Subdomains</CardDescription>
              <CardTitle className="@[250px]/card:text-4xl text-6xl font-semibold tabular-nums">
                150,000
              </CardTitle>
            </CardHeader>
          </Card> */}
        </div>
        <div className="flex min-h-[100vh] flex-1 items-center justify-center rounded-xl md:min-h-min">
          <div className="relative">
            <canvas
              ref={canvasRef}
              style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
            />
          </div>
        </div>
        {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className="@container/card bg-black text-white">
            <CardHeader className="relative">
              <CardDescription>Avarege Ping</CardDescription>
              <CardTitle className="@[250px]/card:text-4xl text-6xl font-semibold tabular-nums">
                440
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="@container/card bg-black text-white">
            <CardHeader className="relative">
              <CardDescription>Total Subdomains</CardDescription>
              <CardTitle className="@[250px]/card:text-4xl text-6xl font-semibold tabular-nums">
                115,000
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="@container/card bg-black text-white">
            <CardHeader className="relative">
              <CardDescription>Protocol Balance</CardDescription>
              <CardTitle className="@[250px]/card:text-4xl text-6xl font-semibold tabular-nums">
                60,000,000
              </CardTitle>
            </CardHeader>
          </Card>
        </div> */}
        {/* <GatewayTable /> */}
      </div>
    </div>
  )
}
