export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label: string;
}) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vital] ${metric.name}: ${metric.value.toFixed(2)}`);
  }

  if (process.env.NODE_ENV === "production") {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", metric.name, {
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
}
