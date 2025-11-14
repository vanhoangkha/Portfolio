import { SEO } from '@components/SEO';
import { HeroSection } from '@components/sections/HeroSection';
import { AboutSection } from '@components/sections/AboutSection';
import { ExperienceSection } from '@components/sections/ExperienceSection';
import { ProjectsSection } from '@components/sections/ProjectsSection';
import { SkillsSection } from '@components/sections/SkillsSection';
import { CertificationsSection } from '@components/sections/CertificationsSection';
import { TestimonialsSection } from '@components/sections/TestimonialsSection';
import { ContactSection } from '@components/sections/ContactSection';

export const HomePage = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Solutions Architect with 5 years designing enterprise-scale cloud solutions on AWS, Azure, and GCP. AWS Community Builder serving 50,000+ professionals."
      />

      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
};
