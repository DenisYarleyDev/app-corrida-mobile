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
            lista.className = 'p-4  d-flex flex-column justify-content-between h-100'
            

            //mapa
            const mapa = document.createElement('div');
            mapa.id = 'map';
            mapa.style.height = '300px';
            mapa.style.width = '100%';
            mapa.className = 'bg-secondary m-auto rounded ';

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

            //delete
            const deleteButton = document.createElement('div');
            deleteButton.className = 'btn btn-danger w-100 d-flex justify-content-center align-items-center fs-4 mt-5';
            deleteButton.style.height = '50px';
            deleteButton.innerHTML = 'DELETE'
            deleteButton.addEventListener('click',()=>{
                localStorage.removeItem(rideID);
                window.location.href = '/index.html';
            })
            dataElement.appendChild(deleteButton);
        })

        // console.log(element)
        var map = L.map('map').setView([ride.dados[0].latitude, ride.dados[0].longitude], 18);


        var tilemap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        const positionArray = ride.dados.map(position => {
            return [position.latitude, position.longitude];
        })

        console.log(positionArray)

        const polyline = L.polyline(positionArray, {color:'#F00'});
        polyline.addTo(map);

        map.fitBounds(polyline.getBounds());


}

details();

