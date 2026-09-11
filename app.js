const planListEl = document.getElementById("plan-list");
const pricingToggleEl = document.getElementById("pricing-toggler");

let plansData = [];

function createPlanElement(plan, isMonthly) {
  const features = plan.features
    .map((feature) => `<li class="plan__item">${feature}</li>`)
    .join("");

  const price = isMonthly ? plan.price.monthly : plan.price.yearly;

  return `
    <article class="plan ${plan.isFeatured ? "plan--featured" : ""}">
      <h2 class="plan__title">${plan.name}</h2>

      <p class="plan__price">
        &dollar;<span>${price.toFixed(2)}</span>
      </p>

      <ul class="plan__list">
        ${features}
      </ul>

      <a class="plan__button" href="#">
        <span>Learn More</span>
      </a>
    </article>
  `;
}

function renderPlans() {
  const isMonthly = pricingToggleEl.checked;

  planListEl.innerHTML = plansData
    .map((plan) => createPlanElement(plan, isMonthly))
    .join("");
}

async function fetchPlans() {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error("Failed to fetch pricing plans.");
    }

    plansData = await response.json();

    renderPlans();
  } catch (error) {
    console.error(error);

    planListEl.innerHTML = `
      <p class="error-message">
        Unable to load pricing plans.
      </p>
    `;
  }
}

pricingToggleEl.addEventListener("change", renderPlans);

fetchPlans();
