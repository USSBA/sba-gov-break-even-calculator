(async () => {
  const res = await fetch('./FeedbackForm.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class FeedbackForm extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'open' });

      // Clone the template and the cloned node to the shadowDOM's root.
      const instance = HTMLTemplate.content.cloneNode(true);
      shadowRoot.appendChild(instance);
      // Extract the attribute product from our element. 
      // Note that we are going to specify our cards like: 
      // <feedback-form product="BEPC"></feedback-form>
      const product = this.getAttribute('product');
      const productTitle = this.getAttribute('productTitle')
      this.render(product,productTitle)
    }
    render(product,productTitle) {
      // Fill the respective areas of the card using DOM manipulation APIs
      // All of our components elements reside under shadow dom. So we created a this.shadowRoot property
      // We use this property to call selectors so that the DOM is searched only under this subtree
      this.shadowRoot.querySelector('input.product__name').value = product;
      console.log(productTitle)
      this.shadowRoot.querySelector('h3.product__title').innerHTML = productTitle
    }
  }

  customElements.define('feedback-form', FeedbackForm);
})();