function updateLineHeight() {
  const line = document.getElementById("line-to-stretch");
  const target = document.getElementById("target-heading");

  if (line && target) {
    const lineTop = line.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;

    const distance = targetTop - lineTop + 2;
    line.style.height = distance + "px";
  }
}

function archiveContent(columns) {
  return `
    <div class="flex flex-wrap">
      ${columns
        .map((col) => {
          const imagesHtmlArr = (col.images || []).map(
            (img, imageIndex) =>
              `<img class="w-full my-1 align-middle" src="${img.src}" alt="${img.alt || ""}" loading="${imageIndex === 0 ? "eager" : "lazy"}" decoding="async">`,
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
    const filenameJpg = `assets/archive/archive_${i.toString().padStart(4, "0")}.jpg`;

    images.push({
      src: filenameJpg,
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

const archiveImages = getArchiveImagesArray();
const columns = distributeImagesInColumns(archiveImages, numColumns);

renderArchiveContent(columns);

window.addEventListener("load", updateLineHeight);
window.addEventListener("resize", updateLineHeight);
