import http from 'k6/http'
import {check} from 'k6'

export default function(){
    let payload = {
        username:"croco"+ Date.now(),
        password: "test"
    }

    let param = {
        headers :{ 'Content-Type':'application/json'}
    }

    let registrationUrl ='https://test-api.k6.io/user/register/'
    let getTokenUrl ='https://test-api.k6.io/auth/token/login/'
    let privateCrocoUrl ='https://test-api.k6.io/my/crocodiles/'

    let res = http.post(
        registrationUrl, 
        JSON.stringify(payload), 
        param
    )

    check(res,{
        'Valiadate Status': (r) => r.status === 201
    })

    let resTokens = http.post(
        getTokenUrl, 
        JSON.stringify(payload), 
        param
    )
    
    let tokens = resTokens.json()
    const accessToken = tokens.access
    const refreshToken = tokens.refresh

    let params = {headers:{Authorization: `Bearer ${accessToken}`}}

    let getPrivateCroco = http.get(privateCrocoUrl, params)

    // console.log("Both Tokens", tokens)
    // console.log("refresh", refreshToken)
    console.log("access", accessToken)
    console.log("getPrivateCroco", getPrivateCroco.json())
}