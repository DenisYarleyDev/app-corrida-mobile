//buscar o id na url
const params = new URLSearchParams(window.location.search);
const rideID = params.get('id');

//acessar o objeto a partir do id da url
const ride = JSON.parse(localStorage.getItem(rideID));
console.log(ride);

details = async ()=>{
    

        const element = JSON.parse(localStorage.getItem(rideID));

        // console.log(element.dados[0].latitude)
        // console.log(element.dados[0].longitude)

        latitude = element.dados[0].latitude
        longitude = element.dados[0].longitude

        //localRes return promise
        await localRes(latitude, longitude).then((res) => {
            //div
            address = res.address
            const lista = document.createElement('div');
            

            //mapa
            const mapa = document.createElement('div');
            mapa.style.height = '300px';
            mapa.style.width = '300px';
            mapa.className = 'bg-secondary m-auto rounded';

            lista.appendChild(mapa);

            //li
            const li = document.createElement('li');
            li.style.listStyle = 'none';
            document.body.appendChild(lista);
            lista.appendChild(li);



            //divs
            const dataElement = document.createElement('div');
            const mapElement = document.createElement('div');
            li.appendChild(mapElement);
            li.appendChild(dataElement);

            mapElement.className = "d-flex align-items-center"

            //ride details
            const cityDiv = document.createElement('div')
            cityDiv.innerText = `${address.city} - ${address.state}`;
            cityDiv.className = 'text-primary mb-2 mt-2';
            dataElement.appendChild(cityDiv);

            //max speed
            const maxSpeedDiv = document.createElement('div');
            maxSpeedDiv.innerText = `Max speed: ${speed(element)} Km/h`;
            maxSpeedDiv.className = 'h5';
            dataElement.appendChild(maxSpeedDiv);

            //distance
            const distanceDiv = document.createElement('div');
            distanceDiv.innerText = `Total distance: ${distance(element)} Km`;
            dataElement.appendChild(distanceDiv);

            //duration
            const duracaoDiv = document.createElement('div');
            duracaoDiv.innerText = `Duração: ${duration(element)}`;
            dataElement.appendChild(duracaoDiv);

            //date
            const dateDiv = document.createElement('div');
            dateDiv.innerText = `Data: ${getDate(element)}`;
            dateDiv.className = 'text-secondary mt-2'
            dataElement.appendChild(dateDiv);
        })

        // console.log(element)

}

details();

