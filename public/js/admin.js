var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    displayImages: function () {
      var fileInput = document.getElementById('fileInput');
      var fileDisplayArea = document.getElementById('fileDisplayArea');

      var files = fileInput.files;
      var fLen = files.length;

      for (var i = 0; i < fLen; i++) {
        var file = files[i];
        var picReader = new FileReader();

        //Only pics
        if (!file.type.match('image')) continue;

        picReader.addEventListener("load", function (event) {
          var picFile = event.target;
          var div = document.createElement("div");

          div.innerHTML = "<img style='height:200px' class='thumbnail' src='" + picFile.result + "'" + "title='" + picFile.name + "'/>";

          fileDisplayArea.appendChild(div);
        });

        //Read the image
        picReader.readAsDataURL(file);
      }
    },

    saveAbout: function () {
      var url = '/admin/save_about';
      var about = document.querySelector("#about");
      var email = document.querySelector("#email");
      var phone = document.querySelector("#phone");
      var address = document.querySelector("#address");

      var data = {};

      if (about && about.value) {
        data.about = about.value;
      }
      if (email && email.value) {
        data.email = email.value;
      }
      if (phone && phone.value) {
        data.phone = phone.value;
      }
      if (address && address.value) {
        data.address = address.value;
      }

      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
    }
  }
})
