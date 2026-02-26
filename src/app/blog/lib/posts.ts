export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
  body: string;
};

const posts: Post[] = [
  {
    slug: "why-application-support-matters-after-launch",
    title: "Why Application Support Matters After Launch",
    excerpt:
      "Software doesn't stop at deployment. Learn how dedicated application support keeps your product running smoothly and your users happy.",
    date: "2026-02-15",
    author: "IT Dor Services",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    body: `
Application support is often an afterthought until something breaks. At IT Dor Services, we treat support as part of the product: when we build your application, we stay with you after launch.

**What application support covers**

- **Troubleshooting** – Diagnosing and resolving issues quickly so your team and users aren't blocked.
- **User training** – Helping your staff and customers get the most out of the software.
- **Documentation** – Keeping runbooks and guides up to date so knowledge isn't lost.
- **Bridge to development** – Clear communication between you and the dev team so fixes and improvements are prioritized correctly.

**Why one team for build and support**

When the same team that built the app also supports it, there's no handoff friction. We know the architecture, the decisions, and the trade offs. That means faster resolution and fewer misunderstandings.

We offer 1 month of free application support after every launch, with ongoing support available. If you're planning a new build or struggling with support for an existing app, get in touch.
    `.trim(),
  },
  {
    slug: "modern-stacks-for-reliable-software",
    title: "Modern Stacks for Reliable Software",
    excerpt:
      "How we choose technologies that scale, stay maintainable, and keep your project on track for the long term.",
    date: "2026-02-10",
    author: "IT Dor Services",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    body: `
Choosing the right tech stack isn't just about what's popular—it's about what fits your product, your team, and your timeline.

**What we consider**

- **Product type** – Web, mobile, API, or data pipeline each have different sweet spots.
- **Team and hiring** – We prefer stacks with strong communities and hiring pools so you can grow.
- **Maintainability** – Clear patterns, good tooling, and upgrade paths so the app doesn't become legacy in two years.
- **Integration** – How well the stack plays with your existing systems (auth, payments, CRM, etc.).

**Stacks we use**

We work with React, Next.js, TypeScript, Node.js, Python, and cloud platforms like AWS and Vercel. For mobile, we use React Native or Flutter when it's the right fit. Every project gets a documented stack and handoff so your next developer or our support team can work on it without guesswork.

If you're starting a new project or refactoring an old one, we can help you choose and then build on a stack that will last.
    `.trim(),
  },
  {
    slug: "one-team-development-and-support",
    title: "One Team: Development and Support Together",
    excerpt:
      "Why combining software development with application support in a single team leads to better outcomes and fewer headaches.",
    date: "2026-02-05",
    author: "IT Dor Services",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    body: `
Many companies split "build" and "support" between different teams or vendors. That can work, but it often creates gaps: support doesn't know why something was built that way, and development doesn't hear enough from real users.

**The integrated approach**

At IT Dor Services, one team handles both:

1. **Build** – We design and develop your application with modern stacks and clear architecture.
2. **Launch** – We deploy and include 1 month of free application support.
3. **Support** – Our Application Support Specialist becomes your single point of contact for training, bugs, and feature questions.

**Benefits**

- **Faster fixes** – The people who built it can fix it without digging through someone else's code.
- **Better communication** – We translate between you and the technical details so nothing gets lost.
- **Continuity** – No "that was the other team" when something goes wrong.

Whether you're planning a new build or need ongoing support for an existing application, we can help. Get in touch for a free consultation.
    `.trim(),
  },
  {
    slug: "when-to-choose-custom-software",
    title: "When to Choose Custom Software Over Off the Shelf",
    excerpt:
      "Off-the-shelf tools are great—until they're not. Here's when it makes sense to invest in custom development.",
    date: "2026-01-28",
    author: "IT Dor Services",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    body: `
Not every business need requires custom software. But when processes are unique, workflows are complex, or off the shelf tools keep hitting limits, custom development can be the right move.

**Signs custom might be right**

- You're stitching together several tools with spreadsheets and manual steps.
- Your industry or workflow has specific rules that generic software doesn't handle well.
- You need integrations (payments, CRM, inventory) that your current tools don't support cleanly.
- You've outgrown templates and need something that scales with your operations.

**What we deliver**

We build custom web, mobile, and cloud solutions with modern stacks. You get a product tailored to your process, plus 1 month of free application support after launch. If you're not sure whether to build or buy, we're happy to discuss your situation in a free consultation.
    `.trim(),
  },
  {
    slug: "remote-delivery-without-the-headaches",
    title: "Remote Delivery Without the Headaches",
    excerpt:
      "How we deliver software and support remotely while keeping communication clear and projects on track.",
    date: "2026-01-20",
    author: "IT Dor Services",
    image: "/assets/service2/remote_delivery.jpg",
    body: `
We work remotely with clients worldwide. That doesn't mean you get less visibility or slower communication we structure projects so you always know where things stand.

**How we keep it smooth**

- **Regular updates** – Status and demos on a schedule that works for you.
- **Single point of contact** – No chasing multiple people; one team, one conversation.
- **Application support included** – After launch, the same team that built the app is there for training, bugs, and questions.
- **Clear documentation** – So your team (and ours) can work from the same playbook.

If you're considering a remote development and support partner, we'd be glad to talk. Same day response on consultations get in touch to get started.
    `.trim(),
  },
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
