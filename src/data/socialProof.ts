/**
 * Social-proof numbers shown across the site.
 *
 * Source of truth: the public Topmate profile (https://topmate.io/gauravkhurana).
 * Update these together whenever the profile numbers move — every page reads
 * from here so the site never quotes two different figures.
 */
export const TOPMATE_RATING = '5/5';
export const TOPMATE_RATING_COUNT = 83;
export const TOPMATE_BOOKINGS = 350;
export const TOPMATE_TESTIMONIALS = 78;

export const topmateStats = [
  {value: TOPMATE_RATING, label: `average rating from ${TOPMATE_RATING_COUNT} ratings`},
  {value: `${TOPMATE_BOOKINGS}+`, label: 'sessions & courses booked'},
  {value: `${TOPMATE_TESTIMONIALS}`, label: 'written testimonials'},
];
