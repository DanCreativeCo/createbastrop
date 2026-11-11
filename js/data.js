/* ==========================================================================
   Create Bastrop — Authentic Bastrop, TX Cultural Dataset & SVG Art Plates
   ========================================================================== */

window.BASTROP_DATA = (function () {
  const artworkPlates = {
    'cb-01': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Golden Hour Over Red Bluff oil painting">
      <defs>
        <linearGradient id="sky01" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#F3C98B"/>
          <stop offset="55%" stop-color="#E58B5B"/>
          <stop offset="100%" stop-color="#FAF0DF"/>
        </linearGradient>
        <linearGradient id="river01" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#2D5A68"/>
          <stop offset="50%" stop-color="#D99B43"/>
          <stop offset="100%" stop-color="#1E3F4A"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky01)"/>
      <circle cx="285" cy="88" r="38" fill="#FFF3D1" opacity="0.88"/>
      <path d="M0 175 Q95 130 195 162 T400 145 L400 225 L0 225 Z" fill="#A64228"/>
      <path d="M0 192 Q125 168 240 188 T400 178 L400 235 L0 235 Z" fill="#7D2E1B"/>
      <!-- Loblolly silhouettes -->
      <g fill="#1D382B">
        <path d="M52 185 L64 126 L76 185 Z"/>
        <path d="M72 188 L88 110 L104 188 Z"/>
        <path d="M100 190 L112 138 L124 190 Z"/>
        <path d="M318 178 L334 108 L350 178 Z"/>
        <path d="M344 182 L358 124 L372 182 Z"/>
      </g>
      <rect y="218" width="400" height="82" fill="url(#river01)"/>
      <path d="M24 242 H160 M210 255 H355 M90 274 H295" stroke="#FAF6F0" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
    </svg>`,

    'cb-02': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lost Pines Ash & Alluvial Vessel">
      <rect width="400" height="300" fill="#EAE0D0"/>
      <ellipse cx="200" cy="256" rx="86" ry="14" fill="#C9BCAA"/>
      <path d="M156 58 H244 L234 92 C276 125 282 195 248 248 H152 C118 195 124 125 166 92 Z" fill="#8E3B24"/>
      <!-- Natural pine-ash glaze drip -->
      <path d="M156 58 H244 L234 92 C264 116 272 150 264 176 C246 164 236 192 220 175 C204 158 192 198 175 170 C158 144 142 168 134 152 C136 125 146 105 166 92 Z" fill="#5D7B65" opacity="0.88"/>
      <path d="M162 66 H238" stroke="#FAF6F0" stroke-width="3" opacity="0.4" stroke-linecap="round"/>
      <circle cx="222" cy="138" r="5" fill="#DF9F42" opacity="0.7"/>
    </svg>`,

    'cb-03': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Iron Bridge Truss at Dusk linocut print">
      <rect width="400" height="300" fill="#1B2A2F"/>
      <circle cx="96" cy="76" r="28" fill="#E7A94B"/>
      <!-- Parker Through-Truss 1923 Bridge -->
      <g stroke="#FAF6F0" stroke-width="3" fill="none">
        <path d="M24 190 L92 112 L308 112 L376 190"/>
        <line x1="16" y1="190" x2="384" y2="190" stroke="#C85538" stroke-width="5"/>
        <line x1="92" y1="112" x2="92" y2="190"/>
        <line x1="146" y1="112" x2="146" y2="190"/>
        <line x1="200" y1="112" x2="200" y2="190"/>
        <line x1="254" y1="112" x2="254" y2="190"/>
        <line x1="308" y1="112" x2="308" y2="190"/>
        <line x1="92" y1="112" x2="146" y2="190"/>
        <line x1="146" y1="112" x2="200" y2="190"/>
        <line x1="254" y1="190" x2="308" y2="112"/>
        <line x1="200" y1="190" x2="254" y2="112"/>
      </g>
      <g stroke="#7FB3C4" stroke-width="2" opacity="0.75">
        <line x1="40" y1="222" x2="360" y2="222"/>
        <line x1="68" y1="244" x2="332" y2="244"/>
        <line x1="105" y1="266" x2="295" y2="266"/>
      </g>
    </svg>`,

    'cb-04': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Colorado River Blue Heron cast bronze sculpture">
      <rect width="400" height="300" fill="#F2ECE1"/>
      <rect x="135" y="238" width="130" height="24" rx="3" fill="#2A2623"/>
      <!-- Bronze Heron with Verdigris Patina -->
      <path d="M188 238 L194 176 M210 238 L204 176" stroke="#7A542E" stroke-width="4"/>
      <path d="M168 168 C172 130 218 122 234 152 C215 176 184 182 168 168 Z" fill="#6E4B26"/>
      <path d="M180 156 C195 138 220 138 228 152" stroke="#4F8A7B" stroke-width="5" fill="none" opacity="0.75"/>
      <path d="M222 138 C236 108 214 82 226 64 C234 54 252 58 274 62 L240 72 C232 88 248 112 232 146 Z" fill="#8A6033"/>
    </svg>`,

    'cb-05': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Silo Amber & Cobalt Blown Glass Lantern">
      <defs>
        <radialGradient id="glow05" cx="50%" cy="48%" r="48%">
          <stop offset="0%" stop-color="#FFF4C2"/>
          <stop offset="45%" stop-color="#E58F38"/>
          <stop offset="85%" stop-color="#B84A2E"/>
          <stop offset="100%" stop-color="#274938"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="#182620"/>
      <ellipse cx="200" cy="156" rx="84" ry="102" fill="url(#glow05)" opacity="0.92"/>
      <path d="M138 136 Q200 95 262 136 M128 175 Q200 135 272 175 M146 212 Q200 182 254 212" stroke="#FAF6F0" stroke-width="2.5" fill="none" opacity="0.45"/>
      <rect x="172" y="46" width="56" height="16" rx="6" fill="#D99B43"/>
    </svg>`,

    'cb-06': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="After the Complex Fire charred loblolly wall relief">
      <rect width="400" height="300" fill="#EFE8DC"/>
      <rect x="66" y="36" width="268" height="228" rx="6" fill="#23201E"/>
      <!-- Charred Shou Sugi Ban rings & new green shoot -->
      <circle cx="200" cy="150" r="92" stroke="#3D3733" stroke-width="4" fill="none"/>
      <circle cx="200" cy="150" r="68" stroke="#524942" stroke-width="3" fill="none"/>
      <circle cx="200" cy="150" r="44" stroke="#C4872E" stroke-width="2.5" fill="none"/>
      <path d="M200 228 L200 118" stroke="#6C9E7D" stroke-width="4" stroke-linecap="round"/>
      <path d="M200 152 L172 126 M200 142 L230 116 M200 168 L226 146" stroke="#7BB88F" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`,

    'cb-07': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Camino Real Indigo & Pecan-Hull Woven Tapestry">
      <rect width="400" height="300" fill="#F5EFE5"/>
      <line x1="65" y1="34" x2="335" y2="34" stroke="#6E4B26" stroke-width="6" stroke-linecap="round"/>
      <rect x="82" y="37" width="236" height="215" fill="#E8DCC8"/>
      <rect x="82" y="55" width="236" height="38" fill="#233E54"/>
      <polygon points="82,135 141,102 200,135 259,102 318,135 318,175 82,175" fill="#B84A2E"/>
      <rect x="82" y="190" width="236" height="36" fill="#9E6F34"/>
      <g stroke="#C8BBA6" stroke-width="2">
        <line x1="96" y1="252" x2="96" y2="276"/><line x1="126" y1="252" x2="126" y2="276"/>
        <line x1="156" y1="252" x2="156" y2="276"/><line x1="186" y1="252" x2="186" y2="276"/>
        <line x1="216" y1="252" x2="216" y2="276"/><line x1="246" y1="252" x2="246" y2="276"/>
        <line x1="276" y1="252" x2="276" y2="276"/><line x1="306" y1="252" x2="306" y2="276"/>
      </g>
    </svg>`,

    'cb-08': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chromatic Study: Main Street Brick & Yaupon Shade">
      <rect width="400" height="300" fill="#FAF5EC"/>
      <rect x="48" y="38" width="142" height="224" rx="4" fill="#B84A2E"/>
      <rect x="118" y="68" width="154" height="168" rx="4" fill="#E4A33D" opacity="0.9"/>
      <circle cx="268" cy="152" r="76" fill="#274938" opacity="0.92"/>
      <circle cx="235" cy="175" r="38" fill="#2C5B6B"/>
      <path d="M72 218 Q185 140 330 218" stroke="#FAF6F0" stroke-width="4" fill="none"/>
    </svg>`,

    'cb-09': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Morning Mist Below Fisherman's Park tintype photograph">
      <defs>
        <linearGradient id="tin09" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#D8D2C5"/>
          <stop offset="60%" stop-color="#8C8579"/>
          <stop offset="100%" stop-color="#2B2824"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#tin09)"/>
      <rect x="14" y="14" width="372" height="272" fill="none" stroke="#1E1C19" stroke-width="8"/>
      <path d="M18 176 Q110 148 220 172 T382 162 L382 282 L18 282 Z" fill="#3B3731"/>
      <!-- Bald cypress roots & mist -->
      <path d="M88 42 L82 215 L64 242 M92 42 L98 215 L118 242" stroke="#1F1D1A" stroke-width="7" fill="none"/>
      <ellipse cx="215" cy="198" rx="135" ry="18" fill="#EAE4D7" opacity="0.45"/>
      <ellipse cx="185" cy="224" rx="110" ry="12" fill="#EAE4D7" opacity="0.32"/>
    </svg>`
  };

  const landmarks = [
    {
      id: 'lost-pines-art-center',
      pinNumber: 1,
      name: 'Lost Pines Art Center',
      category: 'Galleries & Museums',
      shortTag: 'Visual Arts & Glass Silos',
      address: '1204 Chestnut St, Bastrop, TX 78602',
      hours: 'Wed–Sat 10:00 AM – 5:00 PM · Free Gallery Admission',
      mapX: 455,
      mapY: 112,
      website: 'https://www.lostpinesartcenter.org',
      description: 'Housed in a striking 13,000-square-foot contemporary building anchored by four historic corrugated grain silos, Lost Pines Art Center hosts rotating Texas exhibitions, studio classrooms, and a working glassblowing hotshop.',
      insiderTip: 'Step inside the converted grain silos on Saturdays to watch molten glass gathered and blown live by resident glass artists.',
      color: '#274938'
    },
    {
      id: 'bastrop-opera-house',
      pinNumber: 2,
      name: 'Bastrop Opera House',
      category: 'Performing Arts',
      shortTag: 'Historic 1889 Theater',
      address: '711 Spring St, Bastrop, TX 78602',
      hours: 'Box Office & Show Nights Fri–Sun · Tours by Appointment',
      mapX: 292,
      mapY: 146,
      website: 'https://bastropoperahouse.org',
      description: 'Built in 1889 and listed on the National Register of Historic Places, this intimate two-story Victorian brick theater has anchored Bastrop performing arts for well over a century—from touring vaudeville to contemporary chamber music and repertory theater.',
      insiderTip: 'Arrive 30 minutes before curtain to admire the original pressed-brick masonry and upstairs balcony acoustics.',
      color: '#B84A2E'
    },
    {
      id: 'cor-art-studio',
      pinNumber: 3,
      name: 'COR Art Studio',
      category: 'Working Studios & Classes',
      shortTag: 'Classes, Color Theory & Workshops',
      address: 'Bastrop, TX · Studio Sessions & Private Workshops',
      hours: 'Weekly Classes, Open Studio & Private Creative Events',
      mapX: 378,
      mapY: 185,
      website: 'https://corartstudio.com',
      description: 'Founded by artist and educator Djully Marques, COR Art Studio blends classical artistic foundations and color theory with a calm, welcoming studio environment—helping youth and adults build lasting creative independence.',
      insiderTip: 'Great for beginners and seasoned painters alike—check seasonal schedules for color-mixing labs and small-group studio nights.',
      color: '#C4872E'
    },
    {
      id: 'deep-in-the-heart-foundry',
      pinNumber: 4,
      name: 'Deep in the Heart Art Foundry',
      category: 'Working Studios & Classes',
      shortTag: 'Monumental Bronze Casting',
      address: '107 Foundry Rd, Bastrop, TX 78602',
      hours: 'Mon–Fri Working Foundry · Public Pour Tours Scheduled Monthly',
      mapX: 548,
      mapY: 248,
      website: 'https://deepintheheartartfoundry.com',
      description: 'One of the premier fine-art bronze foundries in the United States right here in Bastrop. Master metal chasers, mold-makers, and patineurs cast monumental public sculptures destined for museums, parks, and capitols nationwide.',
      insiderTip: 'Reserve a spot on a scheduled foundry tour to witness glowing 2,000°F silicon bronze poured into ceramic shell molds.',
      color: '#8C5E1A'
    },
    {
      id: 'bastrop-museum',
      pinNumber: 5,
      name: 'Bastrop Museum & Visitor Center',
      category: 'Galleries & Museums',
      shortTag: '1832 Heritage & Trail Start',
      address: '904 Main St, Bastrop, TX 78602',
      hours: 'Mon–Sat 10:00 AM – 4:00 PM · Sun 1:00 PM – 4:00 PM',
      mapX: 256,
      mapY: 196,
      website: 'https://bastropcountyhistorical.org',
      description: 'Start your Cultural District walk on historic Main Street. Explore artifacts spanning Indigenous Colorado River crossings, El Camino Real de los Tejas, 19th-century loblolly timber mills, and Bastrop’s creative evolution.',
      insiderTip: 'Pick up a printed Downtown Public Art & Historic Architecture walking map at the front desk before strolling Main Street.',
      color: '#2C5B6B'
    },
    {
      id: 'old-iron-bridge',
      pinNumber: 6,
      name: '1923 Old Iron Bridge & Fisherman’s Park',
      category: 'Public Art & Landmarks',
      shortTag: 'River Overlook & Festivals',
      address: 'Water St & Farm St, Overlooking the Colorado River',
      hours: 'Open Daily Dawn – Midnight · Pedestrian & Arts Promenade',
      mapX: 162,
      mapY: 222,
      website: 'https://www.visitbastrop.com',
      description: 'Bastrop’s iconic Parker through-truss steel bridge now serves as a pedestrian promenade suspended above the Colorado River, linking Historic Downtown murals to Fisherman’s Park amphitheater and riverside plein-air easels.',
      insiderTip: 'Walk to the center span 20 minutes before sunset for the finest view of bald cypresses and golden light on the Colorado River.',
      color: '#2C5B6B'
    },
    {
      id: 'bastrop-fine-arts-guild',
      pinNumber: 7,
      name: 'Bastrop Fine Arts Guild & Makers Co-op',
      category: 'Galleries & Museums',
      shortTag: 'Co-op Gallery & Critiques',
      address: 'Downtown Cultural District, Main & Pine St, Bastrop, TX',
      hours: 'Thu–Sun 11:00 AM – 6:00 PM · Open til 9:00 PM First Fridays',
      mapX: 274,
      mapY: 244,
      website: 'https://createbastrop.com/studios.html',
      description: 'Artist-run cooperative exhibition space and critique room celebrating Central Texas painters, printmakers, potters, and fiber artists, with rotating monthly member showcases and open life-drawing evenings.',
      insiderTip: 'Stop by during First Friday Art Walks to meet the exhibiting artists in person over local cider and acoustic guitar.',
      color: '#B84A2E'
    },
    {
      id: 'ccc-lost-pines',
      pinNumber: 8,
      name: 'Bastrop State Park CCC Stoneworks',
      category: 'Public Art & Landmarks',
      shortTag: '1930s National Historic Landmark',
      address: '100 Park Rd 1A, Bastrop, TX 78602',
      hours: 'Daily 6:00 AM – 10:00 PM · Refectory & Overlook Trails',
      mapX: 572,
      mapY: 96,
      website: 'https://tpwd.texas.gov/state-parks/bastrop',
      description: 'Designated a National Historic Landmark, the 1930s Civilian Conservation Corps structures in the Lost Pines feature hand-quarried red ironstone, hand-forged iron hardware, and carved loblolly cedar furniture.',
      insiderTip: 'Inspect the hand-hammered wrought-iron chandeliers and carved red sandstone fireplace inside the historic Refectory.',
      color: '#274938'
    }
  ];

  const artists = [
    {
      id: 'djully-marques',
      name: 'Djully Marques',
      initials: 'DM',
      discipline: 'Painting & Color Theory',
      category: 'Painting',
      neighborhood: 'Bastrop · COR Art Studio',
      studioName: 'COR Art Studio',
      website: 'https://corartstudio.com',
      instagram: 'artbydju',
      commissionsOpen: true,
      bannerColors: ['#B84A2E', '#E4A33D', '#274938'],
      quote: 'Color theory isn’t a set of rigid rules—it’s the language that lets anyone translate how Bastrop light feels onto canvas.',
      shortBio: 'Artist, educator, and co-founder of COR Art Studio, combining classical foundations and structured color study with an encouraging studio community.',
      fullBio: 'Based in Bastrop, Texas, Djully Marques is a painter, educator, and co-founder of COR Art Studio. Blending structured artistic foundations, chromatic harmony, and patient mentorship, she helps beginners and working creatives build genuine skill and lasting creative independence.',
      specialties: ['Chromatic Harmony', 'Acrylic & Oil Foundations', 'Youth & Adult Mentorship'],
      artworkId: 'cb-08'
    },
    {
      id: 'elena-vasquez',
      name: 'Elena Vasquez',
      initials: 'EV',
      discipline: 'Wood-Fired Ceramics & River Clay',
      category: 'Ceramics & Glass',
      neighborhood: 'Chestnut Street Corridor',
      studioName: 'Red Bluff Kilnworks',
      website: '',
      instagram: 'redbluffkiln_tx',
      commissionsOpen: true,
      bannerColors: ['#8E3B24', '#5D7B65', '#D99B43'],
      quote: 'Every vessel carries the mineral memory of Bastrop County—iron-rich river clay kissed by fallen loblolly pine ash.',
      shortBio: 'Harvests wild iron-bearing clay along the Colorado River basin and fires stoneware for 48 hours using reclaimed loblolly pine ash glazes.',
      fullBio: 'For over a decade in Bastrop County, Elena Vasquez has prospected alluvial clays from creek beds feeding the Colorado River. She washes and Sieves local Piney Woods ash to formulate natural celadon and amber glazes that melt organically in communal wood-firings.',
      specialties: ['Anagama Woodfiring', 'Local Pine-Ash Glazes', 'Architectural Tile'],
      artworkId: 'cb-02'
    },
    {
      id: 'caleb-mercer',
      name: 'Caleb Mercer',
      initials: 'CM',
      discipline: 'Lost-Wax Bronze & Patina',
      category: 'Sculpture & Wood',
      neighborhood: 'Foundry District · Hwy 71 East',
      studioName: 'Mercer Bronze & Armature',
      website: '',
      instagram: 'mercerbronze',
      commissionsOpen: true,
      bannerColors: ['#6E4B26', '#4F8A7B', '#23201E'],
      quote: 'Bastrop is one of the great bronze towns in America—you can hear grinders and smell beeswax from dawn till dark.',
      shortBio: 'Master metal chaser and wildlife sculptor casting lost-wax silicon bronze works inspired by Colorado River herons and Central Texas ecology.',
      fullBio: 'Trained in Bastrop’s celebrated bronze-casting community, Caleb Mercer sculpts native Central Texas avian and botanical forms in plastilina before casting them in silicon bronze and layering warm ferric nitrate and cupric verdigris patinas by torch.',
      specialties: ['Lost-Wax Bronze', 'Torch Patination', 'Public Relief Plaques'],
      artworkId: 'cb-04'
    },
    {
      id: 'rosa-delgado',
      name: 'Rosa Delgado',
      initials: 'RD',
      discipline: 'Relief Printmaking & Public Murals',
      category: 'Print & Photography',
      neighborhood: 'Main Street Historic District',
      studioName: 'Camino Real Press',
      website: '',
      instagram: 'caminorealpress',
      commissionsOpen: true,
      bannerColors: ['#1B2A2F', '#C85538', '#E7A94B'],
      quote: 'Carving a linoblock feels just like walking the Old Iron Bridge—every steel strut and shadow line earns its place.',
      shortBio: 'Hand-pulls multi-block linocuts on cotton rag and paints narrative community murals celebrating El Camino Real and Bastrop’s riverfront.',
      fullBio: 'Operating an 1898 Chandler & Price platen press near Main Street, Rosa Delgado documents Bastrop’s historic bridges, Victorian storefronts, and Tejano heritage through bold reduction relief prints and collaborative exterior brick murals.',
      specialties: ['Reduction Linocut', 'Brick Wall Murals', 'Letterpress Broadsides'],
      artworkId: 'cb-03'
    },
    {
      id: 'claire-beaumont',
      name: 'Claire Beaumont',
      initials: 'CB',
      discipline: 'Hand-Blown Silo Glass',
      category: 'Ceramics & Glass',
      neighborhood: 'Chestnut St · Silo Hotshop',
      studioName: 'Loblolly Glassworks',
      website: '',
      instagram: 'loblollyglass',
      commissionsOpen: false,
      bannerColors: ['#182620', '#E58F38', '#B84A2E'],
      quote: 'Blowing molten glass inside a century-old Texas grain silo gives every lantern a pulse of heat and history.',
      shortBio: 'Gathers 2,100°F soda-lime glass inside Bastrop’s converted grain silos to form luminous amber, cobalt, and pine-green vessels.',
      fullBio: 'Claire Beaumont shapes free-blown lighting pendants and sculptural vessels inspired by golden hour filtering through the Lost Pines canopy, regularly demonstrating hot-glass gathering for students and weekend visitors.',
      specialties: ['Free-Blown Vessels', 'optic Mold Lighting', 'Hotshop Demonstrations'],
      artworkId: 'cb-05'
    },
    {
      id: 'marcus-holloway',
      name: 'Marcus Holloway',
      initials: 'MH',
      discipline: 'Reclaimed Loblolly Sculpture',
      category: 'Sculpture & Wood',
      neighborhood: 'Piney Creek & Park Rd 1A',
      studioName: 'Holloway Timber & Form',
      website: '',
      instagram: 'hollowaytimber',
      commissionsOpen: true,
      bannerColors: ['#23201E', '#6C9E7D', '#C4872E'],
      quote: 'The charred rings of Bastrop’s loblolly pines aren’t scars of loss—they’re a testament to how fiercely this forest regenerates.',
      shortBio: 'Transforms wind-felled loblolly pine and 2011 fire-salvaged timber into Shou Sugi Ban wall reliefs and heirloom architectural tables.',
      fullBio: 'Working with sustainably salvaged Bastrop County loblolly pine, post oak, and river pecan, Marcus Holloway pairs Japanese charred-timber preservation with traditional mortise-and-tenon Texas joinery.',
      specialties: ['Shou Sugi Ban Reliefs', 'Salvaged Bastrop Timber', 'Hand-Cut Joinery'],
      artworkId: 'cb-06'
    },
    {
      id: 'hannah-lindholm',
      name: 'Hannah Lindholm',
      initials: 'HL',
      discipline: 'Botanical Dye & Heritage Weaving',
      category: 'Fiber & Plein Air',
      neighborhood: 'Cedar Creek · West Bastrop County',
      studioName: 'Yaupon & Loom Studio',
      website: '',
      instagram: 'yauponandloom',
      commissionsOpen: true,
      bannerColors: ['#233E54', '#B84A2E', '#9E6F34'],
      quote: 'Wild Bastrop pecan hulls, red ironstone clay, and yaupon holly yield colors no synthetic tube could ever imitate.',
      shortBio: 'Forages seasonal Bastrop County botanicals—pecan hulls, marigold, yaupon, and coreopsis—to dye Texas wool and cotton floor-loom tapestries.',
      fullBio: 'On an eight-shaft maple floor loom, Hannah Lindholm weaves geometric tapestries rooted in Central Texas seasonal foraging, hosting community dye-pot afternoons throughout spring and autumn.',
      specialties: ['Foraged Texas Dyes', 'Floor-Loom Tapestry', 'Natural Indigo'],
      artworkId: 'cb-07'
    },
    {
      id: 'travis-mcculloch',
      name: 'Travis McCulloch',
      initials: 'TM',
      discipline: 'Plein Air & Wet-Plate Tintype',
      category: 'Print & Photography',
      neighborhood: 'Water Street & Fisherman’s Park',
      studioName: 'Silver Bend Darkroom',
      website: '',
      instagram: 'silverbend_bastrop',
      commissionsOpen: false,
      bannerColors: ['#3B3731', '#8C8579', '#D8D2C5'],
      quote: 'With wet-plate collodion you have eight minutes before the ether dries—so the Colorado River fog literally develops right beside the water.',
      shortBio: 'Operates a portable darkroom wagon along the Colorado River banks, capturing Bastrop’s bald cypresses and musicians on hand-poured aluminum tintypes.',
      fullBio: 'Combining 1850s wet-plate collodion chemistry with plein-air oil studies, Travis McCulloch documents the timeless bend of the Colorado River through Downtown Bastrop.',
      specialties: ['Wet-Plate Collodion', 'Portable River Darkroom', 'Plein Air Oil Studies'],
      artworkId: 'cb-09'
    }
  ];

  const artworks = [
    {
      id: 'cb-01',
      catalogNo: 'CB-2026-01',
      title: 'Golden Hour Over Red Bluff',
      artistId: 'djully-marques',
      artistName: 'Djully Marques',
      medium: 'Painting',
      materials: 'Oil & cold wax medium on cradled birch panel',
      dimensions: '30 × 40 in',
      year: 2026,
      price: '$1,450',
      priceValue: 1450,
      availability: 'Available',
      locationNote: 'COR Art Studio Viewing Wall',
      palette: ['#E58B5B', '#A64228', '#1D382B', '#2D5A68'],
      excerpt: 'Warm ironstone bluffs and loblolly pine crowns reflected in the slow late-October bend of the Colorado River.',
      story: 'Painted across three consecutive October dusks overlooking the Colorado River, this piece explores warm-cool chromatic vibration between iron-oxide terracotta bluffs and deep teal river shadows.'
    },
    {
      id: 'cb-08',
      catalogNo: 'CB-2026-02',
      title: 'Chromatic Study: Main Street Brick & Yaupon',
      artistId: 'djully-marques',
      artistName: 'Djully Marques',
      medium: 'Painting',
      materials: 'Heavy-body acrylic & raw pigment on Belgian linen',
      dimensions: '24 × 32 in',
      year: 2026,
      price: '$980',
      priceValue: 980,
      availability: 'Available',
      locationNote: 'COR Art Studio',
      palette: ['#B84A2E', '#E4A33D', '#274938', '#2C5B6B'],
      excerpt: 'Architectural color study distilling 1890s Main Street brick storefronts, brass signage, and yaupon shade into balanced geometric planes.',
      story: 'Created as a signature demonstration piece on color temperature and proportion, inspired by midday sun striking historic masonry along Downtown Bastrop.'
    },
    {
      id: 'cb-02',
      catalogNo: 'CB-2026-03',
      title: 'Lost Pines Ash & Alluvial Vessel',
      artistId: 'elena-vasquez',
      artistName: 'Elena Vasquez',
      medium: 'Ceramics & Glass',
      materials: 'Wheel-thrown Bastrop river clay, loblolly pine ash glaze',
      dimensions: '16 × 11 × 11 in',
      year: 2026,
      price: '$640',
      priceValue: 640,
      availability: 'Available',
      locationNote: 'Chestnut St Kiln Showroom',
      palette: ['#8E3B24', '#5D7B65', '#DF9F42', '#EAE0D0'],
      excerpt: 'Wood-fired for 48 hours until drifted loblolly pine ash fused naturally into mossy celadon rivulets over iron-rich clay.',
      story: 'Dug from a private creek bank four miles south of Bastrop and fired in a communal wood kiln tended around the clock by local potters.'
    },
    {
      id: 'cb-03',
      catalogNo: 'CB-2026-04',
      title: '1923 Iron Bridge Truss at Dusk',
      artistId: 'rosa-delgado',
      artistName: 'Rosa Delgado',
      medium: 'Print & Photography',
      materials: 'Three-block reduction linocut on 300gsm cotton rag (Ed. of 25)',
      dimensions: '18 × 24 in',
      year: 2026,
      price: '$320',
      priceValue: 320,
      availability: 'Available',
      locationNote: 'Bastrop Fine Arts Guild',
      palette: ['#1B2A2F', '#C85538', '#E7A94B', '#7FB3C4'],
      excerpt: 'Crisp hand-carved geometry honoring Bastrop’s iconic 1923 Parker through-truss bridge spanning the Colorado River.',
      story: 'Pulled by hand on an 1898 platen press, celebrating the historic pedestrian span that connects Downtown Bastrop’s arts corridor with riverside trails.'
    },
    {
      id: 'cb-04',
      catalogNo: 'CB-2026-05',
      title: 'Colorado Bend Great Blue Heron',
      artistId: 'caleb-mercer',
      artistName: 'Caleb Mercer',
      medium: 'Sculpture & Wood',
      materials: 'Cast silicon bronze with torch-applied verdigris patina on walnut',
      dimensions: '21 × 12 × 9 in',
      year: 2026,
      price: '$2,400',
      priceValue: 2400,
      availability: 'On View in District',
      locationNote: 'On View · Lost Pines Art Center Atrium',
      palette: ['#6E4B26', '#4F8A7B', '#8A6033', '#2A2623'],
      excerpt: 'Lost-wax bronze sculpture cast in Bastrop, capturing the poised stillness of a great blue heron wading below Fisherman’s Park.',
      story: 'Poured in molten bronze using a 12-step ceramic shell investment process and hand-chased before receiving a warm ferric and copper-nitrate patina.'
    },
    {
      id: 'cb-05',
      catalogNo: 'CB-2026-06',
      title: 'Silo Amber & Pine Blown Vessel',
      artistId: 'claire-beaumont',
      artistName: 'Claire Beaumont',
      medium: 'Ceramics & Glass',
      materials: 'Free-blown soda-lime glass with silver-foil inclusions',
      dimensions: '14 × 9 × 9 in',
      year: 2026,
      price: '$520',
      priceValue: 520,
      availability: 'Available',
      locationNote: 'Lost Pines Silo Glass Studio',
      palette: ['#E58F38', '#B84A2E', '#274938', '#FFF4C2'],
      excerpt: 'Hand-blown inside one of Bastrop’s historic grain silos, glowing with layered amber resin tones and forest-green wraps.',
      story: 'Rolled across marvered silver leaf while at 2,000°F so light refracts like late-afternoon sun piercing loblolly needles.'
    },
    {
      id: 'cb-06',
      catalogNo: 'CB-2026-07',
      title: 'Succession Rings (After the Fire)',
      artistId: 'marcus-holloway',
      artistName: 'Marcus Holloway',
      medium: 'Sculpture & Wood',
      materials: 'Shou Sugi Ban salvaged Bastrop loblolly pine & oxidized brass',
      dimensions: '36 × 36 × 3 in',
      year: 2025,
      price: '$1,850',
      priceValue: 1850,
      availability: 'On View in District',
      locationNote: 'On View · Bastrop Visitor & Cultural Center',
      palette: ['#23201E', '#6C9E7D', '#C4872E', '#524942'],
      excerpt: 'Carved and flame-preserved loblolly growth rings inlaid with oxidized brass, honoring the rebirth of the Lost Pines forest.',
      story: 'Crafted from a wind-fallen timber salvaged near Park Road 1A, celebrating fifteen years of ecological resilience and community renewal.'
    },
    {
      id: 'cb-07',
      catalogNo: 'CB-2026-08',
      title: 'El Camino Real Crossing Tapestry',
      artistId: 'hannah-lindholm',
      artistName: 'Hannah Lindholm',
      medium: 'Fiber & Textile',
      materials: 'Texas Rambouillet wool dyed with Bastrop pecan hulls, indigo & red clay',
      dimensions: '42 × 28 in',
      year: 2026,
      price: '$790',
      priceValue: 790,
      availability: 'Available',
      locationNote: 'Yaupon & Loom Studio',
      palette: ['#233E54', '#B84A2E', '#9E6F34', '#E8DCC8'],
      excerpt: 'Hand-loomed wool tapestry colored entirely with botanical and mineral pigments foraged within ten miles of Downtown Bastrop.',
      story: 'Mounted on a hand-rubbed Bastrop pecan branch; each horizontal band maps the strata of river water, red bluff earth, and autumn orchard.'
    },
    {
      id: 'cb-09',
      catalogNo: 'CB-2026-09',
      title: 'Dawn Fog Below Fisherman’s Park',
      artistId: 'travis-mcculloch',
      artistName: 'Travis McCulloch',
      medium: 'Print & Photography',
      materials: 'Unique hand-poured wet-plate collodion tintype in blackened oak frame',
      dimensions: '8 × 10 in plate (13 × 15 in framed)',
      year: 2026,
      price: '$460',
      priceValue: 460,
      availability: 'Available',
      locationNote: 'Water Street Darkroom',
      palette: ['#3B3731', '#8C8579', '#D8D2C5', '#1E1C19'],
      excerpt: 'One-of-a-kind silver collodion tintype exposed for six seconds at sunrise beside ancient bald cypress roots on the Colorado River.',
      story: 'Sensitized and developed on-site inside a portable darkroom tent minutes after first light rose over the river bend.'
    }
  ];

  const events = [
    {
      id: 'silo-glass-nov-2026',
      title: 'Silo Hotshop Live Glassblowing & Gallery Afternoon',
      category: 'Exhibition & Tour',
      monthShort: 'NOV',
      dayNum: '14',
      dow: 'Sat',
      isoStart: '20261114T130000',
      isoEnd: '20261114T163000',
      timeLabel: '1:00 PM – 4:30 PM',
      venue: 'Lost Pines Art Center · 1204 Chestnut St',
      cost: 'Free Admission',
      isFree: true,
      description: 'Watch resident glassmakers gather and shape molten glass inside Bastrop’s converted historic grain silos, then tour two floors of Central Texas exhibitions.'
    },
    {
      id: 'cor-color-lab-nov-2026',
      title: 'Color Theory & Expressive Painting Workshop',
      category: 'Workshop',
      monthShort: 'NOV',
      dayNum: '21',
      dow: 'Sat',
      isoStart: '20261121T100000',
      isoEnd: '20261121T130000',
      timeLabel: '10:00 AM – 1:00 PM',
      venue: 'COR Art Studio · Bastrop, TX',
      cost: '$65 · All Materials Included',
      isFree: false,
      description: 'Led by Djully Marques. Master warm-cool palettes inspired by Bastrop’s limestone, brick, and Lost Pines light in an encouraging small-group studio session.'
    },
    {
      id: 'first-friday-dec-2026',
      title: 'First Friday Holiday Art Walk on Main Street',
      category: 'Art Walk',
      monthShort: 'DEC',
      dayNum: '04',
      dow: 'Fri',
      isoStart: '20261204T173000',
      isoEnd: '20261204T210000',
      timeLabel: '5:30 PM – 9:00 PM',
      venue: 'Historic Main Street & Water Street District',
      cost: 'Free & Open to All',
      isFree: true,
      description: 'Twenty-plus Bastrop artists, open gallery doors, live acoustic Texas roots music on street corners, printmaking demos, and warm spiced cider along Main Street.'
    },
    {
      id: 'opera-house-candlelight-dec-2026',
      title: '1889 Victorian Stage: Winter Strings & Storytellers',
      category: 'Live Stage & Music',
      monthShort: 'DEC',
      dayNum: '11',
      dow: 'Fri',
      isoStart: '20261211T193000',
      isoEnd: '20261211T213000',
      timeLabel: '7:30 PM – 9:30 PM',
      venue: 'Bastrop Opera House · 711 Spring St',
      cost: '$24 General · $18 Students/Seniors',
      isFree: false,
      description: 'Experience chamber Americana, cello-and-fiddle arrangements, and Bastrop oral storytelling inside one of Texas’s oldest continuously loved 19th-century opera houses.'
    },
    {
      id: 'river-of-lights-makers-dec-2026',
      title: 'Lost Pines River of Lights & Artisans Night Market',
      category: 'Art Walk',
      monthShort: 'DEC',
      dayNum: '12',
      dow: 'Sat',
      isoStart: '20261212T170000',
      isoEnd: '20261212T210000',
      timeLabel: '5:00 PM – 9:00 PM',
      venue: 'Fisherman’s Park & June Hill Pape River Walk',
      cost: 'Free Admission',
      isFree: true,
      description: 'Stroll over a hundred illuminated holiday displays along the Colorado River paired with ceramics, hand-pulled prints, and woodwork booths from Bastrop makers.'
    },
    {
      id: 'river-open-mic-jan-2027',
      title: 'Colorado Bend Songwriters & Poetry Open Mic',
      category: 'Live Stage & Music',
      monthShort: 'JAN',
      dayNum: '02',
      dow: 'Sat',
      isoStart: '20270102T190000',
      isoEnd: '20270102T220000',
      timeLabel: '7:00 PM – 10:00 PM',
      venue: 'Neighbor’s River Deck · 601 Chestnut St',
      cost: 'Free · Sign-Up at 6:30 PM',
      isFree: true,
      description: 'Poets, lyricists, acoustic pickers, and storytellers gather overlooking the Colorado River. Original Bastrop voices and newcomers warmly welcomed.'
    },
    {
      id: 'foundry-bronze-pour-jan-2027',
      title: 'Molten Bronze: Lost-Wax Foundry Tour & Live Pour',
      category: 'Exhibition & Tour',
      monthShort: 'JAN',
      dayNum: '16',
      dow: 'Sat',
      isoStart: '20270116T103000',
      isoEnd: '20270116T120000',
      timeLabel: '10:30 AM – 12:00 PM',
      venue: 'Deep in the Heart Art Foundry · 107 Foundry Rd',
      cost: '$15 Tour Reservation',
      isFree: false,
      description: 'Go behind the scenes of Bastrop’s monumental bronze foundry—from clay enlargement and rubber molds to glowing 2,000°F bronze pours and torch patination.'
    },
    {
      id: 'foraged-pigments-feb-2027',
      title: 'Foraged Bastrop Pigments: Pecan, Clay & Indigo Lab',
      category: 'Workshop',
      monthShort: 'FEB',
      dayNum: '06',
      dow: 'Sat',
      isoStart: '20270206T130000',
      isoEnd: '20270206T160000',
      timeLabel: '1:00 PM – 4:00 PM',
      venue: 'Bastrop Fine Arts Guild Studio · Downtown',
      cost: '$48 · Includes Cotton & Linen Skeins',
      isFree: false,
      description: 'Extract rich earth and botanical dyes from fallen Bastrop pecan hulls, red bluff clay, and organic indigo vats with fiber artist Hannah Lindholm.'
    }
  ];

  function getArtworkPlate(id) {
    return artworkPlates[id] || artworkPlates['cb-01'];
  }

  function getArtistBanner(colors) {
    const [c1, c2, c3] = colors || ['#1D382B', '#B84A2E', '#D99B43'];
    return `<svg viewBox="0 0 400 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="400" height="150" fill="${c1}"/>
      <circle cx="325" cy="40" r="68" fill="${c2}" opacity="0.82"/>
      <path d="M0 112 Q130 62 255 110 T400 90 L400 150 L0 150 Z" fill="${c3}" opacity="0.72"/>
      <path d="M0 132 Q160 98 310 132 T400 122 L400 150 L0 150 Z" fill="#171513" opacity="0.22"/>
    </svg>`;
  }

  function getStudioVisual(spot) {
    const accent = spot.color || '#274938';
    return `<svg viewBox="0 0 500 185" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="500" height="185" fill="#EFE7DA"/>
      <circle cx="410" cy="54" r="34" fill="#E7A94B" opacity="0.65"/>
      <path d="M0 135 Q130 92 275 128 T500 108 L500 185 L0 185 Z" fill="${accent}" opacity="0.88"/>
      <!-- Architectural Bastrop motif -->
      <g fill="#FAF6F0" opacity="0.9">
        <rect x="64" y="76" width="32" height="68" rx="3"/>
        <rect x="102" y="64" width="32" height="80" rx="3"/>
        <polygon points="154,144 154,88 186,68 218,88 218,144"/>
      </g>
      <path d="M245 144 Q330 102 415 144" fill="none" stroke="#FAF6F0" stroke-width="3"/>
      <line x1="235" y1="144" x2="425" y2="144" stroke="#B84A2E" stroke-width="3.5"/>
    </svg>`;
  }

  return {
    landmarks,
    artists,
    artworks,
    events,
    getArtworkPlate,
    getArtistBanner,
    getStudioVisual
  };
})();
