const productForm = document.getElementById('addProduct');
const modal = document.getElementById('modal');

// 
const alerts = {
  success: 'Producto añadido correctamente.',
  error: 'Error al añadir el producto.',
}
const alertStatus = location.search.substring(1).split("&")[0].split('=')[1];
if(alertStatus){
  modal.className = `fadeIn ${alertStatus}`
  modal.firstElementChild.innerHTML = alerts[alertStatus]
}

const listener = (e) => {
  console.log(e.type);

  if(e.animationName=='fadein'){
    modal.classList.replace('fadeIn','fadeOut')
  }
  if(e.animationName=='fadeout'){
    modal.className = 'hidden';
  }
}

modal.addEventListener('animationend',listener, false)

// 
const handleFocus = e => {
  e.target.parentNode.classList.toggle('focus')
}

productForm.querySelectorAll('input').forEach(input=>{
  input.onfocus = handleFocus
  input.onblur = handleFocus
})

// 