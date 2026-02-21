import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  
  vus: 40, 
  duration: '1m',
};

export default function () {
  const url = 'http://209.38.6.248/api/tasks'; 
  const payload = JSON.stringify({
    title: `Tarea generada por k6 - ${Math.random()}`,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  
  check(res, {
    'status es 201': (r) => r.status === 201,
  });

  sleep(0.1);
}

