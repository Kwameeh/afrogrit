"use client";

import { Button } from "@/components/ui/button";

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Loader2, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'

import { Input } from "@/components/ui/input"
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";

import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { StickyHeader } from "@/components/layout/sticky-header";
import { Skeleton } from "@/components/ui/skeleton";






export default function Home() {
  return (
    <>
      <StickyHeader className="px-4 py-2">
        <div className="flex justify-between items-center">
         AFROGRIT
          <SignInAndSignUpButtons />
        </div>
      </StickyHeader>
      <main className=" flex flex-col gap-8 px-4">
        <h1 className="text-4xl font-extrabold my-8 text-center">
          AFROGRIT
        </h1>
        <Authenticated>
          <SignedInContent />
        </Authenticated>
        <Unauthenticated>
          <ComingSoon />
        </Unauthenticated>
      </main>
    </>
  );
}

function SignInAndSignUpButtons() {
  return (
    <div className="flex gap-4">
      <Authenticated>
        <UserButton afterSignOutUrl="#" />
      </Authenticated>
      <Unauthenticated>
        <SignInButton mode="modal">
          <Button variant="ghost">Sign in</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button>Sign up</Button>
        </SignUpButton>
      </Unauthenticated>
    </div>
  );
}

function SignedInContent() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (viewer === undefined || numbers === undefined) {
    return (
      <>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </>
    );
  }

  return (
    <>
      {/* <p>Welcome {viewer ?? "N/A"}!</p>
      <p>
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
      <p>
        <Button
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </Button>
      </p>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : numbers?.join(", ") ?? "..."}
      </p>
      <p>
        Edit <Code>convex/myFunctions.ts</Code> to change your backend
      </p>
      <p>
        Edit <Code>app/page.tsx</Code> to change your frontend
      </p>
      <p>
        Check out{" "}
        <Link target="_blank" href="https://docs.convex.dev/home">
          Convex docs
        </Link>
      </p>
      <p>
        To build a full page layout copy one of the included{" "}
        <Link target="_blank" href="/layouts">
          layouts
        </Link>
      </p> */}
      <ComingSoon />
    </>
  );
}



interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = +targetDate - +new Date()
  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  return timeLeft
}

export  function ComingSoon() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const launchDate = new Date('2024-12-31T00:00:00') // Set your launch date here
  const timeLeft = useCountdown(launchDate)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const features = [
    "Post and showcase your artwork",
    "Buy art directly or participate in auctions",
    "Secure transactions and escrow service",
    "Artist profiles and portfolios",
    "Customizable virtual galleries",
  ]

  const testimonials = [
    { name: "Sarah J.", quote: "ArtBid has revolutionized how I share and sell my art. Can't wait for the full launch!" },
    { name: "Michael R.", quote: "As an art collector, I'm excited about the potential of discovering new artists on ArtBid." },
  ]

  const faqs = [
    { question: "When will ArtBid launch?", answer: "We're planning to launch on December 31, 2024. Sign up for our newsletter to stay updated!" },
    { question: "How do I create an account?", answer: "Once we launch, you'll be able to create an account directly on our website. It's a simple process that only takes a few minutes." },
    { question: "Is there a fee for selling artwork?", answer: "We'll have a competitive fee structure that ensures artists keep the majority of their sales. Exact details will be announced closer to launch." },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-gray-800 p-4">
      <main className="max-w-3xl w-full space-y-12 text-center">
        <div className="space-y-4">
          {/* <Image
            src="/placeholder.svg?height=100&width=100"
            alt="ArtBid Logo"
            width={100}
            height={100}
            className="mx-auto rounded-full bg-gray-200 p-2"
          /> */}
          {/* <h1 className="text-4xl font-bold tracking-tight">ArtBid</h1> */}
          <p className="text-xl text-gray-600">
            The future of art trading is coming soon.
          </p>
        </div>

        <div className="flex justify-center space-x-4 text-sm">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-gray-500">{unit}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">About Us</h2>
          <p className="text-gray-600">
            AFROGRITis a revolutionary platform connecting artists and art enthusiasts. 
            We're creating a space where creativity thrives and art finds its rightful home.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Features</h2>
          <ul className="space-y-2 text-left">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">What People Are Saying</h2>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <blockquote key={index} className="italic text-gray-600">
                "{testimonial.quote}"
                <footer className="text-gray-500 not-italic mt-1">- {testimonial.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-2">
                <button
                  className="flex justify-between items-center w-full text-left font-medium"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.question}
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {openFaq === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold">Stay Updated</h2>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
          <Button type="submit" className="w-full" disabled={isSubmitting || isSubmitted}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : isSubmitted ? (
              'Thank you!'
            ) : (
              'Notify me'
            )}
          </Button>
        </form>

        <p className="text-sm text-gray-500">
          Be the first to know when we launch.
        </p>
      </main>
    </div>
  )
}