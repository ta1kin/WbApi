--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2025-02-13 15:01:23

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 103526)
-- Name: google_sheets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.google_sheets (
    id integer NOT NULL,
    spreadsheet_id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.google_sheets OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 103525)
-- Name: google_sheets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.google_sheets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.google_sheets_id_seq OWNER TO postgres;

--
-- TOC entry 4822 (class 0 OID 0)
-- Dependencies: 221
-- Name: google_sheets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.google_sheets_id_seq OWNED BY public.google_sheets.id;


--
-- TOC entry 216 (class 1259 OID 103503)
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 103502)
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.knex_migrations_id_seq OWNER TO postgres;

--
-- TOC entry 4823 (class 0 OID 0)
-- Dependencies: 215
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- TOC entry 218 (class 1259 OID 103510)
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 103509)
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNER TO postgres;

--
-- TOC entry 4824 (class 0 OID 0)
-- Dependencies: 217
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- TOC entry 220 (class 1259 OID 103517)
-- Name: warehouse_tariffs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.warehouse_tariffs (
    id integer NOT NULL,
    warehouse_name character varying(255) NOT NULL,
    box_delivery_and_storage_expr numeric(8,2),
    box_delivery_base numeric(8,2),
    box_delivery_liter numeric(8,2),
    box_storage_base numeric(8,2),
    box_storage_liter numeric(8,2),
    dt_next_box date,
    dt_till_max date,
    date date NOT NULL
);


ALTER TABLE public.warehouse_tariffs OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 103516)
-- Name: warehouse_tariffs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.warehouse_tariffs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.warehouse_tariffs_id_seq OWNER TO postgres;

--
-- TOC entry 4825 (class 0 OID 0)
-- Dependencies: 219
-- Name: warehouse_tariffs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.warehouse_tariffs_id_seq OWNED BY public.warehouse_tariffs.id;


--
-- TOC entry 4652 (class 2604 OID 103529)
-- Name: google_sheets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_sheets ALTER COLUMN id SET DEFAULT nextval('public.google_sheets_id_seq'::regclass);


--
-- TOC entry 4649 (class 2604 OID 103506)
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- TOC entry 4650 (class 2604 OID 103513)
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- TOC entry 4651 (class 2604 OID 103520)
-- Name: warehouse_tariffs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.warehouse_tariffs ALTER COLUMN id SET DEFAULT nextval('public.warehouse_tariffs_id_seq'::regclass);


--
-- TOC entry 4816 (class 0 OID 103526)
-- Dependencies: 222
-- Data for Name: google_sheets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.google_sheets (id, spreadsheet_id, created_at) FROM stdin;
19	1RWOWRHD1uGuNTT5xpIVBwdXHaiL7gc-KHQAQZJtu8Uc	2025-02-13 12:43:24.609673+03
20	1LGLIKgDB_1hMQ4ww8U-SXWvMCzB4M2vgjxn0cPB69Vg	2025-02-13 12:43:24.609673+03
21	13ogrecI_f-ARL_g0vnPkjWi2AQIlZD2qhj_g_mjCmYs	2025-02-13 12:43:24.609673+03
\.


--
-- TOC entry 4810 (class 0 OID 103503)
-- Dependencies: 216
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
1	20250212142345_some-migration-name.ts	1	2025-02-12 21:34:38.604+03
2	20250213083305_create_google_sheets_table.ts	2	2025-02-13 11:33:43.033+03
\.


--
-- TOC entry 4812 (class 0 OID 103510)
-- Dependencies: 218
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- TOC entry 4814 (class 0 OID 103517)
-- Dependencies: 220
-- Data for Name: warehouse_tariffs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.warehouse_tariffs (id, warehouse_name, box_delivery_and_storage_expr, box_delivery_base, box_delivery_liter, box_storage_base, box_storage_liter, dt_next_box, dt_till_max, date) FROM stdin;
202	Тула	145.00	50.75	12.33	0.08	0.08	\N	2025-02-14	2025-02-13
203	Чехов 2	260.00	91.00	22.10	0.11	0.11	\N	2025-02-14	2025-02-13
204	Белая дача	195.00	68.25	16.58	0.13	0.13	\N	2025-02-14	2025-02-13
205	Белые Столбы	280.00	98.00	23.80	0.20	0.20	\N	2025-02-14	2025-02-13
206	Радумля СГТ	95.00	33.25	8.08	0.07	0.07	\N	2025-02-14	2025-02-13
207	Рязань (Тюшевское)	120.00	42.00	10.20	0.10	0.10	\N	2025-02-14	2025-02-13
208	Котовск	150.00	52.50	12.75	0.13	0.13	\N	2025-02-14	2025-02-13
209	Обухово СГТ	75.00	26.25	6.38	0.05	0.05	\N	2025-02-14	2025-02-13
141	Маркетплейс	115.00	40.25	9.78	NaN	NaN	\N	2025-02-13	2025-02-12
142	Коледино	195.00	68.25	16.58	0.10	0.10	\N	2025-02-13	2025-02-12
143	Подольск	200.00	70.00	17.00	0.12	0.12	\N	2025-02-13	2025-02-12
144	Подольск 4	125.00	43.75	10.63	0.09	0.09	\N	2025-02-13	2025-02-12
5	Электросталь	160.00	56.00	13.60	0.08	0.08	\N	2025-02-13	2025-02-12
6	Тула	145.00	50.75	12.33	0.08	0.08	\N	2025-02-13	2025-02-12
7	Чехов 2	260.00	91.00	22.10	0.11	0.11	\N	2025-02-13	2025-02-12
8	Белая дача	195.00	68.25	16.58	0.13	0.13	\N	2025-02-13	2025-02-12
9	Белые Столбы	280.00	98.00	23.80	0.20	0.20	\N	2025-02-13	2025-02-12
10	Радумля СГТ	95.00	33.25	8.08	0.07	0.07	\N	2025-02-13	2025-02-12
11	Рязань (Тюшевское)	120.00	42.00	10.20	0.10	0.10	\N	2025-02-13	2025-02-12
12	Котовск	150.00	52.50	12.75	0.13	0.13	\N	2025-02-13	2025-02-12
13	Обухово СГТ	75.00	26.25	6.38	0.05	0.05	\N	2025-02-13	2025-02-12
14	Голицыно СГТ	75.00	26.25	6.38	0.05	0.05	\N	2025-02-13	2025-02-12
15	Сабурово	130.00	45.50	11.05	0.09	0.09	\N	2025-02-13	2025-02-12
16	Владимир	140.00	49.00	11.90	0.10	0.10	\N	2025-02-13	2025-02-12
17	Щербинка	190.00	66.50	16.15	0.13	0.13	\N	2025-02-13	2025-02-12
18	Санкт-Петербург Уткина Заводь	270.00	94.50	22.95	0.14	0.14	\N	2025-02-13	2025-02-12
19	Шушары СГТ	95.00	33.25	8.08	0.07	0.07	\N	2025-02-13	2025-02-12
20	Краснодар	130.00	45.50	11.05	0.10	0.10	\N	2025-02-13	2025-02-12
21	Невинномысск	130.00	45.50	11.05	0.09	0.09	\N	2025-02-13	2025-02-12
22	Казань	210.00	73.50	17.85	0.13	0.13	\N	2025-02-13	2025-02-12
23	Екатеринбург - Испытателей 14г	220.00	77.00	18.70	0.13	0.13	\N	2025-02-13	2025-02-12
24	Екатеринбург - Перспективный 12	150.00	52.50	12.75	0.00	0.00	\N	2025-02-13	2025-02-12
137	Новосибирск	445.00	155.75	37.83	0.29	0.29	\N	2025-02-13	2025-02-12
138	Хабаровск	220.00	77.00	18.70	0.14	0.14	\N	2025-02-13	2025-02-12
139	Атакент	125.00	43.75	10.63	0.08	0.08	\N	2025-02-13	2025-02-12
140	Астана Карагандинское шоссе	145.00	50.75	12.33	0.10	0.10	\N	2025-02-13	2025-02-12
197	Маркетплейс	115.00	40.25	9.78	NaN	NaN	\N	2025-02-14	2025-02-13
198	Коледино	195.00	68.25	16.58	0.10	0.10	\N	2025-02-14	2025-02-13
199	Подольск	200.00	70.00	17.00	0.12	0.12	\N	2025-02-14	2025-02-13
200	Подольск 4	125.00	43.75	10.63	0.09	0.09	\N	2025-02-14	2025-02-13
201	Электросталь	160.00	56.00	13.60	0.08	0.08	\N	2025-02-14	2025-02-13
210	Голицыно СГТ	75.00	26.25	6.38	0.05	0.05	\N	2025-02-14	2025-02-13
211	Сабурово	130.00	45.50	11.05	0.09	0.09	\N	2025-02-14	2025-02-13
212	Владимир	140.00	49.00	11.90	0.10	0.10	\N	2025-02-14	2025-02-13
213	Щербинка	190.00	66.50	16.15	0.13	0.13	\N	2025-02-14	2025-02-13
214	Санкт-Петербург Уткина Заводь	270.00	94.50	22.95	0.14	0.14	\N	2025-02-14	2025-02-13
215	Шушары СГТ	95.00	33.25	8.08	0.07	0.07	\N	2025-02-14	2025-02-13
216	Краснодар	130.00	45.50	11.05	0.10	0.10	\N	2025-02-14	2025-02-13
217	Невинномысск	130.00	45.50	11.05	0.09	0.09	\N	2025-02-14	2025-02-13
218	Казань	210.00	73.50	17.85	0.13	0.13	\N	2025-02-14	2025-02-13
219	Екатеринбург - Испытателей 14г	220.00	77.00	18.70	0.13	0.13	\N	2025-02-14	2025-02-13
220	Екатеринбург - Перспективный 12	150.00	52.50	12.75	0.00	0.00	\N	2025-02-14	2025-02-13
221	Новосибирск	445.00	155.75	37.83	0.29	0.29	\N	2025-02-14	2025-02-13
222	Хабаровск	220.00	77.00	18.70	0.14	0.14	\N	2025-02-14	2025-02-13
223	Атакент	125.00	43.75	10.63	0.08	0.08	\N	2025-02-14	2025-02-13
224	Астана Карагандинское шоссе	145.00	50.75	12.33	0.10	0.10	\N	2025-02-14	2025-02-13
\.


--
-- TOC entry 4826 (class 0 OID 0)
-- Dependencies: 221
-- Name: google_sheets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.google_sheets_id_seq', 21, true);


--
-- TOC entry 4827 (class 0 OID 0)
-- Dependencies: 215
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 2, true);


--
-- TOC entry 4828 (class 0 OID 0)
-- Dependencies: 217
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- TOC entry 4829 (class 0 OID 0)
-- Dependencies: 219
-- Name: warehouse_tariffs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.warehouse_tariffs_id_seq', 364, true);


--
-- TOC entry 4663 (class 2606 OID 103532)
-- Name: google_sheets google_sheets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_sheets
    ADD CONSTRAINT google_sheets_pkey PRIMARY KEY (id);


--
-- TOC entry 4665 (class 2606 OID 103534)
-- Name: google_sheets google_sheets_spreadsheet_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_sheets
    ADD CONSTRAINT google_sheets_spreadsheet_id_unique UNIQUE (spreadsheet_id);


--
-- TOC entry 4657 (class 2606 OID 103515)
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- TOC entry 4655 (class 2606 OID 103508)
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4659 (class 2606 OID 103522)
-- Name: warehouse_tariffs warehouse_tariffs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.warehouse_tariffs
    ADD CONSTRAINT warehouse_tariffs_pkey PRIMARY KEY (id);


--
-- TOC entry 4661 (class 2606 OID 103524)
-- Name: warehouse_tariffs warehouse_tariffs_warehouse_name_date_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.warehouse_tariffs
    ADD CONSTRAINT warehouse_tariffs_warehouse_name_date_unique UNIQUE (warehouse_name, date);


-- Completed on 2025-02-13 15:01:24

--
-- PostgreSQL database dump complete
--

