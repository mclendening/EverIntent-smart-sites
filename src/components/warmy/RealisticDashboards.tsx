/**
 * @fileoverview Realistic Dashboard Visualizations for Warmy Page
 * @description High-fidelity dashboard mockups that look like real SaaS products
 */

import { 
  Mail, 
  Shield, 
  BarChart3, 
  Zap, 
  CheckCircle, 
  TrendingUp,
  Activity,
  Check,
  AlertCircle,
  MoreHorizontal,
  RefreshCw,
  Download,
  Calendar,
  ChevronDown,
  Search,
  Bell,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Circle
} from 'lucide-react';

// ============================================
// DELIVERABILITY SCORE DASHBOARD
// ============================================

export function DeliverabilityScoreDashboard() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border/50 bg-card shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-md bg-background/50 text-xs text-muted-foreground font-mono">
            app.warmy.io/dashboard
          </div>
        </div>
        <div className="flex gap-2 text-muted-foreground">
          <RefreshCw className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* App header */}
      <div className="flex items-center justify-between px-5 py-3 bg-background border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Mail className="w-4 h-4 text-accent" />
            </div>
            <span className="font-semibold text-sm">Warmy.io</span>
          </div>
          <nav className="hidden md:flex items-center gap-1 text-xs">
            <span className="px-3 py-1.5 rounded-md bg-accent/10 text-accent font-medium">Dashboard</span>
            <span className="px-3 py-1.5 text-muted-foreground hover:text-foreground cursor-pointer">Warm-Up</span>
            <span className="px-3 py-1.5 text-muted-foreground hover:text-foreground cursor-pointer">Tests</span>
            <span className="px-3 py-1.5 text-muted-foreground hover:text-foreground cursor-pointer">Reports</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <Settings className="w-4 h-4 text-muted-foreground" />
          <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-medium">JD</div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="p-5 bg-background">
        {/* Page header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold">Deliverability Overview</h2>
            <p className="text-xs text-muted-foreground">john@company.com • Last updated 2 min ago</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/50 text-xs hover:bg-muted/50 transition-colors">
              <Calendar className="w-3.5 h-3.5" />
              Last 30 days
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent text-accent-foreground text-xs font-medium">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Main score + stats grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Score gauge - larger left section */}
          <div className="col-span-12 md:col-span-5 p-5 rounded-xl bg-muted/30 border border-border/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Sender Score</span>
              <span className="flex items-center gap-1 text-xs text-accent">
                <ArrowUpRight className="w-3 h-3" />
                +12 pts
              </span>
            </div>
            
            {/* Circular gauge */}
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Background track */}
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/30"
                />
                {/* Score arc */}
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="url(#gaugeGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  strokeDashoffset="13"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" />
                    <stop offset="100%" stopColor="hsl(142 76% 46%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">98</span>
                <span className="text-xs text-muted-foreground">out of 100</span>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Reputation</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[96%] rounded-full bg-accent" />
                  </div>
                  <span className="font-medium w-8 text-right">96%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Authentication</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-full rounded-full bg-green-500" />
                  </div>
                  <span className="font-medium w-8 text-right">100%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Content</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[98%] rounded-full bg-accent" />
                  </div>
                  <span className="font-medium w-8 text-right">98%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats cards - right section */}
          <div className="col-span-12 md:col-span-7 grid grid-cols-2 gap-3">
            {[
              { label: 'Emails Sent', value: '12,847', change: '+23.5%', positive: true, icon: Mail },
              { label: 'Inbox Rate', value: '96.8%', change: '+4.2%', positive: true, icon: CheckCircle },
              { label: 'Open Rate', value: '42.3%', change: '+8.7%', positive: true, icon: Activity },
              { label: 'Spam Rate', value: '0.4%', change: '-1.8%', positive: true, icon: Shield },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-muted/30 border border-border/30">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-4 h-4 text-muted-foreground" />
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.positive ? 'text-green-500' : 'text-destructive'}`}>
                    {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trend chart */}
        <div className="mt-4 p-4 rounded-xl bg-muted/30 border border-border/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Deliverability Trend</span>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Inbox
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                Spam
              </span>
            </div>
          </div>
          
          {/* Chart area */}
          <div className="relative h-32">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[10px] text-muted-foreground">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
            </div>
            
            {/* Chart grid */}
            <div className="absolute left-10 right-0 top-0 bottom-6">
              <div className="h-full flex flex-col justify-between">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="border-t border-dashed border-border/30" />
                ))}
              </div>
              
              {/* Bars */}
              <div className="absolute inset-0 flex items-end gap-1 px-2">
                {[92, 94, 93, 96, 95, 97, 96, 98, 97, 98, 96, 98].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div 
                      className="w-full rounded-t bg-accent/80 transition-all duration-500"
                      style={{ height: `${val}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* X-axis labels */}
            <div className="absolute left-10 right-0 bottom-0 flex justify-between text-[10px] text-muted-foreground px-1">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// WARM-UP PROGRESS DASHBOARD
// ============================================

export function WarmUpProgressDashboard() {
  const days = [
    { day: 1, sent: 20, target: 20 },
    { day: 5, sent: 50, target: 50 },
    { day: 10, sent: 100, target: 100 },
    { day: 15, sent: 200, target: 200 },
    { day: 20, sent: 350, target: 350 },
    { day: 25, sent: 450, target: 450 },
    { day: 30, sent: 500, target: 500 },
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border/50 bg-card shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-md bg-background/50 text-xs text-muted-foreground font-mono">
            app.warmy.io/warm-up
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-background">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Warm-Up Progress</h3>
              <p className="text-xs text-muted-foreground">john@company.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
              <Circle className="w-2 h-2 fill-current" />
              Active
            </span>
            <button className="p-1.5 rounded-md hover:bg-muted/50 transition-colors">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Progress stats */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <div className="p-3 rounded-lg bg-muted/30 text-center">
            <p className="text-2xl font-bold text-accent">21</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Day</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 text-center">
            <p className="text-2xl font-bold">450</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Daily Volume</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 text-center">
            <p className="text-2xl font-bold">98%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Reply Rate</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 text-center">
            <p className="text-2xl font-bold text-green-500">0</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Bounces</p>
          </div>
        </div>

        {/* Chart */}
        <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Daily Sending Volume</span>
            <span className="text-xs text-muted-foreground">Target: 500/day</span>
          </div>
          
          <div className="relative h-40">
            {/* Y-axis */}
            <div className="absolute left-0 top-0 bottom-5 w-10 flex flex-col justify-between text-[10px] text-muted-foreground text-right pr-2">
              <span>500</span>
              <span>375</span>
              <span>250</span>
              <span>125</span>
              <span>0</span>
            </div>
            
            {/* Grid + bars */}
            <div className="absolute left-12 right-0 top-0 bottom-5">
              {/* Horizontal grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-border/20" />
                ))}
              </div>
              
              {/* Bars */}
              <div className="relative h-full flex items-end justify-between gap-2 px-4">
                {days.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full max-w-8 rounded-t bg-gradient-to-t from-accent to-accent/60"
                      style={{ height: `${(d.sent / 500) * 100}%` }}
                    />
                    <span className="text-[9px] text-muted-foreground">D{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Warm-Up Timeline</span>
            <span className="text-xs text-accent font-medium">70% Complete</span>
          </div>
          <div className="relative h-2 rounded-full bg-muted overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-[70%] rounded-full bg-gradient-to-r from-accent to-green-500" />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
            <span>Started Nov 15</span>
            <span>21 of 30 days</span>
            <span>Est. completion Dec 15</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// INBOX PLACEMENT TEST DASHBOARD
// ============================================

export function InboxPlacementDashboard() {
  const providers = [
    { name: 'Gmail', icon: '📧', inbox: 98, spam: 2, missing: 0 },
    { name: 'Outlook', icon: '📬', inbox: 96, spam: 3, missing: 1 },
    { name: 'Yahoo', icon: '📮', inbox: 94, spam: 4, missing: 2 },
    { name: 'iCloud', icon: '☁️', inbox: 97, spam: 2, missing: 1 },
    { name: 'AOL', icon: '📨', inbox: 95, spam: 3, missing: 2 },
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border/50 bg-card shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-md bg-background/50 text-xs text-muted-foreground font-mono">
            app.warmy.io/inbox-test
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-background">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold">Inbox Placement Test</h3>
            <p className="text-xs text-muted-foreground">Last test: Today at 2:34 PM • 35 providers</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent text-accent-foreground text-xs font-medium">
            <RefreshCw className="w-3.5 h-3.5" />
            Run New Test
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-green-500">Inbox</span>
            </div>
            <p className="text-3xl font-bold text-green-500">32</p>
            <p className="text-xs text-muted-foreground">91% placement</p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-medium text-yellow-500">Spam</span>
            </div>
            <p className="text-3xl font-bold text-yellow-500">2</p>
            <p className="text-xs text-muted-foreground">6% placement</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Missing</span>
            </div>
            <p className="text-3xl font-bold">1</p>
            <p className="text-xs text-muted-foreground">3% missing</p>
          </div>
        </div>

        {/* Provider table */}
        <div className="rounded-lg border border-border/30 overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-3 bg-muted/30 text-xs font-medium text-muted-foreground">
            <div className="col-span-4">Provider</div>
            <div className="col-span-6">Placement</div>
            <div className="col-span-2 text-right">Status</div>
          </div>
          
          {providers.map((provider, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 p-3 border-t border-border/20 items-center">
              <div className="col-span-4 flex items-center gap-2">
                <span className="text-base">{provider.icon}</span>
                <span className="text-sm font-medium">{provider.name}</span>
              </div>
              <div className="col-span-6">
                <div className="flex items-center gap-1 h-3 rounded-full overflow-hidden bg-muted/30">
                  <div 
                    className="h-full bg-green-500 rounded-l-full" 
                    style={{ width: `${provider.inbox}%` }} 
                  />
                  <div 
                    className="h-full bg-yellow-500" 
                    style={{ width: `${provider.spam}%` }} 
                  />
                  <div 
                    className="h-full bg-muted-foreground/30 rounded-r-full" 
                    style={{ width: `${provider.missing}%` }} 
                  />
                </div>
              </div>
              <div className="col-span-2 text-right">
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${provider.inbox >= 95 ? 'text-green-500' : 'text-yellow-500'}`}>
                  {provider.inbox}%
                  {provider.inbox >= 95 ? <Check className="w-3 h-3" /> : null}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// DOMAIN HEALTH DASHBOARD
// ============================================

export function DomainHealthDashboard() {
  const checks = [
    { name: 'SPF Record', status: 'pass', value: 'v=spf1 include:_spf.google.com ~all' },
    { name: 'DKIM Signature', status: 'pass', value: 'selector1._domainkey.company.com' },
    { name: 'DMARC Policy', status: 'pass', value: 'p=reject; rua=mailto:dmarc@company.com' },
    { name: 'PTR Record', status: 'pass', value: 'mail.company.com → 192.168.1.1' },
  ];

  const blacklists = [
    { name: 'Spamhaus', status: 'clean' },
    { name: 'Barracuda', status: 'clean' },
    { name: 'SORBS', status: 'clean' },
    { name: 'SpamCop', status: 'clean' },
    { name: 'CBL', status: 'clean' },
    { name: 'UCEPROTECT', status: 'clean' },
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border/50 bg-card shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-md bg-background/50 text-xs text-muted-foreground font-mono">
            app.warmy.io/domain-health
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-background">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold">company.com</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-500 font-medium">All checks passing</span>
                <span className="text-muted-foreground">• Last scan 5 min ago</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-500">100%</p>
            <p className="text-xs text-muted-foreground">Health Score</p>
          </div>
        </div>

        {/* Authentication checks */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Authentication</h4>
          <div className="space-y-2">
            {checks.map((check, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/20">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{check.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono truncate max-w-[200px]">{check.value}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-green-500/10 text-green-500 uppercase">
                  {check.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Blacklist status */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Blacklist Monitoring</h4>
            <span className="text-xs text-muted-foreground">100+ databases checked</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {blacklists.map((bl, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-muted/20">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs">{bl.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
