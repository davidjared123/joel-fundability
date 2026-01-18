// All Reporting Vendors - Report to credit bureaus
export const reportingVendors = [
  {
    name: "Murphy USA",
    category: "Gas/Fleet Card",
    description: "Gas station chain offering fleet cards for business fuel purchases.",
    website: "https://www.murphyusa.com",
    benefits: ["Easy approval", "No personal guarantee", "Reports to business credit"],
    requirements: ["Business license", "EIN", "Business address"],
    bureaus: ['Experian', 'Equifax'],
    isReporting: true
  },
  {
    name: "Grainger",
    category: "Industrial Supplies",
    description: "Industrial supply company offering business credit for equipment and supplies.",
    website: "https://www.grainger.com",
    benefits: ["Net 30 terms", "Large product selection", "Business credit reporting"],
    requirements: ["Business license", "EIN", "Business phone"],
    bureaus: ['Experian', 'D&B'],
    isReporting: true
  },
  {
    name: "Pilot Flying J",
    category: "Gas/Fleet Card",
    description: "Truck stop chain offering fuel cards for commercial vehicles.",
    website: "https://www.pilotflyingj.com",
    benefits: ["Nationwide locations", "Fleet management", "Credit reporting"],
    requirements: ["Business license", "EIN", "Commercial vehicle"],
    bureaus: ['Equifax', 'D&B'],
    isReporting: true
  },
  {
    name: "Maverick Office Supplies",
    category: "Office Supplies",
    description: "Office supply company with business credit options.",
    website: "https://www.maverickofficesupplies.com",
    benefits: ["Net 30 terms", "Office essentials", "Credit building"],
    requirements: ["Business license", "EIN", "Business address"],
    bureaus: ['Experian'],
    isReporting: true
  },
  {
    name: "eCredable",
    category: "Reports Utility Payments",
    description: "Service that reports utility payments to business credit bureaus.",
    website: "https://www.ecredable.com",
    benefits: ["Utility payment reporting", "Credit building", "Easy setup"],
    requirements: ["Utility accounts", "Business name", "EIN"],
    bureaus: ['Equifax'],
    isReporting: true
  },
  {
    name: "Phillips 66 / Conoco / 76",
    category: "Gas/Fleet Cards",
    description: "Major oil company offering fleet fuel cards.",
    website: "https://www.phillips66.com",
    benefits: ["Major brand", "Fleet management", "Credit reporting"],
    requirements: ["Business license", "EIN", "Fleet vehicles"],
    bureaus: ['D&B'],
    isReporting: true
  },
  {
    name: "Credit Strong",
    category: "Financial Services",
    description: "Financial services company helping build business credit.",
    website: "https://www.creditstrong.com",
    benefits: ["Credit building", "Financial education", "Credit monitoring"],
    requirements: ["Business license", "EIN", "Business bank account"],
    bureaus: ['Experian', 'Equifax', 'D&B'],
    isReporting: true
  },
  {
    name: "KeyBank",
    category: "Business Credit Card",
    description: "Regional bank offering business credit cards and financing.",
    website: "https://www.key.com",
    benefits: ["Business credit card", "Credit reporting", "Banking services"],
    requirements: ["Business license", "EIN", "Good credit history"],
    bureaus: ['Experian', 'Equifax', 'D&B'],
    isReporting: true
  },
  {
    name: "7-Eleven",
    category: "Fleet/Gas Card",
    description: "Convenience store chain with business fuel card program.",
    website: "https://www.7-eleven.com",
    benefits: ["Nationwide locations", "Fuel discounts", "Credit reporting"],
    requirements: ["Business license", "EIN"],
    bureaus: ['D&B', 'Experian'],
    isReporting: true
  },
  {
    name: "Circle K",
    category: "Fleet/Gas Card",
    description: "Convenience store chain offering fleet cards.",
    website: "https://www.circlek.com",
    benefits: ["Wide network", "Fleet management", "Credit building"],
    requirements: ["Business license", "EIN"],
    bureaus: ['D&B', 'Equifax'],
    isReporting: true
  },
  {
    name: "ExxonMobil",
    category: "Gas Card",
    description: "Major oil company with business fuel card program.",
    website: "https://www.exxonmobil.com",
    benefits: ["Premium fuel", "Fleet discounts", "Credit reporting"],
    requirements: ["Business license", "EIN", "Fleet vehicles"],
    bureaus: ['D&B'],
    isReporting: true
  },
  {
    name: "Kum & Go",
    category: "Gas/Fleet Card",
    description: "Convenience store chain with business credit options.",
    website: "https://www.kumandgo.com",
    benefits: ["Regional coverage", "Fuel savings", "Credit building"],
    requirements: ["Business license", "EIN"],
    bureaus: ['D&B', 'Experian'],
    isReporting: true
  },
  {
    name: "Sunoco",
    category: "Fleet/Gas Cards",
    description: "Fuel company offering business fleet cards.",
    website: "https://www.sunoco.com",
    benefits: ["Nationwide network", "Fleet management", "Credit reporting"],
    requirements: ["Business license", "EIN"],
    bureaus: ['D&B', 'Equifax'],
    isReporting: true
  },
  {
    name: "Shell",
    category: "Fleet/Gas Card",
    description: "Global oil company with business fuel programs.",
    website: "https://www.shell.com",
    benefits: ["Global network", "Premium rewards", "Credit building"],
    requirements: ["Business license", "EIN", "Fleet vehicles"],
    bureaus: ['D&B', 'Experian'],
    isReporting: true
  },
  {
    name: "Brex Net Account",
    category: "Corporate Credit Card",
    description: "Corporate credit card for startups and growing businesses.",
    website: "https://www.brex.com",
    benefits: ["No personal guarantee", "High limits", "Credit reporting"],
    requirements: ["Business bank account", "EIN", "Revenue history"],
    bureaus: ['Experian', 'D&B'],
    isReporting: true
  },
  {
    name: "Wex",
    category: "Gas/Fleet",
    description: "Fleet management and fuel card solutions.",
    website: "https://www.wexinc.com",
    benefits: ["Comprehensive fleet tools", "Fuel savings", "Credit reporting"],
    requirements: ["Business license", "EIN", "Fleet vehicles"],
    bureaus: ['Experian', 'Equifax', 'D&B'],
    isReporting: true
  },
  {
    name: "Marathon",
    category: "Fleet/Gas Card",
    description: "Marathon Petroleum business fuel card program.",
    website: "https://www.marathon.com",
    benefits: ["Wide network", "Fleet management", "Credit building"],
    requirements: ["Business license", "EIN"],
    bureaus: ['D&B'],
    isReporting: true
  },
  {
    name: "The CEO Creative",
    category: "Office Supplies",
    description: "Office supplies and custom printing for businesses.",
    website: "https://www.theceocreative.com",
    benefits: ["Net 30 terms", "Custom products", "Credit reporting"],
    requirements: ["Business license", "EIN"],
    bureaus: ['Experian', 'Equifax', 'D&B'],
    isReporting: true
  },
  {
    name: "Uline",
    category: "Office Supplies",
    description: "Shipping, industrial and packaging materials.",
    website: "https://www.uline.com",
    benefits: ["Net 30 terms", "Huge selection", "Fast shipping"],
    requirements: ["Business license", "EIN", "Business address"],
    bureaus: ['D&B', 'Experian'],
    isReporting: true
  },
  {
    name: "Office Garner",
    category: "Office Supplies",
    description: "Office supplies vendor with business credit options.",
    website: "https://www.officegarner.com",
    benefits: ["Net 30 terms", "Office essentials", "Credit building"],
    requirements: ["Business license", "EIN"],
    bureaus: ['Experian', 'Equifax'],
    isReporting: true
  },
  {
    name: "Fulton Bank",
    category: "Financial Services",
    description: "Regional bank offering business financial services.",
    website: "https://www.fultonbank.com",
    benefits: ["Business accounts", "Credit products", "Credit reporting"],
    requirements: ["Business license", "EIN", "Good credit"],
    bureaus: ['Experian', 'Equifax', 'D&B'],
    isReporting: true
  },
  {
    name: "Gulf Fleet",
    category: "Gas/Fleet Card",
    description: "Gulf fuel cards for business fleets.",
    website: "https://www.gulfoil.com",
    benefits: ["Fleet management", "Fuel savings", "Credit reporting"],
    requirements: ["Business license", "EIN"],
    bureaus: ['D&B'],
    isReporting: true
  },
  {
    name: "Zoro",
    category: "Equipment and Supplies",
    description: "Industrial and business equipment supplier.",
    website: "https://www.zoro.com",
    benefits: ["Net 30 terms", "Huge selection", "Credit building"],
    requirements: ["Business license", "EIN"],
    bureaus: ['D&B', 'Experian'],
    isReporting: true
  },
  {
    name: "Valero",
    category: "Gas/Fleet Card",
    description: "Valero fleet fuel card program.",
    website: "https://www.valero.com",
    benefits: ["Wide network", "Fleet tools", "Credit reporting"],
    requirements: ["Business license", "EIN"],
    bureaus: ['D&B'],
    isReporting: true
  },
  {
    name: "Coast to Coast Office Supply",
    category: "Office Supplies",
    description: "Office supplies with business credit options.",
    website: "https://www.coasttocoastofficessupply.com",
    benefits: ["Net 30 terms", "Office essentials", "Credit building"],
    requirements: ["Business license", "EIN"],
    bureaus: ['Experian'],
    isReporting: true
  },
  {
    name: "Holiday",
    category: "Gas/Fleet Card",
    description: "Holiday Stationstores fleet card program.",
    website: "https://www.holidaystationstores.com",
    benefits: ["Regional coverage", "Fuel savings", "Credit reporting"],
    requirements: ["Business license", "EIN"],
    bureaus: ['D&B'],
    isReporting: true
  },
  {
    name: "JJ Gold",
    category: "Gift Supply Store",
    description: "Gift and promotional items supplier.",
    website: "https://www.jjgold.com",
    benefits: ["Net 30 terms", "Gift products", "Credit building"],
    requirements: ["Business license", "EIN"],
    bureaus: ['D&B', 'Experian'],
    isReporting: true
  },
  {
    name: "Wawa",
    category: "Fleet/Gas Card",
    description: "Wawa convenience stores fleet card.",
    website: "https://www.wawa.com",
    benefits: ["Regional coverage", "Fuel savings", "Credit reporting"],
    requirements: ["Business license", "EIN"],
    bureaus: ['D&B'],
    isReporting: true
  },
  {
    name: "Speedway",
    category: "Fleet/Gas Card",
    description: "Speedway fleet fuel card program.",
    website: "https://www.speedway.com",
    benefits: ["Nationwide network", "Fleet management", "Credit building"],
    requirements: ["Business license", "EIN"],
    bureaus: ['D&B', 'Equifax'],
    isReporting: true
  }
];

// Non-Reporting Vendors - Do NOT report to credit bureaus
export const nonReportingVendors = [
  {
    name: "Wegmans Food Market",
    category: "Grocery",
    description: "Regional grocery store chain.",
    website: "https://www.wegmans.com",
    benefits: ["Business accounts available", "Quality products"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "AMEX",
    category: "Business Credit Card",
    description: "American Express business credit cards.",
    website: "https://www.americanexpress.com",
    benefits: ["Rewards program", "Travel benefits", "Purchase protection"],
    requirements: ["Good personal credit", "Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Navy Federal Credit Union",
    category: "Business Credit Card",
    description: "Credit union serving military members and their families.",
    website: "https://www.navyfederal.org",
    benefits: ["Low rates", "Member benefits", "Business accounts"],
    requirements: ["Military affiliation", "Membership"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "First National Bank Texas",
    category: "Business Credit Card",
    description: "Regional bank offering business credit products.",
    website: "https://www.1stnb.com",
    benefits: ["Local service", "Business accounts"],
    requirements: ["Business license", "Good credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "BECU",
    category: "Business Credit Card",
    description: "Boeing Employees Credit Union business services.",
    website: "https://www.becu.org",
    benefits: ["Low rates", "Member benefits"],
    requirements: ["Membership eligibility"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "HSBC Bank",
    category: "Credit Card",
    description: "International bank with business credit products.",
    website: "https://www.hsbc.com",
    benefits: ["International reach", "Business accounts"],
    requirements: ["Good credit", "Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "BCW",
    category: "Company Supply Store",
    description: "Business and collector supplies.",
    website: "https://www.bcwsupplies.com",
    benefits: ["Specialty supplies", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Delta Airlines",
    category: "Business Credit Card",
    description: "Delta SkyMiles business credit card.",
    website: "https://www.delta.com",
    benefits: ["Travel rewards", "Priority boarding", "Miles earning"],
    requirements: ["Good personal credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "NS Bank",
    category: "Business Credit Cards",
    description: "Regional bank with business credit options.",
    website: "https://www.nsbank.com",
    benefits: ["Local service", "Business accounts"],
    requirements: ["Business license", "Good credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Altra Federal Credit Union",
    category: "Business Credit Card",
    description: "Federal credit union with business services.",
    website: "https://www.altra.org",
    benefits: ["Member rates", "Business accounts"],
    requirements: ["Membership eligibility"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Mouser Electronics",
    category: "Electronics Supply Store",
    description: "Electronic components distributor.",
    website: "https://www.mouser.com",
    benefits: ["Huge selection", "Fast shipping", "Net terms available"],
    requirements: ["Business license", "EIN"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "AT&T Business Solutions",
    category: "Internet/Voice/Wireless",
    description: "Business telecommunications services.",
    website: "https://www.att.com/business",
    benefits: ["Business phone", "Internet", "Wireless plans"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Sunbelt Rentals",
    category: "Rental Supply Company",
    description: "Equipment rental for businesses.",
    website: "https://www.sunbeltrentals.com",
    benefits: ["Equipment rental", "Business accounts"],
    requirements: ["Business license", "Credit check"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "NewEgg",
    category: "Company Supply Store",
    description: "Computer hardware and electronics retailer.",
    website: "https://www.newegg.com",
    benefits: ["Tech products", "Business accounts", "Bulk pricing"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "S. Walter Packaging",
    category: "Company Supply Store",
    description: "Packaging supplies for businesses.",
    website: "https://www.swalter.com",
    benefits: ["Packaging solutions", "Net terms"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Buy Auto Parts",
    category: "Auto Parts Supply Store",
    description: "Auto parts for businesses.",
    website: "https://www.buyautoparts.com",
    benefits: ["Auto parts", "Business pricing"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Spokane Teachers Credit Union",
    category: "Business Credit Card",
    description: "Credit union with business services.",
    website: "https://www.stcu.org",
    benefits: ["Member rates", "Local service"],
    requirements: ["Membership eligibility"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "BMO",
    category: "Business Credit Cards",
    description: "Bank of Montreal business products.",
    website: "https://www.bmo.com",
    benefits: ["Business accounts", "Credit products"],
    requirements: ["Good credit", "Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Dreisilker Electric Motors",
    category: "Company Supply Store",
    description: "Electric motors and equipment.",
    website: "https://www.dreisilker.com",
    benefits: ["Specialty equipment", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "First Financial Bank",
    category: "Business Credit Card",
    description: "Regional bank with business credit options.",
    website: "https://www.bankatfirst.com",
    benefits: ["Local service", "Business accounts"],
    requirements: ["Good credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Orr Safety",
    category: "Company Supply Store",
    description: "Safety equipment and supplies.",
    website: "https://www.orrsafety.com",
    benefits: ["Safety products", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Alphabroder",
    category: "Apparel Supply Store",
    description: "Wholesale apparel and accessories.",
    website: "https://www.alphabroder.com",
    benefits: ["Wholesale pricing", "Large selection"],
    requirements: ["Business license", "Resale certificate"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Campus USA",
    category: "Business Credit Card",
    description: "Credit union with business services.",
    website: "https://www.campususa.com",
    benefits: ["Member rates", "Business accounts"],
    requirements: ["Membership eligibility"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Love's",
    category: "Fleet Card",
    description: "Travel center fleet fuel cards.",
    website: "https://www.loves.com",
    benefits: ["Nationwide network", "Fuel discounts"],
    requirements: ["Business license", "EIN"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Toyota",
    category: "Lending Institution",
    description: "Toyota Financial Services.",
    website: "https://www.toyotafinancial.com",
    benefits: ["Vehicle financing", "Business leasing"],
    requirements: ["Good credit", "Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Hertz",
    category: "Car Rental",
    description: "Car rental company with business accounts.",
    website: "https://www.hertz.com",
    benefits: ["Business rentals", "Fleet options"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Northern Tool",
    category: "Store Credit Card",
    description: "Tools and equipment retailer.",
    website: "https://www.northerntool.com",
    benefits: ["Store credit", "Equipment selection"],
    requirements: ["Credit application"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Ryder",
    category: "Commercial Truck Rental",
    description: "Commercial truck rental and leasing.",
    website: "https://www.ryder.com",
    benefits: ["Fleet solutions", "Business accounts"],
    requirements: ["Business license", "Credit check"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Betty Mills",
    category: "Company Supply Store",
    description: "Office and cleaning supplies.",
    website: "https://www.bettymills.com",
    benefits: ["Bulk pricing", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "MSC Industrial Supply",
    category: "Company Supply Store",
    description: "Industrial and metalworking supplies.",
    website: "https://www.mscdirect.com",
    benefits: ["Large selection", "Net terms available"],
    requirements: ["Business license", "EIN"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Bob's Discount Furniture",
    category: "Furniture Supply Store",
    description: "Furniture retailer with business options.",
    website: "https://www.mybobs.com",
    benefits: ["Furniture selection", "Financing available"],
    requirements: ["Credit application"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Discount Coffee",
    category: "Coffee Supply Store",
    description: "Coffee supplies for businesses.",
    website: "https://www.discountcoffee.com",
    benefits: ["Bulk coffee", "Business pricing"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "FedEx",
    category: "Shipping Store",
    description: "Shipping and business services.",
    website: "https://www.fedex.com",
    benefits: ["Shipping discounts", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Amazon",
    category: "Business Credit Card",
    description: "Amazon Business credit options.",
    website: "https://www.amazon.com/business",
    benefits: ["Amazon purchases", "Rewards"],
    requirements: ["Amazon Business account"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Myron",
    category: "Customizable Gift Store",
    description: "Promotional products and gifts.",
    website: "https://www.myron.com",
    benefits: ["Custom products", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "SVB/Silicon Valley Bank",
    category: "Business Credit Cards",
    description: "Bank focused on tech and startups.",
    website: "https://www.svb.com",
    benefits: ["Startup friendly", "Business accounts"],
    requirements: ["Business verification", "Revenue"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Seton",
    category: "Company Supply Store",
    description: "Safety and identification products.",
    website: "https://www.seton.com",
    benefits: ["Safety supplies", "Net terms"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "S&S Activewear",
    category: "Apparel Supply Store",
    description: "Wholesale activewear and apparel.",
    website: "https://www.ssactivewear.com",
    benefits: ["Wholesale pricing", "Large selection"],
    requirements: ["Business license", "Resale certificate"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "JetBlue",
    category: "Credit Card",
    description: "JetBlue business credit card.",
    website: "https://www.jetblue.com",
    benefits: ["Travel rewards", "TrueBlue points"],
    requirements: ["Good personal credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Bank of America",
    category: "Business Credit Card",
    description: "Large bank with business credit products.",
    website: "https://www.bankofamerica.com",
    benefits: ["Rewards", "Business accounts"],
    requirements: ["Good credit", "Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "4Imprint",
    category: "Company Supply Store",
    description: "Promotional products supplier.",
    website: "https://www.4imprint.com",
    benefits: ["Custom products", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Southwest Airlines",
    category: "Business Credit Card",
    description: "Southwest Rapid Rewards business card.",
    website: "https://www.southwest.com",
    benefits: ["Travel rewards", "Companion pass"],
    requirements: ["Good personal credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "FHC",
    category: "Hardware Supply Store",
    description: "Glass and glazing hardware supplies.",
    website: "https://www.quanex.com",
    benefits: ["Specialty hardware", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "TD Bank",
    category: "Business Credit Card",
    description: "TD Bank business credit products.",
    website: "https://www.td.com",
    benefits: ["Business accounts", "Credit options"],
    requirements: ["Good credit", "Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Meyer DC",
    category: "Medical Supply Store",
    description: "Medical and healthcare supplies.",
    website: "https://www.meyerdc.com",
    benefits: ["Medical supplies", "Net terms"],
    requirements: ["Business license", "Healthcare verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "United Airlines",
    category: "Business Credit Card",
    description: "United MileagePlus business card.",
    website: "https://www.united.com",
    benefits: ["Travel rewards", "Miles earning"],
    requirements: ["Good personal credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "TipTemp",
    category: "Company Supply Store",
    description: "Temperature monitoring supplies.",
    website: "https://www.tiptemp.com",
    benefits: ["Specialty products", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Chase",
    category: "Business Credit Cards",
    description: "Chase business credit card options.",
    website: "https://www.chase.com/business",
    benefits: ["Rewards", "Business perks"],
    requirements: ["Good credit", "Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Industrial Fans Direct",
    category: "Industrial Supply Store",
    description: "Industrial fans and equipment.",
    website: "https://www.industrialfansdirect.com",
    benefits: ["Industrial equipment", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Central Bank",
    category: "Business Credit Cards",
    description: "Regional bank with business products.",
    website: "https://www.centralbank.com",
    benefits: ["Local service", "Business accounts"],
    requirements: ["Good credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Community Resource Credit Union",
    category: "Business Credit Card",
    description: "Credit union with business services.",
    website: "https://www.crcu.org",
    benefits: ["Member rates", "Local service"],
    requirements: ["Membership eligibility"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Bank of the West",
    category: "Business Credit Cards",
    description: "Regional bank with business credit.",
    website: "https://www.bankofthewest.com",
    benefits: ["Business accounts", "Credit options"],
    requirements: ["Good credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Abt",
    category: "Company Supply Store",
    description: "Electronics and appliances retailer.",
    website: "https://www.abt.com",
    benefits: ["Electronics selection", "Business accounts"],
    requirements: ["Credit application"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Aeromax Toys",
    category: "Company Supply Store",
    description: "Educational toys and products.",
    website: "https://www.aeromaxtoys.com",
    benefits: ["Wholesale pricing", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Hawaiian Airlines",
    category: "Business Credit Card",
    description: "Hawaiian Airlines business card.",
    website: "https://www.hawaiianairlines.com",
    benefits: ["Travel rewards", "Miles earning"],
    requirements: ["Good personal credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Marriott Bonvoy",
    category: "Business Credit Card",
    description: "Marriott business credit card.",
    website: "https://www.marriott.com",
    benefits: ["Hotel rewards", "Elite status"],
    requirements: ["Good personal credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Discount School Supply",
    category: "Company Supply Store",
    description: "Educational supplies for schools.",
    website: "https://www.discountschoolsupply.com",
    benefits: ["Educational products", "Net terms"],
    requirements: ["School/business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "First Interstate Bank",
    category: "Business Credit Cards",
    description: "Regional bank with business products.",
    website: "https://www.firstinterstatebank.com",
    benefits: ["Local service", "Business accounts"],
    requirements: ["Good credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "U-Haul",
    category: "Business Storage Solutions",
    description: "Moving and storage for businesses.",
    website: "https://www.uhaul.com",
    benefits: ["Rentals", "Storage solutions"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "USA Scientific",
    category: "Company Supply Store",
    description: "Laboratory supplies and equipment.",
    website: "https://www.usascientific.com",
    benefits: ["Lab supplies", "Net terms"],
    requirements: ["Business/lab verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Peoples Bank & Trust Co.",
    category: "Business Credit Card",
    description: "Community bank with business products.",
    website: "https://www.peoplesbank.com",
    benefits: ["Local service", "Business accounts"],
    requirements: ["Good credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "O'Reilly Auto Parts",
    category: "Commercial Store Credit",
    description: "Auto parts retailer with commercial accounts.",
    website: "https://www.oreillyauto.com",
    benefits: ["Auto parts", "Commercial pricing"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Backflow Parts USA",
    category: "Company Supply Store",
    description: "Backflow prevention parts and supplies.",
    website: "https://www.backflowpartsusa.com",
    benefits: ["Specialty parts", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Arvest",
    category: "Business Credit Card",
    description: "Regional bank with business credit.",
    website: "https://www.arvest.com",
    benefits: ["Local service", "Business accounts"],
    requirements: ["Good credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Deluxe",
    category: "Business Forms and Office Supplies",
    description: "Business forms, checks, and supplies.",
    website: "https://www.deluxe.com",
    benefits: ["Business forms", "Custom products"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Vista Print",
    category: "Customizable Gift Store",
    description: "Custom printing and marketing materials.",
    website: "https://www.vistaprint.com",
    benefits: ["Custom printing", "Business cards"],
    requirements: ["None"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "BCU",
    category: "Business Credit Card",
    description: "Credit union with business services.",
    website: "https://www.bcu.org",
    benefits: ["Member rates", "Business accounts"],
    requirements: ["Membership eligibility"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Medex Supply",
    category: "Medical Supply Store",
    description: "Medical supplies and equipment.",
    website: "https://www.medexsupply.com",
    benefits: ["Medical supplies", "Business pricing"],
    requirements: ["Business/healthcare verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Global Industrial",
    category: "Industrial Supply Store",
    description: "Industrial and commercial equipment.",
    website: "https://www.globalindustrial.com",
    benefits: ["Industrial equipment", "Net terms"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "T-Mobile",
    category: "Business Cell Phone Plans",
    description: "Business wireless services.",
    website: "https://www.t-mobile.com/business",
    benefits: ["Business plans", "Device financing"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "B & H Photo",
    category: "Company Supply Store",
    description: "Photo, video, and electronics retailer.",
    website: "https://www.bhphotovideo.com",
    benefits: ["Electronics selection", "Net terms"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Cable Organizer",
    category: "Company Supply Store",
    description: "Cable management and networking supplies.",
    website: "https://www.cableorganizer.com",
    benefits: ["Cable products", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "John Deere",
    category: "Financing Equipment",
    description: "John Deere Financial services.",
    website: "https://www.deere.com",
    benefits: ["Equipment financing", "Fleet options"],
    requirements: ["Good credit", "Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Budget",
    category: "Car Rental Company",
    description: "Car rental for businesses.",
    website: "https://www.budget.com",
    benefits: ["Business rentals", "Fleet options"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Demco",
    category: "Company Supply Store",
    description: "Library and educational supplies.",
    website: "https://www.demco.com",
    benefits: ["Educational supplies", "Net terms"],
    requirements: ["Business/school verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Paper Mart",
    category: "Company Supply Store",
    description: "Packaging and paper supplies.",
    website: "https://www.papermart.com",
    benefits: ["Packaging supplies", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Emedco",
    category: "Company Supply Store",
    description: "Safety signs and workplace products.",
    website: "https://www.emedco.com",
    benefits: ["Safety products", "Net terms"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "PeopleReady",
    category: "Recruiting",
    description: "Staffing and workforce solutions.",
    website: "https://www.peopleready.com",
    benefits: ["Staffing solutions", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Forestry Suppliers",
    category: "Company Supply Store",
    description: "Forestry and outdoor equipment.",
    website: "https://www.forestry-suppliers.com",
    benefits: ["Specialty equipment", "Net terms"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "US Plastic",
    category: "Company Supply Store",
    description: "Plastic products and containers.",
    website: "https://www.usplastic.com",
    benefits: ["Plastic products", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "American Express Gold Card",
    category: "Business Credit Card",
    description: "Amex Gold business credit card.",
    website: "https://www.americanexpress.com",
    benefits: ["Rewards", "Travel benefits"],
    requirements: ["Good personal credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "National Pen",
    category: "Company Supply Store",
    description: "Promotional pens and products.",
    website: "https://www.pens.com",
    benefits: ["Custom products", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Best Buy",
    category: "Electronics Supply Store",
    description: "Electronics retailer with business accounts.",
    website: "https://www.bestbuy.com/business",
    benefits: ["Electronics selection", "Business pricing"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Barclays Bank",
    category: "Business Credit Cards",
    description: "International bank with business cards.",
    website: "https://www.barclays.com",
    benefits: ["Business accounts", "Credit options"],
    requirements: ["Good credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Hilti",
    category: "Industrial Supplies",
    description: "Professional construction tools.",
    website: "https://www.hilti.com",
    benefits: ["Professional tools", "Fleet management"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Cadence Bank",
    category: "Business Credit Card",
    description: "Regional bank with business products.",
    website: "https://www.cadencebank.com",
    benefits: ["Local service", "Business accounts"],
    requirements: ["Good credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Brimar Industries/SafetySign",
    category: "Industrial Supplies",
    description: "Safety signs and products.",
    website: "https://www.safetysign.com",
    benefits: ["Safety products", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Cenex",
    category: "Fleet Card",
    description: "Cenex fleet fuel cards.",
    website: "https://www.cenex.com",
    benefits: ["Fleet fuel", "Rural coverage"],
    requirements: ["Business license", "EIN"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Altex Computers & Electronics",
    category: "Computer Supply Store",
    description: "Computer and electronics retailer.",
    website: "https://www.altex.com",
    benefits: ["Tech products", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Vestis",
    category: "Uniform Supplies",
    description: "Uniform and workplace apparel.",
    website: "https://www.vestis.com",
    benefits: ["Uniforms", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Interstate Batteries",
    category: "Battery Supply Store",
    description: "Battery products for businesses.",
    website: "https://www.interstatebatteries.com",
    benefits: ["Battery products", "Commercial accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "ZBattery",
    category: "Company Supply Store",
    description: "Battery and power products.",
    website: "https://www.zbattery.com",
    benefits: ["Battery selection", "Business pricing"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Menards",
    category: "Business Credit Cards",
    description: "Home improvement retailer with business cards.",
    website: "https://www.menards.com",
    benefits: ["Home improvement", "Business pricing"],
    requirements: ["Credit application"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Sherwin Williams",
    category: "Painting Supply Store",
    description: "Paint and coatings for businesses.",
    website: "https://www.sherwin-williams.com",
    benefits: ["Pro pricing", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Capital One Spark Card",
    category: "Business Credit Card",
    description: "Capital One business cards.",
    website: "https://www.capitalone.com/small-business",
    benefits: ["Rewards", "No foreign fees"],
    requirements: ["Good credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Amsterdam Printing",
    category: "Printing Supply Store",
    description: "Promotional printing products.",
    website: "https://www.amsterdamprinting.com",
    benefits: ["Custom printing", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Zip's",
    category: "Fleet Parts Vendor",
    description: "Fleet and truck parts.",
    website: "https://www.zips.com",
    benefits: ["Fleet parts", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Halo Branded Solutions",
    category: "Company Supply Store",
    description: "Promotional products and branding.",
    website: "https://www.halo.com",
    benefits: ["Branded products", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Touchboards",
    category: "Company Supply Store",
    description: "Presentation and display products.",
    website: "https://www.touchboards.com",
    benefits: ["Display products", "Business accounts"],
    requirements: ["Business verification"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "Modern Plastics",
    category: "Manufacturing Supplies",
    description: "Plastic manufacturing supplies.",
    website: "https://www.modernplastics.com",
    benefits: ["Manufacturing supplies", "Business accounts"],
    requirements: ["Business license"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "World of Hyatt",
    category: "Business Credit Card",
    description: "Hyatt business credit card.",
    website: "https://www.hyatt.com",
    benefits: ["Hotel rewards", "Elite status"],
    requirements: ["Good personal credit"],
    bureaus: [],
    isReporting: false
  },
  {
    name: "IHG Hotels & Resorts",
    category: "Travel Credit Card",
    description: "IHG business credit card.",
    website: "https://www.ihg.com",
    benefits: ["Hotel rewards", "Points earning"],
    requirements: ["Good personal credit"],
    bureaus: [],
    isReporting: false
  }
];

// Combined list of all vendors
export const vendors = [...reportingVendors, ...nonReportingVendors];

// Helper function to get vendors by bureau
export const getVendorsByBureau = (bureau) => {
  return reportingVendors.filter(v => v.bureaus.includes(bureau));
};

// Helper function to get only reporting vendors
export const getReportingVendors = () => reportingVendors;

// Helper function to get only non-reporting vendors  
export const getNonReportingVendors = () => nonReportingVendors;
