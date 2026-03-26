import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Camera, 
  Activity, 
  Bell, 
  Settings, 
  Search, 
  User, 
  Shield, 
  Cpu, 
  HardDrive, 
  Wifi,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Menu,
  X,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Mock data for the chart
const activityData = [
  { time: '00:00', load: 45, traffic: 30 },
  { time: '04:00', load: 32, traffic: 25 },
  { time: '08:00', load: 68, traffic: 55 },
  { time: '12:00', load: 85, traffic: 75 },
  { time: '16:00', load: 72, traffic: 60 },
  { time: '20:00', load: 55, traffic: 45 },
  { time: '23:59', load: 40, traffic: 35 },
];

const devices = [
  { id: 'CAM-01', name: 'Asosiy Kirish', type: 'Kamera', status: 'online', load: '12%', uptime: '14d 2h' },
  { id: 'SRV-04', name: 'Ma\'lumotlar Markazi', type: 'Server', status: 'online', load: '64%', uptime: '128d 5h' },
  { id: 'SNS-12', name: 'Harorat Sensori', type: 'Sensor', status: 'warning', load: '2%', uptime: '45d 12h' },
  { id: 'CAM-02', name: 'Orqa Hovli', type: 'Kamera', status: 'offline', load: '0%', uptime: '0d 0h' },
  { id: 'SRV-01', name: 'Veb Server', type: 'Server', status: 'online', load: '42%', uptime: '12d 1h' },
];

const alerts = [
  { id: 1, type: 'danger', msg: 'CAM-02 aloqa uzildi', time: '2 daqiqa oldin' },
  { id: 2, type: 'warning', msg: 'SNS-12 harorat yuqori', time: '15 daqiqa oldin' },
  { id: 3, type: 'info', msg: 'Tizim yangilandi', time: '1 soat oldin' },
];

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-[#141414] text-[#E4E3E0] flex flex-col border-r border-white/10 z-50"
      >
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="font-bold tracking-tight text-lg"
            >
              KUZATUV
            </motion.span>
          )}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Boshqaruv" 
            active={activeTab === 'dashboard'} 
            isOpen={isSidebarOpen}
            onClick={() => setActiveTab('dashboard')}
          />
          <SidebarItem 
            icon={<Camera size={20} />} 
            label="Kameralar" 
            active={activeTab === 'cameras'} 
            isOpen={isSidebarOpen}
            onClick={() => setActiveTab('cameras')}
          />
          <SidebarItem 
            icon={<Cpu size={20} />} 
            label="Serverlar" 
            active={activeTab === 'servers'} 
            isOpen={isSidebarOpen}
            onClick={() => setActiveTab('servers')}
          />
          <SidebarItem 
            icon={<Activity size={20} />} 
            label="Tahlillar" 
            active={activeTab === 'analytics'} 
            isOpen={isSidebarOpen}
            onClick={() => setActiveTab('analytics')}
          />
          <div className="pt-4 pb-2 px-3">
            <div className={cn("h-px bg-white/10", !isSidebarOpen && "mx-auto w-8")} />
          </div>
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Sozlamalar" 
            active={activeTab === 'settings'} 
            isOpen={isSidebarOpen}
            onClick={() => setActiveTab('settings')}
          />
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 hover:bg-white/5 rounded transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#E4E3E0]">
        {/* Header */}
        <header className="h-16 border-b border-black/10 flex items-center justify-between px-8 bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={18} />
              <input 
                type="text" 
                placeholder="Qidiruv..." 
                className="pl-10 pr-4 py-2 bg-black/5 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-xs font-mono opacity-50 uppercase">Tizim vaqti</p>
              <p className="text-sm font-mono font-bold">{currentTime.toLocaleTimeString('uz-UZ')}</p>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-black/10">
              <button className="relative p-2 hover:bg-black/5 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-black/5 p-1 pr-3 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                  <User size={18} />
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold leading-tight">Admin</p>
                  <p className="text-[10px] opacity-50">Boshqaruvchi</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={<Monitor className="text-blue-600" />} 
              label="Faol Qurilmalar" 
              value="42" 
              trend="+3 bugun" 
            />
            <StatCard 
              icon={<AlertTriangle className="text-amber-600" />} 
              label="Ogohlantirishlar" 
              value="03" 
              trend="-12% kechagidan" 
              isWarning
            />
            <StatCard 
              icon={<Wifi className="text-green-600" />} 
              label="Tarmoq Yuklamasi" 
              value="1.2 Gbps" 
              trend="Barqaror" 
            />
            <StatCard 
              icon={<Clock className="text-purple-600" />} 
              label="Tizim Uptime" 
              value="99.9%" 
              trend="A'lo" 
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Chart Section */}
            <div className="xl:col-span-2 bg-white rounded-xl border border-black/5 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold">Tizim Faolligi</h3>
                  <p className="text-sm opacity-50 italic serif">Oxirgi 24 soatlik ko'rsatkichlar</p>
                </div>
                <div className="flex gap-4 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span>Yuklama</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>Trafik</span>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000010" />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#00000060' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#00000060' }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#141414', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="load" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorLoad)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="traffic" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorTraffic)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alerts Feed */}
            <div className="bg-white rounded-xl border border-black/5 p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6">So'nggi hodisalar</h3>
              <div className="space-y-4">
                {alerts.map(alert => (
                  <div key={alert.id} className="flex gap-4 p-3 rounded-lg bg-black/5 border border-black/5">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                      alert.type === 'danger' ? "bg-red-100 text-red-600" : 
                      alert.type === 'warning' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                    )}>
                      {alert.type === 'danger' ? <X size={18} /> : 
                       alert.type === 'warning' ? <AlertTriangle size={18} /> : <Bell size={18} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{alert.msg}</p>
                      <p className="text-[10px] opacity-50 font-mono mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 text-xs font-bold uppercase tracking-widest text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Barchasini ko'rish
              </button>
            </div>
          </div>

          {/* Device List */}
          <div className="bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <h3 className="text-lg font-bold">Qurilmalar holati</h3>
              <button className="text-xs font-bold text-blue-600 flex items-center gap-1">
                Filtr <ChevronRight size={14} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/5">
                    <th className="p-4 col-header">ID</th>
                    <th className="p-4 col-header">Nomi</th>
                    <th className="p-4 col-header">Turi</th>
                    <th className="p-4 col-header">Holat</th>
                    <th className="p-4 col-header">Yuklama</th>
                    <th className="p-4 col-header">Uptime</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map(device => (
                    <tr key={device.id} className="data-row">
                      <td className="p-4 text-xs font-mono font-bold">{device.id}</td>
                      <td className="p-4 text-sm font-medium">{device.name}</td>
                      <td className="p-4 text-xs opacity-60">{device.type}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            device.status === 'online' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" :
                            device.status === 'warning' ? "bg-amber-500" : "bg-red-500"
                          )} />
                          <span className="text-xs capitalize">{device.status}</span>
                        </div>
                      </td>
                      <td className="p-4 text-xs font-mono">{device.load}</td>
                      <td className="p-4 text-xs font-mono">{device.uptime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, isOpen, onClick }: { 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean, 
  isOpen: boolean,
  onClick: () => void 
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200",
        active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "hover:bg-white/5 text-white/60 hover:text-white"
      )}
    >
      <div className="shrink-0">{icon}</div>
      {isOpen && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm font-medium whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
    </button>
  );
}

function StatCard({ icon, label, value, trend, isWarning }: { 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  trend: string,
  isWarning?: boolean
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-black/5 rounded-lg">
          {icon}
        </div>
        <span className={cn(
          "text-[10px] font-mono font-bold px-2 py-1 rounded",
          isWarning ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
        )}>
          {trend}
        </span>
      </div>
      <p className="text-xs opacity-50 font-medium uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
