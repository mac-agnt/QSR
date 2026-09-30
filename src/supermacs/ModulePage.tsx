import { useState } from "react";
import { STORES, SUPPLIERS, DETAILED_SKUS, SKU_COUNT, skuAt, skuByCode, perBase, BATCHES, RECON, CUSTOMERS, ONLINE_ORDERS, SERVICE_ISSUES, LOCATIONS, DEMO_DATE, eur, poTotal, invValue, totals, actions, useStore, downloadCsv, proposalRows, type Store, type PO, type Invoice, type Sku } from "./model";
import { Btn, Pill, St, Kpi, Row, Panel, Bars, Table, Drawer, KV, Note, card, lbl } from "./ui";

export const MODULE_TABS: Record<string, string[]> = {
  "Stores & Sales": ["Overview", "Stores", "Transactions", "Reconciliation", "Store Detail"],
  Procurement: ["Overview", "Requisitions", "Purchase Orders", "Suppliers", "Price Agreements", "Receiving"],
  Inventory: ["Overview", "SKU Catalogue", "Stock by Location", "Replenishment", "Batches & Expiry", "Barcode Tools"],
  Finance: ["Overview", "Invoice Matching", "Payments", "Reconciliation", "Forecast"],
  Customers: ["Overview", "Online Customers", "Orders", "Service Issues"],
};
export const ROLES = ["Executive", "Regional manager", "Store manager", "Procurement", "Finance", "Administrator"];
const combined = totals.till + totals.online;

function StoreDrawer({ s, onClose }: { s: Store; onClose: () => void }) {
  const st = useStore();
  const stock = st.stock.filter((x) => x.loc === s.name);
  return (
    <Drawer title={s.name} sub={`${s.region} · ${s.cls} (demo classification)`} onClose={onClose}>
      <KV rows={[["Manager", s.manager], ["POS feed", s.manualTotals ? "Manual demo total" : s.sync], ["Till sales", `${eur(s.tillSales)} (${s.tillTx.toLocaleString("en-IE")} txns)`], ["Online sales", `${eur(s.onlineSales)} (${s.onlineOrders} orders)`], ["Gross receipts", eur(s.tillSales + s.onlineSales)]]} />
      <Panel title="Open purchase orders"><div style={{ fontSize: 12.5, color: "var(--body)" }}>{st.pos.filter((p) => p.store === s.name).map((p) => p.id + " " + p.status).join(", ") || "None linked. Depot orders serve this store."}</div></Panel>
      <Panel title="Stock at this store" style={{ marginTop: 12 }}>{stock.length ? stock.slice(0, 6).map((x) => <div key={x.sku} style={{ fontSize: 12.5, display: "flex", justifyContent: "space-between", padding: "3px 0" }}><span>{x.sku}</span><span>{x.onHand} on hand · {(x.onHand / x.dailyUse).toFixed(1)}d cover</span></div>) : <span style={{ fontSize: 12.5, color: "var(--dim)" }}>Detailed stock is seeded for 8 representative locations.</span>}</Panel>
      <Panel title="Open issues" style={{ marginTop: 12 }}><div style={{ fontSize: 12.5, color: "var(--body)" }}>{s.name === "Galway Demo 01" ? "FRY-001 stock cover 1.5 days" : s.name === "Dublin Demo 03" ? "€420 unexplained settlement difference" : s.sync.startsWith("Stale") ? "POS feed stale" : "None"}</div></Panel>
    </Drawer>
  );
}

function PoDrawer({ p, onClose }: { p: PO; onClose: () => void }) {
  const st = useStore(); const [reason, setReason] = useState("");
  const s = skuByCode(p.sku); const pending = p.status === "Awaiting approval";
  const variance = p.agreed ? (p.unit - p.agreed) * p.qty : 0;
  return (
    <Drawer title={p.id} sub={p.supplier} onClose={onClose}>
      <KV rows={[["Status", <St s={p.status} />], ["SKU", `${p.sku} ${s?.name || ""}`], ["Quantity", `${p.qty.toLocaleString("en-IE")} ${s?.purchUnit.toLowerCase()}s`], ["Unit price", `${eur(p.unit)} per ${s?.purchUnit.toLowerCase()}${s ? ` (${eur(perBase(s, p.unit))} per ${s.baseUnit.toLowerCase()})` : ""}`], ["Total", eur(poTotal(p))], ["Approver", p.approver], ["Requested", p.requested], ...(p.agreed ? [["Agreed price", `${eur(p.agreed)} per case`], ["Variance", `${eur(variance)} above agreement`]] as [string, string][] : [])]} />
      {p.id === "PO-1048" && <Panel title="Price variance action"><div style={{ fontSize: 12.5, marginBottom: 10, color: "var(--body)" }}>Variance is unresolved. It becomes a saving only if the supplier issues a corrected quote.</div><Btn primary disabled={st.quoteRequested} onClick={actions.requestQuote}>{st.quoteRequested ? "Corrected quote requested" : "Request corrected quote"}</Btn></Panel>}
      {pending && <Panel title="Human decision" style={{ marginTop: 12 }}>
        <input aria-label="Reason" placeholder="Reason (required to reject)" value={reason} onChange={(e) => setReason(e.target.value)} style={{ width: "100%", height: 34, borderRadius: 999, border: "1px solid var(--border-strong)", background: "var(--surface-2)", color: "var(--ink)", padding: "0 14px", marginBottom: 10 }} />
        <Row><Btn primary onClick={() => { actions.decidePO(p.id, true, reason); onClose(); }}>Approve</Btn><Btn disabled={!reason} onClick={() => { actions.decidePO(p.id, false, reason); onClose(); }}>Reject with reason</Btn></Row>
        <div style={{ fontSize: 11, color: "var(--dim)", marginTop: 8 }}>Approval does not mark the order delivered or paid.</div>
      </Panel>}
      {st.rejections[p.id] && <Note>Rejected: {st.rejections[p.id]}</Note>}
    </Drawer>
  );
}

function Docket() {
  const st = useStore();
  const [v, setV] = useState({ supplier: "Dairy Supply Demo", po: "PO-1036", ordered: 100, received: 96, unit: 30 });
  const errs: string[] = []; if (v.received > v.ordered) errs.push("Received exceeds ordered"); if (v.received < v.ordered) errs.push(`Shortage of ${v.ordered - v.received} cases`);
  const inp = (k: keyof typeof v, num?: boolean) => <input aria-label={k} value={v[k]} onChange={(e) => setV({ ...v, [k]: num ? Number(e.target.value) || 0 : e.target.value })} style={{ height: 30, borderRadius: 10, border: "1px solid var(--border-strong)", background: "var(--surface-2)", color: "var(--ink)", padding: "0 10px", width: 140 }} />;
  return (
    <Panel title="Delivery docket DK-8841 (seeded sample, simulated extraction)" right={<Pill t="Simulated extraction" k="warn" />}>
      <KV rows={[["Supplier", inp("supplier")], ["PO reference", inp("po")], ["Ordered", inp("ordered", true)], ["Received", inp("received", true)], ["Unit price", inp("unit", true)]]} />
      <div style={{ fontSize: 12.5, marginBottom: 10 }}>Match against {v.po}: received value <b>{eur(v.received * v.unit)}</b> vs ordered {eur(v.ordered * v.unit)}. {errs.map((e) => <Pill key={e} t={e} k="warn" />)}</div>
      <Btn primary disabled={st.docketConfirmed} onClick={actions.confirmDocket}>{st.docketConfirmed ? "Goods receipt confirmed" : "Confirm goods receipt"}</Btn>
    </Panel>
  );
}

function Import() {
  const [txt, setTxt] = useState("sku,supplier,price\nCHK-001,West Coast Foods Demo,52\nCHK-001,West Coast Foods Demo,52\nXYZ-999,Unknown,abc\nFRY-001,Atlantic Potato Co Demo,22");
  const [go, setGo] = useState(false);
  const lines = txt.split("\n").slice(1).filter(Boolean).map((l) => l.split(","));
  const seen = new Set<string>();
  const res = lines.map((l) => { const key = l[0] + l[1]; const dup = seen.has(key); seen.add(key); const bad = !skuByCode(l[0]) ? "Unknown SKU" : isNaN(Number(l[2])) ? "Invalid price" : dup ? "Duplicate" : Number(l[2]) !== skuByCode(l[0])?.agreed ? "Price differs from agreement" : "Valid"; return [...l, bad]; });
  return (
    <Panel title="Spreadsheet import preview (simulated)" right={<Pill t="No file leaves the browser" />}>
      <textarea aria-label="CSV" value={txt} onChange={(e) => { setTxt(e.target.value); setGo(false); }} rows={5} style={{ width: "100%", borderRadius: 12, border: "1px solid var(--border-strong)", background: "var(--surface-2)", color: "var(--ink)", padding: 10, fontFamily: "monospace", fontSize: 12 }} />
      <div style={{ margin: "10px 0" }}><Btn primary onClick={() => setGo(true)}>Validate import</Btn></div>
      {go && <Table rows={res} searchable={false} cols={[{ h: "SKU", get: (r) => r[0] }, { h: "Supplier", get: (r) => r[1] }, { h: "Price", get: (r) => r[2] }, { h: "Validation", get: (r) => r[3], render: (r) => <St s={r[3] === "Valid" ? "Matched" : r[3]} /> }]} />}
      {go && <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 8 }}>{res.filter((r) => r[3] === "Valid").length} valid, {res.filter((r) => r[3] === "Duplicate").length} duplicate, {res.filter((r) => !["Valid", "Duplicate"].includes(r[3])).length} need review. Nothing is imported in this demo.</div>}
    </Panel>
  );
}

function Barcode() {
  const [code, setCode] = useState("SMD-CHK-001"); const [scan, setScan] = useState<Sku | null | undefined>(undefined);
  const st = useStore();
  const sku = DETAILED_SKUS.find((s) => s.barcode === code);
  return (
    <Row gap={14}>
      <Panel title="Label preview" style={{ flex: "1 1 320px" }} right={<Pill t="Demo internal barcode" k="warn" />}>
        <select aria-label="SKU" value={code} onChange={(e) => { setCode(e.target.value); setScan(undefined); }} style={{ height: 32, borderRadius: 10, background: "var(--surface-2)", color: "var(--ink)", border: "1px solid var(--border-strong)", marginBottom: 12 }}>{DETAILED_SKUS.map((s) => <option key={s.code} value={s.barcode}>{s.code}</option>)}</select>
        <div style={{ background: "#fff", color: "#111", borderRadius: 10, padding: 14, width: 260 }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>{sku?.name}</div>
          <div style={{ fontFamily: "monospace", fontSize: 18, margin: "10px 0", letterSpacing: 2 }}>{code}</div>
          <div style={{ fontSize: 10.5 }}>Internal identifier. Supplier GTIN: {sku?.gtin || "not recorded"}. Not a registered GTIN. No scannable bars drawn: this is a label preview only.</div>
        </div>
      </Panel>
      <Panel title="Simulated scan lookup" style={{ flex: "1 1 320px" }}>
        <input aria-label="Scan code" value={code} onChange={(e) => setCode(e.target.value)} style={{ height: 32, borderRadius: 999, background: "var(--surface-2)", color: "var(--ink)", border: "1px solid var(--border-strong)", padding: "0 14px", width: "100%", marginBottom: 10 }} />
        <Btn primary onClick={() => setScan(sku || null)}>Simulate scan</Btn>
        {scan === null && <div style={{ marginTop: 10, color: "var(--bad)", fontSize: 12.5 }}>No record for this identifier.</div>}
        {scan && <div style={{ marginTop: 12 }}><KV rows={[["SKU", scan.code], ["Name", scan.name], ["Unit", `${scan.purchUnit} = ${scan.conv} ${scan.baseUnit.toLowerCase()}`], ["Stock (depot)", (st.stock.find((s) => s.sku === scan.code && s.loc === LOCATIONS[0])?.onHand ?? 0) + " " + scan.purchUnit.toLowerCase() + "s"], ["Supplier", scan.supplier]]} /></div>}
      </Panel>
    </Row>
  );
}

export default function ModulePage({ page, tab }: { page: string; tab: string }) {
  const st = useStore();
  const [sel, setSel] = useState<{ t: string; id: string } | null>(null);
  const pending = st.pos.filter((p) => p.status === "Awaiting approval");
  const stale = STORES.filter((s) => s.sync.startsWith("Stale"));
  const feeds = STORES.filter((s) => !s.manualTotals).length;
  const gal = st.stock.find((s) => s.sku === "FRY-001" && s.loc === "Galway Demo 01")!;
  const cover = gal.onHand / gal.dailyUse;
  const poDrawer = sel?.t === "po" ? st.pos.find((p) => p.id === sel.id) : undefined;
  const storeDrawer = sel?.t === "store" ? STORES.find((s) => s.name === sel.id) : undefined;
  const skuDrawer = sel?.t === "sku" ? skuAt(Number(sel.id)) : undefined;
  const inv = st.invoices.find((i) => i.id === "INV-2081")!;
  const blocked = !inv.status.startsWith("Resolved");
  const pr = proposalRows(st);
  const body = (() => {
    const key = page + "|" + tab;
    switch (key) {
      case "Stores & Sales|Overview": return (<>
        <Row><Kpi label="Gross receipts (illustrative)" value={eur(combined)} sub="Till + online, this day" hot /><Kpi label="Till" value={eur(totals.till)} sub={`${totals.tillTx.toLocaleString("en-IE")} txns, avg ${eur(Math.round(totals.till / totals.tillTx))}`} /><Kpi label="Online" value={eur(totals.online)} sub={`${totals.onlineOrders.toLocaleString("en-IE")} orders, avg ${eur(Math.round(totals.online / totals.onlineOrders))}`} /><Kpi label="Blended average" value={eur(Math.round((combined / (totals.tillTx + totals.onlineOrders)) * 100) / 100)} sub={`${(totals.tillTx + totals.onlineOrders).toLocaleString("en-IE")} transactions/orders`} /></Row>
        <Row gap={14}><Panel title="POS coverage" style={{ flex: "1 1 300px" }}><div style={{ fontSize: 22, fontWeight: 600 }}>{feeds} feeds synced; {114 - feeds} manual totals</div><div style={{ fontSize: 12.5, color: "var(--dim)", margin: "6px 0 10px" }}>Not "114 connected". Manual totals are labelled demo totals. {stale.length} feeds are stale over 6h.</div>{stale.map((s) => <div key={s.id} style={{ fontSize: 12.5 }}><Pill t="Stale" k="warn" /> {s.name}</div>)}</Panel>
        <Panel title="Top 8 stores by gross receipts" style={{ flex: "2 1 420px" }}><Bars hot="Dublin Demo 03" fmt={eur} data={[...STORES].sort((a, b) => b.tillSales + b.onlineSales - a.tillSales - a.onlineSales).slice(0, 8).map((s) => [s.name, s.tillSales + s.onlineSales])} /></Panel></Row>
        <Note>Demo classifications (Standalone, Drive-through, Service-station outlet) are illustrative. Sales are gross receipts and are not netted against purchasing.</Note></>);
      case "Stores & Sales|Stores": return <Table rows={STORES} page={14} onRow={(s) => setSel({ t: "store", id: s.name })} filters={[{ label: "Standalone", test: (s) => s.cls === "Standalone" }, { label: "Drive-through", test: (s) => s.cls === "Drive-through" }, { label: "Service-station outlet", test: (s) => s.cls.startsWith("Service") }, { label: "Manual totals", test: (s) => s.manualTotals }]} actions={<Btn onClick={() => downloadCsv("stores.csv", ["Store", "Region", "Class", "Manager", "Gross receipts"], STORES.map((s) => [s.name, s.region, s.cls, s.manager, s.tillSales + s.onlineSales]))}>Download CSV</Btn>} cols={[{ h: "Store", get: (s) => s.name }, { h: "Region", get: (s) => s.region }, { h: "Class (demo)", get: (s) => s.cls }, { h: "Manager", get: (s) => s.manager }, { h: "Till", get: (s) => s.tillSales, render: (s) => eur(s.tillSales), align: "right" }, { h: "Online", get: (s) => s.onlineSales, render: (s) => eur(s.onlineSales), align: "right" }, { h: "Feed", get: (s) => s.sync, render: (s) => <St s={s.sync.startsWith("Synced") ? "Synced" : s.sync} /> }]} />;
      case "Stores & Sales|Transactions": {
        const rows = STORES.slice(0, 60).flatMap((s, i) => [{ id: "T-" + (90000 + i * 2), ch: "Till", store: s.name, time: `${8 + (i % 12)}:${String((i * 7) % 60).padStart(2, "0")}`, amt: Math.round(s.tillSales / s.tillTx * 100) / 100, rec: s.name === "Dublin Demo 03" ? "Unexplained difference" : "Reconciled" }, { id: "T-" + (90001 + i * 2), ch: "Online", store: s.name, time: `${9 + (i % 11)}:${String((i * 11) % 60).padStart(2, "0")}`, amt: Math.round(s.onlineSales / Math.max(1, s.onlineOrders) * 100) / 100, rec: "Reconciled" }]);
        return <><Note>Till transactions are anonymous. No identities are attached. Showing a sample of representative transactions.</Note><Table rows={rows} filters={[{ label: "Till", test: (r) => r.ch === "Till" }, { label: "Online", test: (r) => r.ch === "Online" }, { label: "Exceptions", test: (r) => r.rec !== "Reconciled" }]} cols={[{ h: "ID", get: (r) => r.id }, { h: "Channel", get: (r) => r.ch }, { h: "Store", get: (r) => r.store }, { h: "Time (Dublin)", get: (r) => r.time }, { h: "Amount", get: (r) => r.amt, render: (r) => eur(r.amt), align: "right" }, { h: "Reconciliation", get: (r) => r.rec, render: (r) => <St s={r.rec} /> }]} /></>;
      }
      case "Stores & Sales|Reconciliation": case "Finance|Reconciliation": return (<>
        <Table rows={RECON} searchable={false} cols={[{ h: "Store", get: (r) => r.store }, { h: "POS card total", get: (r) => r.pos, render: (r) => eur(r.pos), align: "right" }, { h: "Settlement (mock)", get: (r) => r.settle, render: (r) => eur(r.settle), align: "right" }, { h: "Difference", get: (r) => r.pos - r.settle, render: (r) => eur(r.pos - r.settle), align: "right" }, { h: "Owner", get: (r) => r.owner }, { h: "Status", get: (r) => r.pos - r.settle, render: (r) => <St s={r.pos === r.settle ? "Reconciled" : "Unexplained difference"} /> }]} />
        <Panel title="Dublin Demo 03: unresolved €420 difference" right={<Pill t="Owner: Niamh Byrne" />}>
          <div style={{ fontSize: 12.5, color: "var(--body)", marginBottom: 10 }}>POS card total {eur(12640)} vs mock settlement {eur(12220)}. This is an unexplained difference, not an assumption of theft or lost revenue. Evidence to check: card batch close time, refund postings, settlement file cut-off.</div>
          <Btn primary disabled={st.reconOpen} onClick={actions.openInvestigation}>{st.reconOpen ? "Investigation task open (Niamh Byrne, due Fri)" : "Open investigation task"}</Btn></Panel></>);
      case "Stores & Sales|Store Detail": {
        const s = STORES.find((x) => x.name === st.storeSel)!;
        return (<><select aria-label="Store" value={st.storeSel} onChange={(e) => actions.selectStore(e.target.value)} style={{ height: 32, borderRadius: 10, background: "var(--surface-2)", color: "var(--ink)", border: "1px solid var(--border-strong)", width: 240 }}>{STORES.map((x) => <option key={x.id}>{x.name}</option>)}</select>
          <Row><Kpi label="Till sales" value={eur(s.tillSales)} sub={`${s.tillTx} txns`} hot /><Kpi label="Online sales" value={eur(s.onlineSales)} sub={`${s.onlineOrders} orders`} /><Kpi label="Class (demo)" value={s.cls} sub={s.region} /><Kpi label="Manager" value={s.manager} sub={s.sync} /></Row>
          <Panel title="Stock at store">{st.stock.filter((x) => x.loc === s.name).slice(0, 8).map((x) => <div key={x.sku} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 12.5 }}><span>{x.sku}</span><span>{x.onHand} on hand, {(x.onHand / x.dailyUse).toFixed(1)}d cover</span></div>) || null}{!st.stock.some((x) => x.loc === s.name) && <span style={{ color: "var(--dim)", fontSize: 12.5 }}>Detailed stock is seeded for 8 representative locations. Try Galway Demo 01.</span>}</Panel></>);
      }
      case "Procurement|Overview": return (<>
        <Row><Kpi label="Open PO value" value={eur(st.pos.filter((p) => !["Delivered", "Invoiced", "Rejected"].includes(p.status)).reduce((a, p) => a + poTotal(p), 0))} sub="Not a purchasing total" hot /><Kpi label="Awaiting approval" value={String(pending.length)} sub={eur(pending.reduce((a, p) => a + poTotal(p), 0))} /><Kpi label="Price variance" value={eur(1600)} sub="PO-1048, unresolved" /><Kpi label="Suppliers" value="12" sub="fictional" /></Row>
        <Row gap={14}><Panel title="Approval queue" style={{ flex: "1 1 340px" }}>{pending.length ? pending.map((p) => <div key={p.id} onClick={() => setSel({ t: "po", id: p.id })} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", cursor: "pointer", borderBottom: "1px solid var(--border)", fontSize: 12.5 }}><span>{p.id} {p.supplier}</span><b>{eur(poTotal(p))}</b></div>) : <span style={{ color: "var(--dim)" }}>Queue clear</span>}</Panel>
        <Panel title="Supplier exceptions" style={{ flex: "1 1 340px" }}><div style={{ fontSize: 12.5, lineHeight: 1.7 }}><Pill t="Price" k="bad" /> West Coast Foods Demo quoted €52 vs €48 agreed (PO-1048, 400 cases, {eur(1600)})<br /><Pill t="Short delivery" k="bad" /> Dairy Supply Demo 96 of 100 cases (PO-1036)</div></Panel></Row>
        <Note>Meeting-reported assumptions, not verified: about €100m purchasing (period unconfirmed) and about 6,000 SKUs.</Note></>);
      case "Procurement|Requisitions": return (<>
        <Table rows={st.reqs} searchable={false} cols={[{ h: "ID", get: (r) => r.id }, { h: "Store", get: (r) => r.store }, { h: "SKU", get: (r) => r.sku }, { h: "Qty (cases)", get: (r) => r.qty }, { h: "Stock evidence", get: (r) => r.evidence }, { h: "Status", get: (r) => r.status, render: (r) => <St s={r.status} /> }]} />
        <Btn primary onClick={() => actions.createRequisition("Galway Demo 01", "FRY-001", 36, `Cover ${cover.toFixed(1)}d, lead time 3d`)}>Create requisition from stock alert</Btn></>);
      case "Procurement|Purchase Orders": return <Table rows={st.pos} onRow={(p) => setSel({ t: "po", id: p.id })} filters={[{ label: "Awaiting approval", test: (p) => p.status === "Awaiting approval" }, { label: "Delivered", test: (p) => p.status === "Delivered" }]} actions={<Btn onClick={() => downloadCsv("purchase-orders.csv", ["PO", "Supplier", "SKU", "Qty", "Unit", "Total", "Status"], st.pos.map((p) => [p.id, p.supplier, p.sku, p.qty, p.unit, poTotal(p), p.status]))}>Download CSV</Btn>} cols={[{ h: "PO", get: (p) => p.id }, { h: "Supplier", get: (p) => p.supplier }, { h: "SKU", get: (p) => p.sku }, { h: "Qty", get: (p) => p.qty, align: "right" }, { h: "Unit price", get: (p) => p.unit, render: (p) => eur(p.unit), align: "right" }, { h: "Total", get: (p) => poTotal(p), render: (p) => eur(poTotal(p)), align: "right" }, { h: "Status", get: (p) => p.status, render: (p) => <St s={p.status} /> }]} />;
      case "Procurement|Suppliers": return <Table rows={SUPPLIERS} cols={[{ h: "ID", get: (r) => r[0] as string }, { h: "Supplier (fictional)", get: (r) => r[1] as string }, { h: "Category", get: (r) => r[2] as string }, { h: "Terms", get: (r) => r[3] as string }, { h: "Lead time (days)", get: (r) => r[4] as number }, { h: "Contact", get: (r) => r[5] as string }, { h: "Linked POs", get: (r) => st.pos.filter((p) => p.supplier === r[1]).length }]} />;
      case "Procurement|Price Agreements": return (<><Note>Prices compared on a per-base-unit basis using conversion factors. A per-case price is never compared to a per-kilogram price.</Note>
        <Table rows={DETAILED_SKUS} cols={[{ h: "SKU", get: (s) => s.code }, { h: "Supplier", get: (s) => s.supplier }, { h: "Agreed price", get: (s) => s.agreed, render: (s) => `${eur(s.agreed)} / ${s.purchUnit.toLowerCase()}`, align: "right" }, { h: "Per base unit", get: (s) => perBase(s), render: (s) => `${eur(perBase(s))} / ${s.baseUnit.toLowerCase()}`, align: "right" }, { h: "Scope", get: () => "All stores" }, { h: "Effective", get: () => "1 Sep 2026 to 28 Feb 2027" }, { h: "Exception", get: (s) => (s.code === "CHK-001" ? "PO-1048 quoted €52" : "None"), render: (s) => (s.code === "CHK-001" ? <Pill t="Quote €52 vs €48" k="bad" /> : <span style={{ color: "var(--dim)" }}>None</span>) }]} /></>);
      case "Procurement|Receiving": return (<><Docket /><Panel title="Shortages"><div style={{ fontSize: 12.5 }}>PO-1036: ordered 100, received 96 cases. Value received {eur(2880)} vs ordered {eur(3000)}. <Pill t="Invoice INV-2081 disputed" k="bad" /></div></Panel></>);
      case "Inventory|Overview": return (<>
        <Row><Kpi label="SKU records" value={SKU_COUNT.toLocaleString("en-IE")} sub="meeting-reported, deterministic demo" /><Kpi label="Shortage risk" value="1 store" sub={`Galway Demo 01 FRY-001, ${cover.toFixed(1)} days cover`} hot /><Kpi label="Expiry exposure" value={eur(320)} sub="SAUCE-004 B-062, 80 units" /><Kpi label="Transfer" value={st.transfer === "none" ? "Proposed" : st.transfer === "scheduled" ? "Scheduled" : "Received"} sub="36 cases FRY-001" /></Row>
        <Panel title="Stock cover, lowest 6 locations (FRY-001)"><Bars hot="Galway Demo 01" fmt={(n) => n.toFixed(1) + "d"} data={st.stock.filter((s) => s.sku === "FRY-001").map((s) => [s.loc, s.onHand / s.dailyUse] as [string, number]).sort((a, b) => a[1] - b[1]).slice(0, 6)} /></Panel>
        <Note>Purchased stock items, menu sale items and recipe/consumption mappings are separate. A menu item is not automatically a purchased warehouse SKU.</Note></>);
      case "Inventory|SKU Catalogue": return <Table rows={Array.from({ length: SKU_COUNT }, (_, i) => skuAt(i))} page={15} onRow={(s) => setSel({ t: "sku", id: String(Number(s.detailed ? DETAILED_SKUS.indexOf(s) : Number(s.code.slice(4)) - 1)) })} filters={[{ label: "Detailed (30)", test: (s) => s.detailed }, ...["Frozen food", "Chilled ingredients", "Dry ingredients", "Drinks", "Packaging", "Cleaning supplies"].map((c) => ({ label: c, test: (s: Sku) => s.cat === c }))]} cols={[{ h: "Code", get: (s) => s.code }, { h: "Name", get: (s) => s.name }, { h: "Category", get: (s) => s.cat }, { h: "Unit", get: (s) => s.purchUnit, render: (s) => `${s.purchUnit} = ${s.conv} ${s.baseUnit.toLowerCase()}` }, { h: "Supplier ref", get: (s) => s.supplier }, { h: "Demo internal barcode", get: (s) => s.barcode }]} />;
      case "Inventory|Stock by Location": return <Table rows={st.stock} page={14} filters={[{ label: "Low cover (<3d)", test: (s) => s.onHand / s.dailyUse < 3 }, ...LOCATIONS.slice(0, 3).map((l) => ({ label: l, test: (s: typeof st.stock[number]) => s.loc === l }))]} cols={[{ h: "SKU", get: (s) => s.sku }, { h: "Location", get: (s) => s.loc }, { h: "On hand", get: (s) => s.onHand, align: "right" }, { h: "Reserved", get: (s) => s.reserved, align: "right" }, { h: "Available", get: (s) => s.onHand - s.reserved, align: "right" }, { h: "Cover (days)", get: (s) => Math.round((s.onHand / s.dailyUse) * 10) / 10, align: "right", render: (s) => { const c = s.onHand / s.dailyUse; return <span style={{ color: c < 3 ? "var(--bad)" : "var(--body)" }}>{c.toFixed(1)}</span>; } }]} />;
      case "Inventory|Replenishment": return (<Panel title="Galway Demo 01: FRY-001 skin-on fries" right={<St s={cover < 3 ? "Shortage risk" : "Stock ok"} />}>
        <KV rows={[["Available", `${gal.onHand} cases`], ["Consumption", "12 cases per day (estimate)"], ["Stock cover", `${cover.toFixed(1)} days`], ["Supplier lead time", "3 days"], ["Proposed transfer", "36 cases from Central Depot Demo"], ["Transfer status", st.transfer === "none" ? "Proposed" : st.transfer === "scheduled" ? "Scheduled movement, stock unchanged" : "Received, stock updated"]]} />
        <Row><Btn primary disabled={st.transfer !== "none"} onClick={actions.scheduleTransfer}>Approve transfer</Btn><Btn disabled={st.transfer !== "scheduled"} onClick={actions.confirmReceipt}>Confirm simulated receipt</Btn><Btn onClick={() => actions.createRequisition("Galway Demo 01", "FRY-001", 36, "Stock alert")}>Create requisition</Btn></Row></Panel>);
      case "Inventory|Batches & Expiry": return (<><Table rows={BATCHES} searchable={false} cols={[{ h: "Lot", get: (b) => b.lot }, { h: "SKU", get: (b) => b.sku }, { h: "Qty", get: (b) => b.qty, align: "right" }, { h: "Exposure", get: (b) => b.qty * b.unitCost, render: (b) => eur(b.qty * b.unitCost), align: "right" }, { h: "Received", get: (b) => b.received }, { h: "Expiry", get: (b) => b.expiry, render: (b) => <span style={{ color: b.lot === "B-062" ? "var(--bad)" : "var(--body)" }}>{b.expiry}</span> }, { h: "Location", get: (b) => b.where }]} />
        <Panel title="SAUCE-004 / B-062: 80 units, €320 exposure, expires Fri 16 Oct (2 days after demo date)"><div style={{ fontSize: 12.5, marginBottom: 10 }}>Usable stock is not written off automatically. Choose a proposal:</div><Row><Btn primary onClick={() => actions.sauce("Transfer proposed to Dublin Demo 03")}>Propose transfer</Btn><Btn onClick={() => actions.sauce("Prioritised use flagged at Galway Demo 01")}>Prioritise use</Btn>{st.sauceAction !== "none" && <Pill t={st.sauceAction} k="acc" />}</Row></Panel></>);
      case "Inventory|Barcode Tools": return <Barcode />;
      case "Finance|Overview": return (<Row><Kpi label="Invoices" value={String(st.invoices.length)} sub="18 seeded" /><Kpi label="Awaiting review" value={String(st.invoices.filter((i) => i.status.includes("awaiting") || i.status === "Disputed").length)} sub="" hot /><Kpi label="Disputed" value={blocked ? eur(120) : eur(0)} sub="INV-2081" /><Kpi label="Proposal total" value={eur(pr.reduce((a, r) => a + r.amount, 0))} sub={st.proposalApproved ? "Approved (simulated)" : "Draft"} /></Row>);
      case "Finance|Invoice Matching": return (<>
        <Panel title="INV-2081 three-way comparison" right={<St s={inv.status} />}>
          <Table rows={[["Purchase order PO-1036", "100 cases", "€30", eur(3000)], ["Goods receipt (docket DK-8841)", "96 cases", "€30", eur(2880)], ["Invoice INV-2081", "100 cases", "€30", eur(3000)]]} searchable={false} cols={[{ h: "Document", get: (r) => r[0] }, { h: "Qty", get: (r) => r[1] }, { h: "Unit", get: (r) => r[2] }, { h: "Value", get: (r) => r[3], align: "right" }]} />
          <div style={{ margin: "10px 0", fontSize: 12.5 }}>Disputed amount <b style={{ color: "var(--bad)" }}>{eur(120)}</b> (4 cases not received). Excluded from the payment proposal until resolved.</div>
          <Row><Btn primary disabled={!blocked} onClick={() => actions.resolveInvoice("received")}>Pay received quantity only</Btn><Btn disabled={!blocked} onClick={() => actions.resolveInvoice("credit")}>Request credit note</Btn></Row></Panel>
        <Table rows={st.invoices} cols={[{ h: "Invoice", get: (i) => i.id }, { h: "PO", get: (i) => i.po }, { h: "Supplier", get: (i) => i.supplier }, { h: "Value", get: (i) => invValue(i), render: (i) => eur(invValue(i)), align: "right" }, { h: "Status", get: (i) => i.status, render: (i) => <St s={i.status} /> }]} /></>);
      case "Finance|Payments": return (<Panel title="Payment proposal (simulated)" right={<Pill t="No bank connected" k="warn" />}>
        {blocked && <Note>INV-2081 is blocked from this proposal until the discrepancy is resolved.</Note>}
        <div style={{ height: 10 }} /><Table rows={pr} searchable={false} cols={[{ h: "Invoice", get: (r) => r.id }, { h: "Supplier", get: (r) => r.supplier }, { h: "Amount", get: (r) => r.amount, render: (r) => eur(r.amount), align: "right" }]} />
        <div style={{ margin: "10px 0", fontSize: 13 }}>Proposal total <b>{eur(pr.reduce((a, r) => a + r.amount, 0))}</b> · {st.proposalApproved ? "Approved by Niamh Byrne (simulated)" : "Awaiting approval"}</div>
        <Row><Btn primary disabled={st.proposalApproved} onClick={actions.approveProposal}>Approve proposal</Btn><Btn onClick={() => downloadCsv("mock-payment-export.csv", ["Invoice", "Supplier", "Amount"], pr.map((r) => [r.id, r.supplier, r.amount]))}>Download mock export</Btn></Row>
        <div style={{ fontSize: 11, color: "var(--dim)", marginTop: 8 }}>The mock export does not follow any real bank format. Nothing is sent.</div></Panel>);
      case "Finance|Forecast": return <Panel title="Scheduled supplier payments (mock)"><Bars fmt={eur} data={[["Week of 19 Oct", 41200], ["Week of 26 Oct", 66800], ["Week of 2 Nov", 38900], ["Week of 9 Nov", 52400]]} hot="Week of 26 Oct" /><Note>Operational forecast only. This is not a general ledger or statutory accounts.</Note></Panel>;
      case "Customers|Overview": return (<><Row><Kpi label="Known online customers" value={String(CUSTOMERS.length)} sub="fictional profiles" hot /><Kpi label="Online orders" value={totals.onlineOrders.toLocaleString("en-IE")} sub={eur(totals.online)} /><Kpi label="Anonymous till txns" value={totals.tillTx.toLocaleString("en-IE")} sub="no identity attached" /><Kpi label="Open service issues" value={String(SERVICE_ISSUES.length)} sub="" /></Row>
        <Panel title="Channel mix by sales"><Bars data={[["Till (anonymous)", totals.till], ["Online (known)", totals.online]]} fmt={eur} hot="Online (known)" /></Panel></>);
      case "Customers|Online Customers": return <Table rows={CUSTOMERS} cols={[{ h: "ID", get: (c) => c.id }, { h: "Name (fictional)", get: (c) => c.name }, { h: "Email", get: (c) => c.email }, { h: "Orders", get: (c) => c.orders, align: "right" }, { h: "Spend", get: (c) => c.spend, render: (c) => eur(c.spend), align: "right" }, { h: "Last order", get: (c) => c.last }]} />;
      case "Customers|Orders": return <Table rows={ONLINE_ORDERS} cols={[{ h: "Order", get: (o) => o.id }, { h: "Customer", get: (o) => o.customer }, { h: "Store", get: (o) => o.store }, { h: "Total", get: (o) => o.total, render: (o) => eur(o.total), align: "right" }, { h: "Status", get: (o) => o.status, render: (o) => <St s={o.status} /> }]} />;
      case "Customers|Service Issues": return (<><Table rows={SERVICE_ISSUES} searchable={false} cols={[{ h: "Issue", get: (r) => r.id }, { h: "Order", get: (r) => r.order }, { h: "Customer", get: (r) => r.customer }, { h: "Type", get: (r) => r.type }, { h: "Refund", get: (r) => r.refund, render: (r) => eur(r.refund), align: "right" }, { h: "Owner", get: (r) => r.owner }, { h: "Status", get: (r) => r.status, render: (r) => <St s={r.status} /> }]} /><Note>Refunds require a human decision by Sarah Nolan. The Customer Service Agent only proposes.</Note></>);
      default: return null;
    }
  })();
  return (
    <div style={{ padding: "6px 22px 40px", display: "flex", flexDirection: "column", gap: 14, animation: "pageIn .5s var(--ease) both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div><div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-.4px" }}>{page}: {tab}</div><div style={lbl}>Demonstration • synthetic data · Reference date {DEMO_DATE} · Europe/Dublin · Source: shared demo records</div></div>
        <div style={{ flex: 1 }} />
        <select aria-label="Role" value={st.role} onChange={(e) => actions.setRole(e.target.value)} style={{ height: 32, borderRadius: 999, background: "var(--surface-2)", color: "var(--ink)", border: "1px solid var(--border-strong)", padding: "0 10px" }}>{ROLES.map((r) => <option key={r}>{r}</option>)}</select>
        <Btn onClick={actions.reset}>Reset demo data</Btn>
      </div>
      {st.role !== "Executive" && <Note>Role: {st.role}. Permission behaviour is simulated in this frontend demo and is not production security.</Note>}
      {body}
      {tab === "Price Agreements" && <Import />}
      <Panel title="Recent actions across the demo">{st.log.slice(0, 5).map((l, i) => <div key={i} style={{ fontSize: 12.5, padding: "4px 0", color: "var(--body)" }}><Pill t={l.kind === "human" ? "Human" : l.kind === "agent" ? "Agent suggestion" : "System"} k={l.kind === "human" ? "ok" : "dim"} /> <b>{l.who}</b> {l.text}</div>)}</Panel>
      {poDrawer && <PoDrawer p={poDrawer} onClose={() => setSel(null)} />}
      {storeDrawer && <StoreDrawer s={storeDrawer} onClose={() => setSel(null)} />}
      {skuDrawer && <Drawer title={skuDrawer.code} sub={skuDrawer.name} onClose={() => setSel(null)}><KV rows={[["Category", skuDrawer.cat], ["Purchase unit", `${skuDrawer.purchUnit} = ${skuDrawer.conv} ${skuDrawer.baseUnit.toLowerCase()}`], ["Agreed price", `${eur(skuDrawer.agreed)} per ${skuDrawer.purchUnit.toLowerCase()} (${eur(perBase(skuDrawer))} per ${skuDrawer.baseUnit.toLowerCase()})`], ["Supplier", skuDrawer.supplier], ["Demo internal barcode", skuDrawer.barcode], ["Supplier GTIN", skuDrawer.gtin || "not recorded"]]} /><Note>Lightweight records are deterministically generated. Detail exists for 30 representative SKUs.</Note></Drawer>}
    </div>
  );
}
