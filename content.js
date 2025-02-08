(function () {
  let extractedText = "";
  let clickedButton = null;
  let scrollTimeout = null;

  // Function to extract post content when comment button is clicked
  function handleCommentButtonClick(event) {
    // Store the clicked button
    clickedButton = event.target.closest('button[aria-label="Comment"]');

    // Find the closest post container
    const postContainer = event.target.closest(".fie-impression-container");

    if (postContainer) {
      // Find the description container with tvm-parent-container class
      const descriptionContainer = postContainer.querySelector(
        ".tvm-parent-container"
      );

      if (descriptionContainer) {
        // Extract text content
        extractedText = descriptionContainer.innerText.trim();
        console.log("Post content extracted:", extractedText);

        // Clear any existing scroll timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        // Wait for scroll to finish before attempting to write
        scrollTimeout = setTimeout(() => {
          // First attempt after scroll should be complete
          waitForCommentBox();
        }, 500); // Wait for 500ms after click to allow scroll to complete
      } else {
        console.log("No description found");
        extractedText = "";
      }
    } else {
      console.log("No post container found");
      extractedText = "";
    }
  }

  // Function to check if element is fully in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to wait for comment box to appear and insert text
  function waitForCommentBox() {
    const checkInterval = setInterval(() => {
      if (!clickedButton || !extractedText) {
        clearInterval(checkInterval);
        return;
      }

      // Start from the clicked button and traverse up to find the post container
      let currentElement = clickedButton;
      while (
        currentElement &&
        !currentElement.querySelector('[data-placeholder="Add a comment…"]')
      ) {
        currentElement = currentElement.parentElement;
      }

      // Find the editor within the current context
      const editor = currentElement
        ? currentElement.querySelector('[data-placeholder="Add a comment…"]')
        : null;

      if (editor) {
        // Check if editor is visible and in viewport
        if (editor.offsetParent !== null && isElementInViewport(editor)) {
          clearInterval(checkInterval);

          // Add a small delay to ensure the editor is fully initialized
          setTimeout(() => {
            // Find the <p> tag within the editor
            const paragraphTag = editor.querySelector("p");
            if (paragraphTag) {
              paragraphTag.textContent = extractedText;

              // Trigger input event to ensure LinkedIn registers the change
              const inputEvent = new Event("input", {
                bubbles: true,
                cancelable: true,
              });
              editor.dispatchEvent(inputEvent);

              // Reset extracted text and clicked button to prevent repeated insertion
              extractedText = "";
              clickedButton = null;
            }
          }, 100);
        }
      }
    }, 100); // Check every 100ms

    // Clear interval after 5 seconds to prevent infinite checking
    setTimeout(() => {
      clearInterval(checkInterval);
      // Reset state if we timeout
      extractedText = "";
      clickedButton = null;
    }, 5000);
  }

  // Add click event listeners to all comment buttons
  function addCommentButtonListeners() {
    const commentButtons = document.querySelectorAll(
      'button[aria-label="Comment"]'
    );

    commentButtons.forEach((button) => {
      button.removeEventListener("click", handleCommentButtonClick);
      button.addEventListener("click", handleCommentButtonClick);
    });
  }

  // Continuously watch for comment buttons as they might be dynamically loaded
  function observeCommentButtons() {
    const observer = new MutationObserver(() => {
      addCommentButtonListeners();
    });

    // Start observing the entire document
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Initial setup
  addCommentButtonListeners();
  observeCommentButtons();
})();
