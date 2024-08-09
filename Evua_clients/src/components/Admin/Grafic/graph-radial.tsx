"use client";
import { useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  PolarRadiusAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ClassDictionary } from "clsx";

//evita el blanco y el negro
function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 50) + 50 + "%";
  const lightness = Math.floor(Math.random() * 41) + 40 + "%";
  return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function convertConfig(data: ClassDictionary) {
  const newConfig:ChartConfig = {};
  const chardata = [
    { rasgo: "Amabilidad" },
    { rasgo: "Presentación" },
    { rasgo: "Eficiencia" },
    { rasgo: "Conocimiento del Menú" },
    { rasgo: "Tiempo de espera" },
  ];
  if (Object.keys(data).length > 0) {
    Object.values(data).forEach((element) => {
      newConfig[element.id_mesero]= {
          label: `${element.nombres.split()[0]} ${
            element.apellidos.split()[0]
          }`,
          color: getRandomColor(),
        }
      
      chardata[0][element.id_mesero] = element.avg_amabilidad;
      chardata[1][element.id_mesero] = element.avg_presentacion;
      chardata[2][element.id_mesero] = element.avg_eficiencia;
      chardata[3][element.id_mesero] = element.avg_conocimiento_menu;
      chardata[4][element.id_mesero] = element.avg_tiempo_espera;
    });

  }
  return [newConfig, chardata];
}


export function GraphRadial({ listRecept }) {
  const [dataConfig, data] = convertConfig(listRecept);

  return (
    <Card>
      <CardContent>
        <ChartContainer
          config={dataConfig}
          className="mx-auto min-h-[300px] max-h-[650px]"
        >
          <RadarChart
            data={data}
            margin={{
              top: -40,
              bottom: -10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="rasgo" />
            <PolarGrid />
            {Object.keys(dataConfig).map((key) => (
              <Radar
                key={dataConfig[key].label}
                dataKey={key}
                fill={dataConfig[key].color}
                fillOpacity={0.3}
              />
            ))}
            <PolarRadiusAxis
              angle={60}
              stroke="hsla(var(--foreground))"
              orientation="middle"
              axisLine={false}
              domain={[0, 10]}
            />

            <ChartLegend className="mt-8" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
