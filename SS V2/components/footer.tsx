const socials = [
  {
    name: "Instagram",
    url: "https://instagram.com/softstandards",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "X",
    url: "https://x.com/softstandards",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://facebook.com/softstandards",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.09.07 1.373.14v3.34c-.149-.016-.408-.024-.732-.024-1.039 0-1.441.393-1.441 1.414v2.688h3.935l-.675 3.667h-3.26v8.168C19.396 23.214 24 18.144 24 12.02 24 5.385 18.627 0 12 0S0 5.385 0 12.02c0 5.588 4.005 10.304 9.101 11.671z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/softstandards",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-faint px-8 py-14 transition-colors duration-300">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-muted transition-colors hover:text-foreground"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4 text-[12px] text-muted">
          <a href="/privacy" className="transition-colors hover:text-foreground">
            Privacy Policy
          </a>
          <span className="text-separator">|</span>
          <a href="/terms" className="transition-colors hover:text-foreground">
            Terms of Service
          </a>
        </div>
        <p className="text-[12px] text-muted">
          &copy; {new Date().getFullYear()} Soft Standards Inc. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
