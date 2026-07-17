document.querySelectorAll('.link').forEach(link => {
  link.addEventListener('click', () => {
    console.log('Clique no link:', link.innerText);
  });
});

