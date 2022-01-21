import Head from 'next/head'
import styles from '../styles/Home.module.css'
import BigCard from '../components/BigCard'
import adjust from './api/randomArr'
import React, { useState, useEffect } from 'react'



export default function Home({ question }) {

  const [questionData, setQuestionData] = useState({})

  useEffect(() => {
    setQuestionData(adjust(question))
  }, [question]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <BigCard questionData={questionData} setQuestionData={setQuestionData} originQuestion={question} />
      </main>

      <footer className={styles.footer}>
      <p>created by <span style={{fontWeight:700}}>satellites7</span> - devChallenges.io</p>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://restcountries.com/v2/all?fields=name,capital,flag')
  const question = await res.json()

  return {
    props: {
      question:question.filter(item => item.capital),
    },
  }
}