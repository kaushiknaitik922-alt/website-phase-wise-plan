# Website ko khud edit kaise karein

Ye guide un logon ke liye hai jo developer nahi hain. Website ka content badalne
ke liye kisi code ki zaroorat nahi — sab kuch admin panel se hota hai.

## Login

**https://shrilakhdatarindustries.in/admin**

Email aur password wahi jo pehla user banate waqt daala tha.

Password bhool jayein to: Neon → SQL Editor → `DELETE FROM users;` chalayein, phir
`/admin` kholein — dobara "Create first user" ka form aayega. Isse sirf login
account hatta hai, baaki content surakshit rehta hai.

---

## Kya-kya badal sakte hain

### Site Settings

Company ka naam, tagline, logo, dono phone number, WhatsApp number, email,
factory ka address, Google Maps ka embed link, supply areas, aur default SEO
title/description.

Koi field khali chhod dein to website apni built-in value dikhati hai — page
toota hua nahi lagta.

### Working Hours

Har din ka khulne-band hone ka time. Contact page ki table aur "Open now /
Closed now" wala badge isi se chalte hain.

### Home Page / About Us / Our Process / Contact

Har page ka heading, text, sections aur CTA band. Jo likha hai wahi badal
dijiye — turant live ho jata hai.

### Products

Teeno product — naam, description, overview, packing & supply, colours,
specifications (thickness, MOQ waqaira), applications, buyer types, photos.

Naya product bhi add kar sakte hain: **Products → Create New**. Slug (URL ka
hissa) chhota aur simple rakhein, jaise `ldpe-sheets`. Naya product apne aap
products page, menu aur sitemap mein aa jata hai.

### Enquiries

Website se aayi saari enquiries yahan dikhti hain — naam, phone, product,
quantity aur message ke saath. Status badal sakte hain (New → Contacted →
Closed) taaki pata rahe kis par kaam ho chuka hai.

Ye sirf padhne ke liye hain — buyer ne jo bheja wahi rehta hai.

### Media

Photos upload karne ki jagah. Yahan se upload karke products aur pages mein
lagayi ja sakti hain.

> **Dhyaan dein:** Media upload tabhi kaam karega jab Vercel par Blob storage
> chalu ho (`BLOB_READ_WRITE_TOKEN`). Wo nahi hai to upload fail hoga.
> Setup: Vercel → project → Storage → Create → Blob → project se connect karein.

---

## Kya nahi badal sakte (developer chahiye)

- **Bilkul nayi page** banana (jaise "Careers" ya "Gallery") — pages code mein
  bane hue hain, CMS mein nahi
- **Design ya layout** badalna — rang, font, section ka kram
- **FAQ ke sawaal-jawab** — ye abhi code mein hain
- **Menu** mein naya item jodna
- Enquiry form ke fields badalna

---

## Kuch zaroori baatein

**Save karne ke baad website par turant dikhta hai.** Page refresh karke dekh
lein; purana dikhe to `Ctrl + Shift + R` dabayein.

**Kuch galat ho jaye to ghabrayein nahi.** Har field khali karne par website
apni purani built-in value par wapas aa jati hai. Site kabhi khali nahi dikhegi.

**Jhoothi baatein na likhein.** Ye website jaan-boojh kar sirf sach likhti hai —
koi nakli certification, nakli statistics, nakli review ya "sabse sasta" jaisa
dawa nahi. Bharose par hi B2B ka kaam chalta hai.

**Photos ka size** — upload se pehle 1-2 MB se chhoti kar lein, warna website
dheere khulegi.
