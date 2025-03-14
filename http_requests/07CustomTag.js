import http from 'k6/http'

export const options = {
    duration : '10s',
    thresholds : {
        http_req_duration : ['p(95)<200'],
        'http_req_duration{status:200}' : ['p(95)<300'],
        'http_req_duration{testTag:customTag}' : ['p(95)<200'],
        'http_req_duration{testTag:delayedTag}' : ['p(95)<200'],
        'http_req_duration{status:201}' : ['p(95)<200']
    }
}

export default function(){
    http.get('https://run.mocky.io/v3/917c3927-9031-4110-9d26-c4859276378a',{
        tags: {
            testTag: "customTag"
        }
    });
    http.get('https://run.mocky.io/v3/e00a58ff-07fb-4ade-a09d-1702f568edee?mocky-delay=1000ms',{
        tags: {
            testTag: "delayedTag"
        }
    });
}