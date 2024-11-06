function sendForm() {
  const id = document.getElementById("saveButton").dataset.id || null;
  const product_code = document.getElementById("product_code").value;
  const description = document.getElementById("description").value;
  const initial_price = document.getElementById("initial_price").value;
  const weight = document.getElementById("weight").value;
  const material_id = document.getElementById("material_id").value;
  const final_price = document.getElementById("final_price").value;

  const body = {
    product_code,
    description,
    initial_price,
    weight: [weight],
    material_id: material_id,
    final_price
  };

  // Si hay un id, se está editando un producto; si no, se está creando uno nuevo
  const method = id ? "PUT" : "POST";
  const url = id
    ? `http://localhost:3000$/productos/${id}`
    : "http://localhost:3000/productos";

  fetch(url, {
    method,
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMwOTMzNDExLCJleHAiOjE3Mzg3MDk0MTF9.J88V55bb9ycYSUz6A_ua5_nqoPgnQGCjJc1Hvr8nt0Y",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((updatedProduct) => {
      console.log("Producto actualizado/creado:", updatedProduct);
      location.reload(); // Recargar la página para ver los cambios
    });
}



  function deletePost(id){
    fetch(`http://localhost:3000${id}`, {
      method: "DELETE", 
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
      },
    })
    .then( res => res.json())
    .then( res => {
      console.log(
        "respuesta de la api", res
      )
      location.reload();
    })
  }


  fetch("http://localhost:3000/material_id", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMwOTMzNDExLCJleHAiOjE3Mzg3MDk0MTF9.J88V55bb9ycYSUz6A_ua5_nqoPgnQGCjJc1Hvr8nt0Y",
    },
  })
    //Pasarlo a json
    .then((response) => response.json())
    .then((data) => {
      const materiales = document.getElementById("material_id");
  
      data.forEach((material) => {
        const options = document.createElement("option");
        options.innerHTML = material.material_name;
        options.value = material.id;  
        options.id = material.id;  
        if(material.id == 1) options.selected = true;
        materiales.appendChild(options);
      });
    });


    function editPost(id) {
      fetch(`http://localhost:3000${id}`, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
        },
      })
        .then((response) => response.json())
        .then((product) => {
          // Rellenar los campos del formulario con la info del producto
          document.getElementById("product_code").value = product.product_code;
          document.getElementById("description").value = product.description;
          document.getElementById("value").value = product.value;
          document.getElementById("weight").value = JSON.parse(product.images)[0];
          document.getElementById("material_id").value = product.category_id;
          
          // Guardar el id del producto que se está editando
          document.getElementById("saveButton").dataset.id = id;
        });
    }



    fetch("http://localhost:3000/material_id", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
      },
    })
      //Pasarlo a json
      .then((response) => response.json())
      .then((data) => {
        const container =  document.getElementById("container");
        const navegacion = document.getElementById("navegacion");
        data.forEach((material_id) => {
          const ircategories = `
          <ul>
              <li><a href="#${material_id.name}">${material_id.name}</a></li>
          </ul>`
          const seccion = `
        <section id = "${material_id.name}">
          <div>
            <h2>${material_id.name}</h2>
            <button type="button" onclick="editPostCategory(${material_id.category_id})" class="btn btn-outline-primary">EDITAR</button>
            <button type="button" onclick="deletePostCategory(${material_id.category_id})" class="btn btn-outline-success">ELIMINAR</button>
          </div>
          <ul style = 
          "
          list-style-type: none; 
          display: flex; flex-wrap: wrap;
          justify-content: space-between; 
          padding: 0px; 
          margin: 40px 20px 0 40px;"  
          id = "Lista-${material_id.category_id}">
          </ul>
        </section>
          `

          container.innerHTML += seccion;
          navegacion.innerHTML += ircategories;
        });
          addlist();     
            
      });



    function addlist(){
      fetch("http://localhost:3000/posts", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
        },
      })
        //Pasarlo a json
        .then((response) => response.json())
        .then((data) => {      
          data.forEach((product) => {
            const List = document.getElementById(`Lista-${product.category_id}`);
            const il = document.createElement("li");
            const images = JSON.parse(product.images);
            //const img = document.getElementById("img");
            //img.src = images[0];
            const myhtml = `
            <div  id="${product.id}" class="card" style="width: 15rem;  margin: 15px;" >
              <img src="${images[0]} " class="card-img-top" alt = "...">
              <div class="card-body">
                <h5 class="card-product_code">${product.product_code}</h5>
                <p class="card-text">${product.description}</p>
                <button type="button" onclick="editPost(${product.id})" class="btn btn-outline-primary">EDITAR</button>
                <button type="button" onclick="deletePost(${product.id})" class="btn btn-outline-success">ELIMINAR</button>
                </div>
              </div>`;
            il.innerHTML = myhtml;
            List.appendChild(il);
          });
        });
    }



    function sendFormCategory() {
      const id = document.getElementById("saveButtonCategory").dataset.id || null;
      const name = document.getElementById("name").value;
      const description = document.getElementById("descriptioncategory").value;
      const weight = document.getElementById("imanumbergecategory").value;
    
      const bodyCategory = {
        name,
        description,
        weight: weight,
      };
    
      // Si hay un id, se está editando un producto; si no, se está creando uno nuevo
      const method = id ? "PATCH" : "POST";
      const url = id
        ? `http://localhost:3000/material_id/${id}`
        : "http://localhost:3000/material_id";
      console.log(bodyCategory);

      fetch(url, {
        method,
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyCategory),
      })
        .then((response) => response.json())
        .then((updatedCategroy) => {
          console.log("Category actualizada/creado:", updatedCategroy);
          location.reload(); // Recargar la página para ver los cambios
        });
      }



      function editPostCategory(id) {
        fetch(`http://localhost:3000/material_id/${id}`, {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
          },
        })
          .then((response) => response.json())
          .then((material_id) => {
            // Rellenar los campos del formulario con la info del producto
            document.getElementById("name").value = material_id.name;
            document.getElementById("descriptioncategory").value = material_id.description;
            document.getElementById("imanumbergecategory").value = material_id.weight;
            // Guardar el id del producto que se está editando
            document.getElementById("saveButtonCategory").dataset.id = id;
          });
      }

      function deletePostCategory(id){
        fetch(`http://localhost:3000/material_id/${id}`, {
          method: "DELETE", 
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJlbWFpbCI6ImouZHVyYW4yQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY4ODQzMTYsImV4cCI6MTc0NDE2NDMxNn0.4PE0SgarbzuJubXxqsVnP4ECYvyr9r4BMet9SwjsiQo",
          },
        })
        .then( res => res.json())
        .then( res => {
          console.log(
            "respuesta de la api", res
          )
          location.reload();
        })
      }