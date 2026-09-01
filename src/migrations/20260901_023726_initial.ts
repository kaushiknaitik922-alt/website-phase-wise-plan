import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_products_category" AS ENUM('pp-granules', 'hdpe-sheets', 'ro-filter-housing');
  CREATE TYPE "public"."enum_enquiries_status" AS ENUM('new', 'contacted', 'quoted', 'closed');
  CREATE TYPE "public"."enum_enquiries_source" AS ENUM('contact-page', 'product-page');
  CREATE TYPE "public"."enum_working_hours_days_day" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
  CREATE TYPE "public"."enum_home_page_feature_cards_icon" AS ENUM('factory', 'recycle', 'truck', 'shield', 'layers', 'clock');
  CREATE TYPE "public"."enum_home_page_why_choose_us_points_icon" AS ENUM('factory', 'recycle', 'truck', 'shield', 'layers', 'clock');
  CREATE TYPE "public"."enum_about_page_sections_image_position" AS ENUM('right', 'left');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "products_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "products_colours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"hex_code" varchar DEFAULT '#CCCCCC' NOT NULL
  );
  
  CREATE TABLE "products_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "products_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"application" varchar NOT NULL,
  	"note" varchar
  );
  
  CREATE TABLE "products_buyer_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"buyer_type" varchar NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_products_category" NOT NULL,
  	"display_order" numeric DEFAULT 0,
  	"is_featured" boolean DEFAULT true,
  	"short_description" varchar NOT NULL,
  	"hero_image_id" integer,
  	"overview" jsonb,
  	"packing_supply" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"company_name" varchar,
  	"phone" varchar NOT NULL,
  	"email" varchar,
  	"product_interest_id" integer,
  	"quantity" varchar,
  	"message" varchar,
  	"status" "enum_enquiries_status" DEFAULT 'new',
  	"internal_notes" varchar,
  	"source" "enum_enquiries_source" DEFAULT 'contact-page',
  	"submitted_at" timestamp(3) with time zone,
  	"ip_hash" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"products_id" integer,
  	"enquiries_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_address_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_supply_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"area" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar NOT NULL,
  	"tagline" varchar,
  	"logo_id" integer,
  	"experience_years" numeric,
  	"established_year" numeric,
  	"legal_name" varchar,
  	"gst_number" varchar,
  	"footer_about" varchar,
  	"phone_primary" varchar NOT NULL,
  	"phone_secondary" varchar,
  	"whatsapp_primary" varchar,
  	"whatsapp_secondary" varchar,
  	"email" varchar,
  	"google_maps_embed_url" varchar,
  	"default_seo_meta_title" varchar,
  	"default_seo_meta_description" varchar,
  	"default_seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "working_hours_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_working_hours_days_day" NOT NULL,
  	"is_closed" boolean DEFAULT false,
  	"open_time" varchar,
  	"close_time" varchar
  );
  
  CREATE TABLE "working_hours" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_page_feature_cards_icon" DEFAULT 'factory',
  	"heading" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_why_choose_us_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_page_why_choose_us_points_icon" DEFAULT 'factory',
  	"heading" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_process_strip_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_kicker" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subheading" varchar,
  	"hero_image_id" integer,
  	"hero_primary_cta_label" varchar DEFAULT 'Get a Quote',
  	"hero_primary_cta_href" varchar DEFAULT '/contact',
  	"hero_secondary_cta_label" varchar DEFAULT 'View Products',
  	"hero_secondary_cta_href" varchar DEFAULT '/products',
  	"about_snippet_kicker" varchar DEFAULT 'About Us',
  	"about_snippet_heading" varchar NOT NULL,
  	"about_snippet_body" varchar NOT NULL,
  	"about_snippet_image_id" integer,
  	"about_snippet_link_label" varchar DEFAULT 'Read More',
  	"products_section_kicker" varchar DEFAULT 'Our Products',
  	"products_section_heading" varchar NOT NULL,
  	"products_section_intro" varchar,
  	"why_choose_us_kicker" varchar DEFAULT 'Why Choose Us',
  	"why_choose_us_heading" varchar NOT NULL,
  	"process_strip_kicker" varchar DEFAULT 'Our Process',
  	"process_strip_heading" varchar NOT NULL,
  	"process_strip_link_label" varchar DEFAULT 'See our full process',
  	"supply_area_heading" varchar DEFAULT 'Where we supply',
  	"supply_area_text" varchar,
  	"cta_band_heading" varchar NOT NULL,
  	"cta_band_text" varchar,
  	"cta_band_button_label" varchar DEFAULT 'Get a Quote',
  	"cta_band_button_href" varchar DEFAULT '/contact',
  	"cta_band_show_phone_numbers" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"image_id" integer,
  	"image_position" "enum_about_page_sections_image_position" DEFAULT 'right'
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_kicker" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subheading" varchar,
  	"hero_image_id" integer,
  	"cta_band_heading" varchar NOT NULL,
  	"cta_band_text" varchar,
  	"cta_band_button_label" varchar DEFAULT 'Get a Quote',
  	"cta_band_button_href" varchar DEFAULT '/contact',
  	"cta_band_show_phone_numbers" boolean DEFAULT true,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "process_page_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "process_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_kicker" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subheading" varchar,
  	"hero_image_id" integer,
  	"intro" varchar,
  	"dependability_heading" varchar,
  	"dependability_body" jsonb,
  	"cta_band_heading" varchar NOT NULL,
  	"cta_band_text" varchar,
  	"cta_band_button_label" varchar DEFAULT 'Get a Quote',
  	"cta_band_button_href" varchar DEFAULT '/contact',
  	"cta_band_show_phone_numbers" boolean DEFAULT true,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_kicker" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subheading" varchar,
  	"intro" varchar,
  	"form_heading" varchar DEFAULT 'Send an enquiry',
  	"form_intro" varchar,
  	"directions_note" varchar,
  	"thank_you_message" varchar DEFAULT 'Thank you — your enquiry has been received. We will get back to you shortly.',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_colours" ADD CONSTRAINT "products_colours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_specifications" ADD CONSTRAINT "products_specifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_applications" ADD CONSTRAINT "products_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_buyer_types" ADD CONSTRAINT "products_buyer_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_product_interest_id_products_id_fk" FOREIGN KEY ("product_interest_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_address_lines" ADD CONSTRAINT "site_settings_address_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_supply_areas" ADD CONSTRAINT "site_settings_supply_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_seo_og_image_id_media_id_fk" FOREIGN KEY ("default_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "working_hours_days" ADD CONSTRAINT "working_hours_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."working_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_feature_cards" ADD CONSTRAINT "home_page_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_why_choose_us_points" ADD CONSTRAINT "home_page_why_choose_us_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_process_strip_steps" ADD CONSTRAINT "home_page_process_strip_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_snippet_image_id_media_id_fk" FOREIGN KEY ("about_snippet_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_sections" ADD CONSTRAINT "about_page_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_sections" ADD CONSTRAINT "about_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "process_page_steps" ADD CONSTRAINT "process_page_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "process_page_steps" ADD CONSTRAINT "process_page_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."process_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "process_page" ADD CONSTRAINT "process_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "process_page" ADD CONSTRAINT "process_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "products_gallery_order_idx" ON "products_gallery" USING btree ("_order");
  CREATE INDEX "products_gallery_parent_id_idx" ON "products_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_gallery_image_idx" ON "products_gallery" USING btree ("image_id");
  CREATE INDEX "products_colours_order_idx" ON "products_colours" USING btree ("_order");
  CREATE INDEX "products_colours_parent_id_idx" ON "products_colours" USING btree ("_parent_id");
  CREATE INDEX "products_specifications_order_idx" ON "products_specifications" USING btree ("_order");
  CREATE INDEX "products_specifications_parent_id_idx" ON "products_specifications" USING btree ("_parent_id");
  CREATE INDEX "products_applications_order_idx" ON "products_applications" USING btree ("_order");
  CREATE INDEX "products_applications_parent_id_idx" ON "products_applications" USING btree ("_parent_id");
  CREATE INDEX "products_buyer_types_order_idx" ON "products_buyer_types" USING btree ("_order");
  CREATE INDEX "products_buyer_types_parent_id_idx" ON "products_buyer_types" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_category_idx" ON "products" USING btree ("category");
  CREATE INDEX "products_hero_image_idx" ON "products" USING btree ("hero_image_id");
  CREATE INDEX "products_seo_seo_og_image_idx" ON "products" USING btree ("seo_og_image_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "enquiries_product_interest_idx" ON "enquiries" USING btree ("product_interest_id");
  CREATE INDEX "enquiries_status_idx" ON "enquiries" USING btree ("status");
  CREATE INDEX "enquiries_submitted_at_idx" ON "enquiries" USING btree ("submitted_at");
  CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_address_lines_order_idx" ON "site_settings_address_lines" USING btree ("_order");
  CREATE INDEX "site_settings_address_lines_parent_id_idx" ON "site_settings_address_lines" USING btree ("_parent_id");
  CREATE INDEX "site_settings_supply_areas_order_idx" ON "site_settings_supply_areas" USING btree ("_order");
  CREATE INDEX "site_settings_supply_areas_parent_id_idx" ON "site_settings_supply_areas" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_default_seo_default_seo_og_image_idx" ON "site_settings" USING btree ("default_seo_og_image_id");
  CREATE INDEX "working_hours_days_order_idx" ON "working_hours_days" USING btree ("_order");
  CREATE INDEX "working_hours_days_parent_id_idx" ON "working_hours_days" USING btree ("_parent_id");
  CREATE INDEX "home_page_feature_cards_order_idx" ON "home_page_feature_cards" USING btree ("_order");
  CREATE INDEX "home_page_feature_cards_parent_id_idx" ON "home_page_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "home_page_why_choose_us_points_order_idx" ON "home_page_why_choose_us_points" USING btree ("_order");
  CREATE INDEX "home_page_why_choose_us_points_parent_id_idx" ON "home_page_why_choose_us_points" USING btree ("_parent_id");
  CREATE INDEX "home_page_process_strip_steps_order_idx" ON "home_page_process_strip_steps" USING btree ("_order");
  CREATE INDEX "home_page_process_strip_steps_parent_id_idx" ON "home_page_process_strip_steps" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_hero_image_idx" ON "home_page" USING btree ("hero_image_id");
  CREATE INDEX "home_page_about_snippet_about_snippet_image_idx" ON "home_page" USING btree ("about_snippet_image_id");
  CREATE INDEX "about_page_sections_order_idx" ON "about_page_sections" USING btree ("_order");
  CREATE INDEX "about_page_sections_parent_id_idx" ON "about_page_sections" USING btree ("_parent_id");
  CREATE INDEX "about_page_sections_image_idx" ON "about_page_sections" USING btree ("image_id");
  CREATE INDEX "about_page_hero_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_seo_seo_og_image_idx" ON "about_page" USING btree ("seo_og_image_id");
  CREATE INDEX "process_page_steps_order_idx" ON "process_page_steps" USING btree ("_order");
  CREATE INDEX "process_page_steps_parent_id_idx" ON "process_page_steps" USING btree ("_parent_id");
  CREATE INDEX "process_page_steps_image_idx" ON "process_page_steps" USING btree ("image_id");
  CREATE INDEX "process_page_hero_hero_image_idx" ON "process_page" USING btree ("hero_image_id");
  CREATE INDEX "process_page_seo_seo_og_image_idx" ON "process_page" USING btree ("seo_og_image_id");
  CREATE INDEX "contact_page_seo_seo_og_image_idx" ON "contact_page" USING btree ("seo_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "products_gallery" CASCADE;
  DROP TABLE "products_colours" CASCADE;
  DROP TABLE "products_specifications" CASCADE;
  DROP TABLE "products_applications" CASCADE;
  DROP TABLE "products_buyer_types" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "enquiries" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_address_lines" CASCADE;
  DROP TABLE "site_settings_supply_areas" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "working_hours_days" CASCADE;
  DROP TABLE "working_hours" CASCADE;
  DROP TABLE "home_page_feature_cards" CASCADE;
  DROP TABLE "home_page_why_choose_us_points" CASCADE;
  DROP TABLE "home_page_process_strip_steps" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "about_page_sections" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "process_page_steps" CASCADE;
  DROP TABLE "process_page" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_products_category";
  DROP TYPE "public"."enum_enquiries_status";
  DROP TYPE "public"."enum_enquiries_source";
  DROP TYPE "public"."enum_working_hours_days_day";
  DROP TYPE "public"."enum_home_page_feature_cards_icon";
  DROP TYPE "public"."enum_home_page_why_choose_us_points_icon";
  DROP TYPE "public"."enum_about_page_sections_image_position";`)
}
