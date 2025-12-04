import hero from '../../assets/img/hero.png'

function HeroSection() {
  return (
    <section id="hero">
        <div className="d-flex justify-content-between">
          <div>
            <img src={hero} alt="" />
          </div>
          <div className="text-content">
            <h1>FrontEnd</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate eaque rem ad voluptate esse alias! Corrupti iusto autem accusantium quam, officiis voluptas minus modi laboriosam voluptates, ratione quia quasi illo.</p>
            <div className="btn btn-primary">Start now</div>
          </div>
        </div>
    </section>
    
  )
}

export default HeroSection;
