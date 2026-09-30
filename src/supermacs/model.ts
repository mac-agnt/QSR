/* Supermac's demo: one shared, synthetic data source. Every screen derives from here.
   All names, suppliers, transactions and incidents are fictional. */
import { useSyncExternalStore } from "react";

export const DEMO_DATE = "Wed 14 Oct 2026";
export const eur = (n: number) => "€" + n.toLocaleString("en-IE", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });

function rng(seed: number) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

/* Largest-remainder allocation: parts sum exactly to total. */
function allocate(total: number, weights: number[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  const raw = weights.map((w) => (w / sum) * total);
  const base = raw.map(Math.floor);
  let rest = total - base.reduce((a, b) => a + b, 0);
  raw.map((r, i) => [r - base[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (rest > 0) { base[i]++; rest--; } });
  return base;
}

export type StoreClass = "Standalone" | "Drive-through" | "Service-station outlet";
export interface Store { id: string; name: string; region: string; cls: StoreClass; manager: string; manualTotals: boolean; tillTx: number; tillSales: number; onlineOrders: number; onlineSales: number; sync: string; }

const TOWNS = ["Galway","Dublin","Cork","Limerick","Waterford","Athlone","Sligo","Kilkenny","Ennis","Tralee","Drogheda","Dundalk","Letterkenny","Wexford","Navan","Mullingar","Tuam","Castlebar","Carlow","Portlaoise","Naas","Bray","Wicklow","Killarney","Clonmel","Longford","Cavan","Monaghan","Roscommon","Thurles","Tullamore","Newbridge","Swords","Tallaght","Blanchardstown","Ballina","Westport","Loughrea","Salthill","Kinsale"];
const REGIONS = ["West","South","Midlands","North-East","South-East","North-West"];
const MANAGERS = ["Liam Doyle","Emma Ryan","Orla Keane","Cian Farrell","Roisin Tobin","Darragh Lyons","Aine McGrath","Fionn Hegarty"];
const CLASSES: StoreClass[] = ["Standalone", "Drive-through", "Service-station outlet"];

function buildStores(): Store[] {
  const r = rng(114);
  const names: string[] = [];
  for (let i = 0; i < 114; i++) names.push(`${TOWNS[i % TOWNS.length]} Demo ${String(Math.floor(i / TOWNS.length) + 1).padStart(2, "0")}`);
  const w = names.map(() => 0.5 + r() * 1.5);
  const tillSales = allocate(392000, w), tillTx = allocate(28000, w);
  const w2 = names.map(() => 0.4 + r() * 1.6);
  const onSales = allocate(100000, w2), onOrd = allocate(2000, w2);
  const manual = new Set([17, 42, 68, 93]);
  return names.map((name, i) => ({
    id: "S" + String(i + 1).padStart(3, "0"), name, region: name.startsWith("Dublin") ? "Dublin" : REGIONS[i % REGIONS.length], cls: CLASSES[Math.floor(r() * 3)],
    manager: i === 0 ? "Liam Doyle" : MANAGERS[i % MANAGERS.length], manualTotals: manual.has(i),
    tillTx: tillTx[i], tillSales: tillSales[i], onlineOrders: onOrd[i], onlineSales: onSales[i],
    sync: manual.has(i) ? "Manual total" : (i % 23 === 5 ? "Stale 6h" : "Synced 07:5" + (i % 10)),
  }));
}
export const STORES = buildStores();

export const SUPPLIERS: (string | number)[][] = [
  ["SUP-01","West Coast Foods Demo","Chicken, frozen","Net 30",3,"Maeve Hanley"],["SUP-02","Greenfield Packaging Demo","Packaging","Net 45",5,"Ronan Gill"],
  ["SUP-03","Dairy Supply Demo","Chilled ingredients","Net 30",2,"Clodagh Foy"],["SUP-04","Atlantic Potato Co Demo","Frozen fries","Net 30",3,"Tadhg Lynch"],
  ["SUP-05","Shannon Sauces Demo","Sauces","Net 30",4,"Grainne Cusack"],["SUP-06","Burren Bakery Demo","Buns","Net 14",1,"Padraig Nash"],
  ["SUP-07","Lakeland Drinks Demo","Drinks","Net 45",4,"Sinead Boyle"],["SUP-08","Clean Sweep Supplies Demo","Cleaning","Net 60",6,"Eoin Rafferty"],
  ["SUP-09","Emerald Oils Demo","Dry ingredients","Net 30",5,"Brid Cassidy"],["SUP-10","Midland Salad Growers Demo","Chilled ingredients","Net 14",1,"Colm Egan"],
  ["SUP-11","Dunmore Cartons Demo","Packaging","Net 45",7,"Aisling Dwyer"],["SUP-12","Harbour Beverages Demo","Drinks","Net 30",3,"Fergal Hession"],
];

export type Cat = "Frozen food" | "Chilled ingredients" | "Dry ingredients" | "Drinks" | "Packaging" | "Cleaning supplies";
export interface Sku { code: string; name: string; cat: Cat; purchUnit: string; baseUnit: string; conv: number; supplier: string; agreed: number; barcode: string; gtin?: string; detailed: boolean; }
const D = (code: string, name: string, cat: Cat, pu: string, bu: string, conv: number, sup: string, agreed: number): Sku =>
  ({ code, name, cat, purchUnit: pu, baseUnit: bu, conv, supplier: sup, agreed, barcode: "SMD-" + code, detailed: true });
export const DETAILED_SKUS: Sku[] = [
  D("CHK-001","Chicken fillet, 10kg case","Frozen food","Case","Kilogram",10,"West Coast Foods Demo",48),
  D("CHK-002","Chicken strips, 5kg case","Frozen food","Case","Kilogram",5,"West Coast Foods Demo",31.5),
  D("FRY-001","Skin-on fries, 12.5kg case","Frozen food","Case","Kilogram",12.5,"Atlantic Potato Co Demo",22),
  D("FRY-002","Straight-cut fries, 12.5kg case","Frozen food","Case","Kilogram",12.5,"Atlantic Potato Co Demo",20.5),
  D("BEEF-001","Beef patty 4oz, case of 40","Frozen food","Case","Each",40,"West Coast Foods Demo",36),
  D("BUN-001","Sesame bun, tray of 48","Dry ingredients","Case","Each",48,"Burren Bakery Demo",14.4),
  D("SAUCE-004","Burger sauce, 1L bottle","Dry ingredients","Each","Litre",1,"Shannon Sauces Demo",4),
  D("SAUCE-001","Ketchup, 5L tub","Dry ingredients","Each","Litre",5,"Shannon Sauces Demo",9.8),
  D("DAIRY-001","Slice cheese, case of 200","Chilled ingredients","Case","Each",200,"Dairy Supply Demo",30),
  D("DAIRY-002","Milkshake mix, 10L","Chilled ingredients","Case","Litre",10,"Dairy Supply Demo",21),
  D("SAL-001","Iceberg lettuce, 5kg","Chilled ingredients","Bag","Kilogram",5,"Midland Salad Growers Demo",8.5),
  D("SAL-002","Sliced tomato, 3kg","Chilled ingredients","Bag","Kilogram",3,"Midland Salad Growers Demo",7.2),
  D("OIL-001","Fryer oil, 20L","Dry ingredients","Each","Litre",20,"Emerald Oils Demo",38),
  D("DRK-001","Cola syrup, BIB 10L","Drinks","Each","Litre",10,"Lakeland Drinks Demo",64),
  D("DRK-002","Still water 500ml, case of 24","Drinks","Case","Each",24,"Harbour Beverages Demo",9.6),
  D("DRK-003","Orange juice 1L, case of 12","Drinks","Case","Litre",12,"Harbour Beverages Demo",14.4),
  D("PKG-001","Burger box, case of 1,200","Packaging","Case","Each",1200,"Greenfield Packaging Demo",15),
  D("PKG-002","Fries bag, case of 2,000","Packaging","Case","Each",2000,"Greenfield Packaging Demo",18.5),
  D("PKG-003","Paper cup 12oz, case of 1,000","Packaging","Case","Each",1000,"Dunmore Cartons Demo",21),
  D("PKG-004","Carrier bag, case of 500","Packaging","Case","Each",500,"Dunmore Cartons Demo",12),
  D("CLN-001","Degreaser, 5L","Cleaning supplies","Each","Litre",5,"Clean Sweep Supplies Demo",11.5),
  D("CLN-002","Sanitiser, 5L","Cleaning supplies","Each","Litre",5,"Clean Sweep Supplies Demo",9.9),
  D("CLN-003","Blue roll, case of 6","Cleaning supplies","Case","Each",6,"Clean Sweep Supplies Demo",17),
  D("CHK-003","Chicken nuggets, 5kg case","Frozen food","Case","Kilogram",5,"West Coast Foods Demo",27),
  D("FRZ-001","Onion rings, 2.5kg bag","Frozen food","Bag","Kilogram",2.5,"Atlantic Potato Co Demo",6.8),
  D("DRY-001","Seasoning mix, 1kg bag","Dry ingredients","Bag","Kilogram",1,"Emerald Oils Demo",5.2),
  D("DRY-002","Coating flour, 10kg bag","Dry ingredients","Bag","Kilogram",10,"Emerald Oils Demo",12.4),
  D("SAUCE-002","Garlic mayo, 5L tub","Dry ingredients","Each","Litre",5,"Shannon Sauces Demo",11.2),
  D("SAUCE-003","Curry sauce, 5L tub","Dry ingredients","Each","Litre",5,"Shannon Sauces Demo",10.4),
  D("DAIRY-003","Butter portion, case of 500","Chilled ingredients","Case","Each",500,"Dairy Supply Demo",24),
];
const CATS: Cat[] = ["Frozen food","Chilled ingredients","Dry ingredients","Drinks","Packaging","Cleaning supplies"];
const UNITS: [string, string, number][] = [["Case","Kilogram",10],["Bag","Kilogram",5],["Each","Litre",1],["Case","Each",24],["Each","Each",1]];
export function skuAt(i: number): Sku {
  if (i < DETAILED_SKUS.length) return DETAILED_SKUS[i];
  const r = rng(i * 7919), cat = CATS[i % 6], u = UNITS[i % 5], sup = SUPPLIERS[i % 12][1] as string;
  return { code: "SKU-" + String(i + 1).padStart(5, "0"), name: `${cat} item ${i + 1}`, cat, purchUnit: u[0], baseUnit: u[1], conv: u[2], supplier: sup, agreed: Math.round((5 + r() * 60) * 100) / 100, barcode: "SMD-SKU-" + String(i + 1).padStart(5, "0"), detailed: false };
}
export const SKU_COUNT = 6000;
export const skuByCode = (c: string) => DETAILED_SKUS.find((s) => s.code === c);
export const perBase = (s: Sku, price = s.agreed) => Math.round((price / s.conv) * 1000) / 1000;

export const LOCATIONS = ["Central Depot Demo","Galway Demo 01","Dublin Demo 03","Cork Demo 01","Limerick Demo 01","Athlone Demo 01","Sligo Demo 01","Waterford Demo 01"];
export interface StockRow { sku: string; loc: string; onHand: number; reserved: number; dailyUse: number; }
function buildStock(): StockRow[] {
  const rows: StockRow[] = [];
  DETAILED_SKUS.forEach((s, si) => LOCATIONS.forEach((loc, li) => {
    const r = rng(si * 31 + li);
    const depot = li === 0;
    rows.push({ sku: s.code, loc, onHand: depot ? 400 + Math.floor(r() * 300) : 30 + Math.floor(r() * 60), reserved: Math.floor(r() * 8), dailyUse: depot ? 60 + Math.floor(r() * 30) : 6 + Math.floor(r() * 8) });
  }));
  const g = rows.find((x) => x.sku === "FRY-001" && x.loc === "Galway Demo 01")!; g.onHand = 18; g.reserved = 0; g.dailyUse = 12;
  return rows;
}

export interface PO { id: string; supplier: string; sku: string; qty: number; unit: number; status: string; requested: string; approver: string; store: string; agreed?: number; }
function buildPOs(): PO[] {
  const list: PO[] = [
    { id: "PO-1042", supplier: "Greenfield Packaging Demo", sku: "PKG-001", qty: 1200, unit: 15, status: "Awaiting approval", requested: "Mon 12 Oct", approver: "Conor Walsh", store: "Central Depot Demo" },
    { id: "PO-1048", supplier: "West Coast Foods Demo", sku: "CHK-001", qty: 400, unit: 52, agreed: 48, status: "Awaiting approval", requested: "Tue 13 Oct", approver: "Conor Walsh", store: "Central Depot Demo" },
    { id: "PO-1036", supplier: "Dairy Supply Demo", sku: "DAIRY-001", qty: 100, unit: 30, status: "Part received", requested: "Thu 8 Oct", approver: "Conor Walsh", store: "Central Depot Demo" },
  ];
  const sts = ["Delivered", "Delivered", "Approved", "Sent to supplier", "Delivered", "Invoiced"];
  const seen = new Set<string>(["PO-1036", "PO-1042", "PO-1048"]);
  for (let i = 0; i < 21; i++) {
    const s = DETAILED_SKUS[(i * 3 + 2) % 30]; const r = rng(i + 99);
    let n = 1010 + i; while (seen.has("PO-" + n)) n++; seen.add("PO-" + n);
    list.push({ id: "PO-" + n, supplier: s.supplier, sku: s.code, qty: 20 + Math.floor(r() * 200), unit: s.agreed, status: sts[i % 6], requested: (1 + (i % 12)) + " Oct", approver: "Conor Walsh", store: "Central Depot Demo" });
  }
  return list;
}
export const poTotal = (p: PO) => p.qty * p.unit;

export interface Invoice { id: string; po: string; supplier: string; billedQty: number; unit: number; receivedQty: number; status: string; }
function buildInvoices(pos: PO[]): Invoice[] {
  const inv: Invoice[] = [{ id: "INV-2081", po: "PO-1036", supplier: "Dairy Supply Demo", billedQty: 100, unit: 30, receivedQty: 96, status: "Disputed" }];
  pos.filter((p) => p.status === "Delivered" || p.status === "Invoiced").slice(0, 17).forEach((p, i) => inv.push({ id: "INV-" + (2064 + i), po: p.id, supplier: p.supplier, billedQty: p.qty, unit: p.unit, receivedQty: p.qty, status: i % 4 === 0 ? "Matched, awaiting approval" : "Matched" }));
  return inv;
}
export const invValue = (i: Invoice) => i.billedQty * i.unit;

export interface Customer { id: string; name: string; email: string; orders: number; spend: number; last: string; }
const FIRST = ["Aoibhinn","Ciaran","Deirdre","Eamon","Fiadh","Gearoid","Helena","Ivan","Jenny","Kian","Laoise","Maebh","Niall","Oisin","Padraig","Quinn","Roisin","Sorcha","Tomas","Una"];
const LAST = ["Brennan","Cullen","Dempsey","Fahey","Gallagher","Heffernan","Kavanagh","Lawlor","Molloy","Nugent"];
export const CUSTOMERS: Customer[] = Array.from({ length: 40 }, (_, i) => { const r = rng(i + 500); const n = 1 + Math.floor(r() * 9); return { id: "C-" + String(i + 1).padStart(3, "0"), name: FIRST[i % 20] + " " + LAST[(i * 3) % 10], email: `customer${i + 1}@example.com`, orders: n, spend: Math.round(n * (38 + r() * 30)), last: (1 + Math.floor(r() * 13)) + " Oct" }; });
export const ONLINE_ORDERS = Array.from({ length: 40 }, (_, i) => ({ id: "ORD-" + (7100 + i), customer: CUSTOMERS[i].name, store: STORES[(i * 7) % 114].name, total: 28 + ((i * 17) % 45), status: i % 9 === 0 ? "Issue open" : "Completed" }));
export const SERVICE_ISSUES = [
  { id: "SI-301", order: "ORD-7100", customer: CUSTOMERS[0].name, type: "Missing item", owner: "Sarah Nolan", status: "Open", refund: 6.5 },
  { id: "SI-302", order: "ORD-7109", customer: CUSTOMERS[9].name, type: "Refund request", owner: "Sarah Nolan", status: "Awaiting human approval", refund: 14 },
  { id: "SI-303", order: "ORD-7118", customer: CUSTOMERS[18].name, type: "Late delivery", owner: "Sarah Nolan", status: "Open", refund: 0 },
  { id: "SI-304", order: "ORD-7127", customer: CUSTOMERS[27].name, type: "Missing item", owner: "Sarah Nolan", status: "Open", refund: 4.2 },
];

export interface Batch { lot: string; sku: string; qty: number; unitCost: number; received: string; expiry: string; where: string; }
export const BATCHES: Batch[] = [
  { lot: "B-062", sku: "SAUCE-004", qty: 80, unitCost: 4, received: "Mon 5 Oct", expiry: "Fri 16 Oct", where: "Galway Demo 01" },
  { lot: "B-071", sku: "DAIRY-002", qty: 40, unitCost: 2.1, received: "Fri 9 Oct", expiry: "Wed 28 Oct", where: "Central Depot Demo" },
  { lot: "B-074", sku: "SAL-001", qty: 60, unitCost: 1.7, received: "Mon 12 Oct", expiry: "Sun 18 Oct", where: "Dublin Demo 03" },
  { lot: "B-058", sku: "CHK-002", qty: 90, unitCost: 6.3, received: "Tue 29 Sep", expiry: "Tue 29 Mar", where: "Central Depot Demo" },
  { lot: "B-066", sku: "DRK-003", qty: 120, unitCost: 1.2, received: "Wed 7 Oct", expiry: "Thu 7 Jan", where: "Cork Demo 01" },
];

export const RECON = [
  { store: "Dublin Demo 03", pos: 12640, settle: 12220, owner: "Niamh Byrne" },
  { store: "Cork Demo 01", pos: 9840, settle: 9840, owner: "Niamh Byrne" },
  { store: "Limerick Demo 01", pos: 8210, settle: 8210, owner: "Niamh Byrne" },
  { store: "Sligo Demo 01", pos: 6120, settle: 6120, owner: "Niamh Byrne" },
];

/* ---------- shared local state + actions ---------- */
export interface LogEntry { at: string; who: string; kind: "human" | "agent" | "system"; text: string; }
export interface Requisition { id: string; store: string; sku: string; qty: number; status: string; evidence: string; }
export interface State {
  role: string; pos: PO[]; invoices: Invoice[]; stock: StockRow[]; log: LogEntry[]; reqs: Requisition[];
  transfer: "none" | "scheduled" | "received"; reconOpen: boolean; quoteRequested: boolean; sauceAction: string; proposalApproved: boolean;
  rejections: Record<string, string>; docketConfirmed: boolean; storeSel: string;
}
const fresh = (): State => ({
  role: "Executive", pos: buildPOs(), invoices: buildInvoices(buildPOs()), stock: buildStock(),
  log: [{ at: "08:12", who: "Briefing Agent", kind: "agent", text: "Morning briefing prepared: 6 items need a human decision" }],
  reqs: [{ id: "REQ-501", store: "Galway Demo 01", sku: "FRY-001", qty: 36, status: "Draft from stock alert", evidence: "18 cases on hand, 12 per day" }],
  transfer: "none", reconOpen: false, quoteRequested: false, sauceAction: "none", proposalApproved: false, rejections: {}, docketConfirmed: false, storeSel: "Galway Demo 01",
});
let state: State = fresh();
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
const set = (p: Partial<State>) => { state = { ...state, ...p }; emit(); };
const say = (who: string, kind: LogEntry["kind"], text: string) => set({ log: [{ at: "Now", who, kind, text }, ...state.log].slice(0, 40) });
export const useStore = () => useSyncExternalStore((f) => { subs.add(f); return () => { subs.delete(f); }; }, () => state);

export const actions = {
  setRole: (role: string) => set({ role }),
  selectStore: (storeSel: string) => set({ storeSel }),
  reset: () => { state = fresh(); emit(); },
  decidePO(id: string, ok: boolean, reason: string) {
    set({ pos: state.pos.map((p) => p.id === id ? { ...p, status: ok ? "Approved (not yet delivered)" : "Rejected" } : p), rejections: ok ? state.rejections : { ...state.rejections, [id]: reason } });
    say("Conor Walsh", "human", `${ok ? "Approved" : "Rejected"} ${id}${ok ? ". Not delivered or paid." : ": " + reason}`);
  },
  requestQuote() { set({ quoteRequested: true }); say("Procurement Agent", "agent", "Drafted corrected-quote request for PO-1048 (agreed €48, quoted €52). Awaiting Conor Walsh to send."); },
  createRequisition(store: string, sku: string, qty: number, evidence: string) {
    const id = "REQ-" + (502 + state.reqs.length); set({ reqs: [{ id, store, sku, qty, status: "Submitted", evidence }, ...state.reqs] }); say("Sean Murphy", "human", `Created ${id}: ${qty} x ${sku} for ${store}`);
  },
  scheduleTransfer() { set({ transfer: "scheduled" }); say("Sean Murphy", "human", "Approved transfer: 36 cases FRY-001 Central Depot Demo to Galway Demo 01 (scheduled, stock unchanged)"); },
  confirmReceipt() {
    set({ transfer: "received", stock: state.stock.map((s) => s.sku === "FRY-001" && s.loc === "Galway Demo 01" ? { ...s, onHand: s.onHand + 36 } : s.sku === "FRY-001" && s.loc === "Central Depot Demo" ? { ...s, onHand: s.onHand - 36 } : s) });
    say("Liam Doyle", "human", "Confirmed simulated receipt: FRY-001 +36 cases at Galway Demo 01");
  },
  resolveInvoice(mode: "received" | "credit") {
    set({ invoices: state.invoices.map((i) => i.id === "INV-2081" ? { ...i, status: mode === "received" ? "Resolved: pay received qty" : "Resolved: credit note requested" } : i) });
    say("Niamh Byrne", "human", `INV-2081 resolved (${mode === "received" ? "pay €2,880 for 96 received" : "credit note for €120 requested"}). Now eligible for payment proposal.`);
  },
  approveProposal() { set({ proposalApproved: true }); say("Niamh Byrne", "human", "Approved payment proposal (simulated). No bank connected, nothing sent."); },
  openInvestigation() { set({ reconOpen: true }); say("Niamh Byrne", "human", "Opened investigation on Dublin Demo 03: €420 unexplained difference"); },
  sauce(action: string) { set({ sauceAction: action }); say("Sean Murphy", "human", `SAUCE-004 / B-062: ${action}`); },
  confirmDocket() { set({ docketConfirmed: true }); say("Sean Murphy", "human", "Confirmed docket DK-8841 extraction against PO-1036: 96 of 100 cases received"); },
};

export const proposalRows = (s: State) => s.invoices.filter((i) => i.status.startsWith("Matched") || i.status.startsWith("Resolved")).map((i) => ({ id: i.id, supplier: i.supplier, amount: i.status.startsWith("Resolved") ? 2880 : invValue(i) }));

export function downloadCsv(name: string, head: string[], rows: (string | number)[][]) {
  const q = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const blob = new Blob([[head, ...rows].map((r) => r.map(q).join(",")).join("\n")], { type: "text/csv" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 500);
}
export const totals = {
  till: STORES.reduce((a, s) => a + s.tillSales, 0), tillTx: STORES.reduce((a, s) => a + s.tillTx, 0),
  online: STORES.reduce((a, s) => a + s.onlineSales, 0), onlineOrders: STORES.reduce((a, s) => a + s.onlineOrders, 0),
};
