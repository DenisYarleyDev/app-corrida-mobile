//ul list of the last rides
const lista = document.getElementById("lista");
trajetos = [];

i = localStorage.length - 1;

//require geocode API Key
async function listar() {
    latitude = null;
    longitude = null;
    while (i >= 0) {

        key = localStorage.key(i);

        const element = JSON.parse(localStorage.getItem(key));

        // console.log(element.dados[0].latitude)
        // console.log(element.dados[0].longitude)

        latitude = element.dados[0].latitude
        longitude = element.dados[0].longitude

        trajetos.push(element)

        

        //localRes return promise
        await localRes(latitude, longitude).then((res) => {
            address = res.address

            //list element in the view
            const li = document.createElement('li');
            lista.appendChild(li)
            li.id = element.id;
            li.className = "d-flex gap-4 p-2"
            li.addEventListener("click", ()=>{
                window.location.href = `/details.html?id=${element.id}`;
                // console.log(element.id)
            })

            //divs
            const dataElement = document.createElement('div');
            const mapElement = document.createElement('div');
            li.appendChild(mapElement);
            li.appendChild(dataElement);

            mapElement.className = "d-flex align-items-center"

            //map
            const map = document.createElement('div');
            map.style.width = '100px';
            map.style.height = '100px';
            map.className = "bg-secondary rounded-4"
            map.id = `map${element.id}`;
            mapElement.appendChild(map)

            //ride details
            const cityDiv = document.createElement('div')
            cityDiv.innerText = `${address.city} - ${address.state}`;
            cityDiv.className = 'text-primary mb-2';
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

            //view map API
            var viewMap = L.map(`map${element.id}`,{zoomControl: false,
                dragging: false,
                attributionControl: false,
                scrollWheelZoom: false
            }).setView([element.dados[0].latitude, element.dados[0].longitude], 16);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                
            }).addTo(viewMap);

            L.marker([element.dados[0].latitude, element.dados[0].longitude]).addTo(viewMap);

            
            })

        i--

    }

}
listar();