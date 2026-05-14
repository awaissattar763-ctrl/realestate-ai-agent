"use client";

import { useState, useRef, useEffect } from "react";
import { searchDummyProperties } from "@/lib/dummyProperties";
import { fakeAIResponse, analyzePropertyResults, noPropertiesFound } from "@/lib/fakeAI";

const AGENT_MODES = [
  { id: "search",  label: "Property Search",  icon: "🔎", color: "#00D4AA", desc: "Search live listings" },
  { id: "lead",    label: "Lead Gen",          icon: "🎯", color: "#FF6B6B", desc: "Qualify buyers & sellers" },
  { id: "listing", label: "Listing Writer",    icon: "📝", color: "#FFD93D", desc: "Generate property listings" },
  { id: "roi",     label: "ROI Calculator",    icon: "💰", color: "#6C5CE7", desc: "Investment return analysis" },
  { id: "market",  label: "Market Analysis",   icon: "📊", color: "#A8E063", desc: "Price trends & insights" },
  { id: "airbnb",  label: "Airbnb Optimizer",  icon: "🏡", color: "#FF8C42", desc: "Short-term rental strategy" },
];

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "0,212,170";
}

function formatMsg(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code style='background:#111827;padding:2px 6px;border-radius:4px;font-family:monospace;color:#00D4AA;font-size:12px'>$1</code>")
    .replace(/### (.*?)(\n|$)/g, "<div style='font-size:15px;font-weight:bold;color:#fff;margin:12px 0 6px'>$1</div>")
    .replace(/## (.*?)(\n|$)/g, "<div style='font-size:16px;font-weight:bold;color:#00D4AA;margin:14px 0 8px'>$1</div>")
    .replace(/\n/g, "<br/>");
}

function PropertyCard({ prop, color }) {
  const price  = prop.list_price ? `$${prop.list_price.toLocaleString()}` : "Price N/A";
  const beds   = prop.description?.beds  ?? "—";
  const baths  = prop.description?.baths ?? "—";
  const sqft   = prop.description?.sqft  ? `${prop.description.sqft.toLocaleString()} sqft` : "";
  const addr   = prop.location?.address?.line ?? "";
  const city   = prop.location?.address?.city ?? "";
  const state  = prop.location?.address?.state_code ?? "";
  const type   = prop.description?.type ?? "";
  const status = prop.status ?? "";
  const rgb    = hexToRgb(color);

  return (
    <div style={{
      background: `rgba(${rgb},0.04)`,
      border: `1px solid rgba(${rgb},0.22)`,
      borderRadius: 13, padding: "13px 15px", marginBottom: 9,
      transition: "all 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor=`rgba(${rgb},0.5)`; e.currentTarget.style.background=`rgba(${rgb},0.08)`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor=`rgba(${rgb},0.22)`; e.currentTarget.style.background=`rgba(${rgb},0.04)`; }}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:7 }}>
        <div>
          <div style={{ fontSize:17, fontWeight:"bold", color }}>{price}</div>
          <div style={{ fontSize:12, color:"#b0b0c8", marginTop:2 }}>{addr}{addr&&city?", ":""}{city} {state}</div>
        </div>
        {status && (
          <span style={{
            background:`rgba(${rgb},0.15)`, border:`1px solid rgba(${rgb},0.3)`,
            borderRadius:20, padding:"2px 9px", fontSize:10, color,
          }}>{status}</span>
        )}
      </div>
      <div style={{ display:"flex", gap:14, fontSize:12, color:"#808098", flexWrap:"wrap" }}>
        {beds!=="—"  && <span>🛏 {beds} beds</span>}
        {baths!=="—" && <span>🚿 {baths} baths</span>}
        {sqft        && <span>📐 {sqft}</span>}
        {type        && <span>🏠 {type}</span>}
      </div>
    </div>
  );
}

export default function RealEstateAgent() {
  const [messages,   setMessages]   = useState([]);
  const [input,      setInput]      = useState("");
  const [loading,    setLoading]    = useState(false);
  const [searching,  setSearching]  = useState(false);
  const [activeMode, setActiveMode] = useState(null);
  const [error,      setError]      = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQ,    setSearchQ]    = useState({ city:"", state:"" });

  const endRef   = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const fetchProperties = async (city, state) => {
    setSearching(true);
    try {
      // Simulate network delay
      await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
      return searchDummyProperties(city, state);
    } finally {
      setSearching(false);
    }
  };

  const startMode = async (mode) => {
    setActiveMode(mode.id);
    setError("");

    if (mode.id === "search") {
      setShowSearch(true);
      setMessages([{
        role: "assistant",
        content: "🔎 **Property Search Mode Active**\n\nEnter a city and state below — I'll show you **realistic listings** and analyze them for you!\n\n*Try these cities:* Houston TX, Austin TX, Dallas TX, Miami FL, Orlando FL, Los Angeles CA, New York NY, Chicago IL, Phoenix AZ, Seattle WA"
      }]);
      return;
    }

    setShowSearch(false);
    setLoading(true);
    try {
      const reply = await fakeAIResponse({ history: [], isInitialMode: true, mode: mode.id });
      setMessages([{ role: "assistant", content: reply }]);
    } catch (e) {
      setError(e.message);
      setMessages([]);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQ.city || !searchQ.state) {
      setError("Please enter both city and state");
      return;
    }
    setError("");

    const userMsg = { role: "user", content: `Search: Show me properties in ${searchQ.city}, ${searchQ.state}` };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);

    try {
      const homes = await fetchProperties(searchQ.city, searchQ.state);
      if (!homes.length) {
        const reply = noPropertiesFound(searchQ.city, searchQ.state);
        setMessages([...updated, { role: "assistant", content: reply }]);
      } else {
        // Simulate AI analysis delay
        await new Promise(r => setTimeout(r, 600));
        const reply = analyzePropertyResults(searchQ.city, searchQ.state, homes);
        setMessages([...updated, { role: "assistant", content: reply, properties: homes }]);
      }
    } catch (e) {
      setError(`Error: ${e.message}`);
      setMessages(updated);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    setError("");
    const userMsg = { role: "user", content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    try {
      const history = updated.filter(m => !m.hidden).map(m => ({ role: m.role, content: m.content }));
      const reply = await fakeAIResponse({ history });
      setMessages([...updated, { role: "assistant", content: reply }]);
    } catch (e) {
      setError(e.message);
      setMessages(updated);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  const reset = () => {
    setMessages([]);
    setActiveMode(null);
    setError("");
    setShowSearch(false);
  };

  const meta = AGENT_MODES.find(m => m.id === activeMode);

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#07070f 0%,#0b1420 60%,#07070f 100%)", fontFamily:"Georgia,serif", color:"#e0e0f0", display:"flex", flexDirection:"column" }}>

      {/* HEADER */}
      <div style={{ padding:"15px 18px", borderBottom:"1px solid rgba(0,212,170,0.1)", background:"rgba(0,0,0,0.4)", backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:11 }}>
          <div style={{ width:38,height:38, background:"linear-gradient(135deg,#00D4AA,#6C5CE7)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", fontSize:19, boxShadow:"0 0 16px rgba(0,212,170,0.3)" }}>🏢</div>
          <div>
            <div style={{ fontSize:16, fontWeight:"bold", color:"#fff" }}>RealEstate<span style={{ color:"#00D4AA" }}>AI</span> Agent</div>
            <div style={{ fontSize:9, color:"#505070", letterSpacing:"1px", textTransform:"uppercase" }}>Demo Mode · No API Keys Needed</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:7 }}>
          <span style={{ background:"rgba(0,212,170,0.14)", border:"1px solid rgba(0,212,170,0.3)", color:"#00D4AA", padding:"5px 11px", borderRadius:7, fontSize:11 }}>✨ DEMO</span>
          {messages.length>0 && <button onClick={reset} style={{ background:"rgba(255,107,107,0.1)", border:"1px solid rgba(255,107,107,0.25)", color:"#ff6b6b", padding:"5px 11px", borderRadius:7, cursor:"pointer", fontSize:11 }}>↺ Reset</button>}
        </div>
      </div>

      {/* HOME SCREEN */}
      {messages.length===0 && (
        <div style={{ padding:"22px 14px 0" }}>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:28 }}>🏠</div>
            <div style={{ fontSize:19, color:"#fff", margin:"6px 0 4px" }}>Real Estate Intelligence</div>
            <div style={{ fontSize:12, color:"#505070" }}>
              ✨ Fully Functional Demo · Built-in Realistic Data
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:9 }}>
            {AGENT_MODES.map(mode => (
              <button key={mode.id} onClick={()=>startMode(mode)}
                style={{ background:`linear-gradient(135deg,rgba(${hexToRgb(mode.color)},0.07),rgba(${hexToRgb(mode.color)},0.02))`, border:`1px solid rgba(${hexToRgb(mode.color)},0.2)`, borderRadius:13, padding:"15px 13px", cursor:"pointer", textAlign:"left", transition:"all 0.2s", position:"relative" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 22px rgba(${hexToRgb(mode.color)},0.16)`; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
              >
                <div style={{ fontSize:22, marginBottom:7 }}>{mode.icon}</div>
                <div style={{ fontSize:12, fontWeight:"bold", color:mode.color, marginBottom:3 }}>{mode.label}</div>
                <div style={{ fontSize:10, color:"#505070", lineHeight:1.4 }}>{mode.desc}</div>
              </button>
            ))}
          </div>
          <div style={{ marginTop:14, padding:"10px 14px", background:"rgba(0,212,170,0.06)", border:"1px solid rgba(0,212,170,0.2)", borderRadius:10, textAlign:"center", fontSize:11, color:"#00D4AA" }}>
            💡 This is a demo version — no API keys needed. All modes run on built-in data.
          </div>
        </div>
      )}

      {/* CHAT */}
      {messages.length>0 && (
        <div style={{ flex:1, overflowY:"auto", padding:"14px", display:"flex", flexDirection:"column", gap:12 }}>
          {meta && (
            <div style={{ textAlign:"center" }}>
              <span style={{ background:`rgba(${hexToRgb(meta.color)},0.1)`, border:`1px solid rgba(${hexToRgb(meta.color)},0.28)`, borderRadius:20, padding:"3px 13px", fontSize:10, color:meta.color }}>
                {meta.icon} {meta.label}
              </span>
            </div>
          )}

          {/* Search form */}
          {showSearch && (
            <div style={{ background:"rgba(0,212,170,0.04)", border:"1px solid rgba(0,212,170,0.18)", borderRadius:13, padding:"14px" }}>
              <div style={{ fontSize:12, color:"#00D4AA", marginBottom:11, fontWeight:"bold" }}>🔎 Property Search (Demo Data)</div>
              <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                <input placeholder="City (e.g. Houston)" value={searchQ.city} onChange={e=>setSearchQ(q=>({...q,city:e.target.value}))}
                  style={{ flex:2, minWidth:120, background:"rgba(0,0,0,0.3)", border:"1px solid rgba(0,212,170,0.22)", borderRadius:7, padding:"7px 11px", color:"#e0e0f0", fontSize:12, outline:"none" }}
                />
                <input placeholder="State (TX)" value={searchQ.state} onChange={e=>setSearchQ(q=>({...q,state:e.target.value}))}
                  style={{ flex:1, minWidth:60, background:"rgba(0,0,0,0.3)", border:"1px solid rgba(0,212,170,0.22)", borderRadius:7, padding:"7px 11px", color:"#e0e0f0", fontSize:12, outline:"none" }}
                />
                <button onClick={handleSearch} disabled={searching||loading}
                  style={{ background:"linear-gradient(135deg,#00D4AA,#00a88a)", border:"none", borderRadius:7, padding:"7px 16px", color:"#000", cursor:"pointer", fontWeight:"bold", fontSize:12 }}>
                  {searching?"Fetching…":"Search 🔍"}
                </button>
              </div>
              <div style={{ marginTop:7, fontSize:10, color:"#808098" }}>💡 Try: Houston/TX, Austin/TX, Miami/FL, Los Angeles/CA</div>
            </div>
          )}

          {/* Messages */}
          {messages.filter(m=>!m.hidden).map((msg,i) => (
            <div key={i}>
              <div style={{ display:"flex", justifyContent:msg.role==="user"?"flex-end":"flex-start", gap:7, alignItems:"flex-start" }}>
                {msg.role==="assistant" && <div style={{ width:28,height:28,minWidth:28, background:"linear-gradient(135deg,#00D4AA,#6C5CE7)", borderRadius:8, display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginTop:2 }}>🏢</div>}
                <div style={{
                  maxWidth:"76%",
                  background: msg.role==="user" ? "linear-gradient(135deg,#6C5CE7,#5340c0)" : "rgba(255,255,255,0.033)",
                  border: msg.role==="user" ? "none" : "1px solid rgba(255,255,255,0.065)",
                  borderRadius: msg.role==="user" ? "15px 15px 4px 15px" : "15px 15px 15px 4px",
                  padding:"10px 14px", fontSize:13, lineHeight:1.75,
                  color: msg.role==="user" ? "#fff" : "#c0c0dc",
                  boxShadow: msg.role==="user" ? "0 4px 13px rgba(108,92,231,0.25)" : "none",
                }} dangerouslySetInnerHTML={{ __html: formatMsg(msg.content) }} />
                {msg.role==="user" && <div style={{ width:28,height:28,minWidth:28, background:"rgba(108,92,231,0.22)", borderRadius:8, display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,marginTop:2 }}>👤</div>}
              </div>
              {msg.properties?.length>0 && (
                <div style={{ marginLeft:35, marginTop:9 }}>
                  <div style={{ fontSize:10, color:"#505070", marginBottom:7, letterSpacing:"0.5px" }}>📋 {msg.properties.length} LISTINGS FOUND</div>
                  {msg.properties.map((p,pi) => <PropertyCard key={pi} prop={p} color={meta?.color||"#00D4AA"} />)}
                </div>
              )}
            </div>
          ))}

          {(loading||searching) && (
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:28,height:28,background:"linear-gradient(135deg,#00D4AA,#6C5CE7)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14 }}>🏢</div>
              <div style={{ background:"rgba(255,255,255,0.033)",border:"1px solid rgba(255,255,255,0.065)",borderRadius:"15px 15px 15px 4px",padding:"10px 14px",display:"flex",gap:5,alignItems:"center" }}>
                {[0,1,2].map(i=><div key={i} style={{ width:6,height:6,background:"#00D4AA",borderRadius:"50%",animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
                <span style={{ marginLeft:5,fontSize:10,color:"#505070" }}>{searching?"Fetching properties…":"AI is analyzing…"}</span>
              </div>
            </div>
          )}

          {error && <div style={{ background:"rgba(255,107,107,0.07)",border:"1px solid rgba(255,107,107,0.22)",borderRadius:9,padding:"8px 13px",fontSize:11,color:"#ff6b6b" }}>❌ {error}</div>}
          <div ref={endRef}/>
        </div>
      )}

      {/* INPUT */}
      {messages.length>0 && (
        <div style={{ padding:"11px 14px", borderTop:"1px solid rgba(255,255,255,0.05)", background:"rgba(0,0,0,0.35)", backdropFilter:"blur(10px)" }}>
          <div style={{ display:"flex", gap:4, marginBottom:8, flexWrap:"wrap" }}>
            {AGENT_MODES.map(mode => (
              <button key={mode.id} onClick={()=>startMode(mode)} style={{
                background: activeMode===mode.id?`rgba(${hexToRgb(mode.color)},0.16)`:"rgba(255,255,255,0.03)",
                border:`1px solid ${activeMode===mode.id?`rgba(${hexToRgb(mode.color)},0.42)`:"rgba(255,255,255,0.06)"}`,
                borderRadius:20, padding:"3px 9px", color:activeMode===mode.id?mode.color:"#505070",
                cursor:"pointer", fontSize:10, transition:"all 0.15s",
              }}>{mode.icon} {mode.label}</button>
            ))}
          </div>
          <div style={{ display:"flex", gap:7 }}>
            <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMessage()}
              placeholder="Type your question… (Enter to send)"
              style={{ flex:1, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:11, padding:"10px 13px", color:"#e0e0f0", fontSize:12, outline:"none", fontFamily:"inherit", transition:"border-color 0.2s" }}
              onFocus={e=>e.target.style.borderColor="rgba(0,212,170,0.32)"}
              onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"}
            />
            <button onClick={sendMessage} disabled={loading||!input.trim()}
              style={{ background:(loading||!input.trim())?"rgba(0,212,170,0.13)":"linear-gradient(135deg,#00D4AA,#00a88a)", border:"none", borderRadius:11, width:42,height:42,minWidth:42, cursor:(loading||!input.trim())?"not-allowed":"pointer", fontSize:16, transition:"all 0.2s", boxShadow:(loading||!input.trim())?"none":"0 4px 13px rgba(0,212,170,0.25)" }}>➤</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse { 0%,100%{opacity:0.2;transform:scale(0.72)} 50%{opacity:1;transform:scale(1.1)} }
        *{box-sizing:border-box}
        body{margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:rgba(0,212,170,0.2);border-radius:4px}
      `}</style>
    </div>
  );
}
