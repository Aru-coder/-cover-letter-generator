import "./style.css";

const form = document.getElementById("coverForm");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const skills = document.getElementById("skills");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const regenerateBtn = document.getElementById("regenerateBtn");
const themeBtn = document.getElementById("themeBtn");

const resume = document.getElementById("resume");
const resumeStatus = document.getElementById("resumeStatus");

let lastData = {};

skills.addEventListener("input", () => {
  charCount.textContent =
    `${skills.value.length} / 500 Characters`;
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

if (resume) {
  resume.addEventListener("change", () => {
    if (resume.files.length > 0) {
      resumeStatus.textContent =
        `Uploaded: ${resume.files[0].name}`;
    } else {
      resumeStatus.textContent =
        "No Resume Uploaded";
    }
  });
}

async function generateLetter(data) {

  loading.classList.remove("hidden");

  await new Promise((resolve) =>
    setTimeout(resolve, 1500)
  );

  result.value = `Dear Hiring Manager,

I am writing to express my strong interest in the ${data.role} position at ${data.company}. I am excited about the opportunity to contribute my skills, enthusiasm, and dedication to an organization known for innovation and excellence.

My background includes experience and knowledge in ${data.skills}. Through academic projects, self-learning, and practical problem-solving, I have developed strong technical abilities along with excellent communication, teamwork, and analytical skills. These experiences have helped me build a solid foundation that enables me to adapt quickly to new challenges and deliver quality results.

I am passionate about continuous learning and professional growth. I enjoy working in collaborative environments where ideas can be shared, refined, and transformed into meaningful outcomes. I believe that my ability to learn quickly, take initiative, and remain committed to achieving goals would allow me to make a valuable contribution to your team.

What excites me most about ${data.company} is the opportunity to work alongside talented professionals and contribute to projects that create real impact. I am confident that my dedication, positive attitude, and willingness to take on challenges make me a strong candidate for this position.

I would welcome the opportunity to discuss how my skills, experiences, and career aspirations align with the needs of your organization. Thank you for taking the time to review my application and consider me for this role.

I look forward to the possibility of contributing to ${data.company} and becoming a valuable member of your team.

Sincerely,

${data.name}`;

  const words =
    result.value.trim().split(/\s+/).length;

  wordCount.textContent =
    `Word Count: ${words}`;

  loading.classList.add("hidden");
}

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const data = {
    name:
      document.getElementById("name").value,

    role:
      document.getElementById("role").value,

    company:
      document.getElementById("company").value,

    skills:
      skills.value
  };

  lastData = data;

  await generateLetter(data);
});

copyBtn.addEventListener("click", async () => {

  try {

    await navigator.clipboard.writeText(
      result.value
    );

    alert("Cover Letter Copied!");

  } catch (error) {

    console.error(error);

  }
});

downloadBtn.addEventListener("click", () => {

  const blob = new Blob(
    [result.value],
    { type: "text/plain" }
  );

  const link =
    document.createElement("a");

  link.href =
    URL.createObjectURL(blob);

  link.download =
    "cover-letter.txt";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
});

regenerateBtn.addEventListener(
  "click",
  async () => {

    if (
      lastData &&
      lastData.name
    ) {

      await generateLetter(
        lastData
      );

    }

  }
);
