import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import grid from "../styles/Grid.module.css";
import curves from "../styles/Curves.module.css";

const Home: NextPage = () => {
    return (
        <main>
            <Head>
                <title>Nyx Iskandar</title>
                <link rel="icon" href="favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="description" content="Nyx Iskandar's website" />
                <meta name="author" content="Nyx Iskandar" />
                <meta property="og:title" content="Nyx Iskandar" />
                <meta
                    property="og:description"
                    content="Nyx Iskandar's website"
                />
                <meta
                    property="og:image"
                    content="https://xyntechx.com/xyntechx.png"
                />
                <meta property="og:url" content="https://xyntechx.com/" />
                <meta property="og:type" content="website" />
            </Head>

            <section className={grid.container}>
                <section className={grid.animatedgrid}>
                    <div className={grid.card}>
                        <Image
                            src="/apple.jpg"
                            alt="Nyx in front of an Apple store"
                            layout="fill"
                            className={grid.image}
                        />
                    </div>
                    <div className={grid.card}>
                        <Image
                            src="/vball-laptop.jpg"
                            alt="Nyx in volleyball windbreaker holding her laptop"
                            layout="fill"
                            className={grid.image}
                        />
                    </div>
                    <div className={grid.card}>
                        <Image
                            src="/foobar.jpg"
                            alt="Nyx's Google Foobar attempt"
                            layout="fill"
                            className={grid.image}
                        />
                    </div>
                    <div className={grid.card}>
                        <Image
                            src="/park.jpg"
                            alt="Nyx at a park"
                            layout="fill"
                            className={grid.image}
                        />
                    </div>
                    <div className={grid.card}>
                        <Image
                            src="/vball-laptop.jpg"
                            alt="Nyx in volleyball windbreaker holding her laptop"
                            layout="fill"
                            className={grid.image}
                        />
                    </div>
                    <div className={grid.card}>
                        <Image
                            src="/friends.jpg"
                            alt="Nyx wearing a F.R.I.E.N.D.S. shirt"
                            layout="fill"
                            className={grid.image}
                        />
                    </div>
                    <div className={grid.card}>
                        <Image
                            src="/ball-in-hand.jpg"
                            alt="Nyx with a volleyball"
                            layout="fill"
                            className={grid.image}
                        />
                    </div>
                    <div className={grid.card}>
                        <Image
                            src="/stairs.jpg"
                            alt="Nyx on a beautiful staircase"
                            layout="fill"
                            className={grid.image}
                        />
                    </div>
                    <div className={grid.card}>
                        <Image
                            src="/ysap.jpg"
                            alt="Nyx presenting for the Youth Science Ambassador Programme"
                            layout="fill"
                            className={grid.image}
                        />
                    </div>
                    <div className={grid.card}>
                        <Image
                            src="/hackathonx.jpg"
                            alt="Nyx's HackathonX submission (NXpyre's alpha version)"
                            layout="fill"
                            className={grid.image}
                        />
                    </div>
                    <div className={grid.card}>
                        <Image
                            src="/volleyball.jpg"
                            alt="Nyx playing solo volleyball"
                            layout="fill"
                            className={grid.image}
                        />
                    </div>
                    <div className={grid.card}>
                        <h1 className={styles.maintitle}>Nyx Iskandar</h1>
                    </div>
                </section>
            </section>

            <div className={curves.bluecurves}></div>

            <section id="about" className={curves.blue}>
                <div className={curves.blobcontent}>
                    <h1 className={styles.title}>👩‍💻 About</h1>

                    <div className={styles.aboutgrid}>
                        <div className={styles.divcard}>
                            <h2>🌰</h2>
                            <p>
                                A driven, ambitious, and inquisitive teenager
                                passionate about{" "}
                                <span className={styles.blue}>
                                    computer science
                                </span>
                                , <span className={styles.blue}>research</span>,{" "}
                                <span className={styles.blue}>
                                    entrepreneurship
                                </span>
                                , and{" "}
                                <span className={styles.blue}>
                                    service-learning
                                </span>
                            </p>
                        </div>

                        <div className={styles.divcard}>
                            <h2>💻</h2>
                            <p className={styles.blue}>+ Deep Learning</p>
                            <p className={styles.blue}>+ Web Development</p>
                            <p>+ Quantum Computing</p>
                            <p>+ Cybersecurity</p>
                            <p>+ Data Science</p>
                            <p>+ Extended Reality</p>
                            <p>+ Game Development</p>
                        </div>

                        <div className={styles.divcard}>
                            <h2>🎯</h2>
                            <p>
                                Striving to{" "}
                                <span className={styles.blue}>
                                    stay hungry and foolish
                                </span>{" "}
                                and aiming to become a{" "}
                                <span className={styles.blue}>
                                    multi-hyphenate
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className={curves.redcurves}></div>

            <section id="projects" className={curves.red}>
                <div className={curves.blobcontent}>
                    <h1 className={styles.titlelight}>🚀 Projects</h1>

                    <div className={styles.projectsgrid}>
                        <Link href="https://nexliber.com/">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.rcard}
                            >
                                <h2>NexLiber &rarr;</h2>
                                <Image
                                    src="/nexliber.png"
                                    alt="NexLiber Homepage"
                                    width={200}
                                    height={130}
                                />
                            </a>
                        </Link>

                        <Link href="https://nxpyre.com/">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.rcard}
                            >
                                <h2>NXpyre &rarr;</h2>
                                <Image
                                    src="/nxpyre.png"
                                    alt="NXpyre Homepage"
                                    width={200}
                                    height={130}
                                />
                            </a>
                        </Link>

                        <Link href="https://github.com/xyntechx/Manga-Layout-Analysis">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.rcard}
                            >
                                <h2>MLA &rarr;</h2>
                                <Image
                                    src="/mla.png"
                                    alt="MLA Overview"
                                    width={181}
                                    height={148}
                                />
                            </a>
                        </Link>

                        <Link href="https://tedxri.com/">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.rcard}
                            >
                                <h2>TEDxRI &rarr;</h2>
                                <Image
                                    src="/tedxri.png"
                                    alt="TEDxYouth@RafflesInstitution Homepage"
                                    width={200}
                                    height={130}
                                />
                            </a>
                        </Link>

                        <Link href="https://wordle-xyntechx.vercel.app/">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.rcard}
                            >
                                <h2>Wordle Clone &rarr;</h2>
                                <Image
                                    src="/wordle.png"
                                    alt="Wordle Clone Game"
                                    width={200}
                                    height={130}
                                />
                            </a>
                        </Link>

                        <Link href="https://github.com/xyntechx/Code-for-Hope">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.rcard}
                            >
                                <h2>Code for Hope &rarr;</h2>
                                <Image
                                    src="/cfh.png"
                                    alt="Code for Hope GitHub Repository"
                                    width={200}
                                    height={130}
                                />
                            </a>
                        </Link>
                    </div>

                    <p className={styles.description}>
                        Check out my{" "}
                        <Link href="https://github.com/xyntechx">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.rlink}
                            >
                                GitHub
                            </a>
                        </Link>{" "}
                        for more projects!
                    </p>
                </div>
            </section>

            <div className={curves.purplecurves}></div>

            <section id="experience" className={curves.purple}>
                <div className={curves.blobcontent}>
                    <h1 className={styles.title}>💭 Experience</h1>

                    <div className={styles.experiencegrid}>
                        <div className={styles.divcard}>
                            <h2 className={styles.purple}>Founder</h2>
                            <h3>NexLiber</h3>
                            <p>Create, develop, and manage NexLiber</p>
                        </div>

                        <div className={styles.divcard}>
                            <h2 className={styles.purple}>Founder</h2>
                            <h3>NXpyre</h3>
                            <p>
                                Lead NXpyre and develop NXpyre&apos;s web
                                application
                            </p>
                        </div>

                        <div className={styles.divcard}>
                            <h2 className={styles.purple}>Co-Founder</h2>
                            <h3>TEDxRI</h3>
                            <p>
                                Organise, lead the Executive Committee of, and
                                develop the website of
                                TEDxYouth@RafflesInstitution
                            </p>
                        </div>

                        <div className={styles.divcard}>
                            <h2 className={styles.purple}>Founder</h2>
                            <h3>Code for Hope</h3>
                            <p>
                                Led, organised, and conducted the
                                service-learning project to teach
                                underprivileged students Python fundamentals
                            </p>
                        </div>

                        <div className={styles.divcard}>
                            <h2 className={styles.purple}>Researcher</h2>
                            <h3>Manga Layout Analysis via Deep Learning</h3>
                            <p>
                                Innovated an integrated system of instance
                                segmentation and optical character recognition
                                to adapt manga into other media
                            </p>
                        </div>

                        <div className={styles.divcard}>
                            <h2 className={styles.purple}>Research Intern</h2>
                            <h3>ARTC</h3>
                            <p>
                                Developed projects on robotic grasping and
                                object detection with the Advanced Robotic
                                Applications (ARA) department
                            </p>
                        </div>
                    </div>

                    <p className={styles.descriptionblack}>
                        Check out my{" "}
                        <Link href="https://www.linkedin.com/in/nyx-iskandar/">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.plink}
                            >
                                LinkedIn
                            </a>
                        </Link>{" "}
                        to find out more!
                    </p>
                </div>
            </section>

            <footer className={styles.footer}>
                <Link href="https://github.com/xyntechx">
                    <a target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/github.png"
                            alt="GitHub Logo"
                            width={35}
                            height={35}
                        />
                    </a>
                </Link>

                <Link href="https://www.linkedin.com/in/nyx-iskandar/">
                    <a target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/linkedin.png"
                            alt="LinkedIn Logo"
                            width={35}
                            height={35}
                        />
                    </a>
                </Link>

                <Link href="https://www.buymeacoffee.com/xyntechx">
                    <a target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/bmc.png"
                            alt="Buy Me a Coffee Logo"
                            width={35}
                            height={35}
                        />
                    </a>
                </Link>

                <Link href="mailto:xyntechx@gmail.com">
                    <a target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/email.png"
                            alt="Email Logo"
                            width={35}
                            height={35}
                        />
                    </a>
                </Link>
            </footer>
        </main>
    );
};

export default Home;
