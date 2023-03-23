import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ScrollBar from '@/components/scrollBar'
import styles from '@/styles/History.module.css'
import { useState, useRef, useEffect } from 'react'
import { ethers } from 'ethers'
import web3Modal from "web3modal"
import {address, abi} from "@/contract/contract"


export default function Home() {

  


    const [Address, setAddress] = useState()
    const [issueCerState, setIssueCerState] = useState()
    // web3 functions
    async function issueCer() {
        try {
            console.log(Address)
            const signer = await getProviderOrSigner(true);
            setIssueCerState("loading")
            const contract = new ethers.Contract(address, abi,signer)
            console.log(address)
            console.log(abi)
            console.log(contract)
            const addr = await signer.getAddress()
            console.log(addr)
            const setT = await contract.issuedCert(Address);
            await setT.wait();
            setIssueCerState("Certificate Issued")
            console.log(setT);
            setSituation("Team has been set")
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
            network: "sepolia",
            providerOptions: {},
            disableInjectedProvider: false,
        });
    }, [])


    return (
        <div className={styles.main}>
            <Navbar />

            <div className={styles.body}>
                <div className={styles.content}>
                    <h1>Set a certificate to a address here:</h1>
                    <h2>Enter the address to which you want to set certificate</h2>
                    <input onChange={e => { setAddress(e.target.value) }}/>
                    <br />
                    <div className={styles.insPInfo}>
                        <h2>Enter the details you want to set:</h2>
                        <p>Certificate Number </p>
                        <input onChange={e => { setCertificate(e) }} />
                        <p>Name </p>
                        <input onChange={e => { setName(e) }} />
                        <p>Title</p>
                        <input onChange={e => { setTitle(e) }} />
                        <p>Program</p>
                        <input onChange={e => { setProgram(e) }} />
                        <p>Date Of Graduation</p>
                        <input onChange={e => { setDOG(e) }} />
                        <p>School</p>
                        <input onChange={e => { setSchool(e) }} />
                    </div>
                    <h3>you will know the details when owner approves</h3>
                    <button className={styles.claimRewardButtons} onClick={issueCer}>Issue Certificate</button>
                    <p>{issueCerState}</p>
                    <br/>
                </div>
            </div>
        </div>
    )
}