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
                <title>Nyx Iskandar | xyntechx</title>
                <link rel="icon" href="favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="description" content="Nyx Iskandar's website" />
                <meta name="author" content="Nyx Iskandar" />
                <meta property="og:title" content="Nyx Iskandar | xyntechx" />
                <meta
                    property="og:description"
                    content="Nyx Iskandar's website"
                />
                <meta
                    property="og:image"
                    content="https://xyntechx.netlify.app/favicon.ico"
                />
                <meta
                    property="og:url"
                    content="https://xyntechx.netlify.app/"
                />
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
                            src="/back.jpg"
                            alt="Nyx wearing a blazer"
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
                            src="/setup.jpg"
                            alt="Nyx's setup"
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
                            alt="Nyx's HackathonX submission (Inspire's alpha version)"
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
                                ,{" "}
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
                            <p className={styles.blue}>+ Extended Reality</p>
                            <p>+ Cybersecurity</p>
                            <p>+ Data Science</p>
                            <p>+ Game Development</p>
                            <p>+ Quantum Computing</p>
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
                        <Link href="https://inspire-me.sg/">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.rcard}
                            >
                                <h2>Inspire &rarr;</h2>
                                <Image
                                    src="/inspire.png"
                                    alt="Inspire Homepage"
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
                                <h2>Manga Layout Analysis &rarr;</h2>
                                <Image
                                    src="/mla.png"
                                    alt="Manga Layout Analysis Overview"
                                    width={181}
                                    height={148}
                                />
                            </a>
                        </Link>
                    </div>

                    <div className={styles.projectsgrid}>
                        <Link href="https://tedxnewton.com/">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.rcard}
                            >
                                <h2>TEDxNewton &rarr;</h2>
                                <Image
                                    src="/tedxnewton.png"
                                    alt="TEDxNewton Homepage"
                                    width={200}
                                    height={130}
                                />
                            </a>
                        </Link>

                        <Link href="https://github.com/xyntechx/Pi-Day-2022">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.rcard}
                            >
                                <h2>Pi Day &rarr;</h2>
                                <Image
                                    src="/piday.png"
                                    alt="Pi Day 2022"
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
                            <h3>Inspire</h3>
                            <p>
                                Leads Inspire and develops Inspire&apos;s main
                                website
                            </p>
                        </div>

                        <div className={styles.divcard}>
                            <h2 className={styles.purple}>Research Intern</h2>
                            <h3>ARTC</h3>
                            <p>
                                Develops projects on robotic grasping and object
                                detection with the Advanced Robotic Applications
                                (ARA) department
                            </p>
                        </div>

                        <div className={styles.divcard}>
                            <h2 className={styles.purple}>Chairperson</h2>
                            <h3>Code for Hope</h3>
                            <p>
                                Leads, organises, and conducts the
                                service-learning project to teach
                                underprivileged students Python fundamentals
                            </p>
                        </div>

                        <div className={styles.divcard}>
                            <h2 className={styles.purple}>
                                Head of Web Development
                            </h2>
                            <h3>TEDxNewton</h3>
                            <p>
                                Develops and designs the website for TEDxNewton
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

                <Link href="https://medium.com/@xyntechx">
                    <a target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/medium.svg"
                            alt="Medium Logo"
                            width={35}
                            height={35}
                        />
                    </a>
                </Link>

                <Link href="https://www.instagram.com/xyntechx/">
                    <a target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/instagram.png"
                            alt="Instagram Logo"
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
