// Fake AI engine — generates intelligent, mode-aware responses
// Mimics Groq LLaMA 3 output style without needing any API

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Initial response when each mode is started
const MODE_INTROS = {
  lead: `## 🎯 Lead Generation Mode Active

Welcome! I'll help you qualify your real estate leads. For effective qualification, I need to understand the following:

### Discovery Questions:

**About Your Target Market:**
1. Which **city/area** are you operating in?
2. **Buyers or Sellers** — what kind of leads are you looking for?
3. What **price range** do you work in?

**Lead Sources:**
4. What are your current lead sources? (referrals, social media, paid ads, open houses?)
5. How many leads do you generate **per month** currently?

Share these details and I'll build you a **qualification framework**, **scripts**, and a **lead scoring system** that can triple your conversion rate.`,

  listing: `## 📝 Listing Writer Mode Active

Excellent! I'll write you a **professional, SEO-optimized listing** that attracts buyers and helps sell fast.

### I need these details:

**Property Basics:**
- **Address & city**
- **Property type** (single family, condo, townhouse?)
- **Beds / Baths / Square Footage**
- **Year built**
- **Asking price**

**Standout Features:**
- What **unique features** does it have? (pool, view, smart home, recent renovation?)
- Condition of the **kitchen / master bath**?
- **Outdoor space** (yard, balcony, deck?)

**Location Perks:**
- Nearby schools?
- What's within walking distance?
- Commute time to downtown?

Send me all the details — I'll deliver a **headline-grabbing listing** with hooks, emotional triggers, and SEO keywords.`,

  roi: `## 💰 ROI Calculator Mode Active

Excellent choice! I'll run a **comprehensive ROI analysis** on your investment property. I need these numbers to calculate:

### Purchase Details:
1. **Purchase price** (how much is the property?)
2. **Down payment** % (typically 20-25% for investment)
3. **Interest rate** & loan term
4. **Closing costs** estimate

### Income Side:
5. **Expected monthly rent** (have you researched market rent?)
6. **Vacancy rate** assumption (5-10% standard)
7. Property type — long-term rental or short-term?

### Expense Side:
8. Property tax (annual)
9. Insurance
10. HOA fees (if applicable)
11. Property management fee (8-12% typical)
12. Maintenance reserve (1% of value/year)

Share the numbers — I'll give you **Cap Rate, Cash-on-Cash Return, NOI, Break-Even point, and a 10-year projection**.`,

  market: `## 📊 Market Analysis Mode Active

Perfect! I'll prepare **deep market intelligence** for you. Tell me:

### Location Focus:
1. Which **city / neighborhood**?
2. What **property type** are you interested in? (SFH, condos, multi-family?)
3. What **price range** are you targeting?

### Analysis Focus:
4. Are you a **buyer**, **seller**, or **investor**?
5. Time horizon — **short term (flip)** or **long term hold**?

### I'll cover:
- 📈 **12-month price trends**
- 🏘️ **Inventory & days on market**
- 📊 **Median price, $/sqft, comps**
- 🔮 **Demand-supply dynamics**
- 💼 **Job market & population growth**
- ⚠️ **Risks and red flags**
- 🎯 **Best opportunity zones**

Share the details and I'll build you an **actionable market report**.`,

  airbnb: `## 🏡 Airbnb Optimizer Mode Active

Awesome! **Strategic optimization** of short-term rentals can deliver a 30-50% revenue jump. I'll help optimize your property.

### Property Profile:
1. **Location** (city, neighborhood)?
2. **Property type** (entire home, private room, studio)?
3. **Beds / Baths / Sqft**?
4. **Current nightly rate**?

### Current Performance:
5. **Monthly revenue** (last 3-6 months)?
6. **Occupancy rate** %?
7. **Average daily rate (ADR)**?
8. **Review score** (rating + count)?

### Strategy Questions:
9. Do you use **dynamic pricing tools**? (PriceLabs, Beyond?)
10. Are your photos professional?
11. What are your cleaning fees, minimum stay rules?

Share the details — I'll deliver a **complete optimization roadmap**: pricing strategy, listing improvements, occupancy hacks, and revenue projections.`,
};

// Property analysis when search returns results
function analyzeProperties(city, state, homes) {
  if (!homes || homes.length === 0) return "";

  const prices = homes.map(h => h.list_price).filter(Boolean);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const cheapest = homes.find(h => h.list_price === minPrice);
  const priciest = homes.find(h => h.list_price === maxPrice);

  const avgSqft = Math.round(
    homes.filter(h => h.description?.sqft).reduce((a, h) => a + h.description.sqft, 0) /
    homes.filter(h => h.description?.sqft).length
  );
  const pricePerSqft = Math.round(avgPrice / avgSqft);

  return `## 🏘️ ${city}, ${state} Market Analysis

I found **${homes.length} active listings**. Here's the detailed breakdown:

### 📊 Price Snapshot
- **Median Price:** $${avgPrice.toLocaleString()}
- **Price Range:** $${minPrice.toLocaleString()} – $${maxPrice.toLocaleString()}
- **Average Size:** ~${avgSqft.toLocaleString()} sqft
- **Price per Sqft:** ~$${pricePerSqft}

### 💎 Best Value Deal
**${cheapest.location.address.line}** — $${minPrice.toLocaleString()}
- ${cheapest.description.beds}bd / ${cheapest.description.baths}ba, ${cheapest.description.sqft?.toLocaleString()} sqft
- *Why it's a deal:* Lowest entry point in this batch. Price/sqft ~$${Math.round(minPrice / cheapest.description.sqft)} — below the area average. Great for **first-time buyers** or **rental investment**.

### 🏆 Premium Pick
**${priciest.location.address.line}** — $${maxPrice.toLocaleString()}
- ${priciest.description.beds}bd / ${priciest.description.baths}ba, ${priciest.description.sqft?.toLocaleString()} sqft
- *Standout:* Largest sqft, premium location signals. Best for **end-user buyers** wanting space.

### 🎯 Buyer's Strategy
1. **Negotiation room:** ${state === "TX" || state === "FL" ? "Strong buyer market — 3-5% below ask is realistic." : "Moderate market — 1-3% negotiation likely."}
2. **Inspection focus:** ${state === "FL" ? "Hurricane prep, roof age, flood zone status." : state === "TX" ? "HVAC capacity, foundation (clay soil issues), property tax check." : "Standard inspection plus property tax assessment."}
3. **Financing tip:** Lock rates now — even a quarter-point matters on a 30-year loan.

### ⚠️ Risks to Watch
- **Days on market:** If 60+ days, you have strong negotiating leverage
- **Property taxes:** Check ${state} property tax rates carefully
- **HOA fees:** Hidden costs in condos can add up

### 📞 Next Steps
1. **Shortlist 3-4 properties**
2. **Drive-by visit** for neighborhood feel
3. Keep your **pre-approval letter** ready for offers
4. Verify schools and commute times

Which property would you like a deeper dive on? Or share your specific budget / bedroom count and I'll narrow it down further.`;
}

// No results found response
function noResultsResponse(city, state) {
  return `❌ I couldn't find any active listings in **${city}, ${state}** in our current database.

### 🔄 Try These Alternatives:

**Major US cities available in our database:**
- 🏙️ **Texas:** Houston, Austin, Dallas
- 🌴 **Florida:** Miami, Orlando
- 🌆 **California:** Los Angeles
- 🗽 **New York:** New York City
- 🏛️ **Illinois:** Chicago
- 🌵 **Arizona:** Phoenix
- ☔ **Washington:** Seattle

### 💡 Market Advice for ${city}:
To find properties in cities like ${city}:
1. Check **local MLS** directly
2. Set up alerts on **Realtor.com / Zillow**
3. Network with **local agents**
4. For off-market deals, direct mailers can be effective

Try one of the cities listed above!`;
}

// Generic conversational follow-up responses
const FOLLOWUP_RESPONSES = [
  `Great question! The answer depends on your **specific situation**. Generally, three things matter most in real estate:

### 🏛️ Key Considerations:
1. **Location quality** — schools, jobs, walkability
2. **Property condition** — factor in repair costs
3. **Market timing** — are current trends in your favor?

Share a bit more context — what's your **budget, timeline, and goal**? Then I can give you precise, actionable advice.`,

  `Good insight! It's important to focus on this point. For **real estate decisions**, use this framework:

### 📋 Decision Framework:
- **Financial fit:** Keep your DTI ratio under 43%
- **Reserve funds:** 6 months of expenses in cash
- **Time horizon:** Hold the property for at least 5 years
- **Risk tolerance:** A single property = single point of failure

What's your **specific concern**? Pricing, financing, timing, or location? Share the details and I'll give targeted advice.`,

  `Great question. For decisions like this, a **data-driven approach** works best:

### 📊 Numbers to Track:
- **Cap rate:** > 6% is a solid investment
- **1% rule:** Monthly rent ≥ 1% of purchase price
- **Cash flow:** Positive after all expenses
- **Appreciation potential:** Areas with job + population growth

### ⚠️ Common Mistakes:
1. Buying with emotion (especially primary residence)
2. Skipping inspection
3. Under-estimating property taxes
4. Not factoring vacancy rate

Are you an **investor** or an **end-user**? Tell me and I'll guide you according to your goal.`,

  `You're raising a great point! This is a **strategic question** and the answer depends on your **profile**.

### 🎯 Two Main Paths:

**Path 1: Cash Flow Focus**
- Mid-tier markets (Texas, Florida, Arizona)
- Multi-family properties
- Long-term rentals
- **Target:** 8-12% cash-on-cash return

**Path 2: Appreciation Focus**
- Premium markets (California, NYC, Seattle)
- Single family in growing suburbs
- Hold for 7-10 years minimum
- **Target:** 4-6% annual appreciation + tax benefits

Are you looking for **passive income** or **wealth building**? The answer will decide your next steps.`,
];

// Lead generation responses
const LEAD_RESPONSES = [
  `Great! You've shared meaningful info. Based on this profile, here's a **qualified lead strategy**:

### 🎯 Lead Scoring Framework (BANT)

**B — Budget**
- Pre-approved? ✓ Hot lead (priority 1)
- Cash available? ✓ Premium lead
- Just browsing? ❌ Nurture only

**A — Authority**
- Is the decision maker present?
- If a couple, are both engaged?
- Is it a family decision?

**N — Need**
- Is there a specific timeline? (urgency = quality)
- Why are they moving? (job, family, investment)
- Are must-haves vs nice-to-haves clear?

**T — Timeline**
- 30 days = HOT 🔥
- 1-3 months = WARM 🌡️
- 3-6 months = NURTURE 💧
- 6+ months = NEWSLETTER list

### 📋 Top 5 Discovery Questions:
1. "What problem are you solving with this move?"
2. "Ideally, when do you want to be moved in?"
3. "Are you already working with another agent?"
4. "How far along is your financing?"
5. "What are your must-haves — your non-negotiables?"

Tell me more — where are your **lead sources** coming from? I'll give you a **conversion playbook**.`,
];

// Listing responses
const LISTING_RESPONSES = [
  `Great details! Here's your **professional listing copy**:

---

### ✨ HEADLINE
**Stunning Move-In Ready Home with Premium Finishes — Won't Last Long!**

### 🏡 LEAD PARAGRAPH
Step into your dream home! This beautifully maintained property combines modern updates with timeless charm — perfect for families, professionals, or anyone seeking quality living in a prime location.

### 🔑 KEY FEATURES
- ✅ **Spacious open-concept layout** — ideal for entertaining
- ✅ **Updated kitchen** with stainless appliances & granite counters
- ✅ **Primary suite retreat** with walk-in closet & spa-like bath
- ✅ **Energy-efficient** windows + smart thermostat
- ✅ **Private backyard oasis** — perfect for BBQs and relaxation
- ✅ **Top-rated school district**
- ✅ **Minutes to shopping, dining, highways**

### 📍 LOCATION HOOK
Nestled in one of the area's most desirable neighborhoods, you'll enjoy easy access to everything while coming home to peace and tranquility.

### 🎯 CALL-TO-ACTION
**Schedule your private showing today — homes like this are flying off the market! Contact us before someone else calls it home.**

---

### 💡 SEO Keywords Used:
move-in ready, updated kitchen, primary suite, energy-efficient, top schools, prime location

### 📸 Photo Tips:
1. **Hero shot:** Front exterior at golden hour
2. **Kitchen:** Wide angle showing flow
3. **Master bedroom:** Staged, well-lit
4. **Backyard:** Lifestyle shot

Which version would you like — **luxury tone**, **family-friendly**, or **investor angle**? I'll customize it.`,
];

// ROI responses
const ROI_RESPONSES = [
  `Excellent! You've shared solid numbers. Here's the **detailed ROI breakdown**:

### 💰 Investment Analysis

**Acquisition:**
- Purchase Price: Based on your numbers
- Down Payment (25%): ~25% of purchase
- Loan Amount: ~75%
- Closing Costs (3%): factor in

### 📊 Monthly Cash Flow

| Item | Amount |
|------|--------|
| Gross Rent | $X,XXX |
| Vacancy (8%) | -$XXX |
| **Effective Rent** | $X,XXX |
| Mortgage (P&I) | -$X,XXX |
| Property Tax | -$XXX |
| Insurance | -$XXX |
| HOA | -$XXX |
| Maintenance (1%) | -$XXX |
| Property Mgmt (10%) | -$XXX |
| **Net Cash Flow** | **+$XXX/mo** |

### 🎯 Key Metrics

- **Cap Rate:** 6.2% ✅ (>6% good)
- **Cash-on-Cash Return:** 8.5% ✅ (>8% great)
- **NOI Annual:** $X,XXX
- **1% Rule:** ✅ Meets criteria
- **Break-even:** Month 11

### 📈 5-Year Projection (3% appreciation, 2% rent growth)
- Year 1 cash flow: $X,XXX
- Year 5 equity built: ~$XX,XXX
- Total return: ~$XX,XXX

### ⚠️ Sensitivity Risks
1. **Vacancy spike (15%):** Cash flow turns negative
2. **Major repair year:** Plan for $5-10K reserve
3. **Interest rate refi:** Lock in for 7+ years

### ✅ Verdict
**This looks like a SOLID investment** based on the numbers. Cap rate is above market average, positive cash flow from day 1, and strong appreciation potential.

### 🎯 Next Steps
1. Get a **professional inspection** ($400-600)
2. Verify **rent comps** independently
3. Talk to **2-3 property managers**
4. Set up an **LLC structure** for liability protection

Want me to recalculate with specific numbers? Send the exact figures!`,
];

// Market analysis responses
const MARKET_RESPONSES = [
  `Here's your **comprehensive market analysis**:

### 📊 Market Overview

**Current Conditions:**
- 🏘️ **Inventory:** Moderate — 3.2 months supply
- ⏱️ **Days on Market:** Median 28 days
- 📈 **YoY Price Change:** +4.7%
- 💼 **Market Type:** Slightly competitive

### 📈 Price Trends (12 months)
- **Q1:** $385K median
- **Q2:** $398K (+3.4%)
- **Q3:** $412K (+3.5%)
- **Q4:** $405K (-1.7% seasonal)

### 🏆 Top-Performing Neighborhoods
1. **Premium tier** ($600K+) — Low inventory, fast sales
2. **Mid-tier** ($350K-$600K) — Most activity, best comps
3. **Entry-tier** (<$350K) — Bidding wars common

### 💼 Economic Drivers
- ✅ **Job growth:** +2.8% YoY
- ✅ **Population:** +1.5% YoY net migration
- ✅ **Major employers:** Tech, healthcare, energy
- ⚠️ **Interest rates:** Headwind for affordability

### 🎯 Opportunity Zones

**For Buyers:**
- New construction (price negotiable, builder incentives)
- 60+ days on market listings (motivated sellers)
- Probate / estate sales

**For Investors:**
- Single-family rentals in growth corridors
- BRRRR opportunities in transitional neighborhoods
- Short-term rentals (verify regulations first)

### ⚠️ Risks & Red Flags
1. **HOA-heavy condos** — fees rising 8-12% annually
2. **Flood zones** — insurance costs escalating
3. **Over-leveraged purchases** at peak prices

### 📅 Timing Strategy
- **Best buying months:** November - February (less competition)
- **Best selling months:** April - June (peak demand)
- **Avoid:** Holiday season for both sides

### 🔮 6-12 Month Outlook
**Forecast:** Moderate appreciation (3-5%), slight inventory increase, buyer leverage improving.

**Recommendation:** If you're a buyer, you can afford to **wait & negotiate**. If selling, **list before peak season**.

Want a deeper analysis on a specific neighborhood or price range? Just ask!`,
];

// Airbnb responses
const AIRBNB_RESPONSES = [
  `Awesome property! Here's your **complete Airbnb optimization plan**:

### 🎯 Current vs Optimized Snapshot

| Metric | Current | Target | Lift |
|--------|---------|--------|------|
| Occupancy | ~65% | 78% | +20% |
| ADR | $145 | $175 | +21% |
| Monthly Revenue | $2,830 | $4,095 | **+45%** |
| Review Score | 4.6 | 4.85+ | Critical |

### 💰 Pricing Strategy

**Dynamic Pricing Implementation:**
- 🎢 **Weekday vs Weekend:** 25-40% premium on Fri-Sat
- 📅 **Seasonal multipliers:** Peak season +50%, off-season -15%
- 🏃 **Last-minute discounts:** 7-day window @ 10-15% off
- 📈 **Event-based surge:** Local events, conventions = +30-60%

**Tools to use:** PriceLabs ($20/mo) or Beyond — pays for itself in week 1.

### 📸 Listing Optimization

**Photo Audit (35% of conversion):**
1. ✅ Hero shot must be **bright, wide-angle, professionally shot**
2. ✅ 25-30 photos minimum
3. ✅ Lifestyle shots (coffee on patio, cozy reading nook)
4. ✅ Each room from 2 angles

**Title Formula:**
~ [LOCATION] [UNIQUE FEATURE] | [GUEST BENEFIT]
Example: *"Downtown Loft w/ Skyline View | Walk to Everything"*

**Description Hooks:**
- First 250 chars = critical (shows in search)
- Use **emojis** strategically (🛏️ 🚿 🍳)
- Highlight **3-5 standout amenities**

### ⭐ Review Strategy (5-star path)

**Pre-arrival:**
- Send welcome message 24 hr before
- Clear check-in instructions with photos

**During stay:**
- Day 1 message: "Settling in OK?"
- Day 3 message: "Need any local tips?"

**Post-checkout:**
- Thank you note + review request within 2 hours
- Goal: 90%+ review rate

### 🏆 Amenity Upgrades (ROI ordered)

1. **Fast WiFi** (250+ Mbps) — non-negotiable
2. **Smart lock** — convenience + security
3. **Premium coffee setup** — Nespresso/Aeropress
4. **Quality linens** ($300 investment, lasts 2 yr)
5. **Streaming subscriptions** (Netflix, Spotify)
6. **Local welcome basket** — instant 5-star magnet

### 📅 Calendar & Stay Rules

- **Minimum stay:** 2 nights weekdays, 3 weekends
- **Block dates strategically:** Premium pricing on event weekends
- **30-day pricing:** 20% discount for monthly stays (tax benefits)

### 💸 Cost Optimization

- **Cleaning fee:** Charge full + $20 buffer
- **Laundry:** Outsource at $60/turn (saves 2 hrs)
- **Restocking:** Bulk Costco order monthly
- **Maintenance:** Quarterly preventive vs reactive

### 🎯 Action Plan (Next 30 Days)

**Week 1:**
- Implement dynamic pricing
- Audit + reshoot photos
- Rewrite title + description

**Week 2:**
- Set up automated guest messaging
- Upgrade WiFi + smart lock

**Week 3-4:**
- Refresh amenities & linens
- Get 5 new 5-star reviews

### 📊 90-Day Projection
**Expected revenue lift:** 35-50%
**Investment needed:** $800-1500 upfront
**Payback period:** 3-4 weeks

Want a deep-dive on a specific area? Pricing, photos, automation — name any topic!`,
];

// Detect intent from message content
function detectIntent(content) {
  const lc = content.toLowerCase();
  if (lc.includes("budget") || lc.includes("buyer") || lc.includes("seller") || lc.includes("lead")) return "lead";
  if (lc.includes("listing") || lc.includes("description") || lc.includes("copy")) return "listing";
  if (lc.includes("roi") || lc.includes("cap rate") || lc.includes("rental yield") || lc.includes("cash flow")) return "roi";
  if (lc.includes("market") || lc.includes("trend") || lc.includes("price")) return "market";
  if (lc.includes("airbnb") || lc.includes("short-term") || lc.includes("occupancy")) return "airbnb";
  return null;
}

// Main fake AI function — mimics callGroq()
export async function fakeAIResponse({ history, context = "", isInitialMode = false, mode = null }) {
  // Simulate network delay (700-1400ms)
  await new Promise(r => setTimeout(r, 700 + Math.random() * 700));

  // Mode intro response
  if (isInitialMode && mode && MODE_INTROS[mode]) {
    return MODE_INTROS[mode];
  }

  // Detect mode from current/recent messages
  const lastMsg = history[history.length - 1]?.content || "";
  const detectedMode = detectIntent(lastMsg);

  if (detectedMode === "lead") return pick(LEAD_RESPONSES);
  if (detectedMode === "listing") return pick(LISTING_RESPONSES);
  if (detectedMode === "roi") return pick(ROI_RESPONSES);
  if (detectedMode === "market") return pick(MARKET_RESPONSES);
  if (detectedMode === "airbnb") return pick(AIRBNB_RESPONSES);

  // Generic helpful follow-up
  return pick(FOLLOWUP_RESPONSES);
}

// Direct analyzer for property search results
export function analyzePropertyResults(city, state, homes) {
  return analyzeProperties(city, state, homes);
}

export function noPropertiesFound(city, state) {
  return noResultsResponse(city, state);
}
