// Pretoria Home Electronics - Website JavaScript

document.addEventListener("DOMContentLoaded", function () {

    // Mobile navigation menu
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {

            const isOpen = navigation.classList.toggle("is-open");

            menuButton.setAttribute("aria-expanded", String(isOpen));

            menuButton.textContent = isOpen ? "✕ Close" : "☰ Menu";

        });

        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("is-open");

                menuButton.setAttribute("aria-expanded", "false");

                menuButton.textContent = "☰ Menu";

            });

        });

    }

    // Automatically update the copyright year
    document.querySelectorAll(".current-year").forEach(function (element) {

        element.textContent = new Date().getFullYear();

    });

    // Product search and filtering
    const searchInput = document.querySelector("#product-search");
    const productCards = document.querySelectorAll(".product-card");
    const noProductsMessage = document.querySelector("#no-products");

    if (searchInput && productCards.length > 0) {

        searchInput.addEventListener("input", function () {

            const searchTerm = searchInput.value.toLowerCase().trim();

            let visibleCount = 0;

            productCards.forEach(function (card) {

                const searchableText =
                    (card.textContent + " " + card.dataset.search).toLowerCase();

                const matches = searchableText.includes(searchTerm);

                card.hidden = !matches;

                if (matches) {
                    visibleCount++;
                }

            });

            if (noProductsMessage) {
                noProductsMessage.hidden = visibleCount !== 0;
            }

        });

    }

    // Automatically select the product on the enquiry page
    const productSelect = document.querySelector("#product");

    if (productSelect) {

        const requestedCategory =
            new URLSearchParams(window.location.search).get("category");

        if (requestedCategory) {

            const matchingOption = Array.from(productSelect.options).find(
                function (option) {
                    return option.value.toLowerCase() === requestedCategory.toLowerCase();
                }
            );

            if (matchingOption) {
                productSelect.value = matchingOption.value;
            }

        }

    }

});