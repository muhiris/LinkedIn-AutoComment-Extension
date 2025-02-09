# LinkedIn Comment Extension

I built a Chrome extension that dynamically captures LinkedIn post content and fills comments with the same text. Currently, it doesn't integrate with Phind AI, but I have its code. The next step is to send the captured post content to Phind AI, receive a response, and replace the comment content with the AI-generated text. I'm sharing this with the community and looking for contributors to help integrate the API and complete its functionality.

https://github.com/user-attachments/assets/cf16a625-ea85-4a44-9e3c-5c961178fd0b


## Current Features

- Automatically captures post content when you click the comment button
- Finds the correct comment box for the post you clicked
- Inserts the captured content into the comment field
- Handles LinkedIn's dynamic loading and scrolling behavior
- Works with multiple posts on the page




## Planned Features

1. Implement FREE AI API (Phind) call functionality
2. Send post content to the API for response generation
3. Insert the generated response into the comment field
4. Test the extension with multiple posts
5. Refactor the code for better performance

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder


## Development Status

- ✅ Post content extraction
- ✅ Comment field detection
- ✅ Content insertion
- ⏳ API integration (pending)
- ⏳ Response generation (pending)

## Next Steps



## Usage (Current Version)

1. Install the extension
2. Go to LinkedIn
3. Click the comment button on any post
4. The post content will be automatically copied to the comment field

Note: API integration is pending. Currently, the extension only copies content without generating responses.
