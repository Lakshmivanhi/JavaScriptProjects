document.addEventListener('DOMContentLoaded', function() {
  // Show both images and videos by default
  document.getElementById('All').classList.add('active');
  toggleUploadedContainer(true); // Show uploaded container initially
});

function openGallery(evt, galleryType) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("gallery");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(galleryType).style.display = "block";
  evt.currentTarget.className += " active";

  // Toggle visibility of uploaded container based on the active tab
  if (galleryType === 'All') {
      toggleUploadedContainer(true);
  } else {
      toggleUploadedContainer(false);
  }
}

function toggleUploadedContainer(show) {
  var uploadedContainer = document.getElementById('uploaded-container');
  if (show) {
      uploadedContainer.style.display = "block";
  } else {
      uploadedContainer.style.display = "none";
  }
}

function handleFiles(files) {
  var imageList = document.querySelector('#Images .image-list');
  var allList = document.getElementById('media-list');
  var uploadedContainer = document.getElementById('uploaded-container');
  var uploadedList = document.getElementById('uploaded-media-list');

  for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var reader = new FileReader();
      reader.onload = function(event) {
          var mediaType = file.type.split('/')[0]; // Get media type (image or video)
          if (mediaType === 'image') {
              // If image, create img tag and append to both "All" and "Images" tabs
              var img = document.createElement('img');
              img.src = event.target.result;
              img.alt = file.name;
              var imageItem = document.createElement('div');
              imageItem.classList.add('media-item');
              imageItem.appendChild(img);
              imageList.appendChild(imageItem);
              allList.appendChild(imageItem.cloneNode(true)); // Append to "All" tab as well
          } else if (mediaType === 'video') {
              // If video, create video tag and append to both "All" and "Videos" tabs
              var video = document.createElement('video');
              video.controls = true;
              var source = document.createElement('source');
              source.src = event.target.result;
              source.type = file.type;
              video.appendChild(source);
              var videoItem = document.createElement('div');
              videoItem.classList.add('media-item');
              videoItem.appendChild(video);
              var videoList = document.querySelector('#Videos .video-list');
              videoList.appendChild(videoItem);
              allList.appendChild(videoItem.cloneNode(true)); // Append to "All" tab as well
          }
          // Append uploaded files to the uploaded container
          var uploadedItem = document.createElement('div');
          uploadedItem.classList.add('media-item');
          if (mediaType === 'image') {
              var uploadedImg = document.createElement('img');
              uploadedImg.src = event.target.result;
              uploadedImg.alt = file.name;
              uploadedItem.appendChild(uploadedImg);
          } else if (mediaType === 'video') {
              var uploadedVideo = document.createElement('video');
              uploadedVideo.controls = true;
              var source = document.createElement('source');
              source.src = event.target.result;
              source.type = file.type;
              uploadedVideo.appendChild(source);
              uploadedItem.appendChild(uploadedVideo);
          }
          uploadedList.appendChild(uploadedItem);
      };
      reader.readAsDataURL(file);
  }
}





