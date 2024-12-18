
//key of location API
mapsKey = '67162c7d39843830695966hzibe6d08';

//api geocode require key
async function localRes(latitude, longitude) {
    const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${mapsKey}`
    const response = await fetch(url);
    dado = response.json()
    return dado;
}

//view speed
function speed(element) {
    let speed = 0;
    let maxSpeed = 0;
    element.dados.forEach(element => {
        if (element.velocidadeAtual == null) {
            return 0;
        }

        if (element.velocidadeAtual) {
            speed = element.velocidadeAtual;
            if (speed > maxSpeed) {
                maxSpeed = speed;
            }
        }
    });

    return (maxSpeed * 3.6).toFixed(2);
}

//view distance
function distance(element) {
    const earthRadiusKm = 6371;
    let totalDistance = 0;

    for (let i = 0; i < element.dados.length - 1; i++) {
        let positions = element.dados;
        const p1 = {
            latitude: positions[i].latitude,
            longitude: positions[i].longitude
        }
        const p2 = {
            latitude: positions[i + 1].latitude,
            longitude: positions[i + 1].longitude
        }

        ////mathematical expressions for geographical calculation of the route
        const deltaLatitude = toRad(p2.latitude - p1.latitude);
        const deltaLongitude = toRad(p2.longitude - p1.longitude);

        const a = Math.sin(deltaLatitude / 2) *
            Math.sin(deltaLatitude / 2) +
            Math.sin(deltaLongitude / 2) *
            Math.sin(deltaLongitude / 2) *
            Math.cos(toRad(p1.latitude)) *
            Math.cos(toRad(p2.latitude))

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadiusKm * c;

        totalDistance += distance;

        return totalDistance.toFixed(2);
    }

    function toRad(degree) {
        return degree * Math.PI / 180;
    }
}

//view duration
function duration(element) {
    const startTime = element.tempoInicial;
    const lastTime = element.dados[element.dados.length - 1].tempoFinal;

    const interval = lastTime - startTime;

    if (interval) {



        let miliseconds = interval;
        let seconds = ((miliseconds / 1000) % 60).toFixed();
        let minutes = parseInt((((miliseconds / 1000) / 60) % 60));
        let hours = parseInt(((miliseconds / 1000) / 3600));

        //time formatting
        function getSeconds(seconds) {
            if (seconds < 10) {
                return '0' + seconds;
            }
            else {
                return seconds;
            }
        }

        function getMinutes(minutes) {
            if (minutes < 10) {
                return '0' + minutes;
            }
            else {
                return minutes;
            }
        }

        function getHours(hours) {
            if (hours < 10) {
                return '0' + hours;
            }
            else {
                return hours;
            }
        }




        //verification of the team to be displayed
        if (miliseconds > 0 && miliseconds < 60000) {
            return getSeconds(seconds) + "s";
        }

        if (miliseconds >= 60000 && miliseconds < 3600000) {
            return getMinutes(minutes) + ":" + getSeconds(seconds);
        }

        if (miliseconds >= 3600000) {
            return getHours(hours) + ":" + getMinutes(minutes) + ":" + getSeconds(seconds);
        }

    }



}

//view date
function getDate(element) {
    const date = new Date(element.tempoInicial);

    function getMinutes(minutes) {
        if (minutes < 10) {
            return '0' + minutes;
        }
        else {
            return minutes;
        }
    }

    return date.toDateString() + " " + date.getHours() + ":" + getMinutes(date.getMinutes());

}