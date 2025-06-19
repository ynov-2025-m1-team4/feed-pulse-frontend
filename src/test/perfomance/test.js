import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 50, // utilisateurs virtuels
  duration: '30s', // durée du test
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const res = http.get('http://10.92.4.249:3000/Dashboard'); // page Next.js à tester
  check(res, {
    'status est 200': (r) => r.status === 200,
    'temps de réponse < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1); // pause entre les requêtes
}
