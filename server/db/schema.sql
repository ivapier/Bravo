-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.comments
(
    id SERIAL NOT NULL,
    user_id integer NOT NULL,
    text character varying NOT NULL,
    review_id integer NOT NULL,
    date bigint NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.reviews
(
    id SERIAL NOT NULL,
    show_id integer NOT NULL,
    user_id integer NOT NULL,
    show_rating numeric NOT NULL,
    text character varying NOT NULL,
    date bigint NOT NULL,
    rating integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.shows
(
    id SERIAL NOT NULL,
    user_id integer NOT NULL,
    rating numeric,
    title character varying NOT NULL,
    street character varying NOT NULL,
    city character varying NOT NULL,
    zip numeric NOT NULL,
    state character varying NOT NULL,
    date bigint NOT NULL,
    "cast" character varying,
    website character varying,
    description character varying NOT NULL,
    photo character varying,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL NOT NULL,
    username character varying(25) NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    photo character varying,
    PRIMARY KEY (id)
);

ALTER TABLE public.comments
    ADD FOREIGN KEY (review_id)
    REFERENCES public.reviews (id)
    NOT VALID;


ALTER TABLE public.reviews
    ADD FOREIGN KEY (show_id)
    REFERENCES public.shows (id)
    NOT VALID;


ALTER TABLE public.reviews
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (id)
    NOT VALID;


ALTER TABLE public.shows
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (id)
    NOT VALID;

END;


-- Command for setting sequences for tables

-- SELECT setval('comments_id_seq', max(id)) FROM comments;
-- SELECT setval('reviews_id_seq', max(id)) FROM reviews;
-- SELECT setval('shows_id_seq', max(id)) FROM shows;
-- SELECT setval('users_id_seq', max(id)) FROM users;
