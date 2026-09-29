function updateLineHeight() {
  const line = document.getElementById("line-to-stretch");
  const target = document.getElementById("target-heading");

  if (line && target) {
    const lineTop = line.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    line.style.height = targetTop - lineTop + 2 + "px";
  }
}

function loadWhenNear(img, observer) {
  const src = img.getAttribute("data-src");
  if (!src) return;
  img.src = src;
  img.removeAttribute("data-src");
  observer.unobserve(img);
}

function observeDeferredImages() {
  const images = document.querySelectorAll("img[data-src]");
  if (!images.length) return;

  if (!("IntersectionObserver" in window)) {
    images.forEach((img) => {
      img.src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) loadWhenNear(entry.target, observer);
      });
    },
    { rootMargin: "160px 0px", threshold: 0.01 },
  );

  images.forEach((img) => observer.observe(img));
}

function archiveContent(columns) {
  return `
    <div class="flex flex-wrap">
      ${columns
        .map((col) => {
          const imagesHtmlArr = (col.images || []).map(
            (img) =>
              `<img class="w-full my-1 align-middle" data-src="${img.src}" alt="${img.alt || ""}" decoding="async">`,
          );
          return `
            <div class="flex flex-col flex-[0_0_50%] max-w-[50%] md:flex-[0_0_33.333%] md:max-w-[33.333%]
            lg:flex-[0_0_25%] lg:max-w-[25%] px-1">
              ${imagesHtmlArr.join("")}
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderArchiveContent(columns) {
  document.getElementById("archive-content").innerHTML =
    archiveContent(columns);
}

const numArchiveImages = 59;
const numColumns = 4;

function getArchiveImagesArray() {
  const images = [];
  for (let i = 1; i < numArchiveImages; i++) {
    images.push({
      src: `assets/archive/archive_${i.toString().padStart(4, "0")}.jpg`,
      alt: `Graphic poster from Somraj Jadhav archive, ${i}`,
    });
  }
  return images;
}

function distributeImagesInColumns(images, columnsCount) {
  const columns = Array.from({ length: columnsCount }, () => []);
  images.forEach((img, idx) => {
    columns[idx % columnsCount].push(img);
  });
  return columns.map((colImgs) => ({ images: colImgs }));
}

renderArchiveContent(distributeImagesInColumns(getArchiveImagesArray(), numColumns));
observeDeferredImages();

window.addEventListener("load", updateLineHeight);
window.addEventListener("resize", updateLineHeight);
