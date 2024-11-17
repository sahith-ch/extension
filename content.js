let isHoverEnabled = false; // Tracks whether hover mode is active
let selectedElement = null;



// Add hover effect


// Capture element on click
document.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  const componentData = extractComponentData(e.target);
  console.log("Component Data:", componentData);

  // Send component data to the background script
  chrome.runtime.sendMessage({
    type: "componentCaptured",
    component: componentData,
  });
});

// Extract HTML, CSS, and inline styles
function extractComponentData(element) {
  return {
    html: element.outerHTML,
    styles: getComputedStyles(element),
  };
}

// Helper: Extract computed styles
function getComputedStyles(element) {
  const computed = window.getComputedStyle(element);
  let styles = {};
  for (let key of computed) {
    styles[key] = computed.getPropertyValue(key);
  }
  return styles;
}


// Function to enable hover effect
function enableHover() {
  if (isHoverEnabled) return; // Prevent multiple activations
  isHoverEnabled = true;

  document.addEventListener("mouseover", handleMouseOver);
  document.addEventListener("mouseout", handleMouseOut);

  console.log("Hover effect enabled");
}

// Function to disable hover effect
function disableHover() {
  if (!isHoverEnabled) return; // Prevent deactivation if already disabled
  isHoverEnabled = false;

  document.removeEventListener("mouseover", handleMouseOver);
  document.removeEventListener("mouseout", handleMouseOut);

  if (selectedElement) {
    selectedElement.style.outline = ""; // Reset any remaining outline
    selectedElement = null;
  }

  console.log("Hover effect disabled");
}

// Hover event handlers
function handleMouseOver(e) {
  if (selectedElement) selectedElement.style.outline = ""; // Reset previous
  selectedElement = e.target;
  selectedElement.style.outline = "2px solid red"; // Highlight hovered element
}

function handleMouseOut(e) {
  if (selectedElement) selectedElement.style.outline = ""; // Reset outline
  selectedElement = null;
}

// Listen for messages from the extension popup or background script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "enableHover") {
//     enableHover();
//   } else if (message.action === "disableHover") {
//     disableHover();
//   }
// });
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received:", message);
    if (message.action === "enableHover") {
      enableHover();
    }
  });
  
// let selectedElement = null;

// function enableSelection() {
//   document.body.style.cursor = 'crosshair';
  
//   document.addEventListener('mouseover', highlightElement);
//   document.addEventListener('click', selectElement);
// }

// function highlightElement(e) {
//   e.preventDefault();
//   e.stopPropagation();
  
//   if (selectedElement) {
//     selectedElement.style.outline = '';
//   }
  
//   selectedElement = e.target;
//   selectedElement.style.outline = '2px solid #4CAF50';
// }

// function selectElement(e) {
//   e.preventDefault();
//   e.stopPropagation();
  
//   const elementHTML = selectedElement.outerHTML;
//   const styles = getComputedStyle(selectedElement);
  
//   chrome.runtime.sendMessage({
//     action: 'elementSelected',
//     data: {
//       html: elementHTML,
//       styles: JSON.stringify(Array.from(styles))
//     }
//   });
  
//   document.removeEventListener('mouseover', highlightElement);
//   document.removeEventListener('click', selectElement);
//   document.body.style.cursor = 'default';
// }