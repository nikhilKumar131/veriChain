import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ScrollBar from '@/components/scrollBar'
import styles from '@/styles/History.module.css'
import { address, abi } from "@/contract/contract.js"


export default function Home() {

  console.log(address)


  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.body}>
            <a href='./owner'><button className={styles.homeButton} >Owner</button></a>
            <a href='./interestedParty'><button className={styles.homeButton} >Interested Party</button></a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}