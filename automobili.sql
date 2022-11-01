--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

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
-- Name: automobili; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.automobili (
    id_automobila integer NOT NULL,
    proizvodac character varying,
    naziv_modela character varying,
    pocetak_proizvodnje integer,
    broj_sjedala integer,
    broj_vrata integer,
    min_velicina_prtljaznika integer,
    max_velicina_prtljaznika integer,
    duljina integer,
    sirina integer,
    visina integer,
    zavrsetak_proizvodnje integer
);


ALTER TABLE public.automobili OWNER TO postgres;

--
-- Name: motori; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.motori (
    id_motora integer NOT NULL,
    gorivo character varying,
    broj_cilindri integer,
    zapremina integer,
    snaga integer,
    okretni_moment integer,
    id_auta integer
);


ALTER TABLE public.motori OWNER TO postgres;

--
-- Data for Name: automobili; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.automobili (id_automobila, proizvodac, naziv_modela, pocetak_proizvodnje, broj_sjedala, broj_vrata, min_velicina_prtljaznika, max_velicina_prtljaznika, duljina, sirina, visina, zavrsetak_proizvodnje) FROM stdin;
1	Ford	Focus II	2005	5	5	385	1247	4342	1840	1497	2010
2	Peugeot	307	2001	5	5	341	1328	4202	1730	1512	2005
3	Renault	Megane I	1999	5	5	348	1210	4164	1698	1420	2003
4	Mazda	3 III	2013	5	5	364	1263	4460	1795	1450	2016
5	Opel	Corsa C	2000	5	3	260	1050	3817	1646	1440	2003
6	Honda	Accord VII	2002	5	4	459	\N	4665	1760	1445	2007
7	Skoda	Octavia III	2013	5	5	590	1580	4659	1814	1461	2017
8	Toyota	86 I	2012	4	2	243	\N	4240	1775	1285	2016
9	Porsche	991 II	2015	4	2	115	260	4507	1880	1297	2019
10	Subaru	Forester V	2018	5	5	2155	\N	4625	1816	1730	2021
11	Hyundai	i30 III	2016	5	5	395	1301	4335	1795	1447	2018
\.


--
-- Data for Name: motori; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.motori (id_motora, gorivo, broj_cilindri, zapremina, snaga, okretni_moment, id_auta) FROM stdin;
1	Dizel	4	1560	109	240	1
2	Benzin	4	1388	80	127	1
3	Benzin	4	1596	100	143	1
4	Benzin	5	2522	305	440	1
5	Benzin	4	1361	75	120	2
6	Dizel	4	1398	68	160	2
7	Dizel	4	1997	90	205	2
8	Benzin	4	1390	95	127	3
9	Dizel	4	1870	98	200	3
10	Benzin	4	1496	100	150	4
11	Benzin	4	1998	120	210	4
12	Dizel	4	2191	150	380	4
13	Benzin	3	973	58	85	5
14	Benzin	4	1199	75	110	5
15	Benzin	4	1998	155	190	6
16	Benzin	4	2354	190	220	6
17	Dizel	4	2204	140	340	6
18	Dizel	4	1968	150	320	7
19	Benzin	4	1998	200	205	8
20	Benzin	6	2981	370	450	9
21	Benzin	6	3996	500	460	9
22	Benzin	6	3800	580	750	9
23	Benzin	4	1995	150	194	10
24	Benzin	4	2498	182	239	10
25	Benzin	3	998	120	171	11
26	Benzin	4	1368	100	134	11
27	Dizel	4	1582	95	280	11
28	Benzin	4	1998	275	353	11
\.


--
-- Name: automobili automobili_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.automobili
    ADD CONSTRAINT automobili_pkey PRIMARY KEY (id_automobila);


--
-- Name: motori motori_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.motori
    ADD CONSTRAINT motori_pkey PRIMARY KEY (id_motora);


--
-- PostgreSQL database dump complete
--



COPY (SELECT *  
FROM automobili 
INNER JOIN motori on automobili.id_automobila = motori.id_auta)
TO '/tmp/automobili.csv' DELIMITER ',' CSV HEADER;



COPY (SELECT to_json(entitet)
FROM (SELECT automobili.*, json_agg(motori.*)
FROM automobili 
INNER JOIN motori on automobili.id_automobila = motori.id_auta
GROUP BY automobili.id_automobila) entitet)
TO '/tmp/auto.json';

