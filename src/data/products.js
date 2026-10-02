import KotnaniThumbnail from "../assets/thumbnails/kgs-website-thumbnail.png";
import MapSystemsThumbnail from "../assets/thumbnails/mapsystem-website-thumbnail.png";
import SanopixThumbnail from "../assets/thumbnails/sanopix-website-thumbnail.png";

export const CREAM = "#EAE4D5";
export const ACCENT = "#8B5CF6";
export const ROSE = "#F43F6E";
export const RED = "#EF2D3A";
export const YELLOW = "#FACC15";

export const PRODUCTS = [
  {
    id: "kotnani-global",
    name: "Kotnani Global",
    type: "Next.js Independent Project",
    hook: "An 80+ page corporate site, rebuilt in Next.js.",
    desc: "Independently recreated an existing 80+ page corporate website using React.js and Next.js to strengthen modern frontend skills. Repeated static page structures became reusable React components, organised with the Next.js App Router and deployed on Netlify for performance evaluation.",
    highlights: [
      "Converted repeated static page structures into reusable React components organised with Next.js.",
      "Implemented responsive layouts based on the existing website designs and Figma-based UI requirements.",
      "Applied SEO practices including metadata, canonical URLs, Open Graph tags and SEO-friendly page structures.",
      "Applied frontend performance optimisation and evaluated the Next.js build against the existing website.",
      "Gained practical experience with the App Router, static generation and production deployment.",
      "Originally built the 100+ page HTML, CSS, JavaScript and Bootstrap version of kotnaniglobal.com from scratch.",
    ],
    stack: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "Git", "Netlify"],
    url: "https://kotnani-global-nextjs.netlify.app/",
    accent: ROSE,
    mockup: { src: KotnaniThumbnail },
  },
  {
    id: "map-systems",
    name: "MAP Systems",
    type: "Large-Scale Production Website",
    hook: "A 760+ page production website, built and maintained.",
    desc: "Development and ongoing maintenance of a 760+ page production website — new pages, UI changes, blog and service content, PHP contact forms, technical SEO, schema markup, redirects and continuous PageSpeed improvements.",
    highlights: [
      "Developed new pages and implemented UI changes based on design and business requirements.",
      "Managed blog, service, resource and other content updates across hundreds of pages.",
      "Implemented PHP-based contact form functionality with validation and SMTP / PHPMailer email delivery.",
      "Worked on technical SEO, schema markup, metadata, redirects and HTTP status codes during URL changes and site restructuring.",
      "Continuously improved website performance, PageSpeed and Core Web Vitals.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP"],
    url: "https://mapsystemsindia.com/",
    accent: RED,
    mockup: { src: MapSystemsThumbnail },
  },
  {
    id: "sanopix",
    name: "Sanopix",
    type: "Corporate Website",
    hook: "A digital marketing agency site, tuned for speed and search.",
    desc: "Website development, maintenance, content updates and technical SEO for a digital marketing agency — service and blog pages, FAQ sections, sliders and responsive UI, with structured data and asset optimisation for better PageSpeed.",
    highlights: [
      "Implemented and maintained service pages, resource/blog pages, FAQ sections, sliders and navigation.",
      "Implemented structured data including Service and FAQ schema markup.",
      "Worked on metadata, canonical URLs, Open Graph tags and other SEO requirements.",
      "Optimised fonts, images, CSS and JavaScript to improve loading performance.",
      "Resolved PageSpeed issues including LCP, CLS, render-blocking resources and asset loading.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP"],
    url: "https://sanopix.in/",
    accent: YELLOW,
    mockup: { src: SanopixThumbnail },
  },
];
