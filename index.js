const wsOauth = (function () {
    async function authorize(client_id, client_secret, token_url) {
        // check  if the id, client secret and a url are provided
        if (client_id && client_secret && token_url) {
            // check if the querystring contains a parameter with a code
            // only execute the remainging functions if that code was found
            const checkCode = new URLSearchParams(window.location.search).get('code');
            if (checkCode) {
                // url: 'https://www.strava.com/oauth/token'
                // create a POST request, passing the client id, client secret and code to the url for the token
                const response = await fetch(token_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({client_id, client_secret, code: checkCode, grant_type: 'authorization_code'})
                })
                const token = await response.json();
                console.log(token);

                // return only the access_token
                return token.access_token;
            } else {
                console.log('no code found in url yet');
                return;
            }
        } else {
            console.log('please provide a client id, client secret and a url to get the token')
            return;
        }
    }

    async function call_endpoint(endpoint_url, token) {
        // check strava documentation for endpoints: https://developers.strava.com/docs/reference/
        const response = await fetch(endpoint_url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        const data = await response.json();
        console.log(data);
        return data;
    }



    return {
        authorize,
        call_endpoint

    }

})();
