/*
 * Nuflow Info: document and video library.
 * Source of truth: the "Nuflow Info Page: Document & Video Register" Claude Doc
 * (https://claude.ai/artifact/ThPvuon5TLQwXfUcSHFGzZ). Edit the register, then sync it here.
 *
 * Every file here is a Google Drive PDF shared as "Anyone with the link can view".
 * To add a document: copy its Drive file ID (the part after /file/d/ in the share link)
 * into a new entry. Use the ORIGINAL file, not a Drive shortcut: shortcuts do not open
 * for the public.
 *
 * Sector keys: residential, facility, infrastructure, mining
 * mb = file size in megabytes (shown on the download button)
 */
window.NUFLOW_RESOURCES = {
  sectors: {
    residential:    'Residential & Strata',
    facility:       'Facility Management',
    infrastructure: 'Infrastructure',
    mining:         'Mining & Industrial'
  },

  /* No Mining & Industrial booklet until the final version is ready. */
  booklets: [
    { sector: 'residential',    title: 'Residential & Strata booklet', id: '1Sk5OUg75IdHHK7FyyXcLATY_5P9W-Hq7', mb: 21 },
    { sector: 'facility',       title: 'Facility Management booklet',  id: '1jJ7z1Y5Yn8VOdjoAV1tNOtVJJqIa1Ub1', mb: 78 },
    { sector: 'infrastructure', title: 'Infrastructure booklet',       id: '1Bhih74QHS3oTikuVSHpjLKcNOe412neW', mb: 83 }
  ],

  /* Technical data sheets, grouped on the page by system. sectors = where the sheet is listed. */
  tds: [
    { system: 'Blueline',     title: 'Blueline Standard',      id: '1BqRI7Qa_129bxr-S965BuGOqH3KKqjux', mb: 2.3, sectors: ['residential', 'facility', 'infrastructure'] },
    { system: 'Blueline',     title: 'Blueline X',             id: '15a7SDBaHbOHvgn7vue63I3-BlkuVIgHu', mb: 2.7, sectors: ['residential', 'facility', 'infrastructure', 'mining'] },
    { system: 'Blueline',     title: 'Blueline XS Small Bore', id: '1oWzMkIWO_-VX9VSYfdStD0UVYuO6Ul6R', mb: 2.5, sectors: ['residential', 'facility'] },
    { system: 'Blueline',     title: 'Blueline HTAR',          id: '1IdiVYwSXzvw937yxGiHXu9uuM4keyX7S', mb: 2.2, sectors: ['facility', 'infrastructure', 'mining'] },
    { system: 'Sumoline',     title: 'Sumoline X',             id: '1TBRzh0YqxZ0aJ7FEgcmr37-ipSHGTN6D', mb: 2.0, sectors: ['infrastructure', 'mining'] },
    { system: 'Sumoline',     title: 'Sumoline XL',            id: '1q43dD83Hhdf88j6stTBlR33A6zM-ncDq', mb: 2.0, sectors: ['infrastructure', 'mining'] },
    { system: 'Sumoline',     title: 'Sumoline XXL',           id: '1vDxo6G6IgdnT8jDDLu2hSlYbcnJc0S-N', mb: 2.0, sectors: ['infrastructure', 'mining'] },
    { system: 'Pressureline', title: 'Pressureline X',         id: '1e-H9ETTrkVXLmiavpu0UcLdgHozLSOd0', mb: 2.2, sectors: ['residential', 'facility', 'infrastructure', 'mining'] },
    { system: 'Pressureline', title: 'Pressureline XL',        id: '1IMuNVu0vrfdUGKXuTp2zleg3TvSUkgv-', mb: 2.2, sectors: ['residential', 'facility', 'infrastructure', 'mining'] },
    { system: 'Pressureline', title: 'Pressureline XXL',       id: '1ZHOnmhb44gEOuUHVJEXjXAtRRhuRSNqC', mb: 2.2, sectors: ['facility', 'infrastructure', 'mining'] },
    { system: 'Pressureline', title: 'ASOE Pipe-in Liner W',   id: '15kvpdhECP5lG-0xcZ8VcYTlA6kt00IvD', mb: 2.0, sectors: ['infrastructure', 'mining'] },
    { system: 'Pressureline', title: 'IBG16 HydroTech',        id: '1Vey88Gkz51yo4Ivx8O-NypAYP2PHOVn0', mb: 1.6, sectors: ['infrastructure', 'mining'] },
    { system: 'NUVLINE',      title: 'NUVLINE GL16',           id: '1-qKXDg2zpT7v97IYDxa1YZ93Ok6Nkmdb', mb: 3.2, sectors: ['facility', 'infrastructure', 'mining'] },
    { system: 'Redline',      title: 'Redline',                id: '1ZxsxtCKIuL0Mt06wu2T5Fi7ZhlOtv3AE', mb: 2.8, sectors: ['residential', 'facility'] },
    { system: 'Nucoat',       title: 'Nucoat',                 id: '1stcCf3DDebZ6t2y_qIQxsYyK6BFTI-0U', mb: 3.7, sectors: ['residential', 'facility', 'infrastructure', 'mining'] },
    { system: 'Inspection',   title: 'Pipa Flowrider',         id: '1K2mZx3lTXmh-MHX07tKuPmdu_UhFiQuZ', mb: 0.9, sectors: ['facility', 'infrastructure'] },
    { system: 'Inspection',   title: 'Pipa Flowrider Lite',    id: '1cnLZkVxF5mOevBUgO3vta9IzJB7KNrUJ', mb: 0.6, sectors: ['facility', 'infrastructure'] }
  ],

  /* Case study PDFs. system = the technology used (shown as a tag on the card). */
  cases: [
    { system: 'Blueline',     title: 'Residential development, Flowwise',                    id: '1xqtdVi5_mpPu_lVGDaLEQojmyCX-mCWL', mb: 1.1, sectors: ['infrastructure'] },
    { system: 'Blueline',     title: 'Crown Towers, Gold Coast',                             id: '1JjXUl78BYGgsoMfT6WKM0HDrXbB3iUhH', mb: 0.4, sectors: ['residential', 'facility'] },
    { system: 'Blueline',     title: 'The Belgrave, Nuflow St George',                       id: '1smM48XD66qa-Fp4I45WWJbAZVtb02pPN', mb: 1.0, sectors: ['residential', 'facility'] },
    { system: 'Blueline',     title: 'Water feature, 24Seven Plumbing',                      id: '1jCWrzDSPcQ2pjOKL2L0J5FGJU0frwNoB', mb: 1.9, sectors: ['residential', 'facility'] },
    { system: 'Blueline',     title: 'RACV Royal Pines, Gold Coast',                         id: '1DYy9BZuob5Lwlo5WChfWikHpOuSrGv34', mb: 1.4, sectors: ['facility'] },
    { system: 'Blueline',     title: 'Government site, Darwin',                              id: '1Yeuj33_bjmfMwuhHM2BPszu2D9HlzijZ', mb: 1.7, sectors: ['facility', 'infrastructure'] },
    { system: 'Blueline',     title: 'Great Lakes Aquatic and Leisure Centre',               id: '1b4cQSNAUaepGbBuYzpuCInMVMmyGbEHu', mb: 0.4, sectors: ['facility'] },
    { system: 'Blueline',     title: 'Pipeline cracks sealed at Taronga Zoo',                id: '1Gdz1Ayiroxk9alDwMZk9RlNM97Wr79Kk', mb: 6.8, sectors: ['facility'] },
    { system: 'Blueline',     title: 'Super yacht plumbing, Nuflow North Harbour',           id: '1bLoykvzf-YqWdXQ1vNWJjclyy0SKEl8U', mb: 1.2, sectors: ['facility'] },
    { system: 'Blueline',     title: 'Stormwater relining after a yeast spill',              id: '1Re8GOx-wDUIrOE7PTiN4n_oeSP425YCr', mb: 4.4, sectors: ['facility', 'mining'] },
    { system: 'Blueline',     title: 'Fonterra (Blueline HTAR)',                             id: '1zd2KJfADTJoMqQaqFprkXOUH_HIfdN49', mb: 2.2, sectors: ['facility', 'mining'] },
    { system: 'Blueline',     title: 'Callide Dam',                                          id: '1m5V1Z-bTP1Z1rPswwZG9h3wPGVr-IIQs', mb: 3.0, sectors: ['infrastructure', 'mining'] },
    { system: 'Blueline',     title: 'Underwater pipe relining, Nuflow Central Queensland',  id: '1ypER8yiFytpNKtn9qM1gtpOkVPRCrTTC', mb: 1.2, sectors: ['infrastructure'] },
    { system: 'Redline',      title: 'Old Parliament House',                                 id: '1K8PLJIIfb6eFW2TszF67j3BKdbKP705M', mb: 0.6, sectors: ['facility'] },
    { system: 'Redline',      title: 'AMP building',                                         id: '16VmKn2rAkglLai0pAuLVzUxRPZOIQa1s', mb: 1.6, sectors: ['facility'] },
    { system: 'Redline',      title: 'Cairns Central Shopping Centre',                       id: '1oG8mNPu1UgyCm_SEf1ENK5zKf3LMcwK9', mb: 1.0, sectors: ['facility'] },
    { system: 'Redline',      title: 'Atlas Copco',                                          id: '1vfS0hUxi9fXcDgaaIm4qenfQjq_uKHuH', mb: 2.1, sectors: ['facility', 'mining'] },
    { system: 'Pressureline', title: 'DN150 rising main, Dawson Highway, Biloela',           id: '1obgUfwpSLSs6w6KGS6kgnssbXuBsQc8_', mb: 1.8, sectors: ['infrastructure'] },
    { system: 'Pressureline', title: 'Canberra water reservoir',                             id: '1r28cpH04obTh_zKuHN92Q9WOAB-0EBWo', mb: 4.7, sectors: ['infrastructure'] },
    { system: 'Pressureline', title: 'Metro Trains, South West Melbourne',                   id: '1wow_LgDr5i_boktHrrOmpSpt0pC4d4H9', mb: 1.8, sectors: ['facility', 'infrastructure', 'mining'] },
    { system: 'ASOE',         title: 'Borlasses Road',                                       id: '1gv6ycbx9rrR8CP4V53-8W4AraAknof3k', mb: 3.7, sectors: ['infrastructure'] },
    { system: 'IBG',          title: 'IBB16 case studies',                                   id: '1Agdu3gDiKy0-cPLypRfIdPgjO8nUwoLo', mb: 9.0, sectors: ['infrastructure'] },
    { system: 'Sumoline',     title: 'Arch culvert pipes, Fremantle',                        id: '1tZehm4eREXWCATrtLpIjpIKYi1JgmBWR', mb: 5.8, sectors: ['infrastructure'] },
    { system: 'Sumoline',     title: 'Portland bore line',                                   id: '1R8S3H3Gp0vXiZTEqqXIpgoID6akSBDB-', mb: 4.2, sectors: ['facility', 'infrastructure', 'mining'] },
    { system: 'Sumoline',     title: 'From cracked to intact',                               id: '1JtEzlPWlgSuJWTB7l2MJiIETzcP1Flc3', mb: 5.1, sectors: ['infrastructure'] },
    { system: 'Sumoline',     title: 'Barangaroo',                                           id: '1fKXzTqIEQcNapNOyCkezTs5jOg-jpG9j', mb: 3.4, sectors: ['facility', 'infrastructure', 'mining'] },
    { system: 'Sumoline',     title: 'Stormwater repair for a major exporter, Nuflow Tasman', id: '1wVvDdsx6tWjNA2qViL6OSY47ipUndz-5', mb: 4.5, sectors: ['infrastructure', 'mining'] },
    { system: 'Sumoline',     title: 'Offshore vertical liner installation',                 id: '1-YnuZtIXLMzzfftgZR4t4BFwuJmGJ5om', mb: 1.8, sectors: ['mining'] },
    { system: 'Nucoat',       title: 'Manhole rehabilitation, Nuflow Tasman',                id: '1W44yQO5kBOTdXJ_wt8On_2j4_2wlwVWR', mb: 1.8, sectors: ['infrastructure'] },
    { system: 'Nucoat',       title: 'Corroded pipes at a tanker terminal, Nuflow Manawatu', id: '1omtrEYr_W0pXkthIbn24XZ1M5Y1Dgc-8', mb: 4.4, sectors: ['facility', 'mining'] }
  ],

  /* Videos. YouTube: yt = the ID after watch?v= (or after youtu.be/).
     Vimeo: vimeo = the number in the link; h = the extra code after it in private links;
     thumb = the preview image (Claude looks this up when syncing). */
  videos: [
    { system: 'Blueline',     title: 'Hilton Garden Inn, Nuflow Darwin',            yt: 'Km2o90WhxAA', sectors: ['facility'] },
    { system: 'NUVLINE',      title: 'Bridge Street ovoid brick stormwater barrel', yt: 'duw1th2c4N4', sectors: ['infrastructure'] },
    { system: 'Pressureline', title: 'DN750 rising main, Woongara Pump Station',    yt: 'jkd2DmnZzpY', sectors: ['infrastructure'] },
    { system: 'Redline',      title: 'Nuflow Redline Product Installation Demo',    yt: 'oNGFZ2_0FOg', sectors: ['residential', 'facility'] },
    { system: 'Pressureline', title: 'DN150 Watermain - Ayr, QLD',                  vimeo: '375833767',  h: '9386282547', thumb: 'https://i.vimeocdn.com/video/834724675-b5bafd2667159fa27b831fb58eff2b564758174b57bc48af499e3abf09336a53-d_640', sectors: ['infrastructure'] },
    { system: 'Redline',      title: 'Redline Coating close-up video',              vimeo: '1136340080', thumb: 'https://i.vimeocdn.com/video/2081987330-0df1b90322513bd9c47a4a0d071c09ba61f3956bf840037aaba8991ed1ef4b3e-d_640', sectors: ['residential', 'facility'] },
    { system: 'Sumoline',     title: 'Sumo Liner Pull in Place Demo',               vimeo: '944301806',  h: '293070afe5', thumb: 'https://i.vimeocdn.com/video/1849113707-cefb93d609a6d8fe10cc449e390697ceb974b725dd5b3faca7e648d4fc867fdb-d_640', sectors: ['infrastructure'] },
    { system: 'NUVLINE',      title: 'DN600, Milricks Line, Palmerston North',      yt: 'XkucA-RuWTc', sectors: ['infrastructure'] },
    { system: 'Blueline',     title: 'DN225 Stormwater Drain',                      yt: 'Bn87sor9_EQ', sectors: ['residential', 'infrastructure'] },
    { system: 'Pressureline', title: 'ASOE Product Installation',                   vimeo: '1039856593', h: 'e997e94ffa', thumb: 'https://i.vimeocdn.com/video/1962315480-6c93ecd90bd57e762908dbfd77f96af068bfa03e39ec6606b71b2369ef760011-d_640', sectors: ['facility', 'infrastructure'] },
    { system: 'NUVLINE',      title: 'DN2000 Impreg UV Installation',               vimeo: '1033658856', h: 'd64b4eca3c', thumb: 'https://i.vimeocdn.com/video/1954821194-d00d9f87de3886a418f627faaff4d93226df405e3dc68e3faefa1caeadd86728-d_640', sectors: ['infrastructure'] },
    { system: 'NUVLINE',      title: 'DN225 Stormwater, Arrow St, Nelson',          vimeo: '1101759690', thumb: 'https://i.vimeocdn.com/video/2037323427-5b3a16e0a6c6f7ee17276d7d340aaaa8fa91d46c1df7c564d55723e5e8fcb486-d_640', sectors: ['infrastructure'] }
  ],

  /* Installation photos shown in each sector's carousel. Files live in assets/img/gallery/<sector>/ as WebP
     (the originals stay in assets/img/Installs/, which git ignores);
     src is relative to the assets folder. A sector with no photos shows no carousel.
     { src: 'img/gallery/residential/blueline-site-install.webp', title: 'Stack relining', subtitle: 'Sydney', alt: 'What the photo shows' } */
  installs: {
    residential: [
      { src: 'img/gallery/residential/blueline-install-side-of-house.webp', title: 'Install at the side of a house', subtitle: 'Blueline', alt: 'Two Nuflow installers feeding a liner into a pipe beside a brick house' },
      { src: 'img/gallery/residential/blueline-site-install.webp', title: 'Site install', subtitle: 'Blueline', alt: 'Nuflow van and installers set up outside a weatherboard home' },
      { src: 'img/gallery/residential/blueline-pouring-epoxy.webp', title: 'Pouring epoxy into the liner', subtitle: 'Blueline', alt: 'Installers pouring blue epoxy resin into a liner bag on site' },
      { src: 'img/gallery/residential/blueline-inserting-liner-io.webp', title: 'Inserting the liner at the inspection opening', subtitle: 'Blueline', alt: 'Installer feeding a blue liner into a pipe inspection opening at ground level' },
      { src: 'img/gallery/residential/blueline-before-pvc-collapsed.webp', title: 'Before: PVC with a collapsed section', subtitle: 'Blueline', alt: 'CCTV view inside a PVC pipe with a collapsed section' },
      { src: 'img/gallery/residential/blueline-after-pvc-collapsed-sealed.webp', title: 'After: collapsed section sealed', subtitle: 'Blueline', alt: 'CCTV view of the same pipe relined in blue with the collapse sealed over' },
      { src: 'img/gallery/residential/blueline-relined-small-displacement.webp', title: 'Relined over a small displacement', subtitle: 'Blueline', alt: 'CCTV view of a blue relined pipe running smoothly over a displaced joint' },
      { src: 'img/gallery/residential/blueline-floor-waste.webp', title: 'Floor waste relined', subtitle: 'Blueline', alt: 'Floor waste outlet relined with a blue liner' },
      { src: 'img/gallery/residential/redline-copper-pipe-relined.webp', title: 'Copper pipe relined with epoxy', subtitle: 'Redline', alt: 'Copper water pipe in the ground showing a red epoxy lining inside' },
      { src: 'img/gallery/residential/redline-small-diameter-copper.webp', title: 'Small-diameter copper relined with epoxy', subtitle: 'Redline', alt: 'Small copper pipe cut open to show its red epoxy lining' }
    ],
    facility: [
      { src: 'img/gallery/facility/blueline-install-site.webp', title: 'Install site', subtitle: 'Blueline', alt: 'Aerial view of a Blueline install set up in a commercial car park' },
      { src: 'img/gallery/facility/blueline-hotel-sewer-access.webp', title: 'Liner install at a hotel sewer access point', subtitle: 'Blueline', alt: 'Blue liner being fed into a sewer access point inside a hotel' },
      { src: 'img/gallery/facility/blueline-liner-inflating.webp', title: 'Liner inflating in place', subtitle: 'Blueline', alt: 'Blue liner inflating inside a pipe opening in a concrete pit' },
      { src: 'img/gallery/facility/blueline-htar-installation.webp', title: 'HTAR liner installation', subtitle: 'Blueline HTAR', alt: 'Installers in hard hats feeding a liner beside a large steel tank' },
      { src: 'img/gallery/facility/blueline-post-install-cctv.webp', title: 'Post-install CCTV check', subtitle: 'Blueline', alt: 'Technician reviewing CCTV footage of the relined pipe on a phone' },
      { src: 'img/gallery/facility/blueline-before-displacement.webp', title: 'Before: displacement of the host pipe', subtitle: 'Blueline', alt: 'CCTV view of a host pipe with a displaced joint' },
      { src: 'img/gallery/facility/blueline-after-displacement-sealed.webp', title: 'After: displacement sealed over', subtitle: 'Blueline', alt: 'CCTV view of the same pipe relined, with the displacement sealed over' },
      { src: 'img/gallery/facility/pressureline-liner-folding.webp', title: 'Folding the liner for install', subtitle: 'Pressureline', alt: 'Installers in hi-vis folding a blue Pressureline liner on site' },
      { src: 'img/gallery/facility/pressureline-liner-inversion.webp', title: 'Liner inversion', subtitle: 'Pressureline', alt: 'Installer guiding a long blue liner laid along a courtyard during inversion' },
      { src: 'img/gallery/facility/pressureline-rising-main-flanges.webp', title: 'Relined rising main flange ends', subtitle: 'Pressureline', alt: 'Two flanged rising main pipe ends relined in blue' },
      { src: 'img/gallery/facility/nucoat-htar-chamber-dairy.webp', title: 'HTAR-coated chamber at a dairy facility', subtitle: 'Nucoat', alt: 'Concrete chamber at a dairy facility coated in magenta Nucoat' },
      { src: 'img/gallery/facility/redline-before-after.webp', title: 'Before and after', subtitle: 'Redline', alt: 'Corroded copper pipe beside a copper pipe lined with red epoxy' },
      { src: 'img/gallery/facility/redline-fire-service-pipe.webp', title: 'Fire service pipe relined', subtitle: 'Redline', alt: 'Inside of a fire service pipe coated with red epoxy' },
      { src: 'img/gallery/facility/redline-fire-service.webp', title: 'Fire service pipework', subtitle: 'Redline', alt: 'Two fire service pipe flanges, one lined with red epoxy and one still corroded' }
    ],
    infrastructure: [
      { src: 'img/gallery/infrastructure/nuvline-uv-liner-installation.webp', title: 'UV liner installation', subtitle: 'NuVline', alt: 'Nuflow vehicle and crane at a UV liner install on a town street' },
      { src: 'img/gallery/infrastructure/blueline-calibration-roller.webp', title: 'Calibration roller', subtitle: 'Blueline', alt: 'Installers running a blue liner through a calibration roller' },
      { src: 'img/gallery/infrastructure/blueline-preparing-liner.webp', title: 'Preparing the liner for install', subtitle: 'Blueline', alt: 'Installers in hard hats preparing a liner at the work site' },
      { src: 'img/gallery/infrastructure/blueline-existing-access-point.webp', title: 'Install at an existing access point', subtitle: 'Blueline', alt: 'Installer feeding a blue liner hose into an existing access point' },
      { src: 'img/gallery/infrastructure/blueline-x-stormwater-drain.webp', title: 'Liner installed in a stormwater drain', subtitle: 'Blueline X', alt: 'Installer at the end of a stormwater drain relined in blue' },
      { src: 'img/gallery/infrastructure/nuvline-uv-liner-install.webp', title: 'UV liner install', subtitle: 'NuVline', alt: 'UV liner end and fittings ready in the pit' },
      { src: 'img/gallery/infrastructure/nuvline-uv-light-curing.webp', title: 'UV light curing', subtitle: 'NuVline', alt: 'UV light train curing a liner inside a pipe' },
      { src: 'img/gallery/infrastructure/nuvline-dn600-milricks-line.webp', title: 'DN600 UV liner, Milricks Line', subtitle: 'NuVline', alt: 'Installer checking the end of a DN600 UV liner' },
      { src: 'img/gallery/infrastructure/nuvline-dn600-relined.webp', title: 'DN600 relined with a UV liner', subtitle: 'NuVline', alt: 'Inside view of a DN600 pipe relined with a smooth UV liner' },
      { src: 'img/gallery/infrastructure/nuvline-ovoid-brick-barrel.webp', title: 'Ovoid brick barrel stormwater relined', subtitle: 'NuVline', alt: 'Egg-shaped brick stormwater barrel with a new liner inside' },
      { src: 'img/gallery/infrastructure/pressureline-dn600-watermain-install.webp', title: 'DN600 watermain install', subtitle: 'Pressureline', alt: 'Installer in a trench working at the flanged end of a DN600 watermain' },
      { src: 'img/gallery/infrastructure/pressureline-dn600-watermain.webp', title: 'DN600 watermain', subtitle: 'Pressureline', alt: 'Flanged DN600 watermain end in a shored trench, with the liner inside' },
      { src: 'img/gallery/infrastructure/pressureline-dn600-curing.webp', title: 'Liner curing in place, DN600 water main', subtitle: 'Pressureline', alt: 'Liner end fitted with curing equipment at a DN600 water main in a trench' },
      { src: 'img/gallery/infrastructure/pressureline-dn750-rising-main.webp', title: 'DN750 raw water rising main', subtitle: 'Pressureline', alt: 'Looking into a DN750 rising main lined in blue' },
      { src: 'img/gallery/infrastructure/pressureline-asoe-dn150.webp', title: 'ASOE pipe-in liner installation, DN150', subtitle: 'Pressureline', alt: 'Blue ASOE pipe-in liner laid into a DN150 pipe in a valve pit' },
      { src: 'img/gallery/infrastructure/pressureline-potable-hybrid.webp', title: 'Potable hybrid liner installation', subtitle: 'Pressureline', alt: 'Crew with a tripod at an access pit installing a potable water liner' },
      { src: 'img/gallery/infrastructure/pressureline-ibb16-lined-pipe.webp', title: 'IBB16 lined pipe', subtitle: 'Pressureline', alt: 'Inside view of a pipe with a smooth grey lining' },
      { src: 'img/gallery/infrastructure/sumoline-collapsed-sewer-main.webp', title: 'Relining a collapsed sewer main', subtitle: 'Sumoline', alt: 'Crew in a shored pit installing a blue liner into a sewer main' },
      { src: 'img/gallery/infrastructure/sumoline-dn1050-stormwater.webp', title: 'DN1050 stormwater RCP relined', subtitle: 'Sumoline', alt: 'Inside a DN1050 reinforced concrete stormwater pipe relined in blue' },
      { src: 'img/gallery/infrastructure/sumoline-corrugated-steel.webp', title: 'Corrugated steel pipe relined', subtitle: 'Sumoline', alt: 'Corrugated steel culvert with a blue liner inside' },
      { src: 'img/gallery/infrastructure/sumoline-before-spalling.webp', title: 'Before: spalling of the concrete host pipe', subtitle: 'Sumoline', alt: 'Concrete pipe with spalled, broken sections at the crown' },
      { src: 'img/gallery/infrastructure/sumoline-after-spalling-relined.webp', title: 'After: spalled pipe relined', subtitle: 'Sumoline', alt: 'The same concrete pipe relined in blue' }
    ],
    mining: [
      { src: 'img/gallery/mining/sumoline-oil-rig-installation.webp', title: 'Liner installation at an oil rig', subtitle: 'Sumoline', alt: 'Installers in harnesses guiding a liner into a pipe on an oil rig' },
      { src: 'img/gallery/mining/sumoline-oil-rig-preparation.webp', title: 'Liner preparation at an oil rig', subtitle: 'Sumoline', alt: 'Liner laid out along the deck of an oil rig' },
      { src: 'img/gallery/mining/sumoline-oil-rig-finish.webp', title: 'Liner finish at an oil rig', subtitle: 'Sumoline', alt: 'Flanged pipe end showing the finished light blue liner' },
      { src: 'img/gallery/mining/nuvline-ballast-pipe.webp', title: 'Ballast pipe', subtitle: 'NuVline', alt: 'Ballast pipe end lit green during liner installation' },
      { src: 'img/gallery/mining/nuvline-ballast-end-seal.webp', title: 'Ballast pipe end seal', subtitle: 'NuVline', alt: 'Flanged ballast pipe end showing the liner end seal' },
      { src: 'img/gallery/mining/nucoat-mineral-pipe-repurpose.webp', title: 'Mineral pipe coated for repurpose', subtitle: 'Nucoat', alt: 'Corroded flanged pipework with one pipe freshly coated in blue Nucoat' },
      { src: 'img/gallery/mining/nucoat-dn250-steel.webp', title: 'DN250 steel pipe coated', subtitle: 'Nucoat', alt: 'DN250 steel pipe end coated inside with blue Nucoat' },
      { src: 'img/gallery/mining/nucoat-fpso-steel.webp', title: 'Steel pipe on an FPSO, coated', subtitle: 'Nucoat', alt: 'Steel pipe on a floating production vessel coated in glossy blue Nucoat' }
    ]
  }
};
