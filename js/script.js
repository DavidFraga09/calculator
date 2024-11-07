const pantalla = document.querySelector('.pantalla') 
 let operacionconpendiente = ''; 
 let numeroanterior = ''; 
 let operadoractual = null; 
 let reiniciarpantalla = false; 
  
 function agregar(valor){ 
     if(reiniciarpantalla){ 
         pantalla.value = ''; 
         reiniciarpantalla = false; 
     } 
     if (['+', '-', '*', '/', '√'].includes(valor)) { 
         if(operadoractual !== null) { 
             calcular(); 
         } 
         numeroanterior = pantalla.value; 
         operadoractual = valor; 
         reiniciarpantalla = true; 
  
  
         if (valor === '√') { 
             const numero = parseFloat(numeroanterior); 
             if (isNaN(numero) || numero < 0) { 
                 pantalla.value = 'Error'; 
                 setTimeout(limpiar, 1500); 
                 return; 
             } 
             pantalla.value = Math.sqrt(numero); 
             operadoractual = null; 
         } 
     } else { 
         pantalla.value += valor; 
     } 
 } 
  
 function limpiar(){ 
     pantalla.value = ''; 
     operacionconpendiente = ''; 
     numeroanterior = ''; 
     operadoractual = null; 
 } 
  
 function borrar() { 
     pantalla.value = pantalla.value.slice(0, -1); 
 } 
  
 function calcular(){ 
     if(operadoractual=== null || reiniciarpantalla) 
         return; 
  
     const numero1 = parseFloat(numeroanterior); 
     const numero2 = parseFloat(pantalla.value); 
  
     if(isNaN(numero1) || isNaN(numero2)) { 
         pantalla.value = 'error' 
         setTimeout (limpiar, 1500); 
         return; 
     } 
  
     let resultado; 
     switch(operadoractual){ 
         case '+': 
         resultado = numero1 + numero2; 
         break; 
         case '-': 
             resultado = numero1 - numero2; 
             break; 
         case '*': 
             resultado = numero1 * numero2; 
             break; 
         case '/': 
             if (numero2 === 0) { 
                 pantalla.value = 'Error'; 
                 setTimeout(limpiar, 1500); 
                 return; 
             } 
             resultado = numero1 / numero2; 
             break; 
     } 

     resultado = Math.round(resultado * 100000000) / 100000000; 
     pantalla.value = resultado; 
     operadoractual = null; 
     numeroanterior = ''; 
     reiniciarpantalla = true; 

 } 
  
 document.addEventListener('keydown', (event) =>{ 
     event.preventDefault(); 
     const key = event.key; 
  
     // Numero y operadores 
     if(/[0-9\+\-\*\/\.]/.test(key)){ 
         agregar(key); 
     } 
  
     // Tecla enter 
     else if(key === 'Enter'){ 
         calcular(); 
     } 
  
     // Tecla escape para limpiar 
     else if (key === 'Escape'){ 
         limpiar(); 
     } 
  
     // Tecla backespace para borrar el ultimo caracter 
     else if (key === 'Backspace'){ 
         borrar();
        }
})