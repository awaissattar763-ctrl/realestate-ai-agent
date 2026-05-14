// Realistic fake property listings — covers multiple US cities
// Structure matches RapidAPI US Real Estate response shape

export const DUMMY_PROPERTIES = [
  // HOUSTON, TX
  {
    list_price: 485000,
    status: "for_sale",
    description: { beds: 4, baths: 3, sqft: 2850, type: "single_family" },
    location: { address: { line: "1247 Oak Park Drive", city: "Houston", state_code: "TX", postal_code: "77024" } },
    _city: "houston", _state: "TX"
  },
  {
    list_price: 325000,
    status: "for_sale",
    description: { beds: 3, baths: 2, sqft: 1980, type: "single_family" },
    location: { address: { line: "8821 Westheimer Rd", city: "Houston", state_code: "TX", postal_code: "77063" } },
    _city: "houston", _state: "TX"
  },
  {
    list_price: 615000,
    status: "for_sale",
    description: { beds: 5, baths: 4, sqft: 3420, type: "single_family" },
    location: { address: { line: "456 River Oaks Blvd", city: "Houston", state_code: "TX", postal_code: "77019" } },
    _city: "houston", _state: "TX"
  },
  {
    list_price: 219000,
    status: "for_sale",
    description: { beds: 2, baths: 2, sqft: 1280, type: "condo" },
    location: { address: { line: "2100 Memorial Dr #408", city: "Houston", state_code: "TX", postal_code: "77007" } },
    _city: "houston", _state: "TX"
  },
  {
    list_price: 749000,
    status: "new",
    description: { beds: 4, baths: 3, sqft: 3100, type: "single_family" },
    location: { address: { line: "5523 Bellaire Ave", city: "Houston", state_code: "TX", postal_code: "77081" } },
    _city: "houston", _state: "TX"
  },
  {
    list_price: 285000,
    status: "for_sale",
    description: { beds: 3, baths: 2, sqft: 1650, type: "townhouse" },
    location: { address: { line: "9180 Katy Freeway", city: "Houston", state_code: "TX", postal_code: "77024" } },
    _city: "houston", _state: "TX"
  },

  // AUSTIN, TX
  {
    list_price: 675000,
    status: "for_sale",
    description: { beds: 3, baths: 2, sqft: 2100, type: "single_family" },
    location: { address: { line: "1820 East 6th Street", city: "Austin", state_code: "TX", postal_code: "78702" } },
    _city: "austin", _state: "TX"
  },
  {
    list_price: 425000,
    status: "for_sale",
    description: { beds: 2, baths: 2, sqft: 1450, type: "condo" },
    location: { address: { line: "501 W 5th St #2401", city: "Austin", state_code: "TX", postal_code: "78701" } },
    _city: "austin", _state: "TX"
  },
  {
    list_price: 895000,
    status: "new",
    description: { beds: 4, baths: 3, sqft: 2780, type: "single_family" },
    location: { address: { line: "3401 South Congress", city: "Austin", state_code: "TX", postal_code: "78704" } },
    _city: "austin", _state: "TX"
  },
  {
    list_price: 549000,
    status: "for_sale",
    description: { beds: 3, baths: 2, sqft: 1900, type: "single_family" },
    location: { address: { line: "7234 Mopac Expressway", city: "Austin", state_code: "TX", postal_code: "78731" } },
    _city: "austin", _state: "TX"
  },

  // DALLAS, TX
  {
    list_price: 395000,
    status: "for_sale",
    description: { beds: 3, baths: 2, sqft: 2050, type: "single_family" },
    location: { address: { line: "6789 Greenville Ave", city: "Dallas", state_code: "TX", postal_code: "75206" } },
    _city: "dallas", _state: "TX"
  },
  {
    list_price: 525000,
    status: "for_sale",
    description: { beds: 4, baths: 3, sqft: 2680, type: "single_family" },
    location: { address: { line: "4521 Highland Park", city: "Dallas", state_code: "TX", postal_code: "75205" } },
    _city: "dallas", _state: "TX"
  },
  {
    list_price: 189000,
    status: "for_sale",
    description: { beds: 2, baths: 1, sqft: 1100, type: "condo" },
    location: { address: { line: "1200 Main St #1502", city: "Dallas", state_code: "TX", postal_code: "75202" } },
    _city: "dallas", _state: "TX"
  },

  // MIAMI, FL
  {
    list_price: 825000,
    status: "for_sale",
    description: { beds: 3, baths: 3, sqft: 1850, type: "condo" },
    location: { address: { line: "1100 Brickell Bay Dr", city: "Miami", state_code: "FL", postal_code: "33131" } },
    _city: "miami", _state: "FL"
  },
  {
    list_price: 1250000,
    status: "for_sale",
    description: { beds: 4, baths: 4, sqft: 2900, type: "single_family" },
    location: { address: { line: "456 Coral Gables Way", city: "Miami", state_code: "FL", postal_code: "33134" } },
    _city: "miami", _state: "FL"
  },
  {
    list_price: 475000,
    status: "for_sale",
    description: { beds: 2, baths: 2, sqft: 1400, type: "condo" },
    location: { address: { line: "1750 N Bayshore Dr", city: "Miami", state_code: "FL", postal_code: "33132" } },
    _city: "miami", _state: "FL"
  },

  // ORLANDO, FL
  {
    list_price: 365000,
    status: "for_sale",
    description: { beds: 4, baths: 2, sqft: 2200, type: "single_family" },
    location: { address: { line: "8901 Lake Nona Blvd", city: "Orlando", state_code: "FL", postal_code: "32827" } },
    _city: "orlando", _state: "FL"
  },
  {
    list_price: 248000,
    status: "for_sale",
    description: { beds: 3, baths: 2, sqft: 1620, type: "townhouse" },
    location: { address: { line: "5500 International Dr", city: "Orlando", state_code: "FL", postal_code: "32819" } },
    _city: "orlando", _state: "FL"
  },

  // LOS ANGELES, CA
  {
    list_price: 1450000,
    status: "for_sale",
    description: { beds: 3, baths: 2, sqft: 1950, type: "single_family" },
    location: { address: { line: "2100 Sunset Blvd", city: "Los Angeles", state_code: "CA", postal_code: "90026" } },
    _city: "los angeles", _state: "CA"
  },
  {
    list_price: 895000,
    status: "for_sale",
    description: { beds: 2, baths: 2, sqft: 1300, type: "condo" },
    location: { address: { line: "10880 Wilshire Blvd #1804", city: "Los Angeles", state_code: "CA", postal_code: "90024" } },
    _city: "los angeles", _state: "CA"
  },
  {
    list_price: 2350000,
    status: "new",
    description: { beds: 5, baths: 4, sqft: 3850, type: "single_family" },
    location: { address: { line: "456 Beverly Glen", city: "Los Angeles", state_code: "CA", postal_code: "90077" } },
    _city: "los angeles", _state: "CA"
  },

  // NEW YORK, NY
  {
    list_price: 1850000,
    status: "for_sale",
    description: { beds: 2, baths: 2, sqft: 1350, type: "condo" },
    location: { address: { line: "150 Charles St #6B", city: "New York", state_code: "NY", postal_code: "10014" } },
    _city: "new york", _state: "NY"
  },
  {
    list_price: 985000,
    status: "for_sale",
    description: { beds: 1, baths: 1, sqft: 780, type: "condo" },
    location: { address: { line: "200 East 65th St #14A", city: "New York", state_code: "NY", postal_code: "10065" } },
    _city: "new york", _state: "NY"
  },

  // CHICAGO, IL
  {
    list_price: 425000,
    status: "for_sale",
    description: { beds: 3, baths: 2, sqft: 1850, type: "condo" },
    location: { address: { line: "401 N Wabash Ave #1502", city: "Chicago", state_code: "IL", postal_code: "60611" } },
    _city: "chicago", _state: "IL"
  },
  {
    list_price: 285000,
    status: "for_sale",
    description: { beds: 2, baths: 2, sqft: 1250, type: "condo" },
    location: { address: { line: "1212 South Michigan Ave", city: "Chicago", state_code: "IL", postal_code: "60605" } },
    _city: "chicago", _state: "IL"
  },

  // PHOENIX, AZ
  {
    list_price: 385000,
    status: "for_sale",
    description: { beds: 4, baths: 3, sqft: 2400, type: "single_family" },
    location: { address: { line: "5500 N Scottsdale Rd", city: "Phoenix", state_code: "AZ", postal_code: "85018" } },
    _city: "phoenix", _state: "AZ"
  },
  {
    list_price: 265000,
    status: "for_sale",
    description: { beds: 3, baths: 2, sqft: 1750, type: "single_family" },
    location: { address: { line: "8800 E Indian School Rd", city: "Phoenix", state_code: "AZ", postal_code: "85251" } },
    _city: "phoenix", _state: "AZ"
  },

  // SEATTLE, WA
  {
    list_price: 875000,
    status: "for_sale",
    description: { beds: 3, baths: 2, sqft: 2100, type: "single_family" },
    location: { address: { line: "2400 Queen Anne Ave N", city: "Seattle", state_code: "WA", postal_code: "98109" } },
    _city: "seattle", _state: "WA"
  },
  {
    list_price: 625000,
    status: "for_sale",
    description: { beds: 2, baths: 2, sqft: 1450, type: "condo" },
    location: { address: { line: "583 Battery St #2802", city: "Seattle", state_code: "WA", postal_code: "98121" } },
    _city: "seattle", _state: "WA"
  },
];

// Search properties matching city + state (case-insensitive)
export function searchDummyProperties(city, state) {
  const c = (city || "").toLowerCase().trim();
  const s = (state || "").toUpperCase().trim();
  const matches = DUMMY_PROPERTIES.filter(p =>
    p._city.includes(c) && (s === "" || p._state === s)
  );
  // Return up to 6 results
  return matches.slice(0, 6);
}
