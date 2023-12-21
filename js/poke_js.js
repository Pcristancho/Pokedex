// codigo de funcionamiento de appi pokemon 

//---------------- esta seccion es para traer la info de cada pokemon osea TODOs y mostrarla en lista ------------------
// luego al cargar este js empieza mostrando todos los pokemon
const listapokemon=document.querySelector('#listaPokemon'); // indica donde esta la lista de ponemones en el documento de la pagina
let url= "https://pokeapi.co/api/v2/pokemon/";// url de la api para obtenerr los pokemon 
                                            //// ojo asi como esta el enlace falta agregarle el numero de pokemon, esto porque para esta api
                                            //funciona indicar el numero y asi podemos recorrer para buscarlos 150 pokemon , inicia en 1 no en 0

                                            
for(let i=1;i<=11;i++){
    let ar=fetch(url +i) // se hace consulta de la Url con un indice para ir recorriendo todos los pokemon
    .then((respuesta)=> iniciar(respuesta)) // primero tomo lso datos en formato JSOn ya que si solo tomo la respuesta trae estado de solicitud y otras cosas
    .then((d)=> mostar_pokem(d));// ahora imprimo los datos de todos lo pokemon teniendo la respuesta jsona que se retorna de lo anterior
}

function iniciar(respuesta){
    return respuesta.json();
}
function mostar_pokem(pokem){ // ojo este es para mostrar un pokemon y lo que se hace es usarlo artas veces
    // para poer mstar los n pokemon debemos ir creando mas divs segun el formato que venimaos manejando 
    // esto se puede hacer de la siguiente manera
    let div_poke=document.createElement("div");
    div_poke.classList.add("pokemon");
    //validaciones a realizar para que se muestren bien los datos en el html
    if(pokem.id<10){
        pokem.id=`00${pokem.id}`// esto es para que se vea por ejemplo #001 y no #1
    }
    if(pokem.id>=10 && pokem.id<=99){
        pokem.id=`0${pokem.id}`// esto es para qeu se vea por ejemplo #001 y no #1
    }
    //console.log(pokem.sprites.other["official-artwork"]); // este fue para hacer pruebas de si trae la imagen o que trae ya que el "-" pone problema al la hroa de llamar un 
                                                        // an propiedad o parte del JSON enonces esta es otra forma de hacer lo mismo 
    
    // como tipos es un vector debemos tomar la informacion dentro del vector para sacar solo el nombre de cada tipo
    //de la siguiente forma, primero se mapea lo que trae a un nuevo vector 
    //let tipos= pokem.types[0].type; // esto es para exporar por codigo si llego a la misma info
    let tipos= pokem.types;
    //console.log('-----------------tipos-----------------------');
    //console.log(tipos);// retornara un vector con cada tipo , resulta que puede ser mas de 1 y cada uno tiene mas info por lo tanto hay qeu desglozarlo
    let tipos_poke= tipos.map((tipos)=>`<p class="${tipos.type.name}">${tipos.type.name}</p>`); // estoy creando una nueva etiqueta p con la info de cada tipo, al final me saldra un vector
                                      //ya que map lo que hace es apicar alguna accion a la info que se ingresa , en este caso se ingfresa un vector  
    //console.log("el vector editado con la info-----");
    //console.log(tipos_poke);// meustro para verficar que si quedo como se ordeno 
    // ahroa una vez que lo tengo de esa forma la idea es añadirlo todo en un solo texto cosa que sea solo añadir eso al modelo de abajo 
    // como si fuera llamar a cualquier propiedad del objeto de pokemon y añadirlo en este caso se añade con todo y etiqueta ya que depende si hay 1 o 2 no siempre son 2 tipos
    let etiquetas_tipos_pokemon=tipos_poke.join(' ');// este METODO UNE TODOS LOS ELMENTOS DE UN VECTOS COMO UN SOLO STRING
    //console.log("solo string----");
    //console.log(etiquetas_tipos_pokemon);// verificar                      
    //console.log('----------------------------------------');                                   
    // solo queda usarlo en el modelo 
    
    
    div_poke.innerHTML=` 
        <p class="pokemon-id-back">#${pokem.id}</p>
        <div class="pokemon-imagen">
            <img src=${pokem.sprites.other["official-artwork"].front_default} alt="pikachu"/>
        </div>
        <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <P class="pokemon-id">#${pokem.id}</P>
                    <h2 class="pokemon-nombre">${pokem.name}</h2>
                </div>
                <div class="pokemo-tipos">
                    ${etiquetas_tipos_pokemon}
                </div>
                <div class="pokemon-stats">
                    <p class="stat">${pokem.height}M</p>
                    <p class="stat">${pokem.weight}Kg</p><!-- es de altura y peso pero indica que se puede usar asi no se porque-->

                </div>
        </div>             
    `;  
    listapokemon.append(div_poke); 
}
//_--------------------------------------------------------------------------------------------

//------------- esta seccion es para que al pulsar cualquier boton de navegacion se clasifiqeun los pokemon segun el tipo ------

// lo primero es identificar a los botones que ya existen 
let botonesHeader= document.querySelectorAll(".btn-header"); // busca en el documento  TODOS los elemntos con clase indicada que son los botones del header

botonesHeader.forEach((boton)=> boton.addEventListener("click", function(botonn){identificar_tipo(botonn.currentTarget.id);} )); // para cada boton se añade un escuhador de eventos que ejecuta la funacion para identificar cual boton fue pulsado

function identificar_tipo(bot_pulsado){
    //console.log("llega");
    //console.log("ide de textos botones-----" +bot_pulsado); //verifco que efectivamente me trae el idenficicador del boton segun el html
    // ahora una vez pulsado cualquier boton lo correcoto es "recargar" el contenido , internamente lo que 
    // se hace es colocar el contenido de la lista de pokemon en blanco ya que la funcion de mostrar 
    // pokemon se encarga de insertar too el conjunto de equiquetas para msotrar el poklemon 
    // entonces lo primero es colocar vacio a la lista de pokemon que ya se habia declarao
    listapokemon.innerHTML=""; // se limpia la lista de pokemon sino saldrian los nuevos abajos de los ya 
                                // msotrados

    // ahora cubro el caso que se pulso el boton para ver todos en ves de algun tipo en especifico
    if(bot_pulsado=="ver-todos"){
        //console.log("opcion TODOSSS")
        for(let j=1;j<=150;j++){
           
            console.log(j);
            let ar2=fetch(url +j) // se hace consulta de la Url con un indice para ir recorriendo todos los pokemon
            .then((respuesta)=> iniciar(respuesta)) // primero tomo lso datos en formato JSOn ya que si solo tomo la respuesta trae estado de solicitud y otras cosas
            .then((d)=> {
                mostar_pokem(d);
            });
        }
        return; // retorno de una vez para no recorrer el for de abajo eso ahorra procesos
    }else{
        //nuevamente se realiza la consulta para verificar cada pokemon 
        for(let i=1;i<=150;i++){
            let ar=fetch(url +i) // se hace consulta de la Url con un indice para ir recorriendo todos los pokemon
            .then((respuesta)=> iniciar(respuesta)) // primero tomo lso datos en formato JSOn ya que si solo tomo la respuesta trae estado de solicitud y otras cosas
            .then((d)=> {
                //console.log(d.types);  // muestra el dato, en teoria estoy mostrando el arreglo de tipos que tiene el pokemon
                // ahora realizo una condicion para analizar si dentro del arreglo de tipos del pokemon en el que va 
                // concuerda con el tipo pulsado en la navegacion , si concuerda pues lo muestra sino no 
                // pero antes acondiciono mejor ese arreglo para qeu solo quede lso nombres ademas lo qeu se hace es mapearlo 
                let tipos_p=d.types.map((arreglo_obj_pokemon)=> arreglo_obj_pokemon.type.name) // crea un nuevo arreglo que es mapear el original de forma que solo muestre los nombres
                //console.log(tipos_p);//verifico que sea un vector solo con los tipos del poquemon en cuestion qeu se consulta de momento
                if(tipos_p.includes(bot_pulsado)){
                    // si el boton de tipo esta incluido en el vector de tipos del pokemon consultado entoces muestralo
                    //console.log("si hay es "+ tipos_p);//verificar
                    mostar_pokem(d);
                } // de lo contrario no mostrar pero pues no pongo else ya que no se escribe nada


            });// ahora imprimo los datos de todos lo pokemon teniendo la respuesta jsona que se retorna de lo anterior
            
        }

    }


    
    
    
    
}





















