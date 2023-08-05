const $all = (el) => document.querySelectorAll(el);

$all("article").forEach((article) => {
  const height = article.clientHeight;
  const width = article.clientWidth;
  article.addEventListener("mousemove", (event) => {
    const { layerX, layerY } = event;
    const yRotate = ((layerX - width / 2) / width) * 20;
    const xRotate = ((layerY - height / 4) / height) * 20;

    const string = `
    scale(1.14)
    perspective(500px)
    rotateY(${yRotate}deg)
    rotateX(${xRotate}deg)
    `;
    article.style.transform = string;
  });

  article.addEventListener("mouseout", (event) => {
    const string = `scale(1)
    perspective(500px)
    rotateX(0)
    rotateY(0)
    `;

    article.style.transform = string;
  });
});
