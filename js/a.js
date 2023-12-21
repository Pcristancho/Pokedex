
const listapokemon=document.querySelector('#listaPokemon'); // indica donde esta la lista de ponemones en el documento de la pagina
let url= "https://pokeapi.co/api/v2/pokemon/";// url de la api para obtenerr los pokemon 
                                            //// ojo asi como esta el enlace falta agregarle el numero de pokemon, esto porque para esta api
                                            //funciona indicar el numero y asi podemos recorrer para buscarlos 150 pokemon , inicia en 1 no en 0

let ar=fetch(url +2)
    .then((respuesta)=> iniciar(respuesta)) // primero tomo lso datos en formato JSOn ya que si solo tomo la respuesta trae estado de solicitud y otras cosas
    .then((d)=> console.log(d));// ahora imprimo los datos

function iniciar(respuesta){
    return respuesta.json();
}
