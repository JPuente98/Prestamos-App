firebase.initializeApp({
  apiKey: "AIzaSyAGDzjGW5RZ4ceu-eDwPlgCbDb4FPidSYI",
  authDomain: "prestamo-app-fd76c.firebaseapp.com",
  projectId: "prestamo-app-fd76c"
});

var db = firebase.firestore();




function guardar()
{

let nombre = document.getElementById("nombre").value;
let apellidos = document.getElementById("apellidos").value;
let email = document.getElementById("email").value;
let matricula = document.getElementById("matricula").value;
let cantidad = "$"+document.getElementById("cantidad").value;


/*cantidad_real = cantidad+"$";

console.log(cantidad_real);
*/

db.collection("users").add({
    nombre: nombre,
    apellidos: apellidos,
    email: email,
    matricula: matricula,
    cantidad: cantidad

  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);

    document.getElementById('nombre').value = '';
    document.getElementById('apellidos').value = '';
    document.getElementById('email').value = '';
    document.getElementById('matricula').value = '';
    document.getElementById('cantidad').value = '';

  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });

}

let tabla = document.getElementById("tabla");

db.collection("users").onSnapshot((querySnapshot) => {

  tabla.innerHTML = '';

  querySnapshot.forEach((doc) => {



      console.log(`${doc.id} => ${doc.data().nombre}`);


      tabla.innerHTML += `
      
      <tr>
      <td>${doc.data().nombre}</td>
      <td>${doc.data().apellidos}</td>
      <td>${doc.data().email}</td>
      <td>${doc.data().matricula}</td>
      <td>${doc.data().cantidad}</td>
      <td><button class="btn btn-warning" onclick = "editar('${doc.id}','${doc.data().nombre}','${doc.data().apellidos}','${doc.data().email}','${doc.data().matricula}','${doc.data().cantidad}')">Editar</button></td>
      <td><button class="btn btn-danger" onclick = "eliminar('${doc.id}')">Eliminar</button></td>
      </tr>     
      `;
  });
});

function eliminar(id)
{

    db.collection("users").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

}

function editar(id, nombre, apellidos, email, matricula, cantidad)
{

  document.getElementById('nombre').value = nombre;
  document.getElementById('apellidos').value = apellidos;
  document.getElementById('email').value = email;
  document.getElementById('matricula').value = matricula;
  document.getElementById('cantidad').value = cantidad;

  let boton = document.getElementById('btn');
  boton.innerHTML = 'Editar';

  boton.onclick = function (){

    var washingtonRef = db.collection("users").doc(id);

    let nombre = document.getElementById('nombre').value
    let apellidos = document.getElementById('apellidos').value
    let email = document.getElementById('email').value
    let matricula = document.getElementById('matricula').value
    let cantidad = document.getElementById('cantidad').value

        return washingtonRef.update({

          nombre: nombre,
          apellidos: apellidos,
          email: email,
          matricula: matricula,
          cantidad: cantidad

      })
      .then(function() {
          console.log("Document successfully updated!");

          document.getElementById('nombre').value = '';
          document.getElementById('apellidos').value = '';
          document.getElementById('email').value = '';
          document.getElementById('matricula').value = '';
          document.getElementById('cantidad').value = '';

          let boton = document.getElementById('btn');
          boton.innerHTML = 'Guardar';

      })
      .catch(function(error) {
          console.error("Error updating document: ", error);
      });

  }

}