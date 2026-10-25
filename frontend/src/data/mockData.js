export const dashboardStats = {
  currentCost: 42580,
  forecastCost: 48320,
  potentialSavings: 8420,
  resources: 47,
  anomalies: 5,
};

export const costData = [
  { date: "Sep 01", actual: 1180, forecast: null },
  { date: "Sep 05", actual: 1260, forecast: null },
  { date: "Sep 10", actual: 1320, forecast: null },
  { date: "Sep 15", actual: 1410, forecast: null },
  { date: "Sep 20", actual: 1480, forecast: null },
  { date: "Sep 25", actual: 1560, forecast: null },
  { date: "Sep 30", actual: 1640, forecast: 1640 },
  { date: "Oct 05", actual: null, forecast: 1710 },
  { date: "Oct 10", actual: null, forecast: 1790 },
  { date: "Oct 15", actual: null, forecast: 1880 },
  { date: "Oct 20", actual: null, forecast: 1970 },
  { date: "Oct 25", actual: null, forecast: 2070 },
  { date: "Oct 30", actual: null, forecast: 2180 },
];

export const resourceHealth = [
  {
    name: "EC2 Production",
    type: "m5.xlarge",
    cpu: 72,
    memory: 65,
    status: "Healthy",
  },
  {
    name: "EC2 Analytics",
    type: "m5.2xlarge",
    cpu: 18,
    memory: 24,
    status: "Underutilized",
  },
  {
    name: "EC2 Development",
    type: "t3.large",
    cpu: 7,
    memory: 12,
    status: "Idle",
  },
  {
    name: "EC2 API Server",
    type: "m5.large",
    cpu: 58,
    memory: 61,
    status: "Healthy",
  },
];

export const alerts = [
  {
    id: 1,
    severity: "critical",
    title: "Idle resource detected",
    description:
      "EC2 Development has averaged below 10% CPU for 14 days.",
    time: "18 min ago",
  },
  {
    id: 2,
    severity: "warning",
    title: "Underutilized instance",
    description:
      "EC2 Analytics may be oversized for its workload.",
    time: "42 min ago",
  },
  {
    id: 3,
    severity: "warning",
    title: "Cost increase detected",
    description:
      "Network costs increased by 14% this week.",
    time: "2 hrs ago",
  },
];

export const recommendations = [
  {
    id: 1,
    resource: "EC2 Analytics",
    currentType: "m5.2xlarge",
    recommendedType: "m5.large",
    currentCost: 12000,
    estimatedCost: 4800,
    monthlySavings: 7200,
    confidence: 94,
  },
  {
    id: 2,
    resource: "EC2 Development",
    currentType: "t3.large",
    recommendedType: "t3.small",
    currentCost: 4200,
    estimatedCost: 1500,
    monthlySavings: 2700,
    confidence: 91,
  },
];

export const resources = [
  {
    id: "i-001",
    name: "EC2 Production",
    type: "m5.xlarge",
    region: "ap-south-1",
    cpu: 72,
    memory: 65,
    network: 54,
    monthlyCost: 9800,
    status: "Healthy",
  },
  {
    id: "i-002",
    name: "EC2 Analytics",
    type: "m5.2xlarge",
    region: "ap-south-1",
    cpu: 18,
    memory: 24,
    network: 21,
    monthlyCost: 12000,
    status: "Underutilized",
  },
  {
    id: "i-003",
    name: "EC2 Development",
    type: "t3.large",
    region: "ap-south-1",
    cpu: 7,
    memory: 12,
    network: 8,
    monthlyCost: 4200,
    status: "Idle",
  },
  {
    id: "i-004",
    name: "EC2 API Server",
    type: "m5.large",
    region: "ap-south-1",
    cpu: 58,
    memory: 61,
    network: 47,
    monthlyCost: 6600,
    status: "Healthy",
  },
];