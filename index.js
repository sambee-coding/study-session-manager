const form = document.getElementById("inputForm");
const message = document.querySelector("p");


form.addEventListener("submit", analyzeForm);

function analyzeForm(event) {
  event.preventDefault();
  message.style.display  = "block";
  const aioutPutDiv = document.getElementById('ai-output');
  aioutPutDiv.style.display = 'block';

  const subject = event.target[0].value.trim();
  const goal = event.target[1].value.trim();
  const duration = event.target[2].value.trim();
 
  
  if (!subject || !goal || !duration) {
    message.textContent = "Please enter all the fields.";
     
    return; 
   
  }

  message.textContent = "Analyzing your study session... ⏳";

  const apiKey = "2faae9d4e47d0b0a09a9to05afdf381d";

 const prompt = `
You are a productivity coach.

Analyze the study session below and give clear, structured suggestions.
IMPORTANT RULES:
- Do NOT use markdown
- Do NOT use #, ##, *, **, or bullet symbols
- Use plain text only
- Separate sections using line breaks
- Label sections clearly using words only
- provide practical and actionable advice
- keep each section concise 
- break the paragragraphs into smaller chunks for easy reading

Session Details:
Subject: ${subject}
Goal: ${goal}
Duration: ${duration} minutes

Provide the response in this exact format:

FOCUS STRATEGY:
-(write 5 short sentences)
- use line breaks between sentences

TIME MANAGEMENT:
(write 5 short sentences)
- use line breaks between sentences

DISTRACTION HANDLING:
(write 5 short sentences)
- use line breaks between sentences

MOTIVATION:
(write 1 short sentence)
`
function renderResponse(text){

    const outPutDiv = document.getElementById("ai-output");
    outPutDiv.innerHTML = "";
    const sections = text.split("\n\n");
    sections.forEach(section =>{
        const lines = section.split("\n");
        if(lines.length < 2 ) return;
        const card = document.createElement("div");
        card.classList.add("ai-card");
        const titles = document.createElement("h4");
        titles.textContent = lines[0];
           card.appendChild(titles);
           lines.slice(1).forEach(line =>{
            var paragraphs = document.createElement("div");
            paragraphs.textContent = line.replace("-","").trim();
            paragraphs.classList.add("fade-in");
          card.appendChild(paragraphs);
            outPutDiv.appendChild(card);
           
            setTimeout(() => {
        p.classList.add("show"); // triggers the CSS transition
      }, index * 300); 
           
           
        });
        message.textContent = "analysis completed "
      
    });
}
  const encodedPrompt = encodeURIComponent(prompt);

  const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodedPrompt}&key=${apiKey}`;
  


fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("API response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); 
    renderResponse(data.answer);

  })
  .catch((error) => {
    console.error(error);
    message.textContent = "Something went wrong. Please try again.";
  })
};