/* Demo data and pure helpers for the Pulse prototype (Supermac's operations demonstration). */

const INK="var(--ink)", BODY="var(--body)", DIM="var(--dim)", FAINT="var(--faint)";
const LIME="var(--accent)", GREEN="var(--ok)", AMBER="var(--warn)", RED="var(--bad)", NEUTRAL="var(--neutral)";
const MONO="var(--mono)";

const ICONS = {
  navHome:"M12 3.2 3.6 9.1v10a1.5 1.5 0 0 0 1.5 1.5h13.8a1.5 1.5 0 0 0 1.5-1.5v-10L12 3.2Z M8.9 13.1h2l1-2.6 1.5 5 1.1-2.4h1.6",
  navAgents:"M12 2.4v2.3 M12 2.4a.9.9 0 1 0 0-.02 M8.2 6.5h7.6A2.2 2.2 0 0 1 18 8.7v5.1a2.2 2.2 0 0 1-2.2 2.2H8.2A2.2 2.2 0 0 1 6 13.8V8.7a2.2 2.2 0 0 1 2.2-2.2Z M9.9 10.6v1.4 M14.1 10.6v1.4 M6 10h-1.9 M18 10h1.9 M9.2 18.6h5.6 M9.2 21.2h5.6",
  navDash:"M4 5.6h7.2v5.1H4V5.6Z M13.6 5.6H20v8.6h-6.4V5.6Z M4 13.1h7.2v5.3H4v-5.3Z M13.6 16.6H20v1.8h-6.4v-1.8Z",
  navWork:"M9.4 4.4h5.2a1.4 1.4 0 0 1 1.4 1.4v1.1h2.4A1.6 1.6 0 0 1 20 8.5v9.1a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 17.6V8.5a1.6 1.6 0 0 1 1.6-1.6H8V5.8a1.4 1.4 0 0 1 1.4-1.4Z M8 6.9h8 M9.6 13.3l1.8 1.8 3.4-3.6",
  navRecords:"M12 3.6c3.9 0 7 1.1 7 2.5S15.9 8.6 12 8.6 5 7.5 5 6.1 8.1 3.6 12 3.6Z M5 6.1v5.7c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6.1 M5 11.8v5.7c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5.7",
  navActivity:"M4.6 4.6h14.8A1.6 1.6 0 0 1 21 6.2v11.6a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 17.8V6.2a1.6 1.6 0 0 1 1.6-1.6Z M6 12.4h2.2l1.5-4.1 2.3 8 1.9-5.4 1.2 1.5H18",
  navAdmin:"M12 2.9 5 5.6v5.9c0 4 2.8 7.1 7 8.6 4.2-1.5 7-4.6 7-8.6V5.6L12 2.9Z M12 8.6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z M8.8 16.3a3.6 3.6 0 0 1 6.4 0",
  helios:"M21 11.5a8.4 8.4 0 0 1-9 8.4 9.9 9.9 0 0 1-4-.8L3 21l1.9-4.9A8.3 8.3 0 0 1 4 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z M8 12h1.6l1.2-2.6 1.6 5 1.4-2.4H16",
  inbox:"M3 13h4l1.5 3h7l1.5-3h4 M3 13l2.4-7A2 2 0 0 1 7.3 4.6h9.4a2 2 0 0 1 1.9 1.4L21 13v4.4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V13Z",
  work:"M6 4.6h12a1.6 1.6 0 0 1 1.6 1.6v12.2A1.6 1.6 0 0 1 18 20H6a1.6 1.6 0 0 1-1.6-1.6V6.2A1.6 1.6 0 0 1 6 4.6Z M8.4 10.4l1.9 1.9 3.9-3.9 M8.4 15.6h7.2",
  approvals:"M12 3.6 19.5 6v6.1c0 4-3.1 6.9-7.5 8.3-4.4-1.4-7.5-4.3-7.5-8.3V6L12 3.6Z M9.2 12.2l2 2 3.6-3.7",
  insights:"M4.5 19.5V13 M9.7 19.5V7.5 M14.9 19.5v-8 M20 19.5V5",
  people:"M12 12.5a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z M5 20.2c.9-3.1 3.6-4.9 7-4.9s6.1 1.8 7 4.9",
  orgs:"M4.5 20V6.4A1.4 1.4 0 0 1 5.9 5h6.2a1.4 1.4 0 0 1 1.4 1.4V20 M13.5 10.5h4.6A1.4 1.4 0 0 1 19.5 12v8 M3 20h18 M7.5 8.5h2.5 M7.5 12h2.5 M7.5 15.5h2.5",
  teams:"M9 12a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 9 12Z M16.5 12.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z M2.6 19.6c.8-2.8 3.2-4.4 6.4-4.4s5.6 1.6 6.4 4.4 M17 15.4c2.2.4 3.7 1.8 4.3 4.2",
  locations:"M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21Z M12 12.8a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z",
  visits:"M8 4v3 M16 4v3 M4.5 9.5h15 M6.4 6h11.2A1.9 1.9 0 0 1 19.5 8v10a1.9 1.9 0 0 1-1.9 1.9H6.4A1.9 1.9 0 0 1 4.5 18V8A1.9 1.9 0 0 1 6.4 6Z M9 13.5l1.6 1.6 3.4-3.4",
  autos:"M18.5 8.5A5 5 0 0 0 8.9 7.3 3.8 3.8 0 0 0 6 14.6 M8 17.5l3.2 3.2 M11.2 20.7l3.2-3.2 M11.2 20.7V9.6",
  health:"M3 12.5h3.4l2-5 3 10 2.2-5H21",
  modules:"M6.6 4.4h10.8a2.2 2.2 0 0 1 2.2 2.2v10.8a2.2 2.2 0 0 1-2.2 2.2H6.6a2.2 2.2 0 0 1-2.2-2.2V6.6a2.2 2.2 0 0 1 2.2-2.2Z M4.4 9.6h15.2 M9.6 19.6V9.6",
  agents:"M8.5 3.6h7A2.4 2.4 0 0 1 17.9 6v5.6a2.4 2.4 0 0 1-2.4 2.4h-7A2.4 2.4 0 0 1 6.1 11.6V6a2.4 2.4 0 0 1 2.4-2.4Z M9.6 8.2h.01 M14.4 8.2h.01 M12 14v2.6 M7.6 20.4h8.8 M12 16.6c-2.4 0-4.4 1.7-4.4 3.8h8.8c0-2.1-2-3.8-4.4-3.8Z",
  dash:"M4.4 4.4h6v6h-6v-6Z M13.6 4.4h6v3.6h-6V4.4Z M13.6 11.6h6v8h-6v-8Z M4.4 14h6v5.6h-6V14Z",
  files:"M5 7.2a1.8 1.8 0 0 1 1.8-1.8h3l1.8 2.2h5.6A1.8 1.8 0 0 1 19 9.4v7.4a1.8 1.8 0 0 1-1.8 1.8H6.8A1.8 1.8 0 0 1 5 16.8V7.2Z",
  pulseLine:"M2.5 12.5h3.6l2.1-6.4 3.2 12.2 2.6-8.4 1.8 2.6h5.7",
  records:"M6.4 3.6h7.4l4.2 4.2v12.6H6.4V3.6Z M13.4 3.8v4.2h4.2 M9 12.4h6 M9 16h4",
  tree:"M4.5 6h5 M4.5 12h5 M4.5 18h5 M12.5 6h7 M12.5 12h7 M12.5 18h7",
  graph:"M7 7.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z M17.6 10.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z M9.4 21.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z M8.6 6.4l7.6 2.6 M15.8 11.4l-5.6 5.2",
  bell:"M6 8.5a6 6 0 0 1 12 0c0 6.5 2.6 8.5 2.6 8.5H3.4S6 15 6 8.5Z M10.3 20.5a1.94 1.94 0 0 0 3.4 0"
};

/* Ontology stays first and is never removed (PulseLogic enforces this too). */
const REC_SECTIONS = [
  {id:"ontology", label:"Ontology", blurb:"How every record connects: suppliers, SKUs, purchase orders, receipts, invoices, stock and sales."},
  {id:"files", label:"Files", blurb:"Docket scans, price agreement PDFs and invoices, indexed where the assistant can read them. All fictional."},
  {id:"contacts", label:"Directory", blurb:"Stores, suppliers, staff, SKUs, purchase orders, receipts, invoices and customers in one place."}
];

const CONTACTS = [
  ["Aoife Kelly","Operations Director","aoife.kelly@example.com","Supermac's","staff","var(--accent)"],
  ["Conor Walsh","Procurement Lead","conor.walsh@example.com","Supermac's","staff","#9fd6f0"],
  ["Niamh Byrne","Finance Manager","niamh.byrne@example.com","Supermac's","staff","#e6c78a"],
  ["Sean Murphy","Inventory Controller","sean.murphy@example.com","Supermac's","staff","#c8b4f0"],
  ["Emma Ryan","Regional Manager","emma.ryan@example.com","Supermac's","staff","#a8e0c0"],
  ["Liam Doyle","Store Manager, Galway Demo 01","liam.doyle@example.com","Supermac's","staff","#9fd6f0"],
  ["Sarah Nolan","Customer Service Lead","sarah.nolan@example.com","Supermac's","staff","#e6c78a"],
  ["David Burke","Systems Administrator","david.burke@example.com","Supermac's","staff","#c8b4f0"],
  ["Grainne Kavanagh","Account Manager","grainne.kavanagh@example.com","West Coast Foods Demo","supplier","#e2a08c"],
  ["Ronan Fitzpatrick","Sales Coordinator","ronan.fitzpatrick@example.com","Greenfield Packaging Demo","supplier","#e6c78a"],
  ["Orla Brennan","Accounts Receivable","orla.brennan@example.com","Dairy Supply Demo","supplier","#a8e0c0"]
];

const FILE_TREE = [
  {type:"folder", id:"f-agr", name:"Price agreements", depth:0},
  {type:"file", id:"fl-1", name:"West Coast Foods Demo - price agreement.pdf", depth:1, parent:"f-agr", indexed:true,
   path:"Price agreements / West Coast Foods Demo", title:"West Coast Foods Demo - price agreement",
   facts:[["TYPE","PDF, 3 pages"],["SKU","CHK-001, 10kg case"],["AGREED PRICE","€48 per case"],["OWNER","Conor Walsh"]],
   body:["The agreement sets the price for CHK-001 (10kg case) at €48 per case. It is the reference used to check every quote and invoice for this SKU.",
     "The quote on PO-1048 came in at €52 per case, so 400 cases show a variance of €1,600 above the agreed price. This is a variance to query, not a saving.",
     "This is a fictional demonstration document."],
   links:[["West Coast Foods Demo","org"],["Conor Walsh","person"],["PO-1048","order"]]},
  {type:"folder", id:"f-dock", name:"Delivery dockets", depth:0},
  {type:"file", id:"fl-2", name:"Dairy Supply Demo - docket PO-1036.pdf", depth:1, parent:"f-dock", indexed:true,
   path:"Delivery dockets / Dairy Supply Demo", title:"Dairy Supply Demo - docket PO-1036",
   facts:[["TYPE","Scanned docket (simulated)"],["ORDERED","100 cases"],["RECEIVED","96 cases"],["OWNER","Sean Murphy"]],
   body:["The docket records 96 cases received against 100 ordered on PO-1036 at €30 per case, so €2,880 received against €3,000 ordered.",
     "INV-2081 bills for all 100 cases. The difference of €120 is held as a dispute until Dairy Supply Demo issues a credit or proves delivery.",
     "This is a fictional demonstration document."],
   links:[["Dairy Supply Demo","org"],["INV-2081","invoice"],["Sean Murphy","person"]]},
  {type:"file", id:"fl-3", name:"Greenfield Packaging Demo - PO-1042.pdf", depth:1, parent:"f-dock", indexed:true,
   path:"Delivery dockets / Greenfield Packaging Demo", title:"Greenfield Packaging Demo - PO-1042",
   facts:[["TYPE","PDF, 1 page"],["QUANTITY","1,200 cases at €15"],["VALUE","€18,000"],["APPROVER","Conor Walsh"]],
   body:["Purchase order for 1,200 cases of packaging at €15 per case, €18,000 in total. It is waiting for approval from Conor Walsh.",
     "Approval is a decision to buy. It does not mean the goods have been delivered or that any payment has been made.",
     "This is a fictional demonstration document."],
   links:[["Greenfield Packaging Demo","org"],["Conor Walsh","person"],["PO-1042","order"]]},
  {type:"folder", id:"f-inv", name:"Invoices", depth:0},
  {type:"file", id:"fl-4", name:"INV-2081.pdf", depth:1, parent:"f-inv", indexed:true,
   path:"Invoices / Dairy Supply Demo", title:"INV-2081",
   facts:[["TYPE","PDF, 1 page"],["BILLED","100 cases, €3,000"],["RECEIVED","96 cases, €2,880"],["DISPUTE","€120"]],
   body:["Three-way match fails: the invoice bills 100 cases but only 96 were received. The €120 difference blocks the payment proposal for this supplier.",
     "Next step is a credit note request to Dairy Supply Demo, owned by Niamh Byrne."],
   links:[["Dairy Supply Demo","org"],["PO-1036","order"],["Niamh Byrne","person"]]},
  {type:"folder", id:"f-store", name:"Store reports", depth:0},
  {type:"file", id:"fl-5", name:"Dublin Demo 03 - card settlement.pdf", depth:1, parent:"f-store", indexed:true,
   path:"Store reports / Dublin Demo 03", title:"Dublin Demo 03 - card settlement",
   facts:[["TYPE","PDF, 2 pages"],["POS CARD","€12,640"],["SETTLEMENT","€12,220"],["DIFFERENCE","€420, unexplained"]],
   body:["POS card sales for Dublin Demo 03 total €12,640 against a settlement of €12,220. The €420 difference is not yet explained.",
     "Timing, refunds and terminal batches are the usual causes and are checked first. Nothing here suggests theft. Owner is Niamh Byrne."],
   links:[["Dublin Demo 03","location"],["Niamh Byrne","person"],["POS discrepancy to investigation","workflow"]]},
  {type:"file", id:"fl-6", name:"Galway Demo 01 - stock count.xlsx", depth:1, parent:"f-store", indexed:false,
   path:"Store reports / Galway Demo 01", title:"Galway Demo 01 - stock count",
   facts:[["TYPE","XLSX, 2 sheets"],["SKU","FRY-001"],["ON HAND","18 cases"],["INDEXED","Not indexed"]],
   body:["Spreadsheet stored but not indexed. The figures the assistant quotes for FRY-001 come from the inventory import, not from this file.",
     "18 cases on hand, 12 cases a day, so about 1.5 days of cover against a 3 day lead time."],
   links:[["Galway Demo 01","location"],["Sean Murphy","person"]]}
];

const ONTO_NODES = [
  ["Store","entity",90,250,1,"A restaurant location. Raises requisitions and rings up POS transactions. 114 stores in the demonstration group."],
  ["Requisition","ledger",290,60,0,"A store or central request for stock. Becomes a purchase order once approved."],
  ["Purchase Order","ledger",480,60,1,"PO-1042 (€18,000) and PO-1048 (400 cases of CHK-001) sit here. Approval is not delivery and not payment."],
  ["Delivery","module",670,60,0,"A delivery docket captured against a purchase order. Docket capture is simulated."],
  ["Goods Receipt","ledger",860,60,0,"What was actually received. PO-1036 shows 96 of 100 cases received."],
  ["Invoice","ledger",860,160,0,"INV-2081 bills 100 cases for €3,000 against 96 received, a €120 dispute."],
  ["Payment Proposal","ledger",670,160,0,"A draft list of invoices that pass three-way match. Blocked while INV-2081 is in dispute. No bank is connected."],
  ["Supplier","entity",480,160,1,"West Coast Foods Demo, Greenfield Packaging Demo and Dairy Supply Demo. All fictional."],
  ["SKU","entity",290,250,1,"A stocked product such as CHK-001, FRY-001 or SAUCE-004. About 6,000 SKUs (meeting-reported assumption)."],
  ["Price Agreement","ledger",480,250,0,"Agreed price per SKU and supplier. CHK-001 is agreed at €48 per 10kg case."],
  ["Batch","entity",290,350,0,"A dated lot of a SKU. SAUCE-004 batch B-062 expires two days after the demo reference date."],
  ["Location","entity",480,350,0,"Where stock sits: Central Depot Demo, Galway Demo 01 and Dublin Demo 03."],
  ["Stock Movement","ledger",670,350,0,"Transfers, receipts and adjustments. Stock only changes on a simulated receipt."],
  ["POS Transaction","ledger",180,450,0,"A till sale. 28,000 till transactions for €392,000 today (illustrative gross receipts)."],
  ["Settlement","ledger",370,450,0,"Card settlement from the acquirer. Dublin Demo 03 is €420 short of POS card sales."],
  ["Online Customer","entity",540,450,0,"A customer ordering online. 2,000 online orders for €100,000 today."],
  ["Order","ledger",720,450,0,"An online order, average €50."],
  ["Service Issue","module",890,450,0,"A customer complaint or query linked to an order. Owned by Sarah Nolan's team."]
];

const ONTO_EDGES = [
  [90,250,290,60],[290,60,480,60],[480,60,670,60],[670,60,860,60],[860,60,860,160],[860,160,670,160],
  [480,160,480,60],[480,160,290,250],[290,250,480,250],
  [290,250,290,350],[290,350,480,350],[480,350,670,350],
  [90,250,180,450],[180,450,370,450],
  [540,450,720,450],[720,450,890,450]
];

const REC_TEMPLATES = [
  ["Field sheet","Records","Labelled fields in a grid — the default for a person, organisation or location.",
   "M5 5.5h14v13H5v-13Z M5 10h14 M12 10v8.5","grid"],
  ["Contact card","Records","A portrait, key fields and every linked record in one compact panel.",
   "M12 11.5a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z M5.5 19c.8-3 3.3-4.7 6.5-4.7s5.7 1.7 6.5 4.7","card"],
  ["Directory","Records","A sortable table of many records at once, built for lists.",
   "M4.5 6.5h15 M4.5 12h15 M4.5 17.5h15 M4.5 6.5h.01 M4.5 12h.01 M4.5 17.5h.01","rows"],
  ["Timeline","Case work","Ordered events with who did what and when. Good for a case or a claim.",
   "M12 3.5v17 M12 7.5h6 M12 13h-6 M12 18h6","timeline"],
  ["Kanban board","Case work","Cards in columns by status. For anything that moves through stages.",
   "M5 5h4.5v14H5V5Z M9.75 5h4.5v9h-4.5V5Z M14.5 5H19v6h-4.5V5Z","kanban"],
  ["Checklist","Case work","Ticked steps in order, with an owner and a due date on each.",
   "M5 6.5h2l1.4 1.4L11 5.5 M5 12.5h2l1.4 1.4 2.6-2.4 M5 18.5h2l1.4 1.4 2.6-2.4 M15 6.5h4 M15 12.5h4 M15 18.5h4","checklist"],
  ["Ledger","Finance","Rows and running totals. For anything with amounts and dates.",
   "M4 6h16 M4 12h16 M4 18h16 M9 3.5v17","ledger"],
  ["Invoice","Finance","Line items, totals and a status — built to be sent, not just stored.",
   "M7 3.5h10v17H7v-17Z M9.5 8h5 M9.5 11.5h5 M9.5 15h3","invoice"],
  ["Document","Notes","Long-form text with linked records pulled out down the side.",
   "M7 3.5h7l5 5v12H7v-17Z M14 3.7v5h5 M10 13h6 M10 16.5h4","document"],
  ["Gallery","Notes","A wall of images and files with a caption on each, for a store or a delivery.",
   "M4.5 6h6v6h-6V6Z M13.5 6h6v6h-6V6Z M4.5 14h6v4h-6v-4Z M13.5 14h6v4h-6v-4Z","gallery"],
  ["Map & locations","Ops","A pinboard of places, with the record's fields beside each pin.",
   "M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21Z M12 12.8a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z","map"],
  ["Schedule","Ops","A calendar of bookings against this record, with recurring rules.",
   "M8 4v3 M16 4v3 M4.5 9.5h15 M6.4 6h11.2A1.9 1.9 0 0 1 19.5 8v10a1.9 1.9 0 0 1-1.9 1.9H6.4A1.9 1.9 0 0 1 4.5 18V8A1.9 1.9 0 0 1 6.4 6Z","schedule"]
];
const REC_TEMPLATE_CATS = ["All","Records","Case work","Finance","Notes","Ops"];

/* ---- admin hub ---- */
/* ---- admin hub: 13 settings areas in five groups ---- */
const PEOPLE = [
  ["Aoife Kelly","Operations Director","aoife.kelly@example.com","Head Office Demo","active","Admin","2 min ago"],
  ["Conor Walsh","Procurement Lead","conor.walsh@example.com","Head Office Demo","active","Manager","14 min ago"],
  ["Niamh Byrne","Finance Manager","niamh.byrne@example.com","Head Office Demo","active","Manager","34 min ago"],
  ["Sean Murphy","Inventory Controller","sean.murphy@example.com","Central Depot Demo","active","Standard","1 h ago"],
  ["Emma Ryan","Regional Manager","emma.ryan@example.com","Dublin Demo 03","active","Manager","52 min ago"],
  ["Liam Doyle","Store Manager","liam.doyle@example.com","Galway Demo 01","active","Standard","3 h ago"],
  ["Sarah Nolan","Customer Service Lead","sarah.nolan@example.com","Head Office Demo","active","Standard","1 h ago"],
  ["David Burke","Systems Administrator","david.burke@example.com","Head Office Demo","active","Admin","2 h ago"]
];
const ROLE_LEVELS = ["Admin","Manager","Standard","External"];
const PERM_KEYS = [["view","View records"],["edit","Edit records"],["approve","Approve payments"]];
const GRANT_DEFS = [
  ["view","View records","Read anything in scope"],
  ["edit","Edit records","Create and change records"],
  ["approve","Approve decisions","Say yes to parked work"],
  ["pay","Release payments","Send money out"],
  ["export","Export data","Download and share out"],
  ["agents","Manage agents","Create and grant agents"],
  ["settings","Change settings","Modules, roles, integrations"],
  ["audit","Read the audit log","Every action, everyone"]
];
const ROLE_SCOPES = ["All records","Their location","Assigned only"];
const DEFAULT_PERMS = {Admin:{view:true,edit:true,approve:true}, Manager:{view:true,edit:true,approve:true},
  Standard:{view:true,edit:true,approve:false}, External:{view:true,edit:false,approve:false}};
const INTEGRATIONS = [
  {name:"POS connector", blurb:"Till transactions and card totals per store. Simulated, vendor not specified. 110 feeds synced, 4 stores send manual totals.", tint:"#f0994b", status:"Simulated", statusKind:"warn",
   glyph:"M5 6.5h14v9H5v-9Z M8 19h8 M12 15.5V19",
   lastSync:"Simulated, 08:05 today", usage:"110 of 114 store feeds", auth:"Simulated", scopes:["Read"],
   fields:"store, till id, transaction time, tender, amount"},
  {name:"Online ordering feed", blurb:"Web and app orders with value and fulfilment store. Simulated feed for the demonstration.", tint:"#6ad0f0", status:"Simulated", statusKind:"warn",
   glyph:"M4 6h2.4l1.6 8h9l1.6-6H7 M10 19a1 1 0 1 0 0-.01 M16 19a1 1 0 1 0 0-.01",
   lastSync:"Simulated, 08:10 today", usage:"2,000 orders today", auth:"Simulated", scopes:["Read"],
   fields:"order id, store, basket value, channel, status"},
  {name:"Purchasing spreadsheet imports", blurb:"Requisitions, purchase orders and price agreements loaded from spreadsheets. Simulated import.", tint:"#7fd8a4", status:"Simulated", statusKind:"warn",
   glyph:"M6 4.5h9l3 3v12H6v-15Z M9 12h6 M9 15.5h6",
   lastSync:"Simulated, 07:45 today", usage:"PO-1036, PO-1042, PO-1048", auth:"File upload", scopes:["Read"],
   fields:"PO number, supplier, SKU, quantity, unit price"},
  {name:"Inventory spreadsheet imports", blurb:"Stock on hand, batches and expiry dates per location. Simulated import.", tint:"#c8b4f0", status:"Simulated", statusKind:"warn",
   glyph:"M4.5 8 12 4l7.5 4v8L12 20l-7.5-4V8Z M4.5 8 12 12l7.5-4 M12 12v8",
   lastSync:"Simulated, 07:50 today", usage:"3 locations in the demo", auth:"File upload", scopes:["Read"],
   fields:"location, SKU, batch, quantity, expiry date"},
  {name:"Delivery docket capture", blurb:"Photographed dockets read into goods receipts. Simulated capture, no scanner connected.", tint:"#e6c78a", status:"Simulated", statusKind:"warn",
   glyph:"M7 3.5h10v17H7v-17Z M9.5 8h5 M9.5 11.5h5 M9.5 15h3",
   lastSync:"Simulated, 08:20 today", usage:"PO-1036 docket matched", auth:"Simulated", scopes:["Read"],
   fields:"docket number, PO number, SKU, quantity received"},
  {name:"Accounting export", blurb:"Approved invoices exported to the accounting ledger. Simulated, vendor not specified.", tint:"#8fa6ff", status:"Simulated", statusKind:"warn",
   glyph:"M4.5 12a7.5 7.5 0 0 1 12.8-5.3 M19.5 12a7.5 7.5 0 0 1-12.8 5.3 M17.3 4v3.3h-3.3 M6.7 20v-3.3H10",
   lastSync:"Simulated, 06:30 today", usage:"1 invoice held (INV-2081)", auth:"Simulated", scopes:["Write"],
   fields:"invoice id, supplier, net, VAT, GL code, status"},
  {name:"Banking export", blurb:"Payment proposal file for a human to review. Simulated: no bank is connected and nothing can be paid from here.", tint:"var(--dim)", status:"Simulated", statusKind:"warn",
   glyph:"M4 9.5 12 5l8 4.5 M6 10v7 M10 10v7 M14 10v7 M18 10v7 M4 19h16",
   lastSync:"Simulated, none sent", usage:"No bank connected", auth:"None", scopes:[],
   fields:"payee, invoice id, amount, due date"}
];

/* Background catalogue. Each entry is pure CSS so a tile is the real thing at
   thumbnail size, not a picture of it. */
const BG_DEFS = [
  {id:"bloom", name:"Bloom", cat:"Signature",
   css:"background:radial-gradient(60% 48% at 50% 34%, var(--accent-faint), transparent 72%), radial-gradient(44% 38% at 16% 84%, rgba(255,255,255,.05), transparent 70%)",
   thumb:"background:radial-gradient(62% 58% at 46% 34%, var(--accent-soft), transparent 74%), radial-gradient(50% 46% at 82% 84%, rgba(255,255,255,.08), transparent 72%), var(--surface-2)"},
  {id:"mist", name:"Mist", cat:"Signature",
   css:"background:radial-gradient(52% 44% at 24% 22%, rgba(255,255,255,.07), transparent 70%), radial-gradient(56% 46% at 80% 76%, rgba(255,255,255,.05), transparent 72%)",
   thumb:"background:radial-gradient(58% 52% at 24% 22%, rgba(255,255,255,.16), transparent 72%), radial-gradient(60% 54% at 82% 78%, rgba(255,255,255,.10), transparent 74%), var(--surface-2)"},
  {id:"grid", name:"Grid", cat:"Signature",
   css:"background-image:linear-gradient(var(--border) 1px, transparent 1px),linear-gradient(90deg, var(--border) 1px, transparent 1px);background-size:56px 56px;mask-image:radial-gradient(62% 56% at 50% 46%, #000, transparent 78%);-webkit-mask-image:radial-gradient(62% 56% at 50% 46%, #000, transparent 78%)",
   thumb:"background-color:var(--surface-2);background-image:linear-gradient(var(--border-strong) 1px, transparent 1px),linear-gradient(90deg, var(--border-strong) 1px, transparent 1px);background-size:14px 14px"},
  {id:"none", name:"None", cat:"Signature", css:"", thumb:"background:var(--surface-2)"},

  {id:"aurora", name:"Aurora", cat:"Gradient",
   css:"background:radial-gradient(70% 52% at 18% 8%, var(--bloom-a), transparent 66%), radial-gradient(64% 48% at 84% 22%, var(--bloom-b), transparent 68%), radial-gradient(70% 60% at 50% 104%, var(--bloom-c), transparent 70%);filter:blur(24px)",
   thumb:"background:radial-gradient(72% 60% at 16% 6%, var(--bloom-a), transparent 68%), radial-gradient(66% 54% at 86% 24%, var(--bloom-b), transparent 70%), radial-gradient(74% 66% at 50% 108%, var(--bloom-c), transparent 72%), var(--surface-2)"},
  {id:"horizon", name:"Horizon", cat:"Gradient",
   css:"background:linear-gradient(180deg, transparent 0%, var(--accent-faint) 58%, transparent 100%), radial-gradient(90% 40% at 50% 72%, var(--accent-soft), transparent 70%)",
   thumb:"background:linear-gradient(180deg, var(--surface-2) 0%, var(--accent-faint) 58%, var(--surface-2) 100%), radial-gradient(90% 44% at 50% 74%, var(--accent-soft), transparent 70%)"},
  {id:"dusk", name:"Dusk", cat:"Gradient",
   css:"background:linear-gradient(200deg, var(--bloom-c) -10%, transparent 46%), linear-gradient(20deg, var(--bloom-b) -10%, transparent 52%);opacity:.5",
   thumb:"background:linear-gradient(200deg, var(--bloom-c) -12%, transparent 48%), linear-gradient(20deg, var(--bloom-b) -12%, transparent 54%), var(--surface-2)"},
  {id:"ember", name:"Ember", cat:"Gradient",
   css:"background:radial-gradient(60% 70% at 84% 96%, var(--bloom-a), transparent 64%), radial-gradient(50% 60% at 10% 96%, var(--bloom-c), transparent 66%)",
   thumb:"background:radial-gradient(64% 76% at 84% 100%, var(--bloom-a), transparent 66%), radial-gradient(54% 66% at 8% 100%, var(--bloom-c), transparent 68%), var(--surface-2)"},

  {id:"mesh", name:"Mesh", cat:"Abstract",
   css:"background-image:radial-gradient(var(--border-strong) 1px, transparent 1px);background-size:22px 22px;mask-image:radial-gradient(70% 62% at 50% 46%, #000, transparent 76%);-webkit-mask-image:radial-gradient(70% 62% at 50% 46%, #000, transparent 76%)",
   thumb:"background-color:var(--surface-2);background-image:radial-gradient(var(--border-strong) 1px, transparent 1px);background-size:8px 8px"},
  {id:"contour", name:"Contour", cat:"Abstract",
   css:"background:repeating-radial-gradient(circle at 30% 110%, transparent 0 22px, var(--border) 22px 23px);mask-image:radial-gradient(80% 70% at 40% 80%, #000, transparent 78%);-webkit-mask-image:radial-gradient(80% 70% at 40% 80%, #000, transparent 78%)",
   thumb:"background:repeating-radial-gradient(circle at 26% 116%, var(--surface-2) 0 9px, var(--border-strong) 9px 10px)"},
  {id:"weave", name:"Weave", cat:"Abstract",
   css:"background:repeating-linear-gradient(48deg, transparent 0 16px, var(--border) 16px 17px), repeating-linear-gradient(-48deg, transparent 0 16px, var(--border) 16px 17px);opacity:.7",
   thumb:"background-color:var(--surface-2);background-image:repeating-linear-gradient(48deg, transparent 0 7px, var(--border-strong) 7px 8px), repeating-linear-gradient(-48deg, transparent 0 7px, var(--border-strong) 7px 8px)"},
  {id:"halo", name:"Halo", cat:"Abstract",
   css:"background:repeating-radial-gradient(circle at 50% 50%, transparent 0 46px, var(--accent-line) 46px 47px);mask-image:radial-gradient(60% 60% at 50% 50%, #000, transparent 72%);-webkit-mask-image:radial-gradient(60% 60% at 50% 50%, #000, transparent 72%)",
   thumb:"background:repeating-radial-gradient(circle at 50% 50%, var(--surface-2) 0 11px, var(--accent-line) 11px 12px)"},
  {id:"drift", name:"Drift", cat:"Abstract",
   css:"background:conic-gradient(from 210deg at 32% 38%, var(--bloom-b), transparent 38%), conic-gradient(from 20deg at 76% 70%, var(--bloom-a), transparent 34%);filter:blur(30px);opacity:.6",
   thumb:"background:conic-gradient(from 210deg at 32% 38%, var(--bloom-b), transparent 38%), conic-gradient(from 20deg at 76% 70%, var(--bloom-a), transparent 34%), var(--surface-2)"},
  {id:"scan", name:"Scanlines", cat:"Abstract",
   css:"background:repeating-linear-gradient(0deg, var(--border) 0 1px, transparent 1px 7px);mask-image:linear-gradient(180deg, #000, transparent 88%);-webkit-mask-image:linear-gradient(180deg, #000, transparent 88%)",
   thumb:"background-color:var(--surface-2);background-image:repeating-linear-gradient(0deg, var(--border-strong) 0 1px, transparent 1px 5px)"}
];

const THEMES = [
  {id:"dark", label:"Dark", group:"Dark", bg:"#0b0c0b", surface:"#1a1c19", ink:"#f2f3ef", accent:"#c8f04b"},
  {id:"indigo", label:"Indigo", group:"Dark", bg:"#0a0b13", surface:"#1a1b26", ink:"#f0f1fa", accent:"#8b93ff"},
  {id:"slate", label:"Slate", group:"Dark", bg:"#100e0c", surface:"#211c17", ink:"#f4f0ea", accent:"#e8a14a"},
  {id:"plum", label:"Plum", group:"Dark", bg:"#100a10", surface:"#20151f", ink:"#f6eef4", accent:"#f077b0"},
  {id:"ember", label:"Ember", group:"Dark", bg:"#0b0b0b", surface:"#1c1714", ink:"#f7f3ef", accent:"#f4561a"},
  {id:"harbour", label:"Harbour", group:"Dark", bg:"#0b0e10", surface:"#13171a", ink:"#f3f5f4", accent:"#5ee79a"},
  {id:"cargo", label:"Cargo", group:"Dark", bg:"#0a0a0a", surface:"#1a1c1a", ink:"#f2f5f2", accent:"#4ade80"},
  {id:"ocean", label:"Ocean", group:"Dark", bg:"#080e12", surface:"#141f25", ink:"#eaf4f8", accent:"#4fd4d0"},
  {id:"graphite", label:"Graphite", group:"Dark", bg:"#111112", surface:"#212124", ink:"#f4f4f5", accent:"#f4f4f5"},
  {id:"light", label:"Cream", group:"Light", bg:"#f4f2ed", surface:"#ffffff", ink:"#16181c", accent:"#0071e3"},
  {id:"warm", label:"Warm paper", group:"Light", bg:"#faf5ec", surface:"#fffdf9", ink:"#2a2016", accent:"#c9683f"},
  {id:"mist", label:"Mist", group:"Light", bg:"#eef1f4", surface:"#ffffff", ink:"#141e20", accent:"#0e9f6e"},
  {id:"sand", label:"Sand", group:"Light", bg:"#f6f1e6", surface:"#fffdf7", ink:"#221d12", accent:"#7d5fd6"}
];

const ADMIN_ICONS = {
  people:"M12 12.5a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z M5 20.2c.9-3.1 3.6-4.9 7-4.9s6.1 1.8 7 4.9",
  teams:"M9 12a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 9 12Z M16.5 12.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z M2.6 19.6c.8-2.8 3.2-4.4 6.4-4.4s5.6 1.6 6.4 4.4 M17 15.4c2.2.4 3.7 1.8 4.3 4.2",
  structure:"M4.5 20V6.4A1.4 1.4 0 0 1 5.9 5h6.2a1.4 1.4 0 0 1 1.4 1.4V20 M13.5 10.5h4.6A1.4 1.4 0 0 1 19.5 12v8 M3 20h18 M7.5 8.5h2.5 M7.5 12h2.5",
  shield:"M12 3.6 19.5 6v6.1c0 4-3.1 6.9-7.5 8.3-4.4-1.4-7.5-4.3-7.5-8.3V6L12 3.6Z M9.2 12.2l2 2 3.6-3.7",
  agent:"M2 12h4l2.5-6 3.5 12 3-8 2 2h5",
  flow:"M18.5 8.5A5 5 0 0 0 8.9 7.3 3.8 3.8 0 0 0 6 14.6 M8 17.5l3.2 3.2 M11.2 20.7l3.2-3.2 M11.2 20.7V9.6",
  plug:"M9 3.5v5 M15 3.5v5 M6.5 8.5h11v3a5.5 5.5 0 0 1-11 0v-3Z M12 17v3.5",
  modules:"M6.6 4.4h10.8a2.2 2.2 0 0 1 2.2 2.2v10.8a2.2 2.2 0 0 1-2.2 2.2H6.6a2.2 2.2 0 0 1-2.2-2.2V6.6a2.2 2.2 0 0 1 2.2-2.2Z M4.4 9.6h15.2 M9.6 19.6V9.6",
  health:"M3 12.5h3.4l2-5 3 10 2.2-5H21",
  lock:"M6.5 10.5h11a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19v-7a1.5 1.5 0 0 1 1.5-1.5Z M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3",
  audit:"M8 3.5h8l3.5 3.5v13a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 6 3.5h2Z M9 12h6 M9 16h4",
  brand:"M12 3.5 14.6 9l6.4.6-4.8 4.2 1.4 6.2-5.6-3.3-5.6 3.3 1.4-6.2L3 9.6 9.4 9 12 3.5Z",
  bell:"M6 8.5a6 6 0 0 1 12 0c0 6.5 2.6 8.5 2.6 8.5H3.4S6 15 6 8.5Z M10.3 20.5a1.94 1.94 0 0 0 3.4 0",
  data:"M4.5 7.5c0-1.7 3.4-3 7.5-3s7.5 1.3 7.5 3-3.4 3-7.5 3-7.5-1.3-7.5-3Z M4.5 7.5v9c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-9 M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"
};

const ADMIN_CARDS = [
  {id:"structure", group:"ORGANISATION", title:"Organisation", icon:"structure", tint:"#f0c04b",
   blurb:"The group, its regions, stores and depots in the demonstration.",
   tags:["114 stores","4 demo locations","Europe/Dublin","EUR"],
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Company details","Supermac's (demonstration)"],["Regions","3 demo regions"],["Stores","114"],["Demo locations","4"],
     ["Reporting lines","5"],["Trading hours","Set per store"],["Public holidays","Irish public holidays"],
     ["Default currency and timezone","EUR · Europe/Dublin"]]},
  {id:"people", group:"ORGANISATION", title:"People & access", icon:"people", tint:"#6ad0f0",
   blurb:"The eight demo users and what each of them can reach.",
   tags:["8 people","7 teams","4 locations"], badge:"0 waiting", badgeKind:"warn",
   footer:"Demonstration data only", action:"Review users",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Add, invite or remove users","",""],["Create teams","7 teams"],["Assign managers","5 reporting lines"],
     ["Set locations","Head Office Demo · Central Depot Demo · Galway Demo 01 · Dublin Demo 03"],["Suspend accounts","0 suspended"],["View last login","8 people tracked"]]},
  {id:"modules", group:"ORGANISATION", title:"Modules & terminology", icon:"modules", tint:"#f0c04b",
   blurb:"Which modules are on, and the words the demo uses for the business.",
   tags:["6 modules","3 renamed terms"],
   heroLabel:"TERMINOLOGY", heroAction:"Edit terminology",
   heroText:"Organisation reads as Supplier or Store, and Task reads as Action, everywhere in the interface, including what the assistant says back to you.",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Enable or disable modules","6 installed"],["Rename business terminology","3 overridden"],
     ["Create custom fields","12 fields"],["Configure statuses","5 sets"],["Edit record types","9 types"],
     ["Set required information","per record type"],["Manage form layouts","4 layouts"]]},

  {id:"teams", group:"TEAMS & PERMISSIONS", title:"Roles & permissions", icon:"shield", tint:"var(--accent)",
   blurb:"Permission templates, and exactly what each person can reach.",
   tags:["4 roles","64 permissions","3 scopes"],
   heroLabel:"THE QUESTION THIS ANSWERS", heroAction:"Show me what someone can access",
   heroText:"Pick a person and see every record, action and export they can reach, resolved through their grants and not guessed from the menus.",
   footer:"Preview the demo as another user", action:"Open preview",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Create permission templates","4 in use"],["View, edit, export and approve access","per permission"],
     ["Restrict by store, region or record owner","3 scopes"],["Set approval limits","Purchase orders over €10,000 need Conor Walsh"],["Preview the demo as another user",""]]},
  {id:"notif", group:"TEAMS & PERMISSIONS", title:"Notifications", icon:"bell", tint:"#f0994b",
   blurb:"Which events reach people, on which channel, and when not to.",
   tags:["Inbox","Email","Quiet 19:00 to 07:00"],
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Which events trigger notifications","12 of 20 events"],["Email","", true],["WhatsApp","", false],
     ["Mobile push","", false],["In-app","", true],["Escalation rules","after 4 hours unread"],
     ["Quiet hours","19:00 to 07:00"],["Daily and weekly summaries","07:00 daily"]]},

  {id:"integrations", group:"SYSTEMS", title:"Systems", icon:"plug", tint:"#6ad0f0",
   blurb:"POS, online orders, spreadsheet imports, dockets, accounting and banking. Every connection here is simulated.",
   tags:["7 simulated","0 connected","No bank connected"], badge:"All simulated", badgeKind:"warn",
   footer:"Nothing here reads from or writes to a real system", action:"View systems",
   listLabel:"CONNECTIONS",
   rows:[["POS connector","simulated"],["Online ordering feed","simulated"],["Purchasing spreadsheet imports","simulated"],
     ["Inventory spreadsheet imports","simulated"],["Delivery docket capture","simulated"],["Accounting export","simulated"],["Banking export","simulated, no bank"]]},
  {id:"health", group:"SYSTEMS", title:"Data quality", icon:"health", tint:"#e2705c",
   blurb:"What is wrong with the data, how bad it is, and the fix.",
   tags:["7 issue types","75 records affected"], badge:"4 manual totals", badgeKind:"warn",
   footer:"Last simulated scan 08:00 today", action:"Review issues",
   listLabel:"ISSUES FOUND",
   trend:[112,104,98,91,86,80,75],
   bySeverity:[["High","7",RED],["Medium","46",AMBER],["Low","22",DIM]],
   issues:[["Stores on manual totals","4","high","4 of 114 stores entered today's totals by hand","Review"],
     ["Unmatched invoices","3","high","Invoices with no goods receipt to match","Review"],
     ["Unmapped SKUs","37","medium","POS lines with no matching SKU code","Review"],
     ["Missing docket scans","9","medium","Deliveries with no matched docket","Review"],
     ["Duplicate supplier records","6","low","Same supplier under two names","Review"],
     ["Stale price agreements","11","low","Not reviewed in over 12 months","Review"],
     ["Records needing review","5","low","Flagged by an agent as inconsistent","Review"]],
   rows:[]},
  {id:"datamgmt", group:"SYSTEMS", title:"Data management", icon:"data", tint:"#5fe0a8",
   blurb:"Import, export, restore and, carefully, delete.",
   tags:["Synthetic data","Reset any time"],
   footer:"Demonstration data can be reset at any time", action:"Reset demo data",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Import data","CSV and spreadsheet (simulated)"],["Export data","full or per module"],["Backup status","not applicable"],
     ["Restore previous versions","30 days available"],["Merge records","6 candidates"],
     ["Data retention","7 years"],["Delete demo data","requires two admins"]]},

  {id:"agents", group:"GOVERNANCE & AI CONTROLS", title:"Agents & AI controls", icon:"agent", tint:"var(--accent)",
   blurb:"What agents may read, what they may do, and where they must stop.",
   tags:["7 agents","Human approval on every write"],
   heroLabel:"GLOBAL CONTROL", heroAction:"Pause every agent",
   heroText:"One switch stops every agent immediately. Anything mid-run finishes its current step and then holds.",
   footer:"Agents propose. People approve. Nothing is sent or paid automatically.", action:"Review limits",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Create approved agent roles","7 approved"],["Control which data agents can read","by permission"],
     ["Control which actions agents can take","read · draft · never send"],["Set approval requirements","all write tools", true],
     ["Automatic write-offs","off", false],["Manage agent memory and retention","90 days"]]},
  {id:"wf", group:"GOVERNANCE & AI CONTROLS", title:"Workflow controls", icon:"flow", tint:"#9d8cf5",
   blurb:"The guardrails, not the builder. Building lives under Work.",
   tags:["Managers only","3 approval rules","Retry twice"],
   footer:"Building workflows happens in Work", action:"Open Work",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Who can create workflows","Managers only"],["Maximum autonomy","proposes, never pays", true],
     ["Approval rules","3 configured"],["Failure handling","retry twice, then notify"],
     ["Usage limits","500 runs/day"],["Global pause","all workflows", true],["Default notification settings","inbox only"]]},
  {id:"security", group:"GOVERNANCE & AI CONTROLS", title:"Security", icon:"lock", tint:"#8fa6ff",
   blurb:"Sign-in, sessions, devices and the keys that reach the API.",
   tags:["SSO on","2FA enforced"], badge:"Demo only", badgeKind:"warn",
   footer:"Demonstration settings, no real accounts", action:"Review",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Single sign-on","Simulated", true],["Two-factor authentication","enforced", true],
     ["Login policies","30-day session"],["Active sessions","8"],["Approved devices","8"],
     ["IP restrictions","off", false],["Security alerts","on", true],["API keys","0 active"],
     ["Data retention rules","7 years"]]},
  {id:"audit", group:"GOVERNANCE & AI CONTROLS", title:"Audit log", icon:"audit", tint:"#9d8cf5",
   blurb:"A locked history of who changed what. Searchable, exportable, never editable.",
   tags:["Append-only","7-year retention"],
   footer:"Nobody can edit or delete entries", action:"Export",
   listLabel:"WHAT IS RECORDED",
   rows:[["Permission changes","3 this month"],["User access","24"],["Data exports","2"],
     ["System changes","4"],["Agent actions","212"],["Approvals decided","9"],["Admin changes","6"]]},

  {id:"brand", group:"EXPERIENCE", title:"Branding", icon:"brand", tint:"var(--accent)",
   blurb:"Logo, accent colour, templates and how agents appear.",
   tags:["Demo branding","2 templates"],
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Company logo","supermacs-demo-mark.svg"],["Accent colour","Harbour green"],
     ["Email templates","3"],["Document templates","2"],["Agent appearance","12 faces · 6 shells"]]},
  {id:"appearance", group:"EXPERIENCE", title:"Appearance & themes", icon:"brand", tint:"#6ad0f0",
   blurb:"Pick a light or dark theme for how the demo looks to you.",
   tags:["13 themes","9 dark","4 light"],
   listLabel:"THEMES", rows:[]}
];

const ADMIN_GROUPS = [
  ["ORGANISATION", "repeat(3,1fr)"],
  ["TEAMS & PERMISSIONS", "repeat(3,1fr)"],
  ["SYSTEMS", "repeat(3,1fr)"],
  ["GOVERNANCE & AI CONTROLS", "repeat(3,1fr)"],
  ["EXPERIENCE", "repeat(3,1fr)"]
];

/* ---- activity feeds ---- */
const SRC_TINT = {POS:"#f0994b", "Online orders":"#6ad0f0", "Docket capture":"#e6c78a", Purchasing:"#7fd8a4",
  Inventory:"#c8b4f0", Accounting:"#8fa6ff", Pulse:"var(--accent)", Agent:"var(--accent)"};
const SRC_ABBR = {POS:"PS", "Online orders":"OO", "Docket capture":"DC", Purchasing:"PU", Inventory:"IN", Accounting:"AC", Pulse:"PL", Agent:"AI"};

const DATA_EVENTS = [
  ["Till feed received","110 store feeds synced: 28,000 transactions, €392,000, average €14.","POS connector","110 stores","POS","completed"],
  ["Manual totals entered","4 stores sent manual totals instead of a feed. Flagged for data quality.","Store managers","4 stores","POS","awaiting"],
  ["Online orders received","2,000 orders, €100,000, average €50.","Online ordering feed","Online","Online orders","completed"],
  ["Delivery docket captured","Docket for PO-1036 read: 96 of 100 cases received.","Docket capture","Dairy Supply Demo","Docket capture","completed"],
  ["Purchase order imported","PO-1048 for 400 cases of CHK-001 loaded from the purchasing sheet.","Purchasing import","West Coast Foods Demo","Purchasing","completed"],
  ["Price variance found","Quote of €52 per case against the agreed €48 on CHK-001.","Purchasing import","West Coast Foods Demo","Purchasing","awaiting"],
  ["Stock file imported","Galway Demo 01 shows 18 cases of FRY-001 on hand.","Inventory import","Galway Demo 01","Inventory","completed"],
  ["Invoice exported to hold","INV-2081 held back from the accounting export: billed 100, received 96.","Accounting export","Dairy Supply Demo","Accounting","failed"],
  ["Card settlement received","Dublin Demo 03 settlement of €12,220 against POS card sales of €12,640.","POS connector","Dublin Demo 03","POS","awaiting"]
];

const PEOPLE_EVENTS = [
  ["Conor Walsh opened PO-1042","€18,000 for 1,200 cases from Greenfield Packaging Demo, still awaiting his decision.","Conor Walsh","Greenfield Packaging Demo","Pulse","awaiting"],
  ["Sean Murphy checked FRY-001","Cover at Galway Demo 01 confirmed at 1.5 days against a 3 day lead time.","Sean Murphy","Galway Demo 01","Pulse","completed"],
  ["Niamh Byrne started a reconciliation","Dublin Demo 03 card difference of €420 assigned to her.","Niamh Byrne","Dublin Demo 03","Pulse","completed"],
  ["Emma Ryan reviewed store exceptions","Two stores flagged for follow-up this morning.","Emma Ryan","Regions","Pulse","completed"],
  ["Liam Doyle confirmed a count","18 cases of FRY-001 counted at Galway Demo 01.","Liam Doyle","Galway Demo 01","Pulse","completed"],
  ["Sarah Nolan logged a service issue","Online order query linked to the order record.","Sarah Nolan","Online","Pulse","completed"],
  ["David Burke checked feeds","110 of 114 store feeds synced, 4 on manual totals.","David Burke","POS connector","Pulse","completed"],
  ["Corrected quote requested","Request to West Coast Foods Demo drafted, waiting for Conor Walsh.","Conor Walsh","West Coast Foods Demo","Pulse","awaiting"]
];

const AI_EVENTS = [
  ["Procurement Agent compared a quote","PO-1048 is €1,600 above the agreed price on 400 cases of CHK-001.","Procurement Agent","West Coast Foods Demo","Agent","working"],
  ["Finance Agent held an invoice","INV-2081 bills €3,000 against €2,880 received. €120 dispute blocks the payment proposal.","Finance Agent","Dairy Supply Demo","Agent","working"],
  ["Stock Agent projected cover","FRY-001 at Galway Demo 01 covers 1.5 days. Transfer of 36 cases proposed.","Stock Agent","Galway Demo 01","Agent","working"],
  ["Data Quality Agent checked feeds","4 stores are on manual totals today.","Data Quality Agent","POS connector","Agent","completed"],
  ["Agent paused for approval","Corrected quote request to West Coast Foods Demo needs a human yes before it goes.","Procurement Agent","West Coast Foods Demo","Agent","awaiting"],
  ["Ops Watchdog flagged a difference","Dublin Demo 03 card sales exceed settlement by €420. Cause not yet known.","Ops Watchdog","Dublin Demo 03","Agent","awaiting"],
  ["Stock Agent flagged expiry","SAUCE-004 batch B-062: 80 units, €320, expires in 2 days.","Stock Agent","Central Depot Demo","Agent","working"],
  ["Briefing Agent prepared the morning brief","Six items, two need a decision from you.","Briefing Agent","Aoife Kelly","Agent","completed"]
];

const STREAM_DEFS = [
  {id:"data", title:"New data", sub:"Information entering Pulse", pool:DATA_EVENTS, every:3200,
   tint:"#6ad0f0", icon:"M4.5 7.5c0-1.7 3.4-3 7.5-3s7.5 1.3 7.5 3-3.4 3-7.5 3-7.5-1.3-7.5-3Z M4.5 7.5v9c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-9 M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"},
  {id:"people", title:"Employee activity", sub:"Decisions people made", pool:PEOPLE_EVENTS, every:6400,
   tint:"#f0c04b", icon:"M12 12.5a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z M5 20.2c.9-3.1 3.6-4.9 7-4.9s6.1 1.8 7 4.9"},
  {id:"ai", title:"AI activity", sub:"Agents at work", pool:AI_EVENTS, every:4600,
   tint:"var(--accent)", icon:"M2 12h4l2.5-6 3.5 12 3-8 2 2h5"}
];

const NAV = [
  {label:"Home", icon:"helios", page:"Home"},
  {label:"Agents", icon:"navAgents", page:"Agents"},
  {label:"Dashboard", icon:"navDash", page:"Dashboard", dot:true},
  {label:"Stores & Sales", icon:"locations", page:"Stores & Sales"},
  {label:"Procurement", icon:"orgs", page:"Procurement"},
  {label:"Inventory", icon:"modules", page:"Inventory"},
  {label:"Finance", icon:"insights", page:"Finance"},
  {label:"Customers", icon:"people", page:"Customers"},
  {label:"Work", icon:"navWork", page:"Work"},
  {label:"Records", icon:"navRecords", page:"Records"},
  {label:"Activity", icon:"pulseLine", page:"Activity", dot:true}
];

/* Inbox items follow the real InboxItem shape: what happened, why it matters, what I can do. */
const ITEMS = {
  po:{kind:"Approval", importance:"high", icon:ICONS.approvals, age:"1h",
    title:"PO-1042 awaiting approval: Greenfield Packaging Demo, €18,000",
    why:"1,200 cases at €15 per case. Conor Walsh is the approver. Approval is a decision to buy, not proof of delivery or payment.",
    detail:"The order is complete and matches the supplier's quote. Nothing has been delivered and nothing has been paid. Approving records the decision as the approver. Stock and payments do not change from an approval.",
    actionLabel:"Review approval", secondaryLabel:"Nudge Conor Walsh", group:"Approvals",
    fields:[{k:"Purchase order",v:"PO-1042"},{k:"Supplier",v:"Greenfield Packaging Demo"},{k:"Value",v:"1,200 cases x €15 = €18,000"},{k:"Approver",v:"Conor Walsh"}],
    history:[{when:"Today 07:45",text:"PO-1042 loaded from the purchasing sheet (simulated)"},{when:"Today 07:46",text:"Routed to Conor Walsh for approval"}]},
  price:{kind:"Alert", importance:"high", icon:ICONS.insights, age:"2h",
    title:"PO-1048 chicken quote is €4 a case above the agreed price",
    why:"CHK-001 (10kg case) is agreed at €48 but quoted at €52. On 400 cases the variance is €1,600. Request a corrected quote.",
    detail:"West Coast Foods Demo quoted €52 per case against the price agreement of €48. This is a variance to query with the supplier. It is not a saving, and nothing is recovered until a corrected quote or credit is issued.",
    actionLabel:"Request corrected quote", secondaryLabel:"Open price agreement", group:"Alerts",
    fields:[{k:"Purchase order",v:"PO-1048"},{k:"SKU",v:"CHK-001, 10kg case"},{k:"Agreed vs quoted",v:"€48 vs €52 per case"},{k:"Variance",v:"400 cases = €1,600"}],
    history:[{when:"Today 07:45",text:"PO-1048 loaded from the purchasing sheet (simulated)"},{when:"Today 07:47",text:"Procurement Agent compared the quote to the price agreement"}]},
  invoice:{kind:"Alert", importance:"high", icon:ICONS.health, age:"3h",
    title:"INV-2081 bills 100 cases but 96 were received",
    why:"Billed €3,000 against €2,880 received. The €120 dispute blocks the payment proposal for Dairy Supply Demo.",
    detail:"PO-1036 ordered 100 cases at €30. The docket shows 96 received. INV-2081 bills all 100. The invoice is held from the accounting export until a credit note arrives or delivery of the last 4 cases is proven.",
    actionLabel:"Open invoice dispute", secondaryLabel:"Snooze", group:"Alerts",
    fields:[{k:"Invoice",v:"INV-2081"},{k:"Purchase order",v:"PO-1036"},{k:"Billed vs received",v:"€3,000 vs €2,880"},{k:"Dispute",v:"€120"}],
    history:[{when:"Today 08:20",text:"Docket for PO-1036 captured: 96 cases (simulated)"},{when:"Today 08:22",text:"Three-way match failed on INV-2081"}]},
  galway:{kind:"Task", importance:"high", icon:ICONS.work, age:"3h",
    title:"Galway Demo 01 will run short of FRY-001",
    why:"18 cases on hand, 12 cases a day, so 1.5 days of cover against a 3 day lead time. Transfer 36 cases from Central Depot Demo.",
    detail:"A transfer request of 36 cases from Central Depot Demo is proposed. Stock only changes when a receipt is recorded in the simulation. Requesting the transfer does not move any stock.",
    actionLabel:"Review transfer request", secondaryLabel:"Assign to Sean Murphy", group:"Work",
    fields:[{k:"SKU",v:"FRY-001"},{k:"On hand",v:"18 cases"},{k:"Cover",v:"1.5 days (12 cases a day)"},{k:"Proposed",v:"36 cases from Central Depot Demo"}],
    history:[{when:"Today 07:50",text:"Inventory import showed 18 cases (simulated)"},{when:"Today 07:52",text:"Stock Agent projected 1.5 days of cover"}]},
  dublin:{kind:"Task", importance:"normal", icon:ICONS.visits, age:"4h",
    title:"Dublin Demo 03 card sales differ from settlement by €420",
    why:"POS card sales €12,640 against settlement €12,220. The difference is unexplained. Owner is Niamh Byrne. No conclusion has been drawn about the cause.",
    detail:"Timing, refunds and terminal batches are the first things to check. Nothing here indicates theft, and none should be assumed. The reconciliation stays open until the difference is explained.",
    actionLabel:"Start reconciliation", secondaryLabel:"Reassign", group:"Work",
    fields:[{k:"Store",v:"Dublin Demo 03"},{k:"POS card",v:"€12,640"},{k:"Settlement",v:"€12,220"},{k:"Owner",v:"Niamh Byrne"}],
    history:[{when:"Today 06:30",text:"Card settlement received (simulated)"},{when:"Today 08:00",text:"Difference of €420 flagged"}]},
  sauce:{kind:"Alert", importance:"normal", icon:ICONS.autos, age:"5h",
    title:"SAUCE-004 batch B-062 expires in 2 days",
    why:"80 units at €4 is €320 of exposure. Propose a transfer or prioritised use. Nothing is written off automatically.",
    detail:"Batch B-062 expires on Friday 16 October. Options are a transfer to a busier location or prioritised use in stores. A write-off is a human decision and is not proposed.",
    actionLabel:"Propose transfer or use", secondaryLabel:"Assign to Sean Murphy", group:"Alerts",
    fields:[{k:"SKU",v:"SAUCE-004, batch B-062"},{k:"Quantity",v:"80 units x €4"},{k:"Exposure",v:"€320"},{k:"Expires",v:"Fri 16 Oct 2026"}],
    history:[{when:"Today 07:50",text:"Inventory import showed batch B-062 (simulated)"},{when:"Today 07:53",text:"Stock Agent flagged the expiry date"}]}
};
const ORDER = ["price","po","invoice","galway","dublin","sauce"];

const ANSWERS = {
  attention:{tool:"stores_find", effect:"read",
    text:"Three stores or depots need attention today. Galway Demo 01 will run short of FRY-001 in about 1.5 days. Dublin Demo 03 has a €420 difference between POS card sales and settlement, cause unknown. Central Depot Demo holds SAUCE-004 batch B-062, 80 units, expiring in 2 days. Separately, 4 of 114 stores sent manual totals, and 110 feeds synced. Sales figures are illustrative gross receipts.",
    cols:["Site","Issue","Exposure","Owner"],
    rows:[["Galway Demo 01","FRY-001 cover 1.5 days","18 cases","Sean Murphy"],["Dublin Demo 03","Card vs settlement","€420","Niamh Byrne"],["Central Depot Demo","SAUCE-004 expiry","€320","Sean Murphy"]],
    actions:[["Explain the chicken price variance.",1],["Show purchase orders awaiting approval.",0]]},
  chicken:{tool:"purchasing_compare_price", effect:"read",
    text:"PO-1048 orders 400 cases of CHK-001 (10kg case) from West Coast Foods Demo. The agreed price is €48 a case and the quote is €52. That is €4 a case above agreement, a variance of €1,600 across the order. This is a price to query, not a saving. The next step is a corrected quote from the supplier.",
    cols:["Line","Agreed","Quoted","Variance"],
    rows:[["CHK-001, 400 cases","€48 per case","€52 per case","€1,600"]],
    actions:[["Request a corrected quote from West Coast Foods Demo",1],["Prepare the payment proposal.",0]]},
  quote:{tool:"purchasing_draft_quote_request", effect:"write", confirm:true,
    confirmSummary:"Send one request to Grainne Kavanagh at West Coast Foods Demo asking for a corrected quote on PO-1048: CHK-001 at the agreed €48 per case, 400 cases. Simulated: nothing is actually sent.",
    text:"Drafted. This is a write action, so nothing has been sent. Conor Walsh confirms first, and the demonstration only records the confirmation.",
    actions:[["Confirm and send",1],["Edit draft",0]]},
  approvals:{tool:"approvals_find", effect:"read",
    text:"One purchase order is awaiting approval: PO-1042 from Greenfield Packaging Demo, 1,200 cases at €15, €18,000. The approver is Conor Walsh. Approval is a decision to buy. It does not mean the goods have arrived or that anything has been paid.",
    cols:["Purchase order","Supplier","Value","Approver"],
    rows:[["PO-1042","Greenfield Packaging Demo","€18,000","Conor Walsh"]],
    actions:[["Prepare the payment proposal.",1],["What stock expires in the next 48 hours?",0]]},
  expiry:{tool:"stock_expiry_find", effect:"read",
    text:"One batch expires within 48 hours: SAUCE-004 batch B-062, 80 units at €4, €320 of exposure, expiring on Friday 16 October. The suggestion is a transfer to a busier location or prioritised use. Nothing is written off automatically.",
    cols:["SKU","Batch","Units","Exposure"],
    rows:[["SAUCE-004","B-062","80","€320"]],
    actions:[["Propose a transfer or prioritised use for SAUCE-004",1],["Which stores need attention today?",0]]},
  sauceplan:{tool:"stock_draft_transfer", effect:"write", confirm:true,
    confirmSummary:"Propose moving SAUCE-004 batch B-062 (80 units, €320) to the busiest nearby location, or prioritising it in store use before Friday 16 October. Simulated: no stock moves and nothing is written off.",
    text:"Drafted as a proposal for Sean Murphy. It is a write action, so it waits for a human yes. Stock changes only when a receipt is recorded in the simulation.",
    actions:[["Confirm and send",1],["Edit draft",0]]},
  transfer:{tool:"stock_draft_transfer", effect:"write", confirm:true,
    confirmSummary:"Request a transfer of 36 cases of FRY-001 from Central Depot Demo to Galway Demo 01. Simulated: stock only changes on a simulated receipt.",
    text:"Galway Demo 01 holds 18 cases of FRY-001 and uses 12 a day, so cover is 1.5 days against a 3 day lead time. A transfer of 36 cases from Central Depot Demo is proposed. It is a write action, so it waits for a human yes.",
    actions:[["Confirm and send",1],["Edit draft",0]]},
  dublin:{tool:"finance_reconcile_pos", effect:"read",
    text:"Dublin Demo 03 POS card sales are €12,640 and the settlement is €12,220, a difference of €420. It is unexplained. Niamh Byrne owns the reconciliation. Timing, refunds and terminal batches are checked first, and no cause is assumed, theft included.",
    cols:["Measure","Amount","Source","Owner"],
    rows:[["POS card sales","€12,640","POS","Niamh Byrne"],["Settlement","€12,220","Acquirer file","Niamh Byrne"],["Difference","€420","Unexplained","Niamh Byrne"]],
    actions:[["Which stores need attention today?",0],["Prepare the payment proposal.",0]]},
  invoice:{tool:"finance_match_invoice", effect:"read",
    text:"INV-2081 from Dairy Supply Demo bills 100 cases at €30, which is €3,000. PO-1036 ordered 100 and 96 were received, worth €2,880. The €120 difference is a dispute and it blocks the payment proposal for this supplier until a credit note arrives.",
    cols:["Measure","Cases","Amount","Note"],
    rows:[["Ordered PO-1036","100","€3,000","at €30"],["Received","96","€2,880","docket"],["Billed INV-2081","100","€3,000","disputed"]],
    actions:[["Prepare the payment proposal.",1],["Explain the chicken price variance.",0]]},
  payment:{tool:"finance_draft_payment_proposal", effect:"read",
    text:"The draft payment proposal has no payable lines yet. INV-2081 (Dairy Supply Demo) is held: €3,000 billed against €2,880 received, a €120 dispute. PO-1042 is still awaiting approval and is not payable. PO-1048 has a price variance to resolve. No bank is connected, so the proposal is a file for a person to review and nothing is paid from here.",
    cols:["Item","Amount","Status","Reason"],
    rows:[["INV-2081","€3,000","held","€120 dispute"],["PO-1042","€18,000","not payable","awaiting approval"],["PO-1048","€19,200","not payable","price variance"]],
    actions:[["Explain the invoice dispute on INV-2081",0],["Show purchase orders awaiting approval.",0]]},
  fallback:{tool:"core_search", effect:"read",
    text:"I can answer that from the demonstration records: purchase orders, invoices, stock, store sales and settlements. Everything is fictional and simulated. Try one of the suggested questions.",
    actions:[["Which stores need attention today?",0]]}
};

// Turns a plain-English filter name into a full dashboard area — the "primitive
// vibe-coding" bit: no real backend, just a seeded generator so the same phrase
// always produces the same numbers, with direction and vocabulary nudged by
// keywords in the text (expansion/growth trends up, risk/issue trends down, a
// region/cost/people/ops/customer word picks which metrics show).
function synthesizeCustomArea(name){
  const trimmed = (name || "").trim();
  if (!trimmed) return null;
  let seed = 0;
  for (let i = 0; i < trimmed.length; i++) seed = (seed * 31 + trimmed.charCodeAt(i)) >>> 0;
  const rnd = (n) => (((seed >>> (n % 24)) ^ (seed << ((n * 7) % 13))) >>> 0) % 997 / 997;
  const low = trimmed.toLowerCase();
  const has = (...words) => words.some(w => low.indexOf(w) > -1);
  const growth = has("expansion","growth","launch","scale","pilot","new site","open","opening","grow");
  const risk = has("risk","issue","delay","problem","complaint","fault","incident","churn","decline");
  const dir = risk ? -1 : (growth ? 1 : (rnd(2) > 0.45 ? 1 : -1));

  let vocab = "generic";
  if (has("scotland","ireland","wales","england","region","dublin","belfast","cork","galway","london","glasgow","edinburgh"))
    vocab = "region";
  else if (has("cost","spend","budget","saving","margin")) vocab = "cost";
  else if (has("staff","hiring","team","recruit","headcount")) vocab = "people";
  else if (has("supplier","stock","inventory","warehouse","fleet")) vocab = "ops";
  else if (has("customer","client","retention","account")) vocab = "customer";

  const V = {
    region:   {labels:["New enquiries","Orders won","Revenue","Store coverage"], unit:"EUR — 30 DAYS"},
    cost:     {labels:["Spend","Cost per order","Savings found","Budget used"], unit:"EUR — 30 DAYS"},
    people:   {labels:["Headcount","Open roles","Time to hire","Retention"], unit:"PEOPLE"},
    ops:      {labels:["Stock cover","Lead time","Stockouts","Reorders raised"], unit:"DAYS"},
    customer: {labels:["Active accounts","Repeat rate","Churn","NPS"], unit:"ACCOUNTS"},
    generic:  {labels:["Volume","Rate","Cost","Coverage"], unit:"ACTIVITY — 30 DAYS"}
  }[vocab];

  const months = ["Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"];
  let v0 = 40 + Math.floor(rnd(1) * 220);
  const chart = months.map((m, i) => {
    v0 = Math.max(8, Math.round(v0 * (1 + dir * (0.03 + rnd(i + 3) * 0.07))));
    return [m, v0, String(v0)];
  });
  const metrics = V.labels.map((label, i) => {
    const val = 20 + Math.floor(rnd(i + 5) * 400);
    const pct = 2 + Math.round(rnd(i + 9) * 18);
    const up = dir > 0 ? rnd(i + 12) > 0.25 : rnd(i + 12) > 0.7;
    const bars = [0,1,2,3,4,5,6,7,8].map(k => 0.3 + rnd(i * 3 + k) * 0.7);
    return [label, i === 1 ? pct + "%" : String(val), (up ? "+" : "\u2212") + pct + (i === 1 ? "pt" : "%"), up ? "up" : "down", "vs last month", bars];
  });
  const capName = trimmed.replace(/\b\w/g, c => c.toUpperCase());
  const split = [
    [capName + " \u2014 direct", String(Math.round(v0 * 0.5)), "48%", 1],
    ["Existing pipeline", String(Math.round(v0 * 0.3)), "31%", 0],
    ["Everything else", String(Math.round(v0 * 0.2)), "21%", 0]
  ];
  const table = [1,2,3].map(w => [capName + " \u2014 week " + w, String(20 + Math.floor(rnd(20 + w) * 200)),
    (dir > 0 ? "+" : "\u2212") + (3 + Math.floor(rnd(23 + w) * 14)) + "%", "Auto-tagged from records mentioning \u201c" + low + "\u201d"]);
  table.push(["Everything else", String(20 + Math.floor(rnd(30) * 200)), "\u2014", "Baseline"]);
  return {
    id: trimmed, label: capName, color: "var(--accent)", owner: "CUSTOM FILTER",
    description: "Generated from \u201c" + trimmed + "\u201d \u2014 a plain-English filter, not a registered metric set. Refine it and Pulse will tighten this up.",
    kind: "columns", chartTitle: capName + " over time", chartUnit: V.unit,
    chart, splitTitle: "Where \u201c" + low + "\u201d shows up", split,
    tableCols: ["Item","Value","Change","Note"], table,
    metrics, legend: [capName, "Pipeline", "Other"]
  };
}

function pickAnswer(q){
  const s = q.toLowerCase();
  if (/prioritised|prioritized/.test(s)) return ANSWERS.sauceplan;
  if (/payment|pay run|remit/.test(s)) return ANSWERS.payment;
  if (/corrected quote|request.*quote/.test(s)) return ANSWERS.quote;
  if (/transfer request|fry-001|galway|shortage|run short/.test(s)) return ANSWERS.transfer;
  if (/chicken|chk-001|price variance|west coast|po-1048/.test(s)) return ANSWERS.chicken;
  if (/expire|expiry|48 hours|sauce|batch|b-062/.test(s)) return ANSWERS.expiry;
  if (/approval|approve|awaiting|po-1042|greenfield/.test(s)) return ANSWERS.approvals;
  if (/dublin|reconcil|settlement|card|\bpos\b/.test(s)) return ANSWERS.dublin;
  if (/invoice|inv-2081|dairy|dispute|mismatch/.test(s)) return ANSWERS.invoice;
  if (/store|attention|today|exception|need/.test(s)) return ANSWERS.attention;
  return ANSWERS.fallback;
}

const ORGS = [
  ["West Coast Foods Demo","Supplier","€19,200","PO-1048 variance","watch"],
  ["Greenfield Packaging Demo","Supplier","€18,000","PO-1042 pending","watch"],
  ["Dairy Supply Demo","Supplier","€3,000","INV-2081 dispute","watch"],
  ["Central Depot Demo","Depot","n/a","SAUCE-004 expiry","active"],
  ["Galway Demo 01","Store","n/a","FRY-001 cover","watch"],
  ["Dublin Demo 03","Store","n/a","€420 difference","watch"]
];
const TEAMS = [
  ["Operations","2 members","Aoife Kelly","all core permissions"],
  ["Procurement","3 members","Conor Walsh","core:approval:decide"],
  ["Finance","3 members","Niamh Byrne","core:invoice:view"],
  ["Inventory","4 members","Sean Murphy","core:stock:update"],
  ["Stores & Regions","6 members","Emma Ryan","core:store:view"],
  ["Customer Service","3 members","Sarah Nolan","core:person:view"],
  ["Systems","2 members","David Burke","core:settings:view"]
];
const LOCATIONS = [
  ["Head Office Demo","Galway (demonstration)","14 staff","active"],
  ["Central Depot Demo","Demo depot","9 staff","expiry review"],
  ["Galway Demo 01","Demo store","22 staff","stock review"],
  ["Dublin Demo 03","Demo store","26 staff","reconciling"]
];

const AGENT_DEFS = [
  {id:"close", name:"Payment proposal prep", shape:"rim-capsule", tint:"#1b2430", state:"working", group:true,
   members:["procurement","finance","ops"], role:"Procurement, Finance and Ops Watchdog preparing one payment proposal for a person to review",
   when:"09:12", preview:"finance: no payable lines yet. INV-2081 is held.",
   thread:[
     {kind:"stamp", text:"Today 09:04"},
     {kind:"routine", text:"Ran routine", routine:"Invoice to approved payment proposal"},
     {kind:"agent", from:"finance", text:"the draft proposal has no payable lines yet. INV-2081 bills 100 cases and 96 were received, so the €120 dispute holds it back."},
     {kind:"agent", from:"procurement", text:"PO-1042 for €18,000 is still awaiting Conor Walsh. approval is not delivery and not payment, so it stays off the proposal."},
     {kind:"agent", from:"ops", text:"no bank is connected. the proposal is a file for a person to review, and nothing can be paid from here."},
     {kind:"user", text:"keep INV-2081 held until the credit note arrives"},
     {kind:"agent", from:"finance", text:"held. i will re-check the match when the credit note is recorded. releasing any payment needs a human yes."}
   ]},
  {id:"briefing", name:"Briefing", shape:"crown-pebble", tint:"#191c1f", state:"complete", role:"Reads the whole group every morning and tells you what needs a decision",
   when:"08:02", preview:"six items overnight. two need you.",
   thread:[
     {kind:"stamp", text:"Today 08:00"},
     {kind:"routine", text:"Ran routine", routine:"Morning briefing"},
     {kind:"agent", text:"morning briefing:", lines:[
       {k:"Sales", v:"€492,000 today · till €392,000 + online €100,000 · 30,000 orders"},
       {k:"Purchasing", v:"PO-1042 €18,000 awaiting Conor Walsh · PO-1048 €1,600 above agreed price"},
       {k:"Stock", v:"FRY-001 at Galway Demo 01 has 1.5 days of cover · SAUCE-004 B-062 expires in 2 days"},
       {k:"Finance", v:"INV-2081 €120 dispute · Dublin Demo 03 €420 difference"}]},
     {kind:"agent", text:"two need you today: the corrected quote request on PO-1048, and the Galway transfer request. sales figures are illustrative gross receipts."},
     {kind:"user", text:"ask Sean to look at the sauce batch"},
     {kind:"agent", text:"done: action created for Sean Murphy on SAUCE-004 batch B-062, due Thursday. nothing is written off."}
   ]},
  {id:"procurement", name:"Procurement", shape:"executive-capsule", tint:"#2a2118", state:"waiting", role:"Checks quotes against price agreements and keeps purchase orders moving to a decision",
   when:"Today", preview:"one quote query drafted. nothing sent.",
   thread:[
     {kind:"stamp", text:"Today 07:47"},
     {kind:"agent", text:"PO-1048 quotes CHK-001 at €52 per case against the agreed €48. on 400 cases that is a €1,600 variance. i have drafted a corrected quote request and parked it: sending is a write action, so it waits for a person."},
     {kind:"user", text:"is that a saving"},
     {kind:"agent", text:"no. it is a variance to query. nothing is recovered until the supplier issues a corrected quote or credit."},
     {kind:"agent", text:"PO-1042 (€18,000, Greenfield Packaging Demo) is with Conor Walsh for approval. approval does not mean delivered or paid."}
   ]},
  {id:"stock", name:"Stock", shape:"control-cube", tint:"#16241f", state:"thinking", role:"Projects days of cover, watches expiry and drafts transfer requests",
   when:"Today", preview:"one shortage and one expiry to act on.",
   thread:[
     {kind:"stamp", text:"Today 07:52"},
     {kind:"agent", text:"Galway Demo 01 holds 18 cases of FRY-001 and uses 12 a day. that is 1.5 days of cover against a 3 day lead time."},
     {kind:"agent", text:"i propose a transfer of 36 cases from Central Depot Demo. stock only changes when a receipt is recorded in the simulation, and the request needs a human yes."},
     {kind:"agent", text:"SAUCE-004 batch B-062 has 80 units at €4, a €320 exposure, and expires in 2 days. i suggest a transfer or prioritised use. i will not write it off."}
   ]},
  {id:"finance", name:"Finance", shape:"low-dome", tint:"#241b2e", state:"attention", role:"Three-way matches invoices and investigates POS and settlement differences",
   when:"Today", preview:"INV-2081 held. Dublin difference open.",
   thread:[
     {kind:"stamp", text:"Today 08:22"},
     {kind:"agent", text:"INV-2081 bills 100 cases (€3,000) and the docket shows 96 received (€2,880). the €120 dispute blocks the payment proposal."},
     {kind:"user", text:"and dublin"},
     {kind:"agent", text:"Dublin Demo 03 POS card sales are €12,640 against a settlement of €12,220. the €420 difference is unexplained and Niamh Byrne owns it. i am checking timing, refunds and terminal batches first. i am not assuming a cause."}
   ]},
  {id:"dq", name:"Data Quality", shape:"offset-pebble", tint:"#191c1f", state:"working", role:"Watches feeds and imports for gaps, duplicates and manual totals",
   when:"Today", preview:"110 feeds synced. 4 manual totals.",
   thread:[
     {kind:"stamp", text:"Today 08:00"},
     {kind:"agent", text:"110 of 114 store feeds synced. 4 stores sent manual totals instead. i have flagged them so the sales figure is read as illustrative."},
     {kind:"agent", text:"37 POS lines have no matching SKU code. i will list them for Sean Murphy to map. i do not change SKU records myself."}
   ]},
  {id:"cs", name:"Customer Service", shape:"soft-asymmetric", tint:"#16241f", state:"idle", role:"Links online orders to service issues and drafts replies for Sarah Nolan to approve",
   when:"Yesterday", preview:"no replies waiting.",
   thread:[
     {kind:"stamp", text:"Yesterday 17:30"},
     {kind:"agent", text:"2,000 online orders today at an average of €50, €100,000 in total. no service issue is open against a spike. any reply i draft waits for Sarah Nolan before it goes out."}
   ]},
  {id:"ops", name:"Ops Watchdog", shape:"shield", tint:"#2b1b1e", state:"attention", role:"Sits on the event queue and tells you when a feed or import stopped working",
   when:"08:05", preview:"4 stores on manual totals. all systems simulated.",
   thread:[
     {kind:"stamp", text:"Today 08:05"},
     {kind:"agent", text:"110 feeds synced, 4 stores on manual totals. every connection in this demonstration is simulated, so none of it is live and no bank is connected."}
   ]}
];

const KPI_DEFS = {
  revenue:{label:"Sales today", value:"€492,000", delta:"till + online", dir:"up", hint:"illustrative gross receipts", hero:true},
  cash:{label:"Pending approvals value", value:"€18,000", delta:"PO-1042", dir:"down", hint:"awaiting Conor Walsh"},
  overdue:{label:"Invoice exceptions", value:"€120", delta:"INV-2081", dir:"down", hint:"blocks payment proposal"},
  margin:{label:"Stock at risk", value:"€320", delta:"SAUCE-004", dir:"down", hint:"expires in 2 days"},
  jobs:{label:"Stores reporting", value:"110 / 114", delta:"4 manual", dir:"down", hint:"totals entered by hand"},
  nps:{label:"Blended average", value:"€16.40", delta:"till €14 · online €50", dir:"up", hint:"per transaction"},
  pipeline:{label:"Price variance", value:"€1,600", delta:"PO-1048", dir:"down", hint:"quote vs agreed price"},
  utilisation:{label:"POS difference", value:"€420", delta:"Dublin Demo 03", dir:"down", hint:"unexplained, card vs settlement"}
};

const ASPECT_DEFS = [
  {id:"executive", label:"Executive", color:"#9fd6f0", owner:"AOIFE KELLY", description:"One view across sales, purchasing, stock and finance. Demonstration data, illustrative gross receipts.",
   kind:"columns", chartTitle:"Transactions per day, last 12 days", chartUnit:"THOUSANDS · TILL + ONLINE",
   chart:[["3 Oct",27.4,"27.4k"],["4 Oct",28.1,"28.1k"],["5 Oct",26.9,"26.9k"],["6 Oct",29.0,"29.0k"],["7 Oct",31.2,"31.2k"],["8 Oct",32.5,"32.5k"],["9 Oct",28.8,"28.8k"],["10 Oct",27.9,"27.9k"],["11 Oct",28.6,"28.6k"],["12 Oct",29.4,"29.4k"],["13 Oct",29.9,"29.9k"],["14 Oct",30.0,"30.0k"]],
   splitTitle:"Open exceptions by area",
   split:[["Purchasing","2","33%",1],["Stock and waste","2","33%",0],["Finance","2","33%",0]],
   tableCols:["Item","Exposure","Status","Owner"],
   table:[["PO-1042 Greenfield Packaging Demo","€18,000","Awaiting approval","Conor Walsh"],["PO-1048 chicken price variance","€1,600","Quote to correct","Conor Walsh"],["INV-2081 Dairy Supply Demo","€120","Dispute open","Niamh Byrne"],["Dublin Demo 03 card settlement","€420","Unexplained","Niamh Byrne"],["Galway Demo 01 FRY-001","18 cases","Cover 1.5 days","Sean Murphy"],["SAUCE-004 batch B-062","€320","Expires in 2 days","Sean Murphy"]],
   metrics:[["Sales today","€492,000","till + online","up","illustrative gross receipts",[.5,.56,.5,.62,.7,.74,.6,.58,.62,.66,.7,.78,1].slice(0,9)],
     ["Transactions","30,000","28,000 till + 2,000 online","up","today",[.6,.62,.58,.66,.72,.78,.7,.72,.8]],
     ["Stores reporting","110 / 114","4 manual totals","down","feeds synced",[.9,.9,.92,.9,.94,.92,.96,.96,.96]],
     ["Open exceptions","6","2 need approval","down","across 4 owners",[.3,.4,.36,.5,.5,.6,.66,.7,.8]]]},
  {id:"sales", label:"Sales", color:"var(--accent)", owner:"EMMA RYAN", description:"Till and online sales across 114 stores. Illustrative gross receipts.",
   kind:"area", chartTitle:"Sales by 2 hour block, today", chartUnit:"EUR · THOUSANDS",
   chart:[["00h",14,"€14k"],["02h",26,"€26k"],["04h",48,"€48k"],["06h",62,"€62k"],["08h",51,"€51k"],["10h",34,"€34k"],["12h",41,"€41k"],["14h",58,"€58k"],["16h",72,"€72k"],["18h",49,"€49k"],["20h",25,"€25k"],["22h",12,"€12k"]],
   splitTitle:"Where it came from",
   split:[["Till","€392.0k","80%",1],["Online","€100.0k","20%",0]],
   tableCols:["Channel","Sales","Transactions","Average"],
   table:[["Till","€392,000","28,000","€14"],["Online","€100,000","2,000","€50"],["Combined","€492,000","30,000","€16.40"],["Manual totals","4 of 114 stores","n/a","n/a"]],
   metrics:[["Sales today","€492,000","till + online","up","illustrative gross receipts",[.4,.55,.44,.62,.5,.7,.6,.78,1]],
     ["Till","€392,000","28,000 txns","up","average €14",[.5,.6,.44,.7,.55,.75,.62,.8,.9]],
     ["Online","€100,000","2,000 orders","up","average €50",[.4,.44,.5,.52,.6,.64,.7,.76,.84]],
     ["Blended average","€16.40","per transaction","up","till + online",[.6,.58,.62,.6,.66,.64,.7,.68,.74]]]},
  {id:"purchasing", label:"Purchasing", color:"#e6c78a", owner:"CONOR WALSH", description:"Purchase orders, price agreements and approvals. About €100m of purchasing is a meeting-reported assumption, period unconfirmed.",
   kind:"rows", rows:[["PO-1048 West Coast Foods Demo","€19,200 at agreed price",19200],["PO-1042 Greenfield Packaging Demo","€18,000 awaiting approval",18000],["PO-1036 Dairy Supply Demo","€3,000 ordered, €2,880 received",3000]],
   chartTitle:"Open purchase order value", chartUnit:"EUR",
   chart:[["PO-1036",3000,"€3.0k"],["PO-1042",18000,"€18.0k"],["PO-1048",19200,"€19.2k"]],
   splitTitle:"Purchasing exceptions",
   split:[["PO-1042 awaiting approval","€18,000","91%",1],["PO-1048 price variance","€1,600","8%",0],["PO-1036 short delivery","€120","1%",0]],
   tableCols:["Purchase order","Supplier","Value","Status"],
   table:[["PO-1042","Greenfield Packaging Demo","€18,000","Awaiting Conor Walsh"],["PO-1048","West Coast Foods Demo","€19,200","Quote €52 vs €48"],["PO-1036","Dairy Supply Demo","€3,000","96 of 100 received"]],
   metrics:[["Pending approvals","€18,000","PO-1042","down","awaiting Conor Walsh",[.3,.4,.5,.5,.6,.6,.7,.8,.9]],
     ["Price variance","€1,600","PO-1048","down","400 cases of CHK-001",[.3,.36,.4,.5,.5,.6,.7,.7,.8]],
     ["Short delivery","4 cases","PO-1036","down","€120 dispute",[.5,.5,.46,.5,.6,.6,.66,.7,.76]],
     ["SKUs","about 6,000","assumption","up","meeting-reported",[.6,.6,.62,.6,.64,.62,.66,.66,.68]]]},
  {id:"stock", label:"Stock & Waste", color:"#7fd8a4", owner:"SEAN MURPHY", description:"Cover, transfers and expiry across depots and stores. Stock changes only on a simulated receipt.",
   kind:"rows", rows:[["Central Depot Demo SAUCE-004 B-062","80 units, €320 expiring",80],["Galway Demo 01 FRY-001 proposed transfer","36 cases proposed",36],["Galway Demo 01 FRY-001 on hand","18 cases, 1.5 days cover",18]],
   chartTitle:"FRY-001 at Galway Demo 01, days", chartUnit:"DAYS",
   chart:[["Cover",1.5,"1.5 d"],["Lead time",3,"3 d"]],
   splitTitle:"Stock at risk",
   split:[["SAUCE-004 batch B-062 expiry","€320","100%",1],["Write-offs proposed","€0","0%",0]],
   tableCols:["SKU","Where","Quantity","Issue"],
   table:[["FRY-001","Galway Demo 01","18 cases","Cover 1.5 days, lead time 3"],["FRY-001","Central Depot Demo","36 proposed","Transfer request"],["SAUCE-004","Central Depot Demo","80 units","Batch B-062 expires in 2 days"]],
   metrics:[["Cover","1.5 days","FRY-001","down","12 cases a day",[.9,.8,.74,.66,.6,.5,.44,.38,.3]],
     ["Lead time","3 days","FRY-001","down","supplier lead time",[.5,.5,.5,.5,.5,.5,.5,.5,.5]],
     ["Expiring soon","€320","SAUCE-004","down","expires in 2 days",[.3,.34,.4,.46,.5,.6,.7,.8,.9]],
     ["Write-offs","€0","none proposed","up","human decision only",[.2,.2,.2,.2,.2,.2,.2,.2,.2]]]}
];

const FILTER_GROUPS = [
  {title:"AREA", items:["Executive","Sales","Purchasing","Stock & Waste"]},
  {title:"SPINE", items:["Store","Supplier","SKU","Purchase order","Channel"]},
  {title:"TIME", items:["Today","This week","This month","This quarter"]}
];

const OPS_DEFS = [
  {id:"o1", name:"Weekly management report", kind:"report", owner:"Briefing Agent", ownerKind:"agent", initials:"BR",
   trigger:"Mon, 08:00", triggerKind:"schedule", next:"Mon 08:00", last:"Sent to 4 people", status:"healthy", rate:98, on:true,
   what:"Pulls last week's sales, purchasing, stock and finance figures, writes the commentary and sends one page to the management team.",
   why:"The Monday meeting used to start with people reading numbers off their own screens.",
   saved:"6 hours a month",
   steps:[["Trigger","Every Monday at 08:00"],["Find","Last week's figures across all four areas"],["Check","Flag anything moving more than 10%"],["Draft","Write the one-page commentary"],["Send","Email the management team"],["Update","File the report against the week"]],
   runs:[["Mon 08:00","1m 12s","ok","4 recipients","€0.04"],["Mon 5 Oct 08:00","1m 04s","ok","4 recipients","€0.04"],["Mon 28 Sep 08:00","58s","ok","4 recipients","€0.03"]]},
  {id:"o2", name:"Invoice to approved payment proposal", kind:"automation", owner:"Finance Agent", ownerKind:"agent", initials:"FA",
   trigger:"Daily, 09:00", triggerKind:"schedule", next:"Tomorrow 09:00", last:"1 invoice held", status:"approval", rate:94, on:true,
   what:"Three-way matches each invoice to its purchase order and receipt, excludes disputes and drafts a payment proposal for Niamh Byrne to review.",
   why:"Payments were being prepared from spreadsheets, so mismatches were found late.",
   saved:"8 hours a month",
   steps:[["Trigger","Every weekday at 09:00"],["Find","Invoices with a purchase order"],["Check","Match to goods receipt and price agreement"],["Draft","Build the payment proposal"],["Approval","Finance Manager reviews","gate"],["Update","Record the decision (no bank connected)"]],
   runs:[["Today 09:00","42s","partial","0 lines, INV-2081 held","€0.02","€120 dispute on INV-2081 blocks the proposal"],["Tue 09:00","51s","ok","proposal drafted","€0.03"],["Mon 09:00","47s","ok","proposal drafted","€0.03"]]},
  {id:"o3", name:"Requisition to approved PO", kind:"automation", owner:"Procurement Agent", ownerKind:"agent", initials:"PA",
   trigger:"Requisition created", triggerKind:"event", next:"Event-based", last:"PO-1042 awaiting approval", status:"approval", rate:99, on:true,
   what:"Turns an approved requisition into a purchase order, checks the price against the agreement and routes it to the right approver.",
   why:"Orders were reaching approvers without a price check.",
   saved:"5 hours a month",
   steps:[["Trigger","A requisition is created"],["Find","The supplier and price agreement"],["Check","Quote against agreed price"],["Approval","Procurement Lead approves","gate"],["Update","Raise the purchase order"]],
   runs:[["Today 07:46","6s","partial","PO-1042 awaiting approval","€0.01"],["Today 07:47","7s","partial","PO-1048 quote to correct","€0.01"],["Tue 15:02","6s","ok","1 PO approved","€0.01"]]},
  {id:"o4", name:"Delivery docket to goods receipt", kind:"routine", owner:"Ops Watchdog", ownerKind:"agent", initials:"OW",
   trigger:"Docket captured", triggerKind:"event", next:"Event-based", last:"9 deliveries with no docket", status:"failed", rate:71, on:true,
   what:"Reads a captured docket, matches it to the purchase order and records the goods receipt. Docket capture is simulated.",
   why:"Receipts were entered from memory, days after the delivery.",
   saved:"4 hours a month",
   steps:[["Trigger","A docket is captured"],["Find","The matching purchase order"],["Check","Quantity received against ordered"],["Update","Record the goods receipt"],["Send","Notify the inventory controller"]],
   runs:[["Today 08:20","3s","ok","PO-1036: 96 of 100 received","€0.00"],["Today 07:30","4s","failed","0 of 9","€0.00","9 deliveries with no docket scan"],["Tue 14:20","5s","ok","2 receipts","€0.01"]]},
  {id:"o5", name:"Morning briefing", kind:"routine", owner:"Briefing Agent", ownerKind:"agent", initials:"BR",
   trigger:"Weekdays, 07:00", triggerKind:"schedule", next:"Tomorrow 07:00", last:"Delivered 08:02", status:"healthy", rate:100, on:true,
   what:"Reads the whole group overnight and tells you the items that need a decision.",
   why:"You were opening six screens before your first meeting.",
   saved:"9 hours a month",
   steps:[["Trigger","Every weekday at 07:00"],["Find","Overnight changes across sales, purchasing, stock and finance"],["Check","Drop anything already handled"],["Draft","Write the briefing"],["Send","Post to Home"]],
   runs:[["Today 07:00","22s","ok","1 briefing","€0.02"],["Tue 07:00","19s","ok","1 briefing","€0.02"],["Mon 07:00","24s","ok","1 briefing","€0.02"]]},
  {id:"o6", name:"Stock risk to replenishment request", kind:"task", owner:"Stock Agent", ownerKind:"agent", initials:"SA",
   trigger:"Daily, 07:50", triggerKind:"schedule", next:"Tomorrow 07:50", last:"2 requests drafted", status:"approval", rate:96, on:true,
   what:"Projects days of cover and expiry, then drafts a transfer or replenishment request for Sean Murphy.",
   why:"Shortages and expiries were found on the shop floor, not before.",
   saved:"5 hours a month",
   steps:[["Trigger","Every day at 07:50"],["Find","Lines with cover under lead time or expiry within 3 days"],["Check","Stock at other locations"],["Approval","Inventory Controller confirms","gate"],["Update","Raise the request"]],
   runs:[["Today 07:50","31s","ok","2 requests drafted","€0.02"],["Tue 07:50","28s","ok","1 request","€0.02"]]},
  {id:"o7", name:"Accounting export", kind:"automation", owner:"Ops Watchdog", ownerKind:"agent", initials:"OW",
   trigger:"Hourly", triggerKind:"schedule", next:"Next hour", last:"1 invoice held", status:"healthy", rate:97, on:true,
   what:"Sends every matched, approved invoice to the accounting export. Simulated: no accounting system is connected.",
   why:"Manual re-entry was the biggest source of mismatched invoices.",
   saved:"7 hours a month",
   steps:[["Trigger","Every hour"],["Find","Approved invoices not yet exported"],["Check","Three-way match passed"],["Send","Write to the accounting export (simulated)","external"],["Update","Mark them exported"]],
   runs:[["Today 09:00","1.2s","ok","0 exported, 1 held","€0.00"],["Today 08:00","1.1s","ok","3 exported","€0.00"],["Today 07:00","4s","ok","2 exported","€0.01"]]},
  {id:"o8", name:"POS discrepancy to investigation", kind:"automation", owner:"Finance Agent", ownerKind:"agent", initials:"FA",
   trigger:"Settlement received", triggerKind:"event", next:"Event-based", last:"Dublin Demo 03 open", status:"approval", rate:97, on:true,
   what:"Compares POS card sales to settlement per store and opens an investigation task when they differ.",
   why:"Differences were only noticed at month end.",
   saved:"4 hours a month",
   steps:[["Trigger","A card settlement arrives"],["Find","POS card sales for the same store and day"],["Check","Difference above tolerance"],["Update","Create an investigation task for Finance"]],
   runs:[["Today 06:30","18s","partial","Dublin Demo 03: €420 open","€0.02"],["Tue 06:30","21s","ok","no differences","€0.02"]]},
  {id:"o9", name:"Store feed check", kind:"task", owner:"Data Quality Agent", ownerKind:"agent", initials:"DQ",
   trigger:"Daily, 08:00", triggerKind:"schedule", next:"Tomorrow 08:00", last:"110 of 114 synced", status:"approval", rate:96, on:true,
   what:"Checks every store feed synced and lists stores on manual totals.",
   why:"Sales totals were quoted before anyone knew which stores were missing.",
   saved:"3 hours a month",
   steps:[["Trigger","Every day at 08:00"],["Find","Stores with no feed"],["Send","Ask store managers for totals"],["Approval","Operations signs off the exceptions","gate"]],
   runs:[["Today 08:00","12s","partial","110 of 114","€0.01"],["Tue 08:00","11s","ok","114 of 114","€0.01"]]},
  {id:"o10", name:"Overnight data refresh check", kind:"automation", owner:"Ops Watchdog", ownerKind:"agent", initials:"OW",
   trigger:"Daily, 03:00", triggerKind:"schedule", next:"Tonight 03:00", last:"All imports clean", status:"healthy", rate:100, on:true,
   what:"Confirms every overnight import completed and raises an alert if not. All imports are simulated.",
   why:"A failed import once went unnoticed for eleven days.",
   saved:"2 hours a month",
   steps:[["Trigger","Every day at 03:00"],["Check","Every import job completed"],["Check","Row counts within range"],["Send","Alert only if something failed"]],
   runs:[["Today 03:00","8s","ok","5 jobs","€0.00"],["Tue 03:00","9s","ok","5 jobs","€0.00"]]},
  {id:"o11", name:"Weekly purchasing pack", kind:"report", owner:"Procurement Agent", ownerKind:"agent", initials:"PA",
   trigger:"Mon, 07:00", triggerKind:"schedule", next:"Mon 07:00", last:"Delivered Mon", status:"healthy", rate:95, on:true,
   what:"Assembles open purchase orders, price variances against agreements and awaiting approvals for the procurement team.",
   why:"The pack took a morning of copying between spreadsheets.",
   saved:"6 hours a month",
   steps:[["Trigger","Monday at 07:00"],["Find","Open purchase orders and price agreements"],["Check","Quotes above agreed price"],["Draft","Write the variance commentary"],["Send","Email the pack to Procurement"]],
   runs:[["Mon 07:00","3m 42s","ok","1 pack","€0.09"],["Mon 5 Oct 07:00","3m 51s","ok","1 pack","€0.09"]]}
];

const OPS_FILTERS = [
  ["all","All"], ["routine","Agent routines"], ["automation","Automations"],
  ["report","Scheduled reports"], ["task","Recurring tasks"], ["approval","Needs approval"], ["failed","Failed"]
];

const WORK_SECTIONS = [
  {id:"tasks", label:"Tasks", blurb:"Everything assigned to you or your team, in one permission-filtered list.",
   views:["All tasks","Due tasks","Review","Done"], filters:["Due date","Any status","Anyone","Any due date"]},
  {id:"approvals", label:"Approvals", blurb:"Requests and their steps. Every decision is written as the person who made it.",
   views:["Awaiting you","Awaiting others","Decided"], filters:["Raised date","Any value","Anyone"]},
  {id:"workflows", label:"Workflows", blurb:"Automations and agent routines — what runs on its own, and who owns it.",
   views:[], filters:[]},
  {id:"schedules", label:"Schedules", blurb:"The team calendar: when recurring work fires and what it costs the week.",
   views:[], filters:[]}
];

const WORK_TASKS = [
  {id:"w1", title:"Approve or query PO-1042, Greenfield Packaging Demo", status:"Review", priority:"High", who:"CW",
   due:"Due today", late:false, client:"Greenfield Packaging Demo", day:"Today", mins:"15 mins", view:"Review"},
  {id:"w2", title:"Request corrected quote on PO-1048 (CHK-001)", status:"In progress", priority:"High", who:"CW",
   due:"Due today", late:false, client:"West Coast Foods Demo", day:"Today", mins:"20 mins", view:"Due tasks"},
  {id:"w3", title:"Chase credit note for INV-2081", status:"In progress", priority:"High", who:"NB",
   due:"1d overdue", late:true, client:"Dairy Supply Demo", day:"Today", mins:"25 mins", view:"Due tasks"},
  {id:"w4", title:"Review 36 case FRY-001 transfer to Galway Demo 01", status:"Not started", priority:"High", who:"SM",
   due:"Due today", late:false, client:"Galway Demo 01", day:"Today", mins:"20 mins", view:"Due tasks"},
  {id:"w5", title:"Investigate Dublin Demo 03 card difference of €420", status:"In progress", priority:"Medium", who:"NB",
   due:"Thursday", late:false, client:"Dublin Demo 03", day:"Thu", mins:"1 hour", view:"All tasks"},
  {id:"w6", title:"Plan use of SAUCE-004 batch B-062 before Friday", status:"Not started", priority:"Medium", who:"SM",
   due:"Thursday", late:false, client:"Central Depot Demo", day:"Thu", mins:"30 mins", view:"All tasks"},
  {id:"w7", title:"Confirm totals from the 4 stores on manual entry", status:"Done", priority:"Medium", who:"ER",
   due:"Done this morning", late:false, client:"Regions", day:"Today", mins:"30 mins", view:"Done", done:true}
];

const WORKFLOWS = [
  {name:"Requisition to approved PO", state:"live", trigger:"event · requisition.created",
   actions:[["approvals.route","read"],["notify.inbox","write"]], lastRun:"Today 07:46",
   result:"PO-1042 awaiting approval", resultKind:"warn", runSummary:"12 ok · 2 waiting",
   runs:["ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","partial","partial"]},
  {name:"Delivery docket to goods receipt", state:"live", trigger:"event · docket.captured",
   actions:[["docket.read","read"],["receipts.match","read"]], lastRun:"Today 08:20",
   result:"PO-1036: 96 of 100 received", resultKind:"warn", runSummary:"11 ok · 1 partial",
   runs:["ok","ok","idle","ok","ok","ok","ok","ok","idle","ok","ok","ok","ok","partial"]},
  {name:"Invoice to approved payment proposal", state:"live", trigger:"schedule · daily 09:00",
   actions:[["invoice.match","read"],["payments.propose","write"]], lastRun:"Today 09:00",
   result:"INV-2081 held, €120 dispute", resultKind:"warn", runSummary:"12 ok · 2 partial",
   runs:["ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","partial","partial"]},
  {name:"Stock risk to replenishment request", state:"live", trigger:"schedule · daily 07:50",
   actions:[["stock.project","read"],["transfer.draft","write"]], lastRun:"Today 07:50",
   result:"2 requests drafted", resultKind:"ok", runSummary:"14 ok",
   runs:["ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok"]},
  {name:"POS discrepancy to investigation", state:"live", trigger:"event · settlement.received",
   actions:[["settlement.compare","read"],["tasks.create","write"]], lastRun:"Today 06:30",
   result:"Dublin Demo 03: €420 open", resultKind:"warn", runSummary:"13 ok · 1 partial",
   runs:["ok","ok","ok","idle","ok","ok","ok","ok","ok","ok","ok","ok","ok","partial"]}
];

const SCHEDULES = [
  {id:"s1", name:"Morning briefing", cadence:"Every weekday · 07:00", next:"Tomorrow 07:00", owner:"Briefing agent", on:true, day:1},
  {id:"s2", name:"Stock risk scan", cadence:"Daily · 07:50", next:"Tomorrow 07:50", owner:"Stock agent", on:true, day:1},
  {id:"s3", name:"Store feed check", cadence:"Daily · 08:00", next:"Tomorrow 08:00", owner:"Data Quality agent", on:true, day:1},
  {id:"s4", name:"Invoice to payment proposal", cadence:"Weekdays · 09:00", next:"Tomorrow 09:00", owner:"Finance agent", on:true, day:3},
  {id:"s5", name:"Weekly purchasing pack", cadence:"Mondays · 07:00", next:"Mon 07:00", owner:"Procurement agent", on:true, day:0}
];

const WIDGET_DEFS = [["inbox","Action inbox"],["work","My work"],["activity","Activity"],["kpi","Today's numbers"],["visits","Store exceptions"]];
const WORK_WIDGETS = [
  {id:"queue", label:"My queue", value:"6", hint:"assigned to you or your team", icon:"work", queue:"mine"},
  {id:"late", label:"Running late", value:"1", hint:"past their due date", icon:"health", queue:"overdue"},
  {id:"unassigned", label:"Unassigned", value:"0", hint:"everything has an owner", icon:"teams", queue:"unassigned"},
  {id:"week", label:"Next 7 days", value:"2", hint:"due this week", icon:"visits", queue:"upcoming"}
];
const PERSONALITIES = ["Straight-talking","Warm","Formal","Dry"];
const ANSWER_STYLES = ["Short answers","Show the working","Ask before acting"];
/* Every context source and every registered tool the agent could be granted —
   the builder shows the whole catalogue, grouped, rather than a sample. */
const CONTEXT_DEFS = [
  ["Stores","records","Locations, regions, owners"],
  ["Suppliers","records","Contacts, terms, price agreements"],
  ["SKUs","records","About 6,000 SKUs, batches and expiry"],
  ["Files","records","Indexed dockets, agreements and invoices"],
  ["Tasks","work","Queues, owners, due dates"],
  ["Purchase orders","work","Ordered, approved, received"],
  ["Approvals","work","What is waiting on a decision"],
  ["Invoices","money","Received, matched, disputed"],
  ["Sales feeds","money","Till and online, illustrative gross receipts"],
  ["Settlements","money","Card settlement against POS"],
  ["Activity log","system","Every event, agent and human"],
  ["Insights","system","Saved metrics and trends"]
];
const CONTEXT_SOURCES = CONTEXT_DEFS.map(c => c[0]);
const SKILL_DEFS = [
  ["Search records","read"],["Summarise activity","read"],["Read invoices","read"],
  ["Read stock cover","read"],["Check permissions","read"],
  ["Draft supplier query","write"],["Create task","write"],["Update record","write"],
  ["Draft transfer request","write"],["Raise approval","write"],
  ["Send supplier email","external"],["Export to accounting (simulated)","external"],["Export payment proposal (simulated)","external"]
];
/* The two questions the agent asks back once it knows the job. */
const TRAIN_PHASES = [
  ["Reading the whole ontology", "synthetic records"],
  ["Learning how this business words things", "organisation → supplier or store"],
  ["Reading the quick-service restaurant domain", "12 sources"],
  ["Writing its own system prompt", "1,240 tokens"]
];
const BRIEF_QUESTIONS = [
  {title:"What should it cover?", sub:"Pick as many as you like. We can refine later.",
   options:[["Sales","Till and online, illustrative gross receipts"],["Purchasing","Approvals, price variances, receipts"],
            ["Stock","Cover, transfers and expiry"],["Finance","Invoices, disputes and settlements"],
            ["Something else","Tell me in the next message"]]},
  {title:"When should it land?", sub:"One is enough to start.",
   options:[["Every morning 07:30","Before stores open"],["Weekdays 08:00","Monday to Friday only"],
            ["Only when something changes","Event-driven, no noise"],["On demand","When you ask for it"]]}
];
/* The words under a name, keyed to the same state the face lights with. */
const STATE_LABELS = {working:"working", thinking:"thinking", waiting:"waiting on you",
  complete:"up to date", attention:"needs you", idle:"idle"};

const FACE_SHAPES = [
  ["crown-pebble","Crown pebble"],["executive-capsule","Executive capsule"],["shield","Shield"],
  ["glass-visor","Glass visor"],["control-cube","Control cube"],["low-dome","Low dome"],
  ["offset-pebble","Offset pebble"],["rim-capsule","Rim capsule"],["wide-eyed","Wide-eyed"],
  ["precision-brow","Precision brow"],["tall-unit","Tall unit"],["soft-asymmetric","Soft asymmetric"]
];
/* Shell colours only — deliberately desaturated so none of them reads as a
   state. The eyes, rim and dots always carry the state colour. */
const FACE_TINTS = [
  ["#191c1f","Graphite"],["#1b2430","Slate"],["#241b2e","Aubergine"],
  ["#2a2118","Bronze"],["#16241f","Pine"],["#2b1b1e","Oxblood"]
];

/* ---- ontology graph: generation, Dijkstra traversal, canvas render ---- */
const CLUSTERS = [
  ["Suppliers",     "#c8f04b", 0.00, 0.62, 46],
  ["Stores",        "#6ad0f0", 0.90, 0.70, 52],
  ["SKUs",          "#b06cf0", 1.75, 0.66, 58],
  ["Purchase orders","#f0c04b", 2.55, 0.72, 44],
  ["Invoices",      "#f0567f", 3.35, 0.60, 38],
  ["Stock",         "#5fe0a8", 4.15, 0.70, 40],
  ["Sales",         "#f0803a", 4.95, 0.64, 30],
  ["Customers",     "#5f7cf0", 5.65, 0.72, 34]
];

function mulberry(seed){
  return function(){
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* Hub-and-spoke clusters around a dense phyllotaxis core, in unit space
   (-1..1 on both axes) so the layout is resolution independent. */
const _hexCache = {};
function hexRGB(hex){
  if (_hexCache[hex]) return _hexCache[hex];
  const h = hex.replace("#", "");
  const v = [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  _hexCache[hex] = v;
  return v;
}


function buildGraph(){
  const rnd = mulberry(20260902);
  const nodes = [], edges = [], adj = [];
  const add = (x, y, z, r, cluster, kind) => {
    nodes.push({x, y, z, r, cluster, kind}); adj.push([]); return nodes.length - 1;
  };
  const link = (a, b) => {
    const dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y, dz = nodes[a].z - nodes[b].z;
    const w = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.004;
    const id = edges.length;
    edges.push({a, b, w});
    adj[a].push([b, w, id]); adj[b].push([a, w, id]);
  };

  // the core is a filled sphere on a Fibonacci lattice, not a disc
  const CORE = 880, coreIds = [];
  for (let i = 0; i < CORE; i++){
    const t = (i + 0.5) / CORE;
    const phi = Math.acos(1 - 2 * t);
    const theta = i * 2.39996;
    const shell = 0.16 + 0.28 * Math.pow(rnd(), 0.5);
    const grade = rnd();
    coreIds.push(add(
      Math.sin(phi) * Math.cos(theta) * shell * 1.04,
      Math.cos(phi) * shell * 0.96,
      Math.sin(phi) * Math.sin(theta) * shell,
      grade < 0.06 ? 3.4 + rnd() * 1.4 : grade < 0.3 ? 2.1 + rnd() * 0.7 : 1.0 + rnd() * 0.8, 0, "core"));
  }
  // lattice neighbours plus a mesh of chords, so the sphere reads as a volume
  for (let i = 1; i < coreIds.length; i++){
    link(coreIds[i], coreIds[i - 1]);
    if (i >= 13) link(coreIds[i], coreIds[i - 13]);
    if (i >= 21 && i % 2 === 0) link(coreIds[i], coreIds[i - 21]);
    if (i >= 34 && i % 3 === 0) link(coreIds[i], coreIds[i - 34]);
    if (i >= 55 && i % 4 === 0) link(coreIds[i], coreIds[i - 55]);
    if (i >= 89 && i % 5 === 0) link(coreIds[i], coreIds[i - 89]);
    if (i % 6 === 0) link(coreIds[i], coreIds[Math.floor(rnd() * coreIds.length)]);
  }

  // a mid shell between the nucleus and the lobes: the layer that makes it
  // read as a network rather than a ball with satellites
  const MID = 560, midIds = [];
  for (let i = 0; i < MID; i++){
    const t = (i + 0.5) / MID;
    const phi = Math.acos(1 - 2 * t), theta = i * 2.39996 + 0.7;
    const d = 0.52 + 0.16 * Math.pow(rnd(), 0.6);
    const g2 = rnd();
    midIds.push(add(
      Math.sin(phi) * Math.cos(theta) * d * 1.02,
      Math.cos(phi) * d * 0.96,
      Math.sin(phi) * Math.sin(theta) * d,
      g2 < 0.05 ? 2.6 + rnd() * 1.0 : g2 < 0.3 ? 1.6 + rnd() * 0.6 : 0.8 + rnd() * 0.7, 0, "core"));
  }
  for (let i = 0; i < midIds.length; i++){
    if (i >= 1) link(midIds[i], midIds[i - 1]);
    if (i >= 17) link(midIds[i], midIds[i - 17]);
    if (i >= 29 && i % 2 === 0) link(midIds[i], midIds[i - 29]);
    // radial spokes tying the shell to the nucleus
    if (i % 2 === 0) link(midIds[i], coreIds[Math.floor(rnd() * coreIds.length)]);
    if (i % 9 === 0) link(midIds[i], coreIds[Math.floor(rnd() * coreIds.length)]);
  }

  // clusters ride a sphere: each hub gets its own latitude as well as longitude
  const hubs = [], clusterLeaves = [];
  const onSphere = (lon, lat, d0) => { const d = d0 * 1.22;
    return [Math.cos(lat) * Math.cos(lon) * d * 1.02, Math.sin(lat) * d * 0.96, Math.cos(lat) * Math.sin(lon) * d]; };
  CLUSTERS.forEach((c, ci) => {
    const [, , ang, dist, leaves] = c;
    const lat = (ci % 2 ? 1 : -1) * (0.26 + rnd() * 0.5);
    const wob = 1.06 + rnd() * 0.16;
    const hp = onSphere(ang, lat, dist * wob);
    const hub = add(hp[0], hp[1], hp[2], 5.4, ci, "hub");
    hubs.push(hub);
    const mine = [];
    clusterLeaves.push(mine);
    for (let k = 0; k < 3; k++) link(hub, coreIds[Math.floor(rnd() * coreIds.length)]);
    for (let k = 0; k < 5; k++) link(hub, midIds[Math.floor(rnd() * midIds.length)]);

    const subs = 5 + Math.floor(rnd() * 4);
    const subIds = [];
    for (let s = 0; s < subs; s++){
      const sa = ang + (rnd() - 0.5) * 0.52, sl = lat + (rnd() - 0.5) * 0.3;
      const sd = dist + 0.08 + rnd() * 0.18;
      const sp = onSphere(sa, sl, sd);
      const sub = add(sp[0], sp[1], sp[2], 3.2, ci, "sub");
      subIds.push(sub);
      link(sub, hub);
      if (s > 0 && rnd() < 0.7) link(sub, subIds[s - 1]);
      const fan = Math.floor((leaves * 7.4) / subs);
      const spread = 0.17 + rnd() * 0.2;
      let prev = -1;
      for (let l = 0; l < fan; l++){
        const la = sa + (rnd() - 0.5) * spread * 2 + (rnd() - 0.5) * 0.06;
        const ll = sl + (rnd() - 0.5) * spread * 1.1;
        const ld = sd + 0.03 + Math.pow(rnd(), 0.8) * 0.17;
        const lp = onSphere(la, ll, ld);
        const lg = rnd();
        const leaf = add(lp[0], lp[1], lp[2],
          lg < 0.08 ? 2.8 + rnd() * 1.2 : lg < 0.34 ? 1.8 + rnd() * 0.6 : 1.0 + rnd() * 0.7, ci, "leaf");
        link(leaf, sub);
        mine.push(leaf);
        if (rnd() < 0.14) link(leaf, hub);
        if (prev >= 0 && rnd() < 0.34) link(leaf, prev);
        if (rnd() < 0.16) link(leaf, midIds[Math.floor(rnd() * midIds.length)]);
        prev = leaf;
      }
    }
  });
  // far satellites hanging off the outer leaves
  CLUSTERS.forEach((c, ci) => {
    const [, , ang, dist] = c;
    for (let s = 0; s < 7; s++){
      const sa = ang + (rnd() - 0.5) * 1.5, sl = (rnd() - 0.5) * 1.3;
      const sd = dist + 0.42 + rnd() * 0.22;
      const ap = onSphere(sa, sl, sd);
      const anchor = add(ap[0], ap[1], ap[2], 2.4, ci, "sub");
      link(anchor, hubs[ci]);
      const n = 14 + Math.floor(rnd() * 18);
      for (let l = 0; l < n; l++){
        const la = sa + (rnd() - 0.5) * 0.9, ll = sl + (rnd() - 0.5) * 0.7;
        const ld = sd + 0.02 + Math.pow(rnd(), 0.8) * 0.18;
        const p = onSphere(la, ll, ld);
        const leaf = add(p[0], p[1], p[2], 0.8 + rnd() * 0.9, ci, "leaf");
        link(leaf, anchor);
        clusterLeaves[ci].push(leaf);
      }
    }
  });

  // two hub rings and long chords across the sphere
  hubs.forEach((h, i) => {
    link(h, hubs[(i + 1) % hubs.length]);
    link(h, hubs[(i + 2) % hubs.length]);
    if (i % 3 === 0) link(h, hubs[(i + 4) % hubs.length]);
  });
  // neighbouring clusters share records, so their leaves cross-link
  for (let ci = 0; ci < clusterLeaves.length; ci++){
    const a = clusterLeaves[ci], b = clusterLeaves[(ci + 1) % clusterLeaves.length];
    const n = 26 + Math.floor(rnd() * 16);
    for (let k = 0; k < n; k++){
      link(a[Math.floor(rnd() * a.length)], b[Math.floor(rnd() * b.length)]);
    }
    // and a good number reach right across to the far side
    for (let k = 0; k < 12; k++){
      const far = clusterLeaves[(ci + 3) % clusterLeaves.length];
      link(a[Math.floor(rnd() * a.length)], far[Math.floor(rnd() * far.length)]);
    }
    for (let k = 0; k < 8; k++){
      const far = clusterLeaves[(ci + 4) % clusterLeaves.length];
      link(a[Math.floor(rnd() * a.length)], far[Math.floor(rnd() * far.length)]);
    }
  }

  let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9, minZ = 1e9, maxZ = -1e9;
  for (const n of nodes){
    if (n.x < minX) minX = n.x; if (n.x > maxX) maxX = n.x;
    if (n.y < minY) minY = n.y; if (n.y > maxY) maxY = n.y;
    if (n.z < minZ) minZ = n.z; if (n.z > maxZ) maxZ = n.z;
  }
  const bounds = {minX, maxX, minY, maxY, cx:(minX + maxX) / 2, cy:(minY + maxY) / 2,
    cz:(minZ + maxZ) / 2, w:maxX - minX, h:maxY - minY, d:maxZ - minZ,
    radius: Math.max(maxX - minX, maxY - minY, maxZ - minZ) / 2,
    reach: nodes.reduce((m, n) => Math.max(m, Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z)), 0)};
  return {nodes, edges, adj, hubs, coreIds, bounds};
}

export {
  INK,
  BODY,
  DIM,
  FAINT,
  LIME,
  GREEN,
  AMBER,
  RED,
  NEUTRAL,
  MONO,
  ICONS,
  REC_SECTIONS,
  CONTACTS,
  FILE_TREE,
  ONTO_NODES,
  ONTO_EDGES,
  REC_TEMPLATES,
  REC_TEMPLATE_CATS,
  PEOPLE,
  ROLE_LEVELS,
  PERM_KEYS,
  GRANT_DEFS,
  ROLE_SCOPES,
  DEFAULT_PERMS,
  INTEGRATIONS,
  BG_DEFS,
  THEMES,
  ADMIN_ICONS,
  ADMIN_CARDS,
  ADMIN_GROUPS,
  SRC_TINT,
  SRC_ABBR,
  DATA_EVENTS,
  PEOPLE_EVENTS,
  AI_EVENTS,
  STREAM_DEFS,
  NAV,
  ITEMS,
  ORDER,
  ANSWERS,
  synthesizeCustomArea,
  pickAnswer,
  ORGS,
  TEAMS,
  LOCATIONS,
  AGENT_DEFS,
  KPI_DEFS,
  ASPECT_DEFS,
  FILTER_GROUPS,
  OPS_DEFS,
  OPS_FILTERS,
  WORK_SECTIONS,
  WORK_TASKS,
  WORKFLOWS,
  SCHEDULES,
  WIDGET_DEFS,
  WORK_WIDGETS,
  PERSONALITIES,
  ANSWER_STYLES,
  CONTEXT_DEFS,
  CONTEXT_SOURCES,
  SKILL_DEFS,
  TRAIN_PHASES,
  BRIEF_QUESTIONS,
  STATE_LABELS,
  FACE_SHAPES,
  FACE_TINTS,
  CLUSTERS,
  mulberry,
  _hexCache,
  hexRGB,
  buildGraph
};
