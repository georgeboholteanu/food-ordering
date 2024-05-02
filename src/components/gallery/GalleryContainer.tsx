import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const GalleryContainer = () => {
	return (
        <div className={styles.container}>
            <div className="flex justify-center items-center ">
                <h1 className="text-4xl font-bold text-orange-700/80 px-10 mb-4 border-b border-b-zinc-600/30 py-2">Gallery</h1>
            </div>
            <div className={styles.galleryContainer}>                
                <Link  className={`${styles.imageContainer} ${styles.gridSpan2}`} href="/gallery/img07.png"><img src="/gallery/img07.png" alt="gallery image" /></Link>
                <Link  className={`${styles.imageContainer} ${styles.gridSpan1}`} href="/gallery/img02.png"><img src="/gallery/img02.png" alt="gallery image" /></Link>
                <Link  className={`${styles.imageContainer} ${styles.gridSpan1}`} href="/gallery/img03.png"><img src="/gallery/img03.png" alt="gallery image" /></Link>
                <Link  className={`${styles.imageContainer} ${styles.gridSpan1}`} href="/gallery/img04.png"><img src="/gallery/img04.png" alt="gallery image" /></Link>
                <Link  className={`${styles.imageContainer} ${styles.gridSpan3}`} href="/gallery/img05.png"><img src="/gallery/img05.png" alt="gallery image" /></Link>
                <Link  className={`${styles.imageContainer} ${styles.gridSpan1}`} href="/gallery/img06.png"><img src="/gallery/img06.png" alt="gallery image" /></Link>
                <Link  className={`${styles.imageContainer} ${styles.gridSpan2}`} href="/gallery/img08.png"><img src="/gallery/img08.png" alt="gallery image" /></Link>
                <Link  className={`${styles.imageContainer} ${styles.gridSpan1}`} href="/gallery/img09.png"><img src="/gallery/img09.png" alt="gallery image" /></Link>
                <Link  className={`${styles.imageContainer} ${styles.gridSpan1}`} href="/gallery/img10.png"><img src="/gallery/img10.png" alt="gallery image" /></Link>
                <Link  className={`${styles.imageContainer} ${styles.gridSpan1}`} href="/gallery/img01.png"><img src="/gallery/img01.png" alt="gallery image" /></Link>
                <Link  className={`${styles.imageContainer} ${styles.gridSpan1}`} href="/gallery/img11.png"><img src="/gallery/img11.png" alt="gallery image" /></Link>
                <Link  className={`${styles.imageContainer} ${styles.gridSpan1}`} href="/gallery/img12.png"><img src="/gallery/img12.png" alt="gallery image" /></Link>
            </div>
        </div>
	);
};

export default GalleryContainer;
