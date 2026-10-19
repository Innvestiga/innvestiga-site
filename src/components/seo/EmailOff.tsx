// Cloudflare's Email Address Obfuscation rewrites visible addresses to
// "[email protected]" and mailto links to /cdn-cgi/l/email-protection, which
// crawlers and AI assistants read literally. It skips anything between
// these two comments, so wrap every server-rendered address in EmailOff.
const marker = (comment: string) => <span hidden dangerouslySetInnerHTML={{ __html: `<!--${comment}-->` }} />;

export default function EmailOff({ children }: { children: React.ReactNode }) {
  return (
    <>
      {marker("email_off")}
      {children}
      {marker("email_on")}
    </>
  );
}
