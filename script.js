document.getElementById('removeBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('imageInput');
  const file = fileInput.files[0];
  if (!file) return alert('Please select an image.');

  const formData = new FormData();
  formData.append('image_file', file);

  const res = await fetch('https://bg-remover-backend.onrender.com/remove-bg', {
    method: 'POST',
    body: formData
  });

  const data = await res.blob();
  const imageUrl = URL.createObjectURL(data);

  const preview = document.getElementById('preview');
  preview.src = imageUrl;
  preview.style.display = 'block';

  document.querySelector('.compress-box').style.display = 'block';

  window.removedImage = data;
});

document.getElementById('compressBtn').addEventListener('click', async () => {
  const quality = document.getElementById('qualityRange').value;

  const formData = new FormData();
  formData.append('image_file', new File([window.removedImage], 'removed.png'));
  formData.append('quality', quality);

  const res = await fetch('https://bg-remover-backend.onrender.com/compress', {
    method: 'POST',
    body: formData
  });

  const data = await res.blob();
  const url = URL.createObjectURL(data);

  const downloadLink = document.getElementById('downloadLink');
  downloadLink.href = url;
  document.querySelector('.download-box').style.display = 'block';
});

document.getElementById('qualityRange').addEventListener('input', function () {
  document.getElementById('qualityValue').innerText = this.value;
});
