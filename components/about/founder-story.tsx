"use client"

import { motion } from "framer-motion"

export function FounderStory() {
  return (
    <section className="py-20 md:py-32 bg-warm-neutral">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-forest-green mb-8 text-center">My Story</h2>
          <div className="prose lg:prose-xl mx-auto text-charcoal">
            <p>
              My journey into coaching and consultancy is deeply personal. It began with a passion for understanding the intricate dynamics of human connection, shaped by my own experiences and a desire to see families thrive. I witnessed firsthand the struggles that many face in silence—the communication breakdowns, the parenting challenges, the loss of purpose.
            </p>
            <p>
              This led me to pursue a path of professional development, equipping myself with evidence-based tools and strategies. But I knew that was only half the equation. My Nigerian heritage, with its rich cultural wisdom and emphasis on community, taught me the importance of a holistic approach.
            </p>
            <p>
              Ìbáṣepọ̀ was born from the fusion of these two worlds: a professional, faith-based coaching practice that honors cultural roots while providing practical, actionable guidance. Today, I am privileged to walk alongside individuals, couples, and families, helping them build the connected, purposeful lives they were created for.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}