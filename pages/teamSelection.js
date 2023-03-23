import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ScrollBar from '@/components/scrollBar'
import Player from '@/components/teamSelection/player'
import Table from '@/components/teamSelection/table'
import styles from '@/styles/TeamSelection.module.css'
import { createRef } from 'react'
import { abi, address } from '@/contract/contract'
import { ethers } from 'ethers'
import web3Modal from 'web3modal'
import { useState, useRef, useEffect } from "react";


export default function Home() {

  const child1 = createRef();
  const child2 = createRef();
  const child3 = createRef();
  const child4 = createRef();
  const child5 = createRef();
  const child6 = createRef();
  const child7 = createRef();
  const child8 = createRef();
  const child9 = createRef();
  const child10 = createRef();

  async function submit() {
    getArray()
  }


  async function getArray() {
    const team = [];
    const children = [child1, child2, child3, child4, child5, child6, child7, child8, child9, child10]

    children.map((key) => {
      const one = key.current.state.status;
      if (one == true) { team.push(key.current.state.id) }
    }
    )

    console.log(team);
    const limit = 5;
    if (team.length == limit) {
      console.log(`Team is full on ${limit}`)
      setSituation(`Uploading...`)
      await setTeam(team);


    }
    else if (team.length > limit) {
      console.log(`Extra players are selected (more then${limit})`)
      setSituation(`Extra players are selected (more then${limit})`)
    }
    else {
      console.log(`Less players are selected (less then${limit})`)
      setSituation(`Less players are selected (less then${limit})`)
    }
  }



  // web3 functions
  async function setTeam(team) {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new ethers.Contract(address, abi, signer)
      const setT = await contract.SelectTeam(team[0], team[1], team[2], team[3], team[4], { value: ethers.utils.parseEther("0.001") });
      await setT.wait();
      console.log("Team has been set");
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
      network: "goerli",
      providerOptions: {},
      disableInjectedProvider: false,
    });
  }, [])

  const [situation, setSituation] = useState()


  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.content}>
          <h1>Select a Team of FIVE</h1>
          <div className={styles.playerArray}>
            <a><Player id={1} ref={child1} /></a>
            <a><Player id={2} ref={child2} /></a>
            <a><Player id={3} ref={child3} /></a>
            <a><Player id={4} ref={child4} /></a>
            <a><Player id={5} ref={child5} /></a>
          </div>
          <div className={styles.playerArray}>

            <a><Player id={6} ref={child6} /></a>
            <a><Player id={7} ref={child7} /></a>
            <a><Player id={8} ref={child8} /></a>
            <a><Player id={9} ref={child9} /></a>
            <a><Player id={10} ref={child10} /></a>

          </div>
          <p>{ }</p>
          <div className={styles.playerCardButton}>
            <button className={styles.metaMask} onClick={submit}>submit</button>

          </div>
          <p>
            <a href='./claimReward' style={{color: "blueviolet"}}><strong >Claim Reward</strong></a> after the match ends
          </p>

          <p>{situation}</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}