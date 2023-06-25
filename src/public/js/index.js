const productsContainer = document.querySelector(".productsContainer");



async function logout() {
  const options = {
    method: "POST",
    body: "",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `http://localhost:8080/api/session/logout`,
    options
  );
  const res = await response.json();
  location.assign("/products");
}



async function addToCart( id , cartId) {

  const options = {
    method: "POST",
    body: "",
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch(
    `${process.env.ENVIORMENT}/api/carts/${cartId}/products/${id}`,
    options
  );
  Swal.fire({
    toast: true,
    icon: "success",
    position: "bottom-right",
    html: "Producto Agregado al Carrito",
    timer: 1600,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}



async function deleteUser( id ){
  const options= {
    method: "DELETE",
    body: "",
    headers: {
      "Content-type": "application/json",
    },
  };

  Swal.fire({
    title: 'Quiere Eliminar este Usuario',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Elimnarlo'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('ID---',id)
      fetch( `http://localhost:8080/api/users/${id}`, options );

      Swal.fire(
        'Eliminado!',
        'Usuario eliminado de la Base de Datos',
        'success'
      )
    }
  })
}



async function updateRole ( id ){
  const options = {
    method: "PUT",
    body: "",
    headers: {
      "Content-type": "application/json",
    },
  };

  //SWEETALERT
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        'admin': 'Administrador',
        'premium': 'Premium',
        'user': 'Usuario',
      })
    }, 700)
  })

  const { value: role } = await Swal.fire({
    title: 'Seleccione un Rol al Usuario',
    input: 'radio',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return 'Tienes que elegir una Opción!'
      }
    }
  })
  
  if (role) {
    Swal.fire({ html: `Seleccionaste:  ${role}` })
    fetch( `http://localhost:8080/api/users/${id}`, options );
  }

}



async function buyToCart(carId, uid, email) {
  const options = {
    method: "POST",
    body: {
      carId: carId,
      uid: uid,
      email: email,
    },
    headers:{
      "Content-Type":"application/json",
    },
  }

  await fetch( `http://localhost:8080/api/tickets`, options);

  Swal.fire({
    toast: true,
    icon: "success",
    position: "center",
    html: "Compra Exitosa!",
    timer: 2000,
    showConfirmButton: false,
  });

}