import { createElement } from "./dom.js";

export class Poly {

    constructor(id, name, type, geojson) {
        this.id = id
        this.name = name
        this.type = type
        this.geojson = geojson

    }


    // Modele : 
    
    // <!--Carte-->
    // <div id="div1" class=" p-2 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center ml-2 mr-2 mt-2">
         
    //     <!--Zone de Texte-->
    //     <div id="div2" class="w-5/6 mr-4">
    //       <div id="div3" class="text-xl font-medium text-black">${this.name}</div>
    //       <p class="text-slate-500">Position : ABC:ABC</p>
    //     </div>
    //     <!--Bouton Poubelle-->
    //  
    //           <button id="btn-1" class="inline-flex items-center justify-center w-10 h-10 text-pink-100 transition-colors bg-red-600 rounded-lg hover:bg-red-700">
    //             <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    //             </svg>
    //           </button>
    //    
    // </div>

    //document.getElementById('container-cartes').insertAdjacentHTML('beforeend',card)



    removePoly(){

        document.getElementById('div-1-'+this.id).replaceChildren()
        document.getElementById('div-1-'+this.id).remove()


    }




}