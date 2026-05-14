/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Routes, 
  Route, 
  Link, 
  useNavigate, 
  useLocation 
} from "react-router-dom";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  MapPin, 
  User as UserIcon, 
  BookOpen, 
  Plus, 
  Edit,
  Edit2, 
  Trash2, 
  LogOut,
  ChevronDown,
  Activity,
  Trophy,
  Zap,
  Target,
  BarChart3,
  Clock,
  Settings,
  Bell,
  History,
  Eye,
  Rss,
  ExternalLink
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import type { Book, UserRole } from "@/src/types";

const CATEGORIES = ["All Departments", "Classic", "Sci-Fi", "Programming", "Fantasy", "Mystery", "History"];

// --- COMPONENTS ---

const Header = ({ 
  role, 
  setSearchQuery, 
  searchQuery, 
  selectedCategory, 
  setSelectedCategory,
  onAddBook 
}: { 
  role: UserRole; 
  setSearchQuery: (s: string) => void;
  searchQuery: string;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  onAddBook: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <header className={cn(
      "h-16 bg-white/70 backdrop-blur-xl border-b border-slate-200 text-slate-900 flex items-center px-6 shrink-0 z-[60] fixed top-0 w-full transition-all",
      role && "lg:left-72 lg:w-[calc(100%-18rem)]"
    )}>
      <Link to="/" className="flex items-center gap-3 mr-12 transition-all hover:opacity-80">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.2)]">
          <Activity className="w-6 h-6 text-white" strokeWidth={3} />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-display font-black tracking-tighter leading-none">NEXUS<span className="text-blue-600">GRID</span></span>
          <span className="text-[8px] font-mono font-bold tracking-[0.3em] text-slate-400 uppercase">v3.0.0-PRO</span>
        </div>
      </Link>

      <nav className="hidden xl:flex items-center gap-6 mr-10 border-r border-slate-100 pr-10">
        {(["Student", "Employee", "Admin"] as UserRole[]).map(r => (
          <Link 
            key={r} 
            to={`/${r.toLowerCase()}`}
            className={cn(
              "text-[10px] font-black uppercase tracking-[0.2em] transition-all relative py-2",
              role === r ? "text-blue-600" : "text-slate-400 hover:text-slate-900"
            )}
          >
            {r}
            {role === r && (
              <motion.div layoutId="activePortal" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </Link>
        ))}
      </nav>

      <div className="flex-1 max-w-xl flex h-11 group">
        <div className="relative flex w-full h-full bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden focus-within:border-blue-500/50 transition-all">
          <select 
            className="bg-transparent text-slate-500 text-[10px] uppercase font-bold px-4 outline-none hover:text-slate-900 cursor-pointer transition-colors border-r border-slate-200"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {CATEGORIES.map(c => <option key={c} value={c} className="bg-white">{c}</option>)}
          </select>
          <input 
            type="text" 
            placeholder="ACCESS GLOBAL DATA ARCHIVE..." 
            className="flex-1 px-5 text-slate-900 outline-none text-xs font-mono bg-transparent placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-6 hover:bg-slate-200/50 transition-all flex items-center justify-center group/btn">
            <Search className="w-4 h-4 text-blue-600 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="relative group/bell">
            <Bell className="w-5 h-5 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
          </div>
          <div className="h-10 w-10 p-[1px] bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-sm">
            <div className="w-full h-full bg-white rounded-[15px] flex items-center justify-center font-mono text-xs font-bold text-slate-800">
              {role[0]}{role[role.length-1].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const SubNav = ({ role, onAddBook }: { role: UserRole; onAddBook: () => void }) => (
  <nav className={cn(
    "h-11 bg-white/70 backdrop-blur-xl border-b border-slate-200 flex items-center px-6 gap-8 text-[9px] font-black uppercase tracking-[0.2em] shrink-0 z-[50] fixed top-16 w-full transition-all",
    role && "lg:left-72 lg:w-[calc(100%-18rem)]"
  )}>
    <Link to={`/${role.toLowerCase()}`} className="text-blue-600 h-full flex items-center border-b-[2px] border-blue-600">Overview</Link>
    <Link to="/catalog" className="text-slate-400 hover:text-slate-900 transition-colors h-full flex items-center">Archive</Link>
    <Link to="/blog" className="text-slate-400 hover:text-slate-900 transition-colors h-full flex items-center">Blog Hub</Link>
    <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors h-full flex items-center">Telemetry</a>
    <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors h-full flex items-center">Neural Base</a>
    
    {(role === "Employee" || role === "Admin") && (
      <div className="ml-auto">
        <button 
          onClick={onAddBook}
          className="bg-blue-600 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all hover:shadow-[0_10px_30px_rgba(37,99,235,0.3)] active:scale-95 group"
        >
          <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" strokeWidth={4} /> Add New Book
        </button>
      </div>
    )}
  </nav>
);

const Footer = ({ role, isLanding }: { role: UserRole; isLanding?: boolean }) => (
  <footer className={cn(
    "h-10 bg-white/80 backdrop-blur-xl border-t border-slate-200 px-6 flex items-center justify-between text-[8px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em] shrink-0 fixed bottom-0 w-full z-[60] transition-all",
    !isLanding && "lg:left-72 lg:w-[calc(100%-18rem)]",
    isLanding && "bg-transparent border-none"
  )}>
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
        <span className="text-blue-600">LINK ESTABLISHED</span>
      </div>
      <div className="w-px h-3 bg-slate-200"></div>
      <div className="text-slate-700">ENCRYPTED // {role.toUpperCase()}</div>
    </div>
    <div className="flex gap-8 items-center">
      <span className="flex items-center gap-2"><Clock className="w-3 h-3 opacity-30" /> {new Date().toLocaleTimeString()}</span>
      <span>LATENCY: 14MS</span>
      <span className="opacity-50 tracking-[0.4em]">© MMXXIV NEXUS GRID</span>
    </div>
  </footer>
);

// Data sets for the Global Data Flux chart
const WEEKLY_DATA = [
  { name: "The Midnight Library", loans: 28, fill: "#2563eb" },
  { name: "Atomic Habits", loans: 22, fill: "#4f46e5" },
  { name: "Evelyn Hugo", loans: 19, fill: "#3b82f6" },
  { name: "It Ends with Us", loans: 15, fill: "#6366f1" },
  { name: "Project Hail Mary", loans: 12, fill: "#0ea5e9" },
  { name: "Verity", loans: 10, fill: "#8b5cf6" },
];

const MONTHLY_DATA = [
  { name: "The Midnight Library", loans: 120, fill: "#2563eb" },
  { name: "Atomic Habits", loans: 95, fill: "#4f46e5" },
  { name: "Evelyn Hugo", loans: 88, fill: "#3b82f6" },
  { name: "It Ends with Us", loans: 82, fill: "#6366f1" },
  { name: "Project Hail Mary", loans: 76, fill: "#0ea5e9" },
  { name: "Verity", loans: 70, fill: "#8b5cf6" },
];

const PortalHome = ({ 
  role, 
  stats, 
  books, 
  onView,
  onEdit,
  onDelete
}: { 
  role: UserRole; 
  stats: any; 
  books: Book[]; 
  onView: (b: Book) => void;
  onEdit: (b: Book) => void;
  onDelete: (id: string) => void;
}) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(5);
  const [fluxMode, setFluxMode] = useState<"Weekly" | "Monthly">("Weekly");
  
  const recentBooks = [...books]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const displayedRecent = recentBooks.slice(0, visibleCount);
  const currentFluxData = fluxMode === "Weekly" ? WEEKLY_DATA : MONTHLY_DATA;

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-900 overflow-y-auto p-10 pt-36 pb-20 font-sans custom-scrollbar">
      {/* Nexus Hero */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="relative h-[480px] rounded-[3rem] overflow-hidden border border-slate-200 group shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_#e2e8f0,_transparent)]"></div>
          <img 
            src={role === "Student" 
              ? "https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=2000"
              : "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            } 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply transition-transform duration-1000 group-hover:scale-110"
            alt="Nexus"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40"></div>
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-8 bg-blue-600/30"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">Secure Protocol</span>
              <div className="h-px w-8 bg-blue-600/30"></div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-7xl font-display font-black tracking-tighter uppercase leading-[0.9] mb-8"
            >
              {role === "Student" ? "Access The" : "Oversee The"} <br />
              <span className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow italic leading-tight">Knowledge Core</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed mb-12"
            >
              System status optimized. Synchronizing with global archive grid {role === "Student" ? "SEC-7" : "ALPHA-1"}. 
              Quantum indexing of {books.length} units complete and verified.
            </motion.p>
            
            <div className="flex gap-6">
              <button 
                onClick={() => navigate("/catalog")}
                className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center gap-4 hover:bg-blue-600 transition-all transform hover:-translate-y-1 hover:shadow-2xl shadow-xl"
              >
                <Zap className="w-5 h-5 fill-current" /> Initialize Archive
              </button>
              <button className="bg-white/50 backdrop-blur-xl text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/80 transition-all">
                Core Specs
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 glass-card p-10 rounded-[2.5rem] relative overflow-hidden group border-r border-t border-slate-100">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-100/50 rounded-full blur-[100px] group-hover:bg-indigo-200/50 transition-all duration-700"></div>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Grid Traffic</h3>
            <div className="flex items-end gap-3 mt-4">
              <span className="text-7xl font-display font-black tracking-tighter italic text-slate-900 leading-none">{stats.activeLoans || "1.2K"}</span>
              <span className="text-sm font-black text-indigo-600 pb-3 uppercase tracking-widest leading-none">Active Links</span>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[2.5rem] hover:neon-border transition-all flex flex-col justify-between">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Sync Status</h3>
              <div className="text-3xl font-display font-bold italic tracking-tighter uppercase leading-none">99.8% READY</div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[2.5rem] hover:neon-border transition-all flex flex-col justify-between">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shadow-sm">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Node Efficiency</h3>
              <div className="text-3xl font-display font-bold italic tracking-tighter uppercase leading-none">MAX PEAK</div>
            </div>
          </div>
        </div>

        {/* Data Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* Histogram Section */}
          <div className="lg:col-span-2 glass-card p-10 rounded-[3rem] h-[500px] flex flex-col">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tighter italic">Global Data Flux</h3>
                <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.4em] mt-1">High-demand segments // MMXXIV</p>
              </div>
              <div className="flex gap-2 p-1.5 bg-slate-50 border border-slate-100 rounded-xl">
                <button 
                  onClick={() => setFluxMode("Weekly")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                    fluxMode === "Weekly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-900"
                  )}
                >
                  Weekly
                </button>
                <button 
                  onClick={() => setFluxMode("Monthly")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                    fluxMode === "Monthly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-900"
                  )}
                >
                  Monthly
                </button>
              </div>
            </div>
            
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentFluxData}>
                  <CartesianGrid strokeDasharray="10 10" stroke="#00000008" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#00000020" 
                    fontSize={9} 
                    tickFormatter={(val) => val.toUpperCase().split(" ").slice(0, 1).join(" ")}
                    axisLine={false}
                    tickLine={false}
                    dy={15}
                  />
                  <YAxis stroke="#00000020" fontSize={9} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', shadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#000', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                    cursor={{ fill: 'rgba(0, 0, 0, 0.02)' }}
                  />
                  <Bar dataKey="loans" radius={[4, 4, 0, 0]} barSize={40}>
                    {currentFluxData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} className="transition-all hover:opacity-80" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="glass-card p-10 rounded-[3rem] flex flex-col h-[500px]">
             <h3 className="text-2xl font-display font-black uppercase tracking-tighter mb-1 italic">Live Feed</h3>
             <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.4em] mb-10">Real-time integration log</p>
             
             <div className="flex-1 space-y-6 overflow-y-auto pr-3 custom-scrollbar">
               {displayedRecent.map((unit, idx) => (
                 <motion.div 
                   initial={{ x: 30, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: idx * 0.15 }}
                   key={unit.id} 
                   onClick={() => onView(unit)}
                   className="flex items-center gap-5 group cursor-pointer"
                 >
                   <div className="w-14 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100 p-1 bg-white transition-all group-hover:neon-border group-hover:scale-105">
                     <img src={unit.cover} className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-all grayscale group-hover:grayscale-0" alt="" />
                   </div>
                   <div className="min-w-0 flex-1">
                     <h4 className="text-[11px] font-black uppercase tracking-widest truncate group-hover:text-blue-600 transition-colors">{unit.title}</h4>
                     <p className="text-[9px] text-slate-400 font-bold uppercase truncate mt-0.5">Origin: {unit.author}</p>
                     <div className="flex items-center gap-3 mt-2">
                       <span className="text-[8px] font-mono px-2 py-0.5 bg-slate-100 rounded text-slate-500">{new Date(unit.createdAt).toLocaleTimeString()}</span>
                       <span className="text-[8px] text-indigo-600 font-black tracking-widest uppercase">Validated</span>
                     </div>
                   </div>
                   
                   {(role === "Admin" || role === "Employee") && (
                     <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                         onClick={(e) => { e.stopPropagation(); onEdit(unit); }}
                         className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 border border-slate-100 transition-all"
                       >
                         <Edit className="w-3 h-3" />
                       </button>
                       <button 
                         onClick={(e) => { e.stopPropagation(); onDelete(unit.id); }}
                         className="p-2 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-100 transition-all"
                       >
                         <Trash2 className="w-3 h-3" />
                       </button>
                     </div>
                   )}
                 </motion.div>
               ))}

               {visibleCount < recentBooks.length && (
                 <button 
                   onClick={(e) => { e.stopPropagation(); setVisibleCount(prev => prev + 5); }}
                   className="w-full py-3 border border-dashed border-slate-200 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
                 >
                   Synchronize More Logs
                 </button>
               )}

               {recentBooks.length === 0 && (
                 <div className="h-full flex flex-col items-center justify-center text-slate-200">
                   <History className="w-12 h-12 mb-4" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Archive Empty</span>
                 </div>
               )}
             </div>
             
             <button 
              onClick={() => navigate("/catalog")}
              className="mt-8 w-full py-4 rounded-2xl border border-slate-200 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all group overflow-hidden relative"
             >
                <div className="absolute inset-0 bg-blue-600/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform"></div>
                Access Full Manifest
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CatalogView = ({ 
  books, 
  role, 
  onEdit, 
  onDelete, 
  onView,
  selectedCategory, 
  setSelectedCategory,
  searchQuery
}: any) => {
  const navigate = useNavigate();
  const filtered = books.filter((b: any) => {
    const s = searchQuery.toLowerCase();
    const mSearch = b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s);
    const mCat = selectedCategory === "All Departments" || b.category === selectedCategory || b.department === selectedCategory;
    return mSearch && mCat;
  });

  return (
    <div className="flex-1 bg-[#f8fafc] pt-40 pb-20 px-8 font-sans overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-200 pb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Scanning Protocols Active</span>
            </div>
            <h2 className="text-5xl font-display font-black tracking-tighter uppercase italic leading-none">
              Knowledge <span className="text-slate-200">Archive Manifest</span>
            </h2>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="text-4xl font-display font-black italic tracking-tighter text-indigo-600">{filtered.length}</span>
            <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em]">Direct Links Found</p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-slate-200",
                selectedCategory === cat 
                  ? "bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)]" 
                  : "bg-white text-slate-400 hover:text-slate-900 hover:border-slate-300"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((book: any, idx: number) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={book.id}
                className="group relative"
                onClick={() => onView(book)}
              >
                <div className="glass-card cursor-pointer rounded-[2.5rem] p-5 h-full flex flex-col transition-all hover:neon-border group-hover:-translate-y-3 group-hover:shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-6 shadow-xl border border-slate-100">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest text-blue-600 border border-slate-200">
                       {book.department || book.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative flex-1 flex flex-col">
                    <h3 className="text-sm font-display font-black uppercase tracking-tight line-clamp-2 mb-1 transition-colors group-hover:text-blue-600">{book.title}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-6 italic tracking-widest leading-none">{book.author}</p>
                    
                    <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono font-bold text-slate-300 uppercase tracking-tighter">Stock ID</span>
                        <span className="text-[9px] font-mono font-bold text-slate-500">#{book.id.slice(-4).toUpperCase()}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        {(role === "Admin" || role === "Employee") && (
                          <>
                            <button 
                              onClick={(e) => { e.stopPropagation(); onEdit(book); }}
                              className="p-2.5 bg-slate-50 hover:bg-blue-50 rounded-xl transition-all border border-slate-100 hover:border-blue-200"
                            >
                              <Edit className="w-3.5 h-3.5 text-blue-600" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); onDelete(book.id); }}
                              className="p-2.5 bg-slate-50 hover:bg-red-50 rounded-xl transition-all border border-slate-100 hover:border-red-200"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                          </>
                        )}
                        <button 
                          onClick={(e) => { e.stopPropagation(); onView(book); }}
                          className="p-2.5 bg-slate-900 text-white hover:bg-indigo-600 rounded-xl transition-all shadow-lg active:scale-90"
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-40 flex flex-col items-center justify-center text-slate-200">
            <Search className="w-24 h-24 mb-6 opacity-20 animate-pulse" />
            <h3 className="text-3xl font-display font-black uppercase tracking-tighter italic text-center text-slate-300">No Data Nodes Found</h3>
            <p className="text-xs font-mono font-bold tracking-[0.5em] mt-3 uppercase text-slate-400">Reset scanning filters</p>
            <button 
              onClick={() => setSelectedCategory("All Departments")}
              className="mt-10 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:shadow-xl transition-all"
            >
              Reset Protocol
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const BlogView = ({ books }: { books: Book[] }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  // Map only from actual books in database
  const blogPosts = books.map((book) => ({
    id: book.id,
    title: `The Global Impact of ${book.title}: A Telemetric Review`,
    excerpt: `Exploring the neural resonance and cultural architecture of ${book.author}'s masterwork within the Nexus Grid ecosystem.`,
    link: "https://medium.com",
    publishedAt: new Date(book.createdAt).toLocaleDateString(),
    image: book.cover,
    author: "Nexus Editorial"
  }));

  const displayedPosts = blogPosts.slice(0, visibleCount);

  return (
    <div className="flex-1 bg-[#f8fafc] pt-40 pb-20 px-8 font-sans overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-200 pb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Rss className="w-4 h-4 text-indigo-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Thought Stream // Hub</span>
            </div>
            <h2 className="text-5xl font-display font-black tracking-tighter uppercase italic leading-none">
              Nexus <span className="text-slate-200">Thought Hub</span>
            </h2>
          </div>
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em] max-w-xs text-right">
            Curated telemetric articles covering human literature and neural indexing protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedPosts.map((post, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={post.id}
              className="group"
            >
              <div className="glass-card rounded-[3rem] overflow-hidden flex flex-col h-full border border-slate-100 hover:neon-border transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                    alt="" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-900 border border-slate-200">
                    Telemetric Log
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] font-mono font-black text-indigo-600 uppercase tracking-widest">{post.publishedAt}</span>
                    <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.author}</span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-black uppercase tracking-tighter italic mb-4 leading-none group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition-all group/link"
                  >
                    Read on Medium <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < blogPosts.length && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-12 py-5 rounded-full bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-600 transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3 group"
            >
              Synchronize More Records <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>("Student");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate telemetric authentication
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/${selectedRole.toLowerCase()}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Neural Network Aesthetic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(30,58,138,0.15),_transparent_70%)]"></div>
        <div className="absolute w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="glass-card rounded-[3rem] p-12 border border-white/5 shadow-2xl backdrop-blur-3xl bg-white/5">
          <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] mb-8">
              <Activity className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <h1 className="text-4xl font-display font-black tracking-tighter text-white uppercase italic leading-none mb-4">
              Nexus<span className="text-blue-500">Grid</span>
            </h1>
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.4em]">Integrated Telemetric Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="grid grid-cols-1 gap-4">
              {(["Student", "Employee", "Admin"] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={cn(
                    "relative px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all overflow-hidden border",
                    selectedRole === r 
                      ? "bg-blue-600/10 border-blue-500/50 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                      : "bg-white/5 border-white/5 text-slate-500 hover:border-white/10"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      {r === "Student" && <BookOpen className="w-4 h-4" />}
                      {r === "Employee" && <UserIcon className="w-4 h-4" />}
                      {r === "Admin" && <Settings className="w-4 h-4" />}
                      {r} Portal
                    </span>
                    {selectedRole === r && (
                      <motion.div layoutId="auth-check" className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,1)]"></motion.div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="TELEMETRIC ID" 
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-[11px] font-mono text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-all"
                  required
                />
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="ENCRYPTION KEY" 
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-[11px] font-mono text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Syncing...</span>
                </div>
              ) : (
                <>Initialize Access <Zap className="w-4 h-4 fill-white" /></>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest italic">
              Authorization level: {selectedRole.toUpperCase()} // Secure Uplink 4.0
            </p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center gap-8">
          <Link to="/" className="text-[9px] font-black text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Return to Surface</Link>
          <span className="text-slate-800">|</span>
          <a href="#" className="text-[9px] font-black text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Emergency Protocol</a>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN APP ---

const LandingPage = () => {
  const navigate = useNavigate();
  
  const portals = [
    {
      id: "student",
      title: "Student Portal",
      desc: "Access learning resources, courses, and digital archive nodes.",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      id: "employee",
      title: "Staff Nexus",
      desc: "Manage inventory, update registers, and oversee unit deployment.",
      icon: <UserIcon className="w-8 h-8" />,
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-600"
    },
    {
      id: "admin",
      title: "Grid Admin",
      desc: "System-level oversight, telemetric audits, and master protocols.",
      icon: <Settings className="w-8 h-8" />,
      color: "bg-slate-800",
      lightColor: "bg-slate-100",
      textColor: "text-slate-800"
    }
  ];

  return (
    <div className="flex-1 bg-white flex flex-col relative overflow-hidden">
      {/* Simple Landing Header */}
      <header className="h-20 flex items-center justify-between px-10 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" strokeWidth={3} />
          </div>
          <span className="text-xl font-display font-black tracking-tighter text-slate-900">NEXUS<span className="text-blue-600">GRID</span></span>
        </div>
        <div className="flex gap-8 items-center">
           <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <a href="#" className="hover:text-blue-600 transition-colors">Solutions</a>
             <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
           </div>
           <Link to="/login" className="bg-slate-900 text-white px-8 py-2.5 rounded-full hover:bg-blue-600 transition-all text-[10px] font-black uppercase tracking-widest">
             Initialize Access
           </Link>
        </div>
      </header>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-400 blur-[150px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-400 blur-[120px] rounded-full"></div>
      </div>

      <main className="relative flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-12">
        <div className="max-w-4xl w-full text-center mb-20">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Unified Knowledge System v3.0</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] mb-8 text-slate-900"
          >
            Welcome to <br />
            <span className="text-blue-600 italic">Nexus Grid</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 font-medium max-w-2xl mx-auto"
          >
            The world's most advanced digital knowledge archive and management ecosystem. 
            Select your access level below to initialize portal synchronization.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {portals.map((p, idx) => (
            <motion.div
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              key={p.id}
              onClick={() => navigate("/login")}
              className="group cursor-pointer"
            >
              <div className="bg-white border border-slate-200 p-10 rounded-[3rem] h-full flex flex-col transition-all hover:border-blue-200 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
                <div className={cn("absolute inset-y-0 right-0 w-1.5 transition-all group-hover:w-3", p.color)}></div>
                
                <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm", p.lightColor, p.textColor)}>
                  {p.icon}
                </div>
                
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter mb-4 italic group-hover:text-blue-600 leading-none">{p.title}</h3>
                <p className="text-base text-slate-500 font-medium leading-relaxed mb-10 flex-1">{p.desc}</p>
                
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 border-t border-slate-100 pt-8 mt-auto">
                  Initialize Authentication <Zap className="w-3 h-3 fill-current animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

const Sidebar = ({ role, onAddBook }: { role: UserRole; onAddBook: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <aside className="w-72 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 z-[55] flex flex-col hidden lg:flex">
      <div className="h-16 flex items-center px-8 border-b border-slate-50">
        <Link to="/" className="flex items-center gap-3 transition-all hover:opacity-80">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
            <Activity className="w-5 h-5 text-white" strokeWidth={3} />
          </div>
          <span className="text-lg font-display font-black tracking-tighter text-slate-900">NEXUS<span className="text-blue-600">GRID</span></span>
        </Link>
      </div>

      <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
        <div className="mb-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 px-4">Navigation</h3>
          <nav className="space-y-2">
            {[
              { id: 'student', label: 'Student Portal', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'employee', label: 'Staff Nexus', icon: <UserIcon className="w-4 h-4" /> },
              { id: 'admin', label: 'Grid Admin', icon: <Settings className="w-4 h-4" /> },
              { id: 'catalog', label: 'Archive Manifest', icon: <History className="w-4 h-4" /> },
              { id: 'blog', label: 'Thought Hub', icon: <Rss className="w-4 h-4" /> },
            ].map(item => (
              <Link 
                key={item.id}
                to={`/${item.id}`}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all",
                  (location.pathname === `/${item.id}`) || (item.id === "student" && location.pathname === "/student")
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mb-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 px-4">Stats & Tools</h3>
          <div className="space-y-6 px-4">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                <span>CORE INTEGRITY</span>
                <span>99.8%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[99.8%]" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                <span>INDEX CAPACITY</span>
                <span>72%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[72%]" />
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 italic">Optimization</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                Hyper-threading enabled. Knowledge nodes syncing at peak velocity.
              </p>
            </div>

            {(role === "Employee" || role === "Admin") && (
              <button 
                onClick={onAddBook}
                className="w-full mt-4 bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
              >
                <Plus className="w-4 h-4" /> Register Unit
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
             <Trophy className="w-5 h-5 text-indigo-600" />
           </div>
           <div className="flex flex-col">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Achiever</span>
             <span className="text-[11px] font-display font-black uppercase italic tracking-tighter">Elite Rank</span>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Departments");
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [viewingBook, setViewingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Partial<Book>>({});

  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isLogin = location.pathname === "/login";
  const currentPath = location.pathname.split("/")[1] || "student";
  const role: UserRole = (isLanding || isLogin) ? "Student" : (currentPath.charAt(0).toUpperCase() + currentPath.slice(1) as UserRole);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
  };

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingBook ? "PUT" : "POST";
    const url = editingBook ? `/api/books/${editingBook.id}` : "/api/books";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setIsAddingBook(false);
    setEditingBook(null);
    setFormData({});
    fetchBooks();
  };

  const handleDeleteBook = async (id: string) => {
    if (confirm("Execute Deletion Protocol?")) {
      await fetch(`/api/books/${id}`, { method: "DELETE" });
      fetchBooks();
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white",
      (isLanding || isLogin) && "bg-white"
    )}>
      {!isLanding && !isLogin && (
        <>
          <Sidebar role={role} onAddBook={() => setIsAddingBook(true)} />
          <Header 
            role={role} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddBook={() => {}}
          />
          <SubNav role={role} onAddBook={() => setIsAddingBook(true)} />
        </>
      )}

      <div className={cn("flex-1 flex flex-col", !isLanding && !isLogin && "lg:pl-72")}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student" element={<PortalHome role="Student" stats={{ activeLoans: 842 }} books={books} onView={(b) => setViewingBook(b)} onEdit={(b) => { setEditingBook(b); setFormData(b); setIsAddingBook(true); }} onDelete={handleDeleteBook} />} />
          <Route path="/employee" element={<PortalHome role="Employee" stats={{ activeLoans: 2541 }} books={books} onView={(b) => setViewingBook(b)} onEdit={(b) => { setEditingBook(b); setFormData(b); setIsAddingBook(true); }} onDelete={handleDeleteBook} />} />
          <Route path="/admin" element={<PortalHome role="Admin" stats={{ activeLoans: "GRID MASTER" }} books={books} onView={(b) => setViewingBook(b)} onEdit={(b) => { setEditingBook(b); setFormData(b); setIsAddingBook(true); }} onDelete={handleDeleteBook} />} />
          <Route path="/catalog" element={
            <CatalogView 
              books={books} 
              role={role} 
              onEdit={(b: Book) => { setEditingBook(b); setFormData(b); setIsAddingBook(true); }}
              onDelete={handleDeleteBook}
              onView={(b: Book) => setViewingBook(b)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
            />
          } />
          <Route path="/blog" element={<BlogView books={books} />} />
        </Routes>

        {!isLogin && <Footer role={role} isLanding={isLanding} />}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isAddingBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white text-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h2 className="font-black text-xl italic uppercase tracking-tighter">
                    {editingBook ? "Telemetric Modification" : "Unit Registration"}
                  </h2>
                </div>
                <button 
                  onClick={() => setIsAddingBook(false)} 
                  className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSaveBook} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest italic">Asset Title</label>
                    <input 
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-medium transition-all"
                      value={formData.title || ""}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest italic">Author Name</label>
                    <input 
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-medium transition-all"
                      value={formData.author || ""}
                      onChange={e => setFormData({...formData, author: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest italic">Catalogue Code (ISBN)</label>
                    <input 
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-medium transition-all"
                      value={formData.isbn || ""}
                      onChange={e => setFormData({...formData, isbn: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest italic">Segment</label>
                    <select 
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-medium appearance-none"
                      value={formData.category || ""}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="" className="bg-white">Select Sector</option>
                      {CATEGORIES.slice(1).map(c => <option key={c} value={c} className="bg-white">{c}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest italic">Asset Telemetry (Image URL)</label>
                    <input 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-xs font-mono"
                      value={formData.cover || ""}
                      onChange={e => setFormData({...formData, cover: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsAddingBook(false)}
                    className="flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-black bg-slate-900 hover:bg-blue-600 text-white shadow-lg text-xs uppercase tracking-widest transition-all"
                  >
                    Execute Sync
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Detail Modal */}
      <AnimatePresence>
        {viewingBook && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="bg-white text-slate-900 w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row h-auto max-h-[90vh]"
            >
              <div className="w-full md:w-2/5 relative h-64 md:h-auto overflow-hidden bg-slate-100">
                <img 
                  src={viewingBook.cover} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105"
                  alt={viewingBook.title} 
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-blue-600 border border-slate-200">
                  {viewingBook.category}
                </div>
              </div>
              
              <div className="flex-1 p-10 md:p-16 flex flex-col overflow-y-auto">
                <div className="flex justify-between items-start mb-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Unit Identification Verified</span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">ID: {viewingBook.id.slice(0, 8).toUpperCase()}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase mb-4 italic leading-none">{viewingBook.title}</h2>
                    <p className="text-xl text-slate-400 font-bold uppercase tracking-[0.2em] italic">Origin: {viewingBook.author}</p>
                  </div>
                  <button 
                    onClick={() => setViewingBook(null)}
                    className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
                  >
                    &times;
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Catalogue Code</span>
                    <span className="text-sm font-mono font-bold text-slate-900">{viewingBook.isbn || "UNASSIGNED"}</span>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Registration Date</span>
                    <span className="text-sm font-mono font-bold text-slate-900">{new Date(viewingBook.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap gap-4">
                  {(role === "Admin" || role === "Employee") && (
                    <>
                      <button 
                        onClick={() => {
                          setEditingBook(viewingBook);
                          setFormData(viewingBook);
                          setViewingBook(null);
                          setIsAddingBook(true);
                        }}
                        className="flex-1 min-w-[140px] py-4 rounded-2xl font-black bg-slate-900 text-white shadow-xl hover:bg-blue-600 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3"
                      >
                        <Edit2 className="w-4 h-4" /> Telemetric Mod
                      </button>
                      <button 
                        onClick={() => {
                          handleDeleteBook(viewingBook.id);
                          setViewingBook(null);
                        }}
                        className="px-8 py-4 rounded-2xl font-black border border-red-100 text-red-500 hover:bg-red-50 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3"
                      >
                        <Trash2 className="w-4 h-4" /> Purge
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => setViewingBook(null)}
                    className="px-8 py-4 rounded-2xl font-black border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all text-xs uppercase tracking-widest"
                  >
                    Close Protocol
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

