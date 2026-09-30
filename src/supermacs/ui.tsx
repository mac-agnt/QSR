import { useMemo, useState, type CSSProperties, type ReactNode } from "react";

export const card: CSSProperties = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--card-r,18px)", padding: 18, boxShadow: "var(--card-shadow)" };
export const lbl: CSSProperties = { fontSize: 11, color: "var(--dim)", letterSpacing: ".04em" };
export const btnBase: CSSProperties = { height: 32, padding: "0 14px", borderRadius: "var(--r-ctl,999px)", fontSize: 12, cursor: "pointer", border: "1px solid var(--border-strong)", background: "var(--surface-2)", color: "var(--ink)" };

export const Btn = ({ children, onClick, primary, disabled, title }: { children: ReactNode; onClick?: () => void; primary?: boolean; disabled?: boolean; title?: string }) => (
  <button title={title} disabled={disabled} onClick={onClick} style={{ ...btnBase, ...(primary ? { background: "var(--accent)", color: "var(--on-accent)", borderColor: "var(--accent)", fontWeight: 600 } : {}), opacity: disabled ? 0.45 : 1, cursor: disabled ? "not-allowed" : "pointer" }}>{children}</button>
);

const tone: Record<string, string> = { ok: "var(--ok)", warn: "var(--warn)", bad: "var(--bad)", dim: "var(--dim)", acc: "var(--accent)" };
export const Pill = ({ t, k = "dim" }: { t: string; k?: "ok" | "warn" | "bad" | "dim" | "acc" }) => (
  <span style={{ display: "inline-flex", alignItems: "center", height: 22, padding: "0 10px", borderRadius: 999, fontSize: 11, border: `1px solid ${tone[k]}`, color: tone[k], whiteSpace: "nowrap" }}>{t}</span>
);
export const statusKind = (s: string): "ok" | "warn" | "bad" | "dim" =>
  /approved|delivered|matched|synced|resolved|completed|received|reconciled|ok/i.test(s) && !/awaiting|not/i.test(s) ? "ok" : /disput|unexplained|stale|reject|blocked|issue|open|low|risk/i.test(s) ? "bad" : /awaiting|part|draft|scheduled|manual|submitted|sent|simulated/i.test(s) ? "warn" : "dim";
export const St = ({ s }: { s: string }) => <Pill t={s} k={statusKind(s)} />;

export const Kpi = ({ label, value, sub, hot }: { label: string; value: string; sub?: string; hot?: boolean }) => (
  <div style={{ ...card, padding: 16, borderColor: hot ? "var(--accent-line)" : "var(--border)", flex: "1 1 170px", minWidth: 0 }}>
    <div style={lbl}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-.5px", margin: "6px 0 2px", color: hot ? "var(--accent)" : "var(--ink)" }}>{value}</div>
    {sub && <div style={{ fontSize: 11.5, color: "var(--dim)" }}>{sub}</div>}
  </div>
);
export const Row = ({ children, gap = 12 }: { children: ReactNode; gap?: number }) => <div style={{ display: "flex", flexWrap: "wrap", gap }}>{children}</div>;
export const Panel = ({ title, right, children, style }: { title?: string; right?: ReactNode; children: ReactNode; style?: CSSProperties }) => (
  <div style={{ ...card, ...style }}>
    {(title || right) && <div style={{ display: "flex", alignItems: "center", marginBottom: 12, gap: 10 }}><div style={{ fontSize: 13.5, fontWeight: 600, flex: 1 }}>{title}</div>{right}</div>}
    {children}
  </div>
);

export function Bars({ data, fmt, hot }: { data: [string, number][]; fmt?: (n: number) => string; hot?: string }) {
  const max = Math.max(...data.map((d) => d[1]), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {data.map(([k, v]) => (
        <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12 }}>
          <div style={{ width: 130, color: "var(--body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{k}</div>
          <div style={{ flex: 1, height: 10, background: "var(--track)", borderRadius: 6 }}><div style={{ width: `${(v / max) * 100}%`, height: "100%", borderRadius: 6, background: k === hot ? "var(--accent)" : "var(--mid)" }} /></div>
          <div style={{ width: 76, textAlign: "right", color: "var(--ink)" }}>{fmt ? fmt(v) : v}</div>
        </div>
      ))}
    </div>
  );
}

export interface Col<T> { h: string; get: (r: T) => string | number; render?: (r: T) => ReactNode; align?: "right" }
export function Table<T>({ rows, cols, onRow, page = 12, searchable = true, filters, actions }: { rows: T[]; cols: Col<T>[]; onRow?: (r: T) => void; page?: number; searchable?: boolean; filters?: { label: string; test: (r: T) => boolean }[]; actions?: ReactNode }) {
  const [q, setQ] = useState(""); const [sort, setSort] = useState<[number, 1 | -1] | null>(null); const [pg, setPg] = useState(0); const [f, setF] = useState(0);
  const out = useMemo(() => {
    let r = rows.filter((x) => !filters || f === 0 || filters[f - 1].test(x));
    if (q) r = r.filter((x) => cols.some((c) => String(c.get(x)).toLowerCase().includes(q.toLowerCase())));
    if (sort) { const [i, d] = sort; r = [...r].sort((a, b) => { const x = cols[i].get(a), y = cols[i].get(b); return (typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y), undefined, { numeric: true })) * d; }); }
    return r;
  }, [rows, q, sort, f, cols, filters]);
  const pages = Math.max(1, Math.ceil(out.length / page)); const cur = Math.min(pg, pages - 1);
  return (
    <div style={{ ...card, padding: 0, overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 10, padding: "12px 14px", alignItems: "center", flexWrap: "wrap", borderBottom: "1px solid var(--border)" }}>
        {searchable && <input aria-label="Search table" placeholder="Search" value={q} onChange={(e) => { setQ(e.target.value); setPg(0); }} style={{ height: 32, borderRadius: 999, border: "1px solid var(--border-strong)", background: "var(--surface-2)", color: "var(--ink)", padding: "0 14px", fontSize: 12.5, width: 220 }} />}
        {filters && ["All", ...filters.map((x) => x.label)].map((l, i) => <button key={l} onClick={() => { setF(i); setPg(0); }} style={{ ...btnBase, height: 28, background: f === i ? "var(--accent-soft)" : "transparent", borderColor: f === i ? "var(--accent-line)" : "var(--border)" }}>{l}</button>)}
        <div style={{ flex: 1 }} />{actions}
        <span style={{ fontSize: 11.5, color: "var(--dim)" }}>{out.length.toLocaleString("en-IE")} rows</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <thead><tr>{cols.map((c, i) => <th key={c.h} onClick={() => setSort(sort && sort[0] === i ? [i, (sort[1] * -1) as 1 | -1] : [i, 1])} style={{ textAlign: c.align || "left", padding: "9px 14px", color: "var(--dim)", fontWeight: 500, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap", borderBottom: "1px solid var(--border)" }}>{c.h}{sort && sort[0] === i ? (sort[1] === 1 ? " ↑" : " ↓") : ""}</th>)}</tr></thead>
          <tbody>{out.slice(cur * page, cur * page + page).map((r, ri) => (
            <tr key={ri} onClick={() => onRow?.(r)} style={{ cursor: onRow ? "pointer" : "default", borderBottom: "1px solid var(--border)" }} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")} onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
              {cols.map((c) => <td key={c.h} style={{ padding: "9px 14px", textAlign: c.align || "left", color: "var(--body)", whiteSpace: "nowrap" }}>{c.render ? c.render(r) : c.get(r)}</td>)}
            </tr>))}
            {out.length === 0 && <tr><td colSpan={cols.length} style={{ padding: 24, textAlign: "center", color: "var(--dim)" }}>No matching records</td></tr>}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "10px 14px", alignItems: "center", justifyContent: "flex-end", fontSize: 12, color: "var(--dim)" }}>
        <Btn disabled={cur === 0} onClick={() => setPg(cur - 1)}>Prev</Btn><span>Page {cur + 1} of {pages}</span><Btn disabled={cur >= pages - 1} onClick={() => setPg(cur + 1)}>Next</Btn>
      </div>
    </div>
  );
}

export function Drawer({ title, sub, onClose, children }: { title: string; sub?: string; onClose: () => void; children: ReactNode }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60 }} role="dialog" aria-label={title}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "var(--scrim)" }} />
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "min(480px,100vw)", background: "var(--overlay)", borderLeft: "1px solid var(--border-strong)", padding: 22, overflowY: "auto", animation: "pageIn .3s var(--ease) both" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}><div style={{ flex: 1 }}><div style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>{sub && <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 2 }}>{sub}</div>}</div><Btn onClick={onClose}>Close</Btn></div>
        {children}
      </div>
    </div>
  );
}
export const KV = ({ rows }: { rows: [string, ReactNode][] }) => (
  <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "8px 12px", fontSize: 12.5, marginBottom: 14 }}>{rows.map(([k, v]) => <div key={k} style={{ display: "contents" }}><div style={{ color: "var(--dim)" }}>{k}</div><div style={{ color: "var(--ink)" }}>{v}</div></div>)}</div>
);
export const Note = ({ children }: { children: ReactNode }) => <div style={{ fontSize: 11.5, color: "var(--dim)", padding: "8px 12px", border: "1px dashed var(--border-strong)", borderRadius: 12 }}>{children}</div>;
