// Customer-facing booking terms shown on the booking page. Localized (HY primary).
// Condensed from the company's full Terms (prepayment, cancellation, group-excursion rules).
import type { Localized } from './tours';

export const DEPOSIT_PCT = 20;

export const BOOKING_TERMS: {
  heading: Localized;
  prepaymentTitle: Localized;
  prepayment: Localized;
  cancellationTitle: Localized;
  cancellation: Localized;
  rulesTitle: Localized;
  rules: Localized[];
} = {
  heading: { ru: 'Условия и важная информация', hy: 'Պայմաններ և կարևոր տեղեկություն', en: 'Terms & important info' },

  prepaymentTitle: { ru: 'Предоплата', hy: 'Կանխավճար', en: 'Prepayment' },
  prepayment: {
    ru: 'Для бронирования достаточно оплатить 20% от стоимости тура. Остаток оплачивается в день начала тура.',
    hy: 'Ամրագրման համար բավական է վճարել տուրի արժեքի 20%-ը։ Մնացածը վճարվում է տուրի սկսվելու օրը։',
    en: 'A 20% deposit confirms your booking. The balance is paid on the tour day.',
  },

  cancellationTitle: { ru: 'Условия отмены', hy: 'Չեղարկման պայմաններ', en: 'Cancellation' },
  cancellation: {
    ru: 'При отмене за 48 часов до начала оплаченная сумма возвращается. При более поздней отмене или неявке 20% возврату не подлежат.',
    hy: 'Մեկնարկից 48 ժամ առաջ չեղարկելու դեպքում վճարված գումարը վերադարձվում է։ Ավելի ուշ չեղարկման կամ չներկայանալու դեպքում 20%-ը չի վերադարձվում։',
    en: 'Cancel at least 48 hours before the start for a full refund. For later cancellation or a no-show, the 20% deposit is non-refundable.',
  },

  rulesTitle: { ru: 'Групповые экскурсии', hy: 'Խմբակային էքսկուրսիաներ', en: 'Group excursions' },
  rules: [
    {
      ru: 'Сбор в головном офисе ({office}) не позднее чем за 30 минут до отправления.',
      hy: 'Հավաքը գլխավոր գրասենյակում ({office})՝ մեկնումից առնվազն 30 րոպե առաջ։',
      en: 'Meet at the head office ({office}) at least 30 minutes before departure.',
    },
    {
      ru: 'Продолжительность экскурсии может отличаться до 10% от заявленной.',
      hy: 'Էքսկուրսիայի տևողությունը կարող է տարբերվել նշվածից մինչև 10%-ով։',
      en: 'The excursion length may vary by up to 10% from the stated time.',
    },
    {
      ru: 'Удобная, предпочтительно закрытая обувь; тёплая одежда (в горах прохладнее, чем в Ереване).',
      hy: 'Հարմարավետ, ցանկալի է փակ կոշիկ; տաք հագուստ (լեռներում ավելի զով է, քան Երևանում)։',
      en: 'Comfortable, preferably closed shoes; warm clothing (the mountains are cooler than Yerevan).',
    },
    {
      ru: 'При посещении храма — закрытая одежда; женщинам желательно покрыть голову.',
      hy: 'Տաճար այցելելիս՝ փակ հագուստ; կանանց ցանկալի է ծածկել գլուխը։',
      en: 'At monasteries wear modest clothing; women are advised to cover their heads.',
    },
    {
      ru: 'Места в транспорте заранее не бронируются. Домашних питомцев брать нельзя.',
      hy: 'Տրանսպորտում տեղերը նախապես չեն ամրագրվում։ Ընտանի կենդանիներ չի կարելի տանել։',
      en: 'Seats are not reserved in advance. Pets are not allowed.',
    },
  ],
};
