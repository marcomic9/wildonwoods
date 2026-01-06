import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Ruler, Workflow, Hammer } from 'lucide-react';

export function CustomProcess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      icon: Ruler,
      title: "Choose Wood & Size",
      description: "Select from premium soft or hardwoods. Specify exact dimensions tailored to your space."
    },
    {
      number: "02",
      icon: Workflow,
      title: "Select Wildlife Silhouette",
      description: "Pick from our collection of African wildlife—lion, elephant, rhino, kudu, leopard, and more."
    },
    {
      number: "03",
      icon: Hammer,
      title: "Fabrication",
      description: "Our artisans handcraft your piece with precision, combining wood mastery with steel artistry."
    }
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-[#b8956a] mb-4 block" style={{ fontFamily: 'var(--font-sans)' }}>
            The Process
          </span>
          <h2 
            className="text-5xl md:text-6xl mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Your Vision, Our Craft
          </h2>
          <p 
            className="text-xl text-[#a8a8a0] max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            From concept to creation, we work closely with you to bring your bespoke furniture to life.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                {/* Step Number - Large Background */}
                <div 
                  className="absolute -top-8 -left-4 text-9xl opacity-5 pointer-events-none"
                  style={{ fontFamily: 'var(--font-serif)', color: '#b8956a' }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className="relative mb-8 w-20 h-20 border border-[#b8956a]/30 flex items-center justify-center group-hover:border-[#b8956a] transition-colors duration-300">
                  <Icon className="w-10 h-10 text-[#b8956a]" />
                </div>

                {/* Content */}
                <h3 
                  className="text-2xl md:text-3xl mb-4 text-[#f5f5f0]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {step.title}
                </h3>
                <p 
                  className="text-[#a8a8a0] leading-relaxed"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {step.description}
                </p>

                {/* Connector Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-16 h-[1px] bg-gradient-to-r from-[#b8956a]/50 to-transparent" />
                )}

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#b8956a] group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p 
            className="text-lg text-[#a8a8a0] mb-8"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Ready to commission your bespoke piece?
          </p>
          <a
            href="#contact"
            className="inline-block px-12 py-4 border border-[#b8956a] text-[#b8956a] hover:bg-[#b8956a] hover:text-[#0a0a0a] transition-all duration-300 uppercase tracking-wider text-sm"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Start Your Project
          </a>
        </motion.div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 right-0 w-64 h-64 border border-[#b8956a]/10 -translate-y-1/2 translate-x-1/2 rotate-45 pointer-events-none" />
      </div>
    </section>
  );
}
