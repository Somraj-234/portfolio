// const nav = ["project", "work", "archive", "store"];
// let currentTab = "work";

// function tabSwitch(tab) {
//   const tabId = tab.id;
//   if (!nav.includes(tabId)) return;
//   currentTab = tabId;
//   nav.forEach((item) => {
//     const contentElement = document.getElementById(`${item}-content`);
//     const tabElement = document.getElementById(`${item}`);
//     tabElement.classList.add("text-black/50");
//     if (contentElement) {
//       contentElement.classList.add("hidden");
//     }
//   });

//   const activeContent = document.getElementById(`${tabId}-content`);
//   tab.classList.remove("text-black/50");
//   tab.classList.add("text-black")
//   if (activeContent) activeContent.classList.remove("hidden")

//   localStorage.setItem('currentTab',currentTab)
//   updateLineHeight()
// }

// nav items
function navItems({ navId, title }) {
  return `
  <div
      onclick="tabSwitch(this)"
      id="${navId}"
      class="nav-items cursor-pointer"
  >
  ${title}
  </div>`;
}

function renderNavItems(items) {
  document.getElementById("nav").innerHTML = items.join("");
}

// renderNavItems([
//   navItems({
//     navId: "project",
//     title: "Project",
//   }),
//   navItems({
//     navId: "work",
//     title: "Work",
//   }),
//   navItems({
//     navId: "archive",
//     title: "Archive",
//   }),
//   navItems({
//     navId: "store",
//     title: "Store",
//   }),
// ]);

// work content
function updateLineHeight() {
  const line = document.getElementById("line-to-stretch");
  const target = document.getElementById("target-heading");

  if (line && target) {
    const lineTop = line.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    const targetHeight = target.offsetHeight;

    const distance = targetTop - lineTop + 2;
    line.style.height = distance + "px";
  }
}

// work item component
function workItem({ itemId, role, timeline, link, description, company, stack }) {
  return `
  <div class="work-item w-full">
      <div>
          <h2 id='${itemId === "work-item-2" ? "target-heading" : itemId}' class="work-title text-xl lastik-font">${company}</h2>
          <div
              class="work-timeline flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between "
          >
              <p class="font-medium">${role}</p>
              <p class="font-medium">${timeline}</p>
          </div>
          <a class="work-link hover:underline primary-blue"  href=""https://${link}/"
              >${link}</a
          >
      </div>
      <p class="gray-text opacity-85 ">
        ${description}
      </p>
      <div class="flex flex-wrap gap-2 pt-2">
        ${stack.map((item) => `<span class="px-2 py-2 text-xs rounded-lg border-1 border-white/20 flex items-center">${item}</span>`).join("")}
      </div>
  </div>`;
}

function renderWorkItems(items) {
  document.getElementById("work-items").innerHTML = items.join("");
  updateLineHeight();
}

renderWorkItems([
  workItem({
    itemId: "work-item-1",
    company: "Enine",
    role: "Software Developer",
    timeline: "Oct 25 - Present",
    link: "enine.com",
    description:
      `Working on <a href="https://batteryos.com" class="underline" target="_blank" rel="noopener noreferrer">BatteryOS</a>, making APIs, writing scripts to transform data, adding frontend features.`,
    stack: ['Django', 'Python', 'Celery', 'HTML/CSS', 'JavaScript', 'Bootstrap']
  }),
  workItem({
    itemId: "work-item-2",
    company: "Persist Ventures",
    role: "Frontend Developer | Intern",
    timeline: "Jan 2025 - June 2025",
    link: "vidgencraft.com",
    description:
      "Worked on 2 major projects, from designing whole website in figma to developing it in REACT and integrating it with FastAPI backend.",
    stack: ['React',  'HTML/CSS', 'JavaScript', 'Tailwind']
  }),
]);

// project content
function ProjectContent({ imgUrl, title, description, link, code }) {
  return `
  <div id=${title} class="project-item flex flex-col gap-6 h-full">
      <div class=" overflow-hidden aspect-16/9">
      <img
          src=${imgUrl}
          alt="${title}-image"
          class="w-full h-full object-cover rounded-xl"
      />
      </div>
      <div
          class="project-text-parent flex flex-col items-start justify-between flex-1 gap-4"
      >
          <div
              class="project-text-content flex flex-col gap-4"
          >
              <h6 class="text-xl">${title}</h6>
              <p>
                  ${description}
              </p>
          </div>
          <div class="flex gap-4">
              <a href="${link}" class="uppercase">Live <span class="inline-block w-3 h-3 bg-white" style="-webkit-mask: url('/assets/arrow.png') no-repeat center; mask: url('/assets/arrow.png') no-repeat center; -webkit-mask-size: contain; mask-size: contain;"></span></a>
             ${
               code
                 ? ` <a href="${code}" class="uppercase">Code
               <span class="inline-block w-3 h-3 bg-primary-blue"
               style="-webkit-mask: url('/assets/star.png') no-repeat center; mask: url('/assets/star.png') no-repeat center; -webkit-mask-size: contain; mask-size: contain;">
               </span>
             </a>`
                 : ''
             }
              </div>
      </div>
  </div>`;
}

function renderProjectItems(items) {
  document.getElementById("project-content").innerHTML = items
    .map(ProjectContent)
    .join("");
}

renderProjectItems([
  {
    imgUrl: "https://varnam.app/og-image.png",
    title: "Varnam",
    description:
      "An AI image generation Playground that helps you make high quality visuals fast.",
    link: "https://varnam.app",
  },
  {
    imgUrl: "https://betterwriteprompt.vercel.app/og-image.png",
    title: "Better Write Prompt",
    description:
      "Simple prompt improvement tool  no authentication, no chat history, just enter your prompt select type of generation you want and get results.",
    link: "https://betterwriteprompt.vercel.app/",
    code: "https://github.com/Somraj-234/betterwriteprompt",
  },
  {
    imgUrl: "https://bityboi.vercel.app/og-image.png",
    title: "BityBoi",
    description:
      "A modern URL shortener built using Django REST, React, and Tailwind. Includes login, Google auth, click tracking, and multi-delete.",
    link: "https://bityboi.vercel.app",
    code: "https://github.com/Somraj-234/bityboi",
  },
  {
    imgUrl: "assets/palmpaper.png",
    title: "PalmPaper (in-development)",
    description:
      "Note Taking app with markdown support, dark mode, and a clean and Modern UI.",
    link: "https://palmpaper.vercel.app/",
    code: "https://github.com/Somraj-234/notesapp",
  },
  {
    imgUrl: "assets/obys-og.png",
    title: "Obys Agency Clone",
    description:
      "Obys Agency clone with animated components, typography, clean ui.",
    link: "https://somraj-234.github.io/Obys-Agency/",
    code: "https://github.com/Somraj-234/Obys-Agency",
  },
]);


// archive content 
function archiveContent(columns) {
  return `
    <div class="flex flex-wrap">
      ${columns
        .map((col) => {
          const imagesHtmlArr = (col.images || []).map(
            (img) =>
              `<img class="w-full my-1 align-middle" src="${img.src}" alt="${img.alt || ""}">`
          );
          return `
            <div class="flex flex-col flex-[0_0_50%] max-w-[50%] md:flex-[0_0_33.333%] md:max-w-[33.333%]
            lg:flex-[0_0_25%] lg:max-w-[25%] px-1">
              ${imagesHtmlArr.join('')}
            </div>
          `;
        })
      .join('')}
    </div>
  `;
}

function renderArchiveContent(columns) {
  document.getElementById("archive-content").innerHTML = archiveContent(columns);
}


const numArchiveImages = 59; 
const numColumns = 4;

function getArchiveImagesArray() {
  const images = [];
  for (let i = 1; i < numArchiveImages; i++) {
    const filenameJpg = `assets/archive/archive_${i.toString().padStart(4, '0')}.jpg`;

    images.push({
      src: filenameJpg,
      alt: `Archive image ${i+1}`
    });
  }
  return images;
}


function distributeImagesInColumns(images, columnsCount) {
  const columns = Array.from({length: columnsCount}, () => []);
  images.forEach((img, idx) => {
    columns[idx % columnsCount].push(img);
  });
  return columns.map(colImgs => ({ images: colImgs }));
}

const archiveImages = getArchiveImagesArray();
const columns = distributeImagesInColumns(archiveImages, numColumns);

renderArchiveContent(columns);


window.addEventListener("load", updateLineHeight);
window.addEventListener("resize", updateLineHeight);


// cloud JavaScript
const cloud = document.querySelector(".cloud");
let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let startMouseX, startMouseY;

cloud.addEventListener("mousedown", (e) => {
  const rect = cloud.getBoundingClientRect();
  const scrollbarWidth = cloud.offsetWidth - cloud.clientWidth;
  const resizeHandleSize = 50;

  if (e.clientX > rect.right - scrollbarWidth - resizeHandleSize) return;
  if (e.clientY > rect.bottom - resizeHandleSize) return;

  isDragging = true;
  startMouseX = e.clientX;
  startMouseY = e.clientY;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const deltaX = e.clientX - startMouseX;
  const deltaY = e.clientY - startMouseY;

  cloud.style.transform = `translate(calc(-50% + ${
    offsetX + deltaX
  }px), calc(-50% + ${offsetY + deltaY}px))`;
});

document.addEventListener("mouseup", (e) => {
  if (isDragging) {
    const deltaX = e.clientX - startMouseX;
    const deltaY = e.clientY - startMouseY;
    offsetX += deltaX;
    offsetY += deltaY;
  }
  isDragging = false;
});


// load DOM

document.addEventListener("DOMContentLoaded", () =>  {
  currentTab = localStorage.getItem('currentTab') || 'work'
  // tabSwitch(document.getElementById(currentTab));
});
