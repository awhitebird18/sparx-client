const quotes = [
  "Dreams don't work unless you do. - John C. Maxwell",
  'Do it with passion or not at all. - Rosa Nouchette Carey',
  'Study hard, dream big, stay focused.',
  'The secret of getting ahead is getting started. - Mark Twain',
  'Success is the sum of small efforts, repeated. - R. Collier',
  'Knowledge is power. - Francis Bacon',
  'Don`t wish it were easier. Wish you were better. - Jim Rohn',
  'Push yourself, because no one else is going to do it for you.',
  'Failure is the opportunity to begin again more intelligently. - Henry Ford',
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill',
  'Learn as if you will live forever. - Mahatma Gandhi',
  "Hard work beats talent when talent doesn't work hard. - Tim Notke",
  'The best way to predict your future is to create it. - Abraham Lincoln',
  'Procrastination makes easy things hard, hard things harder. - Mason Cooley',
];

export const getQuote = () => quotes[Math.floor(Math.random() * quotes.length)];
