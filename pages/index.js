import Head from 'next/head'
import { useState } from "react";
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [petNameGeneratorInput, setPetNameGeneratorInput] = useState("");
  const [petNameGeneratorResult, setPetNameGeneratorResult] = useState();

  const [textSummariserInput, setTextSummariserInput] = useState("");
  const [textSummariserResult, setTextSummariserResult] = useState();

  const [twoSentenceStoryGeneratorInput, setTwoSentenceStoryGeneratorInput] = useState("");
  const [twoSentenceStoryGeneratorResult, setTwoSentenceStoryGeneratorResult] = useState();

  async function onUserInputSubmit(event, apiFileName, userInput, setResultFunction) {
    event.preventDefault();
    try {
      const response = await fetch(`/api/${apiFileName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log(data.result)
      setResultFunction(data.result);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
    }
  }

  return (
    <>
      <Head>
        <title>mosAIc</title>
        <meta name="description" content="AI helpers created by Jess Crees" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.helpers}>
          <section className={styles.section}>
            <h2>Two Sentence Story Generator</h2>

            <div className={styles.content}>
              <div className={styles.userInput}>
                <form onSubmit={(event) => onUserInputSubmit(event, 'twoSentenceStoryGenerator', twoSentenceStoryGeneratorInput, setTwoSentenceStoryGeneratorResult)}>
                  <input
                    className={styles.singleLineInput}
                    type="text"
                    name="twoSentenceStoryGeneratorInput"
                    placeholder="Enter a topic"
                    value={twoSentenceStoryGeneratorInput}
                    onChange={(e) => setTwoSentenceStoryGeneratorInput(e.target.value)}
                  />
                  <input type="submit" value="Generate story" />
                </form>
              </div>
              {twoSentenceStoryGeneratorResult && (
              <div className={styles.promptResults}>
                {twoSentenceStoryGeneratorResult}
              </div>
              )}
            </div>
          </section>
          <section className={styles.section}>
            <h2>Text Summariser</h2>

            <div className={styles.content}>
              <div className={styles.userInput}>
                <form onSubmit={(event) => onUserInputSubmit(event, 'textSummariser', textSummariserInput, setTextSummariserResult)}>
                  <textarea
                    className={styles.multiLineInput}
                    type="text"
                    name="textSummariserInput"
                    placeholder="Enter a piece of text to summarise"
                    rows="5"
                    value={textSummariserInput}
                    onChange={(e) => setTextSummariserInput(e.target.value)}
                  />
                  <input type="submit" value="Generate summary" />
                </form>
              </div>
              {textSummariserResult && (
              <div className={styles.promptResults}>
                <ul>
                  {textSummariserResult}
                </ul>
              </div>
              )}
            </div>
          </section>

          <section className={styles.section}>
            <h2>Pet Name Generator</h2>

            <div className={styles.content}>
              <div className={styles.userInput}>
                <form onSubmit={(event) => onUserInputSubmit(event, 'petNameGenerator', petNameGeneratorInput, setPetNameGeneratorResult)}>
                  <input
                    className={styles.singleLineInput}
                    type="text"
                    name="petNameGeneratorInput"
                    placeholder="Enter an animal"
                    value={petNameGeneratorInput}
                    onChange={(e) => setPetNameGeneratorInput(e.target.value)}
                  />
                  <input type="submit" value="Generate names" />
                </form>
              </div>
              {petNameGeneratorResult && (
              <div className={styles.promptResults}>
                {petNameGeneratorResult}
              </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
