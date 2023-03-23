import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import styles from '@/styles/History.module.css'
import { useState, useRef, useEffect } from 'react'
import { ethers } from 'ethers'
import web3Modal from "web3modal"
import {address, abi} from "contract/contract"


export default function Home() {

    const [status, setStatus] = useState()
    const [status2, setStatus2] = useState()
    // web3 functions

    async function claim() {
        try {
            const signer = await getProviderOrSigner(true);
            setStatus("Checking...")
            const contract = new ethers.Contract(address, abi, signer)
            const setT = await contract.claimCert(str);
            await setT.wait();
            setStatus(setT)
            console.log("Team has been set");
            setSituation("Team has been set")
        }

        catch { err => { console.error(err) } }
    }

    async function check() {
        try {
            const signer = await getProviderOrSigner(true);
            setStatus("Checking...")
            const contract = new ethers.Contract(address, abi, signer)
            const addr = await signer.getAddress()
            const setT = await contract.issuedCerts(addr);
            console.log(setT)
            // await setT.wait();
            setStatus(setT)
            console.log("Team has been set");
            setSituation("Team has been set")
            console.log(setT)
        }

        catch { err => { console.error(err) } }
    }

    const web3ModalRef = useRef();

    async function getProviderOrSigner(signer = false) {
        try {
            const provider = await web3ModalRef.current.connect()
            const providers = new ethers.providers.Web3Provider(provider)

            if (signer) {
                const signer = providers.getSigner();
                return signer;
            }

            return providers;
        }
        catch {
            (err) => { console.error(err) }
        }

    }

    useEffect(() => {
        web3ModalRef.current = new web3Modal({
            network: "goerli",
            providerOptions: {},
            disableInjectedProvider: false,
        });
    }, [])

    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.body}>
                <div className={styles.content}>
                    <div>
                        <p>Total number of certificates:</p>
                    </div>

                    <div>
                        <p>Name:</p>
                        <p>Title:</p>
                        <p>Program:</p>
                        <p>Date Of Graduation:</p>
                        <p>School:</p>
                    </div>
                    <br />
                    <p>Check weather a certificate is issued to you or not:</p>
                    <button className={styles.claimRewardButtons} onClick={check}>Check</button>
                    <br />
                    <p>{ status }</p>
                    <br/>
                    {/* <p>Check weather a certificate is issued to you or not:</p>
                    <button className={styles.claimRewardButtons} onClick={check}>Claim</button>
                    <br />
                    <p>{ status2 }</p> */}

                </div>
            </div>
            <Footer />
        </div>
    )
}