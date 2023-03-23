import styles from '@/styles/History.module.css';
import web3Modal from "web3modal";
import { useState, useRef, useEffect } from "react";
import { ethers } from 'ethers';

function Navbar() {

    const web3ModalRef = useRef();
    const [walletStatus, setWalletStatus] = useState(false)

    async function metamask(signer = false) {
        try {
            const provider = await web3ModalRef.current.connect();
            const web3provider = new ethers.providers.Web3Provider(provider);

            // If user is not connected to the Goerli network, let them know and throw an error
            const { chainId } = await web3provider.getNetwork();

            if (signer) {
                const sign = web3provider.getSigner();
                return sign;
            }
            return web3provider;
        } catch { err => { console.error(err) } }
    }

    useEffect(() => {
        if (walletStatus == false) {
            web3ModalRef.current = new web3Modal({
                network: "goerli",
                providerOptions: {},
                disableInjectedProvider: false,
            });
            metamask()
            setWalletStatus(true)
        }
        try { balance() } catch { err => { console.error(err) } }

    }, [walletStatus])


    return (
        <div >

            <div className={styles.navbar}>
                <img className={styles.fimage} src='./certification.png' />
                <div >
                    <div className={styles.navBarButtons}>
                        <a href="/">Home</a>
                        <a href="/interestedParty">Interested Party</a>
                        <a href="owner">Owner</a>
                        <a href="/setCertificate">Contributor</a>
                    </div>

                </div>
                <div className={styles.metaMaskButton}>
                    <button className={styles.metaMask} onClick={metamask}>
                        <a>MetaMask</a>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Navbar;