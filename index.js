const wsOauth = (function(){
    async function getToken(code) {
        const requestBody = {
            client_id: 114716,
            client_secret: 'b0f13abdb3152be3d6d61962f54ed02f0adb16f2',
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

    function init(){
        // check if the querystirng contains a parameter with a code
        // only execute the remainging functions if that code was found
        const checkCode = new URLSearchParams(window.location.search).get('code');
        if (checkCode) {
            getToken(checkCode);
        }
    }

    return {
        init: init
    }

})();