import nft0 from '@/assets/gacha/0.svg'
import nft1 from '@/assets/gacha/1.svg'
import nft2 from '@/assets/gacha/2.svg'
import nft3 from '@/assets/gacha/3.svg'
import nft4 from '@/assets/gacha/4.svg'
import nft5 from '@/assets/gacha/5.svg'
import nft6 from '@/assets/gacha/6.svg'
import nft7 from '@/assets/gacha/7.svg'
import nft8 from '@/assets/gacha/8.svg'
import nft9 from '@/assets/gacha/9.svg'
import nft10 from '@/assets/gacha/10.svg'
import nft11 from '@/assets/gacha/11.svg'
import nft12 from '@/assets/gacha/12.svg'
import nft13 from '@/assets/gacha/13.svg'
import nft14 from '@/assets/gacha/14.svg'
import nft15 from '@/assets/gacha/15.svg'
import nft16 from '@/assets/gacha/16.svg'
import nft17 from '@/assets/gacha/17.svg'
import nft18 from '@/assets/gacha/18.svg'
import nft19 from '@/assets/gacha/19.svg'
import nft20 from '@/assets/gacha/20.svg'
import nft21 from '@/assets/gacha/21.svg'
import nft22 from '@/assets/gacha/22.svg'
import nft23 from '@/assets/gacha/23.svg'
import nft24 from '@/assets/gacha/24.svg'
import nft25 from '@/assets/gacha/25.svg'
import nft26 from '@/assets/gacha/26.svg'
import nft27 from '@/assets/gacha/27.svg'
import nft28 from '@/assets/gacha/28.svg'
import nft29 from '@/assets/gacha/29.svg'
import nft30 from '@/assets/gacha/30.svg'
import nft31 from '@/assets/gacha/31.svg'
import nft32 from '@/assets/gacha/32.svg'
import nft33 from '@/assets/gacha/33.svg'
import nft34 from '@/assets/gacha/34.svg'
import nft35 from '@/assets/gacha/35.svg'
import nft36 from '@/assets/gacha/36.svg'
import nft37 from '@/assets/gacha/37.svg'
import nft38 from '@/assets/gacha/38.svg'
import nft39 from '@/assets/gacha/39.svg'
import nft40 from '@/assets/gacha/40.svg'
import nft41 from '@/assets/gacha/41.svg'
import nft42 from '@/assets/gacha/42.svg'
import nft43 from '@/assets/gacha/43.svg'
import nft44 from '@/assets/gacha/44.svg'
import nft45 from '@/assets/gacha/45.svg'
import nft46 from '@/assets/gacha/46.svg'
import nft47 from '@/assets/gacha/47.svg'
import nft48 from '@/assets/gacha/48.svg'
import nft49 from '@/assets/gacha/49.svg'
import nft50 from '@/assets/gacha/50.svg'
import nft51 from '@/assets/gacha/51.svg'
import nft52 from '@/assets/gacha/52.svg'
import nft53 from '@/assets/gacha/53.svg'
import nft54 from '@/assets/gacha/54.svg'
import nft55 from '@/assets/gacha/55.svg'
import nft56 from '@/assets/gacha/56.svg'

export const gachaImgs = [ nft0, nft1, nft2, nft3, nft4, nft5, nft6, nft7, nft8, nft9, nft10, nft11, nft12, nft13, nft14, nft15, nft16, nft17, nft18, nft19, nft20, nft21, nft22, nft23, nft24, nft25, nft26, nft27, nft28, nft29, nft30, nft31, nft32, nft33, nft34, nft35, nft36, nft37, nft38, nft39, nft40, nft41, nft42, nft43, nft44, nft45, nft46, nft47, nft48, nft49, nft50, nft51, nft52, nft53, nft54, nft55, nft56 ];

export const gachaSentences = [
    "I'm sensing good vibes! A rare cat might be in your future",
    "Meow! Feeling lucky today?",
    "The wheel of fortune awaits",
    "The stars are aligning for you",
    "The cat gods are smiling upon you",
    "I'm here to bring good luck! Let's spin the cat wheel!",
    "A world of wonderful cats is just a spin away!",
    "Ready to meet your new furry friend?"
]

export const getThirtyTwoRandomImgs = () => {
    const shuffledImg = gachaImgs.sort(() => 0.5 - Math.random());
    return shuffledImg.slice(0, 32);
}