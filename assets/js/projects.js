(() => {
  "use strict";

  // Static project content replaces the old Project and ImageGallary database tables.
  // Add or edit each project's details and image paths here.
  const projects = {
    "foodhub": {
      title: "FoodHub – Multivendor Food Marketplace",
      short: "A multi-vendor food marketplace connecting customers, food vendors and delivery partners.",
      description: "FoodHub is a multi-vendor food marketplace project. The interface includes customer-facing food discovery, vendor-side menu management and dashboard screens. The gallery shows the marketplace landing page, sign-in screen, vendor dashboard and menu-management experience.",
      technologies: "Python, Django, Django REST Framework, HTML, CSS, JavaScript",
      github: "",
      live: "",
      images: [
        "assets/project_images/foodhub-multivendor-image.png",
        "assets/project_images/foodhub1.png",
        "assets/project_images/foodhub2.png",
        "assets/project_images/foodhub3.png",
        "assets/project_images/foodhub4.png",
        "assets/project_images/foodhub5.png"
      ]
    },
    "jay-ambapati": {
      title: "Jay Ambapati Products – Online Store",
      short: "An ecommerce website project for a saree and clothing business.",
      description: "This project presents an online-store concept for Jay Ambapati Products. The gallery includes the shop exterior, store inventory and product-display photographs, along with invoice-related screens. Replace or expand this overview with the final feature list when you are ready.",
      technologies: "Ecommerce website – add the final technology stack",
      github: "",
      live: "",
      images: [
        "assets/project_images/ambapati-shop-image.png",
        "assets/project_images/ambapati_shop_image.jpg",
        "assets/project_images/ambapati_shop_image1.jpg",
        "assets/project_images/shop-inside-image.png",
        "assets/project_images/ambapati_invoice.jpg",
        "assets/project_images/invoice-image.png"
      ]
    },
    "bdm-capstone": {
      title: "Business Data Management – Capstone",
      short: "A Business Data Management capstone project focused on business data and financial information.",
      description: "This capstone project is presented with its Business Data Management title artwork and finance-related visual. Add the specific business problem, dataset, methodology, findings and tools used to make this project description more detailed.",
      technologies: "Business Data Management, Data Analysis – add the exact tools used",
      github: "",
      live: "",
      images: [
        "assets/project_images/bdm-project-image.png",
        "assets/project_images/finance.jpg"
      ]
    }
  };

  const main = document.querySelector("main.main");
  const details = document.getElementById("project-details-view");
  if (!main || !details) return;

  const homeSections = Array.from(main.children).filter((element) => element !== details);
  const title = document.getElementById("project-detail-title");
  const breadcrumb = document.getElementById("project-detail-breadcrumb");
  const heading = document.getElementById("project-detail-heading");
  const shortDescription = document.getElementById("project-detail-short");
  const projectName = document.getElementById("project-info-name");
  const tech = document.getElementById("project-info-tech");
  const description = document.getElementById("project-detail-description");
  const mainImage = document.getElementById("project-gallery-main");
  const thumbnails = document.getElementById("project-gallery-thumbnails");
  const counter = document.getElementById("project-gallery-counter");
  const githubRow = document.getElementById("project-github-row");
  const liveRow = document.getElementById("project-live-row");
  const githubLink = document.getElementById("project-github-link");
  const liveLink = document.getElementById("project-live-link");
  const actions = document.getElementById("project-detail-actions");

  let currentProject = null;
  let currentImageIndex = 0;

  function setLink(row, link, url) {
    if (url) {
      row.hidden = false;
      link.href = url;
    } else {
      row.hidden = true;
    }
  }

  function showImage(index) {
    if (!currentProject || !currentProject.images.length) return;
    currentImageIndex = (index + currentProject.images.length) % currentProject.images.length;
    const imagePath = currentProject.images[currentImageIndex];
    mainImage.src = imagePath;
    mainImage.alt = `${currentProject.title} – image ${currentImageIndex + 1}`;
    counter.textContent = `${currentImageIndex + 1} / ${currentProject.images.length}`;

    thumbnails.querySelectorAll("button").forEach((button, i) => {
      const selected = i === currentImageIndex;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-current", selected ? "true" : "false");
    });
  }

  function renderProject(slug) {
    const project = projects[slug];
    if (!project) {
      window.location.hash = "portfolio";
      return;
    }

    currentProject = project;
    currentImageIndex = 0;
    title.textContent = project.title;
    breadcrumb.textContent = project.title;
    heading.textContent = project.title;
    shortDescription.textContent = project.short;
    projectName.textContent = project.title;
    tech.textContent = project.technologies;
    description.textContent = project.description;

    setLink(githubRow, githubLink, project.github);
    setLink(liveRow, liveLink, project.live);

    actions.replaceChildren();
    if (project.github) {
      const sourceButton = document.createElement("a");
      sourceButton.className = "project-btn github-btn";
      sourceButton.href = project.github;
      sourceButton.target = "_blank";
      sourceButton.rel = "noopener noreferrer";
      sourceButton.innerHTML = '<i class="bi bi-github"></i> View Source Code';
      actions.appendChild(sourceButton);
    }
    if (project.live) {
      const liveButton = document.createElement("a");
      liveButton.className = "project-btn live-btn";
      liveButton.href = project.live;
      liveButton.target = "_blank";
      liveButton.rel = "noopener noreferrer";
      liveButton.innerHTML = '<i class="bi bi-box-arrow-up-right"></i> View Live Project';
      actions.appendChild(liveButton);
    }

    thumbnails.replaceChildren();
    project.images.forEach((imagePath, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "project-thumb";
      button.setAttribute("aria-label", `Show image ${index + 1}`);
      const image = document.createElement("img");
      image.src = imagePath;
      image.alt = `${project.title} thumbnail ${index + 1}`;
      button.appendChild(image);
      button.addEventListener("click", () => showImage(index));
      thumbnails.appendChild(button);
    });

    showImage(0);
    homeSections.forEach((section) => { section.hidden = true; });
    details.hidden = false;
    document.body.classList.add("project-detail-active");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function showHome() {
    details.hidden = true;
    homeSections.forEach((section) => { section.hidden = false; });
    document.body.classList.remove("project-detail-active");
  }

  function routeFromHash() {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash.startsWith("project/")) {
      renderProject(hash.slice("project/".length));
    } else {
      showHome();
    }
  }

  document.querySelectorAll(".portfolio-item").forEach((card) => {
    const detailsLink = card.querySelector(".details-link");
    if (!detailsLink) return;
    card.style.cursor = "pointer";
    card.addEventListener("click", (event) => {
      if (event.target.closest(".preview-link")) return;
      const target = detailsLink.getAttribute("href") || "";
      if (target.startsWith("#project/")) {
        event.preventDefault();
        window.location.hash = target.slice(1);
      }
    });
  });

  document.querySelectorAll(".portfolio-item .details-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.hash = (link.getAttribute("href") || "").replace(/^#/, "");
    });
  });

  document.querySelector(".gallery-prev")?.addEventListener("click", () => showImage(currentImageIndex - 1));
  document.querySelector(".gallery-next")?.addEventListener("click", () => showImage(currentImageIndex + 1));

  document.addEventListener("keydown", (event) => {
    if (details.hidden) return;
    if (event.key === "ArrowLeft") showImage(currentImageIndex - 1);
    if (event.key === "ArrowRight") showImage(currentImageIndex + 1);
  });

  window.addEventListener("hashchange", routeFromHash);
  routeFromHash();
})();
