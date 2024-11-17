chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "componentCaptured") {
      // Store captured component data in local storage
      chrome.storage.local.set({ component: message.component }, () => {
        console.log("Component s    aved:", message.component);
      });
    }
  });
  
// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//     if (message.action === 'elementSelected') {
//       // Store selected element data
//       chrome.storage.local.set({ 
//         selectedElement: message.data 
//       });
//     }
    
//     if (message.action === 'generateCode') {
//       const { selectedElement } = await chrome.storage.local.get('selectedElement');
//       const convertedCode = await generateComponentCode(
//         selectedElement,
//         message.techStack
//       );
//       // Send converted code back to popup
//       chrome.runtime.sendMessage({
//         action: 'codeGenerated',
//         code: convertedCode
//       });
//     }
//   });
  
//   async function generateComponentCode(elementData, techStack) {
//     // Initialize Gemini Nano
//     const model = await window.gemini.initialize({
//       model: 'gemini-nano'
//     });
    
//     // Prepare prompt for component conversion
//     const prompt = `Convert this HTML and CSS to a ${techStack} component:
//       HTML: ${elementData.html}
//       Styles: ${elementData.styles}`;
    
//     // Generate code using Gemini Nano
//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   }