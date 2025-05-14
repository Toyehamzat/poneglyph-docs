export type Template = {
    id: string;
    label: string;
    imageUrl: string;
    initialContent: string;
};

export const templates: Template[] = [
    {
        id: "blank",
        label: "Blank Document",
        imageUrl: "/blank-document.svg",
        initialContent: "",
    },
    {
        id: "business-letter",
        label: "Business Letter",
        imageUrl: "/business-letter.svg",
        initialContent: `
            <p style="text-align: right;">[Your Name]<br />[Your Address]<br />[City, State, ZIP Code]</p>
            <p style="text-align: right;">[Date]</p>
            <p>[Recipient Name]<br />[Company Name]<br />[Address]</p>
            <p>Dear [Recipient Name],</p>
            <p>I am writing to inform you about...</p>
            <p>Sincerely,<br />[Your Name]</p>
        `,
    },
    {
        id: "cover-letter",
        label: "Cover Letter",
        imageUrl: "/cover-letter.svg",
        initialContent: `
            <p style="text-align: right;">[Your Name]<br />[Your Email] | [Your Phone]</p>
            <p>[Date]</p>
            <p>[Hiring Manager Name]<br />[Company Name]</p>
            <p>Dear [Hiring Manager],</p>
            <p>I am writing to express my interest in the [Job Title] position at [Company Name]...</p>
            <p>Thank you for your time and consideration.<br />Sincerely,<br />[Your Name]</p>
        `,
    },
    {
        id: "letter",
        label: "Letter",
        imageUrl: "/letter.svg",
        initialContent: `
            <p>[Your Name]<br />[Your Address]</p>
            <p>[Date]</p>
            <p>[Recipient Name]<br />[Recipient Address]</p>
            <p>Dear [Recipient Name],</p>
            <p>I hope this letter finds you well. I wanted to reach out to...</p>
            <p>Best regards,<br />[Your Name]</p>
        `,
    },
    {
        id: "project-proposal",
        label: "Project Proposal",
        imageUrl: "/project-proposal.svg",
        initialContent: `
            <h1 style="text-align: center;">Project Proposal</h1>
            <h2>Project Title: [Your Project Title]</h2>
            <p><strong>Prepared by:</strong> [Your Name]</p>
            <h3>1. Introduction</h3>
            <p>Provide a brief overview of the project and its objectives...</p>
            <h3>2. Scope</h3>
            <p>Define the scope and deliverables...</p>
            <h3>3. Timeline</h3>
            <p>Outline the expected timeline...</p>
            <h3>4. Budget</h3>
            <p>Estimate the budget requirements...</p>
        `,
    },
    {
        id: "resume",
        label: "Resume",
        imageUrl: "/resume.svg",
        initialContent: `
            <h1 style="text-align: center;">[Your Name]</h1>
            <p style="text-align: center;">[Email] | [Phone] | [LinkedIn]</p>
            <h2>Summary</h2>
            <p>Brief professional summary...</p>
            <h2>Experience</h2>
            <p><strong>[Job Title]</strong> – [Company Name]<br />[Date Range]</p>
            <ul>
                <li>Responsibility or achievement #1</li>
                <li>Responsibility or achievement #2</li>
            </ul>
            <h2>Education</h2>
            <p><strong>[Degree]</strong> – [School Name]<br />[Graduation Year]</p>
            <h2>Skills</h2>
            <ul>
                <li>Skill 1</li>
                <li>Skill 2</li>
            </ul>
        `,
    },
    {
        id: "software-proposal",
        label: "Software Proposal",
        imageUrl: "/software-proposal.svg",
        initialContent: `
            <h1 style="text-align: center;">Software Development Proposal</h1>
            <p><strong>Client:</strong> [Client Name]</p>
            <p><strong>Prepared by:</strong> [Your Company / Name]</p>
            <h2>1. Project Overview</h2>
            <p>This proposal outlines a software solution that will...</p>
            <h2>2. Features</h2>
            <ul>
                <li>Feature 1 description</li>
                <li>Feature 2 description</li>
            </ul>
            <h2>3. Timeline</h2>
            <p>Estimated duration and key milestones...</p>
            <h2>4. Cost</h2>
            <p>Total estimated cost and payment terms...</p>
        `,
    },
];
