# Open questions — information still needed

The website is built and works without these; every item below is content that
can be filled in from `/admin` afterwards. Nothing here has been guessed.

## Product specifications (most important)

Product pages currently show colours, applications and buyer types. The
specification table is hidden until real values are entered
(Admin → Products → *product* → Details → Specifications).

1. **Recycled PP Granules** — grade or quality naming, packing (25 kg / 50 kg
   bag), minimum order quantity.
2. **HDPE Sheets** — available thickness range (mm), standard sheet size,
   minimum order.
3. **RO Filter Housing Bottles** — sizes (10" / 20", slim / jumbo), thread or
   port size (1/4", 1/2"), minimum order.

## Company details

4. Year the business started — needed before "Since 20XX" can be shown
   (Admin → Site Settings → Company → Established year).
5. Whether the registered firm name and GST number should appear on the site
   (fields exist, left blank).
6. Full factory address with pincode, and the exact Google Maps location
   (Admin → Site Settings → Contact → Address lines, Google Maps embed URL).
7. Which email address enquiries should be sent to, and whether an official
   business email exists (`ENQUIRY_TO_EMAIL` environment variable).

## Assets and domain

8. Logo file — SVG or high-resolution PNG (Admin → Site Settings → Logo).
9. ~~Domain name~~ — **answered: `shrilakhdatar.in`**. Set it as
   `NEXT_PUBLIC_SERVER_URL` at deploy time; nothing in the code hardcodes it.
10. Real factory and product photographs. Until they arrive the site uses
    colour swatches and plain sections rather than stock imagery.

## Operational

11. Is delivery/transport arranged by us or the buyer? Are samples sent?
    (Both would go into each product's "Packing & supply" section.)
12. Any production capacity figure worth publishing — only if it is a real,
    known number.
