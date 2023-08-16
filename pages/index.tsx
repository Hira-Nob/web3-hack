import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";

/**
 * Landing page with a simple gradient background and a hero asset.
 * Free to customize as you see fit.
 */
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
              <Image
                src="/1_gradients.jpg"
                width={1390}
                height={1390}
                alt="Background gradient from red to blue"
                quality={100}
                className={styles.gradient}
              />
            </div>
          </div>
          <div className={styles.heroAssetFrame}>
            <Image
              src="/2_3Dx_Studio.png"
              width={500}
              height={500}
              alt="Hero asset, NFT marketplace"
              quality={100}
              className={styles.heroAsset}
            />
          </div>
          <div className={styles.heroBodyContainer}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleGradient}>
                  IWASE 3D NFT Marketplaces
                </span>
                <br />
              </h1>
              <p className={styles.heroSubtitle}>
                {/* <Link
                  className={styles.link}
                  href="https://thirdweb.com"
                  target="_blank"
                >
                  thirdweb
                </Link>{" "} */}
                動画をアップロードするだけで、<br />
                あなたの作品・体験が3D NFTとして出品出来ます。
              </p>

              <div className={styles.heroCtaContainer}>
                <Link className={styles.heroCta} href="/buy">
                  Get Started
                </Link>
                {/* <Link
                  className={styles.secondaryCta}
                  href="https://github.com/thirdweb-example/marketplace-v3"
                  target="_blank"
                >
                  GitHub
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
