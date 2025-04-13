import { Form } from "react-router";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Contact - Bakeologic" }];
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            Have questions about our products or services? We'd love to hear
            from you! Fill out the form and we'll get back to you as soon as
            possible.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Email</h3>
              <p>info@bakeologic.com</p>
            </div>
            <div>
              <h3 className="font-medium">Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-medium">Address</h3>
              <p>
                123 Bakery Street
                <br />
                Sweet City, SC 12345
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardContent>
            <Form method="post" className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
