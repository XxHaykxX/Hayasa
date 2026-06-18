insert into public.stops
  (tour_id, order_index, name_hy,name_ru,name_en, description_hy,description_ru,description_en, latitude, longitude)
select t.id, s.ord, s.nh, s.nr, s.ne, s.dh, s.dr, s.de, s.lat, s.lng
from public.tours t
join (values
  ('Monasteries of the Cliffs',0,'Գառնիի տաճար','Храм Гарни','Garni Temple','Տարածաշրջանի միակ կանգուն հունահռոմեական սյունազարդ տաճարը՝ Ազատի կիրճի վրա.','Единственный сохранившийся греко-римский колоннадный храм в регионе, над ущельем Азат.','The only standing Greco-Roman colonnaded temple in the region, perched above the Azat gorge.',40.1122,44.7300),
  ('Monasteries of the Cliffs',1,'Քարերի սիմֆոնիա','Симфония камней','Symphony of Stones','Կարճ զբոսանք կիրճով դեպի վեցանկյուն բազալտե հսկա սյուները.','Короткая прогулка по каньону к гигантским шестигранным базальтовым колоннам.','A short walk down the canyon to towering hexagonal basalt columns.',40.1156,44.7228),
  ('Monasteries of the Cliffs',2,'Գեղարդի վանք','Монастырь Гегард','Geghard Monastery','Ժայռի մեջ փորված եկեղեցիներ՝ ՅՈՒՆԵՍԿՕ-ի ժառանգություն. Ճաշ գյուղում.','Вырубленные в скале церкви — объект ЮНЕСКО. Обед в селе.','Rock-hewn churches carved into the cliff — a UNESCO World Heritage site. Lunch in the village.',40.1408,44.8181),

  ('Lake Sevan & Sevanavank',0,'Սևանավանք','Севанаванк','Sevanavank','9-րդ դարի վանք թերակղզու վրա՝ լճի համայնապատկերով.','Монастырь IX века на полуострове с панорамой озера.','Ninth-century monastery on a peninsula with sweeping lake views.',40.5667,45.0119),
  ('Lake Sevan & Sevanavank',1,'Սևանի ափ','Берег Севана','Sevan Shore','Ազատ ժամանակ լողափին և ճաշ ջրի ափին.','Свободное время на пляже и обед у воды.','Free time on the beach and a lakeside lunch.',40.5500,45.0200),
  ('Lake Sevan & Sevanavank',2,'Հայրավանք','Айраванк','Hayravank','Հանգիստ միջնադարյան եկեղեցի արևմտյան ափի վրա.','Тихая средневековая церковь над западным берегом.','A quiet medieval church above the western shore.',40.3611,45.1042),

  ('Tatev & the Wings',0,'Տաթևի թևեր','Крылья Татева','Wings of Tatev','5,7 կմ ճոպանուղի Որոտանի կիրճի վրայով.','Канатная дорога 5,7 км над ущельем Воротан.','5.7 km cable car gliding over the Vorotan gorge.',39.4117,46.2406),
  ('Tatev & the Wings',1,'Տաթևի վանք','Монастырь Татев','Tatev Monastery','9-րդ դարի վանական համալիր բազալտե սարահարթին.','Монастырский комплекс IX века на базальтовом плато.','Ninth-century monastic complex on a basalt plateau.',39.3793,46.2503),
  ('Tatev & the Wings',2,'Սատանի կամուրջ','Чёртов мост','Devil''s Bridge','Բնական տրավերտինե կամուրջ և տաք հանքային աղբյուրներ.','Природный травертиновый мост и тёплые минеральные источники.','Natural travertine bridge and warm mineral springs.',39.4019,46.2486),

  ('Dilijan Forest Trails',0,'Հին Դիլիջան','Старый Дилижан','Dilijan Old Town','Վերականգնված Շարամբեյան արհեստների փողոցը.','Восстановленная улица ремёсел Шарамбеян.','Restored Sharambeyan street of craft workshops.',40.7406,44.8628),
  ('Dilijan Forest Trails',1,'Պարզ լիճ','Озеро Парз','Parz Lake','Մաքուր անտառային լիճ՝ զբոսանքի և բացօթյա ճաշի համար.','Прозрачное лесное озеро для прогулки и пикника.','A clear forest lake, perfect for a walk and a picnic.',40.7831,44.9519),
  ('Dilijan Forest Trails',2,'Հաղարծին վանք','Монастырь Агарцин','Haghartsin Monastery','11–13-րդ դարերի վանք հաճարենու անտառի խորքում.','Монастырь XI–XIII веков в глубине букового леса.','11th–13th-century monastery deep in the beech forest.',40.7939,44.9286),

  ('Tbilisi Old Town',0,'Նարիկալա ամրոց','Крепость Нарикала','Narikala Fortress','Բլրի ամրոց՝ հին Թբիլիսիի լավագույն տեսարանով.','Крепость на холме с лучшим видом на старый Тбилиси.','Hilltop fortress with the best view over old Tbilisi.',41.6877,44.8092),
  ('Tbilisi Old Town',1,'Աբանոթուբանի բաղնիքներ','Бани Абанотубани','Abanotubani Baths','Պատմական գմբեթավոր ծծմբային բաղնիքներ հին թաղամասում.','Исторические купольные серные бани в старом квартале.','Historic domed sulphur bathhouses in the old quarter.',41.6892,44.8089),
  ('Tbilisi Old Town',2,'Խաղաղության կամուրջ','Мост Мира','Bridge of Peace','Ապակե կամուրջ Մթկվարիի վրայով և ընթրիք գինու համտեսով.','Стеклянный мост через Куру и ужин с дегустацией вина.','Glass footbridge over the Kura, then a wine-tasting dinner.',41.6916,44.8089),

  ('Khor Virap & Ararat View',0,'Խոր Վիրապ վանք','Монастырь Хор Вирап','Khor Virap Monastery','Արարատին ամենամոտ կետը՝ հայտնի խոր փոսով.','Ближайшая к Арарату точка, со знаменитой глубокой ямой.','The closest point to Ararat, with the famous deep pit.',39.8783,44.5747),
  ('Khor Virap & Ararat View',1,'Արարատի դիտակետ','Смотровая на Арарат','Ararat Viewpoint','Բաց դաշտ՝ երկգագաթ լեռան անարգել տեսարանով.','Открытая равнина с видом на двуглавую вершину.','Open plain with an unobstructed view of the twin peaks.',39.8850,44.5800),
  ('Khor Virap & Ararat View',2,'Ընտանեկան գինետուն','Семейная винодельня','Family Winery','Արենիի գինիների համտես հյուրընկալ ընտանիքի հետ.','Дегустация вин Арени с принимающей семьёй.','Tasting of Areni wines with the host family.',39.9000,44.6000)
) as s(tour_en, ord, nh, nr, ne, dh, dr, de, lat, lng)
on s.tour_en = t.title_en;
