import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Video, Phone } from "lucide-react"

export function BookingInfo() {
  const benefits = [
    "Complimentary 30-minute consultation",
    "Discuss your goals and challenges",
    "Learn about our coaching approach",
    "Get personalized recommendations",
    "No obligation or pressure",
  ]

  const sessionFormats = [
    {
      icon: Video,
      title: "Video Call",
      description: "Connect via Zoom or Google Meet",
    },
    {
      icon: Phone,
      title: "Phone Call",
      description: "Traditional phone consultation",
    },
  ]

  return (
    <div className="space-y-6 sticky top-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What to Expect</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Session Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessionFormats.map((format) => (
              <div key={format.title} className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <format.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{format.title}</p>
                  <p className="text-xs text-muted-foreground">{format.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-brand-mint/20 to-brand-sky/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-4">
            <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1">Flexible Scheduling</p>
              <p className="text-xs text-muted-foreground">
                We offer sessions during business hours and evenings to accommodate your schedule.
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Can't find a suitable time? Contact us directly and we'll work with you to find an alternative.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
