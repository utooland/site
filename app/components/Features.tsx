"use client";

import { motion } from "framer-motion";
import { Zap, Package, Cpu, Code2, Layers, Rocket } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description:
      "Built with Rust and compiled to WebAssembly for native-like performance in the browser.",
  },
  {
    icon: Package,
    title: "Smart Bundling",
    description:
      "Intelligent code splitting and tree shaking to optimize your bundle size automatically.",
  },
  {
    icon: Cpu,
    title: "Multi-threaded",
    description:
      "Leverage Web Workers for parallel processing and faster build times.",
  },
  {
    icon: Code2,
    title: "TypeScript First",
    description:
      "First-class TypeScript support with instant type checking and auto-completion.",
  },
  {
    icon: Layers,
    title: "Plugin System",
    description:
      "Extensible plugin architecture supporting Less, Tailwind CSS, and more.",
  },
  {
    icon: Rocket,
    title: "Zero Config",
    description:
      "Sensible defaults out of the box. Start building immediately without complex configuration.",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">Utoo</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the next generation of web bundling with cutting-edge
            technology designed for modern development workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="feature-card glass border-white/10 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
