<template>
    <div v-html="prefixedHtml"></div>
  </template>
  
  <script>
  export default {
    props: {
      htmlCode: {
        type: String,
        required: true,
      },
      prefix: {
        type: String,
        required: true,
      },
    },
    computed: {
      prefixedHtml() {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = this.htmlCode;
  
        const imgTags = tempElement.querySelectorAll('img');
        imgTags.forEach((img) => {
          const originalSrc = img.getAttribute('src');
          if (originalSrc.startsWith("http://") || originalSrc.startsWith("https://")) {
            // Nothing hapend
          }else{
            const modifiedSrc = this.prefix + originalSrc;
            img.setAttribute('src', modifiedSrc);
            img.setAttribute('class', "img-responsive");
          }
        });
  
        return tempElement.innerHTML;
      },
    },
  };
  </script>  