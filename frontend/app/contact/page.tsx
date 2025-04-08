import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { Map } from "@/components/contact/map"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-4xl font-bold">Contact Us</h1>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ContactForm />
            <div>
              <ContactInfo />
              <Map />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

