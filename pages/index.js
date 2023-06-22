import Head from 'next/head'
import { useState } from "react";
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [petNameGeneratorInput, setPetNameGeneratorInput] = useState("");
  const [petNameGeneratorResult, setPetNameGeneratorResult] = useState();

  async function onPetNameGeneratorSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/petNameGenerator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: petNameGeneratorInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setPetNameGeneratorResult(data.result);
      setPetNameGeneratorInput("");
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
          <details>
            <summary>Pet Name Generator</summary>
            <div className={styles.content}>
              <div className={styles.userInput}>
                <form onSubmit={onPetNameGeneratorSubmit}>
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
          </details>
         
          <details>
            <summary>Text Summariser</summary>
            <div className={styles.content}>
              {/* <form onSubmit={onPetNameGeneratorSubmit}>
                <input
                  type="text"
                  name="petNameGeneratorInput"
                  placeholder="Enter an animal"
                  value={petNameGeneratorInput}
                  onChange={(e) => setPetNameGeneratorInput(e.target.value)}
                />
                <input type="submit" value="Generate names" />
              </form>
              <div>{petNameGeneratorResult}</div> */}
            </div>
          </details>
        </div>
      </main>
    </>
  )
}
