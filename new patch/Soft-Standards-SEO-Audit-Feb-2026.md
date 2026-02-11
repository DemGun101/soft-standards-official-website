**SEO TECHNICAL AUDIT**

www.softstandards.net

  ------------------ ----------------------------------------------------
  **Date:**          February 9, 2026

  **Data Source:**   Google Search Console (Last 3 Months)

  **Hosting:**       GoDaddy (Custom-coded site via Claude Code)

  **Registrar:**     GoDaddy

  **Prepared for:**  Soft Standards Inc.
  ------------------ ----------------------------------------------------

+:---------------------:+:---------------------:+:---------------------:+
| **OVERALL HEALTH**    | **PAGES INDEXED**     | **3-MONTH CLICKS**    |
|                       |                       |                       |
| **CRITICAL**          | **3 of 8**            | **2 Total**           |
+-----------------------+-----------------------+-----------------------+

1\. Executive Summary

The softstandards.net website has critical indexing and technical SEO
issues preventing Google from crawling and ranking the site. Out of 8
total pages, only 3 are indexed. The remaining pages are blocked by
redirect errors, a 404 error, and domain canonicalization fragmentation.

Over the last 3 months, the entire site received only 2 clicks and 8
impressions across all of Google Search. 87.5% of impressions came from
Pakistan, with just 1 impression from the United States --- the primary
target market. The only query generating impressions is the branded term
\"soft standards.\" There is zero non-branded keyword visibility.

The root cause is a combination of broken redirect chains across URL
variants (http vs https, www vs non-www), a 404 error, and the absence
of fundamental SEO infrastructure that must be manually implemented on a
custom-coded site.

2\. Indexing & Coverage Analysis

Google Search Console reports 14 URLs discovered across the
softstandards.net property, of which only 3 are indexed. The 11
non-indexed URLs break down as follows:

2.1 Critical Issues from Google Search Console

  ---------------------------- ------------- ---------------- --------------
  **Issue**                    **Source**    **Validation**   **Pages**

  Redirect error               Website       Not Started      **8**

  Not found (404)              Website       Not Started      **1**

  Page with redirect           Website       Not Started      **1**

  Discovered -- currently not  Google        Not Started      **1**
  indexed                      systems                        
  ---------------------------- ------------- ---------------- --------------

2.2 Page-by-Page Status (Estimated)

Based on 3 indexed pages and 8 redirect errors across 8 known site
pages, the likely breakdown is:

  ---------------- -------------------------------- -----------------------
  **Page**         **Expected URL**                 **Likely Status**

  Home             https://www.softstandards.net/   **INDEXED**

  Services         /services                        **INDEXED**

  About            /about                           **INDEXED**

  Career           /career                          **REDIRECT ERROR**

  Pricing          /pricing                         **REDIRECT ERROR**

  Booking          /booking                         **REDIRECT ERROR**

  Case Studies     /case-studies                    **REDIRECT ERROR**

  Blog             /blog                            **NOT INDEXED**
  ---------------- -------------------------------- -----------------------

*Note: The 8 redirect errors in GSC likely include duplicate URL
variants (http/non-www versions) of the above pages. Exact affected URLs
should be verified in GSC under Coverage \> Redirect error.*

3\. Domain Canonicalization Problem

Google is treating your site as three separate entities, splitting all
SEO authority and link equity:

  ------------------------------------ ----------------- ------------ --------- ----------
  **URL Variant**                      **Impressions**   **Clicks**   **CTR**   **Pos.**

  **https://www.softstandards.net/**   7                 2            28.57%    6

  http://www.softstandards.net/        6                 1            16.67%    13.17

  https://softstandards.net/           1                 0            0%        6
  ------------------------------------ ----------------- ------------ --------- ----------

Instead of one domain with 14 combined impressions, the authority is
split three ways. The http variant is ranking at position 13.17 ---
significantly worse than the https version at position 6 --- because
Google sees it as a separate, weaker site.

Every variant must 301 redirect to the single canonical:
https://www.softstandards.net/

4\. Search Performance (Last 3 Months)

4.1 Overall Metrics

  ----------------- ----------------- ----------------- -----------------
  **Total Clicks**  **Total           **Average CTR**   **Average
                    Impressions**                       Position**

  **2**             **8**             **25%**           **6.0**
  ----------------- ----------------- ----------------- -----------------

4.2 Geographic Distribution

  --------------------- ------------ ----------------- ------------ --------------
  **Country**           **Clicks**   **Impressions**   **CTR**      **Position**

  Pakistan              2            7                 28.57%       6

  United States         0            1                 0%           6
  --------------------- ------------ ----------------- ------------ --------------

87.5% of impressions come from Pakistan. For an agency targeting
US/Canada/UK/Australia, this means zero organic visibility in target
markets for any commercial queries.

4.3 Query Analysis

Only one query generates impressions:

  ------------------------ ------------ ----------------- ---------- --------------
  **Query**                **Clicks**   **Impressions**   **CTR**    **Position**

  soft standards           0            2                 0%         6
  ------------------------ ------------ ----------------- ---------- --------------

Zero non-branded keyword visibility. No presence for commercial terms
like \"AI marketing agency,\" \"marketing automation services,\" \"web
development agency,\" or any service-related queries.

4.4 Device Breakdown

All 8 impressions and 2 clicks came exclusively from desktop. Zero
mobile impressions may indicate mobile crawling or rendering issues
worth investigating.

5\. Root Cause Analysis

5.1 Broken Redirect Chains (Primary Cause)

When Googlebot requests a page, it encounters a redirect chain or loop.
For example: http://softstandards.net → https://softstandards.net →
https://www.softstandards.net → and then either loops back or hits a
dead end. After too many hops, Googlebot abandons the crawl and reports
a \"Redirect error.\" This single issue blocks 8 URLs from indexing.

5.2 No Canonical Consolidation

The server does not enforce a single canonical URL. All four variants
(http/https × www/non-www) resolve independently, splitting PageRank,
crawl budget, and indexing signals across multiple versions of every
page.

5.3 Missing SEO Infrastructure

As a custom-coded site (not a CMS like WordPress), several SEO
fundamentals that platforms handle automatically are likely missing and
must be implemented in code:

- XML sitemap (sitemap.xml)

- Canonical tags (\<link rel=\"canonical\"\>) in HTML \<head\>

- Optimized meta title and description tags per page

- robots.txt file

- Structured data / schema markup (Organization, LocalBusiness, Service)

- Internal linking strategy between pages

6\. Fix Plan --- Priority Action Items

Phase 1: Fix Redirects --- CRITICAL (Days 1--2)

Since the site is custom-coded on GoDaddy hosting, use the .htaccess
file in the site root:

**.htaccess redirect rules:**

> RewriteEngine On
>
> \# Force HTTPS
>
> RewriteCond %{HTTPS} off
>
> RewriteRule \^(.\*)\$ https://%{HTTP_HOST}/\$1 \[R=301,L\]
>
> \# Force www
>
> RewriteCond %{HTTP_HOST} !\^www\\. \[NC\]
>
> RewriteRule \^(.\*)\$ https://www.%{HTTP_HOST}/\$1 \[R=301,L\]

This ensures every request to http://softstandards.net,
https://softstandards.net, and http://www.softstandards.net resolves to
https://www.softstandards.net/ via a single 301 redirect.

If GoDaddy hosting uses Nginx instead of Apache, add equivalent rules in
the server config or use GoDaddy's Domain Forwarding settings (DNS
Management \> Forwarding \> 301 Permanent to
https://www.softstandards.net/).

**Verification --- after implementing, test all four variants:**

- http://softstandards.net → 301 → https://www.softstandards.net/

- https://softstandards.net → 301 → https://www.softstandards.net/

- http://www.softstandards.net → 301 → https://www.softstandards.net/

- https://www.softstandards.net → 200 OK (no redirect, serves the page)

*Test command: curl -sIL http://softstandards.net \| grep -iE
\"HTTP/\|location:\"*

Phase 2: Fix 404 & Request Reindexing (Days 2--3)

1.  In GSC, go to Coverage \> Not found (404) to identify the broken URL

2.  Either restore the page or create a 301 redirect to the most
    relevant existing page

3.  Go to GSC \> URL Inspection \> paste each of your 8 page URLs one by
    one

4.  Click \"Request Indexing\" for each page after the redirect fixes
    are live

Phase 3: SEO Infrastructure (Week 2)

These must be implemented manually in your codebase since the site is
custom-coded:

**A. Create /sitemap.xml**

> \<?xml version=\"1.0\" encoding=\"UTF-8\"?\>
>
> \<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\>
>
> \<url\>
>
> \<loc\>https://www.softstandards.net/\</loc\>
>
> \<lastmod\>2026-02-09\</lastmod\>
>
> \<priority\>1.0\</priority\>
>
> \</url\>
>
> \<!\-- Repeat for all 8 pages \--\>
>
> \</urlset\>

Submit the sitemap in GSC under Sitemaps \> Add a new sitemap.

**B. Add canonical tags to every page's \<head\>:**

> \<link rel=\"canonical\"
> href=\"https://www.softstandards.net/PAGE-PATH\" /\>

**C. Create /robots.txt:**

> User-agent: \*
>
> Allow: /
>
> Sitemap: https://www.softstandards.net/sitemap.xml

**D. Optimize meta titles and descriptions for all 8 pages:**

  ------------- ---------------------------------------------------------
  **Page**      **Recommended Title Tag**

  Home          Soft Standards \| AI-Powered Marketing Agency \| NYC &
                Lahore

  Services      Marketing Services \| Web Dev, UI/UX, SEO & AI Automation
                \| Soft Standards

  About         About Soft Standards \| AI Marketing Agency \| 150+
                Systems Built

  Career        Careers at Soft Standards \| Join Our AI Marketing Team

  Pricing       Pricing \| Performance-Based Marketing Plans \| Soft
                Standards

  Booking       Book a Free Consultation \| Soft Standards AI Marketing
                Agency

  Case Studies  Case Studies \| \$47M+ Client Revenue \| Soft Standards

  Blog          Marketing Blog \| AI Automation & Growth Strategies \|
                Soft Standards
  ------------- ---------------------------------------------------------

**E. Add structured data (JSON-LD) to the homepage:**

Include Organization schema with name, URL, logo, address (NYC +
Lahore), and sameAs links for social profiles. Add LocalBusiness schema
for local SEO. Add Service schema to the services page.

Phase 4: Content & Keyword Strategy (Weeks 3--4)

Once technical issues are resolved, build content targeting queries your
US/UK/Canada/Australia prospects search for. Currently the site has zero
non-branded keyword visibility.

**Target keywords to build content around:**

  -------------------------- --------------- ---------------- --------------
  **Keyword**                **Intent**      **Target Page**  **Priority**

  AI marketing agency        Commercial      Home             **CRITICAL**

  marketing automation       Commercial      Services         **CRITICAL**
  services                                                    

  AI marketing agency NYC    Local           Home             **HIGH**

  performance based          Commercial      Pricing          **HIGH**
  marketing                                                   

  web development agency     Commercial      Services         **HIGH**

  brand strategy agency      Commercial      Services         **MEDIUM**

  UI UX design services      Commercial      Services         **MEDIUM**

  how to build marketing     Informational   Blog             **MEDIUM**
  system                                                      
  -------------------------- --------------- ---------------- --------------

Publish 2--4 blog posts per month targeting long-tail keywords. Each
post should link to relevant service pages to build internal link equity
and topical authority.

7\. Competitive Note

softstandards.com (a different company) currently occupies Google
results for \"soft standards\" branded searches. They have 4 indexed
pages including homepage, about, and two versions of a services page.
Fixing the technical issues on softstandards.net and building
keyword-targeted content will help you outrank them for branded queries
and establish visibility for commercial terms.

8\. Implementation Timeline

  ------------- --------------------------------- -------------- --------------
  **When**      **Action**                        **Impact**     **Priority**

  **Day 1--2**  Fix .htaccess redirects (force    **Critical**   **P0**
                https + www)                                     

  **Day 1--2**  Fix 404 page (restore or 301      **Critical**   **P0**
                redirect)                                        

  **Day 3**     Request indexing for all 8 pages  **High**       **P0**
                in GSC                                           

  **Week 2**    Create and submit sitemap.xml     **High**       **P1**

  **Week 2**    Add canonical tags + robots.txt   **High**       **P1**

  **Week 2**    Optimize all 8 meta titles and    **High**       **P1**
                descriptions                                     

  **Week 3**    Add structured data               **Medium**     **P2**
                (Organization + LocalBusiness +                  
                Service schema)                                  

  **Week 3--4** Publish first blog posts          **High**       **P2**
                targeting commercial keywords                    

  **Ongoing**   2--4 blog posts/month + monitor   **High**       **P3**
                GSC weekly                                       
  ------------- --------------------------------- -------------- --------------

**Expected Results:** All 8 pages should be indexed within 1--2 weeks of
fixing redirects and requesting indexing. Non-branded organic traffic
growth from US/UK markets will begin within 2--3 months as content and
keyword targeting are implemented. Full competitive visibility for key
commercial terms is a 3--6 month timeline with consistent content
publishing.
