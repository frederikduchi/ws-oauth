const wsOauth = (function(){
    async function getToken(code,client_id, client_secret) {
        const requestBody = {
            client_id: client_id,
            client_secret: client_secret,
            code: code,
            grant_type: 'authorization_code'
        };

        console.log(requestBody);

        const response = await fetch('https://www.strava.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        const token = await response.json();
        console.log(token);
        getData(token.access_token);
    }

    async function getData(token) {
        const response = await fetch('https://www.strava.com/api/v3/athlete/activities', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        const activities = await response.json();
        console.log(activities);
    }

    function init(client_id, client_secret){
        // check  if the id and secret are provided
        if(client_id && client_secret){
            // check if the querystirng contains a parameter with a code
            // only execute the remainging functions if that code was found
            const checkCode = new URLSearchParams(window.location.search).get('code');
            if (checkCode) {
                getToken(checkCode, client_id, client_secret);
            }
        }else{ console.log('please provide a client id and secret')}

    }

    return {
        init: init
    }

})();
