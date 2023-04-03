import { createElement } from "./dom.js";
import { Poly } from "./poly.js";

mapboxgl.accessToken = 'pk.eyJ1IjoidmljMTEyIiwiYSI6ImNsZHcxampxZzAxejEzcXAwOGloNDI5aTYifQ.chYV3uydu6DIDYTTt-VyJQ';
const ACCESS_TOKEN = 'pk.eyJ1IjoidmljMTEyIiwiYSI6ImNsZHcxampxZzAxejEzcXAwOGloNDI5aTYifQ.chYV3uydu6DIDYTTt-VyJQ';

let PolyCollection = []



// fonction appelée lorsque qu'un poly est dessiné
function newPoly(id, name, type, geojson){

    let tmpPoly = new Poly(id, name, type, geojson)
    PolyCollection[PolyCollection.length] = tmpPoly
    //addCardToHTML(tmpPoly)
    majAffichagePoly(PolyCollection)

    console.log(PolyCollection)
}



function addCardToHTML(Poly){
    
       
    const div1 = createElement("div",{

        id : "div-1-"+Poly.id,
        class : "p-2 max-w-sm mx-auto bg-white hover:bg-gray-200 rounded-xl shadow-lg flex items-center ml-2 mr-2 mt-2"
    })

    const div2 = createElement("div",{

        id : "div-2-"+Poly.id,
        class : "w-5/6 mr-4"
    })

    const div3 = createElement("div",{

        id : "div-3-"+Poly.id,
        class : "text-xl font-medium text-black"
    })

    div3.innerText = Poly.name

    const p1 = createElement("p",{

        id : "p-1-"+Poly.id,
        class : "text-slate-500"
    })

    p1.innerText = "Position : ABCDEFGH"

    const trash_Btn = createElement("button",{

        id : "btn-1-"+Poly.id,
        class : "inline-flex items-center justify-center w-10 h-10 text-pink-100 transition-colors bg-red-600 rounded-lg hover:bg-red-700"
    })



    const trashPath = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    `

    document.getElementById('container-cartes').appendChild(div1)
    document.getElementById('div-1-'+Poly.id).appendChild(div2)
    document.getElementById('div-2-'+Poly.id).appendChild(div3)
    document.getElementById('div-2-'+Poly.id).appendChild(p1)
    document.getElementById('div-1-'+Poly.id).appendChild(trash_Btn)
    document.getElementById('btn-1-'+Poly.id).insertAdjacentHTML('afterbegin',trashPath)

    document.getElementById('btn-1-'+Poly.id).addEventListener('click',()=>{

        removePoly(Poly.id)
       
    })

    }



function removePoly(id){

       // Retirer le poly en question de la collection
       PolyCollection = PolyCollection.filter(function(poly) {
        return poly.id !== id;
      }); 

      majAffichagePoly(PolyCollection)

      console.log("Supression du poly " + id.substr(0, 5) + " : OK" )
      

}    

function majAffichagePoly(PolyCollection){

    document.getElementById("container-cartes").replaceChildren()
    draw.deleteAll()

    PolyCollection.forEach((Poly) => {
        
        draw.add(Poly.geojson)
        addCardToHTML(Poly)

    });

    console.log(PolyCollection)

}




let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/vic112/cldw3clt900ed01qq4in8guba',
    center: [2.220133, 48.787395], // starting position [lng, lat]
    zoom: 16 // starting zoom
});



// Lorsque la map est correctement chargée
map.on('load', () => {
    
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

});



// Lorsque qu'un dessin est fait
map.on('draw.create', function (e) {
    
    newPoly(e.features[0].id,"Polygone_"+e.features[0].id.substr(0, 5),e.features[0].geometry.type,e.features[0])

  });


// Lorsque qu'un ou plusieurs dessins sont supprimés
map.on('draw.delete', function (e) {
    

   e.features.forEach(element => {
        
        removePoly(element.id)
   });



  });




const draw = new MapboxDraw({
    
    displayControlsDefault: false,
    // Select which mapbox-gl-draw control buttons to add to the map.
    controls: {
        polygon: true,
        trash: true
    },

    // Set mapbox-gl-draw to draw by default.
    // The user does not have to click the polygon control button first.
    defaultMode: 'simple_select'
    });

  
     

const geocoder = new MapboxGeocoder({
    
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker : false,
    flyTo : true,
    language : 'fr',
    countries : 'fr'
    })

    map.addControl(geocoder);

    map.addControl(draw);










    