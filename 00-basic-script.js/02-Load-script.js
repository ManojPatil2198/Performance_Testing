import http from 'k6/http'
import { sleep } from 'k6';

export const options = {
    stages: [
        {
            duration: "10s",
            target: 10,  // 10 VUs
        },
        {
            duration: "30s",
            target: 10,  // 10 VUs
        },
        {
            duration: "10s",
            target: 0,  // 0 VUs
        }
    ]
};

export default function (){
    http.get('https://test.k6.io');
    sleep(1); 
    http.get('https://test.k6io./contacts.php');
    sleep(2); 
    http.get('https://test.k6.io/news.php');
    sleep(2); 
}