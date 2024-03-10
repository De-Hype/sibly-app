import ChatHero from "../assets/ChatHero.png"
const Hero = () => {
  // <img src={} alt="An image of the zenchat chat application." />
  return (
    <section className="px-4 tab:px-1 flex items-center overflow-x-hidden justify-between">
      <aside>
        <h3 className="font-extrabold text-4xl text-blue-800">Sibly Chat</h3>
        <p className="">Join million of users on Zenchat in connecting the world.</p>
      </aside>
     <img src={ChatHero} className="hero-image  px-4 py-3" alt="" />
    </section>
  )
}

export default Hero