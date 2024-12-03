let monto = parseFloat(prompt('Ingrese plata '));

for(let i = 0; monto > 0; i++) {
    let retirar = parseFloat(prompt('retire plata '));
    
    if(retirar <= monto) {
        monto = monto - retirar;
        alert('listo bro Saldo restante: ' + monto);
    } else {
        alert('Saldo insuficiente. la plata que queda es : ' + monto);
    }
    
    if(monto === 0) {
        alert('noo tienes plata bro ');
        break;
    }
 }

