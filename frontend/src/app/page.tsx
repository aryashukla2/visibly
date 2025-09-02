"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const description = "A radial chart with text";
const chartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartRadialText() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-full max-w-[200px] max-h-[200px]"
      >
        <RadialBarChart
          data={chartData}
          startAngle={0}
          endAngle={250}
          innerRadius={60}
          outerRadius={85}
          width={200}
          height={200}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[70, 60]}
          />
          <RadialBar
            dataKey="visitors"
            background
            cornerRadius={10}
            fill="var(--color-safari)"
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {chartData[0].visitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 18}
                        className="fill-muted-foreground text-sm"
                      >
                        Score
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
}

// Dashboard Page
export default function Dashboard() {
  const [url, setUrl] = React.useState("");

  const handleAnalyze = () => {
    // This is where you would add your API call
    console.log(`Analyzing URL: ${url}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Centered main container with max width */}
      <main className="flex-1 overflow-auto p-4 transition-all duration-300 ease-in-out lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Hero Input Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                  Analyze Your Website&lsquo;s SEO
                </h2>
                <p className="text-center text-lg text-gray-600">
                  Paste a website URL to instantly get an AI-powered SEO
                  analysis.
                </p>
                <div className="flex w-full max-w-xl space-x-2">
                  <Input
                    placeholder="https://www.example.com"
                    className="flex-1"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <Button
                    onClick={handleAnalyze}
                    className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                  >
                    Analyze
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Grid - centered with max width */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Visibility Score Card */}
            <Card className="flex flex-col">
              <CardHeader className="w-full">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-left">
                    AI Visibility Score
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L6.5 12h11L12 2zM12 22l-5.5-10h11L12 22z" />
                    </svg>
                    <span className="text-sm font-medium text-emerald-500">
                      +2.5%
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 items-center justify-center">
                <ChartRadialText />
              </CardContent>
            </Card>

            {/* Recent Insights Card */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Recent Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-3 mt-1 h-5 w-5 shrink-0 text-yellow-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 14c.2-.2.4-.3.6-.5.4-.5 1-1.3 1.3-2.2.4-1 .4-2.1.2-3.3C16.2 6.5 14.5 5 12 5s-4.2 1.5-4.8 3.5c-.2 1.2-.2 2.3.2 3.3.3.9 1 1.7 1.3 2.2.2.2.4.3.6.5" />
                      <path d="M12 5v1" />
                      <path d="M10 20h4" />
                      <path d="M10 20v-5" />
                      <path d="M14 20v-5" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Improve H1 Tags
                      </h4>
                      <p className="text-sm text-gray-600">
                        The h1 tag on your homepage is too generic. Try making
                        it more descriptive.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-3 mt-1 h-5 w-5 shrink-0 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-8.56" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Add FAQ Schema
                      </h4>
                      <p className="text-sm text-gray-600">
                        We detected FAQ content. Adding FAQ schema can improve
                        your search appearance.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-3 mt-1 h-5 w-5 shrink-0 text-red-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Fix Broken Links
                      </h4>
                      <p className="text-sm text-gray-600">
                        The AI found 3 broken internal links. You should fix
                        these to improve user experience.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Competitor Comparison Card */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Competitor Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 text-sm font-semibold text-gray-500">
                        Domain
                      </th>
                      <th className="py-2 text-right text-sm font-semibold text-gray-500">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                      <td className="py-3">yoursite.com</td>
                      <td className="py-3 text-right font-medium text-indigo-600">
                        78
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                      <td className="py-3">competitor1.com</td>
                      <td className="py-3 text-right text-gray-700">65</td>
                    </tr>
                    <tr className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                      <td className="py-3">competitor2.com</td>
                      <td className="py-3 text-right text-gray-700">59</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Live Keyword Rank Tracker Card */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Live Keyword Rank Tracker</CardTitle>
              </CardHeader>
            </Card>

            {/* Sample AI Responses Card */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Sample AI Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Explain SEO to a beginner
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        SEO, or Search Engine Optimization, is the practice of
                        increasing the quantity and quality of traffic to your
                        website through organic search engine results. It
                        involves making changes to your website design and
                        content to make it more attractive to search engines.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Analyze our homepage&lsquo;s keyword density
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Our AI analyzed your homepage and found a keyword
                        density of 1.2% for the key phrase &quot;AI
                        software&quot;. The phrase appears in your title tag, an
                        H2 heading, and three times within the body content.
                        This is a healthy distribution and does not appear to be
                        keyword stuffing.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Suggest topics for a new blog post
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Based on your current content and competitor analysis,
                        we recommend a blog post on &quot;The 5 Best Link
                        Building Strategies for E-commerce Websites&quot;. This
                        topic has high search volume and a low keyword
                        difficulty score.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
