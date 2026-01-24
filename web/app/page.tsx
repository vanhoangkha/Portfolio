'use client';

import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Page() {
	return (
		<main style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
			<HeroSection />
			<AboutSection />
			<ExperienceSection />
			<ProjectsSection />
			<SkillsSection />
			<CertificationsSection />
			<TestimonialsSection />
			<ContactSection />
		</main>
	);
}


