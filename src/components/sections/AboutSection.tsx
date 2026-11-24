import Section from '@/components/ui/Section';

/** 서비스 소개 섹션. Figma 「Landing 당당 v2」를 보고 다음 이슈에서 채운다 */
export default function AboutSection() {
  return (
    <Section id="about" label="서비스 소개" className="py-24">
      <p className="text-sm text-ink-sub">서비스 소개</p>
    </Section>
  );
}
