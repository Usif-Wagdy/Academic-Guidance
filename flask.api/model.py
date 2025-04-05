import re
import spacy
import json
import pandas as pd
from dataclasses import dataclass
from pdfminer.high_level import extract_text
from fuzzywuzzy import process, fuzz
from transformers import T5ForConditionalGeneration, T5Tokenizer

# تحميل نموذج NLP الإنجليزي
nlp = spacy.load("en_core_web_sm")

# تحميل نموذج T5 لتحسين النصوص
model_name = "t5-small"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# تحميل بيانات SWOT
try:
    df = pd.read_csv("swot.csv")
    df["Job Title"] = df["Job Title"].str.lower().str.strip()
except Exception as e:
    print(f"Error loading dataset: {e}")
    df = pd.DataFrame(columns=["Job Title", "Key Skills"])

# تعريف الأنماط العادية (Regex)
EMAIL_REGEX = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
PHONE_REGEX = r"\+?\d[\d -]{8,}\d"
LINK_REGEX = r"(https?:\/\/)?(www\.)?(linkedin|github)\.com\/([\w\-]+)"
EDUCATION_KEYWORDS = ["University", "Academy", "Institute", "College", "School", "Faculty", "Diploma", "Bachelor", "Master", "PhD"]

@dataclass
class CVData:
    name: str
    phone: str
    email: str
    linkedin: str
    github: str
    job_title: str
    skills: list
    education: list
    experience: str
    summary: str
    improved_summary: str
    missing_skills: list
    comparison_status: str
    missing_fields: list
    swot: dict

# استخراج النص من PDF
def extract_text_from_pdf(pdf_path):
    try:
        return extract_text(pdf_path)
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""

# استخراج الاسم
def extract_name(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return "Not Found"

# استخراج المهارات
def extract_skills(text):
    skills_section = re.search(r"SKILLS\s*(.*?)(?:\n\n|$)", text, re.DOTALL)
    skills = [skill.strip().lower().replace("(es6+)", "") for skill in re.split(r",|•|\n|\|", skills_section.group(1)) if skill.strip()] if skills_section else []
    return list(set(skills))

# استخراج التعليم
def extract_education(text):
    doc = nlp(text)
    return list(set(ent.text for ent in doc.ents if ent.label_ == "ORG" and any(keyword in ent.text for keyword in EDUCATION_KEYWORDS)))

# استخراج المسمى الوظيفي
def extract_job_title(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "JOB_TITLE":
            return ent.text
    job_title_match = re.search(r"\n(.*?)\n", text)
    return job_title_match.group(1).strip() if job_title_match else "Not Found"

# التحقق من وجود قسم الخبرة
def extract_experience(text):
    return "Found" if "Experience" in text else "Not Found"

# إيجاد أقرب وظيفة في قاعدة البيانات
def find_closest_job(job_title):
    if df.empty or "Job Title" not in df:
        return None
    closest_match = process.extractOne(job_title, df["Job Title"].dropna().unique(), scorer=fuzz.ratio)
    return closest_match[0] if closest_match and closest_match[1] >= 80 else None

# مقارنة المهارات وتحليل SWOT
def compare_skills(job_title, user_skills):
    matched_job = find_closest_job(job_title.lower().strip())
    if not matched_job:
        return [], f"⚠ No matching job found for {job_title} in the database.", {}

    job_data = df[df["Job Title"] == matched_job].iloc[0]
    required_skills = set(str(job_data["Key Skills"]).lower().split(", "))
    user_skills = set(user_skills)

    missing_skills = [skill for skill in required_skills if not any(fuzz.partial_ratio(skill, u_skill) > 80 for u_skill in user_skills)]
    strengths = [skill for skill in user_skills if any(fuzz.partial_ratio(skill, r_skill) > 80 for r_skill in required_skills)]

    swot = {
        "Strengths": strengths,
        "Weaknesses": missing_skills,
        "Opportunities": ["Upskilling can enhance career growth"] if missing_skills else ["Already well-qualified"],
        "Threats": ["Major skills missing" if len(missing_skills) > len(strengths) else "Minimal threats"]
    }

    return missing_skills, f"✅ Matched job: {matched_job} | Comparison successful.", swot

# استخراج الـ Summary
def extract_summary(text):
    match = re.search(r"(Summary|Professional Summary|About Me|Overview)\s*[:\n](.*?)(\n\n|\Z)", text, re.DOTALL | re.IGNORECASE)
    return match.group(2).strip() if match else "Summary not found"

# تحسين الـ Summary باستخدام T5
def improve_summary(summary_text):
    if summary_text == "Summary not found":
        return summary_text
    prompt = f"Improve this CV summary: {summary_text}"
    input_ids = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True, max_length=512).input_ids
    output_ids = model.generate(input_ids, max_length=200, num_beams=3, temperature=0.8, top_k=50)
    return tokenizer.decode(output_ids[0], skip_special_tokens=True)

# استخراج جميع البيانات من السيرة الذاتية
def extract_information(text):
    job_title = extract_job_title(text)
    skills = extract_skills(text)
    education = extract_education(text)
    experience = extract_experience(text)
    summary = extract_summary(text)
    improved_summary = improve_summary(summary)

    email = re.search(EMAIL_REGEX, text)
    phone = re.search(PHONE_REGEX, text)
    links = re.findall(LINK_REGEX, text)
    linkedin = next((f"https://linkedin.com/in/{link[3]}" for link in links if "linkedin" in link[2]), "Not Provided")
    github = next((f"https://github.com/{link[3]}" for link in links if "github" in link[2]), "Not Provided")

    missing_skills, compare_status, swot = compare_skills(job_title, skills)

    return json.dumps(CVData(
        name=extract_name(text), phone=phone.group() if phone else "Not Provided",
        email=email.group() if email else "Not Provided", linkedin=linkedin, github=github,
        job_title=job_title, skills=skills, education=education, experience=experience,
        summary=summary, improved_summary=improved_summary, missing_skills=missing_skills,
        comparison_status=compare_status, missing_fields=[], swot=swot
    ).__dict__, indent=4)
