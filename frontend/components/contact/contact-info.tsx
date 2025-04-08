import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="mb-8 rounded-lg border bg-background p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Contact Information</h2>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Address</p>
            <p className="text-muted-foreground">123 Fitness Street, Gym City, GC 12345</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Phone className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-muted-foreground">(123) 456-7890</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Mail className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Email</p>
            <p className="text-muted-foreground">info@fitzone.com</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Clock className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Hours</p>
            <div className="text-muted-foreground">
              <p>Monday - Friday: 5:00 AM - 10:00 PM</p>
              <p>Saturday - Sunday: 7:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
