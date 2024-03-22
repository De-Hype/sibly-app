import ChatHero from "../assets/ChatHero.png"
const Hero = () => {

  return (
    <section className="px-4 tab:px-1 flex items-center overflow-x-hidden tab:flex-col tab:my-4 justify-between">
      <aside>
        <h3 className="font-extrabold text-4xl text-blue-800">Sibly Chat</h3>
        <p className="">Join million of users on Zenchat in connecting the world.</p>
      </aside>
     <img src={ChatHero} className="hero-image  px-4 py-3" alt="An image of the zenchat chat application." />
    </section>
  )
}

export default Hero