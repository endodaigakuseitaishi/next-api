import { GetServerSideProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import 'semantic-ui-css/semantic.min.css'

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageProps: string;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search")
  const result = await res.json();
  return result[0]
}
export default function Home(initialCatImageProps: any) {
  const [ catImageUrl, setCatImageUrl ] = useState(initialCatImageProps)
  const handleClick = async () => {
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url)
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    }}>
      <h1>猫画像</h1>
      <img src={catImageUrl} width={500} height="auto" />
      <button style={{marginTop: 18}} onClick={handleClick} >today's cat</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
IndexPageProps
> = async () => {
  const catImage = await fetchCatImage()
  return {
    props: {
      // string型で返るように定義
      initialCatImageProps: catImage.url
    }
  }
}
