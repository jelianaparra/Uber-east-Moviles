CREATE DATABASE proyectofinal

CREATE TABLE public.driver
(
    d_id integer NOT NULL,
    d_name character varying COLLATE pg_catalog."default",
    d_lastname character varying COLLATE pg_catalog."default",
    d_password character varying COLLATE pg_catalog."default" NOT NULL,
    d_licenseplate character varying COLLATE pg_catalog."default",
    d_pic bytea,
    d_vehiclemodel character varying COLLATE pg_catalog."default",
    d_vehiclecolor character varying COLLATE pg_catalog."default",
    d_created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    d_uptaded_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    d_email character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT driver_pk PRIMARY KEY (d_id)
);

CREATE TABLE public.purchase
(
    pur_id integer NOT NULL,
    u_id integer NOT NULL,
    pur_comment character varying COLLATE pg_catalog."default",
    d_id integer NOT NULL,
    e_id integer NOT NULL,
    ps_id integer NOT NULL,
    pur_created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pur_status_purchase character varying COLLATE pg_catalog."default" NOT NULL,
    pur_longitude character varying COLLATE pg_catalog."default",
    pur_uptaded_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pur_latitude character varying COLLATE pg_catalog."default",
    CONSTRAINT purchase_pk PRIMARY KEY (pur_id),
    CONSTRAINT driver_purchase_fk FOREIGN KEY (d_id)
        REFERENCES public.driver (d_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT establishement_purchase_fk FOREIGN KEY (e_id)
        REFERENCES public.establishement (e_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT purchase_status_purchase_fk FOREIGN KEY (ps_id)
        REFERENCES public.purchase_status (ps_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_purchase_fk FOREIGN KEY (u_id)
        REFERENCES public.users (u_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE public.establishement
(
    e_id integer NOT NULL,
    e_name character varying COLLATE pg_catalog."default",
    e_direction character varying COLLATE pg_catalog."default",
    e_latitude character varying COLLATE pg_catalog."default",
    e_available boolean,
    e_longitude character varying COLLATE pg_catalog."default" NOT NULL,
    e_email character varying COLLATE pg_catalog."default" NOT NULL,
    e_uptaded_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    e_foto bytea,
    e_created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    e_password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT establishement_pk PRIMARY KEY (e_id)
);

CREATE TABLE public.product
(
    p_id integer NOT NULL,
    p_name character varying COLLATE pg_catalog."default" NOT NULL,
    e_id integer NOT NULL,
    p_price character varying COLLATE pg_catalog."default",
    p_description character varying COLLATE pg_catalog."default",
    p_created_ad timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    p_uptaded_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT product_pk PRIMARY KEY (p_id),
    CONSTRAINT establishement_product_fk FOREIGN KEY (e_id)
        REFERENCES public.establishement (e_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.product_purchase
(
    pp_id integer NOT NULL,
    p_id integer NOT NULL,
    pur_id integer NOT NULL,
    pp_pricepurchase character varying COLLATE pg_catalog."default",
    pp_created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pp_amount integer NOT NULL,
    pp_uptaded_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT product_purchase_pk PRIMARY KEY (pp_id),
    CONSTRAINT product_product_purchase_fk FOREIGN KEY (p_id)
        REFERENCES public.product (p_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT purchase_product_purchase_fk FOREIGN KEY (pur_id)
        REFERENCES public.purchase (pur_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.purchase_status
(
    ps_id integer NOT NULL,
    ps_name character varying COLLATE pg_catalog."default",
    CONSTRAINT purchase_status_pk PRIMARY KEY (ps_id)
);

CREATE TABLE public.users
(
    u_id integer NOT NULL,
    u_email character varying COLLATE pg_catalog."default" NOT NULL,
    u_name character varying COLLATE pg_catalog."default",
    u_lastname character varying COLLATE pg_catalog."default",
    u_password character varying COLLATE pg_catalog."default" NOT NULL,
    u_created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    u_uptaded_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pk PRIMARY KEY (u_id)
);














































































CREATE DATABASE proyectofinal

CREATE TABLE public.driver
(
    d_id integer NOT NULL DEFAULT nextval('driver_d_id_seq_1'::regclass),
    d_name character varying COLLATE pg_catalog."default",
    d_lastname character varying COLLATE pg_catalog."default",
    d_password character varying COLLATE pg_catalog."default" NOT NULL,
    d_licenseplate character varying COLLATE pg_catalog."default",
    d_pic bytea,
    d_vehiclemodel character varying COLLATE pg_catalog."default",
    d_vehiclecolor character varying COLLATE pg_catalog."default",
    d_created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    d_uptaded_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    d_email character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT driver_pk PRIMARY KEY (d_id)
);

CREATE TABLE public.purchase
(
    pur_id integer NOT NULL DEFAULT nextval('purchase_pur_id_seq'::regclass),
    u_id integer NOT NULL,
    pur_comment character varying COLLATE pg_catalog."default",
    d_id integer NOT NULL,
    e_id integer NOT NULL,
    ps_id integer NOT NULL,
    pur_created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pur_status_purchase character varying COLLATE pg_catalog."default" NOT NULL,
    pur_longitude character varying COLLATE pg_catalog."default",
    pur_uptaded_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pur_latitude character varying COLLATE pg_catalog."default",
    CONSTRAINT purchase_pk PRIMARY KEY (pur_id),
    CONSTRAINT driver_purchase_fk FOREIGN KEY (d_id)
        REFERENCES public.driver (d_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT establishement_purchase_fk FOREIGN KEY (e_id)
        REFERENCES public.establishement (e_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT purchase_status_purchase_fk FOREIGN KEY (ps_id)
        REFERENCES public.purchase_status (ps_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_purchase_fk FOREIGN KEY (u_id)
        REFERENCES public.users (u_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)


CREATE TABLE public.establishement
(
    e_id integer NOT NULL DEFAULT nextval('establishement_e_id_seq'::regclass),
    e_name character varying COLLATE pg_catalog."default",
    e_direction character varying COLLATE pg_catalog."default",
    e_latitude character varying COLLATE pg_catalog."default",
    e_available boolean,
    e_longitude character varying COLLATE pg_catalog."default" NOT NULL,
    e_email character varying COLLATE pg_catalog."default" NOT NULL,
    e_uptaded_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    e_foto bytea,
    e_created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    e_password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT establishement_pk PRIMARY KEY (e_id)
);

CREATE TABLE public.product
(
    p_id integer NOT NULL DEFAULT nextval('product_p_id_seq'::regclass),
    p_name character varying COLLATE pg_catalog."default" NOT NULL,
    e_id integer NOT NULL,
    p_price character varying COLLATE pg_catalog."default",
    p_description character varying COLLATE pg_catalog."default",
    p_created_ad timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    p_uptaded_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT product_pk PRIMARY KEY (p_id),
    CONSTRAINT establishement_product_fk FOREIGN KEY (e_id)
        REFERENCES public.establishement (e_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.product_purchase
(
    pp_id integer NOT NULL,
    p_id integer NOT NULL DEFAULT nextval('product_p_id_seq_1'::regclass),
    pur_id integer NOT NULL,
    pp_pricepurchase character varying COLLATE pg_catalog."default",
    pp_created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pp_amount integer NOT NULL,
    pp_uptaded_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT product_purchase_pk PRIMARY KEY (pp_id),
    CONSTRAINT product_product_purchase_fk FOREIGN KEY (p_id)
        REFERENCES public.product (p_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT purchase_product_purchase_fk FOREIGN KEY (pur_id)
        REFERENCES public.purchase (pur_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.purchase_status
(
    ps_id integer NOT NULL DEFAULT nextval('purchase_status_ps_id_seq_1'::regclass),
    ps_name character varying COLLATE pg_catalog."default",
    CONSTRAINT purchase_status_pk PRIMARY KEY (ps_id)
);

CREATE TABLE public.users
(
    u_id integer NOT NULL DEFAULT nextval('users_u_id_seq'::regclass),
    u_email character varying COLLATE pg_catalog."default" NOT NULL,
    u_name character varying COLLATE pg_catalog."default",
    u_lastname character varying COLLATE pg_catalog."default",
    u_password character varying COLLATE pg_catalog."default" NOT NULL,
    u_created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    u_uptaded_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pk PRIMARY KEY (u_id)
);