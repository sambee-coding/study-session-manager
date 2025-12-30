const form = document.getElementById("inputForm");
const message = document.querySelector("p");


form.addEventListener("submit", analyzeForm);

function getFormData(form){
    return {
        subject:form[0].value.trim(),
        goal:form[1].value.trim(),
        duration:form[2].value.trim()
    };
}
function isValidFormData({subject,goal,duration}){
    return subject && goal && duration;
}
function analyzeForm(event) {
  event.preventDefault();
  message.style.display  = "block";
  const aioutPutDiv = document.getElementById('ai-output');
  aioutPutDiv.style.display = 'block';

  const formData = getFormData(event.target);

  if (!isValidFormData(formData)) {
    message.textContent = "Please enter all the fields.";
     
    return; 
   
  }
    message.textContent = "Analyzing your study session... ⏳";
   const prompt = buildPrompt(formData);
   fetchAISuggestions(prompt);
}


 
function buildPrompt({subject,goal,duration}){
 return `
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
`;
}
function renderResponse(text){

    const outPutDiv = document.getElementById("ai-output");
    outPutDiv.innerHTML = ""; //this will clear the old content

    //spliting the response into sections
    const sections = text.split("\n\n");

        sections.forEach(section =>{
        const lines = section.split("\n");
        if(lines.length < 2 ) return;

        //creatng on card per section
        const card = document.createElement("div");
        card.classList.add("ai-card");

        //creating and adding title
        const titles = document.createElement("h4");
        titles.textContent = lines[0];
           card.appendChild(titles);
           //create paragraphs with animation
           lines.slice(1).forEach((line,index) =>{
            var contianer = document.createElement("div");
            contianer.textContent = line.replace("-","").trim();
            contianer.classList.add("fade-in"); //hidden intially

            card.appendChild(contianer);
         
           
            //allowing the animation to start showing
            setTimeout(() => {
        contianer.classList.add("show"); // triggers the CSS transition
      }, index * 300); 
           
           
        });
           outPutDiv.appendChild(card);
   
      
    });
      
}
 function fetchAISuggestions(prompt) {
  const apiKey = "2faae9d4e47d0b0a09a9to05afdf381d";

  const encodedPrompt = encodeURIComponent(prompt);
  const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodedPrompt}&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("API response was not ok");
      }
      return response.json();
    })
    .then(data => {
      renderResponse(data.answer);
      message.textContent = "Finished analyzing your inputs."
    })
    .catch(error => {
      console.error(error);
      message.textContent = "Something went wrong. Please try again.";
    });
}