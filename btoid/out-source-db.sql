--
-- PostgreSQL database dump
--

-- Dumped from database version 12.18 (Debian 12.18-1.pgdg120+2)
-- Dumped by pg_dump version 15.2

-- Started on 2024-03-19 22:28:58 KST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16474)
-- Name: chatroom_participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chatroom_participants (
    id integer NOT NULL,
    user_id integer NOT NULL,
    chatroom_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.chatroom_participants OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16472)
-- Name: chatroom_participants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chatroom_participants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chatroom_participants_id_seq OWNER TO postgres;

--
-- TOC entry 3258 (class 0 OID 0)
-- Dependencies: 218
-- Name: chatroom_participants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chatroom_participants_id_seq OWNED BY public.chatroom_participants.id;


--
-- TOC entry 217 (class 1259 OID 16465)
-- Name: chatrooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chatrooms (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.chatrooms OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16463)
-- Name: chatrooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chatrooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chatrooms_id_seq OWNER TO postgres;

--
-- TOC entry 3259 (class 0 OID 0)
-- Dependencies: 216
-- Name: chatrooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chatrooms_id_seq OWNED BY public.chatrooms.id;


--
-- TOC entry 223 (class 1259 OID 16492)
-- Name: job_post_application_works; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_post_application_works (
    id integer NOT NULL,
    job_post_application_id integer NOT NULL,
    work_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.job_post_application_works OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16490)
-- Name: job_post_application_works_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.job_post_application_works_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_post_application_works_id_seq OWNER TO postgres;

--
-- TOC entry 3260 (class 0 OID 0)
-- Dependencies: 222
-- Name: job_post_application_works_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.job_post_application_works_id_seq OWNED BY public.job_post_application_works.id;


--
-- TOC entry 225 (class 1259 OID 16501)
-- Name: job_post_applications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_post_applications (
    id integer NOT NULL,
    user_id integer NOT NULL,
    job_post_id integer NOT NULL,
    introduction character varying NOT NULL,
    status character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.job_post_applications OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16499)
-- Name: job_post_applications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.job_post_applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_post_applications_id_seq OWNER TO postgres;

--
-- TOC entry 3261 (class 0 OID 0)
-- Dependencies: 224
-- Name: job_post_applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.job_post_applications_id_seq OWNED BY public.job_post_applications.id;


--
-- TOC entry 221 (class 1259 OID 16483)
-- Name: job_post_keywords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_post_keywords (
    id integer NOT NULL,
    job_post_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.job_post_keywords OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16481)
-- Name: job_post_keywords_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.job_post_keywords_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_post_keywords_id_seq OWNER TO postgres;

--
-- TOC entry 3262 (class 0 OID 0)
-- Dependencies: 220
-- Name: job_post_keywords_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.job_post_keywords_id_seq OWNED BY public.job_post_keywords.id;


--
-- TOC entry 227 (class 1259 OID 16513)
-- Name: job_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_title character varying NOT NULL,
    post_type character varying NOT NULL,
    post_content text NOT NULL,
    post_deadline date NOT NULL,
    post_views integer NOT NULL,
    gender character varying NOT NULL,
    min_age integer NOT NULL,
    max_age integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    fee integer NOT NULL,
    work_title character varying NOT NULL,
    work_production_company character varying NOT NULL,
    work_size character varying NOT NULL,
    work_director character varying NOT NULL,
    work_manager character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.job_posts OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16511)
-- Name: job_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.job_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_posts_id_seq OWNER TO postgres;

--
-- TOC entry 3263 (class 0 OID 0)
-- Dependencies: 226
-- Name: job_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.job_posts_id_seq OWNED BY public.job_posts.id;


--
-- TOC entry 215 (class 1259 OID 16453)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    chatroom_id integer NOT NULL,
    user_id integer NOT NULL,
    content character varying NOT NULL,
    is_deleted boolean NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16451)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 3264 (class 0 OID 0)
-- Dependencies: 214
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 231 (class 1259 OID 16534)
-- Name: post_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    comment character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.post_comments OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16532)
-- Name: post_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_comments_id_seq OWNER TO postgres;

--
-- TOC entry 3265 (class 0 OID 0)
-- Dependencies: 230
-- Name: post_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_comments_id_seq OWNED BY public.post_comments.id;


--
-- TOC entry 233 (class 1259 OID 16546)
-- Name: post_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_images (
    id integer NOT NULL,
    post_id integer NOT NULL,
    url character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.post_images OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16544)
-- Name: post_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_images_id_seq OWNER TO postgres;

--
-- TOC entry 3266 (class 0 OID 0)
-- Dependencies: 232
-- Name: post_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_images_id_seq OWNED BY public.post_images.id;


--
-- TOC entry 229 (class 1259 OID 16525)
-- Name: post_likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_likes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.post_likes OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16523)
-- Name: post_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_likes_id_seq OWNER TO postgres;

--
-- TOC entry 3267 (class 0 OID 0)
-- Dependencies: 228
-- Name: post_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_likes_id_seq OWNED BY public.post_likes.id;


--
-- TOC entry 235 (class 1259 OID 16558)
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16556)
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO postgres;

--
-- TOC entry 3268 (class 0 OID 0)
-- Dependencies: 234
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- TOC entry 205 (class 1259 OID 16396)
-- Name: user_guestbooks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_guestbooks (
    id integer NOT NULL,
    profile_id integer NOT NULL,
    user_id integer NOT NULL,
    content character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_guestbooks OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16394)
-- Name: user_guestbooks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_guestbooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_guestbooks_id_seq OWNER TO postgres;

--
-- TOC entry 3269 (class 0 OID 0)
-- Dependencies: 204
-- Name: user_guestbooks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_guestbooks_id_seq OWNED BY public.user_guestbooks.id;


--
-- TOC entry 213 (class 1259 OID 16441)
-- Name: user_keywords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_keywords (
    id integer NOT NULL,
    user_id integer NOT NULL,
    key character varying NOT NULL,
    value character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_keywords OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16439)
-- Name: user_keywords_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_keywords_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_keywords_id_seq OWNER TO postgres;

--
-- TOC entry 3270 (class 0 OID 0)
-- Dependencies: 212
-- Name: user_keywords_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_keywords_id_seq OWNED BY public.user_keywords.id;


--
-- TOC entry 203 (class 1259 OID 16387)
-- Name: user_likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_likes (
    id integer NOT NULL,
    profile_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_likes OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16385)
-- Name: user_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_likes_id_seq OWNER TO postgres;

--
-- TOC entry 3271 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_likes_id_seq OWNED BY public.user_likes.id;


--
-- TOC entry 211 (class 1259 OID 16429)
-- Name: user_representative_keywords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_representative_keywords (
    id integer NOT NULL,
    user_id integer NOT NULL,
    keyword_id integer NOT NULL,
    value character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_representative_keywords OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16427)
-- Name: user_representative_keywords_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_representative_keywords_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_representative_keywords_id_seq OWNER TO postgres;

--
-- TOC entry 3272 (class 0 OID 0)
-- Dependencies: 210
-- Name: user_representative_keywords_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_representative_keywords_id_seq OWNED BY public.user_representative_keywords.id;


--
-- TOC entry 209 (class 1259 OID 16417)
-- Name: user_sns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_sns (
    id integer NOT NULL,
    user_id integer NOT NULL,
    type character varying NOT NULL,
    link character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_sns OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16415)
-- Name: user_sns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_sns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_sns_id_seq OWNER TO postgres;

--
-- TOC entry 3273 (class 0 OID 0)
-- Dependencies: 208
-- Name: user_sns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_sns_id_seq OWNED BY public.user_sns.id;


--
-- TOC entry 207 (class 1259 OID 16408)
-- Name: user_visitor_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_visitor_log (
    id integer NOT NULL,
    profile_id integer NOT NULL,
    user_id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_visitor_log OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16406)
-- Name: user_visitor_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_visitor_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_visitor_log_id_seq OWNER TO postgres;

--
-- TOC entry 3274 (class 0 OID 0)
-- Dependencies: 206
-- Name: user_visitor_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_visitor_log_id_seq OWNED BY public.user_visitor_log.id;


--
-- TOC entry 237 (class 1259 OID 16570)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    agency character varying NOT NULL,
    type character varying NOT NULL,
    location character varying NOT NULL,
    name character varying NOT NULL,
    "birthDate" date NOT NULL,
    gender character varying NOT NULL,
    race character varying NOT NULL,
    introduction character varying NOT NULL,
    height integer NOT NULL,
    weight integer NOT NULL,
    "footSize" integer NOT NULL,
    fee integer NOT NULL,
    can_negotiate_fee boolean NOT NULL,
    can_poomasi boolean NOT NULL,
    representative_work character varying NOT NULL,
    filmography character varying NOT NULL,
    provider character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16568)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3275 (class 0 OID 0)
-- Dependencies: 236
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 239 (class 1259 OID 16583)
-- Name: work_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.work_images (
    id integer NOT NULL,
    work_id integer NOT NULL,
    image_url character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.work_images OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16581)
-- Name: work_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.work_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.work_images_id_seq OWNER TO postgres;

--
-- TOC entry 3276 (class 0 OID 0)
-- Dependencies: 238
-- Name: work_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.work_images_id_seq OWNED BY public.work_images.id;


--
-- TOC entry 241 (class 1259 OID 16595)
-- Name: works; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.works (
    id integer NOT NULL,
    user_id integer NOT NULL,
    type character varying NOT NULL,
    thumbnail_url character varying NOT NULL,
    youtube_link character varying NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    "order" integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.works OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16593)
-- Name: works_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.works_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.works_id_seq OWNER TO postgres;

--
-- TOC entry 3277 (class 0 OID 0)
-- Dependencies: 240
-- Name: works_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.works_id_seq OWNED BY public.works.id;


--
-- TOC entry 2993 (class 2604 OID 16477)
-- Name: chatroom_participants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatroom_participants ALTER COLUMN id SET DEFAULT nextval('public.chatroom_participants_id_seq'::regclass);


--
-- TOC entry 2991 (class 2604 OID 16468)
-- Name: chatrooms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatrooms ALTER COLUMN id SET DEFAULT nextval('public.chatrooms_id_seq'::regclass);


--
-- TOC entry 2997 (class 2604 OID 16495)
-- Name: job_post_application_works id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_post_application_works ALTER COLUMN id SET DEFAULT nextval('public.job_post_application_works_id_seq'::regclass);


--
-- TOC entry 2999 (class 2604 OID 16504)
-- Name: job_post_applications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_post_applications ALTER COLUMN id SET DEFAULT nextval('public.job_post_applications_id_seq'::regclass);


--
-- TOC entry 2995 (class 2604 OID 16486)
-- Name: job_post_keywords id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_post_keywords ALTER COLUMN id SET DEFAULT nextval('public.job_post_keywords_id_seq'::regclass);


--
-- TOC entry 3001 (class 2604 OID 16516)
-- Name: job_posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_posts ALTER COLUMN id SET DEFAULT nextval('public.job_posts_id_seq'::regclass);


--
-- TOC entry 2989 (class 2604 OID 16456)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 3005 (class 2604 OID 16537)
-- Name: post_comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_comments ALTER COLUMN id SET DEFAULT nextval('public.post_comments_id_seq'::regclass);


--
-- TOC entry 3007 (class 2604 OID 16549)
-- Name: post_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_images ALTER COLUMN id SET DEFAULT nextval('public.post_images_id_seq'::regclass);


--
-- TOC entry 3003 (class 2604 OID 16528)
-- Name: post_likes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_likes ALTER COLUMN id SET DEFAULT nextval('public.post_likes_id_seq'::regclass);


--
-- TOC entry 3009 (class 2604 OID 16561)
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- TOC entry 2979 (class 2604 OID 16399)
-- Name: user_guestbooks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_guestbooks ALTER COLUMN id SET DEFAULT nextval('public.user_guestbooks_id_seq'::regclass);


--
-- TOC entry 2987 (class 2604 OID 16444)
-- Name: user_keywords id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_keywords ALTER COLUMN id SET DEFAULT nextval('public.user_keywords_id_seq'::regclass);


--
-- TOC entry 2977 (class 2604 OID 16390)
-- Name: user_likes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_likes ALTER COLUMN id SET DEFAULT nextval('public.user_likes_id_seq'::regclass);


--
-- TOC entry 2985 (class 2604 OID 16432)
-- Name: user_representative_keywords id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_representative_keywords ALTER COLUMN id SET DEFAULT nextval('public.user_representative_keywords_id_seq'::regclass);


--
-- TOC entry 2983 (class 2604 OID 16420)
-- Name: user_sns id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sns ALTER COLUMN id SET DEFAULT nextval('public.user_sns_id_seq'::regclass);


--
-- TOC entry 2981 (class 2604 OID 16411)
-- Name: user_visitor_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_visitor_log ALTER COLUMN id SET DEFAULT nextval('public.user_visitor_log_id_seq'::regclass);


--
-- TOC entry 3011 (class 2604 OID 16573)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3014 (class 2604 OID 16586)
-- Name: work_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_images ALTER COLUMN id SET DEFAULT nextval('public.work_images_id_seq'::regclass);


--
-- TOC entry 3016 (class 2604 OID 16598)
-- Name: works id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.works ALTER COLUMN id SET DEFAULT nextval('public.works_id_seq'::regclass);


--
-- TOC entry 3229 (class 0 OID 16474)
-- Dependencies: 219
-- Data for Name: chatroom_participants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chatroom_participants (id, user_id, chatroom_id, created_at) FROM stdin;
\.


--
-- TOC entry 3227 (class 0 OID 16465)
-- Dependencies: 217
-- Data for Name: chatrooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chatrooms (id, created_at) FROM stdin;
\.


--
-- TOC entry 3233 (class 0 OID 16492)
-- Dependencies: 223
-- Data for Name: job_post_application_works; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job_post_application_works (id, job_post_application_id, work_id, created_at) FROM stdin;
\.


--
-- TOC entry 3235 (class 0 OID 16501)
-- Dependencies: 225
-- Data for Name: job_post_applications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job_post_applications (id, user_id, job_post_id, introduction, status, created_at) FROM stdin;
\.


--
-- TOC entry 3231 (class 0 OID 16483)
-- Dependencies: 221
-- Data for Name: job_post_keywords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job_post_keywords (id, job_post_id, created_at) FROM stdin;
\.


--
-- TOC entry 3237 (class 0 OID 16513)
-- Dependencies: 227
-- Data for Name: job_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job_posts (id, user_id, post_title, post_type, post_content, post_deadline, post_views, gender, min_age, max_age, start_date, end_date, fee, work_title, work_production_company, work_size, work_director, work_manager, created_at) FROM stdin;
\.


--
-- TOC entry 3225 (class 0 OID 16453)
-- Dependencies: 215
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, chatroom_id, user_id, content, is_deleted, created_at) FROM stdin;
\.


--
-- TOC entry 3241 (class 0 OID 16534)
-- Dependencies: 231
-- Data for Name: post_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post_comments (id, user_id, post_id, comment, created_at) FROM stdin;
\.


--
-- TOC entry 3243 (class 0 OID 16546)
-- Dependencies: 233
-- Data for Name: post_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post_images (id, post_id, url, created_at) FROM stdin;
\.


--
-- TOC entry 3239 (class 0 OID 16525)
-- Dependencies: 229
-- Data for Name: post_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post_likes (id, user_id, post_id, created_at) FROM stdin;
\.


--
-- TOC entry 3245 (class 0 OID 16558)
-- Dependencies: 235
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, user_id, title, content, created_at) FROM stdin;
\.


--
-- TOC entry 3215 (class 0 OID 16396)
-- Dependencies: 205
-- Data for Name: user_guestbooks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_guestbooks (id, profile_id, user_id, content, created_at) FROM stdin;
\.


--
-- TOC entry 3223 (class 0 OID 16441)
-- Dependencies: 213
-- Data for Name: user_keywords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_keywords (id, user_id, key, value, created_at) FROM stdin;
\.


--
-- TOC entry 3213 (class 0 OID 16387)
-- Dependencies: 203
-- Data for Name: user_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_likes (id, profile_id, user_id, created_at) FROM stdin;
\.


--
-- TOC entry 3221 (class 0 OID 16429)
-- Dependencies: 211
-- Data for Name: user_representative_keywords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_representative_keywords (id, user_id, keyword_id, value, created_at) FROM stdin;
\.


--
-- TOC entry 3219 (class 0 OID 16417)
-- Dependencies: 209
-- Data for Name: user_sns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_sns (id, user_id, type, link, created_at) FROM stdin;
\.


--
-- TOC entry 3217 (class 0 OID 16408)
-- Dependencies: 207
-- Data for Name: user_visitor_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_visitor_log (id, profile_id, user_id, "createdAt") FROM stdin;
\.


--
-- TOC entry 3247 (class 0 OID 16570)
-- Dependencies: 237
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, agency, type, location, name, "birthDate", gender, race, introduction, height, weight, "footSize", fee, can_negotiate_fee, can_poomasi, representative_work, filmography, provider, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3249 (class 0 OID 16583)
-- Dependencies: 239
-- Data for Name: work_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.work_images (id, work_id, image_url, created_at) FROM stdin;
\.


--
-- TOC entry 3251 (class 0 OID 16595)
-- Dependencies: 241
-- Data for Name: works; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.works (id, user_id, type, thumbnail_url, youtube_link, title, content, "order", created_at) FROM stdin;
\.


--
-- TOC entry 3278 (class 0 OID 0)
-- Dependencies: 218
-- Name: chatroom_participants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chatroom_participants_id_seq', 1, false);


--
-- TOC entry 3279 (class 0 OID 0)
-- Dependencies: 216
-- Name: chatrooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chatrooms_id_seq', 1, false);


--
-- TOC entry 3280 (class 0 OID 0)
-- Dependencies: 222
-- Name: job_post_application_works_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.job_post_application_works_id_seq', 1, false);


--
-- TOC entry 3281 (class 0 OID 0)
-- Dependencies: 224
-- Name: job_post_applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.job_post_applications_id_seq', 1, false);


--
-- TOC entry 3282 (class 0 OID 0)
-- Dependencies: 220
-- Name: job_post_keywords_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.job_post_keywords_id_seq', 1, false);


--
-- TOC entry 3283 (class 0 OID 0)
-- Dependencies: 226
-- Name: job_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.job_posts_id_seq', 1, false);


--
-- TOC entry 3284 (class 0 OID 0)
-- Dependencies: 214
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- TOC entry 3285 (class 0 OID 0)
-- Dependencies: 230
-- Name: post_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_comments_id_seq', 1, false);


--
-- TOC entry 3286 (class 0 OID 0)
-- Dependencies: 232
-- Name: post_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_images_id_seq', 1, false);


--
-- TOC entry 3287 (class 0 OID 0)
-- Dependencies: 228
-- Name: post_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_likes_id_seq', 1, false);


--
-- TOC entry 3288 (class 0 OID 0)
-- Dependencies: 234
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 1, false);


--
-- TOC entry 3289 (class 0 OID 0)
-- Dependencies: 204
-- Name: user_guestbooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_guestbooks_id_seq', 1, false);


--
-- TOC entry 3290 (class 0 OID 0)
-- Dependencies: 212
-- Name: user_keywords_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_keywords_id_seq', 1, false);


--
-- TOC entry 3291 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_likes_id_seq', 1, false);


--
-- TOC entry 3292 (class 0 OID 0)
-- Dependencies: 210
-- Name: user_representative_keywords_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_representative_keywords_id_seq', 1, false);


--
-- TOC entry 3293 (class 0 OID 0)
-- Dependencies: 208
-- Name: user_sns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_sns_id_seq', 1, false);


--
-- TOC entry 3294 (class 0 OID 0)
-- Dependencies: 206
-- Name: user_visitor_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_visitor_log_id_seq', 1, false);


--
-- TOC entry 3295 (class 0 OID 0)
-- Dependencies: 236
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 3296 (class 0 OID 0)
-- Dependencies: 238
-- Name: work_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.work_images_id_seq', 1, false);


--
-- TOC entry 3297 (class 0 OID 0)
-- Dependencies: 240
-- Name: works_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.works_id_seq', 1, false);


--
-- TOC entry 3023 (class 2606 OID 16414)
-- Name: user_visitor_log PK_0395f664247576e07b1a02a869d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_visitor_log
    ADD CONSTRAINT "PK_0395f664247576e07b1a02a869d" PRIMARY KEY (id);


--
-- TOC entry 3021 (class 2606 OID 16405)
-- Name: user_guestbooks PK_0c14362bd0073a0e89e9adb1524; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_guestbooks
    ADD CONSTRAINT "PK_0c14362bd0073a0e89e9adb1524" PRIMARY KEY (id);


--
-- TOC entry 3037 (class 2606 OID 16489)
-- Name: job_post_keywords PK_0f35af784d244b7261cc920a0bd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_post_keywords
    ADD CONSTRAINT "PK_0f35af784d244b7261cc920a0bd" PRIMARY KEY (id);


--
-- TOC entry 3031 (class 2606 OID 16462)
-- Name: messages PK_18325f38ae6de43878487eff986; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY (id);


--
-- TOC entry 3043 (class 2606 OID 16522)
-- Name: job_posts PK_1ecf5b9e46cd2940d254204a73a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_posts
    ADD CONSTRAINT "PK_1ecf5b9e46cd2940d254204a73a" PRIMARY KEY (id);


--
-- TOC entry 3051 (class 2606 OID 16567)
-- Name: posts PK_2829ac61eff60fcec60d7274b9e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY (id);


--
-- TOC entry 3047 (class 2606 OID 16543)
-- Name: post_comments PK_2e99e04b4a1b31de6f833c18ced; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_comments
    ADD CONSTRAINT "PK_2e99e04b4a1b31de6f833c18ced" PRIMARY KEY (id);


--
-- TOC entry 3049 (class 2606 OID 16555)
-- Name: post_images PK_32fe67d8cdea0e7536320d7c454; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_images
    ADD CONSTRAINT "PK_32fe67d8cdea0e7536320d7c454" PRIMARY KEY (id);


--
-- TOC entry 3039 (class 2606 OID 16498)
-- Name: job_post_application_works PK_506b202ad893ad7b67fffae4cc0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_post_application_works
    ADD CONSTRAINT "PK_506b202ad893ad7b67fffae4cc0" PRIMARY KEY (id);


--
-- TOC entry 3019 (class 2606 OID 16393)
-- Name: user_likes PK_766a84015341ed59620e2542747; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_likes
    ADD CONSTRAINT "PK_766a84015341ed59620e2542747" PRIMARY KEY (id);


--
-- TOC entry 3027 (class 2606 OID 16438)
-- Name: user_representative_keywords PK_82ee5702d89c7ba2bbb95551b26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_representative_keywords
    ADD CONSTRAINT "PK_82ee5702d89c7ba2bbb95551b26" PRIMARY KEY (id);


--
-- TOC entry 3035 (class 2606 OID 16480)
-- Name: chatroom_participants PK_966669efaeec6de6b72e9752312; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatroom_participants
    ADD CONSTRAINT "PK_966669efaeec6de6b72e9752312" PRIMARY KEY (id);


--
-- TOC entry 3053 (class 2606 OID 16580)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 3057 (class 2606 OID 16604)
-- Name: works PK_a9ffbf516ba6e52604b29e5cce0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.works
    ADD CONSTRAINT "PK_a9ffbf516ba6e52604b29e5cce0" PRIMARY KEY (id);


--
-- TOC entry 3055 (class 2606 OID 16592)
-- Name: work_images PK_bf85e39bd17beb86f613b038141; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_images
    ADD CONSTRAINT "PK_bf85e39bd17beb86f613b038141" PRIMARY KEY (id);


--
-- TOC entry 3041 (class 2606 OID 16510)
-- Name: job_post_applications PK_c199a7b23927eba1c475b025630; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_post_applications
    ADD CONSTRAINT "PK_c199a7b23927eba1c475b025630" PRIMARY KEY (id);


--
-- TOC entry 3033 (class 2606 OID 16471)
-- Name: chatrooms PK_d190d6f785fb99dffb138cd0443; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatrooms
    ADD CONSTRAINT "PK_d190d6f785fb99dffb138cd0443" PRIMARY KEY (id);


--
-- TOC entry 3029 (class 2606 OID 16450)
-- Name: user_keywords PK_d4ad1f5371a72cea24384a9a6d2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_keywords
    ADD CONSTRAINT "PK_d4ad1f5371a72cea24384a9a6d2" PRIMARY KEY (id);


--
-- TOC entry 3045 (class 2606 OID 16531)
-- Name: post_likes PK_e4ac7cb9daf243939c6eabb2e0d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT "PK_e4ac7cb9daf243939c6eabb2e0d" PRIMARY KEY (id);


--
-- TOC entry 3025 (class 2606 OID 16426)
-- Name: user_sns PK_f957bcd9aa9a44ae947b3ca9ad3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sns
    ADD CONSTRAINT "PK_f957bcd9aa9a44ae947b3ca9ad3" PRIMARY KEY (id);


--
-- TOC entry 3070 (class 2606 OID 16670)
-- Name: chatroom_participants FK_23442867bf5ffd1a39a29ff1c54; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatroom_participants
    ADD CONSTRAINT "FK_23442867bf5ffd1a39a29ff1c54" FOREIGN KEY (chatroom_id) REFERENCES public.chatrooms(id);


--
-- TOC entry 3072 (class 2606 OID 16675)
-- Name: job_post_keywords FK_2c525e4b564dd38e4a1a971fe7f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_post_keywords
    ADD CONSTRAINT "FK_2c525e4b564dd38e4a1a971fe7f" FOREIGN KEY (job_post_id) REFERENCES public.job_posts(id);


--
-- TOC entry 3062 (class 2606 OID 16630)
-- Name: user_visitor_log FK_37f708d72a6dead1822f522fd9a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_visitor_log
    ADD CONSTRAINT "FK_37f708d72a6dead1822f522fd9a" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3060 (class 2606 OID 16620)
-- Name: user_guestbooks FK_40ca84ac50547e35373f3d728dd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_guestbooks
    ADD CONSTRAINT "FK_40ca84ac50547e35373f3d728dd" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3067 (class 2606 OID 16650)
-- Name: user_keywords FK_49958e2890b99b69b17cff7a2ac; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_keywords
    ADD CONSTRAINT "FK_49958e2890b99b69b17cff7a2ac" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3075 (class 2606 OID 16690)
-- Name: job_post_applications FK_4e5ec99d589966c0335e32bcae9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_post_applications
    ADD CONSTRAINT "FK_4e5ec99d589966c0335e32bcae9" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3063 (class 2606 OID 16625)
-- Name: user_visitor_log FK_632929dce0f96b86a62c5452e51; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_visitor_log
    ADD CONSTRAINT "FK_632929dce0f96b86a62c5452e51" FOREIGN KEY (profile_id) REFERENCES public.user_sns(id);


--
-- TOC entry 3071 (class 2606 OID 16665)
-- Name: chatroom_participants FK_668316be9879716ef40e73578f9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatroom_participants
    ADD CONSTRAINT "FK_668316be9879716ef40e73578f9" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3077 (class 2606 OID 16700)
-- Name: job_posts FK_689004e4c0856b1515cdf127f80; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_posts
    ADD CONSTRAINT "FK_689004e4c0856b1515cdf127f80" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3058 (class 2606 OID 16610)
-- Name: user_likes FK_7392cc61e4d0e57d0c02fafdc72; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_likes
    ADD CONSTRAINT "FK_7392cc61e4d0e57d0c02fafdc72" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3059 (class 2606 OID 16605)
-- Name: user_likes FK_8302ba1c9f09f5504cf613e070a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_likes
    ADD CONSTRAINT "FK_8302ba1c9f09f5504cf613e070a" FOREIGN KEY (profile_id) REFERENCES public.user_sns(id);


--
-- TOC entry 3068 (class 2606 OID 16660)
-- Name: messages FK_830a3c1d92614d1495418c46736; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "FK_830a3c1d92614d1495418c46736" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3080 (class 2606 OID 16715)
-- Name: post_comments FK_8eb985b7bd35fd7bc760b6cbe8b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_comments
    ADD CONSTRAINT "FK_8eb985b7bd35fd7bc760b6cbe8b" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3085 (class 2606 OID 16740)
-- Name: works FK_8fb7128aeef9dc826489805eb18; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.works
    ADD CONSTRAINT "FK_8fb7128aeef9dc826489805eb18" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3078 (class 2606 OID 16705)
-- Name: post_likes FK_9b9a7fc5eeff133cf71b8e06a7b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT "FK_9b9a7fc5eeff133cf71b8e06a7b" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3073 (class 2606 OID 16680)
-- Name: job_post_application_works FK_9e96e1cb990efead50ceb773426; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_post_application_works
    ADD CONSTRAINT "FK_9e96e1cb990efead50ceb773426" FOREIGN KEY (job_post_application_id) REFERENCES public.job_post_applications(id);


--
-- TOC entry 3079 (class 2606 OID 16710)
-- Name: post_likes FK_b40d37469c501092203d285af80; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT "FK_b40d37469c501092203d285af80" FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- TOC entry 3064 (class 2606 OID 16635)
-- Name: user_sns FK_c4817611a5ca4e418abc2f4367d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sns
    ADD CONSTRAINT "FK_c4817611a5ca4e418abc2f4367d" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3061 (class 2606 OID 16615)
-- Name: user_guestbooks FK_c482ea99429f62512f4f32d79c3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_guestbooks
    ADD CONSTRAINT "FK_c482ea99429f62512f4f32d79c3" FOREIGN KEY (profile_id) REFERENCES public.user_sns(id);


--
-- TOC entry 3083 (class 2606 OID 16730)
-- Name: posts FK_c4f9a7bd77b489e711277ee5986; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3082 (class 2606 OID 16725)
-- Name: post_images FK_cbea080987be6204e913a691aea; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_images
    ADD CONSTRAINT "FK_cbea080987be6204e913a691aea" FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- TOC entry 3076 (class 2606 OID 16695)
-- Name: job_post_applications FK_cca0846685d59b8c9102d4b3f73; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_post_applications
    ADD CONSTRAINT "FK_cca0846685d59b8c9102d4b3f73" FOREIGN KEY (job_post_id) REFERENCES public.job_posts(id);


--
-- TOC entry 3074 (class 2606 OID 16685)
-- Name: job_post_application_works FK_d422a37af84442183967984bc3c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_post_application_works
    ADD CONSTRAINT "FK_d422a37af84442183967984bc3c" FOREIGN KEY (work_id) REFERENCES public.works(id);


--
-- TOC entry 3065 (class 2606 OID 16645)
-- Name: user_representative_keywords FK_d862ed16934b9368cb7954a22c5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_representative_keywords
    ADD CONSTRAINT "FK_d862ed16934b9368cb7954a22c5" FOREIGN KEY (keyword_id) REFERENCES public.user_keywords(id);


--
-- TOC entry 3069 (class 2606 OID 16655)
-- Name: messages FK_dc2356e832b5f26de8151f5dec5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "FK_dc2356e832b5f26de8151f5dec5" FOREIGN KEY (chatroom_id) REFERENCES public.chatrooms(id);


--
-- TOC entry 3084 (class 2606 OID 16735)
-- Name: work_images FK_e85ef1bea6a47f221a512cfe217; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_images
    ADD CONSTRAINT "FK_e85ef1bea6a47f221a512cfe217" FOREIGN KEY (work_id) REFERENCES public.works(id);


--
-- TOC entry 3081 (class 2606 OID 16720)
-- Name: post_comments FK_e8ffd07822f03f90f637b13cd59; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_comments
    ADD CONSTRAINT "FK_e8ffd07822f03f90f637b13cd59" FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- TOC entry 3066 (class 2606 OID 16640)
-- Name: user_representative_keywords FK_f460a78ae4bcbf07c9920c700e8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_representative_keywords
    ADD CONSTRAINT "FK_f460a78ae4bcbf07c9920c700e8" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3257 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-03-19 22:28:58 KST

--
-- PostgreSQL database dump complete
--

