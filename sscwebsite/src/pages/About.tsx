import { AboutCTA, AboutHero, BrandStatement, CareJourney, PeopleSection, PhilosophySection, SenopatiStandard, SpaceStory } from '../components/about/AboutSections'

export default function About() {
  return (
    <>
      <AboutHero />
      <BrandStatement />
      <PhilosophySection />
      <SpaceStory />
      <PeopleSection />
      <CareJourney />
      <SenopatiStandard />
      <AboutCTA />
    </>
  )
}
