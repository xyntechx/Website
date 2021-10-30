import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <main className={styles.container}>
            <Head>
                <title>Nyx Iskandar | xyntechx</title>
                <link rel="icon" href="favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="description" content="Nyx Iskandar's website" />
                <meta name="author" content="Nyx Iskandar" />
            </Head>

            <section className={styles.section}>
                <h1 className={styles.title}>Nyx Iskandar</h1>

                <Image
                    src="/nyx.png"
                    alt="Nyx Iskandar"
                    width={200}
                    height={200}
                />

                <div className={styles.grid}>
                    <a href="#about" className={styles.bcard}>
                        <h2>About 👩‍💻</h2>
                        <p>Who is Nyx?</p>
                    </a>

                    <a href="#projects" className={styles.rcard}>
                        <h2>Projects 🚀</h2>
                        <p>What has Nyx built?</p>
                    </a>

                    <a href="#experience" className={styles.pcard}>
                        <h2>Experience 💭</h2>
                        <p>What has Nyx done?</p>
                    </a>
                </div>
            </section>

            <hr className={styles.bseparator} />

            <section id="about" className={styles.section}>
                <h1 className={styles.title}>👩‍💻 About</h1>

                <div className={styles.grid}>
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
                            <span className={styles.blue}>multi-hyphenate</span>
                        </p>
                    </div>
                </div>
            </section>

            <hr className={styles.rseparator} />

            <section id="projects" className={styles.section}>
                <h1 className={styles.title}>🚀 Projects</h1>

                <div className={styles.grid}>
                    <Link href="https://github.com/xyntechx/Inspire">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.rcard}
                        >
                            <h2>Inspire &rarr;</h2>
                            <Image
                                src="/inspire.png"
                                alt="Inspire Student View"
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
                                alt="Sample Manga Layout Analysis Result"
                                width={200}
                                height={130}
                            />
                        </a>
                    </Link>

                    <Link href="https://github.com/xyntechx/Book-Us">
                        <a
                            href="https://github.com/xyntechx/Book-Us"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.rcard}
                        >
                            <h2>BookUs &rarr;</h2>
                            <Image
                                src="/bookus.png"
                                alt="BookUs Homepage"
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
            </section>

            <hr className={styles.pseparator} />

            <section id="experience" className={styles.section}>
                <h1 className={styles.title}>💭 Experience</h1>

                <div className={styles.grid}>
                    <div className={styles.divcard}>
                        <h2 className={styles.purple}>Founder</h2>
                        <h3>Inspire</h3>
                        <p>
                            Leads Inspire and develops Inspire&apos;s main
                            website
                        </p>
                    </div>

                    <div className={styles.divcard}>
                        <h2 className={styles.purple}>
                            Head of Web Development
                        </h2>
                        <h3>TEDxNewton</h3>
                        <p>Develops and designs the website for TEDxNewton</p>
                    </div>

                    <div className={styles.divcard}>
                        <h2 className={styles.purple}>Co-leader</h2>
                        <h3>The Junior Academy</h3>
                        <p>
                            Ideates and develops a solution to prevent, monitor,
                            and treat eutrophication
                        </p>
                    </div>
                </div>

                <p className={styles.description}>
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
