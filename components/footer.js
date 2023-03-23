import styles from "../styles/Home.module.css"
function Footer() {
    return (
        <div className={styles.footer}>
            {/* <img className={styles.fimage} src='./8933.jpg' /> */}
            <a>Terms</a>
            <a>Privacy</a>
            <a>Partners</a>
            <a>Pricing</a>
            <a>About</a>
        </div>
    )
}

export default Footer;