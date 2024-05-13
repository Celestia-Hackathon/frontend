
export default function GachaElement({nftImg=""} : {nftImg?: string}) {
    return(
        <div id="gachaEl" className="ml-0.5 duration-12000">
            <div className="w-[90px] h-[90px] lg:w-[150px] lg:h-[150px] bg-accent ">
                <img src={nftImg} alt="" className="w-full h-full"/>
            </div>
        </div>
    )
   
}