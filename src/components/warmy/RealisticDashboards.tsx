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
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-md bg-black/50 text-xs text-zinc-500 font-mono">
            app.warmy.io/dashboard
          </div>
        </div>
        <div className="flex gap-2 text-zinc-500">
          <RefreshCw className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* App header */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#0d0d0d] border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Mail className="w-4 h-4 text-orange-500" />
            </div>
            <span className="font-semibold text-sm text-white">Warmy.io</span>
          </div>
          <nav className="hidden md:flex items-center gap-1 text-xs">
            <span className="px-3 py-1.5 rounded-md bg-orange-500/10 text-orange-500 font-medium">Dashboard</span>
            <span className="px-3 py-1.5 text-zinc-500 hover:text-white cursor-pointer">Warm-Up</span>
            <span className="px-3 py-1.5 text-zinc-500 hover:text-white cursor-pointer">Tests</span>
            <span className="px-3 py-1.5 text-zinc-500 hover:text-white cursor-pointer">Reports</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Bell className="w-4 h-4 text-zinc-500" />
          <Settings className="w-4 h-4 text-zinc-500" />
          <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-medium text-orange-500">JD</div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="p-5 bg-[#0a0a0a]">
        {/* Page header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-white">Deliverability Overview</h2>
            <p className="text-xs text-zinc-500">john@company.com • Last updated 2 min ago</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 text-xs text-zinc-300 hover:bg-white/5 transition-colors">
              <Calendar className="w-3.5 h-3.5" />
              Last 30 days
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500 text-white text-xs font-medium">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Main score + stats grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Score gauge - larger left section */}
          <div className="col-span-12 md:col-span-5 p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-white">Sender Score</span>
              <span className="flex items-center gap-1 text-xs text-orange-500">
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
                  className="text-white/10"
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
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">98</span>
                <span className="text-xs text-zinc-500">out of 100</span>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Reputation</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[96%] rounded-full bg-orange-500" />
                  </div>
                  <span className="font-medium w-8 text-right text-white">96%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Authentication</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-full rounded-full bg-green-500" />
                  </div>
                  <span className="font-medium w-8 text-right text-white">100%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Content</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[98%] rounded-full bg-orange-500" />
                  </div>
                  <span className="font-medium w-8 text-right text-white">98%</span>
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
              <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-4 h-4 text-zinc-500" />
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold mb-1 text-white">{stat.value}</p>
                <p className="text-xs text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trend chart - Line chart with actual data */}
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white">Deliverability Trend</span>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                Inbox
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <div className="w-2 h-2 rounded-full bg-zinc-500" />
                Spam
              </span>
            </div>
          </div>
          
          {/* SVG Line Chart */}
          <div className="relative h-24">
            <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="0" x2="400" y2="0" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
              <line x1="0" y1="26" x2="400" y2="26" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
              <line x1="0" y1="53" x2="400" y2="53" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
              <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.05)" />
              
              {/* Spam area (small, at bottom) */}
              <path 
                d="M0,76 L33,77 L66,75 L100,76 L133,74 L166,75 L200,73 L233,74 L266,72 L300,73 L333,71 L366,72 L400,70 L400,80 L0,80 Z"
                fill="rgba(113,113,122,0.3)"
              />
              
              {/* Inbox area (gradient fill) */}
              <defs>
                <linearGradient id="inboxGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(249,115,22,0.4)" />
                  <stop offset="100%" stopColor="rgba(249,115,22,0)" />
                </linearGradient>
              </defs>
              <path 
                d="M0,24 L33,20 L66,22 L100,16 L133,18 L166,12 L200,14 L233,8 L266,10 L300,6 L333,8 L366,4 L400,6 L400,80 L0,80 Z"
                fill="url(#inboxGradient)"
              />
              
              {/* Inbox line */}
              <path 
                d="M0,24 L33,20 L66,22 L100,16 L133,18 L166,12 L200,14 L233,8 L266,10 L300,6 L333,8 L366,4 L400,6"
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points */}
              <circle cx="0" cy="24" r="3" fill="#f97316" />
              <circle cx="100" cy="16" r="3" fill="#f97316" />
              <circle cx="200" cy="14" r="3" fill="#f97316" />
              <circle cx="300" cy="6" r="3" fill="#f97316" />
              <circle cx="400" cy="6" r="3" fill="#f97316" />
            </svg>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 -ml-8 flex flex-col justify-between text-[9px] text-zinc-600 py-1">
              <span>100%</span>
              <span>95%</span>
              <span>90%</span>
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between text-[10px] text-zinc-500 mt-1 px-1">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
            <span>Now</span>
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
    { day: 1, sent: 20, replies: 18, opens: 19, target: 20 },
    { day: 3, sent: 35, replies: 32, opens: 34, target: 35 },
    { day: 5, sent: 50, replies: 47, opens: 49, target: 50 },
    { day: 7, sent: 75, replies: 71, opens: 74, target: 75 },
    { day: 10, sent: 100, replies: 95, opens: 98, target: 100 },
    { day: 14, sent: 150, replies: 143, opens: 148, target: 150 },
    { day: 18, sent: 250, replies: 238, opens: 246, target: 250 },
    { day: 21, sent: 350, replies: 333, opens: 344, target: 350 },
    { day: 25, sent: 450, replies: 428, opens: 443, target: 450 },
    { day: 30, sent: 500, replies: 475, opens: 492, target: 500 },
  ];

  const recentActivity = [
    { time: '2 min ago', action: 'Sent warm-up email', provider: 'Gmail', status: 'delivered' },
    { time: '3 min ago', action: 'Reply received', provider: 'Outlook', status: 'positive' },
    { time: '5 min ago', action: 'Sent warm-up email', provider: 'Yahoo', status: 'delivered' },
    { time: '8 min ago', action: 'Reply received', provider: 'Gmail', status: 'positive' },
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-md bg-black/50 text-xs text-zinc-500 font-mono">
            app.warmy.io/warm-up
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-[#0a0a0a]">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Warm-Up Progress</h3>
              <p className="text-xs text-zinc-500">john@company.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
              <Circle className="w-2 h-2 fill-current" />
              Active
            </span>
            <button className="p-1.5 rounded-md hover:bg-white/5 transition-colors">
              <MoreHorizontal className="w-4 h-4 text-zinc-500" />
            </button>
          </div>
        </div>

        {/* Enhanced Progress stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Day</span>
              <TrendingUp className="w-3 h-3 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-orange-500">21</p>
            <p className="text-[10px] text-zinc-600">of 30 days</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Today's Volume</span>
              <Mail className="w-3 h-3 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">350</p>
            <p className="text-[10px] text-green-500">+50 from yesterday</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Reply Rate</span>
              <Activity className="w-3 h-3 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-white">95.2%</p>
            <p className="text-[10px] text-green-500">Excellent</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Total Sent</span>
              <CheckCircle className="w-3 h-3 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-white">4,280</p>
            <p className="text-[10px] text-zinc-500">0 bounced</p>
          </div>
        </div>

        {/* Enhanced Chart with multiple metrics */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm font-medium text-white">Volume Ramp-Up Schedule</span>
              <p className="text-[10px] text-zinc-500">AI-optimized sending progression</p>
            </div>
            <div className="flex items-center gap-4 text-[10px]">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                Sent
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Replied
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                Opened
              </span>
            </div>
          </div>
          
          <div className="relative h-44">
            {/* Y-axis */}
            <div className="absolute left-0 top-0 bottom-5 w-8 flex flex-col justify-between text-[10px] text-zinc-500 text-right pr-2">
              <span>500</span>
              <span>375</span>
              <span>250</span>
              <span>125</span>
              <span>0</span>
            </div>
            
            {/* Chart area */}
            <div className="absolute left-10 right-0 top-0 bottom-5">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-white/5" />
                ))}
              </div>
              
              {/* Stacked area/bars */}
              <div className="relative h-full flex items-end gap-1.5">
                {days.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5 group">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-white/20 rounded px-2 py-1 text-[9px] text-white whitespace-nowrap pointer-events-none z-10 transition-opacity">
                      Day {d.day}: {d.sent} sent, {d.replies} replies
                    </div>
                    
                    {/* Stacked bars */}
                    <div className="w-full max-w-6 flex flex-col-reverse" style={{ height: `${(d.sent / 500) * 100}%` }}>
                      {/* Sent base */}
                      <div className="w-full flex-1 bg-orange-500/40 rounded-t" />
                      {/* Opened overlay */}
                      <div 
                        className="absolute bottom-0 w-full bg-blue-400/60 rounded-t"
                        style={{ height: `${(d.opens / 500) * 100}%` }}
                      />
                      {/* Replied overlay */}
                      <div 
                        className="absolute bottom-0 w-full bg-green-500 rounded-t"
                        style={{ height: `${(d.replies / 500) * 100}%` }}
                      />
                    </div>
                    <span className="text-[8px] text-zinc-500">D{d.day}</span>
                  </div>
                ))}
              </div>
              
              {/* Target line */}
              <div className="absolute top-0 left-0 right-0 border-t-2 border-dashed border-orange-500/50" />
              <span className="absolute -top-4 right-0 text-[9px] text-orange-500">Target: 500/day</span>
            </div>
          </div>
        </div>

        {/* Two column: Timeline + Activity */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Timeline */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-white">Warm-Up Timeline</span>
              <span className="text-xs text-orange-500 font-medium">70% Complete</span>
            </div>
            <div className="relative h-3 rounded-full bg-white/10 overflow-hidden mb-2">
              <div className="absolute inset-y-0 left-0 w-[70%] rounded-full bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500" />
              {/* Milestone markers */}
              <div className="absolute top-1/2 left-[33%] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white border border-orange-500" />
              <div className="absolute top-1/2 left-[66%] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30 border border-white/50" />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>Nov 15</span>
              <span className="text-orange-500 font-medium">Day 21</span>
              <span>Dec 15</span>
            </div>
            
            {/* Phase indicator */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs">
                <div className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-500 font-medium">Phase 3</div>
                <span className="text-zinc-400">Acceleration: 300-450 emails/day</span>
              </div>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-white">Live Activity</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-green-500">Live</span>
              </div>
            </div>
            <div className="space-y-2">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'positive' ? 'bg-green-500' : 'bg-blue-400'}`} />
                    <span className="text-zinc-300">{item.action}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500">{item.provider}</span>
                    <span className="text-zinc-600">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
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
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-md bg-black/50 text-xs text-zinc-500 font-mono">
            app.warmy.io/inbox-test
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-[#0a0a0a]">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-white">Inbox Placement Test</h3>
            <p className="text-xs text-zinc-500">Last test: Today at 2:34 PM • 35 providers</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500 text-white text-xs font-medium">
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
            <p className="text-xs text-zinc-500">91% placement</p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-medium text-yellow-500">Spam</span>
            </div>
            <p className="text-3xl font-bold text-yellow-500">2</p>
            <p className="text-xs text-zinc-500">6% placement</p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-4 h-4 text-zinc-500" />
              <span className="text-xs font-medium text-zinc-500">Missing</span>
            </div>
            <p className="text-3xl font-bold text-white">1</p>
            <p className="text-xs text-zinc-500">3% missing</p>
          </div>
        </div>

        {/* Provider table */}
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-3 bg-white/5 text-xs font-medium text-zinc-500">
            <div className="col-span-4">Provider</div>
            <div className="col-span-6">Placement</div>
            <div className="col-span-2 text-right">Status</div>
          </div>
          
          {providers.map((provider, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 p-3 border-t border-white/5 items-center">
              <div className="col-span-4 flex items-center gap-2">
                <span className="text-base">{provider.icon}</span>
                <span className="text-sm font-medium text-white">{provider.name}</span>
              </div>
              <div className="col-span-6">
                <div className="flex items-center gap-1 h-3 rounded-full overflow-hidden bg-white/10">
                  <div 
                    className="h-full bg-green-500 rounded-l-full" 
                    style={{ width: `${provider.inbox}%` }} 
                  />
                  <div 
                    className="h-full bg-yellow-500" 
                    style={{ width: `${provider.spam}%` }} 
                  />
                  <div 
                    className="h-full bg-zinc-700 rounded-r-full" 
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
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-md bg-black/50 text-xs text-zinc-500 font-mono">
            app.warmy.io/domain-health
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-[#0a0a0a]">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">company.com</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-500 font-medium">All checks passing</span>
                <span className="text-zinc-500">• Last scan 5 min ago</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-500">100%</p>
            <p className="text-xs text-zinc-500">Health Score</p>
          </div>
        </div>

        {/* Authentication checks */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-3">Authentication</h4>
          <div className="space-y-2">
            {checks.map((check, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{check.name}</p>
                    <p className="text-[10px] text-zinc-500 font-mono truncate max-w-[200px]">{check.value}</p>
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
            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Blacklist Monitoring</h4>
            <span className="text-xs text-zinc-500">100+ databases checked</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {blacklists.map((bl, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-white/5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-zinc-300">{bl.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
