export interface SdgTargetContent {
  code: string
  title_id: string
  title_en: string
}

export interface SdgLocalContent {
  goal_number: number
  slug: string
  name_id: string
  name_en: string
  color: string
  tagline_id: string
  tagline_en: string
  description_id: string
  description_en: string
  targets: SdgTargetContent[]
}

export const sdgsLocalContent: SdgLocalContent[] = [
  {
    goal_number: 1,
    slug: 'no-poverty',
    name_id: 'Tanpa Kemiskinan',
    name_en: 'No Poverty',
    color: '#E5243B',
    tagline_id:
      'Mengakhiri Kemiskinan Dalam Segala Bentuk di Manapun',
    tagline_en:
      'End Poverty in All Its Forms Everywhere',
    description_id:
      'Mengakhiri kemiskinan dalam segala bentuk di mana pun. Tujuan ini menekankan pengentasan kemiskinan ekstrem, perluasan perlindungan sosial, dan peningkatan akses terhadap sumber daya serta layanan dasar bagi seluruh masyarakat.',
    description_en:
      'End poverty in all its forms everywhere. This goal focuses on eradicating extreme poverty, expanding social protection, and improving access to resources and basic services for all.',
    targets: [
      { code: '1.1', title_id: 'Menghapuskan kemiskinan ekstrem bagi semua orang di mana pun.', title_en: 'Eradicate extreme poverty for all people everywhere.' },
      { code: '1.2', title_id: 'Mengurangi setidaknya setengah proporsi laki-laki, perempuan, dan anak-anak yang hidup dalam kemiskinan.', title_en: 'Reduce at least by half the proportion of people living in poverty.' },
      { code: '1.3', title_id: 'Menerapkan sistem perlindungan sosial yang sesuai di tingkat nasional.', title_en: 'Implement nationally appropriate social protection systems.' },
      { code: '1.4', title_id: 'Memastikan semua orang memiliki hak yang sama terhadap sumber daya ekonomi dan layanan dasar.', title_en: 'Ensure equal rights to economic resources and basic services.' },
      { code: '1.5', title_id: 'Membangun ketahanan masyarakat miskin terhadap bencana dan kerentanan.', title_en: 'Build resilience of the poor to climate-related and other economic, social and environmental shocks.' },
      { code: '1.a', title_id: 'Memobilisasi sumber daya untuk mengakhiri kemiskinan.', title_en: 'Ensure significant mobilization of resources to end poverty.' },
      { code: '1.b', title_id: 'Menciptakan kerangka kebijakan yang pro-miskin dan sensitif gender.', title_en: 'Create sound policy frameworks based on pro-poor and gender-sensitive development strategies.' }
    ]
  },
  {
    goal_number: 2,
    slug: 'zero-hunger',
    name_id: 'Tanpa Kelaparan',
    name_en: 'Zero Hunger',
    color: '#DDA63A',
    tagline_id:
      'Mengakhiri Kelaparan, Mencapai Ketahanan Pangan dan Nutrisi yang Lebih Baik, serta Mendorong Pertanian Berkelanjutan',
    tagline_en:
      'End Hunger, Achieve Food Security and Improved Nutrition and Promote Sustainable Agriculture',
    description_id:
      'Mengakhiri kelaparan, mencapai ketahanan pangan dan nutrisi yang lebih baik, serta mempromosikan pertanian berkelanjutan. Tujuan ini mendorong akses pangan yang aman, bergizi, dan cukup sepanjang tahun bagi semua orang.',
    description_en:
      'End hunger, achieve food security and improved nutrition, and promote sustainable agriculture. This goal promotes safe, nutritious and sufficient food all year round for all.',
    targets: [
      { code: '2.1', title_id: 'Mengakhiri kelaparan dan memastikan akses semua orang, khususnya yang miskin dan rentan, terhadap pangan yang aman, bergizi, dan cukup sepanjang tahun.', title_en: 'End hunger and ensure access by all people to safe, nutritious and sufficient food all year round.' },
      { code: '2.2', title_id: 'Mengakhiri segala bentuk malnutrisi, termasuk mencapai target yang disepakati internasional tentang stunting dan wasting pada anak di bawah usia 5 tahun.', title_en: 'End all forms of malnutrition, including achieving internationally agreed targets on stunting and wasting.' },
      { code: '2.3', title_id: 'Menggandakan produktivitas pertanian dan pendapatan produsen pangan skala kecil.', title_en: 'Double the agricultural productivity and incomes of small-scale food producers.' },
      { code: '2.4', title_id: 'Menjamin sistem produksi pangan yang berkelanjutan dan menerapkan praktik pertanian yang tangguh.', title_en: 'Ensure sustainable food production systems and implement resilient agricultural practices.' },
      { code: '2.5', title_id: 'Mempertahankan keragaman genetik benih, tanaman budidaya, serta hewan ternak dan terkait.', title_en: 'Maintain the genetic diversity of seeds, cultivated plants and farmed animals.' },
      { code: '2.a', title_id: 'Meningkatkan investasi pada infrastruktur pedesaan, penelitian, dan teknologi pertanian.', title_en: 'Increase investment in rural infrastructure, agricultural research and technology.' },
      { code: '2.b', title_id: 'Memperbaiki dan mencegah pembatasan serta distorsi perdagangan di pasar pertanian dunia.', title_en: 'Correct and prevent trade restrictions and distortions in world agricultural markets.' },
      { code: '2.c', title_id: 'Mengadopsi langkah untuk menjamin berfungsinya pasar komoditas pangan dan memfasilitasi akses informasi pasar secara tepat waktu.', title_en: 'Adopt measures to ensure the proper functioning of food commodity markets.' }
    ]
  },
  {
    goal_number: 3,
    slug: 'good-health-and-well-being',
    name_id: 'Kehidupan Sehat dan Sejahtera',
    name_en: 'Good Health and Well-being',
    color: '#4C9F38',
    tagline_id:
      'Menjamin Kehidupan yang Sehat dan Mendorong Kesejahteraan bagi Semua Orang di Segala Usia',
    tagline_en:
      'Ensure Healthy Lives and Promote Well-being for All at All Ages',
    description_id:
      'Menjamin kehidupan yang sehat dan mendorong kesejahteraan bagi semua orang di segala usia. Mencakup penurunan angka kematian ibu dan anak, pengendalian penyakit, serta akses layanan kesehatan yang bermutu.',
    description_en:
      'Ensure healthy lives and promote well-being for all at all ages. Includes reducing maternal and child mortality, controlling diseases, and ensuring quality healthcare access.',
    targets: [
      { code: '3.1', title_id: 'Mengurangi rasio angka kematian ibu.', title_en: 'Reduce the global maternal mortality ratio.' },
      { code: '3.2', title_id: 'Mengakhiri kematian bayi baru lahir dan anak di bawah usia 5 tahun yang dapat dicegah.', title_en: 'End preventable deaths of newborns and children under 5 years of age.' },
      { code: '3.3', title_id: 'Mengakhiri epidemi AIDS, tuberkulosis, malaria, dan penyakit tropis yang terabaikan.', title_en: 'End the epidemics of AIDS, tuberculosis, malaria and neglected tropical diseases.' },
      { code: '3.4', title_id: 'Mengurangi kematian dini akibat penyakit tidak menular melalui pencegahan dan pengobatan.', title_en: 'Reduce premature mortality from non-communicable diseases.' },
      { code: '3.5', title_id: 'Memperkuat pencegahan dan pengobatan penyalahgunaan zat.', title_en: 'Strengthen the prevention and treatment of substance abuse.' },
      { code: '3.6', title_id: 'Mengurangi jumlah kematian dan cedera akibat kecelakaan lalu lintas.', title_en: 'Halve the number of global deaths and injuries from road traffic accidents.' },
      { code: '3.7', title_id: 'Menjamin akses universal terhadap layanan kesehatan seksual dan reproduksi.', title_en: 'Ensure universal access to sexual and reproductive health-care services.' },
      { code: '3.8', title_id: 'Mencapai cakupan kesehatan universal, termasuk perlindungan risiko keuangan.', title_en: 'Achieve universal health coverage, including financial risk protection.' },
      { code: '3.9', title_id: 'Mengurangi jumlah kematian dan kesakitan akibat bahan kimia berbahaya serta polusi.', title_en: 'Substantially reduce deaths and illnesses from hazardous chemicals and pollution.' }
    ]
  },
  {
    goal_number: 4,
    slug: 'quality-education',
    name_id: 'Pendidikan Berkualitas',
    name_en: 'Quality Education',
    color: '#C5192D',
    tagline_id:
      'Menjamin Pendidikan yang Inklusif dan Berkualitas Secara Merata serta Mendorong Kesempatan Belajar Sepanjang Hayat bagi Semua',
    tagline_en:
      'Ensure Inclusive and Equitable Quality Education and Promote Lifelong Learning Opportunities for All',
    description_id:
      'Menjamin pendidikan yang inklusif dan berkualitas secara merata serta mendorong kesempatan belajar sepanjang hayat bagi semua. Fokus pada akses, mutu pembelajaran, dan keterampilan yang relevan.',
    description_en:
      'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. Focuses on access, learning quality, and relevant skills.',
    targets: [
      { code: '4.1', title_id: 'Menjamin semua anak menyelesaikan pendidikan dasar dan menengah yang gratis, setara, dan berkualitas.', title_en: 'Ensure all girls and boys complete free, equitable and quality primary and secondary education.' },
      { code: '4.2', title_id: 'Menjamin semua anak memiliki akses terhadap perkembangan dan pendidikan anak usia dini yang berkualitas.', title_en: 'Ensure access to quality early childhood development and pre-primary education.' },
      { code: '4.3', title_id: 'Menjamin akses yang setara bagi semua perempuan dan laki-laki terhadap pendidikan tinggi yang terjangkau dan berkualitas.', title_en: 'Ensure equal access to affordable and quality technical, vocational and tertiary education.' },
      { code: '4.4', title_id: 'Meningkatkan jumlah youth dan orang dewasa yang memiliki keterampilan relevan untuk kerja layak dan kewirausahaan.', title_en: 'Increase the number of youth and adults with relevant skills for employment and entrepreneurship.' },
      { code: '4.5', title_id: 'Menghilangkan disparitas gender dalam pendidikan dan menjamin akses setara bagi kelompok rentan.', title_en: 'Eliminate gender disparities in education and ensure equal access for vulnerable groups.' },
      { code: '4.6', title_id: 'Menjamin semua youth dan proporsi substansial orang dewasa melek huruf dan berhitung.', title_en: 'Ensure that all youth and a substantial proportion of adults achieve literacy and numeracy.' },
      { code: '4.7', title_id: 'Menjamin semua peserta didik memperoleh pengetahuan dan keterampilan untuk pembangunan berkelanjutan.', title_en: 'Ensure all learners acquire knowledge and skills needed to promote sustainable development.' },
      { code: '4.a', title_id: 'Membangun dan meningkatkan fasilitas pendidikan yang inklusif dan aman.', title_en: 'Build and upgrade education facilities that are child, disability and gender sensitive.' },
      { code: '4.b', title_id: 'Memperluas jumlah beasiswa bagi negara berkembang.', title_en: 'Expand globally the number of scholarships available to developing countries.' },
      { code: '4.c', title_id: 'Meningkatkan pasokan guru berkualitas secara substansial.', title_en: 'Substantially increase the supply of qualified teachers.' }
    ]
  },
  {
    goal_number: 5,
    slug: 'gender-equality',
    name_id: 'Kesetaraan Gender',
    name_en: 'Gender Equality',
    color: '#FF3A21',
    tagline_id:
      'Mencapai Kesetaraan Gender dan Memberdayakan Semua Perempuan dan Anak Perempuan',
    tagline_en:
      'Achieve Gender Equality and Empower All Women and Girls',
    description_id:
      'Mencapai kesetaraan gender dan memberdayakan semua perempuan dan anak perempuan. Mencakup penghapusan diskriminasi dan kekerasan, serta partisipasi penuh di segala bidang.',
    description_en:
      'Achieve gender equality and empower all women and girls. Includes ending discrimination and violence, and ensuring full participation in all spheres.',
    targets: [
      { code: '5.1', title_id: 'Mengakhiri segala bentuk diskriminasi terhadap perempuan di mana pun.', title_en: 'End all forms of discrimination against all women and girls everywhere.' },
      { code: '5.2', title_id: 'Menghapuskan segala bentuk kekerasan terhadap perempuan di ruang publik dan privat.', title_en: 'Eliminate all forms of violence against all women and girls.' },
      { code: '5.3', title_id: 'Menghapuskan praktik berbahaya seperti pernikahan anak dan sunat perempuan.', title_en: 'Eliminate all harmful practices such as child marriage and FGM.' },
      { code: '5.4', title_id: 'Mengakui dan menghargai pekerjaan pengasuhan dan rumah tangga yang tidak dibayar.', title_en: 'Recognize and value unpaid care and domestic work.' },
      { code: '5.5', title_id: 'Menjamin partisipasi penuh dan efektif perempuan serta kesempatan yang sama dalam kepemimpinan.', title_en: 'Ensure women’s full and effective participation and equal opportunities for leadership.' },
      { code: '5.6', title_id: 'Menjamin akses universal terhadap kesehatan seksual dan reproduksi serta hak-hak reproduksi.', title_en: 'Ensure universal access to sexual and reproductive health and reproductive rights.' }
    ]
  },
  {
    goal_number: 6,
    slug: 'clean-water-and-sanitation',
    name_id: 'Air Bersih dan Sanitasi Layak',
    name_en: 'Clean Water and Sanitation',
    color: '#26BDE2',
    tagline_id:
      'Menjamin Ketersediaan serta Pengelolaan Air Bersih dan Sanitasi yang Berkelanjutan untuk Semua',
    tagline_en:
      'Ensure Availability and Sustainable Management of Water and Sanitation for All',
    description_id:
      'Menjamin ketersediaan serta pengelolaan air bersih dan sanitasi yang berkelanjutan untuk semua. Meliputi akses air minum aman, sanitasi layak, dan pengelolaan sumber daya air yang efisien.',
    description_en:
      'Ensure availability and sustainable management of water and sanitation for all. Covers safe drinking water, adequate sanitation, and efficient water resource management.',
    targets: [
      { code: '6.1', title_id: 'Mencapai akses universal dan merata terhadap air minum yang aman dan terjangkau.', title_en: 'Achieve universal and equitable access to safe and affordable drinking water.' },
      { code: '6.2', title_id: 'Mencapai akses terhadap sanitasi dan kebersihan yang memadai dan merata.', title_en: 'Achieve access to adequate and equitable sanitation and hygiene.' },
      { code: '6.3', title_id: 'Meningkatkan kualitas air dengan mengurangi polusi dan meminimalkan pelepasan bahan berbahaya.', title_en: 'Improve water quality by reducing pollution and minimizing hazardous releases.' },
      { code: '6.4', title_id: 'Meningkatkan efisiensi penggunaan air secara substansial di semua sektor.', title_en: 'Substantially increase water-use efficiency across all sectors.' },
      { code: '6.5', title_id: 'Menerapkan pengelolaan sumber daya air terpadu di semua tingkat.', title_en: 'Implement integrated water resources management at all levels.' },
      { code: '6.6', title_id: 'Melindungi dan memulihkan ekosistem terkait air.', title_en: 'Protect and restore water-related ecosystems.' }
    ]
  },
  {
    goal_number: 7,
    slug: 'affordable-and-clean-energy',
    name_id: 'Energi Bersih dan Terjangkau',
    name_en: 'Affordable and Clean Energy',
    color: '#FCC30B',
    tagline_id:
      'Menjamin Akses Energi yang Terjangkau, Andal, Berkelanjutan dan Modern bagi Semua',
    tagline_en:
      'Ensure Access to Affordable, Reliable, Sustainable and Modern Energy for All',
    description_id:
      'Menjamin akses terhadap energi yang terjangkau, andal, berkelanjutan, dan modern bagi semua. Mendorong energi terbarukan dan peningkatan efisiensi energi.',
    description_en:
      'Ensure access to affordable, reliable, sustainable and modern energy for all. Promotes renewable energy and energy efficiency.',
    targets: [
      { code: '7.1', title_id: 'Menjamin akses universal terhadap layanan energi yang terjangkau, andal, dan modern.', title_en: 'Ensure universal access to affordable, reliable and modern energy services.' },
      { code: '7.2', title_id: 'Meningkatkan secara substansial pangsa energi terbarukan dalam bauran energi global.', title_en: 'Increase substantially the share of renewable energy in the global energy mix.' },
      { code: '7.3', title_id: 'Menggandakan tingkat peningkatan efisiensi energi global.', title_en: 'Double the global rate of improvement in energy efficiency.' },
      { code: '7.a', title_id: 'Memperkuat kerja sama internasional untuk memfasilitasi akses penelitian dan teknologi energi bersih.', title_en: 'Enhance international cooperation to facilitate access to clean energy research and technology.' },
      { code: '7.b', title_id: 'Memperluas infrastruktur dan meningkatkan teknologi untuk memasok layanan energi modern dan berkelanjutan.', title_en: 'Expand infrastructure and upgrade technology for supplying modern and sustainable energy services.' }
    ]
  },
  {
    goal_number: 8,
    slug: 'decent-work-and-economic-growth',
    name_id: 'Pekerjaan Layak dan Pertumbuhan Ekonomi',
    name_en: 'Decent Work and Economic Growth',
    color: '#A21942',
    tagline_id:
      'Mendorong Pertumbuhan Ekonomi yang Inklusif dan Berkelanjutan, Kesempatan Kerja yang Produktif dan Menyeluruh, serta Pekerjaan yang Layak untuk Semua',
    tagline_en:
      'Promote Sustained, Inclusive and Sustainable Economic Growth, Full and Productive Employment and Decent Work for All',
    description_id:
      'Mendorong pertumbuhan ekonomi yang inklusif dan berkelanjutan, kesempatan kerja yang produktif dan menyeluruh, serta pekerjaan yang layak untuk semua.',
    description_en:
      'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.',
    targets: [
      { code: '8.1', title_id: 'Mempertahankan pertumbuhan ekonomi per kapita sesuai kondisi nasional.', title_en: 'Sustain per capita economic growth in accordance with national circumstances.' },
      { code: '8.2', title_id: 'Mencapai tingkat produktivitas ekonomi yang lebih tinggi melalui diversifikasi dan inovasi.', title_en: 'Achieve higher levels of economic productivity through diversification and innovation.' },
      { code: '8.3', title_id: 'Mendorong kebijakan yang mendukung kegiatan produktif, penciptaan lapangan kerja layak, dan UMKM.', title_en: 'Promote policies that support productive activities, decent job creation and MSMEs.' },
      { code: '8.5', title_id: 'Mencapai kesempatan kerja penuh dan produktif serta pekerjaan layak bagi semua.', title_en: 'Achieve full and productive employment and decent work for all.' },
      { code: '8.6', title_id: 'Mengurangi secara substansial proporsi anak muda yang tidak bekerja, bersekolah, atau mengikuti pelatihan.', title_en: 'Substantially reduce the proportion of youth not in employment, education or training.' },
      { code: '8.8', title_id: 'Melindungi hak-hak buruh dan mendorong lingkungan kerja yang aman bagi semua pekerja.', title_en: 'Protect labour rights and promote safe and secure working environments.' }
    ]
  },
  {
    goal_number: 9,
    slug: 'industry-innovation-and-infrastructure',
    name_id: 'Industri, Inovasi dan Infrastruktur',
    name_en: 'Industry, Innovation and Infrastructure',
    color: '#FD6925',
    tagline_id:
      'Membangun Infrastruktur yang Tangguh, Mendorong Industrialisasi yang Inklusif dan Berkelanjutan, serta Mendorong Inovasi',
    tagline_en:
      'Build Resilient Infrastructure, Promote Inclusive and Sustainable Industrialization and Foster Innovation',
    description_id:
      'Membangun infrastruktur yang tangguh, mendorong industrialisasi yang inklusif dan berkelanjutan, serta mendorong inovasi.',
    description_en:
      'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.',
    targets: [
      { code: '9.1', title_id: 'Mengembangkan infrastruktur berkualitas, andal, berkelanjutan, dan tangguh.', title_en: 'Develop quality, reliable, sustainable and resilient infrastructure.' },
      { code: '9.2', title_id: 'Meningkatkan industrialisasi inklusif dan berkelanjutan.', title_en: 'Promote inclusive and sustainable industrialization.' },
      { code: '9.3', title_id: 'Meningkatkan akses industri kecil dan usaha lainnya ke layanan keuangan.', title_en: 'Increase access of small-scale industries to financial services.' },
      { code: '9.4', title_id: 'Meningkatkan infrastruktur dan merehabilitasi industri agar berkelanjutan.', title_en: 'Upgrade infrastructure and retrofit industries to make them sustainable.' },
      { code: '9.5', title_id: 'Meningkatkan penelitian ilmiah dan meningkatkan kemampuan teknologi sektor industri.', title_en: 'Enhance scientific research and upgrade the technological capabilities of industrial sectors.' }
    ]
  },
  {
    goal_number: 10,
    slug: 'reduced-inequalities',
    name_id: 'Berkurangnya Kesenjangan',
    name_en: 'Reduced Inequalities',
    color: '#DD1367',
    tagline_id:
      'Mengurangi Kesenjangan di Dalam dan Antar Negara',
    tagline_en:
      'Reduce Inequality Within and Among Countries',
    description_id:
      'Mengurangi kesenjangan di dalam dan antar negara. Mencakup kesetaraan kesempatan, inklusi sosial-ekonomi-politik, serta kebijakan yang mempromosikan kesetaraan.',
    description_en:
      'Reduce inequality within and among countries. Covers equal opportunity, social-economic-political inclusion, and equality-promoting policies.',
    targets: [
      { code: '10.1', title_id: 'Mencapai dan mempertahankan pertumbuhan pendapatan bagi 40 persen populasi terbawah lebih tinggi dari rata-rata nasional.', title_en: 'Achieve income growth of the bottom 40 per cent of the population at a rate higher than the national average.' },
      { code: '10.2', title_id: 'Memberdayakan dan mendorong inklusi sosial, ekonomi, dan politik bagi semua.', title_en: 'Empower and promote the social, economic and political inclusion of all.' },
      { code: '10.3', title_id: 'Menjamin kesempatan yang setara dan mengurangi kesenjangan hasil.', title_en: 'Ensure equal opportunity and reduce inequalities of outcome.' },
      { code: '10.4', title_id: 'Mengadopsi kebijakan, terutama kebijakan fiskal, upah, dan perlindungan sosial.', title_en: 'Adopt policies, especially fiscal, wage and social protection policies.' },
      { code: '10.7', title_id: 'Memfasilitasi migrasi dan mobilitas orang yang tertib, aman, teratur, dan bertanggung jawab.', title_en: 'Facilitate orderly, safe, regular and responsible migration and mobility of people.' }
    ]
  },
  {
    goal_number: 11,
    slug: 'sustainable-cities-and-communities',
    name_id: 'Kota dan Permukiman yang Berkelanjutan',
    name_en: 'Sustainable Cities and Communities',
    color: '#FD9D24',
    tagline_id:
      'Menjadikan Kota dan Permukiman Inklusif, Aman, Tangguh, dan Berkelanjutan',
    tagline_en:
      'Make Cities and Human Settlements Inclusive, Safe, Resilient and Sustainable',
    description_id:
      'Menjadikan kota dan permukiman inklusif, aman, tangguh, dan berkelanjutan. Meliputi perumahan layak, transportasi, ruang publik, serta pengelolaan risiko bencana.',
    description_en:
      'Make cities and human settlements inclusive, safe, resilient and sustainable. Covers housing, transport, public spaces, and disaster risk management.',
    targets: [
      { code: '11.1', title_id: 'Menjamin akses bagi semua terhadap perumahan yang layak, aman, dan terjangkau.', title_en: 'Ensure access for all to adequate, safe and affordable housing.' },
      { code: '11.2', title_id: 'Menyediakan akses ke sistem transportasi yang aman, terjangkau, mudah diakses, dan berkelanjutan.', title_en: 'Provide access to safe, affordable, accessible and sustainable transport systems.' },
      { code: '11.3', title_id: 'Meningkatkan urbanisasi inklusif dan berkelanjutan serta kapasitas perencanaan.', title_en: 'Enhance inclusive and sustainable urbanization and planning capacity.' },
      { code: '11.4', title_id: 'Memperkuat upaya melindungi dan menjaga warisan budaya dan alam dunia.', title_en: 'Strengthen efforts to protect and safeguard the world’s cultural and natural heritage.' },
      { code: '11.5', title_id: 'Mengurangi jumlah kematian dan jumlah orang terdampak, serta mengurangi kerugian ekonomi terkait bencana.', title_en: 'Significantly reduce the number of deaths and people affected by disasters.' },
      { code: '11.6', title_id: 'Mengurangi dampak lingkungan kota per kapita yang merugikan.', title_en: 'Reduce the adverse per capita environmental impact of cities.' },
      { code: '11.7', title_id: 'Menyediakan akses universal ke ruang publik yang aman, inklusif, dan mudah diakses.', title_en: 'Provide universal access to safe, inclusive and accessible public spaces.' }
    ]
  },
  {
    goal_number: 12,
    slug: 'responsible-consumption-and-production',
    name_id: 'Konsumsi dan Produksi yang Bertanggung Jawab',
    name_en: 'Responsible Consumption and Production',
    color: '#BF8B2E',
    tagline_id:
      'Menjamin Pola Produksi dan Konsumsi yang Berkelanjutan',
    tagline_en:
      'Ensure Sustainable Consumption and Production Patterns',
    description_id:
      'Menjamin pola konsumsi dan produksi yang berkelanjutan. Mendorong efisiensi sumber daya, pengurangan limbah, dan praktik bisnis yang bertanggung jawab.',
    description_en:
      'Ensure sustainable consumption and production patterns. Promotes resource efficiency, waste reduction, and responsible business practices.',
    targets: [
      { code: '12.1', title_id: 'Menerapkan Kerangka Kerja 10 Tahun Program tentang Konsumsi dan Produksi Berkelanjutan.', title_en: 'Implement the 10-Year Framework of Programmes on Sustainable Consumption and Production.' },
      { code: '12.2', title_id: 'Mencapai pengelolaan berkelanjutan dan penggunaan sumber daya alam yang efisien.', title_en: 'Achieve the sustainable management and efficient use of natural resources.' },
      { code: '12.3', title_id: 'Mengurangi separuh limbah pangan per kapita global di tingkat ritel dan konsumen.', title_en: 'Halve per capita global food waste at the retail and consumer levels.' },
      { code: '12.4', title_id: 'Mencapai pengelolaan bahan kimia dan semua limbah yang ramah lingkungan.', title_en: 'Achieve the environmentally sound management of chemicals and all wastes.' },
      { code: '12.5', title_id: 'Mengurangi secara substansial timbulan limbah melalui pencegahan, pengurangan, daur ulang, dan penggunaan kembali.', title_en: 'Substantially reduce waste generation through prevention, reduction, recycling and reuse.' },
      { code: '12.8', title_id: 'Memastikan bahwa orang di mana pun memiliki informasi dan kesadaran untuk gaya hidup berkelanjutan.', title_en: 'Ensure that people everywhere have the relevant information and awareness for sustainable lifestyles.' }
    ]
  },
  {
    goal_number: 13,
    slug: 'climate-action',
    name_id: 'Penanganan Perubahan Iklim',
    name_en: 'Climate Action',
    color: '#3F7E44',
    tagline_id:
      'Mengambil Tindakan Cepat untuk Mengatasi Perubahan Iklim dan Dampaknya',
    tagline_en:
      'Take Urgent Action to Combat Climate Change and Its Impacts',
    description_id:
      'Mengambil tindakan segera untuk memerangi perubahan iklim dan dampaknya. Mencakup ketahanan dan kemampuan adaptasi serta integrasi langkah iklim ke dalam kebijakan.',
    description_en:
      'Take urgent action to combat climate change and its impacts. Covers resilience, adaptive capacity, and integrating climate measures into policies.',
    targets: [
      { code: '13.1', title_id: 'Memperkuat ketahanan dan kapasitas adaptasi terhadap bahaya terkait iklim dan bencana alam.', title_en: 'Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters.' },
      { code: '13.2', title_id: 'Mengintegrasikan langkah-langkah perubahan iklim ke dalam kebijakan, strategi, dan perencanaan nasional.', title_en: 'Integrate climate change measures into national policies, strategies and planning.' },
      { code: '13.3', title_id: 'Meningkatkan pendidikan, kesadaran, serta kapasitas manusia dan kelembagaan terkait mitigasi dan adaptasi perubahan iklim.', title_en: 'Improve education, awareness-raising and human and institutional capacity on climate change.' },
      { code: '13.a', title_id: 'Melaksanakan komitmen yang diambil oleh negara maju terhadap pendanaan iklim.', title_en: 'Implement the commitment undertaken by developed-country parties on climate finance.' },
      { code: '13.b', title_id: 'Mendorong mekanisme untuk meningkatkan kapasitas perencanaan dan pengelolaan terkait perubahan iklim di negara kurang berkembang.', title_en: 'Promote mechanisms for raising capacity for effective climate change-related planning and management.' }
    ]
  },
  {
    goal_number: 14,
    slug: 'life-below-water',
    name_id: 'Ekosistem Lautan',
    name_en: 'Life Below Water',
    color: '#0A97D9',
    tagline_id:
      'Melestarikan dan Memanfaatkan Secara Berkelanjutan Sumber Daya Kelautan dan Samudra untuk Pembangunan Berkelanjutan',
    tagline_en:
      'Conserve and Sustainably Use the Oceans, Seas and Marine Resources for Sustainable Development',
    description_id:
      'Melestarikan dan memanfaatkan secara berkelanjutan sumber daya kelautan dan samudra untuk pembangunan berkelanjutan.',
    description_en:
      'Conserve and sustainably use the oceans, seas and marine resources for sustainable development.',
    targets: [
      { code: '14.1', title_id: 'Mencegah dan mengurangi secara signifikan segala jenis pencemaran laut.', title_en: 'Prevent and significantly reduce marine pollution of all kinds.' },
      { code: '14.2', title_id: 'Mengelola dan melindungi ekosistem laut dan pesisir secara berkelanjutan.', title_en: 'Sustainably manage and protect marine and coastal ecosystems.' },
      { code: '14.3', title_id: 'Meminimalkan dan mengatasi dampak pengasaman laut.', title_en: 'Minimize and address the impacts of ocean acidification.' },
      { code: '14.4', title_id: 'Mengatur secara efektif panen dan menghentikan penangkapan berlebih serta praktik penangkapan yang merusak.', title_en: 'Effectively regulate harvesting and end overfishing and destructive fishing practices.' },
      { code: '14.5', title_id: 'Melestarikan setidaknya 10 persen wilayah pesisir dan laut.', title_en: 'Conserve at least 10 per cent of coastal and marine areas.' }
    ]
  },
  {
    goal_number: 15,
    slug: 'life-on-land',
    name_id: 'Ekosistem Daratan',
    name_en: 'Life on Land',
    color: '#56C02B',
    tagline_id:
      'Melindungi, Memulihkan, dan Meningkatkan Pemanfaatan Berkelanjutan Ekosistem Daratan',
    tagline_en:
      'Protect, Restore and Promote Sustainable Use of Terrestrial Ecosystems',
    description_id:
      'Melindungi, memulihkan, dan mendorong pemanfaatan berkelanjutan ekosistem daratan, mengelola hutan secara lestari, memerangi penggurunan, serta menghentikan kehilangan keanekaragaman hayati.',
    description_en:
      'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt biodiversity loss.',
    targets: [
      { code: '15.1', title_id: 'Memastikan konservasi, pemulihan, dan pemanfaatan berkelanjutan ekosistem daratan dan air tawar daratan.', title_en: 'Ensure the conservation, restoration and sustainable use of terrestrial and inland freshwater ecosystems.' },
      { code: '15.2', title_id: 'Mendorong pelaksanaan pengelolaan hutan secara berkelanjutan.', title_en: 'Promote the implementation of sustainable management of all types of forests.' },
      { code: '15.3', title_id: 'Memerangi penggurunan, memulihkan lahan dan tanah terdegradasi.', title_en: 'Combat desertification, restore degraded land and soil.' },
      { code: '15.5', title_id: 'Mengambil tindakan segera untuk mengurangi degradasi habitat alami dan menghentikan hilangnya keanekaragaman hayati.', title_en: 'Take urgent action to reduce the degradation of natural habitats and halt biodiversity loss.' },
      { code: '15.9', title_id: 'Mengintegrasikan nilai ekosistem dan keanekaragaman hayati ke dalam perencanaan nasional dan lokal.', title_en: 'Integrate ecosystem and biodiversity values into national and local planning.' }
    ]
  },
  {
    goal_number: 16,
    slug: 'peace-justice-and-strong-institutions',
    name_id: 'Perdamaian, Keadilan dan Kelembagaan yang Tangguh',
    name_en: 'Peace, Justice and Strong Institutions',
    color: '#00689D',
    tagline_id:
      'Menguatkan Masyarakat yang Damai dan Inklusif untuk Pembangunan Berkelanjutan',
    tagline_en:
      'Promote Peaceful and Inclusive Societies for Sustainable Development',
    description_id:
      'Menguatkan masyarakat yang damai dan inklusif untuk pembangunan berkelanjutan, menyediakan akses terhadap keadilan bagi semua, serta membangun lembaga yang efektif, akuntabel, dan inklusif.',
    description_en:
      'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions.',
    targets: [
      { code: '16.1', title_id: 'Mengurangi secara signifikan segala bentuk kekerasan dan angka kematian terkait di mana pun.', title_en: 'Significantly reduce all forms of violence and related death rates everywhere.' },
      { code: '16.3', title_id: 'Mendorong rule of law di tingkat nasional dan internasional serta menjamin akses yang setara terhadap keadilan.', title_en: 'Promote the rule of law and ensure equal access to justice for all.' },
      { code: '16.5', title_id: 'Mengurangi secara substansial korupsi dan penyuapan dalam segala bentuknya.', title_en: 'Substantially reduce corruption and bribery in all their forms.' },
      { code: '16.6', title_id: 'Mengembangkan lembaga yang efektif, akuntabel, dan transparan di semua tingkat.', title_en: 'Develop effective, accountable and transparent institutions at all levels.' },
      { code: '16.7', title_id: 'Memastikan pengambilan keputusan yang responsif, inklusif, partisipatif, dan representatif.', title_en: 'Ensure responsive, inclusive, participatory and representative decision-making.' },
      { code: '16.10', title_id: 'Menjamin akses publik terhadap informasi dan melindungi kebebasan fundamental.', title_en: 'Ensure public access to information and protect fundamental freedoms.' }
    ]
  },
  {
    goal_number: 17,
    slug: 'partnerships-for-the-goals',
    name_id: 'Kemitraan untuk Mencapai Tujuan',
    name_en: 'Partnerships for the Goals',
    color: '#19486A',
    tagline_id:
      'Menguatkan Sarana Pelaksanaan dan Merevitalisasi Kemitraan Global untuk Pembangunan Berkelanjutan',
    tagline_en:
      'Strengthen the Means of Implementation and Revitalize the Global Partnership for Sustainable Development',
    description_id:
      'Menguatkan sarana pelaksanaan dan merevitalisasi kemitraan global untuk pembangunan berkelanjutan. Meliputi keuangan, teknologi, peningkatan kapasitas, perdagangan, dan kerja sama multi-pemangku kepentingan.',
    description_en:
      'Strengthen the means of implementation and revitalize the global partnership for sustainable development. Covers finance, technology, capacity-building, trade and multi-stakeholder partnerships.',
    targets: [
      { code: '17.1', title_id: 'Memperkuat mobilisasi sumber daya domestik untuk meningkatkan kapasitas penerimaan pajak dan pendapatan lainnya.', title_en: 'Strengthen domestic resource mobilization to improve capacity for tax and other revenue collection.' },
      { code: '17.3', title_id: 'Memobilisasi sumber daya keuangan tambahan untuk negara berkembang dari berbagai sumber.', title_en: 'Mobilize additional financial resources for developing countries from multiple sources.' },
      { code: '17.6', title_id: 'Meningkatkan kerja sama Utara-Selatan, Selatan-Selatan, dan kerja sama triangular terkait teknologi.', title_en: 'Enhance North-South, South-South and triangular regional and international cooperation on technology.' },
      { code: '17.9', title_id: 'Meningkatkan dukungan internasional untuk implementasi penguatan kapasitas yang efektif dan tertarget di negara berkembang.', title_en: 'Enhance international support for implementing effective and targeted capacity-building in developing countries.' },
      { code: '17.16', title_id: 'Meningkatkan kemitraan global untuk pembangunan berkelanjutan.', title_en: 'Enhance the global partnership for sustainable development.' },
      { code: '17.17', title_id: 'Mendorong dan mempromosikan kemitraan publik, publik-swasta, dan masyarakat sipil yang efektif.', title_en: 'Encourage and promote effective public, public-private and civil society partnerships.' }
    ]
  }
]

const bySlug = new Map(sdgsLocalContent.map(g => [g.slug, g]))
const byNumber = new Map(sdgsLocalContent.map(g => [g.goal_number, g]))

export function getSdgLocalBySlug(slug: string): SdgLocalContent | undefined {
  return bySlug.get(slug)
}

export function getSdgLocalByNumber(num: number): SdgLocalContent | undefined {
  return byNumber.get(num)
}
