delete from public.tours where title_ru like 'Тест-тур%';

insert into public.tours
  (title_hy,title_ru,title_en, description_hy,description_ru,description_en,
   location_hy,location_ru,location_en, category,country,date_start,price,max_seats,booked_seats,language,is_active)
values
('Ժայռափոր վանքեր','Монастыри в скалах','Monasteries of the Cliffs',
 'Ամբողջ օր Ազատ գետի հովտով՝ հայոց երկու հազարամյա պատմության հետքերով — հելլենիստական տաճարից մինչև ժայռի մեջ փորված դահլիճներ. Հարմարավետ տրանսպորտ, փորձառու ուղեկցորդ և լեռնային գյուղում ճաշ ներառված են.',
 'Полный день по долине Азат через две тысячи лет армянской истории — от эллинистического храма до залов, высеченных в живой скале. Комфортный транспорт, опытный гид и обед в горном селе включены.',
 'A full day through the Azat valley, tracing two thousand years of Armenian history — from a Hellenistic temple to chambers carved deep into living rock. Comfortable transport, an expert guide, and lunch in a mountain village are included.',
 'Գեղարդ · Գառնի','Гегард · Гарни','Geghard · Garni','cultural','am','2026-06-20T08:00:00+04:00',18500,18,14,'all',true),

('Սևանա լիճ և Սևանավանք','Озеро Севан и Севанаванк','Lake Sevan & Sevanavank',
 'Հայաստանի կապույտ սիրտը — օր բարձրլեռնային լճի ափին, թերակղզու վանք և թարմ սևանի իշխան ճաշին.',
 'Голубое сердце Армении — день на берегу высокогорного озера, монастырь на полуострове и свежая севанская форель на обед.',
 'The blue heart of Armenia — a day on the shores of the highland lake, with a peninsula monastery and fresh Sevan trout for lunch.',
 'Գեղարքունիք','Гехаркуник','Gegharkunik','classic','am','2026-06-26T08:00:00+04:00',14000,18,12,'all',true),

('Տաթև և Թևեր','Татев и Крылья','Tatev & the Wings',
 'Հայաստանի խորը հարավը՝ ուղևորություն աշխարհի ամենաերկար ճոպանուղով դեպի Որոտանի կիրճի եզրին գտնվող վանք.',
 'Глубокий юг Армении: поездка на самой длинной в мире реверсивной канатной дороге к монастырю на краю ущелья Воротан.',
 'The deep south of Armenia: a ride on the world''s longest reversible cable car to a cliff-edge monastery above the Vorotan gorge.',
 'Սյունիք · ճոպանուղի','Сюник · канатка','Syunik · cable car','premium','am','2026-07-03T08:00:00+04:00',24000,18,7,'all',true),

('Դիլիջանի անտառային արահետներ','Лесные тропы Дилижана','Dilijan Forest Trails',
 'Հայկական «փոքրիկ Շվեյցարիան»՝ անտառապատ բլուրներ, հանգիստ լիճ և 11-րդ դարի վանք հաճարենու անտառում.',
 'Армянская «маленькая Швейцария»: лесистые холмы, тихое озеро и монастырь XI века в буковом лесу.',
 'Armenia''s "little Switzerland": forested hills, a still lake and an 11th-century monastery hidden in the beech woods.',
 'Տավուշ','Тавуш','Tavush','nature','am','2026-07-11T08:00:00+04:00',16500,18,15,'all',true),

('Թբիլիսիի հին քաղաք','Старый Тбилиси','Tbilisi Old Town',
 'Երկօրյա անդրսահմանային ճանապարհորդություն Վրաստանի մայրաքաղաք՝ ծծմբային բաղնիքներ, պատշգամբներով հին փողոցներ և վրացական գինի. Վերցրե՛ք անձնագիրը — Բագրատաշեն–Սադախլո սահմանն անցնում ենք միասին.',
 'Двухдневная поездка через границу в столицу Грузии: серные бани, старые улочки с балконами и грузинское вино. Возьмите паспорт — границу Баграташен–Садахло проходим вместе.',
 'A two-day cross-border escape to the Georgian capital: sulphur baths, balconied old streets and Georgian wine. Bring your passport — we cross the Bagratashen–Sadakhlo border together.',
 'Վրաստան · 2 օր','Грузия · 2 дня','Georgia · 2 days','border','ge','2026-07-18T08:00:00+04:00',42000,18,10,'all',true),

('Խոր Վիրապ և Արարատի տեսարան','Хор Вирап и вид на Арарат','Khor Virap & Ararat View',
 'Հայաստանի բացիկային տեսարանը՝ վանք դաշտում Արարատի ֆոնին, ավարտը՝ համտես ընտանեկան գինետանը.',
 'Открыточный вид Армении: монастырь на равнине на фоне Арарата, в завершение — дегустация на семейной винодельне.',
 'The postcard view of Armenia: a monastery on the plain with Mount Ararat filling the sky, finished with a tasting at a family winery.',
 'Արարատյան դաշտ','Араратская долина','Ararat plain','classic','am','2026-07-25T08:00:00+04:00',12000,18,9,'all',true);
