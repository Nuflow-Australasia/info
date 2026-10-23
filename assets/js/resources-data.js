/*
 * Nuflow Info: document and video library.
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

  booklets: [
    { sector: 'residential',    title: 'Residential & Strata booklet', id: '1Sk5OUg75IdHHK7FyyXcLATY_5P9W-Hq7', mb: 21 },
    { sector: 'facility',       title: 'Facility Management booklet',  id: '1jJ7z1Y5Yn8VOdjoAV1tNOtVJJqIa1Ub1', mb: 78 },
    { sector: 'infrastructure', title: 'Infrastructure booklet',       id: '1Bhih74QHS3oTikuVSHpjLKcNOe412neW', mb: 83 },
    { sector: 'mining',         title: 'Mining & Industrial booklet',  id: '1y1pgvG0g0kmHol8cvcqSY8jXZ9F9J4j5', mb: 80 }
  ],

  /* Technical data sheets, grouped by system. sectors = where the sheet is listed. */
  tds: [
    { system: 'Blueline',     title: 'Blueline Standard',           id: '1BqRI7Qa_129bxr-S965BuGOqH3KKqjux', mb: 2.3, sectors: ['residential', 'facility', 'infrastructure'] },
    { system: 'Blueline',     title: 'Blueline X',                  id: '15a7SDBaHbOHvgn7vue63I3-BlkuVIgHu', mb: 2.7, sectors: ['residential', 'facility', 'infrastructure', 'mining'] },
    { system: 'Blueline',     title: 'Blueline XS Small Bore',      id: '1oWzMkIWO_-VX9VSYfdStD0UVYuO6Ul6R', mb: 2.5, sectors: ['residential', 'facility'] },
    { system: 'Blueline',     title: 'Blueline HTAR',               id: '1IdiVYwSXzvw937yxGiHXu9uuM4keyX7S', mb: 2.2, sectors: ['facility', 'mining'] },
    { system: 'Sumoline',     title: 'Sumoline X',                  id: '1TBRzh0YqxZ0aJ7FEgcmr37-ipSHGTN6D', mb: 2.0, sectors: ['infrastructure', 'mining'] },
    { system: 'Sumoline',     title: 'Sumoline XL',                 id: '1q43dD83Hhdf88j6stTBlR33A6zM-ncDq', mb: 2.0, sectors: ['infrastructure', 'mining'] },
    { system: 'Sumoline',     title: 'Sumoline XXL',                id: '1vDxo6G6IgdnT8jDDLu2hSlYbcnJc0S-N', mb: 2.0, sectors: ['infrastructure', 'mining'] },
    { system: 'Pressureline', title: 'Pressureline X',              id: '1e-H9ETTrkVXLmiavpu0UcLdgHozLSOd0', mb: 2.2, sectors: ['residential', 'facility', 'infrastructure', 'mining'] },
    { system: 'Pressureline', title: 'Pressureline XL',             id: '1IMuNVu0vrfdUGKXuTp2zleg3TvSUkgv-', mb: 2.2, sectors: ['residential', 'facility', 'infrastructure', 'mining'] },
    { system: 'Pressureline', title: 'Pressureline XXL',            id: '1ZHOnmhb44gEOuUHVJEXjXAtRRhuRSNqC', mb: 2.2, sectors: ['facility', 'infrastructure', 'mining'] },
    { system: 'Pressureline', title: 'ASOE Pipe-in Liner W',        id: '15kvpdhECP5lG-0xcZ8VcYTlA6kt00IvD', mb: 2.0, sectors: ['infrastructure', 'mining'] },
    { system: 'IBG',          title: 'IBG16 HydroTech',             id: '1Vey88Gkz51yo4Ivx8O-NypAYP2PHOVn0', mb: 1.6, sectors: ['infrastructure'] },
    { system: 'NUVLINE',      title: 'NUVLINE GL16',                id: '1-qKXDg2zpT7v97IYDxa1YZ93Ok6Nkmdb', mb: 3.2, sectors: ['infrastructure'] },
    { system: 'Redline',      title: 'Redline',                     id: '1ZxsxtCKIuL0Mt06wu2T5Fi7ZhlOtv3AE', mb: 2.8, sectors: ['residential', 'facility'] },
    { system: 'Nucoat',       title: 'Nucoat',                      id: '1stcCf3DDebZ6t2y_qIQxsYyK6BFTI-0U', mb: 3.7, sectors: ['residential', 'facility', 'infrastructure', 'mining'] },
    { system: 'Smart Lock',   title: 'Smart Lock',                  id: '1N870Po-bz2b6eGPXgDRWPmmdVlI9Idhh', mb: 0.5, sectors: ['residential', 'facility', 'infrastructure', 'mining'] },
    { system: 'Pipa',         title: 'Pipa Flowrider',              id: '1K2mZx3lTXmh-MHX07tKuPmdu_UhFiQuZ', mb: 0.9, sectors: ['infrastructure'] },
    { system: 'Pipa',         title: 'Pipa Flowrider Lite',         id: '1cnLZkVxF5mOevBUgO3vta9IzJB7KNrUJ', mb: 0.6, sectors: ['infrastructure'] },
    { system: 'Croc Mate',    title: 'Crocmate Smooth Trowel',      id: '1CzzXz0vOgpGaaUEwEPb1HQeJcCIlo5Hx', mb: 0.2, sectors: ['infrastructure'] },
    { system: 'Croc Mate',    title: 'Crocmate Smooth Coat',        id: '120STVvAkrjSP8w0fIvRy2O1zVCJRwyhG', mb: 0.2, sectors: ['infrastructure'] },
    { system: 'Selection',    title: 'Liner and Resin Compatibility & Selection Chart', id: '1BXSVxICXlgo516_j4tGa657vqwp2vuAO', mb: 1.6, sectors: ['residential', 'facility', 'infrastructure', 'mining'] }
  ],

  /* Case study PDFs. system = the technology used. */
  cases: [
    { system: 'Blueline',     title: 'Residential development, Flowwise',                 id: '1xqtdVi5_mpPu_lVGDaLEQojmyCX-mCWL', mb: 1.1, sectors: ['residential'] },
    { system: 'Blueline',     title: 'Crown Towers, Gold Coast',                          id: '1JjXUl78BYGgsoMfT6WKM0HDrXbB3iUhH', mb: 0.4, sectors: ['residential'] },
    { system: 'Blueline',     title: 'The Belgrave, Nuflow St George',                    id: '1smM48XD66qa-Fp4I45WWJbAZVtb02pPN', mb: 1.0, sectors: ['residential'] },
    { system: 'Blueline',     title: 'Water feature, 24Seven Plumbing',                   id: '1jCWrzDSPcQ2pjOKL2L0J5FGJU0frwNoB', mb: 1.9, sectors: ['residential'] },
    { system: 'Blueline',     title: 'RACV Royal Pines, Gold Coast',                      id: '1DYy9BZuob5Lwlo5WChfWikHpOuSrGv34', mb: 1.4, sectors: ['facility'] },
    { system: 'Blueline',     title: 'Government site, Darwin',                           id: '1Yeuj33_bjmfMwuhHM2BPszu2D9HlzijZ', mb: 1.7, sectors: ['facility'] },
    { system: 'Blueline',     title: 'Great Lakes Aquatic and Leisure Centre',            id: '1b4cQSNAUaepGbBuYzpuCInMVMmyGbEHu', mb: 0.4, sectors: ['facility'] },
    { system: 'Blueline',     title: 'Pipeline cracks sealed at Taronga Zoo',             id: '1Gdz1Ayiroxk9alDwMZk9RlNM97Wr79Kk', mb: 6.8, sectors: ['facility'] },
    { system: 'Blueline',     title: 'Super yacht plumbing, Nuflow North Harbour',        id: '1bLoykvzf-YqWdXQ1vNWJjclyy0SKEl8U', mb: 1.2, sectors: ['facility'] },
    { system: 'Blueline',     title: 'Stormwater relining after a yeast spill',           id: '1Re8GOx-wDUIrOE7PTiN4n_oeSP425YCr', mb: 4.4, sectors: ['facility', 'mining'] },
    { system: 'Blueline',     title: 'Fonterra (Blueline HTAR)',                          id: '1zd2KJfADTJoMqQaqFprkXOUH_HIfdN49', mb: 2.2, sectors: ['facility', 'mining'] },
    { system: 'Blueline',     title: 'Callide Dam',                                       id: '1m5V1Z-bTP1Z1rPswwZG9h3wPGVr-IIQs', mb: 3.0, sectors: ['infrastructure', 'mining'] },
    { system: 'Blueline',     title: 'Underwater pipe relining, Nuflow Central Queensland', id: '1ypER8yiFytpNKtn9qM1gtpOkVPRCrTTC', mb: 1.2, sectors: ['infrastructure'] },
    { system: 'Redline',      title: 'Old Parliament House',                              id: '1K8PLJIIfb6eFW2TszF67j3BKdbKP705M', mb: 0.6, sectors: ['facility'] },
    { system: 'Redline',      title: 'AMP building',                                      id: '16VmKn2rAkglLai0pAuLVzUxRPZOIQa1s', mb: 1.6, sectors: ['facility'] },
    { system: 'Redline',      title: 'Cairns Central Shopping Centre',                    id: '1oG8mNPu1UgyCm_SEf1ENK5zKf3LMcwK9', mb: 1.0, sectors: ['facility'] },
    { system: 'Redline',      title: 'Atlas Copco',                                       id: '1vfS0hUxi9fXcDgaaIm4qenfQjq_uKHuH', mb: 2.1, sectors: ['facility', 'mining'] },
    { system: 'Pressureline', title: 'Pressureline project studies',                      id: '1HsXQbXC37RHt1w4xok1B3y0GfvSBOLdb', mb: 9.7, sectors: ['facility', 'infrastructure'] },
    { system: 'Pressureline', title: 'DN150 rising main, Dawson Highway, Biloela',        id: '1obgUfwpSLSs6w6KGS6kgnssbXuBsQc8_', mb: 1.8, sectors: ['infrastructure'] },
    { system: 'Pressureline', title: 'Canberra water reservoir',                          id: '1r28cpH04obTh_zKuHN92Q9WOAB-0EBWo', mb: 4.7, sectors: ['infrastructure'] },
    { system: 'Pressureline', title: 'Metro Trains, South West Melbourne',                id: '1wow_LgDr5i_boktHrrOmpSpt0pC4d4H9', mb: 1.8, sectors: ['infrastructure'] },
    { system: 'ASOE',         title: 'Borlasses Road',                                    id: '1gv6ycbx9rrR8CP4V53-8W4AraAknof3k', mb: 3.7, sectors: ['infrastructure'] },
    { system: 'IBG',          title: 'IBB16 case study',                                  id: '1Agdu3gDiKy0-cPLypRfIdPgjO8nUwoLo', mb: 9.0, sectors: ['infrastructure'] },
    { system: 'Sumoline',     title: 'Arch culvert pipes, Fremantle',                     id: '1tZehm4eREXWCATrtLpIjpIKYi1JgmBWR', mb: 5.8, sectors: ['infrastructure'] },
    { system: 'Sumoline',     title: 'Portland bore line',                                id: '1R8S3H3Gp0vXiZTEqqXIpgoID6akSBDB-', mb: 4.2, sectors: ['infrastructure'] },
    { system: 'Sumoline',     title: 'From cracked to intact',                            id: '1JtEzlPWlgSuJWTB7l2MJiIETzcP1Flc3', mb: 5.1, sectors: ['infrastructure'] },
    { system: 'Sumoline',     title: 'Barangaroo',                                        id: '1fKXzTqIEQcNapNOyCkezTs5jOg-jpG9j', mb: 3.4, sectors: ['facility', 'infrastructure'] },
    { system: 'Sumoline',     title: 'Stormwater repair for a major exporter, Nuflow Tasman', id: '1wVvDdsx6tWjNA2qViL6OSY47ipUndz-5', mb: 4.5, sectors: ['infrastructure', 'mining'] },
    { system: 'Sumoline',     title: 'Offshore vertical liner installation',              id: '1-YnuZtIXLMzzfftgZR4t4BFwuJmGJ5om', mb: 1.8, sectors: ['mining'] },
    { system: 'Nucoat',       title: 'Manhole rehabilitation, Nuflow Tasman',             id: '1W44yQO5kBOTdXJ_wt8On_2j4_2wlwVWR', mb: 1.8, sectors: ['infrastructure'] },
    { system: 'Nucoat',       title: 'Corroded pipes at a tanker terminal, Nuflow Manawatu', id: '1omtrEYr_W0pXkthIbn24XZ1M5Y1Dgc-8', mb: 4.4, sectors: ['mining'] }
  ],

  /* YouTube videos from youtube.com/@NuflowAustralasia */
  videos: [
    { title: 'Hilton Garden Inn, Nuflow Darwin',            yt: 'Km2o90WhxAA', sectors: ['facility'] },
    { title: 'Bridge Street ovoid brick stormwater barrel', yt: 'duw1th2c4N4', sectors: ['infrastructure'] },
    { title: 'DN750 rising main, Woongara Pump Station',    yt: 'jkd2DmnZzpY', sectors: ['infrastructure'] },
    { title: 'Nuflow Redline',                              yt: 'oNGFZ2_0FOg', sectors: ['residential', 'facility'] }
  ]
};
