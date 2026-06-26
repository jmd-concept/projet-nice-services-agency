'use client'
import ContactForm from "@/components/ContactForm";

/**
 * "use client";

import { useState } from "react";
import ContactForm from "./ContactForm";

export default function ContactFormPage() {
  const [isOpen, setIsOpen] = useState(true);

  const togglePanel = () => setIsOpen(false);

  return (
    <>
      {isOpen && <ContactForm togglePanel={togglePanel} />}
    </>
  );
}

 */

export default function ContactFormPage(){
    return <ContactForm togglePanel={() => {}} />
}
  