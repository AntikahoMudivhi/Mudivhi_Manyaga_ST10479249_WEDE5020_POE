// WAIT FOR THE HTML PAGE TO LOAD

document.addEventListener("DOMContentLoaded", function () {

    // MOBILE NAVIGATION MENU

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {

            navigation.classList.toggle("open");

            const isOpen = navigation.classList.contains("open");

            menuButton.setAttribute("aria-expanded", isOpen);

        });

        // CLOSE MENU AFTER CLICKING A LINK

        const navigationLinks = navigation.querySelectorAll("a");

        navigationLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");

            });

        });

    }


    // PRODUCT SEARCH FUNCTION

    const searchInput = document.getElementById("product-search");
    const productCards = document.querySelectorAll(".product-card");
    const searchMessage = document.getElementById("search-message");

    if (searchInput && productCards.length > 0) {

        searchInput.addEventListener("input", function () {

            const searchText = searchInput.value.toLowerCase().trim();

            let visibleProducts = 0;

            productCards.forEach(function (card) {

                const productName = card.dataset.product.toLowerCase();
                const productText = card.textContent.toLowerCase();

                const matches =
                    productName.includes(searchText) ||
                    productText.includes(searchText);

                card.hidden = !matches;

                if (matches) {
                    visibleProducts++;
                }

            });

            if (searchMessage) {

                if (visibleProducts === 0) {
                    searchMessage.textContent = "No products found. Please try another search.";
                } else {
                    searchMessage.textContent =
                        visibleProducts + " product category/categories found.";
                }

            }

        });

    }


    // AUTOMATIC PRODUCT CATEGORY SELECTION

    const categorySelect = document.getElementById("category");

    if (categorySelect) {

        const pageParameters = new URLSearchParams(window.location.search);
        const selectedCategory = pageParameters.get("category");

        if (selectedCategory) {

            const matchingOption = Array.from(categorySelect.options).find(
                function (option) {
                    return option.value.toLowerCase() === selectedCategory.toLowerCase();
                }
            );

            if (matchingOption) {
                categorySelect.value = matchingOption.value;
            }

        }

    }


    // ENQUIRY FORM VALIDATION

    const enquiryForm = document.getElementById("enquiry-form");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            if (!enquiryForm.checkValidity()) {

                event.preventDefault();
                enquiryForm.reportValidity();

            }

        });

    }


    // AUTOMATIC COPYRIGHT YEAR

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {

        element.textContent = new Date().getFullYear();

    });

});