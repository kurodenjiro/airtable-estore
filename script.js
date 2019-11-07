function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault()
      console.log('scrolling!')
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      })
    })
  })
}

function generateCard(name, description, imageUrl, price) {
  return `
  <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${imageUrl}">
      <div class="card-body">
        <strong class="card-text">${name}</strong>
        <p class="card-text">${description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <a id="buy-btn" href="#form-container" class="btn btn-sm btn-outline-secondary">BUY NOW</a>
          </div>
          <small class="text-main">RM${price}</small>
        </div>
      </div>
    </div>
  </div>
  `
}

const productContainer = document.getElementById('product-container')

productContainer.innerHTML = `<div class="mx-auto lds-css ng-scope"><div style="width:100%;height:100%" class="lds-facebook"><div></div><div></div><div></div></div></div>`

fetch('https://api.airtable.com/v0/appNo7KHnVGi4EsXv/Products', {
  headers: {
    Authorization: 'Bearer key23F8r22FJ7DNvk'
  }
})
  .then(function(response) {
    return response.json()
  })
  .then(function(result) {
    let htmlContent = ''

    result.records.forEach(function(record) {
      let imgUrl
      if (record.fields.Picture) {
        imgUrl = record.fields.Picture[0].url
      } else {
        imgUrl = 'https://picsum.photos/200'
      }
      htmlContent += generateCard(
        record.fields.Product,
        record.fields.Description,
        imgUrl,
        record.fields.Price
      )
    })

    productContainer.innerHTML = htmlContent
    initSmoothScroll()
  })
