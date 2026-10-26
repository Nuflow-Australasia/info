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

  /* Installation photos shown in each sector's carousel. Files live in assets/img/installs/<sector>/ as WebP;
     src is relative to the assets folder. A sector with no photos shows no carousel.
     { src: 'img/installs/residential/sydney-stack-01.webp', title: 'Stack relining', subtitle: 'Sydney', alt: 'What the photo shows' } */
  installs: {
    residential:    [],
    facility:       [],
    infrastructure: [],
    mining:         []
  }
};
