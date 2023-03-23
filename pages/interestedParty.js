import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ScrollBar from '@/components/scrollBar'
import styles from '@/styles/History.module.css'
import { useState } from 'react'


export default function Home() {

    const [Name, setName] = useState()
    const [Title, setTitle] = useState()

    const [Program, setProgram] = useState()

    const [DOG, setDOG] = useState()

    const [School, setSchool] = useState()


    return (
        <div className={styles.main}>
            <Navbar />

            <div className={styles.body}>
                {/* <img src='./banner.webp'/> */}
                <div className={styles.content}>
                    <h1>Check the authenticity of certificates here</h1>
                    <h2>Enter the certificate number</h2>
                    <input />
                    <br />

                    <div className={styles.insPInfo}>
                        <h2>Enter the details you want to verify(leave rest empty)</h2>
                        <p>Name </p>
                        <input onChange={e => {setName(e)}}/>
                        <p>Title</p>
                        <input onChange={e => {setTitle(e)}}/>
                        <p>Program</p>
                        <input onChange={e => {setProgram(e)}}/>
                        <p>Date Of Graduation</p>
                        <input onChange={e => {setDOG(e)}}/>
                        <p>School</p>
                        <input onChange={e => {setSchool(e)}}/>
                    </div>
                    <h3>you will know the details when owner approves</h3>
                    <button className={styles.claimRewardButtons}>submit</button>
                </div>
            </div>
        </div>
    )
}