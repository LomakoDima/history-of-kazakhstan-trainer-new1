// Supplemental questions for syllabus weeks that have fewer than 30 questions.
// Keys are zero-based week indexes (0 = Week 1, 3 = Week 4, ...). index.html merges
// these lists into the main bank and skips any question that is already present.
// Week 8 (index 7) is a generated review round and does not take supplements.
globalThis.SYLLABUS_SUPPLEMENTS = {
  // Week 4 · Golden Horde
  3: [
    {q:"In what year was Genghis Khan proclaimed Great Khan at the Kurultai?",options:["1167","1206","1219","1227"],correct:1},
    {q:"Which Mongol commanders defeated the Russian princes and the Kipchaks at the Kalka River in 1223?",options:["Batu and Berke","Jebe and Subutai","Ogedei and Tolui","Mamai and Edigei"],correct:1},
    {q:"Who was the shah of the Khwarezmian state during the Mongol invasion of Central Asia?",options:["Muhammad II","Tamerlane","Uzbek","Tughlugh Timur"],correct:0},
    {q:"Which son of Genghis Khan received the Chagatai Ulus in Central Asia?",options:["Jochi","Chagatai","Ogedei","Tolui"],correct:1},
    {q:"What was the capital of the Golden Horde on the Volga?",options:["Sarai-Batu","Almalyk","Sygnak","Otrar"],correct:0},
    {q:"Which Golden Horde khan was defeated by Timur at the Kondurcha River in 1391?",options:["Uzbek Khan","Tokhtamysh","Berke","Janibek"],correct:1}
  ],

  // Week 6 · Kazakhstan in the 18th – early 20th centuries
  5: [
    {q:"In what year did Khan Abulkhair of the Junior Zhuz request Russian protection?",options:["1731","1740","1822","1867"],correct:0},
    {q:"In what year was Kenesary Kasymuly elected khan?",options:["1822","1837","1841","1868"],correct:2},
    {q:"Which work by Abai is a collection of philosophical reflections?",options:["The Book of Words (Kara sozder)","Kutadgu Bilig","Diwan Lughat al-Turk","Kobylandy Batyr"],correct:0},
    {q:"In what year was Ibrai Altynsarin's Kyrgyz Chrestomathy published?",options:["1864","1879","1891","1906"],correct:1},
    {q:"In what year was the Resettlement Administration created to organize the movement of peasants to the steppe?",options:["1822","1868","1896","1916"],correct:2},
    {q:"The Orenburg–Tashkent railway was completed in",options:["1880","1893","1906","1930"],correct:2}
  ],

  // Week 7 · Kazakhstan at the beginning of the 20th century
  6: [
    {q:"In what year did the first Russian revolution begin?",options:["1905","1914","1916","1917"],correct:0},
    {q:"The Alash autonomy was proclaimed at the Second All-Kazakh Congress in",options:["July 1917","December 1917","March 1918","August 1920"],correct:1},
    {q:"Who headed the Alash Orda government?",options:["Alikhan Bukeikhanov","Amangeldy Imanov","Tokash Bokin","Mukhamedzhan Seralin"],correct:0},
    {q:"Who wrote the poem collection \"Oyan, Qazaq!\" (Awake, Kazakh!)?",options:["Mirzhakyp Dulatov","Abai Kunanbaiuly","Mashkhur Zhusip","Ybyrai Altynsarin"],correct:0},
    {q:"Who founded the magazine \"Aiqap\" in 1911?",options:["Mukhamedzhan Seralin","Akhmet Baitursynuly","Alikhan Bukeikhanov","Shakarim Kudaiberdiuly"],correct:0},
    {q:"Who was the editor of the newspaper \"Kazakh\" (1913–1918)?",options:["Akhmet Baitursynuly","Mirzhakyp Dulatov","Mustafa Shokai","Zhusipbek Aimautov"],correct:0},
    {q:"Which novel by Mirzhakyp Dulatov, published in 1910, was the first Kazakh novel?",options:["Bakytsyz Zhamal","Abai Zholy","Kozy Korpesh – Bayan Sulu","Kyz Zhibek"],correct:0},
    {q:"Which city was the main center of the Alash movement in the east?",options:["Semipalatinsk","Turkestan","Kzyl-Orda","Aktobe"],correct:0},
    {q:"The Alash autonomy ceased to exist in",options:["1918","1920","1925","1936"],correct:1},
    {q:"In what year was the Stolypin agrarian reform launched?",options:["1861","1891","1906","1917"],correct:2}
  ],

  // Week 9 · Civil War, 1920s–1930s politics
  8: [
    {q:"Who was First Secretary of the Kazakh Regional Party Committee from 1925 to 1933?",options:["F. Goloshchekin","D. Kunayev","G. Kolbin","S. Sadvakasov"],correct:0},
    {q:"What was Goloshchekin's policy of the late 1920s called?",options:["The Little October","The Thaw","Perestroika","War Communism"],correct:0},
    {q:"The capital of the Kazakh ASSR was moved from Orenburg to Kyzyl-Orda in",options:["1920","1925","1929","1936"],correct:1},
    {q:"The capital of Kazakhstan was moved from Kyzyl-Orda to Alma-Ata in",options:["1925","1929","1936","1945"],correct:1},
    {q:"The Kazakh ASSR became a union republic (Kazakh SSR) in",options:["1920","1925","1936","1940"],correct:2},
    {q:"The New Economic Policy (NEP) was introduced in",options:["1918","1921","1928","1936"],correct:1},
    {q:"Who chaired the Kyrgyz (Kazakh) Revolutionary Committee in 1919–1920?",options:["S. Pestkovsky","V. Chapaev","M. Frunze","A. Imanov"],correct:0},
    {q:"The Kazakh alphabet was switched to the Latin script in",options:["1920","1929","1940","1991"],correct:1},
    {q:"The Kazakh alphabet was switched to the Cyrillic script in",options:["1929","1936","1940","1950"],correct:2}
  ],

  // Week 10 · Industrialization and collectivization
  9: [
    {q:"The first Soviet Five-Year Plan began in",options:["1921","1928","1936","1941"],correct:1},
    {q:"Which Kazakh coal basin became one of the main coal bases of the USSR?",options:["Karaganda","Ekibastuz","Shubarkol","Maikuben"],correct:0},
    {q:"The Turksib railway was officially opened in",options:["1925","1930","1936","1945"],correct:1},
    {q:"The Turksib railway connected Central Asia with",options:["Siberia","The Caucasus","The Baltic region","The Far East"],correct:0},
    {q:"Approximately what share of ethnic Kazakhs died in the famine of 1930–1933?",options:["About 5%","About 15%","About 40%","About 70%"],correct:2},
    {q:"Karlag, one of the largest Gulag camps, was located near",options:["Karaganda","Aktobe","Pavlodar","Semipalatinsk"],correct:0},
    {q:"In 1937, Soviet authorities deported which people from the Far East to Kazakhstan?",options:["Koreans","Chechens","Crimean Tatars","Volga Germans"],correct:0},
    {q:"The Akmola camp for wives of \"traitors to the Motherland\" (ALZHIR) was established in",options:["1930","1938","1941","1953"],correct:1}
  ],

  // Week 11 · Great Patriotic War and post-war years
  10: [
    {q:"On what date did the Great Patriotic War begin?",options:["22 June 1941","1 September 1939","9 May 1945","7 November 1941"],correct:0},
    {q:"Which Kazakh woman machine-gunner was awarded the title Hero of the Soviet Union?",options:["Manshuk Mametova","Aliya Moldagulova","Khiuaz Dospanova","Zeinep Zhumabayeva"],correct:0},
    {q:"The Virgin Lands campaign began in",options:["1946","1954","1965","1979"],correct:1},
    {q:"Which future Soviet leader was First Secretary of the Kazakh Communist Party in 1955–1956?",options:["Leonid Brezhnev","Nikita Khrushchev","Mikhail Gorbachev","Yuri Andropov"],correct:0},
    {q:"The first Soviet nuclear test at the Semipalatinsk Test Site took place in",options:["1941","1949","1957","1961"],correct:1},
    {q:"From which cosmodrome in Kazakhstan did Yuri Gagarin launch into space in 1961?",options:["Baikonur","Sary-Shagan","Kapustin Yar","Plesetsk"],correct:0},
    {q:"In 1944, which peoples were deported to Kazakhstan?",options:["Chechens and Ingush","Estonians and Latvians","Poles and Czechs","Uzbeks and Tajiks"],correct:0},
    {q:"During the war, Kazakhstan became a key supplier of",options:["Lead, copper and other non-ferrous metals","Cars and tractors","Aircraft engines only","Imported oil from abroad"],correct:0}
  ],

  // Week 12 · 1965–1991
  11: [
    {q:"Who led the Communist Party of Kazakhstan from 1964 to 1986?",options:["Dinmukhamed Kunayev","Gennady Kolbin","Nursultan Nazarbayev","Zhumabek Tashenev"],correct:0},
    {q:"In which year did Nursultan Nazarbayev become First Secretary of the Communist Party of Kazakhstan?",options:["1986","1989","1991","1993"],correct:1},
    {q:"In what year was Nazarbayev elected President of the Kazakh SSR by the Supreme Soviet?",options:["1989","1990","1991","1992"],correct:1},
    {q:"The Law on Languages, which made Kazakh the state language of the Kazakh SSR, was adopted in",options:["1979","1989","1995","2007"],correct:1},
    {q:"Who founded the Nevada–Semipalatinsk anti-nuclear movement in 1989?",options:["Olzhas Suleimenov","Mukhtar Auezov","Gennady Kolbin","Dinmukhamed Kunayev"],correct:0},
    {q:"The shrinking of the Aral Sea was caused mainly by the diversion of water from the Syr Darya and Amu Darya for",options:["Irrigation","Hydropower only","Drinking water for Moscow","Industrial cooling"],correct:0},
    {q:"In which city did the Zheltoksan (December 1986) protests begin?",options:["Alma-Ata","Tselinograd","Karaganda","Semipalatinsk"],correct:0},
    {q:"Which event in August 1991 accelerated the collapse of the USSR?",options:["The attempted coup against Gorbachev","The Chernobyl accident","The Cuban Missile Crisis","The start of perestroika"],correct:0}
  ],

  // Week 13 · Collapse of the USSR and independent Kazakhstan
  12: [
    {q:"Who resigned as President of the USSR on 25 December 1991?",options:["Mikhail Gorbachev","Boris Yeltsin","Nursultan Nazarbayev","Leonid Brezhnev"],correct:0},
    {q:"Which Soviet republic was the last to declare independence?",options:["Kazakhstan","Ukraine","Armenia","Estonia"],correct:0},
    {q:"What was the capital of Kazakhstan from 1991 to 1997?",options:["Almaty","Astana","Shymkent","Karaganda"],correct:0},
    {q:"In 1994, Kazakhstan joined the Treaty on the Non-Proliferation of Nuclear Weapons as",options:["A non-nuclear state","A nuclear power","An observer","A guarantor state"],correct:0},
    {q:"What share of the vote did Nazarbayev receive in the presidential election of December 1991?",options:["About 51%","About 70%","About 98%","About 100%"],correct:2}
  ],

  // Week 14 · 1991–2025 foreign policy and integration
  13: [
    {q:"In which year did Kazakhstan chair the OSCE and host the OSCE summit in Astana?",options:["2005","2010","2015","2020"],correct:1},
    {q:"The Eurasian Economic Union began operating on",options:["1 January 2010","1 January 2015","1 January 2020","1 January 2025"],correct:1},
    {q:"Kazakhstan joined the World Trade Organization in",options:["2005","2010","2015","2020"],correct:2},
    {q:"The Shanghai Cooperation Organization, of which Kazakhstan is a founding member, was created in",options:["1992","2001","2010","2014"],correct:1},
    {q:"At the UN in 1992, Nazarbayev proposed the creation of which forum?",options:["CICA (Conference on Interaction and Confidence Building Measures in Asia)","G20","NATO Partnership Council","BRICS"],correct:0},
    {q:"In which years was Kazakhstan a non-permanent member of the UN Security Council?",options:["1992–1993","2007–2008","2017–2018","2023–2024"],correct:2},
    {q:"The treaty establishing the Central Asian Nuclear-Weapon-Free Zone was signed in 2006 in",options:["Semipalatinsk","Astana","Tashkent","Almaty"],correct:0},
    {q:"Nazarbayev University was founded in",options:["1991","2000","2010","2022"],correct:2},
    {q:"Kazakhstan is a member of which post-Soviet military-political alliance?",options:["CSTO","NATO","SEATO","Warsaw Pact"],correct:0}
  ],

  // Week 15 · New Kazakhstan
  14: [
    {q:"In which year did Kassym-Jomart Tokayev win a presidential election for the first time?",options:["2015","2019","2022","2023"],correct:1},
    {q:"The mass unrest of January 2022 began in which city?",options:["Zhanaozen","Atyrau","Astana","Kokshetau"],correct:0},
    {q:"Tokayev was re-elected in an early presidential election on",options:["9 June 2019","20 November 2022","19 March 2023","6 October 2024"],correct:1},
    {q:"Which new regions were created in 2022 together with Ulytau?",options:["Abai and Zhetysu","Turkistan and Mangystau","Baikonur and Almaty","Aral and Tarbagatai"],correct:0},
    {q:"The 2022 constitutional amendments abolished the special status of",options:["The First President (Elbasy)","The Constitutional Court","The Senate","The regional akims"],correct:0},
    {q:"What was put to a national referendum on 6 October 2024?",options:["Building a nuclear power plant in Kazakhstan","A new national flag","Moving the capital","Joining the EU"],correct:0},
    {q:"Which concept did President Tokayev announce to describe state responsiveness to citizens?",options:["The Listening State","The Great Steppe","Digital Silk Road","Mangilik El"],correct:0}
  ]
};
