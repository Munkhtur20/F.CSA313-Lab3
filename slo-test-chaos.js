import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 20,
    duration: '2m',
};

export default function () {
    const base = 'http://localhost:3000';

    const cart = http.post(`${base}/cart/add`, null, {
        tags: { name: 'cart' },
    });

    check(cart, {
        'cart available': (r) => r.status === 200,
    }, { service: 'cart' });

    const report = http.get(`${base}/report`, {
        tags: { name: 'report' },
    });

    check(report, {
        'report status 200': (r) => r.status === 200,
    });

    const pay = http.post(`${base}/pay`, null, {
        tags: { name: 'pay' },
    });

    check(pay, {
        'pay status 200': (r) => r.status === 200,
    });

    sleep(1);
}
