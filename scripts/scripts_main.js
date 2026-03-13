$(document).ready(function(){

/*DEFINICION DE VARIABLES INICIALES ----------------------------------------------------------------- */

var jugando=false;
var girar;
var turnosmalos;
var tesoro1;
var tesoro2;
var tesoro3;
var ubicacion="";
var dir=true;

// variables para mostrar efecto de trampas
var texto_trampa=$("#info-efecto-trampas");
var efecto_roca="<b>Roca:</b> pierdes tu tesoro más valioso y una reliquia al azar.";
var efecto_insecto= "<b>Escarabajo:</b> mueve solo 3 casillas en el próximo turno o 1 si te tocan dos veces seguidas.";
var efecto_fuego= "<b>Fuego:</b> Pierdes dos reliquias, si no tienes, pierdes 10 Myts.";
var efecto_estacas= "<b>Estacas:</b> Pierdes un tesoro al azar.";


/*FUNCION REDIRECCIONAMIENTO*/

function redireccionar(){
	ubicacion=document.location.hash;
	if(!jugando && ubicacion!=""){
		document.location="/myt";		
	}else{}	
}
	redireccionar();


/* FUNCION PARA INICIAR VARIABLES GENERALES ---------------------------------------------------------*/

function variables_globales(){
		
	/*definicion de variables*/
	girar=0;
	grande= Math.floor((Math.random() *(95 - 81 + 1) + 81));
	mediana= Math.floor((Math.random() *(71 - 41 + 1) + 41));
	pequena= Math.floor((Math.random() *(30 - 20 + 1) + 20));

	// este es el array de turnos que se iran descontando conforme pase el juego
	// se usan para mantener la proporcion de turnos buenos y malos basados en 10 turnos
	// la idea es que los jugadores descubran esta logica y la usen a su favor!
	turnosmalos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	tesoro1 = pequena - (pequena % 5);
	tesoro2 = mediana - (mediana % 5);
	tesoro3 = grande - (grande % 5);

	$("#tesoros-1 div:first-of-type").html(tesoro1);
	$("#tesoros-2 div:first-of-type").html(tesoro2);
	$("#tesoros-3 div:first-of-type").html(tesoro3);

}

	variables_globales();

/* funciones giros ------------------------------------------------------------------ */

function girarmomias(){
	if(girar>7){
		$("#derecha-momia").addClass("activo");
	}else if(girar<=7 && girar>4){
		$("#izquierda-momia").addClass("activo");
	}
}

/* función mover momias------------------------------------------------------------------- */

function movermomias(){
	$("#pasos-momia").html(pasosmomia);
	var llave = Math.floor(Math.random() * 7);
	//console.log("el valor de llave es: " + llave);
	
	if(pasosmomia>0 && llave<5){
		$("#momia").addClass("llave");		
	}else{		
		$("#momia").removeClass("llave");
	}
}

/* función activar trampas ------------------------------------------------------------------- */

function activatrampas(){
	if(trampas>=1 && trampas<=6){
		$("#trampa3-tapa").addClass("mostrar");
	}else if(trampas>=7 && trampas<=12){
		$("#trampa2-tapa").addClass("mostrar");
	}else if(trampas>=13 && trampas<=18){
		$("#trampa1-tapa").addClass("mostrar");
	}else if(trampas>=19 && trampas<=24){
		$("#trampa4-tapa").addClass("mostrar");
	}else if(trampas>=25 && trampas<=30){
		$("#trampa2-tapa").addClass("mostrar");
		$("#trampa3-tapa").addClass("mostrar");
	}else if(trampas>=31 && trampas<=36){
		$("#trampa1-tapa").addClass("mostrar");
		$("#trampa2-tapa").addClass("mostrar");
	}else if(trampas>=37 && trampas<=42){
		$("#trampa1-tapa").addClass("mostrar");
		$("#trampa4-tapa").addClass("mostrar");
	}else if(trampas>=43 && trampas<=48){
		$("#trampa3-tapa").addClass("mostrar");
		$("#trampa4-tapa").addClass("mostrar");
	}
	else{
		//console.log("ninguna trampa activa");
	}
}

/* función todo tranquilo ------------------------------------------------------------------- */

function todotranquilo(){
	$("#trampas1-tapa, #trampas2-tapa, #trampas3-tapa, #trampas4-tapa").removeClass("mostrar");
	$("#derecha-momia, #izquierda-momia").removeClass("activo")
	$("#momia").removeClass("llave");
	$("#pasos-momia").html(".");
	$("#aviso-no-cambios").addClass("mostrar");
}

/* Funcion nuevo turno ----------------------------------------------------------------------- */

// la siguiente funcion recorre y reduce el array de turnos para controlar la ocurrencia
// de turnos malos
function nuevoturno(){

	girar = Math.floor((Math.random() * 10) + 1);
	pasosmomia = Math.floor(Math.random() * 5);
	trampas = Math.floor((Math.random() * 48) + 1);	
	
	if(!turnosmalos.length == 0){
		buscaturno= Math.floor(Math.random() * turnosmalos.length);
		turnoactivo= turnosmalos[buscaturno];
		turnosmalos.splice(buscaturno, 1);
		//console.log("TURNO: " + turnoactivo);
		//console.log("ARRAY FINAL: " + turnosmalos);
	}else if(turnosmalos.length == 0){
		//console.log("reiniciar array");
		turnosmalos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		//console.log(turnosmalos);
		buscaturno= Math.floor(Math.random() * turnosmalos.length);
		turnoactivo= turnosmalos[buscaturno];
		turnosmalos.splice(buscaturno, 1);
		//console.log("TURNO 2: " + turnoactivo);
		//console.log("ARRAY FINAL 2: " + turnosmalos);
	}		
	//console.log("LOS PASOS DE LA MOMIA SON: " + pasosmomia);
	//console.log("TURNO ACTIVO: " + turnoactivo);		
}

/* FUNCION REINICIAR ---------------------------------------------------------------*/

// esta funcion reinicia todas las variables y vuelve a hacer visible la pantalla de seleccion de jugador (j1 - otros)

function reiniciar(){

	variables_globales();

	$("#volver-menu").removeClass("mostrar");	
	$("#contenidos-ayuda div").removeClass("mostrar");	
	$("#contenidos-ayuda").removeClass("mostrar");
	$("#menu-ayuda").addClass("mostrar");
	// esta línea tiene que suceder primero, o mejor dicho, antes de eliminar el objeto que quiero modificar...

	if($("#boton-principal").hasClass("procesando")){
		$("#boton-principal").removeClass("procesando");
	clearTimeout(inactivo);
	}


	$("#boton-tesoro").removeClass("ocultar");
	$("#contenedor-trampas div div").removeClass("mostrar");
	$("#momia").removeClass("mostrar");
	$("#piedras-controles").removeClass("mostrar");
	$("#controles-momia").removeClass("mostrar");
	$("#izquierda-momia").removeClass("activo");
	$("#derecha-momia").removeClass("activo");
	$("#pasos-momia").html("0");

	if(!$("#tesoros").hasClass("mostrar")){
		$("#tesoros").addClass("mostrar");
	}else{
	}

	$("#interfaz-jugador").addClass("ocultar");
	$("#presentacion").removeClass("ocultar");

}

/*funcion para hacer vibrar el boton de turno-----------------------------------------------*/

var signo=1;
var cuanto_vibra=1;
var cambio=0;

function vibrando(){		
	cambio= cuanto_vibra*signo;	
	$("#boton-principal").css("background-position-y", cambio);		
	signo*=-1;	
}


/* Funcion jugar turno ----------------------------------------------------------------------- */

function jugarturno(){	
	// esta funcion deshabilita el boton principal
	$("#boton-principal").addClass("procesando");
	// esta funcion comprueba si los tesoros son visibles y los oculta antes de hacer cambios
	if($("#tesoros").hasClass("mostrar")){
		$("#tesoros, #momia, #piedras-controles, #controles-momia").toggleClass("mostrar");
	}else{}
	
	// las siguientes lineas limpian todos los estados antes de volver a ejecutar los procesos
	$("#trampa1-tapa, #trampa2-tapa, #trampa3-tapa, #trampa4-tapa").removeClass("mostrar");
	$("#derecha-momia, #izquierda-momia").removeClass("activo");
	$("#imagen-momia").removeClass("activa");
	$("#pasos-momia").html(".");

	nuevoturno();

	if(turnoactivo==1){
		//console.log("tranquillo");
		todotranquilo();		
	}else if (turnoactivo>=2 && turnoactivo<=8){
		girarmomias();
		movermomias();
		activatrampas();
	}else if (turnoactivo>=9){
		//console.log("solo momias");
		girarmomias();
		movermomias();		
	}
	// esta funcion habilita el boton principal despues de un tiempo dado
		
	inactivo= setTimeout(function(){
		$("#boton-principal").removeClass("procesando");		
		if($("#aviso-no-cambios").hasClass("mostrar")){
			$("#aviso-no-cambios").removeClass("mostrar")
		}else{}			
		//console.log("YA");
		clearInterval(vibrar);
		clearTimeout(vibracion);
		$("#boton-principal").css("background-position-y", 0);				
		}			
		, 
		3000);
		vibracion= setTimeout(function(){vibrar=setInterval(vibrando, 100);}, 1000)		
};

/* funcion para mostrar los efectos de cada trampa ---------------------------------------------------------------------------------------------------------- */

function efecto_trampas(){	
	if($(this).hasClass("mostrar")){
		if(texto_trampa.hasClass("mostrar")){
			console.log("se está viendo el texto!")			
		}else{			
			texto_trampa.addClass("mostrar")
			setTimeout(function(){texto_trampa.toggleClass("mostrar");}, 3000);
		}			
		donde=$(this).attr("id");	
		if(donde == "trampa1-tapa"){
			texto_trampa.html(efecto_roca);
		}
		else if(donde == "trampa2-tapa"){
			texto_trampa.html(efecto_insecto);
		}
		else if(donde == "trampa3-tapa"){
			texto_trampa.html(efecto_fuego);
		}
		else if(donde == "trampa4-tapa"){
			texto_trampa.html(efecto_estacas);
		}else{
			//console.log("fallo");		
		}	
	}	
	else{
		//console.log("trampa inactiva")			
	}	
};
	$(".trampas_juego").bind("click", efecto_trampas);

/*funciones de navegacion basada en url (#id)-----------------------------------------------------------------------------*/

function navegar(){
	var destino=document.location.hash;
	redireccionar();	
	/*moverse entre pagina principal y ayuda*/	
	if(destino=="#principal"){
		$("#contenedor-superior-interfaz").removeClass("bajar");
		$("#contenedor-inferior-interfaz").addClass("mostrar");
	}else if(destino== "#pagina_ayuda"){
		$("#contenedor-superior-interfaz").addClass("bajar");
		$("#contenedor-inferior-interfaz").removeClass("mostrar");		
	}else if(destino=="#salir"){		
		$("#confirmar-salir").addClass("mostrar");					
	}
	
	if(destino!="#salir" /*&& $("#confirmar-salir").hasClass("mostrar")*/){
		$("#confirmar-salir").removeClass("mostrar");
		dir=true;
	}
	
	if(destino==""){
		document.location="/myt";
	}
	
}

$(window).bind("hashchange", navegar);

/*funcion para verificar que si se ha dado un cambio de ubicación mediante la navegación por ID*/




	
/* ************************************************************************************************************************************************************** */

/* DEFINICION DE BOTONES ---------------------------------------------------- */
 
	/* boton ayuda*/

	$("#boton-ayuda").click(function(){
		/*$("#contenedor-superior-interfaz").addClass("bajar");
		$("#contenedor-inferior-interfaz").removeClass("mostrar");*/
		document.location.hash="pagina_ayuda";	
	});

	/* boton cerrar ayuda*/
	
	$("#boton-cerrar-ayuda").click(function(){
		/*$("#contenedor-superior-interfaz").removeClass("bajar");
		$("#contenedor-inferior-interfaz").addClass("mostrar");*/
		window.history.back();
		//document.location.hash="principal";		
	});

	/*boton mostrar-ocultar tesoros*/

	$("#boton-tesoro").click(function(){
		$("#tesoros").toggleClass("mostrar");
		$("#momia").toggleClass("mostrar");
		$("#piedras-controles").toggleClass("mostrar");
		$("#controles-momia").toggleClass("mostrar");
	});

	/* boton jugador 1*/

	$("#jugador1").click(function(){
		$("#presentacion").addClass("ocultar");
		$("#interfaz-jugador").removeClass("ocultar");
		jugando=true;
		document.location.hash="salir";
		document.location.hash="principal";
	});

	/* boton otros jugadores*/

	$("#jugadores").click(function(){
		$("#presentacion").addClass("ocultar");
		$("#interfaz-jugador").removeClass("ocultar");
		$("#boton-tesoro").addClass("ocultar");
		$("#tesoros").removeClass("mostrar");
		$("#momia").addClass("mostrar");
		$("#piedras-controles").addClass("mostrar");
		$("#controles-momia").addClass("mostrar");
		jugando=true;
		document.location.hash="salir";
		document.location.hash="principal";
	})

	/* boton salir */

	$("#boton-cerrar").click(function(){
		dir=false;
		document.location.hash="salir";	
	});
		
	/*boton confirmar salida*/
	
	$("#boton-aceptar").click(function(){
			$("#confirmar-salir").removeClass("mostrar");				
			document.location="/myt";
	});
				
	/*boton cancelar salida*/
	
	$("#boton-cancelar").click(function(){	
		if(!dir){
			$("#confirmar-salir").removeClass("mostrar");
			window.history.back();
			dir=true;
		}else if(dir){
			$("#confirmar-salir").removeClass("mostrar");
			window.history.forward();
		}
		
	});	
	
	

	/* botones control de menu en pantalla ayuda*/

	$(".item-ayuda").click(function(){
		id=$(this).attr("id");
		conte="#"+id+"-c";
		//console.log(conte);
		$(conte).addClass("mostrar");
		$("#menu-ayuda").removeClass("mostrar");
		$("#contenidos-ayuda").addClass("mostrar");
		$("#volver-menu").addClass("mostrar");
		
	})

	/* boton mostrar menu en pantalla ayuda*/

	$("#volver-menu").click(function(){		
		$("#volver-menu").removeClass("mostrar");	
		$("#contenidos-ayuda div").removeClass("mostrar");	
		$("#contenidos-ayuda").removeClass("mostrar");
		$("#menu-ayuda").addClass("mostrar");		
	});
	
	/*boton de turno*/

	$("#boton-principal").click(function(){
		if($(this).hasClass("procesando")){
			//console.log("PROCESANDO");		
		}else{
			jugarturno();
		}
	});

	/*barra espaciadora*/
	
	function comprobar_tecla(event){		
		var tecla=event.which;
		//console.log (tecla);		
		if(tecla==32){
			if($("#boton-principal").hasClass("procesando")){
				//console.log("PROCESANDO");					
			}else{
				jugarturno();
			}
		}		
	}
	$("body").bind("keypress", comprobar_tecla);


	
/*codigo en revision ############################################################################################################################################################# */

/* tutorial*/
/*
$("#boton_tutorial").click(function(){

$("#tutorial_app").toggleClass("ocultar");
	
});
*/
/* funcion fullscreen*/

/*
				$('#boton-pantalla-completa').click(function() {
					

				if($(this).hasClass("full")){
				$(this).toggleClass("full");	
					  $.fullscreen.exit();
						return false;
						
				}else{
				$(this).toggleClass("full");
				 $('body').fullscreen();
				   return false;
				   
				  }
					
				});

				$('#jugar-juego').click(function() {
					
				$("#bienvenida").css("display", "none");
				 $('body').fullscreen();
				   return false;
				   
				  
					
				});
*/


});

