import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 20,
    duration: '1m',

    thresholds: {
        'http_req_duration{name:report}': ['p(95)<100'],
    },
};

export default function () {
    const report = http.get('http://localhost:3000/report', {
        tags: { name: 'report' },
    });

    check(report, {
        'report status 200': (r) => r.status === 200,
    });

    sleep(1);
}
