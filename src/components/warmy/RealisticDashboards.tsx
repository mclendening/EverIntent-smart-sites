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
    <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-xl">
      {/* Browser chrome - compact */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#111111] border-b border-white/10">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-2 py-0.5 rounded bg-black/50 text-[10px] text-zinc-500 font-mono">
            app.warmy.io
          </div>
        </div>
      </div>

      {/* Dashboard content - compact */}
      <div className="p-3 bg-[#0a0a0a]">
        {/* Main score + stats grid */}
        <div className="grid grid-cols-12 gap-2">
          {/* Score gauge - compact */}
          <div className="col-span-5 p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-white">Score</span>
              <span className="flex items-center gap-0.5 text-[10px] text-orange-500">
                <ArrowUpRight className="w-2.5 h-2.5" />+12
              </span>
            </div>
            
            {/* Circular gauge - smaller */}
            <div className="relative w-20 h-20 mx-auto mb-2">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/10" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#gaugeGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="13" />
                <defs>
                  <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">98</span>
                <span className="text-[9px] text-zinc-500">/100</span>
              </div>
            </div>

            {/* Score breakdown - compact */}
            <div className="space-y-1">
              {[
                { label: 'Reputation', value: 96 },
                { label: 'Auth', value: 100 },
                { label: 'Content', value: 98 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-[10px]">
                  <span className="text-zinc-500">{item.label}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-12 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-orange-500" style={{ width: `${item.value}%` }} />
                    </div>
                    <span className="w-6 text-right text-white">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats cards - compact */}
          <div className="col-span-7 grid grid-cols-2 gap-1.5">
            {[
              { label: 'Sent', value: '12.8K', change: '+23%', icon: Mail },
              { label: 'Inbox', value: '96.8%', change: '+4%', icon: CheckCircle },
              { label: 'Opens', value: '42.3%', change: '+8%', icon: Activity },
              { label: 'Spam', value: '0.4%', change: '-1.8%', icon: Shield },
            ].map((stat) => (
              <div key={stat.label} className="p-2 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <stat.icon className="w-3 h-3 text-zinc-500" />
                  <span className="text-[9px] text-green-500">{stat.change}</span>
                </div>
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[9px] text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trend chart - compact */}
        <div className="mt-2 p-2 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-medium text-white">Trend</span>
            <div className="flex items-center gap-2 text-[9px]">
              <span className="flex items-center gap-1 text-zinc-400"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" />Inbox</span>
              <span className="flex items-center gap-1 text-zinc-400"><div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />Spam</span>
            </div>
          </div>
          
          <div className="h-12">
            <svg viewBox="0 0 400 50" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="inboxGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(249,115,22,0.4)" />
                  <stop offset="100%" stopColor="rgba(249,115,22,0)" />
                </linearGradient>
              </defs>
              <path d="M0,15 L66,12 L133,10 L200,8 L266,5 L333,4 L400,3 L400,50 L0,50 Z" fill="url(#inboxGradient)" />
              <path d="M0,15 L66,12 L133,10 L200,8 L266,5 L333,4 L400,3" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
              <circle cx="400" cy="3" r="2.5" fill="#f97316" />
            </svg>
          </div>
          <div className="flex justify-between text-[8px] text-zinc-500 mt-0.5">
            <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>Now</span>
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
    { day: 1, sent: 20 }, { day: 7, sent: 75 }, { day: 14, sent: 150 },
    { day: 21, sent: 350 }, { day: 30, sent: 500 },
  ];

  return (
    <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-xl">
      {/* Browser chrome - compact */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#111111] border-b border-white/10">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-2 py-0.5 rounded bg-black/50 text-[10px] text-zinc-500 font-mono">warm-up</div>
        </div>
      </div>

      <div className="p-3 bg-[#0a0a0a]">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-orange-500/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Warm-Up</h3>
              <p className="text-[10px] text-zinc-500">Day 21 of 30</p>
            </div>
          </div>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px]">
            <Circle className="w-1.5 h-1.5 fill-current" />Active
          </span>
        </div>

        {/* Stats row - compact */}
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {[
            { label: 'Today', value: '350', sub: 'emails' },
            { label: 'Reply', value: '95%', sub: 'rate' },
            { label: 'Total', value: '4.2K', sub: 'sent' },
            { label: 'Bounce', value: '0', sub: 'issues' },
          ].map((s) => (
            <div key={s.label} className="p-2 rounded-md bg-white/5 border border-white/10 text-center">
              <p className="text-sm font-bold text-white">{s.value}</p>
              <p className="text-[8px] text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Chart - compact */}
        <div className="p-2 rounded-md bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-medium text-white">Volume Ramp</span>
            <span className="text-[9px] text-orange-500">Target: 500/day</span>
          </div>
          <div className="h-16 flex items-end gap-1">
            {days.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-orange-500/80 rounded-t" style={{ height: `${(d.sent / 500) * 100}%` }} />
                <span className="text-[7px] text-zinc-500 mt-0.5">D{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline - compact */}
        <div className="mt-2 p-2 rounded-md bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span className="text-white">Progress</span>
            <span className="text-orange-500">70%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-orange-500 to-green-500" />
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
    { name: 'Gmail', inbox: 98 }, { name: 'Outlook', inbox: 96 },
    { name: 'Yahoo', inbox: 94 }, { name: 'iCloud', inbox: 97 },
  ];

  return (
    <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#111111] border-b border-white/10">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-2 py-0.5 rounded bg-black/50 text-[10px] text-zinc-500 font-mono">inbox-test</div>
        </div>
      </div>

      <div className="p-3 bg-[#0a0a0a]">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Inbox Test</h3>
            <p className="text-[10px] text-zinc-500">35 providers • 2:34 PM</p>
          </div>
          <button className="flex items-center gap-1 px-2 py-1 rounded bg-orange-500 text-white text-[10px]">
            <RefreshCw className="w-3 h-3" />Run
          </button>
        </div>

        {/* Summary - compact */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          <div className="p-2 rounded-md bg-green-500/10 border border-green-500/20 text-center">
            <p className="text-xl font-bold text-green-500">32</p>
            <p className="text-[9px] text-zinc-500">Inbox</p>
          </div>
          <div className="p-2 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-center">
            <p className="text-xl font-bold text-yellow-500">2</p>
            <p className="text-[9px] text-zinc-500">Spam</p>
          </div>
          <div className="p-2 rounded-md bg-white/5 border border-white/10 text-center">
            <p className="text-xl font-bold text-white">1</p>
            <p className="text-[9px] text-zinc-500">Missing</p>
          </div>
        </div>

        {/* Provider bars - compact */}
        <div className="space-y-1.5">
          {providers.map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              <span className="text-[10px] text-white w-12">{p.name}</span>
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${p.inbox}%` }} />
              </div>
              <span className="text-[10px] text-green-500 w-8 text-right">{p.inbox}%</span>
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
  const checks = ['SPF', 'DKIM', 'DMARC', 'PTR'];
  const blacklists = ['Spamhaus', 'Barracuda', 'SORBS', 'SpamCop', 'CBL', 'UCEPROTECT'];

  return (
    <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#111111] border-b border-white/10">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-2 py-0.5 rounded bg-black/50 text-[10px] text-zinc-500 font-mono">domain-health</div>
        </div>
      </div>

      <div className="p-3 bg-[#0a0a0a]">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">company.com</h3>
              <p className="text-[10px] text-green-500">All passing</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-green-500">100%</p>
            <p className="text-[9px] text-zinc-500">Health</p>
          </div>
        </div>

        {/* Auth checks - inline */}
        <div className="mb-3">
          <p className="text-[10px] text-zinc-500 mb-1.5">Authentication</p>
          <div className="flex flex-wrap gap-1.5">
            {checks.map((c) => (
              <div key={c} className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/10 border border-green-500/20">
                <Check className="w-3 h-3 text-green-500" />
                <span className="text-[10px] text-white">{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Blacklists - compact grid */}
        <div>
          <p className="text-[10px] text-zinc-500 mb-1.5">Blacklists (100+ checked)</p>
          <div className="grid grid-cols-3 gap-1">
            {blacklists.map((bl) => (
              <div key={bl} className="flex items-center gap-1 p-1 rounded bg-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[9px] text-zinc-300">{bl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
