(function () {
  let extractedText = "";

  // Function to extract post content when comment button is clicked
  function handleCommentButtonClick(event) {
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
      } else {
        console.log("No description found");
        extractedText = "";
      }
    } else {
      console.log("No post container found");
      extractedText = "";
    }
  }

  // Function to insert extracted text into comment field
  function insertTextInCommentField(inputEvent) {
    if (extractedText) {
      let editor = inputEvent.target.closest(
        '[data-placeholder="Add a comment…"]'
      );
      if (editor) {
        // Find the <p> tag within the editor
        const paragraphTag = editor.querySelector("p");

        if (paragraphTag) {
          paragraphTag.textContent = extractedText;

          // Trigger input event
          const inputEvent = new Event("input", {
            bubbles: true,
            cancelable: true,
          });
          editor.dispatchEvent(inputEvent);

          // Reset extracted text to prevent repeated insertion
          extractedText = "";
        }
      }
    }
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

  // Add global input event listener to handle comment field text insertion
  document.addEventListener("input", insertTextInCommentField);

  // Initial setup
  addCommentButtonListeners();
  observeCommentButtons();
})();
