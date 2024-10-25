$(document).ready(function() {
    function updateHeaderAndNav() {
        var header = $(".header");
        var scrollTop = $(window).scrollTop();
        var navLinks = $(".nav a");

        // Add shadow to header when scrolling down
        if (scrollTop > 100) {
            header.css("box-shadow", "0 0 12px rgba(0,0,0,0.1)");
            navLinks.removeClass("active");
        } else {
            header.css("box-shadow", "none");
        }

        // Update active navigation based on scroll position
        if (scrollTop >= 100) {
            $(".section").each(function(index) {
                if ($(this).position().top <= scrollTop + 80) {
                    navLinks.removeClass("active");
                    navLinks.eq(index).addClass("active");
                }
            });
        } else {
            navLinks.removeClass("active");
            navLinks.filter(":first").addClass("active");
        }
    }

    function openModal(modal) {
        $(modal).fadeIn();
        $(".overlay").css("display", "flex");

        // Close the modal when the close button is clicked
        $(".modal .close").on("click", function(event) {
            event.preventDefault();
            $(".overlay, .modal").fadeOut();
        });
    }

    // Initialize header and navigation on page load
    updateHeaderAndNav();

    // Update header and navigation on scroll
    $(window).scroll(function() {
        updateHeaderAndNav();
    });

    // Smooth scroll when clicking on navigation links
    $(".nav a").on("click", function(event) {
        event.preventDefault();
        var target = $(this).attr("href");
        var targetPosition = $(target).offset().top - 70;

        $("body,html").animate({ scrollTop: targetPosition }, 800);
        return false;
    });

    // Open the contact modal when "Keep in Touch" or similar buttons are clicked
    $(".cta_btn a, .header_wrap .btn, .btn2").on("click", function(event) {
        event.preventDefault();
        openModal($(".contactus"));
    });

    // Handle project image clicks to open the modal with the project's details
    $(".work_content img").each(function() {
        var title = $(this).data("title");
        var description = $(this).data("desc");
        var src = $(this).attr("src");
        var category = $(this).data("category");
        var projectProfileModal = $(".project_profile");

        $(this).on("click", function() {
            openModal(projectProfileModal);
            projectProfileModal.find("img").attr("src", src);
            projectProfileModal.find(".sub_title").text(category);
            projectProfileModal.find("h3").text(title);
            projectProfileModal.find("p").text(description);
        });
    });
});