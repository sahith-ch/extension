// Load the captured component data
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("component", (data) => {
      const component = data.component;
      if (component) {
        document.getElementById("preview").innerHTML = component.html;
      }
    });
  let x=    document.getElementById("export-react")
    // Export as React Component
    if(x){
    x.addEventListener("click", () => {

      chrome.storage.local.get("component", (data) => {
        const reactComponent = generateReactComponent(data.component);
        downloadFile("Component.jsx", reactComponent);
      });
    });
}
    // Export as Vue Component  
   
  });
  
  // Generate React Component
  function generateReactComponent(component) {
    const html = component.html.replace(/class=/g, "className="); // JSX conversion
    return `
  import React from "react";
  
  const Component = () => (
    <>
      ${html}
    </>
  );
  
  export default Component;
  `;
  }
  
  // Generate Vue Component
  function generateVueComponent(component) {
    return `
  <template>
    ${component.html}
  </template>
  
  <script>
  export default {
    name: "Component",
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  `;
  }
  
  // Helper: Download file
  function downloadFile(filename, content) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  document.getElementById("enable-hover").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "enableHover" });
    });
  });
  
  document.getElementById("disable-hover").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "disableHover" });
    });
  });
  

// document.getElementById('startSelection').addEventListener('click', async () => {
//     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: enableSelection
//     });
//   });
  
//   document.getElementById('generateCode').addEventListener('click', async () => {
//     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//     const techStack = document.getElementById('techStack').value;
    
//     chrome.runtime.sendMessage({
//       action: 'generateCode',
//       techStack: techStack
//     });
//   });